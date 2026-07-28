"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChartLineUp,
  Waveform,
  Stack,
  Plus,
  Buildings,
  ArrowsClockwise,
  Package,
  Broadcast,
  Barcode,
  MapPinLine,
  BellRinging,
  ChatCircleText,
  CheckCircle,
  Tag,
  Handshake,
  Lightning,
  Target,
  type Icon,
} from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

type Callout = { icon: Icon; title: string; body: string };

type TabDef = {
  key: string;
  label: string;
  heading: string;
  callouts: { left: Callout[]; right: Callout[] };
  card: {
    title: string;
    sub: string;
    stats: [string, string][];
    chartA: { label: string; bars: { d: string; v: number }[] };
    chartB: { label: string };
  };
};

const TABS: TabDef[] = [
  {
    key: "central",
    label: "Centralized Intelligence",
    heading: "Centralized Planning and Buying Intelligence",
    callouts: {
      left: [
        { icon: Buildings, title: "Network & locations", body: "Every warehouse and store, mapped in one view." },
        { icon: Waveform, title: "Demand signal", body: "Signals sensed early, before they become stockouts." },
        { icon: Stack, title: "On-hand position", body: "Live inventory across every location, always current." },
      ],
      right: [
        { icon: ArrowsClockwise, title: "One-click rebalance", body: "Move stock between sites in a single click." },
        { icon: ChartLineUp, title: "Confidence grade", body: "Every recommendation scored, so you know when to trust it." },
        { icon: Package, title: "Stock cover", body: "Days of cover tracked per SKU, per site." },
      ],
    },
    card: {
      title: "SKU-4482 · Network plan",
      sub: "Midwest network · 12 locations",
      stats: [
        ["Locations", "12"],
        ["Fill rate", "96%"],
        ["Confidence", "88%"],
        ["Rebalance", "240 units"],
        ["On-hand", "18.4K"],
        ["Turns", "7.2"],
      ],
      chartA: {
        label: "Weekly demand",
        bars: [
          { d: "Sun", v: 30 },
          { d: "Mon", v: 36 },
          { d: "Tue", v: 36 },
          { d: "Wed", v: 31 },
          { d: "Thu", v: 34 },
          { d: "Fri", v: 37 },
          { d: "Sat", v: 33 },
        ],
      },
      chartB: { label: "Stock cover" },
    },
  },
  {
    key: "orders",
    label: "Inventory & Order Intelligence",
    heading: "Customer Inventory and Order Intelligence",
    callouts: {
      left: [
        { icon: Broadcast, title: "Live order status", body: "Real-time status on every order, no phone calls." },
        { icon: Barcode, title: "SKU cross-reference", body: "Match part numbers instantly across every system." },
        { icon: MapPinLine, title: "Stock by location", body: "See what's available, and where, in seconds." },
      ],
      right: [
        { icon: BellRinging, title: "Proactive alerts", body: "Delays flagged before the customer has to ask." },
        { icon: ChatCircleText, title: "Self-serve answers", body: "Customers find answers themselves, day or night." },
        { icon: CheckCircle, title: "Guided resolution", body: "Every issue routed to the right fix, fast." },
      ],
    },
    card: {
      title: "Order XC-2384 · Flooring",
      sub: "Distributor portal · live",
      stats: [
        ["Status", "In transit"],
        ["ETA", "Feb 1"],
        ["Lines", "18"],
        ["Backorder risk", "Low"],
        ["Alt SKUs", "3"],
        ["Updates", "Auto"],
      ],
      chartA: {
        label: "Order volume",
        bars: [
          { d: "Sun", v: 24 },
          { d: "Mon", v: 33 },
          { d: "Tue", v: 29 },
          { d: "Wed", v: 35 },
          { d: "Thu", v: 32 },
          { d: "Fri", v: 28 },
          { d: "Sat", v: 22 },
        ],
      },
      chartB: { label: "SLA health" },
    },
  },
  {
    key: "procurement",
    label: "Procurement Control",
    heading: "Procurement Control Tower",
    callouts: {
      left: [
        { icon: Tag, title: "Category & region", body: "Spend organized by category and geography." },
        { icon: Handshake, title: "Spend & suppliers", body: "Every supplier scored on cost, risk, and performance." },
        { icon: Waveform, title: "Weekly demand", body: "Demand sensed early, so buying stays ahead of it." },
      ],
      right: [
        { icon: Lightning, title: "One-click RFP", body: "Launch a competitive RFP in a single click." },
        { icon: Target, title: "Savings target", body: "Track every dollar of savings against target." },
        { icon: Package, title: "Stock cover", body: "Coverage tracked across every category and site." },
      ],
    },
    card: {
      title: "OPP-005 · Chemicals",
      sub: "Germany · 4 sites",
      stats: [
        ["Addressable", "$267K"],
        ["Status", "Active"],
        ["Confidence", "76%"],
        ["Avg unit cost", "$0.53"],
        ["Suppliers", "12"],
        ["Savings target", "$21K"],
      ],
      chartA: {
        label: "Weekly demand",
        bars: [
          { d: "Sun", v: 30 },
          { d: "Mon", v: 36 },
          { d: "Tue", v: 36 },
          { d: "Wed", v: 31 },
          { d: "Thu", v: 34 },
          { d: "Fri", v: 37 },
          { d: "Sat", v: 33 },
        ],
      },
      chartB: { label: "Stock cover" },
    },
  },
];

