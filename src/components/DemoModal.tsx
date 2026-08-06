"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  CaretLeft,
  CaretRight,
  CheckCircle,
  ArrowRight,
  GlobeSimple,
} from "@phosphor-icons/react";
import DemoBrandPanel from "./DemoBrandPanel";

/* ── Content (Navanta-specific; swap freely) ─────────────────────────────── */

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

/* Local-date → yyyy-mm-dd. Built from the calendar-date parts (not toISOString,
   which would shift across the UTC boundary), so lexical string compares line
   up with calendar days. */
function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/* yyyy-mm → sortable month index, for bounding calendar navigation. */
function monthIndexOf(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  return y * 12 + (m - 1);
}

/* "2026-02-03" → "Tue, Feb 3" for the summary line. Parsed as local parts so
   the weekday/day never drift by a timezone. */
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
  // "now"-derived state is set on the client only, so the server render and the
  // first client render match (no hydration mismatch) and dates stay correct.
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState({ y: 2025, m: 0 });
  const [minISO, setMinISO] = useState("");
  const [maxISO, setMaxISO] = useState("");

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const min = new Date(now);
    min.setDate(min.getDate() + 1); // first bookable day is tomorrow
    const max = new Date(now);
    max.setDate(max.getDate() + BOOKING_WINDOW_DAYS);
    setMinISO(toISODate(min));
    setMaxISO(toISODate(max));
    // Open on the month that actually holds availability.
    setView({ y: min.getFullYear(), m: min.getMonth() });
    setMounted(true);
  }, []);

  // Reserve the calendar's height before mount so the modal doesn't jump.
  if (!mounted) return <div className="h-[316px]" aria-hidden />;

  const first = new Date(view.y, view.m, 1);
  const startOffset = (first.getDay() + 6) % 7; // Monday-first column offset
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

/* ── Context so any CTA can open the modal ───────────────────────────────── */

type Ctx = { open: () => void; close: () => void };
const DemoModalContext = createContext<Ctx | null>(null);

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) throw new Error("useDemoModal must be used within DemoModalProvider");
  return ctx;
}

/* Reusable CTA — lets server components (About, etc.) open the modal. */
export function OpenDemoButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useDemoModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      <DemoModal isOpen={isOpen} onClose={close} />
    </DemoModalContext.Provider>
  );
}

/* ── Modal ───────────────────────────────────────────────────────────────── */

function DemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<string | null>(null); // yyyy-mm-dd
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [tz, setTz] = useState<string>("");

  // Detected timezone label, client-side only (avoids hydration drift).
  useEffect(() => {
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const now = new Date().toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      });
      setTz(`${zone.replace(/_/g, " ")} · ${now}`);
    } catch {
      /* no-op — timezone line is a nicety, not required */
    }
  }, [isOpen]);

  // Reset when it closes, and lock body scroll while open. Esc closes.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
    // small delay avoids a flash of step 0 while the close animation plays
    const t = setTimeout(() => {
      setStep(0);
      setDate(null);
      setTime(null);
      setBooked(false);
    }, 250);
    return () => clearTimeout(t);
  }, [isOpen, onClose]);

  const canAdvance =
    (step === 0 && date !== null && time !== null) || step === 1;

  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "clip-path" }}
          className="fixed inset-0 z-[100] grid grid-cols-1 bg-[#faf9f7] md:grid-cols-[1fr_0.92fr]"
        >
          {/* Close, top-right, right where the demo button that opened it lives */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-md ring-1 ring-black/5 transition-colors hover:bg-zinc-100"
          >
            <X size={18} weight="bold" />
          </button>

          {/* Left, flow (vertically centered on cream, white step card) */}
          <div className="flex h-full flex-col justify-center overflow-y-auto px-6 py-16 sm:px-12 lg:px-20">
            <div className="mx-auto w-full max-w-[560px]">
              <h2 className="font-medium tracking-tight text-zinc-900">
                Request a Demo
              </h2>
              <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-zinc-500">
                See Navanta on your data within a week, planning, procurement,
                and order flows on your own systems.
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
                      className="flex h-full flex-col items-center justify-center py-10 text-center"
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
                        onClick={onClose}
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
                      <p className="mb-3 text-[13px] font-medium text-zinc-700">Select a date</p>
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
                                      ? "border-[#5C3D97] bg-[#f7f4fc] text-[#5C3D97] ring-1 ring-[#5C3D97]"
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
                      id="demo-modal-form"
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

              {/* Primary action, full-width below the step card */}
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
                            .querySelector<HTMLFormElement>("#demo-modal-form")
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
          </div>

          {/* Right, shared brand panel (matches the contact page) */}
          <div className="hidden md:block">
            <DemoBrandPanel />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
