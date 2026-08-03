/**
 * Server-side durable store + wire mappers for the `@navanta/feedback-widget`
 * HTTP contract (see `src/app/api/feedback/route.ts`).
 *
 * The widget POSTs a `FeedbackPayload` (annotations NESTED as `{ anchor, rect,
 * … }`) and expects a `FeedbackResponse` back (annotations FLAT, dates as ISO
 * strings). The persisted `FeedbackRecord` sits in between: flat annotations,
 * `Date` objects, server-generated ids/timestamps. This module owns all three
 * shapes and the translation between them, and implements `SitepingStore`.
 *
 * Storage backend:
 *  - When Vercel KV / Upstash env vars are present → durable, shared across
 *    every serverless instance and browser (the production path).
 *  - Otherwise → an in-memory per-process fallback so `next dev` works with no
 *    setup. It is NOT shared across instances and does NOT survive a deploy, so
 *    it is only ever a local-dev convenience — never the intended prod store.
 *
 * The behaviour (idempotency on `clientId`, newest-first ordering, `resolvedAt`
 * derivation, filter/pagination semantics) mirrors the package's own
 * `LocalStorageStore` reference adapter exactly, so a KV-backed deployment
 * behaves identically to the localStorage demo.
 */
import { createClient, type VercelKV } from "@vercel/kv";
import type {
  FeedbackPayload,
  FeedbackResponse,
  AnnotationResponse,
  SitepingStore,
} from "@navanta/feedback-widget";

/* ------------------------------------------------------------------ *
 * Types — derived from the public `SitepingStore` interface so we never
 * depend on the package's internal (hash-named) type-defs file.
 * ------------------------------------------------------------------ */
type FeedbackCreateInput = Parameters<SitepingStore["createFeedback"]>[0];
type FeedbackRecord = Awaited<ReturnType<SitepingStore["createFeedback"]>>;
type FeedbackQuery = Parameters<SitepingStore["getFeedbacks"]>[0];
type FeedbackUpdateInput = Parameters<SitepingStore["updateFeedback"]>[1];
type FeedbackPage = Awaited<ReturnType<SitepingStore["getFeedbacks"]>>;
type AnnotationRecord = FeedbackRecord["annotations"][number];

/* ------------------------------------------------------------------ *
 * Error contract — the store surfaces failures via a stable `code` field
 * (matching the package's own convention) so the HTTP handler can map them
 * to status codes without an `instanceof` that would break across bundles.
 * ------------------------------------------------------------------ */
export class StoreNotFoundError extends Error {
  readonly code = "STORE_NOT_FOUND" as const;
  constructor(message = "Record not found") {
    super(message);
    this.name = "StoreNotFoundError";
  }
}

export class StorePersistenceError extends Error {
  readonly code = "STORE_PERSISTENCE" as const;
  constructor(message = "Write could not be persisted", options?: ErrorOptions) {
    super(message, options);
    this.name = "StorePersistenceError";
  }
}

/** Read a stable `code` string off an unknown thrown value, if present. */
export function errorCode(err: unknown): string | undefined {
  if (typeof err === "object" && err !== null && "code" in err) {
    return String((err as { code: unknown }).code);
  }
  return undefined;
}

/* ------------------------------------------------------------------ *
 * Pure helpers — id/record construction, revival, filtering.
 * ------------------------------------------------------------------ */
function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/** Build a persisted record from create input — server-owned ids + timestamps. */
function buildRecord(data: FeedbackCreateInput): FeedbackRecord {
  const now = new Date();
  const id = newId();
  const annotations: AnnotationRecord[] = data.annotations.map((a) => ({
    id: newId(),
    feedbackId: id,
    cssSelector: a.cssSelector,
    xpath: a.xpath,
    textSnippet: a.textSnippet,
    elementTag: a.elementTag,
    elementId: a.elementId ?? null,
    textPrefix: a.textPrefix,
    textSuffix: a.textSuffix,
    fingerprint: a.fingerprint,
    neighborText: a.neighborText,
    anchorKey: a.anchorKey ?? null,
    xPct: a.xPct,
    yPct: a.yPct,
    wPct: a.wPct,
    hPct: a.hPct,
    scrollX: a.scrollX,
    scrollY: a.scrollY,
    viewportW: a.viewportW,
    viewportH: a.viewportH,
    devicePixelRatio: a.devicePixelRatio,
    createdAt: now,
  }));

  return {
    id,
    type: data.type,
    message: data.message,
    status: data.status,
    projectName: data.projectName,
    url: data.url,
    urlPattern: data.urlPattern ?? null,
    authorName: data.authorName,
    authorEmail: data.authorEmail,
    viewport: data.viewport,
    userAgent: data.userAgent,
    clientId: data.clientId,
    resolvedAt: null,
    createdAt: now,
    updatedAt: now,
    annotations,
    screenshotUrl: data.screenshotDataUrl ?? null,
    diagnostics: data.diagnostics ?? null,
  };
}

