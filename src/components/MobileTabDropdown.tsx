"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown, Check } from "@phosphor-icons/react";

type Props = {
  items: { key: string; label: string }[];
  active: number;
  onChange: (i: number) => void;
  variant?: "light" | "dark";
};

export default function MobileTabDropdown({ items, active, onChange, variant = "light" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const isDark = variant === "dark";

  return (
    <div ref={ref} className="relative md:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-[15px] font-medium transition-colors ${
          isDark
            ? "border-white/15 bg-white/[0.06] text-white"
            : "border-zinc-200 bg-zinc-50 text-zinc-900"
        }`}
      >
        {items[active].label}
        <CaretDown
          size={16}
          weight="bold"
          className={`transition-transform ${open ? "rotate-180" : ""} ${isDark ? "text-zinc-400" : "text-zinc-400"}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-0 right-0 top-full z-30 mt-1.5 overflow-hidden rounded-xl border shadow-lg ${
              isDark
                ? "border-white/10 bg-white/[0.08] backdrop-blur-2xl backdrop-saturate-150"
                : "border-zinc-200 bg-white"
            }`}
          >
            {items.map((item, i) => (
              <button
                key={item.key}
                onClick={() => { onChange(i); setOpen(false); }}
                className={`flex w-full items-center justify-between px-4 py-3 text-left text-[15px] font-medium transition-colors ${
                  i === active
                    ? isDark
                      ? "bg-white/10 text-white"
                      : "bg-zinc-100 text-zinc-900"
                    : isDark
                      ? "text-zinc-300 hover:bg-white/[0.06]"
                      : "text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {item.label}
                {i === active && (
                  <Check size={16} weight="bold" className={isDark ? "text-white" : "text-zinc-900"} />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
