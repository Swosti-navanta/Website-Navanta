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
        body: "Status lives across phone, email, and portals — every channel tells a different story.",
      },
      {
        id: "cx-2",
        title: "No real-time order visibility",
        body: "No live view of orders — you hear about delays when the customer does.",
      },
      {
        id: "cx-3",
        title: "High Call Volumes",
        body: "Routine “where's my order” calls bury service teams with no single source of truth.",
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
        body: "Spend and supplier data sit in disconnected systems — risk hides until it hits.",
      },
      {
        id: "sf-2",
        title: "Reactive vendor management",
        body: "Vendors managed after the fact, with no continuous view of risk or performance.",
      },
      {
        id: "sf-3",
        title: "Reacting vs anticipating",
        body: "Reacting to shocks instead of sensing them — expedite premiums and value leakage.",
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
        body: "Planning by hand, SKU by SKU — stock piles up here while it runs dry there.",
      },
      {
        id: "inv-2",
        title: "Stockouts cut service & revenue",
        body: "Empty shelves drop service levels and hand revenue to competitors.",
      },
      {
        id: "inv-3",
        title: "Excess stock locks up capital",
        body: "Surplus safety stock quietly ties up working capital and warehouse space.",
      },
    ],
  },
];

const DURATION = 8000; // ms per tab before auto-advance

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
