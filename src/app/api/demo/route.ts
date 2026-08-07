/**
 * POST /api/demo — receives a "Request a Demo" submission.
 *
 * Order of operations matters: the lead is persisted to KV *before* email is
 * attempted, so a Resend outage costs us a notification, never the lead
 * itself. Email failure is still surfaced as a 500 so the user is told to
 * follow up rather than shown a false confirmation.
 *
 * Spam handling is deliberately light — a honeypot plus a per-IP rate limit.
 * At this volume a CAPTCHA would cost more conversions than it saves.
 */
import { createClient, type VercelKV } from "@vercel/kv";
import { sendDemoRequest, MailNotConfiguredError, type DemoRequest } from "@/lib/demo/mail";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

/* Rate limit: this many submissions per IP per window. Generous enough that a
   real person retrying after a typo is never blocked. */
const RATE_LIMIT = 5;
const RATE_WINDOW_S = 60 * 60;

/* Field caps — anything longer is a bot or a paste accident, and unbounded
   strings would end up inlined into an email. */
const MAX = { name: 120, email: 200, company: 160, phone: 40, focus: 2000, tz: 80 } as const;

function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: NO_STORE });
}

function error(status: number, message: string): Response {
  return json({ error: message }, status);
}

/* Same env-var contract as the feedback store: Vercel KV or the Upstash
   marketplace pair, whichever the project happens to be connected to. */
function kv(): VercelKV | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? createClient({ url, token }) : null;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Returns true when this IP has exceeded its window. Never blocks on error —
    a KV hiccup must not take the form down. */
async function rateLimited(store: VercelKV | null, ip: string): Promise<boolean> {
  if (!store || ip === "unknown") return false;
  try {
    const key = `demo:rate:${ip}`;
    const n = await store.incr(key);
    if (n === 1) await store.expire(key, RATE_WINDOW_S);
    return n > RATE_LIMIT;
  } catch (err) {
    console.error("[demo] rate-limit check failed, allowing through:", err);
    return false;
  }
}

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/* Intentionally permissive — the real proof an address works is the
   confirmation email landing, not a regex. This only catches obvious junk. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return error(400, "Invalid JSON body");
  }

  // Honeypot: a field hidden from humans, irresistible to naive bots. Answer
  // 200 so the bot believes it succeeded and doesn't retry with variations.
  if (str(body.website, 200)) return json({ ok: true });

  const req: DemoRequest = {
    name: str(body.name, MAX.name),
    email: str(body.email, MAX.email),
    company: str(body.company, MAX.company),
    phone: str(body.phone, MAX.phone),
    focus: str(body.focus, MAX.focus),
    date: str(body.date, 10),
    time: str(body.time, 20),
    timezone: str(body.timezone, MAX.tz),
  };

  if (!req.name) return error(400, "Name is required");
  if (!EMAIL_RE.test(req.email)) return error(400, "A valid work email is required");
  if (!req.company) return error(400, "Company is required");
  if (!ISO_DATE_RE.test(req.date) || !req.time) {
    return error(400, "Please pick a date and time");
  }

  const store = kv();
  const ip = clientIp(request);
  if (await rateLimited(store, ip)) {
    return error(429, "Too many requests. Please try again later.");
  }

  // Persist first — see the file header for why this precedes the send.
  const id = `demo_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  if (store) {
    try {
      const record = { id, ...req, ip, createdAt: new Date().toISOString() };
      await store.set(`demo:lead:${id}`, record);
      await store.lpush("demo:leads", id);
    } catch (err) {
      console.error("[demo] failed to persist lead:", err);
    }
  } else {
    // Without KV the email is the only copy, so make the lead recoverable
    // from the function logs if the send then fails.
    console.warn("[demo] KV not configured — lead not persisted:", JSON.stringify(req));
  }

  try {
    await sendDemoRequest(req);
  } catch (err) {
    if (err instanceof MailNotConfiguredError) {
      console.error("[demo] RESEND_API_KEY missing — request stored but no email sent.");
    } else {
      console.error("[demo] email send failed:", err);
    }
    return error(500, "We couldn't send your request. Please email info@navanta.ai directly.");
  }

  return json({ ok: true, id });
}
