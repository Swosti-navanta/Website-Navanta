"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkle } from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

const RAW = "/lens/card-raw.png";
const CLEAN = "/lens/card-clean.png";

const FLOW_DUR = 5; // seconds per card to cross (lower = faster)

/* Raw input cards: flow left → fade out just before the orb (ON);
   freeze + spring to a scattered spot and float (OFF). */
type RawCard = { lane: number; r: number; sx: number; sy: number; sr: number };
const RAW_CARDS: RawCard[] = [
  { lane: 12, r: -5, sx: 10, sy: 9, sr: -8 },
  { lane: 28, r: 4, sx: 30, sy: 16, sr: 5 },
  { lane: 44, r: -3, sx: 17, sy: 39, sr: -4 },
  { lane: 60, r: 5, sx: 40, sy: 34, sr: 6 },
  { lane: 76, r: -4, sx: 9, sy: 64, sr: -5 },
  { lane: 20, r: 3, sx: 52, sy: 20, sr: 5 },
  { lane: 52, r: -5, sx: 30, sy: 70, sr: 4 },
  { lane: 36, r: 2, sx: 62, sy: 58, sr: -6 },
  { lane: 68, r: 4, sx: 20, sy: 86, sr: -3 },
];

/* Clean output cards: emerge at the orb's right edge → glide off right (ON);
   fade away (OFF). */
const CLEAN_CARDS = [30, 30, 30, 30, 30];

export default function LensIntro() {
  const [on, setOn] = useState(true);

  return (
    <section id="lens" className="bg-white py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <h2 className="text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]">
            Introducing Navanta Lens
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            Fragmented signals in, coordinated decisions out — one intelligence
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
                <Sparkle size={16} weight="fill" className="text-white/80" />
                Order Intelligence Model
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

            {/* Cards — persistent nodes; behind orb when ON, in front when OFF */}
            <div className={`absolute inset-0 ${on ? "z-10" : "z-30"}`}>
              {/* raw inputs */}
              {RAW_CARDS.map((c, i) => (
                <motion.div
                  key={`raw-${i}`}
                  className="absolute w-[118px]"
                  animate={
                    on
                      ? { left: ["-16%", "36%"], top: `${c.lane}%`, rotate: c.r, opacity: [0, 1, 1, 0] }
                      : { left: `${c.sx}%`, top: `${c.sy}%`, rotate: c.sr, opacity: 1 }
                  }
                  transition={
                    on
                      ? {
                          left: { duration: FLOW_DUR, repeat: Infinity, ease: "linear", delay: (i * FLOW_DUR) / RAW_CARDS.length },
                          opacity: { duration: FLOW_DUR, repeat: Infinity, ease: "linear", delay: (i * FLOW_DUR) / RAW_CARDS.length },
                          top: { duration: 0 },
                          rotate: { duration: 0 },
                        }
                      : { type: "spring", stiffness: 110, damping: 17, mass: 0.9 }
                  }
                >
                  <motion.div
                    animate={on ? { y: 0 } : { y: [0, -7, 0] }}
                    transition={on ? { duration: 0 } : { duration: 4.5 + (i % 4), repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={RAW} alt="" aria-hidden className="w-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)]" />
                  </motion.div>
                </motion.div>
              ))}

              {/* clean outputs */}
              {CLEAN_CARDS.map((y, i) => (
                <motion.div
                  key={`clean-${i}`}
                  className="absolute w-[84px]"
                  animate={
                    on
                      ? { left: ["58%", "116%"], top: `${y}%`, opacity: [0, 1, 1, 0] }
                      : { opacity: 0 }
                  }
                  transition={
                    on
                      ? {
                          left: { duration: FLOW_DUR, repeat: Infinity, ease: "linear", delay: (i * FLOW_DUR) / CLEAN_CARDS.length },
                          opacity: { duration: FLOW_DUR, repeat: Infinity, ease: "linear", delay: (i * FLOW_DUR) / CLEAN_CARDS.length },
                          top: { duration: 0 },
                        }
                      : { duration: 0.3 }
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={CLEAN} alt="" aria-hidden className="w-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.28)]" />
                </motion.div>
              ))}
            </div>

            {/* The Lens orb */}
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
                transition={{ opacity: { duration: 0.5 }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lens/orb.png" alt="Navanta Lens" className="relative w-full" />
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
