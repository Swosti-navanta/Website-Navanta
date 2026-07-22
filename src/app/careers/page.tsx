import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, MapPin } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Careers — Navanta",
  description: "Join the team building the supply chain intelligence layer for industrial enterprises.",
};

const VALUES = [
  { title: "Outcomes, not output", body: "We measure ourselves by the value clients realize — not hours logged." },
  { title: "Industrial DNA", body: "We build for the real complexity of industrial and automotive supply chains." },
  { title: "AI-led, human-in-the-loop", body: "Agents do the heavy lifting; people stay in command of every decision." },
];

const ROLES = [
  { title: "Senior AI Engineer — Supply Chain", team: "Engineering", location: "US · Remote" },
  { title: "Forward-Deployed Solutions Lead", team: "Delivery", location: "US · Hybrid" },
  { title: "Data Engineer — Enterprise Integrations", team: "Engineering", location: "India · Hybrid" },
  { title: "Product Designer", team: "Product", location: "Remote" },
  { title: "Supply Chain Domain Expert", team: "Delivery", location: "US · Remote" },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Careers"
          title="Build the intelligence layer for industry"
          sub="Senior leaders working alongside scaled engineering teams across the US and India."
        />

        {/* Values */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
            <div className="grid gap-6 md:grid-cols-3">
              {VALUES.map((v, i) => (
                <FadeIn key={v.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-zinc-200 bg-zinc-50 p-7">
                    <h3 className="text-[18px] font-medium text-zinc-900">{v.title}</h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-zinc-500">{v.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Open roles */}
        <section className="bg-[#fafaf9] py-24">
          <div className="mx-auto max-w-[900px] px-6 lg:px-10">
            <FadeIn>
              <h2 className="text-[28px] font-medium tracking-tight text-zinc-900 sm:text-[36px]">
                Open roles
              </h2>
            </FadeIn>
            <div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200">
              {ROLES.map((r, i) => (
                <FadeIn key={r.title} delay={Math.min(i * 0.05, 0.2)}>
                  <a
                    href="mailto:admin@navanta.ai?subject=Application"
                    className="group flex items-center justify-between gap-4 py-6 transition-colors hover:bg-white"
                  >
                    <div>
                      <p className="text-[18px] font-medium text-zinc-900">{r.title}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[13px] text-zinc-500">
                        <span className="rounded-full bg-[#efeaf9] px-2.5 py-0.5 text-[#5C3D97]">
                          {r.team}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={13} /> {r.location}
                        </span>
                      </div>
                    </div>
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-all group-hover:border-[#5C3D97] group-hover:bg-[#5C3D97] group-hover:text-white">
                      <ArrowRight size={16} />
                    </span>
                  </a>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.1}>
              <p className="mt-10 text-[14px] text-zinc-500">
                Don&apos;t see your role? Email{" "}
                <a href="mailto:admin@navanta.ai" className="text-[#5C3D97] hover:underline">
                  admin@navanta.ai
                </a>{" "}
                — we&apos;re always looking for exceptional people.
              </p>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
