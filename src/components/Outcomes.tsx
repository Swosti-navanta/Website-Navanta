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
import MobileTabDropdown from "./MobileTabDropdown";

type Card = {
  metric: string;
  sub: string;
  body: string;
  icon: Icon;
  media?: string;
  mock?: React.ComponentType;
};

/* ── Customer Engagement mockup ─────────────────────────────────── */

function OrderStatusMock() {
  const steps = [
    { label: "Open", date: "Jan 14", done: true },
    { label: "In Process", date: "Jan 16", done: true },
    { label: "Shipped", date: "", done: false },
    { label: "Delivered", date: "", done: false },
  ];
  return (
    <MockPanel title="Order Status" badge={<span className="text-[9.5px] font-medium text-zinc-500">4 Items</span>}>
      <div className="mt-4 flex items-start justify-between px-1">
        {steps.map((s, i) => (
          <div key={s.label} className="relative flex flex-col items-center" style={{ flex: 1 }}>
            {i > 0 && (
              <div
                className="absolute top-[9px] right-1/2 h-[2px] w-full"
                style={{
                  background: steps[i - 1].done && s.done
                    ? "#16a34a"
                    : steps[i - 1].done && !s.done
                    ? "linear-gradient(to right, #16a34a 50%, #d4d4d8 50%)"
                    : "#d4d4d8",
                  backgroundSize: !s.done && !steps[i - 1].done ? "8px 2px" : undefined,
                  backgroundRepeat: "repeat-x",
                }}
              />
            )}
            <div
              className={`relative z-10 flex h-[20px] w-[20px] items-center justify-center rounded-full ${
                s.done ? "bg-[#16a34a]" : "border-2 border-zinc-300 bg-white"
              }`}
            >
              {s.done && (
                <CheckCircle size={20} weight="fill" className="text-white" />
              )}
            </div>
            <p className={`mt-1.5 text-[9px] font-medium ${s.done ? "text-zinc-800" : "text-zinc-400"}`}>{s.label}</p>
            {s.date && <p className="text-[8px] text-zinc-400">{s.date}</p>}
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-lg bg-emerald-50 px-3 py-2 text-[9.5px]">
        <span className="font-medium text-emerald-700">Order ETA:</span>{" "}
        <span className="font-semibold text-zinc-800">Feb 1, 2026</span>
      </div>
    </MockPanel>
  );
}

function ClaimMock() {
  const rows = [
    { label: "Part Number", value: "TRN-87432" },
    { label: "Part Match", value: "Matched", green: true },
    { label: "Warranty Check", value: "Eligible", green: true },
    { label: "Coverage Available", value: "100%" },
  ];
  return (
    <MockPanel title="Claim #CLM-9213">
      <div className="mt-3 flex gap-3">
        <div className="flex h-[80px] w-[80px] flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/outcomes/claim-part.png" alt="" aria-hidden className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between rounded-lg bg-zinc-100/80 px-2.5 py-1.5">
              <span className="text-[8.5px] text-zinc-500">{r.label}</span>
              <span className={`text-[9px] font-semibold ${r.green ? "text-emerald-600" : "text-zinc-800"}`}>
                {r.green && <span className="mr-0.5">&#x2705;</span>}
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MockPanel>
  );
}

function PurchaseRateMock() {
  const points = [10, 12, 14, 13, 18, 22, 28, 35, 40, 48, 55, 60, 62, 65, 68, 70, 72, 74, 76, 78];
  const max = 80;
  const h = 60;
  const w = 180;
  const step = w / (points.length - 1);
  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${i * step},${h - (p / max) * h}`)
    .join(" ");
  const areaD = `${pathD} L${(points.length - 1) * step},${h} L0,${h} Z`;
  return (
    <MockPanel title="Purchase Rate" badge={<span className="text-[11px] font-semibold text-zinc-800">42%</span>}>
      <div className="mt-2 flex-1">
        <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="prGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b5bdb" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#3b5bdb" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#prGrad)" />
          <path d={pathD} fill="none" stroke="#1e3a8a" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        <div className="rounded-lg bg-zinc-100/80 px-2 py-1.5">
          <p className="text-[7.5px] text-zinc-400">Overall Orders</p>
          <p className="text-[10px] font-semibold text-zinc-800">34</p>
        </div>
        <div className="rounded-lg bg-zinc-100/80 px-2 py-1.5">
          <p className="text-[7.5px] text-zinc-400">Revenue</p>
          <p className="text-[10px] font-semibold text-zinc-800">$68.2K</p>
        </div>
        <div className="rounded-lg bg-zinc-100/80 px-2 py-1.5">
          <p className="text-[7.5px] text-zinc-400">Purchase Increase</p>
          <p className="text-[10px] font-semibold text-emerald-600">&#x2B06; 8% vs last week</p>
        </div>
      </div>
    </MockPanel>
  );
}

function AutomationMock() {
  const items = [
    { icon: "&#x1F4CB;", label: "Order Status Updates" },
    { icon: "&#x1F514;", label: "Order Notifications" },
    { icon: "&#x26A0;", label: "Escalations" },
    { icon: "&#x1F4C4;", label: "Create Case" },
  ];
  return (
    <MockPanel title="Automation Overview">
      <div className="mt-3 flex flex-col gap-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-xl bg-zinc-100/80 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px]" dangerouslySetInnerHTML={{ __html: item.icon }} />
              <span className="text-[9.5px] font-medium text-zinc-700">{item.label}</span>
            </div>
            <span className="text-[9px] font-semibold text-emerald-600">Automated</span>
          </div>
        ))}
      </div>
    </MockPanel>
  );
}

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
        body: "Live order visibility with exception-driven updates, no phone calls needed.",
        icon: PhoneSlash,
        mock: OrderStatusMock,
      },
      {
        metric: "Faster claims resolution",
        sub: "auto part + warranty match",
        body: "Part identified, warranty verified, purchase matched, claims resolved in minutes.",
        icon: ShieldCheck,
        mock: ClaimMock,
      },
      {
        metric: "Higher repeat revenue",
        sub: "engagement into lifetime",
        body: "Engagement signals become repeat purchases and higher lifetime value.",
        icon: TrendUp,
        mock: PurchaseRateMock,
      },
      {
        metric: "Routine work, automated",
        sub: "one surface, every service desk",
        body: "One command surface automating routine service work across every desk.",
        icon: Robot,
        mock: AutomationMock,
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
        body: "Demand-sensed, cost-optimized POs, the planner approves, the system executes.",
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
        body: "Normalized spend across every category, validated, evidence-backed savings.",
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
        body: "Plans self-tune to demand shifts, right product, right place, right now.",
        icon: ChartLineUp,
        mock: FillRateMock,
      },
      {
        metric: "Decisions in days",
        sub: "confidence-graded actions",
        body: "Confidence-graded stocking recommendations, the planner stays in the loop.",
        icon: Target,
        mock: ActionQueueMock,
      },
      {
        metric: "Higher turns, lower cost",
        sub: "rebalance + reorder, automated",
        body: "Automatic rebalancing and replenishment, higher turns, less tied-up capital.",
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
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-xl">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" aria-hidden className="w-full object-cover" style={{ aspectRatio: "1203/700" }} />
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
          <h2 className="mt-3 font-medium tracking-tight text-zinc-900">
            Driving Outcomes
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            Three pillars turning intelligence into measurable business value.
          </p>
          {/* Tabs — custom dropdown on mobile, pills on md+ */}
          <div className="mt-8">
            <MobileTabDropdown items={TABS} active={active} onChange={setActive} />
          </div>
          <div className="mt-8 hidden md:flex">
            <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 shadow-sm">
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
              <div key={c.metric} className="flex flex-col overflow-hidden rounded-2xl bg-[#F6F6F6] p-6">
                <div className="flex items-start gap-3.5 pb-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#EBE8F3]">
                    <c.icon size={20} className="text-[#5C3D97]" />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium leading-snug text-zinc-900">
                      {c.metric}
                    </p>
                    <p className="text-[13px] text-zinc-400">{c.sub}</p>
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
