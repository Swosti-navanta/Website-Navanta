"use client";

import FadeIn from "./FadeIn";

/* Avatar cluster positions (percent-based) — placeholder people dots */
const CLUSTERS = [
  { x: "22%", y: "28%", colors: ["#f9a8d4", "#a7f3d0"] },
  { x: "48%", y: "58%", colors: ["#fcd34d", "#c4b5fd"] },
  { x: "68%", y: "34%", colors: ["#86efac", "#fdba74", "#93c5fd"] },
  { x: "88%", y: "18%", colors: ["#7dd3fc"] },
];

export default function Impact() {
  return (
    <section id="impact" className="bg-[#0c0b0a] py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h2 className="text-[30px] font-medium tracking-tight text-white sm:text-[38px]">
              Real impact for real clients
            </h2>
            <a
              href="#contact"
              className="rounded-lg border border-white/30 px-4 py-2 text-[13.5px] text-white/90 transition-colors hover:border-white/60"
            >
              See more videos
            </a>
          </div>
        </FadeIn>

        {/* Dotted world map placeholder — swap for the real dotted-map asset */}
        <FadeIn delay={0.1} className="mt-14">
          <div className="relative h-[420px] overflow-hidden rounded-xl bg-[#111010] [background-image:radial-gradient(#3a3a3a_1.5px,transparent_1.5px)] [background-size:16px_16px] sm:h-[520px]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(65% 80% at 50% 45%, transparent 55%, #0c0b0a 100%)",
              }}
            />
            {CLUSTERS.map((c, i) => (
              <div
                key={i}
                className="absolute flex -translate-x-1/2 -translate-y-1/2"
                style={{ left: c.x, top: c.y }}
              >
                {c.colors.map((col, j) => (
                  <span
                    key={j}
                    className="h-10 w-10 rounded-full border-2 border-[#0c0b0a]"
                    style={{ background: col, marginLeft: j > 0 ? -10 : 0 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
