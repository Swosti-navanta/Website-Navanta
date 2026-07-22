"use client";

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

/* Card media — Figma "In transit" render */
function CardMedia() {
  return (
    <div className="h-[300px] overflow-hidden rounded-xl bg-[#efeee9]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/advantages-transit.png"
        alt=""
        aria-hidden
        className="h-full w-full object-cover object-top"
      />
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
