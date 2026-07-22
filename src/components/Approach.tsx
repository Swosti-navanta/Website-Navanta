"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const STEPS = [
  {
    title: "AI Readiness",
    caption: "Your data cleansed, modeled, and AI-ready — the bedrock of every outcome.",
  },
  {
    title: "Value Definition",
    caption: "ROI targets locked and value milestones agreed up front.",
  },
  {
    title: "Evaluate & Assess",
    caption: "Real workflows mapped — including the unwritten rules.",
  },
  {
    title: "Codify & Design",
    caption: "A future-state operating model, designed with you.",
  },
  {
    title: "Targeted Alignment",
    caption: "The Lens tailored to your data, your industry, your edge.",
  },
  {
    title: "Operational Launch",
    caption: "Live in months, not years — value from day one.",
  },
  {
    title: "Refine & Measure",
    caption: "Outcomes that compound — your AI gets smarter every quarter.",
  },
];

export default function Approach() {
  return (
    <section id="features" className="bg-white py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <p className="text-[17px] font-medium text-[#5C3D97]">The Approach</p>
          <h2 className="mt-3 text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]">
            From vision to value
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            A repeatable, AI-led delivery framework built from years of industrial
            transformation engagements.
          </p>
        </FadeIn>

        {/* Step cards — horizontal scroll */}
        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="w-[300px] flex-shrink-0"
            >
              <div className="relative h-[240px] rounded-xl bg-zinc-100 p-4">
                <span className="inline-block rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[13px] font-medium text-zinc-800 shadow-sm">
                  {s.title}
                </span>
                {/* Mini-UI placeholder — replaced per-step later */}
                <div className="absolute inset-x-10 bottom-10 top-16 rounded-lg border border-zinc-200/70 bg-white/60" />
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-zinc-600">{s.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
