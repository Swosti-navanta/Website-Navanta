import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Privacy Policy — Navanta",
  description: "How Navanta collects, uses, and protects your data.",
};

const SECTIONS = [
  {
    heading: "Data we collect",
    body: "We collect information you provide directly — such as your name, work email, company, and any details you share when requesting a demo or contacting us. We also collect limited technical data (device, browser, and usage analytics) to operate and improve this website.",
  },
  {
    heading: "How we use data",
    body: "We use your information to respond to inquiries, schedule and deliver demos, provide and improve our services, and communicate relevant updates. For client engagements, operational data is processed solely to deliver the contracted outcomes and is governed by the engagement agreement.",
  },
  {
    heading: "Cookies & tracking",
    body: "We use essential cookies to run the site and, where permitted, analytics cookies to understand usage. You can control non-essential cookies through your browser settings or our consent controls.",
  },
  {
    heading: "Data sharing",
    body: "We do not sell your personal information. We share data only with service providers who help us operate the business under confidentiality obligations, or where required by law.",
  },
  {
    heading: "Data security",
    body: "We apply administrative, technical, and physical safeguards appropriate to the sensitivity of the data. Access to client operational data is restricted, audited, and traceable end to end.",
  },
  {
    heading: "Your rights",
    body: "Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal data. To exercise these rights, contact us using the details below.",
  },
  {
    heading: "Contact for privacy requests",
    body: "For any privacy-related questions or requests, email admin@navanta.ai or write to Navanta Labs LLC, 8 The Green #8618, Dover, DE 19901.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader eyebrow="Legal" title="Privacy Policy" sub="Last updated — July 2026" />

        <section className="bg-white py-24">
          <div className="mx-auto max-w-[820px] px-6 lg:px-10">
            <FadeIn>
              <p className="text-[16px] leading-relaxed text-zinc-600">
                This Privacy Policy explains how Navanta Labs LLC (&quot;Navanta&quot;) collects,
                uses, and protects information in connection with this website and our services.
              </p>
            </FadeIn>

            <div className="mt-14 space-y-12">
              {SECTIONS.map((s, i) => (
                <FadeIn key={s.heading} delay={Math.min(i * 0.04, 0.2)}>
                  <div>
                    <h2 className="text-[20px] font-medium text-zinc-900">{s.heading}</h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">{s.body}</p>
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
