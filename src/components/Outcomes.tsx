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
  CheckCircle,
  type Icon,
} from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

type Card = {
  metric: string;
  sub: string;
  body: string;
  icon: Icon;
  media?: string;
  mock?: React.ComponentType;
};

/* ── Inventory Optimization mockups — JSX product-UI cards in the same
   design language as the Intelligence Layer dashboards (white panel,
   #EBE8F3 tiles, violet accents), sized to the 1203:700 media slot the
   other tabs fill with Figma images. ─────────────────────────────────── */

function MockChip({
  tone,
  children,
}: {
  tone: "violet" | "green" | "amber" | "zinc";
  children: React.ReactNode;
}) {
  const tones = {
    violet: "bg-[#EBE8F3] text-[#5C3D97]",
    green: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    zinc: "bg-zinc-100 text-zinc-500",
  } as const;
  return (
    <span className={`whitespace-nowrap rounded px-1.5 py-0.5 text-[9px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function MockPanel({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col rounded-t-xl bg-white p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-zinc-200/70">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[10.5px] font-semibold text-zinc-900">{title}</p>
        {badge}
      </div>
      {children}
    </div>
  );
}

/* 1 · One view, every location — live network table */
function NetworkViewMock() {
  const rows: [string, string, string, string, boolean][] = [
    ["DC-Chicago", "4.2K", "+12%", "3", true],
    ["DC-Columbus", "6.8K", "−4%", "1", false],
    ["Store-042", "320", "+8%", "2", true],
  ];
  return (
    <MockPanel
      title="Network · 12 locations"
      badge={
        <span className="flex items-center gap-1 rounded border border-zinc-200 px-1.5 py-0.5 text-[9px] text-zinc-600">
          <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" /> Live
        </span>
      }
    >
      <div className="mt-2.5 grid grid-cols-[1.5fr_0.9fr_1.1fr_0.6fr] gap-x-2 border-b border-zinc-100 pb-1 text-[8.5px] text-zinc-400">
        <span>Location</span>
        <span className="text-right">On-hand</span>
        <span className="text-right">Demand 7d</span>
        <span className="text-right">POs</span>
      </div>
      {rows.map(([loc, oh, dm, po, up]) => (
        <div
          key={loc}
          className="grid grid-cols-[1.5fr_0.9fr_1.1fr_0.6fr] gap-x-2 border-b border-zinc-50 py-1.5 text-[9.5px]"
        >
          <span className="truncate font-medium text-zinc-800">{loc}</span>
          <span className="text-right text-zinc-600">{oh}</span>
          <span className={`text-right font-medium ${up ? "text-emerald-600" : "text-zinc-400"}`}>{dm}</span>
          <span className="text-right text-zinc-600">{po}</span>
        </div>
      ))}
      <div className="mt-auto flex items-center justify-between pt-2 text-[8.5px] text-zinc-400">
        <span>
          On-hand <span className="font-medium text-zinc-700">18.4K</span>
        </span>
        <span>
          In transit <span className="font-medium text-zinc-700">3.2K</span>
        </span>
        <span>
          Fill rate <span className="font-medium text-zinc-700">96%</span>
        </span>
      </div>
    </MockPanel>
  );
}

/* 2 · Higher fill rates — self-tuning trend chart */
function FillRateMock() {
  const weeks = [88, 90, 89, 92, 93, 94, 95, 96];
  return (
    <MockPanel
      title="Fill rate · trailing 8 wks"
      badge={<MockChip tone="green">96.4%</MockChip>}
    >
      <div className="mt-3 flex flex-1 items-end gap-1.5">
        {weeks.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`w-full rounded-t ${i === weeks.length - 1 ? "bg-[#5C3D97]" : "bg-[#8b6bc7]"}`}
              style={{ height: (v - 82) * 5, opacity: i === weeks.length - 1 ? 1 : 0.35 + i * 0.08 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[8px] text-zinc-300">
        <span>wk 1</span>
        <span>wk 8</span>
      </div>
      <p className="mt-2 border-t border-zinc-100 pt-1.5 text-[8.5px] text-zinc-400">
        Plan self-tuned to demand shift · 3 adjustments this week
      </p>
    </MockPanel>
  );
}

/* 3 · Decisions in days — confidence-graded action queue */
function ActionQueueMock() {
  const actions: [string, string, number, "green" | "amber", string][] = [
    ["Reorder SKU-4482", "240 units · DC-Chicago", 92, "green", "Auto"],
    ["Rebalance SKU-8841", "3 stores · low cover", 78, "amber", "Review"],
  ];
  return (
    <MockPanel title="Stocking actions" badge={<MockChip tone="violet">Queue · 3</MockChip>}>
      <div className="mt-2.5 flex flex-col gap-1.5">
        {actions.map(([name, detail, conf, tone, label]) => (
          <div key={name} className="rounded-lg bg-zinc-50 px-2 py-1.5">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[9.5px] font-medium text-zinc-800">{name}</p>
              <MockChip tone={tone}>{label}</MockChip>
            </div>
            <p className="text-[8.5px] text-zinc-400">{detail}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-200/70">
                <div className="h-full rounded-full bg-[#8b6bc7]" style={{ width: `${conf}%` }} />
              </div>
              <span className="text-[8.5px] font-medium text-zinc-500">{conf}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="rounded bg-zinc-900 px-2 py-1 text-[8.5px] font-medium text-white">
          Approve queue
        </span>
        <span className="text-[8.5px] text-zinc-400">You stay in the loop</span>
      </div>
    </MockPanel>
  );
}

/* 4 · Higher turns, lower cost — automated rebalance + reorder */
function RebalanceMock() {
  return (
    <MockPanel title="Rebalance & reorder" badge={<MockChip tone="violet">Automated</MockChip>}>
      <div className="mt-2.5 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2 py-1.5">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-[#EBE8F3]">
            <ArrowsClockwise size={11} className="text-[#5C3D97]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[9.5px] font-medium text-zinc-800">Columbus → Chicago</p>
            <p className="text-[8.5px] text-zinc-400">240 units · SKU-4482</p>
          </div>
          <MockChip tone="green">Released</MockChip>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2 py-1.5">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-[#EBE8F3]">
            <CheckCircle size={11} className="text-[#5C3D97]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[9.5px] font-medium text-zinc-800">Auto-PO · Acme Industries</p>
            <p className="text-[8.5px] text-zinc-400">500 units · $0.53/u</p>
          </div>
          <MockChip tone="violet">Auto</MockChip>
        </div>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-1.5 pt-2">
        <div className="rounded-lg border border-zinc-100 px-2 py-1.5">
          <p className="text-[8px] text-zinc-400">Inventory turns</p>
          <p className="text-[10px] font-semibold text-emerald-600">4.2× → 6.1×</p>
        </div>
        <div className="rounded-lg border border-zinc-100 px-2 py-1.5">
          <p className="text-[8px] text-zinc-400">Capital freed</p>
          <p className="text-[10px] font-semibold text-zinc-900">$412K</p>
        </div>
      </div>
    </MockPanel>
  );
}

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
        mock: NetworkViewMock,
      },
      {
        metric: "Higher fill rates",
        sub: "plans self-tune to signals",
        body: "Plans self-tune to demand shifts — right product, right place, right now.",
        icon: ChartLineUp,
        mock: FillRateMock,
      },
      {
        metric: "Decisions in days",
        sub: "confidence-graded actions",
        body: "Confidence-graded stocking recommendations — the planner stays in the loop.",
        icon: Target,
        mock: ActionQueueMock,
      },
      {
        metric: "Higher turns, lower cost",
        sub: "rebalance + reorder, automated",
        body: "Automatic rebalancing and replenishment — higher turns, less tied-up capital.",
        icon: ArrowsClockwise,
        mock: RebalanceMock,
      },
    ],
  },
];

/* Card media — per-card Figma mockup image. No background of its own: it sits
   directly on the card so the mockup reads as part of the surface. Cards that
   don't have their own mockup yet fall back to the shared ETA-over-containers
   composition rather than an empty placeholder. */
function CardMedia({ src, Mock }: { src?: string; Mock?: React.ComponentType }) {
  return (
    <div className="relative flex w-full items-center justify-center">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" aria-hidden className="w-full" />
      ) : Mock ? (
        <div className="aspect-[1203/700] w-full" aria-hidden>
          <Mock />
        </div>
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
              <div key={c.metric} className="flex flex-col overflow-hidden rounded-2xl bg-[#F6F6F6] p-5">
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
                <div className="flex flex-1 items-center">
                  <CardMedia src={c.media} Mock={c.mock} />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
