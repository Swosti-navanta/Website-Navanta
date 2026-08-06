"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import LensStar from "./LensStar";
import FadeIn from "./FadeIn";

const RAW = "/lens/card-raw.png";
const CLEAN = "/lens/card-clean.png";

/* Flow tuned against the reference animation, which drifts cards at a constant
   pace. Both streams share one SPEED so the raw side and the clean side move at
   exactly the same rate. */
const SPEED = 17; // % of frame width per second

// Raw stream: enters off-frame left, stops before the orb's left edge (41%).
// Cards are 10.5% wide, so ending at 30% keeps the right edge at 40.5% — the
// stream can never be seen behind the logo.
const RAW_FROM = -14;
const RAW_TO = 30;
const RAW_DUR = (RAW_TO - RAW_FROM) / SPEED;

// Clean stream: emerges at the orb's right edge and glides off frame.
const CLEAN_FROM = 59;
const CLEAN_TO = 118;
const CLEAN_DUR = (CLEAN_TO - CLEAN_FROM) / SPEED;

/* Raw input cards that FLOW when ON.

   Four streams enter the left edge at once at very different heights and each
   converges into the logo, so cards reach it queued single-file and slide in one
   by one.

   Spacing keeps cards from ever overlapping: within a stream the gap is a third
   of the run (≈14.7%, wider than a 10.5% card), and the streams stay at least 8%
   apart vertically (taller than a 6.8% card). The orb covers 32-68% of the frame
   height, so all four targets land inside the logo.

   OFF → the flow keeps its rightward momentum (the spring carries a positive
   velocity) while cards spread out to their scatter spot and settle into a
   float, so the stream eases apart instead of snapping. */
const RAW_STREAMS = [
  { y0: 5, ey: 36 },
  { y0: 30, ey: 45 },
  { y0: 60, ey: 54 },
  { y0: 88, ey: 62 },
];
const PER_STREAM = 3;
// staggers the streams so cards reach the logo one after another
const STREAM_STAGGER = RAW_DUR / (RAW_STREAMS.length * PER_STREAM);

/* Scatter targets for the OFF spread — 20 evenly distributed spots. The first
   12 belong to the flowing cards, the rest to the extras below. */
type ScatterCard = { x: number; y: number; r: number };
const SCATTER: ScatterCard[] = [
  { x: 4, y: 7, r: -2 }, { x: 24, y: 9, r: 2 }, { x: 45, y: 6, r: 1 }, { x: 65, y: 8, r: -1 },
  { x: 85, y: 5, r: 2 }, { x: 12, y: 30, r: -2 }, { x: 33, y: 33, r: 1 }, { x: 54, y: 29, r: -1 },
  { x: 75, y: 32, r: 2 }, { x: 3, y: 53, r: -1 }, { x: 22, y: 55, r: 2 }, { x: 43, y: 51, r: -2 },
  { x: 66, y: 54, r: 1 }, { x: 86, y: 52, r: -1 }, { x: 57, y: 40, r: 2 }, { x: 30, y: 79, r: -1 },
  { x: 10, y: 76, r: 2 }, { x: 50, y: 75, r: 1 }, { x: 70, y: 78, r: -2 }, { x: 88, y: 77, r: 1 },
];

type FlowCard = ScatterCard & { y0: number; ey: number; delay: number };
const RAW_FLOW: FlowCard[] = RAW_STREAMS.flatMap((s, k) =>
  Array.from({ length: PER_STREAM }, (_, j) => ({
    y0: s.y0,
    ey: s.ey,
    delay: (j * RAW_DUR) / PER_STREAM + k * STREAM_STAGGER,
    ...SCATTER[k * PER_STREAM + j],
  })),
);

/* Extra cards that only exist in the OFF scatter — invisible while ON, they
   fade into place so the frame fills evenly (20 cards total). */
const RAW_EXTRA: ScatterCard[] = SCATTER.slice(RAW_STREAMS.length * PER_STREAM);

