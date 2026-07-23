"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { DOTS, MAP_W, MAP_H } from "./impactDots";

const REGIONS = [
  {
    id: 1,
    name: "North America",
    body: "A ~$1B trucking-equipment dealer, a ~$1B flooring OEM, and a ~$4B automotive components distributor run planning, orders, and procurement on the Lens.",
    cx: 15,
    cy: 6,
  },
  {
    id: 2,
    name: "Europe",
    body: "Procurement control towers across chemicals categories and multi-site European operations — competitive RFPs, consolidated buys, savings tracked to target.",
    cx: 47.5,
    cy: 4.5,
  },
  {
    id: 3,
    name: "India",
    body: "Navanta's scaled engineering and delivery hub — senior US leadership working alongside teams in India to ship outcomes for every engagement.",
    cx: 61,
    cy: 12,
  },
];

const CYCLE = 5000;

export default function Impact() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a % REGIONS.length) + 1), CYCLE);
    return () => clearTimeout(t);
  }, [active]);

  const region = REGIONS.find((r) => r.id === active)!;
  const pct = (v: number, total: number) => (v / total) * 100;

  return (
    <section id="impact" className="relative -mt-10 rounded-t-[40px] bg-[#0c0b0a] py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <h2 className="text-[30px] font-medium tracking-tight text-white sm:text-[38px]">
              Real impact for real clients
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-white/55 lg:justify-self-end">
              From plant floors in North America to procurement categories in
              Europe — Navanta&apos;s intelligence layer runs where industry runs,
              delivered by teams across the US and India.
            </p>
          </div>
        </FadeIn>

        {/* Dotted world map with lit client regions */}
        <FadeIn delay={0.1} className="mt-20">
          <div className="relative mx-auto max-w-[1180px]">
            {/* Soft glow behind the active cluster */}
            <AnimatePresence>
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                aria-hidden
                className="pointer-events-none absolute h-[34%] w-[14%] rounded-full bg-[#8b6bc7]/30 blur-2xl"
                style={{
                  left: `${pct(region.cx, MAP_W) - 7}%`,
                  top: `${pct(region.cy, MAP_H) - 17}%`,
                }}
              />
            </AnimatePresence>

            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="w-full"
              role="img"
              aria-label="Regions where Navanta serves clients"
            >
              {/* base land */}
              <g fill="#2e2d2b">
                {DOTS.filter((d) => d[2] === 0).map((d, i) => (
                  <circle key={i} cx={d[0] + 0.5} cy={d[1] + 0.5} r={0.36} />
                ))}
              </g>
              {/* client clusters — always softly lit, active glows bright */}
              {REGIONS.map((r) => (
                <g
                  key={r.id}
                  style={{
                    fill: r.id === active ? "#c9adeb" : "#71619b",
                    transition: "fill 0.8s ease",
                  }}
                >
                  {DOTS.filter((d) => d[2] === r.id).map((d, i) => (
                    <circle key={i} cx={d[0] + 0.5} cy={d[1] + 0.5} r={0.42} />
                  ))}
                </g>
              ))}
            </svg>

            {/* Region labels with connector lines */}
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                onMouseEnter={() => setActive(r.id)}
                className="absolute flex -translate-x-1/2 flex-col items-center"
                style={{
                  left: `${pct(r.cx, MAP_W)}%`,
                  bottom: `${100 - pct(r.cy, MAP_H)}%`,
                }}
                aria-pressed={r.id === active}
              >
                <span
                  className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
                    r.id === active
                      ? "border-[#b493e6]/70 text-white"
                      : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
                  }`}
                >
                  {r.name}
                </span>
                <span
                  aria-hidden
                  className={`block h-7 w-px transition-colors duration-300 ${
                    r.id === active ? "bg-[#b493e6]/60" : "bg-white/15"
                  }`}
                />
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Active region — plain inline text, no card */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3 lg:grid-cols-[260px_1fr]"
            >
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#b493e6]">
                {region.name}
              </p>
              <p className="max-w-2xl text-[15px] leading-relaxed text-white/65">
                {region.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
