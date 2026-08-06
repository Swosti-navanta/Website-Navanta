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
import { X } from "@phosphor-icons/react";
import DemoBrandPanel from "./DemoBrandPanel";
import DemoFlow from "./DemoFlow";

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
  // Body-scroll lock + Esc-to-close. The flow's internal state resets whenever
  // the modal unmounts (via React key on the DemoFlow below when isOpen flips).
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
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

          {/* Left, shared flow (vertically centered on cream, white step card) */}
          <div className="flex h-full flex-col justify-center overflow-y-auto px-6 py-16 sm:px-12 lg:px-20">
            <div className="mx-auto w-full max-w-[560px]">
              <DemoFlow onDone={onClose} formIdSuffix="modal" />
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