/** Revive a JSON-parsed record (ISO strings) back into a `FeedbackRecord` (Date). */
function reviveRecord(raw: unknown): FeedbackRecord {
  const r = raw as Record<string, unknown> & {
    resolvedAt?: string | null;
    createdAt: string;
    updatedAt: string;
    annotations?: Array<Record<string, unknown> & { createdAt: string }>;
  };
  return {
    ...(r as object),
    urlPattern: (r.urlPattern as string | null | undefined) ?? null,
    resolvedAt: r.resolvedAt ? new Date(r.resolvedAt) : null,
    createdAt: new Date(r.createdAt),
    updatedAt: new Date(r.updatedAt),
    annotations: (r.annotations ?? []).map((a) => ({
      ...(a as object),
      createdAt: new Date(a.createdAt),
    })),
    screenshotUrl: (r.screenshotUrl as string | null | undefined) ?? null,
    diagnostics: (r.diagnostics as FeedbackRecord["diagnostics"]) ?? null,
  } as FeedbackRecord;
}

/**
 * Filter + paginate — byte-for-byte the semantics of the package's shared
 * query function: filter by projectName → type → status → url → urlPattern,
 * then a case-insensitive `search` over the message only. `total` is the
 * pre-pagination count; `limit` defaults to 50 and is capped at 100.
 */
function filterAndPaginate(all: FeedbackRecord[], q: FeedbackQuery): FeedbackPage {
  let n = all.filter((r) => r.projectName === q.projectName);
  if (q.type) n = n.filter((r) => r.type === q.type);
  if (q.status) n = n.filter((r) => r.status === q.status);
  if (q.url) n = n.filter((r) => r.url === q.url);
  if (q.urlPattern) n = n.filter((r) => r.urlPattern === q.urlPattern);
  if (q.search) {
    const s = q.search.toLowerCase();
    n = n.filter((r) => r.message.toLowerCase().includes(s));
  }
  const total = n.length;
  const page = q.page ?? 1;
  const limit = Math.min(q.limit ?? 50, 100);
  const start = (page - 1) * limit;
  return { feedbacks: n.slice(start, start + limit), total };
}

/* ------------------------------------------------------------------ *
 * KV-backed store — one JSON array per project under `siteping:<project>`.
 * Read-modify-write; fine for a small-team review tool. Id-based lookups
 * (update/delete/findByClientId) scan the handful of project keys — they are
 * only ever hit by rare admin actions, never the POST/GET hot paths.
 * ------------------------------------------------------------------ */
const KEY_PREFIX = "siteping:";

class KvStore implements SitepingStore {
  constructor(private readonly client: VercelKV) {}

  private keyFor(projectName: string): string {
    return `${KEY_PREFIX}${projectName}`;
  }

  private async loadKey(key: string): Promise<FeedbackRecord[]> {
    const raw = await this.client.get<unknown[]>(key);
    return Array.isArray(raw) ? raw.map(reviveRecord) : [];
  }

  private async saveKey(key: string, records: FeedbackRecord[]): Promise<void> {
    try {
      await this.client.set(key, records);
    } catch (err) {
      throw new StorePersistenceError("Failed to persist feedback to KV", { cause: err });
    }
  }

  private async projectKeys(): Promise<string[]> {
    try {
      return await this.client.keys(`${KEY_PREFIX}*`);
    } catch {
      return [];
    }
  }

