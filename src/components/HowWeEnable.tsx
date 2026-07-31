"use client";

import { Fragment } from "react";
import {
  Monitor,
  UsersThree,
  Kanban,
  GitMerge,
  Brain,
  ChartLineUp,
  Database,
  TreeStructure,
  MagicWand,
  ArrowUp,
  ArrowRight,
} from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

const OPERATING_MODEL = [
  {
    title: "Unified Operating Model",
    items: [
      { icon: Monitor, label: "Single UX" },
      { icon: UsersThree, label: "Shared Context" },
    ],
  },
  {
    title: "Connected Processes",
    items: [
      { icon: Kanban, label: "Harmonize Workflows" },
      { icon: GitMerge, label: "Linked Planning" },
    ],
  },
  {
    title: "Agent Driven Operations",
    items: [
      { icon: Brain, label: "Autonomous Decision" },
      { icon: ChartLineUp, label: "Continuous Optimization" },
    ],
  },
];

const LENS_PILLARS = [
  {
    icon: Database,
    title: "Enterprise Signal Aggregation",
    body: "Connect fragmented ERP systems, planning tools, supplier networks, and external operational signals.",
  },
  {
    icon: TreeStructure,
    title: "Semantic Standardization",
    body: "Standardize inconsistent workflows, business definitions, master data, and operational context.",
  },
  {
    icon: MagicWand,
    title: "Agentic Operational Intelligence",
    body: "Continuously orchestrate and optimize decisions across planning, inventory, procurement, and suppliers.",
  },
];

const ERPS = ["Anaplan", "Kinaxis", "ServiceNow", "OnBase", "Dynamics 365", "Trapeze", "SAP", "Oracle"];
const SIGNALS = ["Demand Signals", "Market Intelligence", "Supplier Networks", "Logistics Signals", "Pricing Signals"];

/* Arrow row between bands — anchored to the SAME 3-column grid as the boxes
   above/below (both live inside the same max-w container), so the left arrow
   sits under column 1 and the right arrow under column 3 in every band,
   genuinely connecting them instead of an arbitrary even spacing. */
function UpArrows() {
  return (
    <div className="grid grid-cols-3 py-1.5">
      <ArrowUp size={16} className="mx-auto text-[#5C3D97]" />
      <span />
      <ArrowUp size={16} className="mx-auto text-[#5C3D97]" />
    </div>
  );
}

export default function HowWeEnable() {
  return (
    <section id="value" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <h2 className="text-[28px] font-medium tracking-tight text-zinc-900 sm:text-[36px]">
            How We Enable Value for Our Clients
          </h2>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-zinc-500">
            One intelligence layer, unifying the systems you already run.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-6">
          {/* Diagram canvas */}
          <div className="rounded-2xl border border-zinc-100 bg-[radial-gradient(#e5e5e8_1px,transparent_1px)] [background-size:22px_22px] p-3 sm:p-6">
            <div className="mx-auto max-w-[1180px]">
              {/* ── Intelligent Operational Model ─────────────────────────── */}
              <div className="relative">
                <div className="mx-auto w-fit rounded-t-xl bg-[#4b3382] px-6 py-1.5 text-[12.5px] font-medium text-white">
                  ✦ Intelligent Operational Model
                </div>
                <div className="rounded-2xl bg-[#e9e4f4] p-3 sm:p-3.5">
                  <div className="grid gap-3 md:grid-cols-3">
                    {OPERATING_MODEL.map((b) => (
                      <div key={b.title} className="rounded-xl bg-white p-3.5">
                        <p className="text-center text-[13.5px] font-semibold text-zinc-900">
                          {b.title}
                        </p>
                        <div className="mt-2.5 flex items-center justify-center gap-6">
                          {b.items.map((it) => (
                            <div key={it.label} className="flex flex-col items-center gap-1.5">
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EBE8F3]">
                                <it.icon size={15} className="text-[#5C3D97]" />
                              </span>
                              <span className="text-[10.5px] text-zinc-600">{it.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <UpArrows />

              {/* ── The Navanta Lens ──────────────────────────────────────── */}
              <div className="rounded-2xl bg-[#4b3382] p-3 sm:p-4">
                <p className="text-center text-[14px] font-medium text-white">
                  ✦ The Navanta Lens
                </p>
                <p className="mt-0.5 text-center text-[11.5px] text-white/70">
                  Standardizing process, technology, and data across the supply chain
                </p>
                <div className="mt-3 grid items-stretch gap-2.5 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                  {LENS_PILLARS.map((p, i) => (
                    <Fragment key={p.title}>
                      <div className="h-full rounded-xl bg-white p-3.5">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#EBE8F3]">
                            <p.icon size={15} className="text-[#5C3D97]" />
                          </span>
                          <p className="text-[13px] font-semibold leading-tight text-zinc-900">
                            {p.title}
                          </p>
                        </div>
                        <p className="mt-2 text-[11.5px] leading-snug text-zinc-500">{p.body}</p>
                      </div>
                      {i < 2 && (
                        <ArrowRight size={16} className="mx-auto hidden text-white md:block" />
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>

              <UpArrows />

              {/* ── Fragmented enterprise ecosystem ───────────────────────── */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5">
                <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                  <div>
                    <p className="text-center text-[13px] font-semibold text-zinc-900">
                      30+ ERP&apos;s Enterprise Systems
                    </p>
                    <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                      {ERPS.map((e) => (
                        <span
                          key={e}
                          className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-[11.5px] font-medium text-zinc-700"
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden items-center md:flex">
                    <span className="rounded-full border border-zinc-300 px-5 py-2.5 text-center text-[11.5px] font-medium leading-tight text-zinc-700">
                      Fragmented Enterprise
                      <br />
                      Ecosystem
                    </span>
                  </div>
                  <div>
                    <p className="text-center text-[13px] font-semibold text-zinc-900">
                      50+ External Supply Chain Signals
                    </p>
                    <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                      {SIGNALS.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-[11.5px] font-medium text-zinc-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <UpArrows />

              {/* ── User control band ─────────────────────────────────────── */}
              <div className="overflow-hidden rounded-2xl border border-zinc-200">
                <div className="grid divide-y divide-zinc-200 bg-zinc-50 md:grid-cols-3 md:divide-x md:divide-y-0">
                  {["Auditability Across Every Decision", "Manage Rules & Thresholds", "Set Criteria & Guardrails"].map(
                    (t) => (
                      <p key={t} className="px-4 py-2.5 text-center text-[12px] font-medium text-zinc-800">
                        {t}
                      </p>
                    )
                  )}
                </div>
                <div className="bg-black py-2 text-center text-[12px] font-medium text-white">
                  User Control: You Stay in Command
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
