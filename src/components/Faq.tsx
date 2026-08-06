"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, ArrowRight } from "@phosphor-icons/react";
import FadeIn from "./FadeIn";
import { OpenDemoButton } from "./DemoModal";

type Faq = { q: string; a: string; cta?: boolean };

const FAQS: Faq[] = [
  {
    q: "Can I see a live demo on my own data?",
    a: "Yes. Book a call and within a week we'll show Navanta running on your industry's data, planning, procurement, and order flows using your own systems, not a generic sandbox.",
    cta: true,
  },
  {
    q: "How long does implementation take?",
    a: "Most engagements go live in 12–16 weeks on a fixed fee and fixed timeline. Around 80% of the solution is ready out of the box; only the remaining ~20% is tailored to your processes.",
  },
  {
    q: "Which systems does Navanta connect to?",
    a: "We connect 30+ enterprise systems, SAP, Oracle, Dynamics 365, Coupa, Anaplan, Kinaxis and more, plus 50+ external supply-chain signals. No rip-and-replace: Navanta is an intelligence layer over what you already run.",
  },
  {
    q: "Do we stay in control of decisions?",
    a: "Always. Every agent action is graded by confidence, routed for approval where it matters, logged, and fully auditable. You set the rules, thresholds, and guardrails, people stay in command.",
  },
  {
    q: "How is Navanta priced?",
    a: "Outcome-based. A meaningful share of our fees is tied to the value we deliver, measured in your numbers, not hours billed.",
  },
  {
    q: "What makes Navanta different?",
    a: "A proprietary AI core, productized data preparation, and outcome-anchored delivery, built by a team with deep operating experience inside the world's largest industrial and automotive manufacturers.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <section id="faq" className="bg-[#fafaf9] py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <h2 className="font-medium tracking-tight text-zinc-900">
            FAQs
          </h2>
          <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            Everything you need to know about working with Navanta.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open.includes(i);
            return (
              <div key={f.q} className="overflow-hidden rounded-2xl bg-white">
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                >
                  <span className="flex-shrink-0 text-zinc-500">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                  <span className="text-[16px] font-medium text-zinc-900">{f.q}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 pl-16">
                        <p className="text-[14.5px] leading-relaxed text-zinc-500">
                          {f.a}
                        </p>
                        {f.cta && (
                          <OpenDemoButton className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-5 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-zinc-800">
                            Request a Demo
                            <ArrowRight size={14} weight="bold" />
                          </OpenDemoButton>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </FadeIn>
      </div>
    </section>
  );
}
