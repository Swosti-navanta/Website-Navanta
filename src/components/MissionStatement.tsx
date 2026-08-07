"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "Navanta turns supply chain chaos into confident decisions, one intelligence layer over the systems you already run, live in weeks.";
const WORDS = TEXT.split(" ");

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const color = useTransform(progress, range, ["#d4d4d8", "#18181b"]);
  return (
    <motion.span style={{ color }} className="mr-[0.26em] inline-block">
      {children}
    </motion.span>
  );
}

export default function MissionStatement() {
  const ref = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);

  // Scroll-linked fill: grey → black, word by word, as the statement moves up.
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // start filling when the section top passes 80% of the viewport,
      // finish by the time it reaches 25%.
      const p = (vh * 0.8 - r.top) / (vh * 0.55);
      progress.set(Math.min(1, Math.max(0, p)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  return (
    <section ref={ref} className="bg-white py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <p className="flex max-w-5xl flex-wrap text-[30px] font-normal leading-[1.28] tracking-tight sm:text-[46px]">
          {WORDS.map((w, i) => {
            const start = i / WORDS.length;
            const end = start + 1 / WORDS.length;
            return (
              <Word key={`${w}-${i}`} range={[start, end]} progress={progress}>
                {w}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
