"use client";

import { ArrowRight } from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

const CARDS = [
  {
    title: "Supply Planning",
    body: "AI-driven demand forecasting, inventory optimization, and production scheduling in one place.",
  },
  {
    title: "Supplier Management",
    body: "Unified supplier networks, scorecards, onboarding, and performance tracking.",
  },
  {
    title: "Client Collab",
    body: "A secure stakeholder portal for real-time visibility and cross-functional decisions.",
  },
  {
    title: "Analytics & Reporting",
    body: "Live operational dashboards, WIP tracking, variance analysis, and reporting.",
  },
  {
    title: "Integration Hub",
    body: "Connect 30+ ERPs, logistics platforms, supplier systems, and external signals seamlessly.",
  },
  {
    title: "Compliance & Risk",
    body: "Audit trails, configurable guardrails and thresholds, and end-to-end decision traceability.",
  },
];

/* Placeholder media block — swapped per-card later */
function CardMedia() {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-xl bg-[#efeee9]">
      <div className="absolute left-1/2 top-10 w-[220px] -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
        <p className="text-[12px] font-medium text-zinc-900">In transit overview</p>
        <p className="mt-1 text-[34px] font-medium leading-none text-zinc-900">64</p>
        <div className="mt-2 space-y-0.5 text-[11px]">
          <p className="text-orange-600">3 Departure Delays</p>
          <p className="text-orange-600">3 Arrival Delays</p>
          <p className="text-zinc-600">58 On time</p>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-sm bg-orange-600 px-2.5 py-2 text-[11px] font-medium text-white">
          3 shipments in transit today <ArrowRight size={12} />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[repeating-linear-gradient(90deg,#eab308_0px,#eab308_18px,#a16207_18px,#a16207_20px)]" />
      <div className="absolute inset-x-0 bottom-24 h-2 bg-yellow-500" />
    </div>
  );
}

export default function Advantages() {
  return (
    <section id="advantages" className="bg-[#fafaf9] py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <p className="text-[17px] font-medium text-[#5C3D97]">The Value We Deliver</p>
          <h2 className="mt-3 text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]">
            The Advantages
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            Proprietary AI core, productized data preparation, and outcome-anchored delivery.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {CARDS.map((c, i) => (
            <FadeIn key={c.title} delay={(i % 2) * 0.08}>
              <div className="rounded-2xl border border-zinc-200/70 bg-white p-6">
                <h3 className="text-[20px] font-medium text-zinc-900">{c.title}</h3>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-zinc-500">{c.body}</p>
                <div className="mt-5">
                  <CardMedia />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
