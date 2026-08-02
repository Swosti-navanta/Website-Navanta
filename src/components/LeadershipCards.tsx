"use client";

import FadeIn from "./FadeIn";
import { EnvelopeSimple, LinkedinLogo } from "@phosphor-icons/react";

/* Portrait-first leadership cards. At rest: monochrome portrait with the
   name/role sitting on a soft bottom scrim. On hover: the portrait warms
   into full color and eases into a slow zoom, the scrim deepens, and the
   bio + contact links unfold beneath the name (animated grid-rows so the
   height glides, not snaps). */

const LEADERS = [
  {
    name: "Tanuj Gupta",
    role: "Co-Founder",
    email: "tanuj.gupta@navanta.ai",
    img: "/team/portrait-1.jpg",
    bio: "Formerly EY Executive Director with 10 years leading AI & digital supply chain transformation for industrial enterprises across North America.",
  },
  {
    name: "Gaurav Kohli",
    role: "Co-Founder",
    email: "gaurav.kohli@navanta.ai",
    img: "/team/portrait-2.jpg",
    bio: "Formerly EY Partner with 20 years architecting enterprise AI & supply chain programs for global manufacturers — ERP foundations to autonomous operations.",
  },
  {
    name: "Nitin Kumar",
    role: "Head of India Operations",
    email: "nitin.kumar@navanta.ai",
    img: "/team/portrait-3.jpg",
    bio: "Leads Navanta's scaled engineering and delivery teams, turning the intelligence layer into production outcomes for every engagement.",
  },
];

export default function LeadershipCards() {
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {LEADERS.map((l, i) => (
        <FadeIn key={l.name} delay={i * 0.08}>
          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F6F6F6]">
            {/* Portrait — monochrome at rest, warms to full color on hover */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={l.img}
              alt={`${l.name} — ${l.role}`}
              className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] group-hover:grayscale-0"
            />

            {/* Resting scrim for name legibility; deepens across the card on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Details — name/role pinned; bio + links unfold on hover */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <p className="text-[19px] font-medium text-white">{l.name}</p>
              <p className="mt-0.5 text-[13.5px] text-[#c9b8ec]">{l.role}</p>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pt-3.5 text-[13px] leading-relaxed text-white/80 opacity-0 transition-opacity delay-75 duration-500 group-hover:opacity-100">
                    {l.bio}
                  </p>
                  <div className="mt-5 flex items-center gap-2.5 pb-0.5 opacity-0 transition-opacity delay-150 duration-500 group-hover:opacity-100">
                    <a
                      href={`mailto:${l.email}`}
                      aria-label={`Email ${l.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/30 text-white transition-colors hover:border-white/70 hover:bg-white/10"
                    >
                      <EnvelopeSimple size={16} />
                    </a>
                    <a
                      href="#"
                      aria-label={`${l.name} on LinkedIn`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/30 text-white transition-colors hover:border-white/70 hover:bg-white/10"
                    >
                      <LinkedinLogo size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
