"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserCircleGear, Truck, Wrench, type Icon } from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

type Card = { id: string; title: string; body: string };
type Tab = { key: string; label: string; icon: Icon; cards: Card[] };

const TABS: Tab[] = [
  {
    key: "cx",
    label: "Customer Experience",
    icon: UserCircleGear,
    cards: [
      {
        id: "cx-1",
        title: "Disconnected experiences",
        body: "Customers and field reps stitch together order status across phone, email, and portals. With no shared view, every channel tells a different story — eroding trust and stalling growth.",
      },
      {
        id: "cx-2",
        title: "No real-time order visibility",
        body: "Orders and fulfillment move without a live view, so delays and stockouts surface only when a customer calls to complain — too late to protect the job or the relationship.",
      },
      {
        id: "cx-3",
        title: "High Call Volumes",
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
        id: "sf-1",
        title: "Fragmented data hides risk",
        body: "Spend, supplier, inventory, and market data sit in separate ERPs and cubes with mismatched taxonomy. Risk stays hidden in the gaps until it surfaces as a disruption.",
      },
      {
        id: "sf-2",
        title: "Reactive vendor management",
        body: "Suppliers are managed after the fact — no continuous view of risk or performance, and planning disconnected from buying, so problems are caught only once they hit.",
      },
      {
        id: "sf-3",
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
        id: "inv-1",
        title: "Manual adjustment to every SKU",
        body: "Planning happens SKU-by-SKU and site-by-site, by hand. Without consolidated buying, stock piles up in one location while another runs dry.",
      },
      {
        id: "inv-2",
        title: "Stockouts cut service & revenue",
        body: "When demand outpaces a manual plan, shelves go empty — service levels drop, orders go unfilled, and the revenue walks straight to a competitor.",
      },
      {
        id: "inv-3",
        title: "Excess stock locks up capital",
        body: "Hedging against stockouts swings the other way: surplus safety stock ties up working capital and warehouse space, quietly eroding margin.",
      },
    ],
  },
];

const DURATION = 5000; // ms per tab before auto-advance

export default function Challenges() {
  const [tabIdx, setTabIdx] = useState(0);
  const tab = TABS[tabIdx];

  // Auto-advance through the tab column
  useEffect(() => {
    const t = setTimeout(() => setTabIdx((i) => (i + 1) % TABS.length), DURATION);
    return () => clearTimeout(t);
  }, [tabIdx]);

  return (
    <section id="challenges" className="overflow-hidden bg-white py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <h2 className="text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]">
            The Challenges
          </h2>
          <div className="mt-6 h-px w-full max-w-[1180px] bg-zinc-900/60" />
        </FadeIn>

        <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,400px)_1fr]">
          {/* Tab rail — auto-advancing, click to jump (static strokes) */}
          <div className="flex h-fit flex-col">
            {TABS.map((t, i) => (
              <button
                key={t.key}
                onClick={() => setTabIdx(i)}
                className={`relative flex items-center gap-3 border-b border-zinc-300 py-5 text-left text-[22px] transition-colors sm:text-[26px] ${
                  i === tabIdx ? "text-[#5C3D97]" : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <t.icon size={26} weight="regular" />
                {t.label}
                {/* Timer stroke: black line fills along the border, then advances */}
                {i === tabIdx && (
                  <motion.span
                    key={tabIdx}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                    className="absolute -bottom-px left-0 h-px bg-zinc-900"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Cards — 3 up, zigzag offset, cross-fade on tab change */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.key}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.14 } },
                }}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -12, transition: { duration: 0.22 } }}
                className="grid gap-6 md:grid-cols-3"
              >
                {tab.cards.map((c) => {
                  return (
                    <motion.div
                      key={c.id}
                      variants={{
                        hidden: { opacity: 0, y: 26 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex h-full flex-col rounded-2xl bg-zinc-100 p-5"
                    >
                      <h3 className="text-[17px] font-medium text-zinc-900">{c.title}</h3>
                      {/* Media — official Navanta icon infographic (panel baked in) */}
                      <div className="mt-4 h-[170px] overflow-hidden rounded-xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/figma/icons/${c.id}.png`}
                          alt=""
                          aria-hidden
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="mt-4 text-[13.5px] leading-relaxed text-zinc-500">{c.body}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
