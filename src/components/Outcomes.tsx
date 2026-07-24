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
        body: "Live order visibility with exception-driven updates — no phone calls needed.",
      },
      {
        metric: "Faster claims resolution",
        sub: "auto part + warranty match",
        body: "Part identified, warranty verified, purchase matched — claims resolved in minutes.",
      },
      {
        metric: "Higher repeat revenue",
        sub: "engagement into lifetime",
        body: "Engagement signals become repeat purchases and higher lifetime value.",
      },
      {
        metric: "Routine work, automated",
        sub: "one surface, every service desk",
        body: "One command surface automating routine service work across every desk.",
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
        body: "Demand-sensed, cost-optimized POs — the planner approves, the system executes.",
      },
      {
        metric: "Risk flagged early",
        sub: "continuous supplier scoring",
        body: "Continuous supplier scoring, with alternates suggested before disruption lands.",
      },
      {
        metric: "Savings you can defend",
        sub: "normalized spend, every category",
        body: "Normalized spend across every category — validated, evidence-backed savings.",
      },
      {
        metric: "Fewer expedites",
        sub: "early risk flags at PO level",
        body: "Early risk flags routed to the right play before expedite premiums hit.",
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
        body: "Real-time inventory, demand, and PO insight across every location.",
      },
      {
        metric: "Higher fill rates",
        sub: "plans self-tune to signals",
        body: "Plans self-tune to demand shifts — right product, right place, right now.",
      },
      {
        metric: "Decisions in days",
        sub: "confidence-graded actions",
        body: "Confidence-graded stocking recommendations — the planner stays in the loop.",
      },
      {
        metric: "Higher turns, lower cost",
        sub: "rebalance + reorder, automated",
        body: "Automatic rebalancing and replenishment — higher turns, less tied-up capital.",
      },
    ],
  },
];

/* Card media — Figma mockup: ETA card over a shipping-container strip */
function CardMedia() {
  return (
    <div className="relative h-[190px] overflow-hidden rounded-xl bg-zinc-300">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/outcome-strip.png"
        alt=""
        aria-hidden
        className="absolute inset-x-0 bottom-0 w-full"
      />
      <div className="absolute left-1/2 top-6 flex w-[240px] -translate-x-1/2 gap-2 rounded-md bg-white p-3 shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/outcome-map.png" alt="" aria-hidden className="h-10 w-10 rounded object-cover" />
        <div>
          <p className="text-[11px] font-semibold text-zinc-900">Accurate ETA restored</p>
          <p className="mt-1 text-[10px] text-zinc-500">ETA variance detected: 0 days</p>
        </div>
      </div>
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
          <h2 className="mt-3 text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]">
            Driving Outcomes
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            Three pillars turning intelligence into measurable business value.
          </p>
          {/* Tab pills — above the cards */}
          <div className="mt-8 flex">
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
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.key}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
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
      </div>
    </section>
  );
}