  async createFeedback(data: FeedbackCreateInput): Promise<FeedbackRecord> {
    const key = this.keyFor(data.projectName);
    const records = await this.loadKey(key);
    const existing = records.find((r) => r.clientId === data.clientId);
    if (existing) return existing; // idempotent on clientId
    const record = buildRecord(data);
    records.unshift(record); // newest first
    await this.saveKey(key, records);
    return record;
  }

  async getFeedbacks(query: FeedbackQuery): Promise<FeedbackPage> {
    return filterAndPaginate(await this.loadKey(this.keyFor(query.projectName)), query);
  }

  async findByClientId(clientId: string): Promise<FeedbackRecord | null> {
    for (const key of await this.projectKeys()) {
      const hit = (await this.loadKey(key)).find((r) => r.clientId === clientId);
      if (hit) return hit;
    }
    return null;
  }

  async updateFeedback(id: string, data: FeedbackUpdateInput): Promise<FeedbackRecord> {
    for (const key of await this.projectKeys()) {
      const records = await this.loadKey(key);
      const rec = records.find((r) => r.id === id);
      if (rec) {
        rec.status = data.status;
        rec.resolvedAt = data.resolvedAt;
        rec.updatedAt = new Date();
        await this.saveKey(key, records);
        return rec;
      }
    }
    throw new StoreNotFoundError();
  }

  async deleteFeedback(id: string): Promise<void> {
    for (const key of await this.projectKeys()) {
      const records = await this.loadKey(key);
      const idx = records.findIndex((r) => r.id === id);
      if (idx !== -1) {
        records.splice(idx, 1);
        await this.saveKey(key, records);
        return;
      }
    }
    throw new StoreNotFoundError();
  }

  async deleteAllFeedbacks(projectName: string): Promise<void> {
    try {
      await this.client.del(this.keyFor(projectName));
    } catch (err) {
      throw new StorePersistenceError("Failed to delete feedbacks from KV", { cause: err });
    }
  }
}

/* ------------------------------------------------------------------ *
 * In-memory fallback — local-dev only. Kept on `globalThis` so Next's dev
 * HMR (which re-evaluates modules) doesn't wipe comments between edits.
 * ------------------------------------------------------------------ */
const memoryData: Map<string, FeedbackRecord[]> =
  ((globalThis as { __feedbackMem?: Map<string, FeedbackRecord[]> }).__feedbackMem ??=
    new Map());

class MemoryStore implements SitepingStore {
  async createFeedback(data: FeedbackCreateInput): Promise<FeedbackRecord> {
    const records = memoryData.get(data.projectName) ?? [];
    const existing = records.find((r) => r.clientId === data.clientId);
    if (existing) return existing;
    const record = buildRecord(data);
    memoryData.set(data.projectName, [record, ...records]);
    return record;
  }

  async getFeedbacks(query: FeedbackQuery): Promise<FeedbackPage> {
    const all = [...memoryData.values()].flat();
    return filterAndPaginate(all, query);
  }

  async findByClientId(clientId: string): Promise<FeedbackRecord | null> {
    for (const records of memoryData.values()) {
      const hit = records.find((r) => r.clientId === clientId);
      if (hit) return hit;
    }
    return null;
  }

  async updateFeedback(id: string, data: FeedbackUpdateInput): Promise<FeedbackRecord> {
    for (const records of memoryData.values()) {
      const rec = records.find((r) => r.id === id);
      if (rec) {
        rec.status = data.status;
        rec.resolvedAt = data.resolvedAt;
        rec.updatedAt = new Date();
        return rec;
      }
    }
    throw new StoreNotFoundError();
  }

  async deleteFeedback(id: string): Promise<void> {
    for (const records of memoryData.values()) {
      const idx = records.findIndex((r) => r.id === id);
      if (idx !== -1) {
        records.splice(idx, 1);
        return;
      }
    }
    throw new StoreNotFoundError();
  }

  async deleteAllFeedbacks(projectName: string): Promise<void> {
    memoryData.delete(projectName);
  }
}

/* ------------------------------------------------------------------ *
 * Store selection — memoized per server process.
 * ------------------------------------------------------------------ */
let cachedStore: SitepingStore | null = null;

