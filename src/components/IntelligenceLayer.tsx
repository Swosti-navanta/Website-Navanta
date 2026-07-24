"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Database,
  ShieldCheck,
  ChartLineUp,
  Waveform,
  Stack,
  ClockCounterClockwise,
  Plus,
  type Icon,
} from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

type TabDef = {
  key: string;
  label: string;
  heading: string;
  callouts: { left: string[]; right: string[] };
  card: {
    title: string;
    sub: string;
    stats: [string, string][];
    chartA: { label: string; bars: { d: string; v: number }[] };
    chartB: { label: string };
  };
};

const TABS: TabDef[] = [
  {
    key: "central",
    label: "Centralized Intelligence",
    heading: "Centralized Planning and Buying Intelligence",
    callouts: {
      left: ["Network & locations", "Demand signal", "On-hand position"],
      right: ["One-click rebalance", "Confidence grade", "Stock cover"],
    },
    card: {
      title: "SKU-4482 · Network plan",
      sub: "Midwest network · 12 locations",
      stats: [
        ["Locations", "12"],
        ["Fill rate", "96%"],
        ["Confidence", "88%"],
        ["Rebalance", "240 units"],
        ["On-hand", "18.4K"],
        ["Turns", "7.2"],
      ],
      chartA: {
        label: "Weekly demand",
        bars: [
          { d: "Sun", v: 30 },
          { d: "Mon", v: 36 },
          { d: "Tue", v: 36 },
          { d: "Wed", v: 31 },
          { d: "Thu", v: 34 },
          { d: "Fri", v: 37 },
          { d: "Sat", v: 33 },
        ],
      },
      chartB: { label: "Stock cover" },
    },
  },
  {
    key: "orders",
    label: "Inventory & Order Intelligence",
    heading: "Customer Inventory and Order Intelligence",
    callouts: {
      left: ["Live order status", "SKU cross-reference", "Stock by location"],
      right: ["Proactive alerts", "Self-serve answers", "Guided resolution"],
    },
    card: {
      title: "Order XC-2384 · Flooring",
      sub: "Distributor portal · live",
      stats: [
        ["Status", "In transit"],
        ["ETA", "Feb 1"],
        ["Lines", "18"],
        ["Backorder risk", "Low"],
        ["Alt SKUs", "3"],
        ["Updates", "Auto"],
      ],
      chartA: {
        label: "Order volume",
        bars: [
          { d: "Sun", v: 24 },
          { d: "Mon", v: 33 },
          { d: "Tue", v: 29 },
          { d: "Wed", v: 35 },
          { d: "Thu", v: 32 },
          { d: "Fri", v: 28 },
          { d: "Sat", v: 22 },
        ],
      },
      chartB: { label: "SLA health" },
    },
  },
  {
    key: "procurement",
    label: "Procurement Control",
    heading: "Procurement Control Tower",
    callouts: {
      left: ["Category & region", "Spend & suppliers", "Weekly demand"],
      right: ["One-click RFP", "Savings target", "Stock cover"],
    },
    card: {
      title: "OPP-005 · Chemicals",
      sub: "Germany · 4 sites",
      stats: [
        ["Addressable", "$267K"],
        ["Status", "Active"],
        ["Confidence", "76%"],
        ["Avg unit cost", "$0.53"],
        ["Suppliers", "12"],
        ["Savings target", "$21K"],
      ],
      chartA: {
        label: "Weekly demand",
        bars: [
          { d: "Sun", v: 30 },
          { d: "Mon", v: 36 },
          { d: "Tue", v: 36 },
          { d: "Wed", v: 31 },
          { d: "Thu", v: 34 },
          { d: "Fri", v: 37 },
          { d: "Sat", v: 33 },
        ],
      },
      chartB: { label: "Stock cover" },
    },
  },
];

/* 2×3 data-enrichment feature grid */
const FEATURES: { icon: Icon; title: string; body: string }[] = [
  { icon: Database, title: "Spend & category data", body: "One normalized view of spend across every category, site, and business unit." },
  { icon: ShieldCheck, title: "Supplier intelligence", body: "Continuous risk, delivery, and performance scoring on every vendor." },
  { icon: ChartLineUp, title: "Market & pricing signals", body: "External commodity and pricing benchmarks, tracked in real time." },
  { icon: Waveform, title: "Demand & forecast", body: "Signal-driven demand sensing per SKU and location, tuned to your history." },
  { icon: Stack, title: "Inventory position", body: "Live stock, coverage, and imbalance across every warehouse and store." },
  { icon: ClockCounterClockwise, title: "Audit & traceability", body: "Every decision logged, confidence-graded, and fully reversible." },
];

function OpportunityCard({ card }: { card: TabDef["card"] }) {
  return (
    <div className="w-[420px] max-w-full rounded-2xl bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.10)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[16px] font-semibold text-zinc-900">{card.title}</p>
          <p className="text-[13px] text-zinc-500">{card.sub}</p>
        </div>
        <span className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12.5px] text-zinc-700">
          <Plus size={13} /> Report
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-y-4 border-t border-zinc-100 pt-4">
        {card.stats.map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-zinc-400">{k}</p>
            <p className="text-[14px] font-medium text-zinc-900">{v}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[11.5px] text-zinc-400">{card.chartA.label}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        {card.chartA.bars.map((b) => (
          <div key={b.d} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[9.5px] text-zinc-400">{b.v}%</span>
            <div className="w-full rounded-md bg-[#8b6bc7]" style={{ height: b.v * 2.2 }} />
            <span className="text-[9.5px] text-zinc-400">{b.d}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11.5px] text-zinc-400">{card.chartB.label}</p>
      <div className="mt-2 flex justify-between gap-2">
        {card.chartA.bars.map((b) => (
          <div key={b.d} className="flex-1 overflow-hidden rounded-md">
            <div className="h-3 bg-red-400" />
            <div className="h-4 bg-amber-300" />
            <div className="h-5 bg-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ConnectorLabel({ text, side }: { text: string; side: "left" | "right" }) {
  return (
    <div className={`flex items-center gap-3 ${side === "left" ? "flex-row-reverse" : ""}`}>
      <span className="whitespace-nowrap text-[14px] text-zinc-500">{text}</span>
      <span className="h-px w-16 bg-zinc-300" />
    </div>
  );
}

export default function IntelligenceLayer() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="intelligence" className="bg-[#fafaf9] py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <AnimatePresence mode="wait">
            <motion.h2
              key={tab.heading}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]"
            >
              {tab.heading}
            </motion.h2>
          </AnimatePresence>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            One layer over your existing architecture — without the $100M sunk cost.
          </p>

          {/* Tab pills */}
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

        {/* Centered card with connector callouts — swaps per tab */}
        <FadeIn delay={0.1} className="mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.22 } }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-8"
            >
              <div className="hidden flex-col items-end gap-16 pt-8 xl:flex">
                {tab.callouts.left.map((c) => (
                  <ConnectorLabel key={c} text={c} side="left" />
                ))}
              </div>
              <OpportunityCard card={tab.card} />
              <div className="hidden flex-col items-start gap-16 pt-8 xl:flex">
                {tab.callouts.right.map((c) => (
                  <ConnectorLabel key={c} text={c} side="right" />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeIn>

        {/* 2×3 feature grid */}
        <FadeIn delay={0.15} className="mt-24">
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#efeaf9]">
                  <f.icon size={18} className="text-[#5C3D97]" />
                </span>
                <h3 className="mt-4 text-[17px] font-medium text-zinc-900">{f.title}</h3>
                <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-zinc-500">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
