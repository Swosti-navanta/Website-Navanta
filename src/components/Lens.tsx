"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Broadcast,
  Brain,
  Lightning,
  UserCheck,
  Warning,
  TrendUp,
  CheckCircle,
  Circle,
  type Icon,
} from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

type Step = {
  key: string;
  word: string;
  line: string;
  icon: Icon;
  rail: "Signals" | "Actions" | "Audit";
};

const STEPS: Step[] = [
  {
    key: "senses",
    word: "Senses",
    line: "Watches every order, shipment, and signal — live.",
    icon: Broadcast,
    rail: "Signals",
  },
  {
    key: "reasons",
    word: "Reasons",
    line: "Checks stock, suppliers, and cost in seconds.",
    icon: Brain,
    rail: "Signals",
  },
  {
    key: "acts",
    word: "Acts",
    line: "Drafts the best move, graded by confidence.",
    icon: Lightning,
    rail: "Actions",
  },
  {
    key: "approve",
    word: "You approve",
    line: "One click — and every step stays auditable.",
    icon: UserCheck,
    rail: "Audit",
  },
];

const STEP_MS = 3400;
const EASE = [0.22, 1, 0.36, 1] as const;

const rowIn = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: EASE, delay: 0.15 + i * 0.25 },
});

/** Scripted screen for each step of the demo. */
function StepScreen({ step }: { step: number }) {
  if (step === 0)
    return (
      <div className="space-y-2.5">
        <motion.div {...rowIn(0)} className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <Warning size={16} className="flex-shrink-0 text-amber-600" />
          <div>
            <p className="text-[13px] font-medium text-zinc-900">Rotterdam ETA slipped 6 days</p>
            <p className="text-[11.5px] text-zinc-500">PO #4821 · ocean leg · detected 14:02</p>
          </div>
        </motion.div>
        <motion.div {...rowIn(1)} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3">
          <TrendUp size={16} className="flex-shrink-0 text-[#5C3D97]" />
          <div>
            <p className="text-[13px] font-medium text-zinc-900">Demand trending +18%, Midwest</p>
            <p className="text-[11.5px] text-zinc-500">SKU-4482 · 12 locations</p>
          </div>
        </motion.div>
      </div>
    );

  if (step === 1)
    return (
      <div className="space-y-2">
        {[
          ["Stock cover", "9 days at current burn"],
          ["Alternate carrier", "available · +2 days vs air"],
          ["Supplier score", "94% on-time, 12-month"],
          ["Cost delta", "+$2.1K vs $14.1K expedite"],
        ].map(([k, v], i) => (
          <motion.div key={k} {...rowIn(i)} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-2.5">
            <CheckCircle size={15} weight="fill" className="flex-shrink-0 text-emerald-500" />
            <p className="text-[12.5px] text-zinc-700">
              <span className="font-medium text-zinc-900">{k}</span> — {v}
            </p>
          </motion.div>
        ))}
      </div>
    );

  if (step === 2)
    return (
      <motion.div {...rowIn(0)} className="rounded-xl border border-[#8b6bc7]/40 bg-[#f7f4fd] p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-[#5C3D97]">
          Recommended action · Confidence 87%
        </p>
        <p className="mt-1.5 text-[14.5px] font-medium text-zinc-900">
          Expedite PO #4821 via alternate carrier
        </p>
        <p className="mt-1 text-[12px] text-zinc-500">
          Protects 3 customer orders · adds $2.1K vs $14.1K air freight
        </p>
        <div className="mt-3.5 flex gap-2">
          <motion.span
            className="rounded-lg bg-zinc-900 px-4 py-2 text-[12.5px] font-medium text-white"
            animate={{ scale: [1, 1, 0.94, 1] }}
            transition={{ duration: 1.2, delay: 1.6, times: [0, 0.7, 0.85, 1] }}
          >
            Approve
          </motion.span>
          <span className="rounded-lg border border-zinc-300 px-4 py-2 text-[12.5px] text-zinc-600">
            Adjust
          </span>
        </div>
      </motion.div>
    );

  return (
    <div className="space-y-2.5">
      <motion.div {...rowIn(0)} className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <CheckCircle size={16} weight="fill" className="flex-shrink-0 text-emerald-500" />
        <div>
          <p className="text-[13px] font-medium text-zinc-900">Approved by planner · PO updated</p>
          <p className="text-[11.5px] text-zinc-500">Customer ETAs restored · $12K premium avoided</p>
        </div>
      </motion.div>
      <motion.div {...rowIn(1)} className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-400">Audit trail</p>
        <div className="mt-1.5 space-y-1">
          {["Signal detected 14:02", "4 checks run · confidence 87%", "Approved by J. Meyer 14:06"].map((l) => (
            <p key={l} className="text-[11.5px] text-zinc-600">✓ {l}</p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Lens() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [step]);

  const current = STEPS[step];

  return (
    <section id="lens" className="bg-[#0c0b0a] py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Left — the four words */}
          <FadeIn>
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-[#b493e6]">
              Our product
            </p>
            <h2 className="mt-4 text-[34px] font-medium tracking-tight text-white sm:text-[44px]">
              Meet the Navanta Lens
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/55">
              The AI layer over your supply chain — it spots problems and fixes
              them, before they cost you.
            </p>

            <div className="mt-10 space-y-1.5">
              {STEPS.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setStep(i)}
                  className={`group flex w-full items-start gap-4 rounded-xl px-4 py-3.5 text-left transition-colors ${
                    i === step ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                  }`}
                  aria-pressed={i === step}
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
                      i === step ? "bg-[#5C3D97]/40" : "bg-white/[0.05]"
                    }`}
                  >
                    <s.icon size={16} className={i === step ? "text-[#c9adeb]" : "text-white/40"} />
                  </span>
                  <span>
                    <span className={`block text-[16px] font-medium transition-colors ${i === step ? "text-white" : "text-white/45"}`}>
                      {s.word}
                    </span>
                    <span className={`block text-[13px] transition-colors ${i === step ? "text-white/60" : "text-white/30"}`}>
                      {s.line}
                    </span>
                  </span>
                  {/* per-step progress line */}
                  {i === step && (
                    <span className="relative ml-auto mt-3 hidden h-px w-14 overflow-hidden bg-white/15 sm:block">
                      <motion.span
                        key={step}
                        className="absolute inset-y-0 left-0 bg-[#b493e6]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                      />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Right — product window playing the scenario */}
          <FadeIn delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#fafaf9] shadow-[0_40px_120px_rgba(92,61,151,0.18)]">
              {/* window chrome */}
              <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                  </span>
                  <span className="text-[13px] font-medium text-zinc-800">Navanta Lens</span>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10.5px] font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> LIVE
                </span>
              </div>

              <div className="grid min-h-[340px] grid-cols-[112px_1fr]">
                {/* mini sidebar */}
                <div className="border-r border-zinc-200 bg-white/60 py-4">
                  {(["Signals", "Actions", "Audit"] as const).map((r) => (
                    <div
                      key={r}
                      className={`mx-2 mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-[11.5px] transition-colors ${
                        current.rail === r ? "bg-[#efeaf9] font-medium text-[#5C3D97]" : "text-zinc-400"
                      }`}
                    >
                      <Circle size={6} weight="fill" />
                      {r}
                    </div>
                  ))}
                </div>

                {/* screen */}
                <div className="p-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.18 } }}
                      transition={{ duration: 0.3 }}
                    >
                      <StepScreen step={step} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
