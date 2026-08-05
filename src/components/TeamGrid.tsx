"use client";

import FadeIn from "./FadeIn";

type Member = {
  name: string;
  role: string;
  img?: string;
  imgPos?: string;
};

/* Broader team grid — 4 across, 2 rows. Fill in each member's name, role, and
   photo as they come in. Cards with no `img` show an initials placeholder. */
const TEAM: Member[] = [
  { name: "Tanuj Gupta", role: "Co-Founder", img: "/team/tanuj.jpg" },
  { name: "Gaurav Kohli", role: "Co-Founder", img: "/team/gaurav.jpg" },
  { name: "Nitin Kumar", role: "Head of India Operations", img: "/team/nitin.jpg" },
  { name: "Team Member", role: "Role" },
  { name: "Team Member", role: "Role" },
  { name: "Team Member", role: "Role" },
  { name: "Team Member", role: "Role" },
  { name: "Team Member", role: "Role" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TeamGrid() {
  return (
    <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {TEAM.map((m, i) => (
        <FadeIn key={i} delay={(i % 4) * 0.06}>
          <div className="group">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#181818]">
              {m.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.img}
                  alt={`${m.name}, ${m.role}`}
                  style={{ objectPosition: m.imgPos ?? "center" }}
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[34px] font-medium text-white/15">
                  {initials(m.name)}
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-[18px] font-medium text-white">{m.name}</p>
              <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.12em] text-white/40">
                {m.role}
              </p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
