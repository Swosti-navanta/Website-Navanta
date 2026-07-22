"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import FadeIn from "./FadeIn";

const STEPS = [
  {
    title: "AI Readiness",
    img: "ai-readiness",
    caption: "Your data cleansed, modeled, and AI-ready — the bedrock of every outcome.",
  },
  {
    title: "Value Definition",
    img: "value-definition",
    caption: "ROI targets locked and value milestones agreed up front.",
  },
  {
    title: "Evaluate & Assess",
    img: "evaluate-assess",
    caption: "Real workflows mapped — including the unwritten rules.",
  },
  {
    title: "Design & Develop",
    img: "design-develop",
    caption: "A future-state operating model, designed with you.",
  },
  {
    title: "Targeted Alignment",
    img: "targeted-alignment",
    caption: "The Lens tailored to your data, your industry, your edge.",
  },
  {
    title: "Operational Launch",
    img: "operational-launch",
    caption: "Live in months, not years — value from day one.",
  },
  {
    title: "Refine & Measure",
    img: "refine-measure",
    caption: "Outcomes that compound — your AI gets smarter every quarter.",
  },
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Scroll-driven horizontal translation: as the section moves through the
  // viewport (enters at 85%, exits at 15%), the row slides left by however
  // much it overflows. Manual listener — works reliably with Lenis.
  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      const row = rowRef.current;
      if (!el || !row) return;
      const travel = Math.max(0, row.scrollWidth - row.clientWidth);
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh * 0.7; // from top@85%vh → bottom@15%vh
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / total));
      x.set(-travel * p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [x]);

  return (
    <section id="features" ref={sectionRef} className="overflow-hidden bg-white py-28">
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

        {/* Scroll-driven horizontal row */}
        <div ref={rowRef} className="mt-12 overflow-hidden">
          <motion.div style={{ x }} className="flex w-max gap-6">
            {STEPS.map((s) => (
              <div key={s.title} className="w-[300px] flex-shrink-0">
                <div className="relative h-[240px] overflow-hidden rounded-xl bg-zinc-100">
                  {/* Mini-UI — official Figma card asset */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/figma/approach/${s.img}.png`}
                    alt=""
                    aria-hidden
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 inline-block rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[13px] font-medium text-zinc-800 shadow-sm">
                    {s.title}
                  </span>
                </div>
                <p className="mt-4 text-[14.5px] leading-relaxed text-zinc-600">{s.caption}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
