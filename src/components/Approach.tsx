"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import FadeIn from "./FadeIn";

const STEPS = [
  {
    title: "AI Readiness",
    img: "ai-readiness",
    caption: "Your data cleansed, modeled, and AI-ready, the bedrock of every outcome.",
  },
  {
    title: "Value Definition",
    img: "value-definition",
    caption: "ROI targets locked and value milestones agreed up front.",
  },
  {
    title: "Assess & Design",
    img: "design-develop",
    caption: "Real workflows mapped, then redesigned into your future-state operating model.",
  },
  {
    title: "Tailored Launch",
    img: "targeted-alignment",
    caption: "The Lens tailored to your data and industry, live in months, not years.",
  },
  {
    title: "Refine & Measure",
    img: "refine-measure",
    caption: "Outcomes that compound, your AI gets smarter every quarter.",
  },
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Scroll-driven horizontal translation, anchored to the ROW itself (not the
  // whole section): progress runs from 0, when the row enters at 90% down the
  // viewport, to 1, when the row's top reaches 10% down — comfortably still
  // on-screen. Anchoring on the section instead (as this used to) ties
  // completion to the section's total height, which includes the heading and
  // padding above the row; on shorter viewports that let completion land
  // after the row had already scrolled above the visible area, so the last
  // card's fully-assembled position was never actually seen. Using the row's
  // own position instead is correct at any viewport height by construction —
  // no per-height tuning needed. Manual listener — works reliably with Lenis.
  // Desktop only: on mobile the row is a native swipe slider instead, so the
  // transform stays at 0 and the first card is the resting start position.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      const row = rowRef.current;
      if (!row) return;
      if (!desktop.matches) {
        x.set(0);
        return;
      }
      const travel = Math.max(0, row.scrollWidth - row.clientWidth);
      const rect = row.getBoundingClientRect();
      const vh = window.innerHeight;
      const enter = vh * 0.9;
      const exit = vh * 0.1;
      const p = Math.min(1, Math.max(0, (enter - rect.top) / (enter - exit)));
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
          <h2 className="font-medium tracking-tight text-zinc-900">
            From vision to value
          </h2>
          <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            A repeatable, AI-led delivery framework.
          </p>
        </FadeIn>
      </div>

      {/* Full-bleed row. Desktop: scroll-driven, starts offset right, glides
          edge-to-edge, stops with the last card (Refine & Measure) at the
          right. Mobile: a native swipe slider — starts on the first card,
          snaps card-by-card, scrollbar hidden. */}
      <div
        ref={rowRef}
        className="mt-8 w-full snap-x snap-mandatory overflow-x-auto scroll-pl-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:snap-none lg:overflow-hidden"
      >
        <motion.div
          style={{ x }}
          className="flex w-max gap-6 pl-6 pr-6 lg:pl-[20vw] lg:pr-10"
        >
          {STEPS.map((s) => (
              <div key={s.title} className="w-[300px] flex-shrink-0 snap-start">
                {/* Official Figma card asset, title and mockup are baked into
                    the image itself (5:4 aspect matches the 300×240 tile). */}
                <div className="relative h-[240px] overflow-hidden rounded-xl bg-[#f5f5f7]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/figma/approach/${s.img}.png`}
                    alt={s.title}
                    className="h-full w-full object-contain"
                  />
                </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-zinc-600">{s.caption}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
