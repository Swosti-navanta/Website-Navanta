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
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25"
      />

      <div className="relative flex h-full flex-col p-8 sm:p-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/navanta-logo.svg" alt="Navanta" className="h-8 w-auto" />

        <div className="flex flex-1 items-center justify-center py-8">
          <div className="flex flex-wrap justify-center gap-2.5">
            {MODES.map((Ico, i) => (
              <span
                key={i}
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md"
              >
                <Ico size={24} className="text-white" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="max-w-md text-[20px] font-medium leading-snug text-white sm:text-[24px]">
            12–16 weeks from kickoff to operational launch, fixed fee, measured
            in your numbers.
          </p>
          <p className="mt-2 text-[13px] text-white/60">
            The supply chain intelligence layer for industrial enterprises
          </p>
        </div>
      </div>
    </div>
  );
}
