"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { DOTS, MAP_W, MAP_H } from "./impactDots";

const REGIONS = [
  {
    id: 1,
    name: "North America",
    title: "The industrial heartland",
    body: "A ~$1B trucking-equipment dealer, a ~$1B flooring OEM, and a ~$4B automotive components distributor run planning, orders, and procurement on the Lens.",
    pill: { x: 16, y: 24 },
    glow: { x: 16, y: 40 },
  },
  {
    id: 2,
    name: "Europe",
    title: "Category control",
    body: "Procurement control towers across chemicals categories and multi-site European operations — competitive RFPs, consolidated buys, savings tracked to target.",
    pill: { x: 48, y: 6 },
    glow: { x: 48, y: 18 },
  },
  {
    id: 3,
    name: "India",
    title: "Where the Lens is built",
    body: "Navanta's scaled engineering and delivery hub — senior US leadership working alongside teams in India to ship outcomes for every engagement.",
    pill: { x: 66.5, y: 34 },
    glow: { x: 66.5, y: 50 },
  },
];

const CYCLE = 5000;

export default function Impact() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const t = setTimeout(
      () => setActive((a) => (a % REGIONS.length) + 1),
      CYCLE
    );
    return () => clearTimeout(t);
  }, [active]);

  const region = REGIONS.find((r) => r.id === active)!;

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

        {/* Interactive dotted world map */}
        <FadeIn delay={0.1} className="mt-16">
          <div className="relative">
            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="w-full"
              role="img"
              aria-label="Map of regions Navanta serves"
            >
              {[0, 1, 2, 3].map((rid) => (
                <g
                  key={rid}
                  style={{
                    fill:
                      rid === 0
                        ? "#2f2f2f"
                        : rid === active
                          ? "#9b7bd4"
                          : "#3d3d3d",
                    transition: "fill 0.7s ease",
                  }}
                >
                  {DOTS.filter((d) => d[2] === rid).map((d, i) => (
                    <circle key={i} cx={d[0] + 0.5} cy={d[1] + 0.5} r={0.34} />
                  ))}
                </g>
              ))}
            </svg>

            {/* Violet glow behind the active cluster */}
            <AnimatePresence>
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                aria-hidden
                className="pointer-events-none absolute h-[46%] w-[24%] rounded-full bg-[#5C3D97]/25 blur-3xl"
                style={{
                  left: `${region.glow.x - 12}%`,
                  top: `${(region.glow.y / MAP_H) * 100 - 23}%`,
                }}
              />
            </AnimatePresence>

            {/* Region pills with connector lines */}
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                onMouseEnter={() => setActive(r.id)}
                className="group absolute -translate-x-1/2"
                style={{ left: `${r.pill.x}%`, top: `${(r.pill.y / MAP_H) * 100 - 14}%` }}
                aria-pressed={r.id === active}
              >
                <span
                  className={`block whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors ${
                    r.id === active
                      ? "border-[#9b7bd4] bg-[#5C3D97]/30 text-white"
                      : "border-white/25 bg-black/40 text-white/60 group-hover:border-white/50"
                  }`}
                >
                  {r.name}
                </span>
                <span
                  aria-hidden
                  className={`mx-auto block h-8 w-px transition-colors ${
                    r.id === active ? "bg-[#9b7bd4]" : "bg-white/20"
                  }`}
                />
              </button>
            ))}

            {/* Detail card — glass, bottom right on desktop */}
            <div className="mt-8 lg:absolute lg:bottom-2 lg:right-0 lg:mt-0 lg:w-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={region.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#9b7bd4]">
                    {region.name}
                  </p>
                  <p className="mt-2 text-[19px] font-medium text-white">{region.title}</p>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60">
                    {region.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
