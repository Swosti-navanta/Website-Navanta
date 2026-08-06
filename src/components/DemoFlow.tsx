"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CaretLeft,
  CaretRight,
  CheckCircle,
  ArrowRight,
  GlobeSimple,
} from "@phosphor-icons/react";

/* Shared "Request a Demo" flow — heading + intro + step card + CTA + booked
   state. Used by DemoModal (inside a fullscreen overlay) and by the contact
   page (inline). Keeps the two surfaces in perfect lockstep. */

// Placeholder available times (UI-only).
const TIMES = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

const STEPS = ["Date & Time", "Your Details"] as const;

/* How far out demos can be booked, and which days are open. Weekends are
   closed; bookings run from tomorrow through BOOKING_WINDOW_DAYS ahead. */
const BOOKING_WINDOW_DAYS = 21;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function monthIndexOf(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  return y * 12 + (m - 1);
}

function formatFriendly(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/* ── Calendar ────────────────────────────────────────────────────────────── */

function Calendar({
  value,
  onSelect,
}: {
  value: string | null;
  onSelect: (iso: string) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState({ y: 2025, m: 0 });
  const [minISO, setMinISO] = useState("");
  const [maxISO, setMaxISO] = useState("");

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const min = new Date(now);
    min.setDate(min.getDate() + 1);
    const max = new Date(now);
    max.setDate(max.getDate() + BOOKING_WINDOW_DAYS);
    setMinISO(toISODate(min));
    setMaxISO(toISODate(max));
    setView({ y: min.getFullYear(), m: min.getMonth() });
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[316px]" aria-hidden />;

  const first = new Date(view.y, view.m, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.y, view.m, d));

  const viewIdx = view.y * 12 + view.m;
  const canPrev = viewIdx > monthIndexOf(minISO);
  const canNext = viewIdx < monthIndexOf(maxISO);

  const step = (dir: -1 | 1) =>
    setView((v) => {
      const m = v.m + dir;
      if (m < 0) return { y: v.y - 1, m: 11 };
      if (m > 11) return { y: v.y + 1, m: 0 };
      return { y: v.y, m };
    });

  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => canPrev && step(-1)}
          disabled={!canPrev}
          aria-label="Previous month"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EBE8F3] text-[#5C3D97] transition-colors hover:bg-[#dcd5ec] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <CaretLeft size={14} weight="bold" />
        </button>
        <p className="min-w-[150px] text-center text-[14px] font-semibold text-zinc-900">
          {MONTHS[view.m]} {view.y}
        </p>
        <button
          type="button"
          onClick={() => canNext && step(1)}
          disabled={!canNext}
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EBE8F3] text-[#5C3D97] transition-colors hover:bg-[#dcd5ec] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <CaretRight size={14} weight="bold" />
        </button>
      </div>

      <div className="mb-1.5 grid grid-cols-7 text-center text-[10.5px] font-medium tracking-[0.05em] text-zinc-400">
        {WEEKDAYS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1.5">
        {cells.map((cell, i) => {
          if (!cell) return <span key={`pad-${i}`} aria-hidden />;
          const cellISO = toISODate(cell);
          const weekend = cell.getDay() === 0 || cell.getDay() === 6;
          const disabled = weekend || cellISO < minISO || cellISO > maxISO;
          const selected = value === cellISO;
          return (
            <div key={cellISO} className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => !disabled && onSelect(cellISO)}
                disabled={disabled}
                aria-pressed={selected}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-medium transition-colors ${
                  selected
                    ? "bg-[#5C3D97] text-white"
                    : disabled
                      ? "cursor-not-allowed text-zinc-300"
                      : "bg-[#EBE8F3] text-[#5C3D97] hover:bg-[#dcd5ec]"
                }`}
              >
                {cell.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Small input used inside the details form. */
function Input({
  label,
  type,
  required,
}: {
  label: string;
  type: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      required={required}
      placeholder={label}
      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-[14px] text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-[#5C3D97]"
    />
  );
}

/* ── The flow ────────────────────────────────────────────────────────────── */

export default function DemoFlow({
  /* Where to send focus / call after "Done" on the booked screen. Optional; if
     omitted the button just does nothing (contact page keeps the confirmation
     visible until the user navigates away). */
  onDone,
  /* When true the form id is unique per instance so multiple flows on a page
     don't collide. Set to "modal" in the modal to preserve the existing
     external requestSubmit hook. */
  formIdSuffix = "flow",
  /* Optional short-form scoped id used to prefix input ids so labels resolve
     to the right input when the same page renders the flow twice. */
  idScope = "demo",
}: {
  onDone?: () => void;
  formIdSuffix?: string;
  idScope?: string;
}) {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [tz, setTz] = useState<string>("");

  useEffect(() => {
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const now = new Date().toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      });
      setTz(`${zone.replace(/_/g, " ")} · ${now}`);
    } catch {
      /* no-op */
    }
  }, []);

  const formId = `${idScope}-form-${formIdSuffix}`;
  const canAdvance =
    (step === 0 && date !== null && time !== null) || step === 1;
  const back = () => setStep((s) => Math.max(0, s - 1));

  const reset = () => {
    setStep(0);
    setDate(null);
    setTime(null);
    setBooked(false);
  };

  return (
    <div>
      <h2 className="font-medium tracking-tight text-zinc-900">Request a Demo</h2>
      <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-zinc-500">
        See Navanta on your data within a week, planning, procurement, and
        order flows on your own systems.
      </p>

      {/* Step card */}
      <div className="mt-8 rounded-2xl border border-zinc-100 bg-white p-7 shadow-sm sm:p-9">
        {step > 0 && !booked && (
          <button
            onClick={back}
            className="mb-3 flex items-center gap-1 text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-700"
          >
            <CaretLeft size={13} weight="bold" /> Back
          </button>
        )}

        {/* Step indicator */}
        {!booked && (
          <div className="flex gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex-1">
                <div
                  className={`h-1 rounded-full transition-colors duration-300 ${
                    i <= step ? "bg-[#5C3D97]" : "bg-zinc-200"
                  }`}
                />
                <span
                  className={`mt-1.5 block text-[11px] font-medium transition-colors ${
                    i === step ? "text-zinc-900" : "text-zinc-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {booked ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <CheckCircle size={54} weight="fill" className="text-[#5C3D97]" />
                <h3 className="mt-4 text-[20px] font-medium text-zinc-900">
                  You&apos;re booked in
                </h3>
                <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-zinc-500">
                  A calendar invite and confirmation are on their way to your
                  inbox. We&apos;ll come prepared with your use case in mind.
                </p>
                <button
                  onClick={() => (onDone ? onDone() : reset())}
                  className="mt-7 rounded-lg bg-zinc-900 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-zinc-800"
                >
                  Done
                </button>
              </motion.div>
            ) : step === 0 ? (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22 }}
              >
                <p className="mb-3 text-[13px] font-medium text-zinc-700">
                  Select a date
                </p>
                <Calendar
                  value={date}
                  onSelect={(iso) => {
                    setDate(iso);
                    setTime(null); // a new day clears the prior time pick
                  }}
                />

                {tz && (
                  <div className="mt-4 flex items-center gap-1.5 border-t border-zinc-100 pt-3 text-[11.5px] text-zinc-400">
                    <GlobeSimple size={13} />
                    <span>{tz}</span>
                  </div>
                )}

                <AnimatePresence initial={false}>
                  {date && (
                    <motion.div
                      key="times"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mb-2 mt-6 text-[13px] font-medium text-zinc-700">
                        Available times
                      </p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {TIMES.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTime(t)}
                            className={`rounded-lg border py-2.5 text-[13px] font-medium transition-all ${
                              time === t
                                ? "border-2 border-[#5C3D97] bg-[#f7f4fc] text-[#5C3D97]"
                                : "border-zinc-200 text-zinc-700 hover:border-zinc-300"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.form
                key="s2"
                id={formId}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setBooked(true);
                }}
                className="space-y-4"
              >
                <Input label="Full Name" type="text" required />
                <Input label="Work Email" type="email" required />
                <Input label="Company" type="text" required />
                <Input label="Phone (optional)" type="tel" />
                <textarea
                  placeholder="What would you like to focus on? (optional)"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-4 py-3 text-[14px] text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-[#5C3D97]"
                />
                <label className="flex items-start gap-2 pt-1 text-[13px] text-zinc-600">
                  <input type="checkbox" required className="mt-0.5 accent-[#5C3D97]" />
                  <span>
                    I agree to be contacted about my demo and accept the{" "}
                    <a href="/privacy" className="underline hover:text-[#5C3D97]">
                      privacy policy
                    </a>
                    .
                  </span>
                </label>
                <button type="submit" className="hidden" />
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {!booked && (
        <div className="mt-4">
          {date && time && (
            <p className="mb-2.5 text-center text-[12.5px] text-zinc-400">
              {formatFriendly(date)}, {time}
            </p>
          )}
          <button
            onClick={() =>
              step === 1
                ? document
                    .querySelector<HTMLFormElement>(`#${formId}`)
                    ?.requestSubmit()
                : setStep((s) => s + 1)
            }
            disabled={!canAdvance}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-4 text-[14.5px] font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {step === 1 ? "Confirm Booking" : "Continue"}
            <ArrowRight size={15} weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
}