export function getStore(): SitepingStore {
  if (cachedStore) return cachedStore;

  // Vercel KV injects KV_REST_API_*; the Upstash marketplace integration uses
  // UPSTASH_REDIS_REST_*. Accept either pair.
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    cachedStore = new KvStore(createClient({ url, token }));
  } else {
    const msg =
      process.env.NODE_ENV === "production"
        ? "[feedback] KV env vars missing in production — falling back to a per-instance in-memory store. Comments will NOT be shared across users or survive a deploy. Create a Vercel KV / Upstash store and connect it to this project to enable shared storage."
        : "[feedback] KV env vars missing — using in-memory dev store (per-process, not durable). Run `vercel env pull` to test against real KV locally.";
    console.warn(msg);
    cachedStore = new MemoryStore();
  }

  return cachedStore;
}

/* ------------------------------------------------------------------ *
 * Wire mappers — translate between the widget's payload/response shapes and
 * the persisted record.
 * ------------------------------------------------------------------ */

/**
 * Flatten the widget's nested `FeedbackPayload` (annotations as `{ anchor,
 * rect, … }`) into the flat `FeedbackCreateInput` the store persists. New
 * feedback always starts `open` — the payload carries no status.
 */
export function toCreateInput(payload: FeedbackPayload): FeedbackCreateInput {
  return {
    projectName: payload.projectName,
    type: payload.type,
    message: payload.message,
    status: "open",
    url: payload.url,
    urlPattern: payload.urlPattern ?? null,
    viewport: payload.viewport,
    userAgent: payload.userAgent,
    authorName: payload.authorName,
    authorEmail: payload.authorEmail,
    clientId: payload.clientId,
    screenshotDataUrl: payload.screenshotDataUrl ?? null,
    diagnostics: payload.diagnostics ?? null,
    annotations: payload.annotations.map((a) => ({
      cssSelector: a.anchor.cssSelector,
      xpath: a.anchor.xpath,
      textSnippet: a.anchor.textSnippet,
      elementTag: a.anchor.elementTag,
      elementId: a.anchor.elementId,
      textPrefix: a.anchor.textPrefix,
      textSuffix: a.anchor.textSuffix,
      fingerprint: a.anchor.fingerprint,
      neighborText: a.anchor.neighborText,
      anchorKey: a.anchor.anchorKey ?? null,
      xPct: a.rect.xPct,
      yPct: a.rect.yPct,
      wPct: a.rect.wPct,
      hPct: a.rect.hPct,
      scrollX: a.scrollX,
      scrollY: a.scrollY,
      viewportW: a.viewportW,
      viewportH: a.viewportH,
      devicePixelRatio: a.devicePixelRatio,
    })),
  };
}

/** Serialize a persisted record to the API response shape (dates → ISO strings). */
export function toResponse(record: FeedbackRecord): FeedbackResponse {
  return {
    id: record.id,
    projectName: record.projectName,
    type: record.type,
    message: record.message,
    status: record.status,
    url: record.url,
    urlPattern: record.urlPattern,
    viewport: record.viewport,
    userAgent: record.userAgent,
    authorName: record.authorName,
    authorEmail: record.authorEmail,
    resolvedAt: record.resolvedAt ? record.resolvedAt.toISOString() : null,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
    annotations: record.annotations.map(
      (a): AnnotationResponse => ({
        id: a.id,
        feedbackId: a.feedbackId,
        cssSelector: a.cssSelector,
        xpath: a.xpath,
        textSnippet: a.textSnippet,
        elementTag: a.elementTag,
        elementId: a.elementId,
        textPrefix: a.textPrefix,
        textSuffix: a.textSuffix,
        fingerprint: a.fingerprint,
        neighborText: a.neighborText,
        anchorKey: a.anchorKey,
        xPct: a.xPct,
        yPct: a.yPct,
        wPct: a.wPct,
        hPct: a.hPct,
        scrollX: a.scrollX,
        scrollY: a.scrollY,
        viewportW: a.viewportW,
        viewportH: a.viewportH,
        devicePixelRatio: a.devicePixelRatio,
        createdAt: a.createdAt.toISOString(),
      }),
    ),
    screenshotUrl: record.screenshotUrl,
    diagnostics: record.diagnostics,
  };
}
