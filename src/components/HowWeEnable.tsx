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

function UpArrows() {
  return (
    <div className="flex justify-around py-3">
      <ArrowUp size={20} className="text-[#5C3D97]" />
      <ArrowUp size={20} className="text-[#5C3D97]" />
    </div>
  );
}

export default function HowWeEnable() {
  return (
    <section id="value" className="bg-white py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <h2 className="text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]">
            How We Enable Value for Our Clients
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            Our intelligence layer unifies your existing architecture, accelerating
            time-to-value without the $100M sunk cost.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          {/* Diagram canvas */}
          <div className="rounded-2xl border border-zinc-100 bg-[radial-gradient(#e5e5e8_1px,transparent_1px)] [background-size:22px_22px] p-4 sm:p-10">
            <div className="mx-auto max-w-[1180px]">
              {/* ── Intelligent Operational Model ─────────────────────────── */}
              <div className="relative">
                <div className="mx-auto w-fit rounded-t-xl bg-[#4b3382] px-8 py-2.5 text-[13.5px] font-medium text-white">
                  ✦ Intelligent Operational Model
                </div>
                <div className="rounded-2xl bg-[#e9e4f4] p-4 sm:p-5">
                  <div className="grid gap-4 md:grid-cols-3">
                    {OPERATING_MODEL.map((b) => (
                      <div key={b.title} className="rounded-xl bg-white p-5">
                        <p className="text-center text-[14.5px] font-semibold text-zinc-900">
                          {b.title}
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-8">
                          {b.items.map((it) => (
                            <div key={it.label} className="flex flex-col items-center gap-2">
                              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#efeaf9]">
                                <it.icon size={18} className="text-[#5C3D97]" />
                              </span>
                              <span className="text-[11.5px] text-zinc-600">{it.label}</span>
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
              <div className="rounded-2xl bg-[#4b3382] p-4 sm:p-6">
                <p className="text-center text-[15px] font-medium text-white">
                  ✦ The Navanta Lens
                </p>
                <p className="mt-1 text-center text-[12.5px] text-white/70">
                  Standardizing process, technology, and data across the supply chain
                </p>
                <div className="mt-4 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                  {LENS_PILLARS.map((p, i) => (
                    <Fragment key={p.title}>
                      <div className="h-full rounded-xl bg-white p-5">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#efeaf9]">
                            <p.icon size={18} className="text-[#5C3D97]" />
                          </span>
                          <p className="text-[14.5px] font-semibold leading-tight text-zinc-900">
                            {p.title}
                          </p>
                        </div>
                        <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">{p.body}</p>
                      </div>
                      {i < 2 && (
                        <ArrowRight size={20} className="mx-auto hidden text-white md:block" />
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>

              <UpArrows />

              {/* ── Fragmented enterprise ecosystem ───────────────────────── */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr]">
                  <div>
                    <p className="text-[14px] font-semibold text-zinc-900">
                      30+ ERP&apos;s Enterprise Systems
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {ERPS.map((e) => (
                        <span
                          key={e}
                          className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-700"
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden items-center md:flex">
                    <span className="rounded-full border border-zinc-300 px-6 py-4 text-center text-[12.5px] font-medium text-zinc-700">
                      Fragmented Enterprise
                      <br />
                      Ecosystem
                    </span>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-zinc-900">
                      50+ External Supply Chain Signals
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SIGNALS.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-700"
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
                      <p key={t} className="px-4 py-3.5 text-center text-[13px] font-medium text-zinc-800">
                        {t}
                      </p>
                    )
                  )}
                </div>
                <div className="bg-black py-2.5 text-center text-[13px] font-medium text-white">
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
