"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText } from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

type Card = { metric: string; sub: string; body: string };

const TABS: { key: string; label: string; cards: Card[] }[] = [
  {
    key: "customer",
    label: "Customer Engagement",
    cards: [
      {
        metric: "Fewer inbound status calls",
        sub: "customers self-serve live",
        body: "Live order visibility with automated, exception-driven updates so customers and reps see status without a single phone call.",
      },
      {
        metric: "Faster claims resolution",
        sub: "auto part + warranty match",
        body: "Lens identifies the part, verifies warranty, and matches the purchase automatically — turning multi-day claim triage into minutes.",
      },
      {
        metric: "Higher repeat revenue",
        sub: "engagement into lifetime",
        body: "Turn every engagement signal into repeat purchases and higher lifetime value, with loyalty offers triggered at the right moment.",
      },
      {
        metric: "Routine work, automated",
        sub: "one surface, every service desk",
        body: "A single command surface that automates routine service work across every desk — freeing teams for the conversations that matter.",
      },
    ],
  },
  {
    key: "procurement",
    label: "Procurement Optimization",
    cards: [
      {
        metric: "Confidence-graded POs",
        sub: "demand sensed, buying automated",
        body: "Lens forecasts demand and drafts cost-optimized POs graded by confidence — the planner approves, the system executes.",
      },
      {
        metric: "Risk flagged early",
        sub: "continuous supplier scoring",
        body: "Every supplier scored continuously on risk, delivery, and performance — with alternates suggested before a disruption lands.",
      },
      {
        metric: "Savings you can defend",
        sub: "normalized spend, every category",
        body: "One normalized view of spend, suppliers, and market signals across every category and site — quantifying validated, evidence-backed savings.",
      },
      {
        metric: "Fewer expedites",
        sub: "early risk flags at PO level",
        body: "Sense disruption early and route to the right play — consolidation, competitive RFP, or re-source — before it becomes an expedite premium.",
      },
    ],
  },
  {
    key: "inventory",
    label: "Inventory Optimization",
    cards: [
      {
        metric: "One view, every location",
        sub: "demand, supply, inventory, POs",
        body: "Real-time inventory, demand, and PO insight across every warehouse and store — imbalances surfaced before they cost a sale.",
      },
      {
        metric: "Higher fill rates",
        sub: "plans self-tune to signals",
        body: "Detect demand and supply shifts early and self-tune stocking plans — so the right product is in the right place, right now.",
      },
      {
        metric: "Decisions in days",
        sub: "confidence-graded actions",
        body: "AI detects risks and opportunities and recommends the optimal stocking action, graded by confidence — the planner stays in the loop.",
      },
      {
        metric: "Higher turns, lower cost",
        sub: "rebalance + reorder, automated",
        body: "Rebalance stock across locations and trigger replenishment automatically — cutting expedite spend and freeing working capital.",
      },
    ],
  },
];

/* Placeholder mockup media — swapped per-card later */
function CardMedia() {
  return (
    <div className="relative h-[190px] overflow-hidden rounded-xl bg-zinc-300">
      <div className="absolute left-1/2 top-6 w-[240px] -translate-x-1/2 rounded-md bg-white p-3 shadow-md">
        <p className="text-[11px] font-semibold text-zinc-900">Accurate ETA restored</p>
        <p className="mt-1 text-[10px] text-zinc-500">🕓 ETA variance detected: 0 days</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-[repeating-linear-gradient(90deg,#eab308_0px,#eab308_14px,#ca8a04_14px,#ca8a04_16px)]" />
      <div className="absolute inset-x-0 bottom-10 h-1.5 bg-red-800" />
    </div>
  );
}

export default function Outcomes() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="outcomes" className="bg-white py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <p className="text-[17px] font-medium text-[#5C3D97]">The Value We Deliver</p>
          <h2 className="mt-3 text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]">
            Driving Outcomes
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            From day one, our methodology and solutions work together across three pillars
            to turn intelligence into measurable business value.
          </p>
          <div className="mt-8 h-px w-full bg-zinc-200" />
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.key}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {tab.cards.map((c) => (
              <div key={c.metric} className="rounded-2xl bg-zinc-50 p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#efeaf9]">
                    <FileText size={18} className="text-[#5C3D97]" />
                  </span>
                  <div>
                    <p className="text-[16px] font-medium leading-snug text-zinc-900">
                      {c.metric}
                    </p>
                    <p className="text-[14px] text-zinc-400">{c.sub}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <CardMedia />
                </div>
                <p className="mt-4 text-[13.5px] leading-relaxed text-zinc-600">{c.body}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Tab pills */}
        <div className="mt-12 flex justify-center">
          <div className="flex flex-wrap items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 shadow-sm">
            {TABS.map((t, i) => (
              <button
                key={t.key}
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2.5 text-[14px] transition-colors ${
                  i === active
                    ? "bg-zinc-900 font-medium text-white"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
