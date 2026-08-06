"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserCircleGear, Truck, Wrench, type Icon } from "@phosphor-icons/react";
import FadeIn from "./FadeIn";
import MobileTabDropdown from "./MobileTabDropdown";
import { useAdvanceTimer } from "@/hooks/useAdvanceTimer";

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
        body: "No live view of orders, you hear about delays when the customer does.",
      },
      {
        id: "cx-3",

        title: "High Call Volumes",
        body: "Routine status calls bury service teams with no single source of truth.",
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
        body: "Spend and supplier data sit in disconnected systems, risk hides until it hits.",
      },
      {
        id: "sf-2",

        title: "Reactive vendor management",
        body: "Vendors managed after the fact, with no continuous view of risk or performance.",
      },
      {
        id: "sf-3",

        title: "Reacting vs anticipating",
        body: "Reacting to shocks instead of sensing them, expedite premiums and value leakage.",
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
        body: "Planning by hand, SKU by SKU, stock piles up here while it runs dry there.",
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

/* Dwell time per tab before auto-advancing. Long enough to read all three cards
   without feeling like the section is racing ahead of you. */
const DURATION = 12000;

export default function Challenges() {
  const [tabIdx, setTabIdx] = useState(0);
  const tab = TABS[tabIdx];

  const { setPaused } = useAdvanceTimer(
    DURATION,
    () => setTabIdx((i) => (i + 1) % TABS.length),
    tabIdx,
  );

  return (
    <section id="challenges" className="overflow-hidden bg-white py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <h2 className="font-medium tracking-tight text-zinc-900">
            The Challenges
          </h2>
          <p className="mt-3 text-[16px] text-zinc-500">
            The problems industrial supply chains live with every day
          </p>
        </FadeIn>

        {/* Tabs — custom dropdown on mobile, pills on md+ */}
        <FadeIn>
          <div className="mt-8 md:hidden">
            <MobileTabDropdown items={TABS} active={tabIdx} onChange={setTabIdx} />
          </div>
          <div className="mt-8 hidden md:inline-flex rounded-full border border-zinc-200 p-1">
            {TABS.map((t, i) => (
              <button
                key={t.key}
                onClick={() => setTabIdx(i)}
                className={`relative flex items-center rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors ${
                  i === tabIdx ? "text-white" : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {i === tabIdx && (
                  <motion.span
                    layoutId="challenges-tab-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      /* Deliberately flat, to sit with the rest of the section — the surrounding
                         cards and containers carry no drop shadows. Depth comes from a
                         faint top sheen and a hairline, nothing that lifts the pill off
                         the page. */
                      backgroundColor: "#18181B",
                      backgroundImage:
                        "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 55%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <t.icon size={16} weight="regular" />
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Cards */}
        <div
          className="mt-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.key}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -12, transition: { duration: 0.22 } }}
              className="grid gap-6 md:grid-cols-3"
            >
              {tab.cards.map((c) => (
                <motion.div
                  key={c.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col rounded-2xl border border-zinc-100 bg-zinc-50 p-6"
                >
                  <div className="mb-4 h-14 w-14 overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/figma/icons/${c.id}.png`}
                      alt=""
                      aria-hidden
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* leading-snug trims the title's half-leading so the visual gap to
                      the body reads ~11px rather than the 16px the default 24px line
                      box produced. Also matches the Outcomes card title. */}
                  <h3 className="text-[16px] font-medium leading-snug text-zinc-900">{c.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-zinc-500">{c.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
