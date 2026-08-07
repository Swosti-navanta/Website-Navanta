/**
 * Transactional mail for demo requests, sent through Resend.
 *
 * Two messages go out per request:
 *  - a notification to the Navanta inbox, with `replyTo` set to the requester
 *    so hitting reply in the mail client answers the lead directly;
 *  - a confirmation to the requester.
 *
 * The confirmation is deliberately worded as "request received", not
 * "confirmed" — nothing here touches a calendar, so the slot is a preference
 * until a human books it. Promising more than that in the email would be a
 * lie the product can't keep.
 *
 * `RESEND_API_KEY` is read lazily rather than at module scope so a missing key
 * fails the one request that needs it instead of the whole route bundle.
 */
import { Resend } from "resend";

/* Both addresses are env-overridable so the sender can move to a verified
   navanta.ai without a code change.
 *
 * Until navanta.ai is verified in Resend, `onboarding@resend.dev` is the only
 * usable sender — and in that mode Resend will ONLY deliver to the address
 * that owns the Resend account. Requester confirmations to anyone else are
 * rejected, which is exactly why the confirmation send is best-effort below.
 * Verify the domain before launch. */
const FROM = process.env.DEMO_MAIL_FROM ?? "Navanta <onboarding@resend.dev>";
const NOTIFY_TO = process.env.DEMO_MAIL_TO ?? "info@navanta.ai";

export type DemoRequest = {
  name: string;
  email: string;
  company: string;
  phone: string;
  focus: string;
  /* ISO date (YYYY-MM-DD) plus the label the user actually clicked, so the
     email reads back exactly what they saw on screen. */
  date: string;
  time: string;
  timezone: string;
};

export class MailNotConfiguredError extends Error {
  readonly code = "MAIL_NOT_CONFIGURED" as const;
  constructor() {
    super("RESEND_API_KEY is not set");
    this.name = "MailNotConfiguredError";
  }
}

function client(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new MailNotConfiguredError();
  return new Resend(key);
}

/* Everything interpolated into the HTML below is attacker-controlled form
   input, so it is escaped rather than trusted. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function prettyDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#71717a;font-size:13px;white-space:nowrap;vertical-align:top">${esc(label)}</td>
    <td style="padding:6px 0;color:#18181b;font-size:14px">${esc(value)}</td>
  </tr>`;
}

function shell(inner: string): string {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px">${inner}</div>`;
}

/** Internal notification — the lead itself, reply-to wired to the requester. */
function notificationEmail(r: DemoRequest) {
  return {
    subject: `Demo request — ${r.name}, ${r.company}`,
    html: shell(`
      <h1 style="margin:0 0 4px;font-size:19px;font-weight:600;color:#18181b">New demo request</h1>
      <p style="margin:0 0 20px;font-size:14px;color:#71717a">Reply to this email to reach ${esc(r.name)} directly.</p>
      <table style="border-collapse:collapse;width:100%">
        ${row("Name", r.name)}
        ${row("Email", r.email)}
        ${row("Company", r.company)}
        ${row("Phone", r.phone)}
        ${row("Requested", `${prettyDate(r.date)} at ${r.time}`)}
        ${row("Timezone", r.timezone)}
        ${row("Focus", r.focus)}
      </table>
      <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e4e4e7;font-size:12px;color:#a1a1aa">
        The slot above is the requester's preference. Confirm it with them — no calendar event has been created.
      </p>
    `),
  };
}

/** Requester confirmation — acknowledges receipt, promises a human follow-up. */
function confirmationEmail(r: DemoRequest) {
  return {
    subject: "We received your Navanta demo request",
    html: shell(`
      <h1 style="margin:0 0 12px;font-size:19px;font-weight:600;color:#18181b">Thanks, ${esc(r.name.split(" ")[0])}</h1>
      <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#3f3f46">
        We've got your demo request and someone from our team will confirm the time with you shortly.
      </p>
      <table style="border-collapse:collapse;width:100%;background:#fafafa;border-radius:8px;padding:4px">
        ${row("You requested", `${prettyDate(r.date)} at ${r.time}`)}
        ${row("Timezone", r.timezone)}
      </table>
      <p style="margin:20px 0 0;font-size:14px;line-height:1.6;color:#3f3f46">
        If that time no longer works, just reply to this email and we'll find another.
      </p>
      <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e4e4e7;font-size:12px;color:#a1a1aa">
        Navanta · Intelligence Layer for Industrial Enterprises
      </p>
    `),
  };
}

/**
 * Sends both emails. The notification is awaited first and its failure is
 * fatal — losing the lead is the one outcome worth failing the request over.
 * The requester's confirmation is best-effort: if it bounces, we still have
 * the lead, so the user should not see an error.
 */
export async function sendDemoRequest(r: DemoRequest): Promise<void> {
  const resend = client();

  const notify = notificationEmail(r);
  const sent = await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    replyTo: r.email,
    subject: notify.subject,
    html: notify.html,
  });
  if (sent.error) throw new Error(`Resend: ${sent.error.message}`);

  const confirm = confirmationEmail(r);
  const ack = await resend.emails
    .send({
      from: FROM,
      to: r.email,
      replyTo: NOTIFY_TO,
      subject: confirm.subject,
      html: confirm.html,
    })
    .catch((err: unknown) => ({ error: err as { message: string } }));
  if (ack.error) console.error("[demo] confirmation email failed:", ack.error);
}
