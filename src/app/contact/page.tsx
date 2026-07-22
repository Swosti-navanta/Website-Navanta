import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DemoForm from "@/components/DemoForm";
import FadeIn from "@/components/FadeIn";
import { MapPin, EnvelopeSimple, Phone, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Contact — Navanta",
  description: "Get in touch with the Navanta team, or request a demo on your own data.",
};

const DETAILS = [
  { icon: MapPin, label: "Address", value: "8 The Green #8618, Dover, DE 19901" },
  { icon: EnvelopeSimple, label: "Email", value: "admin@navanta.ai", href: "mailto:admin@navanta.ai" },
  { icon: Phone, label: "Phone", value: "+1 (___) ___-____" },
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

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Contact"
          title="Let's talk"
          sub="Share your challenges — within a week we'll show a live demo built on your industry data."
        />

        {/* Split: form left · brand image right */}
        <section id="demo" className="bg-white py-20">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <FadeIn className="flex flex-col justify-center py-4">
                <h2 className="text-[32px] font-medium tracking-tight text-zinc-900 sm:text-[40px]">
                  Request a Demo
                </h2>
                <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-zinc-500">
                  See Navanta on your data within a week — planning, procurement, and
                  order flows running on your own systems.
                </p>
                <div className="mt-8 max-w-lg">
                  <DemoForm />
                </div>
              </FadeIn>

              <FadeIn delay={0.08}>
                <div className="relative h-[420px] overflow-hidden rounded-2xl lg:h-full lg:min-h-[640px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/figma/footer-railyard.jpg"
                    alt="Industrial rail yard"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/navanta-logo.svg"
                    alt="Navanta"
                    className="absolute left-6 top-6 h-8 w-auto"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[20px] font-medium leading-snug text-white sm:text-[24px]">
                      12–16 weeks from kickoff to operational launch — fixed fee,
                      measured in your numbers.
                    </p>
                    <p className="mt-2 text-[13px] text-white/60">
                      The supply chain intelligence layer for industrial enterprises
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Details band + map strip */}
        <section className="bg-[#fafaf9] py-20">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <div className="grid gap-8 md:grid-cols-3">
                {DETAILS.map((d) => (
                  <div key={d.label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#efeaf9]">
                      <d.icon size={19} className="text-[#5C3D97]" />
                    </span>
                    <div>
                      <p className="text-[13px] font-medium uppercase tracking-wide text-zinc-400">
                        {d.label}
                      </p>
                      {d.href ? (
                        <a href={d.href} className="text-[16px] text-zinc-900 hover:text-[#5C3D97]">
                          {d.value}
                        </a>
                      ) : (
                        <p className="text-[16px] text-zinc-900">{d.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Map strip — swap for embed / static map asset */}
            <FadeIn delay={0.08} className="mt-10">
              <div className="relative h-[220px] overflow-hidden rounded-2xl bg-[#eceae4] [background-image:radial-gradient(#cfccc3_1px,transparent_1px)] [background-size:18px_18px]">
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <MapPin size={34} weight="fill" className="text-[#5C3D97]" />
                  <span className="mt-1 rounded-md bg-white px-2.5 py-1 text-[12px] text-zinc-700 shadow">
                    Dover, DE
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Leadership */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <FadeIn>
              <h2 className="text-[28px] font-medium tracking-tight text-zinc-900 sm:text-[36px]">
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
      </main>
      <Footer />
    </>
  );
}
