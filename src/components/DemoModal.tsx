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
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";

/* ── Content (Navanta-specific; swap freely) ─────────────────────────────── */

// Placeholder available slots (UI-only).
const DATES = ["Mon 3", "Tue 4", "Wed 5", "Thu 6", "Fri 7", "Mon 10"];
const TIMES = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

const KPIS = [
  { value: "12–16 wks", label: "kickoff to launch" },
  { value: "30+", label: "enterprise systems" },
  { value: "50+", label: "supply-chain signals" },
];

const STEPS = ["Date & Time", "Your Details"] as const;

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
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

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
              <h2 className="text-[30px] font-medium tracking-tight text-zinc-900 sm:text-[38px]">
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
                      <p className="mb-2 text-[13px] font-medium text-zinc-700">Select a date</p>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {DATES.map((d) => (
                          <button
                            key={d}
                            onClick={() => setDate(d)}
                            className={`rounded-lg border py-3 text-[13px] font-medium transition-all ${
                              date === d
                                ? "border-[#5C3D97] bg-[#5C3D97] text-white"
                                : "border-zinc-200 text-zinc-700 hover:border-zinc-300"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      <p className="mb-2 mt-8 text-[13px] font-medium text-zinc-700">
                        Available times
                      </p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {TIMES.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTime(t)}
                            disabled={!date}
                            className={`rounded-lg border py-2.5 text-[13px] font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
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
                      {date}, {time}
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

          {/* Right, brand image with KPI chips (placeholder until final asset) */}
          <div className="relative hidden overflow-hidden bg-zinc-900 md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/footer-railyard.jpg"
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"
            />
            <div className="relative flex h-full flex-col justify-between p-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/navanta-logo.svg" alt="Navanta" className="h-8 w-auto" />

              <div>
                <div className="flex flex-wrap gap-2.5">
                  {KPIS.map((k) => (
                    <div
                      key={k.label}
                      className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 backdrop-blur-md"
                    >
                      <p className="text-[18px] font-semibold leading-none text-white">
                        {k.value}
                      </p>
                      <p className="mt-1 text-[11px] leading-tight text-white/70">
                        {k.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 max-w-md text-[17px] font-medium leading-snug text-white">
                  The supply chain intelligence layer for industrial enterprises.
                </p>
              </div>
            </div>
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
