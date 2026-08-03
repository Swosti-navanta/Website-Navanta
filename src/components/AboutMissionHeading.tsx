"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "Industrial supply chains run the physical world, yet they still run on fragmented systems, manual planning, and decisions made a step too late. We exist to change that.";
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

/* Same scroll-linked grey → black word fill as the homepage mission
   statement (MissionStatement.tsx), sized down for a section heading. */
export default function AboutMissionHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
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
    <h2
      ref={ref}
      className="flex flex-wrap text-[28px] font-medium leading-snug tracking-tight sm:text-[36px]"
    >
      {WORDS.map((w, i) => {
        const start = i / WORDS.length;
        const end = start + 1 / WORDS.length;
        return (
          <Word key={`${w}-${i}`} range={[start, end]} progress={progress}>
            {w}
          </Word>
        );
      })}
    </h2>
  );
}
