"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserCircleGear, Truck, Wrench, type Icon } from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

type Card = { title: string; body: string };
type Tab = { key: string; label: string; icon: Icon; cards: Card[] };

const TABS: Tab[] = [
  {
    key: "cx",
    label: "Customer Experience",
    icon: UserCircleGear,
    cards: [
      {
        title: "Disconnected experiences",
        body: "Customers and field reps stitch together order status across phone, email, and portals. With no shared view, every channel tells a different story — eroding trust and stalling growth.",
      },
      {
        title: "No real-time order visibility",
        body: "Orders and fulfillment move without a live view, so delays and stockouts surface only when a customer calls to complain — too late to protect the job or the relationship.",
      },
      {
        title: "High call volumes",
        body: "Routine “where's my order” questions flood service teams with no single source of truth — driving long wait times, with reps buried in lookups instead of selling.",
      },
    ],
  },
  {
    key: "supply",
    label: "Supply Fragility",
    icon: Truck,
    cards: [
      {
        title: "Fragmented data hides risk",
        body: "Spend, supplier, inventory, and market data sit in separate ERPs and cubes with mismatched taxonomy. Risk stays hidden in the gaps until it surfaces as a disruption.",
      },
      {
        title: "Reactive vendor management",
        body: "Suppliers are managed after the fact — no continuous view of risk or performance, and planning disconnected from buying, so problems are caught only once they hit.",
      },
      {
        title: "Reacting vs anticipating",
        body: "Teams respond to demand and supply shocks instead of sensing them early, driving expedite premiums, missed leverage, and value leakage across sites and business units.",
      },
    ],
  },
  {
    key: "inventory",
    label: "Inventory Imbalance",
    icon: Wrench,
    cards: [
      {
        title: "Manual adjustment to every SKU",
        body: "Planning happens SKU-by-SKU and site-by-site, by hand. Without consolidated buying, stock piles up in one location while another runs dry.",
      },
      {
        title: "Stockouts cut service & revenue",
        body: "When demand outpaces a manual plan, shelves go empty — service levels drop, orders go unfilled, and the revenue walks straight to a competitor.",
      },
      {
        title: "Excess stock locks up capital",
        body: "Hedging against stockouts swings the other way: surplus safety stock ties up working capital and warehouse space, quietly eroding margin.",
      },
    ],
  },
];

/* Card media — Figma photo asset */
function CardMedia() {
  return (
    <div className="h-[150px] w-full overflow-hidden rounded-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/challenges-photo.jpg"
        alt=""
        aria-hidden
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function Challenges() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="challenges" className="bg-white py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <h2 className="text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]">
            The Challenges
          </h2>
          <div className="mt-6 h-px w-full max-w-[1180px] bg-zinc-900/60" />
        </FadeIn>

        <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,420px)_1fr]">
          {/* Tab rail */}
          <div className="flex flex-col">
            {TABS.map((t, i) => (
              <button
                key={t.key}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 border-b border-zinc-300 py-5 text-left text-[22px] transition-colors sm:text-[26px] ${
                  i === active ? "text-[#5C3D97]" : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <t.icon size={26} weight="regular" />
                {t.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-6 md:grid-cols-3"
              >
                {tab.cards.map((c, i) => (
                  <div
                    key={c.title}
                    className={`rounded-2xl bg-zinc-100 p-5 ${i === 0 ? "md:-mt-4" : "md:mt-4"}`}
                  >
                    <h3 className="text-[17px] font-medium text-zinc-900">{c.title}</h3>
                    <div className="mt-4">
                      <CardMedia />
                    </div>
                    <p className="mt-4 text-[13.5px] leading-relaxed text-zinc-500">{c.body}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Progress lines */}
            <div className="mt-12 flex gap-6">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  aria-label={t.label}
                  onClick={() => setActive(i)}
                  className={`h-[2px] w-40 transition-colors ${
                    i === active ? "bg-zinc-900" : "bg-zinc-300 hover:bg-zinc-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
