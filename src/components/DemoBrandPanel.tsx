"use client";

import {
  AirplaneTakeoff,
  Truck,
  House,
  ChartBar,
  Boat,
  type Icon,
} from "@phosphor-icons/react";

/* The logistics modes the intelligence layer spans, shown as frosted-glass
   chips over the brand photo — air, road, warehouse, analytics, sea. */
const MODES: Icon[] = [AirplaneTakeoff, Truck, House, ChartBar, Boat];

/* Shared brand visual for the "Request a Demo" surfaces (contact page + modal).
   Photo, dark gradient, logo top-left, a row of mode chips, and the value line
   pinned to the bottom. Fills whatever box it's dropped into. */
export default function DemoBrandPanel({
  image = "/figma/demo-bridge.jpg",
  className = "",
}: {
  image?: string;
  className?: string;
}) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-zinc-900 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        aria-hidden
        // Anchor the bridge deck roughly at panel-center regardless of the
        // container aspect ratio, so the icons underneath it land in the same
        // visual spot on every size.
        style={{ objectPosition: "center 35%" }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/navanta-logo.svg"
        alt="Navanta"
        className="absolute left-8 top-8 h-8 w-auto sm:left-10 sm:top-10"
      />

      {/* Icon row, pinned just below the bridge deck. `top-[62%]` places them
          consistently across the modal panel and the contact page's card. */}
      <div className="absolute left-1/2 top-[70%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 px-4 sm:gap-2.5">
        {MODES.map((Ico, i) => (
          <span
            key={i}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-md sm:h-12 sm:w-12 sm:rounded-2xl lg:h-14 lg:w-14"
          >
            <Ico size={22} className="text-white sm:h-6 sm:w-6" />
          </span>
        ))}
      </div>

      <div className="absolute bottom-8 left-8 right-8 sm:bottom-10 sm:left-10 sm:right-10">
        <p className="max-w-md text-[20px] font-medium leading-snug text-white sm:text-[24px]">
          12–16 weeks from kickoff to operational launch, fixed fee, measured
          in your numbers.
        </p>
        <p className="mt-2 text-[13px] text-white/60">
          The supply chain intelligence layer for industrial enterprises
        </p>
      </div>
    </div>
  );
}
