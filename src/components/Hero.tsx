"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ClockCountdown,
  Flag,
  CheckCircle,
} from "@phosphor-icons/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Agent-activity cards — Navanta supply-chain content
 *  (replaces the placeholder PPF/detailing copy from the mockup) */
const NOTIFICATIONS = [
  {
    icon: ClockCountdown,
    title: "Demand shift detected",
    body: "Midwest DC trending +18% on SKU 4482 — reorder point review suggested",
  },
  {
    icon: Flag,
    title: "Delay risk flagged",
    body: "PO #4821 — Rotterdam ETA slipped 6 days on ocean leg",
    nested: [
      "Expedite via alternate carrier adds $2.1K.",
      "Competitive quote requested.",
    ],
  },
  {
    icon: CheckCircle,
    title: "Reorder executed",
    body: "Auto-PO issued for 240 units — planner approved at 92% confidence",
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#191512]">
      {/* --- Background media --------------------------------------------- */}
      {/* Gradient fallback always renders; video overlays it when the asset
          exists at /public/hero/hero.mp4 (drop in the final footage later). */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,#3a2f26_0%,#241d17_45%,#120f0c_100%)]"
      />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero/hero.mp4"
        poster="/hero/poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Legibility overlays */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/25"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent"
      />

      {/* --- Content -------------------------------------------------------- */}
      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-6 pb-28 pt-36 lg:px-10">
        <div className="max-w-[1080px]">
          <motion.h1
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="text-[40px] font-medium leading-[1.08] tracking-[-0.01em] text-white sm:text-[56px] lg:text-[68px]"
          >
            The Supply Chain Intelligence
            <br />
            Layer for Industrial Enterprises
          </motion.h1>

          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/75 sm:text-[19px]"
          >
            Navanta unifies your orders, inventory, and procurement into one
            intelligence layer — turning fragmented signals into decisions
            from day one.
          </motion.p>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="mt-10"
          >
            <a
              href="#demo"
              className="inline-block rounded-lg bg-white px-6 py-3.5 text-[15px] font-medium text-black transition-colors hover:bg-white/90"
            >
              Request a Demo
            </a>
          </motion.div>
        </div>
      </div>

      {/* --- Agent notification stack (desktop) ----------------------------- */}
      <div className="absolute bottom-20 right-10 z-10 hidden w-[370px] flex-col gap-3 lg:flex">
        {NOTIFICATIONS.map((n, i) => (
          <motion.div
            key={n.title}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 + i * 0.18 }}
            className="rounded-xl border border-white/12 bg-white/[0.07] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <n.icon size={15} className="text-white/70" />
              <span className="text-[13px] font-medium text-white/90">
                {n.title}
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-[13px] leading-snug text-white/70">{n.body}</p>
              {n.nested && (
                <div className="mt-2.5 rounded-lg bg-white/[0.07] px-3 py-2.5">
                  {n.nested.map((line) => (
                    <p
                      key={line}
                      className="text-[12.5px] leading-relaxed text-white/75"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Scroll cue ------------------------------------------------------ */}
      <motion.a
        href="#challenges"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={26} weight="light" />
        </motion.span>
      </motion.a>
    </section>
  );
}
