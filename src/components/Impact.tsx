"use client";

import { useState } from "react";
import { AnimatePresence, motion, useTransform } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import FadeIn from "./FadeIn";
import { useAdvanceTimer } from "@/hooks/useAdvanceTimer";
import { DOTS, MAP_W, MAP_H } from "./impactDots";

/* Veolia-style region explorer in the Navanta dot-matrix language: pick a
   region from the list (or let it auto-tour) and its dots become a window
   onto a photo of the work there, plus a slow-spinning badge and pulsing
   site markers. */

const REGIONS = [
  {
    id: 1,
    name: "North America",
    coords: "41°52′ N · 87°37′ W",
    img: "/figma/challenges-photo.jpg",
    body: "A ~$1B trucking dealer, ~$1B flooring OEM, and ~$4B auto-components distributor run on the Lens.",
    badge: { cx: 17.5, cy: 8 },
    sites: [
      { x: 14.5, y: 6.5 },
      { x: 12.5, y: 8.5 },
    ],
  },
  {
    id: 2,
    name: "Europe",
    coords: "51°55′ N · 4°28′ E",
    img: "/figma/footer-railyard.jpg",
    body: "Procurement control across chemicals categories, RFPs, consolidated buys, tracked savings.",
    badge: { cx: 50, cy: 6.5 },
    sites: [{ x: 46.5, y: 4.5 }],
  },
  {
    id: 3,
    name: "India",
    coords: "12°58′ N · 77°35′ E",
    img: "/hero/poster.jpg",
    body: "Our scaled engineering and delivery hub, working alongside senior US leadership.",
    badge: { cx: 63.5, cy: 12.5 },
    sites: [
      { x: 60.5, y: 10.5 },
      { x: 61.5, y: 12.5 },
    ],
  },
];

const CYCLE = 6500;

