"use client";

import FadeIn from "./FadeIn";

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

        {/* Dotted world map with community avatars — Figma asset */}
        <FadeIn delay={0.1} className="mt-14">
          <div className="overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/impact-worldmap.png"
              alt="Navanta clients across the globe"
              className="w-full"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
