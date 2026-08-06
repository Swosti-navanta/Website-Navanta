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
import { X, CheckCircle } from "@phosphor-icons/react";

/* ── Content (Navanta-specific; swap freely) ─────────────────────────────── */

const KPIS = [
  { value: "12–16 wks", label: "kickoff to launch" },
  { value: "30+", label: "enterprise systems" },
  { value: "50+", label: "supply-chain signals" },
];

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
  const [submitted, setSubmitted] = useState(false);

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
    // small delay avoids a flash of the initial state while the close animation plays
    const t = setTimeout(() => setSubmitted(false), 250);
    return () => clearTimeout(t);
  }, [isOpen, onClose]);

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

          {/* Left, form (matches the contact page's Request a Demo form) */}
          <div className="flex h-full flex-col justify-center overflow-y-auto px-6 py-16 sm:px-12 lg:px-20">
            <div className="mx-auto w-full max-w-[560px]">
              <h2 className="font-medium tracking-tight text-zinc-900">
                Request a Demo
              </h2>
              <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-zinc-500">
                See Navanta on your data within a week, planning, procurement,
                and order flows running on your own systems.
              </p>

              <div className="mt-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center py-8 text-center"
                    >
                      <CheckCircle size={54} weight="fill" className="text-[#5C3D97]" />
                      <h3 className="mt-4 text-[20px] font-medium text-zinc-900">
                        Thanks — we&apos;ll be in touch
                      </h3>
                      <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-zinc-500">
                        A confirmation is on its way to your inbox. We&apos;ll come
                        prepared with your use case in mind.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-7 rounded-lg bg-zinc-900 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-zinc-800"
                      >
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="space-y-4"
                    >
                      <Field label="Name" name="name" type="text" required />
                      <Field label="Work Email" name="email" type="email" required />
                      <Field label="Company" name="company" type="text" required />
                      <div>
                        <label
                          htmlFor="message"
                          className="mb-1.5 block text-[13px] font-medium text-zinc-700"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-4 py-3 text-[14px] text-zinc-900 outline-none transition-colors focus:border-[#5C3D97]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="rounded-lg bg-zinc-900 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-zinc-800"
                      >
                        Request a Demo
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
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

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[13px] font-medium text-zinc-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-[14px] text-zinc-900 outline-none transition-colors focus:border-[#5C3D97]"
      />
    </div>
  );
}