/* Clean output cards: emerge at the orb's right edge and glide off to the right
   in a centre-aligned row. */
const CLEAN_COUNT = 5;

/* The three model animations. Each gets a segment in the timer below the frame;
   the active segment fills, then the next model takes over. */
const CONCEPTS = [
  "Intelligent Procurement Model",
  "Inventory Intelligence Model",
  "Demand Sensing Model",
];
const CONCEPT_MS = 9000;

/* The card layer and the orb are memoised on `on` alone. Without this, the
   concept timer's re-render every few seconds hands framer-motion fresh
   animate/transition objects, which restarts every looping animation and
   re-applies each card's stagger delay, the cards visibly jump. */
const CardLayer = memo(function CardLayer({ on }: { on: boolean }) {
  return (
    <div className={`absolute inset-0 ${on ? "z-10" : "z-30"}`}>
      {/* raw inputs, four streams funnelling into the logo (ON) / spreading (OFF) */}
      {RAW_FLOW.map((c, i) => (
        <motion.div
          key={`raw-${i}`}
          className="absolute w-[118px]"
          animate={
            on
              ? {
                  // constant size, crisp; straight diagonal from the left edge
                  // in to the logo, fading out as it meets the logo so nothing
                  // is ever seen behind it.
                  left: [`${RAW_FROM}%`, `${RAW_TO}%`],
                  top: [`${c.y0}%`, `${c.ey}%`],
                  rotate: 0,
                  opacity: [0, 1, 1, 0],
                }
              : { left: `${c.x}%`, top: `${c.y}%`, rotate: c.r, opacity: 1 }
          }
          transition={
            on
              ? {
                  left: { duration: RAW_DUR, repeat: Infinity, ease: "linear", delay: c.delay },
                  top: { duration: RAW_DUR, repeat: Infinity, ease: "linear", delay: c.delay },
                  rotate: { duration: 0.4 },
                  opacity: {
                    duration: RAW_DUR,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.1, 0.84, 1],
                    delay: c.delay,
                  },
                }
              : {
                  // carry the flow's rightward momentum into the spread
                  left: {
                    type: "spring",
                    stiffness: 48,
                    damping: 14,
                    velocity: SPEED,
                    delay: (c.x / 100) * 0.45,
                  },
                  top: { type: "spring", stiffness: 65, damping: 16, delay: (c.x / 100) * 0.45 },
                  rotate: { duration: 0.6, delay: (c.x / 100) * 0.45 },
                  opacity: { duration: 0.45, ease: "easeOut" },
                }
          }
        >
          <motion.div
            animate={on ? { y: 0 } : { y: [0, -7, 0] }}
            transition={
              on
                ? { duration: 0 }
                : { duration: 4.5 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: 0.8 }
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={RAW} alt="" aria-hidden className="w-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)]" />
          </motion.div>
        </motion.div>
      ))}

      {/* extra scatter cards, only visible in the OFF spread */}
      {RAW_EXTRA.map((c, i) => (
        <motion.div
          key={`extra-${i}`}
          className="absolute w-[118px]"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          animate={on ? { opacity: 0, rotate: c.r } : { opacity: 1, rotate: c.r }}
          transition={
            on
              ? { duration: 0.25 }
              : { duration: 0.5, ease: "easeOut", delay: 0.15 + (c.x / 100) * 0.45 }
          }
        >
          <motion.div
            animate={on ? { y: 0 } : { y: [0, -7, 0] }}
            transition={
              on
                ? { duration: 0 }
                : { duration: 4.5 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: 0.9 }
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={RAW} alt="" aria-hidden className="w-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)]" />
          </motion.div>
        </motion.div>
      ))}

      {/* clean outputs, emerge at the orb's right edge, glide right in a row */}
      {Array.from({ length: CLEAN_COUNT }).map((_, i) => {
        const delay = (i * CLEAN_DUR) / CLEAN_COUNT;
        return (
          <motion.div
            key={`clean-${i}`}
            className="absolute w-[92px] -translate-y-1/2"
            animate={
              on
                ? { left: [`${CLEAN_FROM}%`, `${CLEAN_TO}%`], top: "50%", opacity: [0, 1, 1, 0] }
                : { opacity: 0 }
            }
            transition={
              on
                ? {
                    left: { duration: CLEAN_DUR, repeat: Infinity, ease: "linear", delay },
                    opacity: {
                      duration: CLEAN_DUR,
                      repeat: Infinity,
                      ease: "linear",
                      times: [0, 0.1, 0.82, 1],
                      delay,
                    },
                    top: { duration: 0 },
                  }
                : { duration: 0.35, ease: "easeOut" }
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CLEAN} alt="" aria-hidden className="w-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.28)]" />
          </motion.div>
        );
      })}
    </div>
  );
});

const Orb = memo(function Orb({ on }: { on: boolean }) {
  return (
    <motion.div
      className={`absolute left-1/2 top-1/2 w-[18%] -translate-x-1/2 -translate-y-1/2 ${on ? "z-20" : "z-0"}`}
      animate={{
        opacity: on ? 1 : 0.4,
        filter: on ? "grayscale(0)" : "grayscale(0.7)",
        scale: on ? 1 : 0.92,
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#8b6bc7]/40 blur-2xl"
        animate={{ opacity: on ? 1 : 0, scale: on ? [1, 1.12, 1] : 1 }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/lens/orb.png" alt="Navanta Lens" className="relative w-full" />
    </motion.div>
  );
});

export default function LensIntro() {
  const [on, setOn] = useState(true);
  const [concept, setConcept] = useState(0);

  // advance to the next model when the timer runs out; pauses while toggled off
  useEffect(() => {
    if (!on) return;
    const t = setTimeout(
      () => setConcept((c) => (c + 1) % CONCEPTS.length),
      CONCEPT_MS,
    );
    return () => clearTimeout(t);
  }, [concept, on]);

  return (
    <section id="lens" className="bg-white py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <h2 className="font-medium tracking-tight text-zinc-900">
            Introducing Navanta Lens
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            Fragmented signals in, coordinated decisions out, one intelligence
            layer standardizing process, technology, and data across your supply
            chain.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lens/bg.jpg"
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* model name + ON/OFF toggle */}
            <div className="absolute inset-x-0 top-5 z-40 flex items-center justify-center gap-4">
              <span className="flex items-center gap-2 text-[15px] font-medium text-white">
                <LensStar size={16} />
                {CONCEPTS[concept]}
              </span>
              <button
                onClick={() => setOn((v) => !v)}
                aria-pressed={on}
                className="flex items-center rounded-full bg-white/90 p-1 shadow-sm"
              >
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${!on ? "bg-zinc-900 text-white" : "text-zinc-500"}`}>
                  OFF
                </span>
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${on ? "bg-zinc-900 text-white" : "text-zinc-500"}`}>
                  ON
                </span>
              </button>
            </div>

            <CardLayer on={on} />
            <Orb on={on} />
          </div>

          {/* Timer, one segment per model; the active one fills, then advances */}
          <div className="mt-10 flex gap-5">
            {CONCEPTS.map((name, i) => (
              <button
                key={name}
                onClick={() => setConcept(i)}
                aria-label={name}
                aria-current={i === concept}
                className="relative h-px flex-1 bg-zinc-200"
              >
                <motion.span
                  key={`${concept}-${i}-${on}`}
                  aria-hidden
                  className="absolute inset-y-0 left-0 block bg-zinc-900"
                  initial={{ width: i < concept ? "100%" : "0%" }}
                  animate={{ width: i === concept ? "100%" : i < concept ? "100%" : "0%" }}
                  transition={
                    i === concept
                      ? { duration: on ? CONCEPT_MS / 1000 : 0, ease: "linear" }
                      : { duration: 0.3 }
                  }
                />
                <span className="absolute -inset-y-3 inset-x-0" />
              </button>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
