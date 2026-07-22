"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Database, FileText, GitBranch } from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

const TABS = [
  {
    key: "central",
    label: "Centralized Intelligence",
    heading: "Centralized Planning and Buying Intelligence",
    steps: [
      {
        icon: Database,
        step: "STEP 1",
        title: "Intelligent Analysis",
        body: "Lens forecasts demand and recommends the optimal buy for each site.",
      },
      {
        icon: FileText,
        step: "STEP 2",
        title: "Enterprise Signal Aggregation",
        body: "Connect fragmented ERP systems, planning tools, and supplier networks.",
      },
      {
        icon: GitBranch,
        step: "STEP 3",
        title: "Unified Visibility",
        body: "One real-time view of demand, supply, and inventory across every location.",
      },
    ],
  },
  {
    key: "orders",
    label: "Inventory & Order Intelligence",
    heading: "Customer Inventory and Order Intelligence",
    steps: [
      {
        icon: Database,
        step: "STEP 1",
        title: "Unified Visibility",
        body: "Every order, shipment, and location's inventory in one view.",
      },
      {
        icon: FileText,
        step: "STEP 2",
        title: "Intelligent Self-Service",
        body: "Search by name, SKU, or image — live availability with full product detail.",
      },
      {
        icon: GitBranch,
        step: "STEP 3",
        title: "Proactive Notifications",
        body: "Delay, backorder, and back-in-stock alerts before the customer has to ask.",
      },
    ],
  },
  {
    key: "procurement",
    label: "Procurement Control",
    heading: "Procurement Control Tower",
    steps: [
      {
        icon: Database,
        step: "STEP 1",
        title: "Unified Visibility",
        body: "One normalized, real-time view of spend, suppliers, inventory and demand.",
      },
      {
        icon: FileText,
        step: "STEP 2",
        title: "Intelligent Analysis",
        body: "Models score categories, detect risks, and quantify savings opportunities.",
      },
      {
        icon: GitBranch,
        step: "STEP 3",
        title: "Agentic Actions",
        body: "Consolidation, competitive RFP, and replenishment — graded by confidence.",
      },
    ],
  },
];

const CHECKLIST = [
  "Confirm scope & SKUs against the part master",
  "Confirm sites & delivery points in scope",
  "Finalize the qualified supplier shortlist",
  "Set evaluation criteria & weights",
  "Issue the RFP",
  "Collect & score bids on total cost",
  "Select supplier(s); negotiate terms",
  "Award & capture committed savings",
];

/** Lightweight CSS product mockup (OPP-005) — replaced with final art later */
function LensMockup() {
  return (
    <div className="rounded-2xl bg-[radial-gradient(120%_120%_at_80%_10%,#6a6f5a_0%,#3c4034_45%,#23261e_100%)] p-6 sm:p-10">
      <div className="mx-auto max-w-[760px] rounded-xl bg-zinc-100 p-2 shadow-2xl">
        <div className="rounded-lg bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold text-zinc-900">⚡ OPP-005</span>
              <span className="text-[12px] text-zinc-500">Chemicals · Germany</span>
            </div>
            <span className="text-zinc-400">×</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10.5px] text-zinc-600">
              Chemicals · Germany
            </span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-zinc-200">
              <div className="h-full w-3/4 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[11px] text-zinc-600">76%</span>
          </div>

          <div className="mt-4 rounded-lg bg-[#f3effc] px-4 py-3">
            <p className="text-[11px] font-medium text-[#5C3D97]">✦ Executing · Confidence 76%</p>
            <p className="mt-1 text-[13px] font-semibold text-zinc-900">
              Competitive RFP to consolidate the fragmented supplier base
            </p>
            <p className="mt-1 text-[11px] text-zinc-500">
              Addressable $267K&nbsp;&nbsp;Target savings $13K–$21K&nbsp;&nbsp;Lead · Kirby Risk
              Corporation
            </p>
          </div>

          <p className="mt-4 text-[12px] font-medium text-zinc-700">Choose an approach</p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {[
              ["Consolidate", "tail → incumbent"],
              ["Competitive RFP", "aggregate demand · score on total cost", true],
              ["Negotiate / Benchmark", "terms & price"],
              ["Supplier transition", "move volume to a better-fit supplier"],
              ["Services rate-card", "labor / repair rate panel"],
            ].map(([title, sub, rec]) => (
              <div
                key={title as string}
                className={`rounded-lg border p-2 ${
                  rec ? "border-[#8B6BC7] bg-[#f7f4fd]" : "border-zinc-200 bg-white"
                }`}
              >
                <p className="text-[10.5px] font-semibold text-zinc-800">
                  {title as string}
                  {rec && (
                    <span className="ml-1 rounded bg-[#e9e0fa] px-1 text-[8px] text-[#5C3D97]">
                      Recommended
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-[9.5px] leading-snug text-zinc-500">{sub as string}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-[12px] font-medium text-zinc-700">📋 Task checklist</p>
            <div className="flex items-center gap-2">
              <span className="text-[10.5px] text-zinc-400">0/8 done</span>
              <span className="rounded border border-zinc-200 px-2 py-0.5 text-[10.5px] text-zinc-600">
                Save progress
              </span>
            </div>
          </div>
          <ul className="mt-2 divide-y divide-zinc-100">
            {CHECKLIST.map((c) => (
              <li key={c} className="flex items-center gap-2.5 py-1.5">
                <span className="h-3.5 w-3.5 rounded-full border border-zinc-300" />
                <span className="text-[11.5px] text-zinc-600">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
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

          {/* Tab pills — above the section, left-aligned (Figma update) */}
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

        {/* Dark Lens container */}
        <FadeIn delay={0.1} className="mt-12">
          <div className="rounded-3xl bg-[#111110] p-6 sm:p-10">
            <h3 className="text-[22px] font-medium text-white">The Navanta Lens</h3>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-white/55">
              Standardizing process, technology and data across the supply chain — turning
              fragmented signals into coordinated, agent-driven decisions.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
              {/* Steps */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.key}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4"
                >
                  {tab.steps.map((s) => (
                    <div key={s.title} className="rounded-2xl bg-white/[0.06] p-5">
                      <div className="flex items-start justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                          <s.icon size={17} className="text-white/80" />
                        </span>
                        <span className="text-[10px] tracking-[0.15em] text-white/40">
                          {s.step}
                        </span>
                      </div>
                      <p className="mt-3 text-[15.5px] font-medium text-white/95">{s.title}</p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{s.body}</p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Product mockup */}
              <LensMockup />
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
