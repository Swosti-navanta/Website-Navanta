import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import CareersPositions from "@/components/CareersPositions";

export const metadata: Metadata = {
  title: "Careers — Navanta",
  description:
    "Join the team building the supply chain intelligence layer for industrial enterprises.",
};

const BENEFITS = [
  "Competitive salary with meaningful upside",
  "Work directly with Fortune-100-scale industrial clients",
  "Senior US leadership working alongside scaled India engineering",
  "Outcome-driven culture — we win when clients win",
  "Health coverage for you and your family",
  "Real ownership, fast growth, zero bureaucracy",
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Centered hero — dark band */}
        <header className="relative overflow-hidden bg-[#0c0b0a] pb-24 pt-44 text-center">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#2a2119_0%,#161210_55%,#0c0b0a_100%)]"
          />
          <div className="relative mx-auto max-w-2xl px-6">
            <h1 className="text-[48px] font-medium tracking-tight text-white sm:text-[64px]">
              Join us
            </h1>
            <p className="mt-4 text-[17px] text-white/60">
              Shape how the world&apos;s industrial enterprises run — with AI.
            </p>
            <a
              href="#open-positions"
              className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-[14.5px] font-medium text-black transition-colors hover:bg-white/90"
            >
              Open positions
            </a>
          </div>
        </header>

        {/* Photo strip — swap tiles for real team photos later */}
        <section className="bg-white pt-16">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="h-[260px] overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/figma/challenges-photo.jpg"
                    alt="Navanta team at work"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex h-[260px] items-center justify-center rounded-2xl bg-[radial-gradient(120%_120%_at_30%_20%,#7a5cb5_0%,#5C3D97_55%,#3d2766_100%)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/navanta-logo.svg" alt="Navanta" className="h-12 w-auto" />
                </div>
                <div className="h-[260px] overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/figma/footer-railyard.jpg"
                    alt="Industrial operations"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* About */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
                <p className="text-[14px] font-medium text-[#5C3D97]">About Navanta</p>
                <div className="max-w-2xl">
                  <h2 className="text-[26px] font-medium leading-snug tracking-tight text-zinc-900 sm:text-[32px]">
                    For industrial enterprises facing relentless supply-chain
                    complexity, Navanta is the intelligence layer that turns
                    fragmented signals into decisions.
                  </h2>
                  <p className="mt-5 text-[15px] leading-relaxed text-zinc-500">
                    We connect ERPs, planning tools, supplier networks, and external
                    signals into one governed model, then put AI agents to work on
                    planning, procurement, and customer operations — with people
                    always in command. Our team spans senior US leadership and scaled
                    engineering in India, and our fees are tied to the outcomes we
                    deliver.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-[#fafaf9] py-24">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <div className="h-[320px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/figma/footer-railyard.jpg"
                    alt=""
                    aria-hidden
                    className="h-full w-full object-cover object-[50%_35%]"
                  />
                </div>
                <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[280px_1fr]">
                  <h2 className="text-[24px] font-medium text-zinc-900">Benefits</h2>
                  <ul className="max-w-xl space-y-3">
                    {BENEFITS.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[14.5px] text-zinc-600">
                        <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#5C3D97]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Open positions */}
        <section id="open-positions" className="bg-white py-24">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
            <FadeIn>
              <h2 className="text-center text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]">
                Open positions
              </h2>
            </FadeIn>
            <FadeIn delay={0.08} className="mt-12">
              <CareersPositions />
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