/* Bounding box per region — where each photo sits before the dot mask crops it. */
const BOUNDS: Record<number, { x: number; y: number; w: number; h: number }> = {};
for (const id of [1, 2, 3]) {
  const pts = DOTS.filter((d) => d[2] === id);
  const xs = pts.map((d) => d[0]);
  const ys = pts.map((d) => d[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  BOUNDS[id] = {
    x: minX,
    y: minY,
    w: Math.max(...xs) - minX + 1,
    h: Math.max(...ys) - minY + 1,
  };
}

const pct = (v: number, total: number) => (v / total) * 100;

/* Region picker — right-hand overlay on desktop, inline row on mobile. */
function RegionList({
  active,
  onPick,
  progressWidth,
  className,
  align = "right",
}: {
  active: number;
  onPick: (id: number) => void;
  progressWidth: import("framer-motion").MotionValue<string>;
  className?: string;
  align?: "right" | "left";
}) {
  return (
    <div className={className}>
      <p
        className={`text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35 ${
          align === "right" ? "text-right" : ""
        }`}
      >
        Choose region
      </p>
      <div
        className={`mt-4 flex flex-col gap-4 ${
          align === "right" ? "items-end" : "items-start"
        }`}
      >
        {REGIONS.map((r) => (
          <button
            key={r.id}
            onClick={() => onPick(r.id)}
            onMouseEnter={() => onPick(r.id)}
            aria-pressed={r.id === active}
            className={`text-[17px] font-medium tracking-tight transition-colors duration-300 ${
              r.id === active ? "text-white" : "text-white/35 hover:text-white/70"
            }`}
          >
            {r.name}
            <span className="mt-1 block h-px w-full overflow-hidden bg-white/10">
              {r.id === active && (
                <motion.span
                  className="block h-full bg-white"
                  style={{ width: progressWidth }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Impact() {
  const [active, setActive] = useState(1);

  const { progress, setPaused } = useAdvanceTimer(
    CYCLE,
    () => setActive((a) => (a % REGIONS.length) + 1),
    active,
  );
  const progressWidth = useTransform(progress, (p) => `${p * 100}%`);

  const region = REGIONS.find((r) => r.id === active)!;

  return (
    <section id="impact" data-nav-theme="dark" className="relative -mt-10 rounded-t-[40px] bg-[#0c0b0a] py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <h2 className="text-[30px] font-medium tracking-tight text-white sm:text-[38px]">
              Real impact for real clients
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-white/55 lg:justify-self-end">
              Navanta runs where industry runs, delivered by teams across the US and India.
            </p>
          </div>
        </FadeIn>

        {/* Dotted world map, the active region's dots open onto a photo */}
        <FadeIn delay={0.1} className="mt-20">
          <div
            className="relative mx-auto max-w-[1180px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Coordinates readout, quiet instrument detail */}
            <div className="pointer-events-none absolute -top-10 right-0 z-10 font-mono text-[10px] tracking-wider text-white/25">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3 }}
                >
                  {region.coords}
                </motion.p>
              </AnimatePresence>
            </div>

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
                  left: `${pct(region.badge.cx, MAP_W) - 7}%`,
                  top: `${pct(region.badge.cy, MAP_H) - 17}%`,
                }}
              />
            </AnimatePresence>

            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="w-full"
              role="img"
              aria-label="Regions where Navanta serves clients"
            >
              <defs>
                {REGIONS.map((r) => (
                  <mask key={r.id} id={`impact-mask-${r.id}`} maskUnits="userSpaceOnUse">
                    {DOTS.filter((d) => d[2] === r.id).map((d, i) => (
                      <circle key={i} cx={d[0] + 0.5} cy={d[1] + 0.5} r={0.55} fill="#fff" />
                    ))}
                  </mask>
                ))}
              </defs>

              {/* base land */}
              <g fill="#2e2d2b">
                {DOTS.filter((d) => d[2] === 0).map((d, i) => (
                  <circle key={i} cx={d[0] + 0.5} cy={d[1] + 0.5} r={0.36} />
                ))}
              </g>

              {/* client clusters, softly lit until their photo takes over */}
              {REGIONS.map((r) => (
                <g
                  key={r.id}
                  style={{
                    fill: r.id === active ? "#c9adeb" : "#71619b",
                    transition: "fill 0.8s ease",
                  }}
                >
                  {DOTS.filter((d) => d[2] === r.id).map((d, i) => (
                    <circle key={i} cx={d[0] + 0.5} cy={d[1] + 0.5} r={0.55} />
                  ))}
                </g>
              ))}

              {/* the photo, visible only through the region's dots */}
              {REGIONS.map((r) => {
                const b = BOUNDS[r.id];
                return (
                  <image
                    key={r.id}
                    href={r.img}
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.h}
                    preserveAspectRatio="xMidYMid slice"
                    mask={`url(#impact-mask-${r.id})`}
                    style={{
                      opacity: r.id === active ? 1 : 0,
                      filter: "brightness(1.45) saturate(1.2)",
                      transition: "opacity 0.8s ease",
                    }}
                  />
                );
              })}
            </svg>

            {/* Pulsing site markers */}
            {REGIONS.flatMap((r) =>
              r.sites.map((s, i) => (
                <span
                  key={`${r.id}-${i}`}
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{ left: `${pct(s.x, MAP_W)}%`, top: `${pct(s.y, MAP_H)}%` }}
                >
                  <span
                    className={`absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500 ${
                      r.id === active ? "bg-[#f0e9fb]" : "bg-[#8b78b5]"
                    }`}
                  />
                  <span className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[#b493e6]/50 [animation-duration:2.4s]" />
                </span>
              )),
            )}

            {/* Spinning explore badge at the active region */}
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${pct(region.badge.cx, MAP_W)}%`,
                top: `${pct(region.badge.cy, MAP_H)}%`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.55 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.55, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-[64px] w-[64px]"
                >
                  <div className="absolute inset-0 rounded-full bg-white shadow-[0_14px_44px_rgba(0,0,0,0.5)]" />
                  <svg
                    viewBox="0 0 64 64"
                    className="absolute inset-0 animate-[spin_16s_linear_infinite]"
                    aria-hidden
                  >
                    <defs>
                      <path
                        id="impact-badge-circle"
                        d="M32,32 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0"
                      />
                    </defs>
                    <text
                      className="fill-zinc-500"
                      style={{ fontSize: "5.4px", letterSpacing: "1.1px", fontWeight: 600 }}
                    >
                      <textPath href="#impact-badge-circle">
                        REAL CLIENTS · REAL IMPACT · REAL CLIENTS ·
                      </textPath>
                    </text>
                  </svg>
                  <Plus size={14} weight="bold" className="absolute inset-0 m-auto text-zinc-900" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Region picker, overlays open ocean on desktop */}
            <RegionList
              active={active}
              onPick={setActive}
              progressWidth={progressWidth}
              className="absolute right-0 top-[34%] z-10 hidden lg:block"
              align="right"
            />
          </div>

          {/* Region picker, inline on smaller screens */}
          <RegionList
            active={active}
            onPick={setActive}
            progressWidth={progressWidth}
            className="mt-10 lg:hidden"
            align="left"
          />
        </FadeIn>

        {/* Active region, plain inline text, no card */}
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
