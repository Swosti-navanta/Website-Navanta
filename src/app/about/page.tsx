import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { EnvelopeSimple, LinkedinLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "About — Navanta",
  description:
    "Navanta is the supply chain intelligence layer for industrial enterprises — built by operators, measured in outcomes.",
};

const STATS = [
  { value: "12–16", unit: "weeks", label: "From kickoff to operational launch — fixed fee" },
  { value: "80%", unit: "", label: "Solution-ready out of the box — only 20% tailored" },
  { value: "30+", unit: "", label: "Enterprise systems connected — SAP, Oracle, D365, Coupa" },
  { value: "50+", unit: "", label: "External supply-chain signals — demand, supplier, pricing" },
  { value: "US + India", unit: "", label: "Senior leadership with scaled engineering teams" },
];

const BELIEFS = [
  {
    title: "Outcomes, not output",
    body: "Fixed fee, fixed timeline, and fees tied to the value clients realize — measured in their numbers, not hours billed.",
  },
  {
    title: "Industrial DNA",
    body: "Purpose-built for industrial and automotive supply chains — real operating experience inside the world's largest manufacturers, not generic software.",
  },
  {
    title: "AI-led, human-in-command",
    body: "Agents do the heavy lifting across planning, procurement, and customer operations — while every decision stays confidence-graded, auditable, and yours.",
  },
];

const LEADERS = [
  {
    name: "Tanuj Gupta",
    role: "Co-Founder",
    email: "tanuj.gupta@navanta.ai",
    bio: "Formerly EY Executive Director with 10 years leading AI & digital supply chain transformation for industrial enterprises across North America.",
  },
  {
    name: "Gaurav Kohli",
    role: "Co-Founder",
    email: "gaurav.kohli@navanta.ai",
    bio: "Formerly EY Partner with 20 years architecting enterprise AI & supply chain programs for global manufacturers — ERP foundations to autonomous operations.",
  },
  {
    name: "Nitin Kumar",
    role: "Head of India Operations",
    email: "nitin.kumar@navanta.ai",
    bio: "Leads Navanta's scaled engineering and delivery teams, turning the intelligence layer into production outcomes for every engagement.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="About Navanta"
          title="Enabling intelligent enterprises"
          sub="We build the intelligence layer that lets the world's industrial enterprises run on decisions, not spreadsheets."
          video
        />

        {/* Mission statement */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
                <p className="text-[14px] font-medium text-[#5C3D97]">Our mission</p>
                <div className="max-w-3xl">
                  <h2 className="text-[28px] font-medium leading-snug tracking-tight text-zinc-900 sm:text-[36px]">
                    Industrial supply chains run the physical world — yet they still
                    run on fragmented systems, manual planning, and decisions made a
                    step too late. We exist to change that.
                  </h2>
                  <p className="mt-6 text-[15.5px] leading-relaxed text-zinc-500">
                    Navanta connects the systems enterprises already own — ERPs,
                    planning tools, supplier networks, external signals — into one
                    governed intelligence layer, then puts AI agents to work on
                    planning, procurement, and customer operations. Value lands in
                    weeks, is proven in the client&apos;s own numbers, and compounds
                    from there.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Stats band — dark */}
        <section className="bg-[#0c0b0a] py-20">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
              {STATS.map((s, i) => (
                <FadeIn key={s.label} delay={i * 0.06}>
                  <div>
                    <p className="text-[38px] font-medium leading-none tracking-tight text-white">
                      {s.value}
                      {s.unit && (
                        <span className="ml-1.5 text-[17px] text-white/50">{s.unit}</span>
                      )}
                    </p>
                    <p className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-white/50">
                      {s.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Beliefs */}
        <section className="bg-[#fafaf9] py-24">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <p className="text-[17px] font-medium text-[#5C3D97]">What we believe</p>
              <h2 className="mt-3 text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]">
                Built by operators, measured in outcomes
              </h2>
            </FadeIn>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {BELIEFS.map((b, i) => (
                <FadeIn key={b.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-zinc-200 bg-white p-7">
                    <h3 className="text-[19px] font-medium text-zinc-900">{b.title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-zinc-500">{b.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <p className="text-[17px] font-medium text-[#5C3D97]">The team</p>
              <h2 className="mt-3 text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]">
                Leadership
              </h2>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {LEADERS.map((l, i) => (
                <FadeIn key={l.name} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-zinc-200 bg-white p-6">
                    <div className="h-16 w-16 rounded-full bg-[radial-gradient(circle_at_30%_30%,#c9b8ec,#5C3D97)]" />
                    <p className="mt-5 text-[18px] font-medium text-zinc-900">{l.name}</p>
                    <p className="text-[14px] text-[#5C3D97]">{l.role}</p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-500">{l.bio}</p>
                    <div className="mt-5 flex items-center gap-3">
                      <a
                        href={`mailto:${l.email}`}
                        aria-label={`Email ${l.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-[#5C3D97] hover:text-[#5C3D97]"
                      >
                        <EnvelopeSimple size={16} />
                      </a>
                      <a
                        href="#"
                        aria-label={`${l.name} on LinkedIn`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-[#5C3D97] hover:text-[#5C3D97]"
                      >
                        <LinkedinLogo size={16} />
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-[#fafaf9] py-24">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <div className="relative overflow-hidden rounded-2xl bg-[#0c0b0a] px-8 py-16 text-center sm:px-16">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(110%_120%_at_50%_0%,#2a2119_0%,#0c0b0a_70%)]"
                />
                <div className="relative">
                  <h2 className="text-[30px] font-medium tracking-tight text-white sm:text-[40px]">
                    Build the intelligence layer with us
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-[15px] text-white/60">
                    Join the team — or see Navanta running on your own data within a week.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                      href="/careers"
                      className="flex items-center gap-1.5 rounded-lg bg-white px-5 py-3 text-[14px] font-medium text-black transition-colors hover:bg-white/90"
                    >
                      Open positions <ArrowRight size={14} weight="bold" />
                    </a>
                    <a
                      href="/contact#demo"
                      className="rounded-lg border border-white/30 px-5 py-3 text-[14px] font-medium text-white transition-colors hover:border-white/60 hover:bg-white/5"
                    >
                      Request a Demo
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
