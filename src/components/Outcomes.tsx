"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PhoneSlash,
  ShieldCheck,
  TrendUp,
  Robot,
  SealCheck,
  WarningCircle,
  PiggyBank,
  Timer,
  MapPinLine,
  ChartLineUp,
  Target,
  ArrowsClockwise,
  type Icon,
} from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

type Card = { metric: string; sub: string; body: string; icon: Icon; media?: string };

const TABS: { key: string; label: string; cards: Card[] }[] = [
  {
    key: "customer",
    label: "Customer Engagement",
    cards: [
      {
        metric: "Fewer inbound status calls",
        sub: "customers self-serve live",
        body: "Live order visibility with exception-driven updates — no phone calls needed.",
        icon: PhoneSlash,
        media: "/outcomes/customer-status.png",
      },
      {
        metric: "Faster claims resolution",
        sub: "auto part + warranty match",
        body: "Part identified, warranty verified, purchase matched — claims resolved in minutes.",
        icon: ShieldCheck,
        media: "/outcomes/customer-claims.png",
      },
      {
        metric: "Higher repeat revenue",
        sub: "engagement into lifetime",
        body: "Engagement signals become repeat purchases and higher lifetime value.",
        icon: TrendUp,
        media: "/outcomes/customer-revenue.png",
      },
      {
        metric: "Routine work, automated",
        sub: "one surface, every service desk",
        body: "One command surface automating routine service work across every desk.",
        icon: Robot,
        media: "/outcomes/customer-automation.png",
      },
    ],
  },
  {
    key: "procurement",
    label: "Procurement Optimization",
    cards: [
      {
        metric: "Confidence-graded POs",
        sub: "demand sensed, buying automated",
        body: "Demand-sensed, cost-optimized POs — the planner approves, the system executes.",
        icon: SealCheck,
        media: "/outcomes/procurement-pos.png",
      },
      {
        metric: "Risk flagged early",
        sub: "continuous supplier scoring",
        body: "Continuous supplier scoring, with alternates suggested before disruption lands.",
        icon: WarningCircle,
        media: "/outcomes/procurement-risk.png",
      },
      {
        metric: "Savings you can defend",
        sub: "normalized spend, every category",
        body: "Normalized spend across every category — validated, evidence-backed savings.",
        icon: PiggyBank,
        media: "/outcomes/procurement-savings.png",
      },
      {
        metric: "Fewer expedites",
        sub: "early risk flags at PO level",
        body: "Early risk flags routed to the right play before expedite premiums hit.",
        icon: Timer,
        media: "/outcomes/procurement-expedites.png",
      },
    ],
  },
  {
    key: "inventory",
    label: "Inventory Optimization",
    cards: [
      {
        metric: "One view, every location",
        sub: "demand, supply, inventory, POs",
        body: "Real-time inventory, demand, and PO insight across every location.",
        icon: MapPinLine,
      },
      {
        metric: "Higher fill rates",
        sub: "plans self-tune to signals",
        body: "Plans self-tune to demand shifts — right product, right place, right now.",
        icon: ChartLineUp,
      },
      {
        metric: "Decisions in days",
        sub: "confidence-graded actions",
        body: "Confidence-graded stocking recommendations — the planner stays in the loop.",
        icon: Target,
      },
      {
        metric: "Higher turns, lower cost",
        sub: "rebalance + reorder, automated",
        body: "Automatic rebalancing and replenishment — higher turns, less tied-up capital.",
        icon: ArrowsClockwise,
      },
    ],
  },
];

/* Card media — per-card Figma mockup image. No background of its own: it sits
   directly on the card so the mockup reads as part of the surface. */
function CardMedia({ src }: { src?: string }) {
  return (
    <div className="relative flex w-full items-center justify-center">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" aria-hidden className="w-full" />
      ) : (
        <div className="flex aspect-[1203/700] w-full items-center justify-center">
          <span className="text-[12px] text-zinc-400">Mockup coming soon</span>
        </div>
      )}
    </div>
  );
}

export default function Outcomes() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="outcomes" className="bg-white py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <h2 className="mt-3 text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]">
            Driving Outcomes
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            Three pillars turning intelligence into measurable business value.
          </p>
          {/* Tab pills — above the cards */}
          <div className="mt-8 flex">
            <div className="flex flex-wrap items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 shadow-sm">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setActive(i)}
                  className={`rounded-full px-5 py-2.5 text-[14px] transition-colors ${
                    i === active
                      ? "bg-zinc-900 font-medium text-white"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.key}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {tab.cards.map((c) => (
              <div key={c.metric} className="overflow-hidden rounded-2xl bg-[#F6F6F6] p-5 pb-0">
                <div className="flex items-start gap-3.5 pb-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#EBE8F3]">
                    <c.icon size={20} className="text-[#5C3D97]" />
                  </span>
                  <div>
                    <p className="whitespace-nowrap text-[15px] font-medium leading-snug text-zinc-900">
                      {c.metric}
                    </p>
                    <p className="whitespace-nowrap text-[13px] text-zinc-400">{c.sub}</p>
                  </div>
                </div>
                <CardMedia src={c.media} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
