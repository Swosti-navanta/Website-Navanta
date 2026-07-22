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

const TABS = [
  { key: "central", label: "Centralized Intelligence", heading: "Centralized Planning and Buying Intelligence" },
  { key: "orders", label: "Inventory & Order Intelligence", heading: "Inventory and Order Intelligence" },
  { key: "procurement", label: "Procurement Control", heading: "Procurement Control Tower" },
];

/* Left/right connector callouts around the centered card */
const CALLOUTS_LEFT = ["Category & region", "Spend & suppliers", "Weekly demand"];
const CALLOUTS_RIGHT = ["One-click RFP", "Savings target", "Stock cover"];

/* 2×3 data-enrichment feature grid (Navanta supply-chain equivalents) */
const FEATURES: { icon: Icon; title: string; body: string }[] = [
  { icon: Database, title: "Spend & category data", body: "One normalized view of spend across every category, site, and business unit." },
  { icon: ShieldCheck, title: "Supplier intelligence", body: "Continuous risk, delivery, and performance scoring on every vendor." },
  { icon: ChartLineUp, title: "Market & pricing signals", body: "External commodity and pricing benchmarks, tracked in real time." },
  { icon: Waveform, title: "Demand & forecast", body: "Signal-driven demand sensing per SKU and location, tuned to your history." },
  { icon: Stack, title: "Inventory position", body: "Live stock, coverage, and imbalance across every warehouse and store." },
  { icon: ClockCounterClockwise, title: "Audit & traceability", body: "Every decision logged, confidence-graded, and fully reversible." },
];

const DEMAND = [
  { d: "Sun", v: 30 },
  { d: "Mon", v: 36 },
  { d: "Tue", v: 36 },
  { d: "Wed", v: 31 },
  { d: "Thu", v: 34 },
  { d: "Fri", v: 37 },
  { d: "Sat", v: 33 },
];

/* Centered Navanta opportunity card — supply-chain analog of the Figma site card */
function OpportunityCard() {
  return (
    <div className="w-[420px] max-w-full rounded-2xl bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.10)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[16px] font-semibold text-zinc-900">OPP-005 · Chemicals</p>
          <p className="text-[13px] text-zinc-500">Germany · 4 sites</p>
        </div>
        <span className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12.5px] text-zinc-700">
          <Plus size={13} /> Report
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-y-4 border-t border-zinc-100 pt-4">
        {[
          ["Addressable", "$267K"],
          ["Status", "Active"],
          ["Confidence", "76%"],
          ["Avg unit cost", "$0.53"],
          ["Suppliers", "12"],
          ["Savings target", "$21K"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-zinc-400">{k}</p>
            <p className="text-[14px] font-medium text-zinc-900">{v}</p>
          </div>
        ))}
      </div>

      {/* Weekly demand */}
      <p className="mt-5 text-[11.5px] text-zinc-400">Weekly demand</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        {DEMAND.map((b) => (
          <div key={b.d} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[9.5px] text-zinc-400">{b.v}%</span>
            <div
              className="w-full rounded-md bg-[#8b6bc7]"
              style={{ height: b.v * 2.2 }}
            />
            <span className="text-[9.5px] text-zinc-400">{b.d}</span>
          </div>
        ))}
      </div>

      {/* Stock cover */}
      <p className="mt-4 text-[11.5px] text-zinc-400">Stock cover</p>
      <div className="mt-2 flex justify-between gap-2">
        {DEMAND.map((b) => (
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
    <div
      className={`flex items-center gap-3 ${side === "left" ? "flex-row-reverse" : ""}`}
    >
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
          <p className="text-[17px] font-medium text-[#5C3D97]">Our Intelligence Layer</p>
          <AnimatePresence mode="wait">
            <motion.h2
              key={tab.heading}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="mt-3 text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]"
            >
              {tab.heading}
            </motion.h2>
          </AnimatePresence>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            Our intelligence layer unifies your existing architecture, accelerating
            time-to-value without the $100M sunk cost.
          </p>

          {/* Tab pills — above the section, left-aligned */}
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

        {/* Centered card with connector callouts */}
        <FadeIn delay={0.1} className="mt-16">
          <div className="flex items-center justify-center gap-8">
            <div className="hidden flex-col items-end gap-16 pt-8 xl:flex">
              {CALLOUTS_LEFT.map((c) => (
                <ConnectorLabel key={c} text={c} side="left" />
              ))}
            </div>
            <OpportunityCard />
            <div className="hidden flex-col items-start gap-16 pt-8 xl:flex">
              {CALLOUTS_RIGHT.map((c) => (
                <ConnectorLabel key={c} text={c} side="right" />
              ))}
            </div>
          </div>
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
