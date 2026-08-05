"use client";

import FadeIn from "./FadeIn";
import { EnvelopeSimple, LinkedinLogo } from "@phosphor-icons/react";

const LEADERS = [
  {
    name: "Tanuj Gupta",
    role: "Co-Founder",
    email: "tanuj.gupta@navanta.ai",
    img: "/team/tanuj.jpg",
    imgPos: "center",
    bio: "Formerly EY Executive Director with 10 years leading AI & digital supply chain transformation for industrial enterprises across North America.",
  },
  {
    name: "Gaurav Kohli",
    role: "Co-Founder",
    email: "gaurav.kohli@navanta.ai",
    img: "/team/gaurav.jpg",
    imgPos: "center",
    bio: "Formerly EY Partner with 20 years architecting enterprise AI & supply chain programs for global manufacturers, ERP foundations to autonomous operations.",
  },
  {
    name: "Nitin Kumar",
    role: "Head of India Operations",
    email: "nitin.kumar@navanta.ai",
    img: "/team/nitin.jpg",
    imgPos: "center",
    bio: "Leads Navanta's scaled engineering and delivery teams, turning the intelligence layer into production outcomes for every engagement.",
  },
];

export default function LeadershipCards() {
  return (
    <div className="mt-14 grid gap-8 md:grid-cols-3">
      {LEADERS.map((l, i) => (
        <FadeIn key={l.name} delay={i * 0.08}>
          <div className="group">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#181818]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={l.img}
                alt={`${l.name}, ${l.role}`}
                style={{ objectPosition: l.imgPos }}
                className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
              />
            </div>
            <div className="mt-5">
              <p className="text-[19px] font-medium text-white">{l.name}</p>
              <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.12em] text-white/40">
                {l.role}
              </p>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pt-3 text-[13px] leading-relaxed text-white/55 opacity-0 transition-opacity delay-75 duration-500 group-hover:opacity-100">
                    {l.bio}
                  </p>
                  <div className="mt-4 flex items-center gap-2.5 pb-0.5 opacity-0 transition-opacity delay-150 duration-500 group-hover:opacity-100">
                    <a
                      href={`mailto:${l.email}`}
                      aria-label={`Email ${l.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white/60 transition-colors hover:border-white/50 hover:text-white"
                    >
                      <EnvelopeSimple size={16} />
                    </a>
                    <a
                      href="#"
                      aria-label={`${l.name} on LinkedIn`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white/60 transition-colors hover:border-white/50 hover:text-white"
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
