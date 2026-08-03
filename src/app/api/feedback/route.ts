/**
 * HTTP endpoint for `@navanta/feedback-widget` (HTTP mode → one shared store
 * for every reviewer). The widget talks to this single route, switching on
 * method. The exact contract was verified against the package's compiled
 * client:
 *
 *  - POST   — create. Body is the raw `FeedbackPayload` (annotations nested as
 *             `{ anchor, rect, … }`). Idempotent on `clientId`. Returns the
 *             created `FeedbackResponse`.
 *  - GET    — list. `?projectName=` (required) plus optional
 *             `type,status,search,url,urlPattern,page,limit`. Returns
 *             `{ feedbacks, total }`.
 *  - PATCH  — resolve/reopen. Body `{ id, projectName, status }` (the widget
 *             sends no `resolvedAt`, so we derive it). Returns the updated
 *             `FeedbackResponse`.
 *  - DELETE — `{ id, projectName }` deletes one; `{ projectName, deleteAll:true }`
 *             deletes all for the project.
 *
 * All responses set `Cache-Control: no-store`.
 */
import type { FeedbackPayload, FeedbackStatus, FeedbackType } from "@navanta/feedback-widget";
import { getStore, toCreateInput, toResponse, errorCode } from "@/lib/feedback/store";

// Always run at request time — this route reads the request and a durable store.
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: NO_STORE });
}

function error(status: number, message: string): Response {
  return json({ error: message }, status);
}

function mapStoreError(err: unknown): Response {
  const code = errorCode(err);
  if (code === "STORE_NOT_FOUND") return error(404, "Feedback not found");
  console.error("[feedback] store error:", err);
  return error(500, "Internal error");
}

/** POST — create a feedback (idempotent on clientId). */
export async function POST(request: Request): Promise<Response> {
  let payload: FeedbackPayload;
  try {
    payload = (await request.json()) as FeedbackPayload;
  } catch {
    return error(400, "Invalid JSON body");
  }
  if (!payload || typeof payload.projectName !== "string" || !payload.projectName) {
    return error(400, "projectName is required");
  }
  if (typeof payload.clientId !== "string" || !payload.clientId) {
    return error(400, "clientId is required");
  }
  if (!Array.isArray(payload.annotations)) {
    return error(400, "annotations must be an array");
  }

  const store = getStore();
  try {
    const record = await store.createFeedback(toCreateInput(payload));
    return json(toResponse(record));
  } catch (err) {
    // Belt-and-suspenders: our store returns the existing record on a
    // duplicate clientId, but if a store ever throws STORE_DUPLICATE instead,
    // honor the idempotency contract by returning the existing record.
    if (errorCode(err) === "STORE_DUPLICATE") {
      const existing = await store.findByClientId(payload.clientId);
      if (existing) return json(toResponse(existing));
    }
    return mapStoreError(err);
  }
}

/** GET — list feedbacks for a project, with optional filters + pagination. */
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const projectName = searchParams.get("projectName");
  if (!projectName) return error(400, "projectName is required");

  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  const query = {
    projectName,
    type: (searchParams.get("type") as FeedbackType | null) ?? undefined,
    status: (searchParams.get("status") as FeedbackStatus | null) ?? undefined,
    search: searchParams.get("search") ?? undefined,
    url: searchParams.get("url") ?? undefined,
    urlPattern: searchParams.get("urlPattern") ?? undefined,
    page: pageParam ? Number(pageParam) : undefined,
    limit: limitParam ? Number(limitParam) : undefined,
  };

  try {
    const { feedbacks, total } = await getStore().getFeedbacks(query);
    return json({ feedbacks: feedbacks.map(toResponse), total });
  } catch (err) {
    return mapStoreError(err);
  }
}

/** PATCH — resolve or reopen a feedback. */
export async function PATCH(request: Request): Promise<Response> {
  let body: { id?: unknown; status?: unknown; resolvedAt?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return error(400, "Invalid JSON body");
  }
  const id = typeof body.id === "string" ? body.id : "";
  const status = body.status === "resolved" || body.status === "open" ? body.status : null;
  if (!id) return error(400, "id is required");
  if (!status) return error(400, "status must be 'open' or 'resolved'");

  // The widget never sends resolvedAt — derive it from the target status.
  const resolvedAt =
    status === "resolved"
      ? typeof body.resolvedAt === "string"
        ? new Date(body.resolvedAt)
        : new Date()
      : null;

  try {
    const record = await getStore().updateFeedback(id, { status, resolvedAt });
    return json(toResponse(record));
  } catch (err) {
    return mapStoreError(err);
  }
}

/** DELETE — remove one feedback, or all feedbacks for a project. */
export async function DELETE(request: Request): Promise<Response> {
  let body: { id?: unknown; projectName?: unknown; deleteAll?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return error(400, "Invalid JSON body");
  }

  const store = getStore();
  try {
    if (body.deleteAll === true) {
      if (typeof body.projectName !== "string" || !body.projectName) {
        return error(400, "projectName is required for deleteAll");
      }
      await store.deleteAllFeedbacks(body.projectName);
      return json({ ok: true });
    }

    const id = typeof body.id === "string" ? body.id : "";
    if (!id) return error(400, "id is required (or set deleteAll: true)");
    await store.deleteFeedback(id);
    return json({ ok: true });
  } catch (err) {
    return mapStoreError(err);
  }
}
