"use client";

import FadeIn from "./FadeIn";

export default function MissionStatement() {
  return (
    <section className="bg-white pb-20 pt-24">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <p className="max-w-3xl text-[28px] font-medium leading-snug tracking-tight sm:text-[36px]">
            <span className="text-zinc-900">
              Navanta turns supply chain chaos into confident decisions.
            </span>{" "}
            <span className="text-zinc-400">
              One intelligence layer over the systems you already run — live
              in 12–16 weeks, not years.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
