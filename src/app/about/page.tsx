import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import AboutMissionHeading from "@/components/AboutMissionHeading";
import TeamGrid from "@/components/TeamGrid";

export const metadata: Metadata = {
  title: "About | Navanta",
  description:
    "Navanta is the supply chain intelligence layer for industrial enterprises, built by operators, measured in outcomes.",
};

const STATS = [
  { value: "12–16", unit: "weeks", label: "From kickoff to operational launch, fixed fee" },
  { value: "80%", unit: "", label: "Solution-ready out of the box, only 20% tailored" },
  { value: "30+", unit: "", label: "Enterprise systems connected, SAP, Oracle, D365, Coupa" },
  { value: "50+", unit: "", label: "External supply-chain signals, demand, supplier, pricing" },
  { value: "US + India", unit: "", label: "Senior leadership with scaled engineering teams" },
];

const PHOTOS = [
  { src: "/figma/challenges-photo.jpg", alt: "Industrial operations floor" },
  { src: "/hero/poster.jpg", alt: "Warehouse operations" },
  { src: "/figma/footer-railyard.jpg", alt: "Rail freight yard" },
];

const BELIEFS = [
  {
    title: "Outcomes, not output",
    body: "Fixed fee, fixed timeline, and fees tied to the value clients realize, measured in their numbers, not hours billed.",
  },
  {
    title: "Industrial DNA",
    body: "Purpose-built for industrial and automotive supply chains, real operating experience inside the world's largest manufacturers, not generic software.",
  },
  {
    title: "AI-led, human-in-command",
    body: "Agents do the heavy lifting across planning, procurement, and customer operations, while every decision stays confidence-graded, auditable, and yours.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero, light, typographic. The statement carries the section;
            stats follow with editorial top rules. */}
        <section className="pt-40 pb-6 sm:pt-48">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <p className="text-[14px] font-medium text-[#5C3D97]">About Navanta</p>
              <h1 className="mt-6 max-w-4xl text-[40px] font-medium leading-[1.08] tracking-tight text-zinc-900 sm:text-[58px]">
                We&apos;re building the intelligence layer industrial supply
                chains run on
              </h1>
            </FadeIn>

            {/* Stats, thin top rule above each, Harvey-style */}
            <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 sm:mt-24 lg:grid-cols-5">
              {STATS.map((s, i) => (
                <FadeIn key={s.label} delay={i * 0.06}>
                  <div className="border-t border-zinc-300 pt-5">
                    <p className="text-[34px] font-medium leading-none tracking-tight text-zinc-900 sm:text-[38px]">
                      {s.value}
                      {s.unit && (
                        <span className="ml-1.5 text-[16px] text-zinc-400">{s.unit}</span>
                      )}
                    </p>
                    <p className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-zinc-500">
                      {s.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Photo strip, near full-bleed, center image leads */}
        <section className="mt-16 px-3 sm:mt-20">
          <FadeIn>
            {/* Mobile: bento (2 top + 1 full-width bottom) */}
            <div className="grid gap-3 sm:hidden">
              <div className="grid h-[160px] grid-cols-2 gap-3">
                {PHOTOS.slice(0, 2).map((p) => (
                  <div key={p.src} className="overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.alt} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="h-[140px] overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PHOTOS[2].src} alt={PHOTOS[2].alt} className="h-full w-full object-cover" />
              </div>
            </div>
            {/* Desktop: original 3-column */}
            <div className="hidden h-[380px] grid-cols-[1fr_1.6fr_1fr] gap-3 sm:grid lg:h-[480px]">
              {PHOTOS.map((p) => (
                <div key={p.src} className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Mission, label left, word-fill statement right */}
        <section className="py-28 sm:py-32">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
                <p className="text-[14px] font-medium text-[#5C3D97]">Our mission</p>
                <div className="max-w-3xl">
                  <AboutMissionHeading />
                  <p className="mt-6 text-[15.5px] leading-relaxed text-zinc-500">
                    Navanta connects the systems enterprises already own, ERPs,
                    planning tools, supplier networks, external signals, into one
                    governed intelligence layer, then put AI Agents to work on
                    planning, procurement, and customer operations. Value lands in
                    weeks, is proven in the client&apos;s own numbers, and compounds
                    from there.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Beliefs, same editorial grid, flat tiles */}
        {/* Leadership, same editorial grid */}
        <section data-nav-theme="dark" className="bg-[#0c0b0a] py-28">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <div>
                <h2 className="font-medium tracking-tight text-white">
                  The people who set the tempo.
                </h2>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-white/55">
                  A lifetime on the problem, and the passion hasn&apos;t faded. The leadership team at Navanta goes back more than a decade together, across multiple ventures and some of the hardest problems in supply chain. With over 20 years working alongside the world&apos;s largest global supply chains, the proof is in the work. And they&apos;re not done yet.
                </p>
              </div>
            </FadeIn>
            <TeamGrid />
          </div>
        </section>

        <section className="bg-[#fafaf9] py-28">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
                <p className="text-[14px] font-medium text-[#5C3D97]">What we believe</p>
                <h2 className="max-w-2xl font-medium tracking-tight text-zinc-900">
                  Built by operators, measured in outcomes
                </h2>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {BELIEFS.map((b, i) => (
                <FadeIn key={b.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl bg-[#F6F6F6] p-8">
                    <h3 className="text-[19px] font-medium text-zinc-900">{b.title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-zinc-500">{b.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