function OpportunityCard({ card }: { card: TabDef["card"] }) {
  return (
    <div className="w-[420px] max-w-full rounded-2xl bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.10)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[16px] font-semibold text-zinc-900">{card.title}</p>
          <p className="text-[13px] text-zinc-500">{card.sub}</p>
        </div>
        <span className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12.5px] text-zinc-700">
          <Plus size={13} /> Report
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-y-4 border-t border-zinc-100 pt-4">
        {card.stats.map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-zinc-400">{k}</p>
            <p className="text-[14px] font-medium text-zinc-900">{v}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[11.5px] text-zinc-400">{card.chartA.label}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        {card.chartA.bars.map((b) => (
          <div key={b.d} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[9.5px] text-zinc-400">{b.v}%</span>
            <div className="w-full rounded-md bg-[#8b6bc7]" style={{ height: b.v * 2.2 }} />
            <span className="text-[9.5px] text-zinc-400">{b.d}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11.5px] text-zinc-400">{card.chartB.label}</p>
      <div className="mt-2 flex justify-between gap-2">
        {card.chartA.bars.map((b) => (
          <div key={b.d} className="flex-1 overflow-hidden rounded-md">
            <div className="h-3 bg-red-400" />
            <div className="h-4 bg-amber-300" />
            <div className="h-5 bg-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

const FEATURE_MS = 3600;

/* Left feature card — active one shows a filling progress bar, then advances */
function FeatureCard({
  icon: CalloutIcon,
  title,
  body,
  active,
  featureKey,
  onSelect,
}: Callout & { active: boolean; featureKey: string; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={active}
      className={`block w-full rounded-2xl p-5 text-left transition-colors ${
        active ? "bg-white shadow-sm" : "bg-zinc-100 hover:bg-zinc-100/70"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
          active ? "bg-[#efeaf9]" : "bg-white"
        }`}
      >
        <CalloutIcon size={17} className={active ? "text-[#5C3D97]" : "text-zinc-400"} />
      </span>
      <p className={`mt-3 text-[16px] font-medium ${active ? "text-zinc-900" : "text-zinc-500"}`}>
        {title}
      </p>
      <p className={`mt-1.5 text-[13px] leading-relaxed ${active ? "text-zinc-500" : "text-zinc-400"}`}>
        {body}
      </p>
      <div className="mt-4 h-px w-full overflow-hidden bg-zinc-200">
        {active && (
          <motion.div
            key={featureKey}
            className="h-full bg-zinc-900"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: FEATURE_MS / 1000, ease: "linear" }}
          />
        )}
      </div>
    </button>
  );
}

/* Right annotation — segmented leader line pointing left at the card + label.
   Active one is black; inactive are light grey (matches the design). */
function Annotation({ text, active }: { text: string; active: boolean }) {
  const line = active ? "bg-zinc-900" : "bg-zinc-200";
  const label = active ? "text-zinc-900" : "text-zinc-300";
  return (
    <div className="flex items-center gap-2 transition-colors duration-500">
      {/* short segment nearest the card, then a gap, then the long line */}
      <span className={`h-px w-2.5 flex-shrink-0 ${line}`} />
      <span className={`h-px w-10 flex-shrink-0 ${line}`} />
      <span className={`whitespace-nowrap text-[15px] ${label}`}>{text}</span>
    </div>
  );
}

export default function IntelligenceLayer() {
  const [active, setActive] = useState(0);
  const [feature, setFeature] = useState(0);
  const tab = TABS[active];
  const featureCount = tab.callouts.left.length;

  // Reset feature when the tab changes
  useEffect(() => {
    setFeature(0);
  }, [active]);

  // Auto-advance the active feature (drives left progress bar + right annotation)
  useEffect(() => {
    const t = setTimeout(() => setFeature((f) => (f + 1) % featureCount), FEATURE_MS);
    return () => clearTimeout(t);
  }, [feature, active, featureCount]);

  return (
    <section id="intelligence" className="bg-[#fafaf9] py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <AnimatePresence mode="wait">
            <motion.h2
              key={tab.heading}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="text-[34px] font-medium tracking-tight text-zinc-900 sm:text-[44px]"
            >
              {tab.heading}
            </motion.h2>
          </AnimatePresence>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            One layer over your existing architecture — without the $100M sunk cost.
          </p>

          {/* Tab pills */}
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

        {/* Left features (with progress) · center product card · right annotations */}
        <FadeIn delay={0.1} className="mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.22 } }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)_minmax(0,210px)]"
            >
              {/* Left — rotating feature cards */}
              <div className="flex flex-col gap-4">
                {tab.callouts.left.map((c, i) => (
                  <FeatureCard
                    key={c.title}
                    {...c}
                    active={i === feature}
                    featureKey={`${tab.key}-${feature}`}
                    onSelect={() => setFeature(i)}
                  />
                ))}
              </div>

              {/* Center — product card */}
              <div className="flex justify-center">
                <OpportunityCard card={tab.card} />
              </div>

              {/* Right — annotations that follow the active feature */}
              <div className="hidden flex-col justify-center gap-14 lg:flex">
                {tab.callouts.right.map((c, i) => (
                  <Annotation key={c.title} text={c.title} active={i === feature} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
}
