"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Package,
  BellRinging,
  ChatCircleText,
  CheckCircle,
  Lightning,
  MagnifyingGlass,
  SquaresFour,
  Brain,
  UserCircleCheck,
  GraduationCap,
  WarningCircle,
  TrendUp,
  FileText,
  PushPin,
  Star,
  ArrowsClockwise,
  ArrowRight,
  User,
  Sparkle,
  Headset,
  type Icon,
} from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

type Callout = { icon: Icon; title: string; body: string };

type TabDef = {
  key: string;
  label: string;
  heading: string;
  callouts: { left: Callout[]; right: Callout[] };
};

const TABS: TabDef[] = [
  {
    key: "central",
    label: "Centralized Intelligence",
    heading: "Centralized Planning and Buying Intelligence",
    /* The five Navanta Lens pillars — how we bring intelligence to planning.
       Each drives its own product-UI card in the center (Structure 1). */
    callouts: {
      left: [
        {
          icon: SquaresFour,
          title: "Unified Visibility",
          body: "Real-time inventory, demand, supply and PO insight across all locations.",
        },
        {
          icon: Brain,
          title: "Intelligent Analysis",
          body: "AI models detect signals, risks, opportunities and optimal actions.",
        },
        {
          icon: Lightning,
          title: "Agentic Actions",
          body: "Lens plans and executes stocking decisions by confidence level.",
        },
        {
          icon: UserCircleCheck,
          title: "Planner in the Loop",
          body: "Cost-optimized vendor POs and exceptions routed to you for approval.",
        },
        {
          icon: GraduationCap,
          title: "Continuous Learning",
          body: "Every decision improves future recommendations and outcomes.",
        },
      ],
      right: [
        { icon: SquaresFour, title: "One live view", body: "" },
        { icon: Brain, title: "Signals scored", body: "" },
        { icon: Lightning, title: "Confidence-gated", body: "" },
        { icon: UserCircleCheck, title: "You approve", body: "" },
        { icon: GraduationCap, title: "Compounding accuracy", body: "" },
      ],
    },
  },
  {
    key: "orders",
    label: "Inventory & Order Intelligence",
    heading: "Customer Inventory and Order Intelligence",
    /* The Lens pillars for customer inventory & orders — one data foundation,
       every customer answer. Each drives its own card in the center. */
    callouts: {
      left: [
        {
          icon: SquaresFour,
          title: "Unified Visibility",
          body: "Every order, shipment, and location's inventory in one view — SKU cross-reference built in.",
        },
        {
          icon: MagnifyingGlass,
          title: "Intelligent Self-Service",
          body: "Search by name, SKU, or image — live availability, alternatives, full detail.",
        },
        {
          icon: BellRinging,
          title: "Proactive Notifications",
          body: "Delay, backorder, and back-in-stock alerts pushed before the customer asks.",
        },
        {
          icon: ChatCircleText,
          title: "Guided Resolution",
          body: "Issues raised in context — Lens suggests alternatives and keeps everyone on one thread.",
        },
        {
          icon: GraduationCap,
          title: "Continuous Learning",
          body: "Personalized dashboards, saved searches, and favorites sharpen every visit.",
        },
      ],
      right: [
        { icon: SquaresFour, title: "One live view", body: "" },
        { icon: MagnifyingGlass, title: "Self-serve answers", body: "" },
        { icon: BellRinging, title: "Pushed before asked", body: "" },
        { icon: ChatCircleText, title: "One thread to fix", body: "" },
        { icon: GraduationCap, title: "Sharper every visit", body: "" },
      ],
    },
  },
  {
    key: "procurement",
    label: "Procurement Control",
    heading: "Procurement Control Tower",
    /* The Lens pillars for procurement, each answering a named problem:
       fragmented spend & no single source of truth → Unified Visibility;
       reactive, habit-based buying → Intelligent Analysis; decentralized
       buying → Agentic Actions (pooled volume); approvals stay human →
       Planner in the Loop; one-off stale reports → Continuous Learning. */
    callouts: {
      left: [
        {
          icon: SquaresFour,
          title: "Unified Visibility",
          body: "Spend, contract, and vendor data from every ERP, spreadsheet, and site — one source of truth.",
        },
        {
          icon: Brain,
          title: "Intelligent Analysis",
          body: "Data-driven signals replace habit buying — price variance, leakage, and missed discounts surfaced.",
        },
        {
          icon: Lightning,
          title: "Agentic Actions",
          body: "Volume pooled across sites and business units into consolidated, competitive buys.",
        },
        {
          icon: UserCircleCheck,
          title: "Planner in the Loop",
          body: "Category managers validate, adjust and approve every award inside the Lens.",
        },
        {
          icon: GraduationCap,
          title: "Continuous Learning",
          body: "A continuous engine, not one-off reports — savings tracked live, never stale.",
        },
      ],
      right: [
        { icon: SquaresFour, title: "One source of truth", body: "" },
        { icon: Brain, title: "Data over habit", body: "" },
        { icon: Lightning, title: "Full buying power", body: "" },
        { icon: UserCircleCheck, title: "You approve awards", body: "" },
        { icon: GraduationCap, title: "Never stale", body: "" },
      ],
    },
  },
];

/* ── Per-feature product-UI cards (Centralized Intelligence · Structure 1) ──
   One card per Lens pillar, all in the same design language as the network
   card, so the customer watches the layer work: see everything → detect
   signals → execute above confidence → route the rest to the planner → learn. */

function CardShell({
  title,
  sub,
  badge,
  children,
}: {
  title: string;
  sub: string;
  badge: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-[420px] max-w-full rounded-2xl bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.10)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[16px] font-semibold text-zinc-900">{title}</p>
          <p className="text-[13px] text-zinc-500">{sub}</p>
        </div>
        {badge}
      </div>
      {children}
    </div>
  );
}

function Chip({ tone, children }: { tone: "violet" | "amber" | "green" | "zinc"; children: React.ReactNode }) {
  const tones = {
    violet: "bg-[#EBE8F3] text-[#5C3D97]",
    amber: "bg-amber-100 text-amber-700",
    green: "bg-emerald-100 text-emerald-700",
    zinc: "bg-zinc-100 text-zinc-500",
  } as const;
  return (
    <span className={`whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* 1 · Unified Visibility — the whole network in one live view */
function VisibilityCard() {
  return (
    <CardShell
      title="Midwest network · One view"
      sub="12 locations · demand, supply, POs"
      badge={
        <span className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12.5px] text-zinc-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
        </span>
      }
    >
      <div className="mt-5 grid grid-cols-3 gap-y-4 border-t border-zinc-100 pt-4">
        {[
          ["Locations", "12"],
          ["On-hand", "18.4K"],
          ["In transit", "3.2K"],
          ["Open POs", "14"],
          ["Demand · 7d", "+8%"],
          ["Fill rate", "96%"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-zinc-400">{k}</p>
            <p className="text-[14px] font-medium text-zinc-900">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[11.5px] text-zinc-400">Weekly demand</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        {[
          ["Sun", 30], ["Mon", 36], ["Tue", 36], ["Wed", 31], ["Thu", 34], ["Fri", 37], ["Sat", 33],
        ].map(([d, v]) => (
          <div key={d as string} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[9.5px] text-zinc-400">{v}%</span>
            <div className="w-full rounded-md bg-[#8b6bc7]" style={{ height: (v as number) * 2.2 }} />
            <span className="text-[9.5px] text-zinc-400">{d}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11.5px] text-zinc-400">Stock cover</p>
      <div className="mt-2 flex justify-between gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 overflow-hidden rounded-md">
            <div className="h-3 bg-red-400" />
            <div className="h-4 bg-amber-300" />
            <div className="h-5 bg-emerald-400" />
          </div>
        ))}
      </div>
    </CardShell>
  );
}

/* 2 · Intelligent Analysis — signals detected and scored */
function AnalysisCard() {
  const signals = [
    {
      icon: TrendUp,
      name: "Demand shift detected",
      detail: "SKU-4482 · +18% WoW across 4 stores",
      chip: <Chip tone="violet">Act</Chip>,
    },
    {
      icon: WarningCircle,
      name: "Stockout risk",
      detail: "DC-Chicago · 9 days to zero cover",
      chip: <Chip tone="amber">High</Chip>,
    },
    {
      icon: Package,
      name: "Overstock building",
      detail: "DC-Columbus · 31 days of cover",
      chip: <Chip tone="zinc">Watch</Chip>,
    },
  ];
  return (
    <CardShell
      title="Signal scan · Midwest"
      sub="142 SKUs analyzed · this morning"
      badge={
        <span className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12.5px] text-zinc-700">
          <Brain size={13} /> AI
        </span>
      }
    >
      <div className="mt-5 flex flex-col gap-3 border-t border-zinc-100 pt-4">
        {signals.map((s) => (
          <div key={s.name} className="flex items-start justify-between gap-3 rounded-xl bg-zinc-50 p-3.5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#EBE8F3]">
                <s.icon size={15} className="text-[#5C3D97]" />
              </span>
              <div>
                <p className="text-[13.5px] font-medium text-zinc-900">{s.name}</p>
                <p className="mt-0.5 text-[12px] text-zinc-500">{s.detail}</p>
              </div>
            </div>
            {s.chip}
          </div>
        ))}
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="text-[11.5px] text-zinc-400">Model confidence</p>
          <p className="text-[11.5px] font-medium text-zinc-900">88%</p>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-100">
          <div className="h-full rounded-full bg-[#8b6bc7]" style={{ width: "88%" }} />
        </div>
      </div>
      <p className="mt-4 border-t border-zinc-100 pt-3 text-[12px] text-zinc-500">
        3 signals → 3 recommended actions, ranked by impact.
      </p>
    </CardShell>
  );
}

/* 3 · Agentic Actions — executed above the confidence threshold */
function AgenticCard() {
  const steps = [
    "Plan generated from live signals",
    "Confidence 92% — above 85% threshold",
    "Transfer order created & released",
    "Stores and carrier notified",
  ];
  return (
    <CardShell
      title="Rebalance · auto-executed"
      sub="SKU-4482 · Columbus → Chicago"
      badge={<Chip tone="green">Executed</Chip>}
    >
      <div className="mt-5 grid grid-cols-3 gap-y-4 border-t border-zinc-100 pt-4">
        {[
          ["Units", "240"],
          ["Confidence", "92%"],
          ["Threshold", "85%"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-zinc-400">{k}</p>
            <p className="text-[14px] font-medium text-zinc-900">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="relative mt-1.5 h-1.5 rounded-full bg-zinc-100">
          <div className="h-full rounded-full bg-[#8b6bc7]" style={{ width: "92%" }} />
          {/* threshold marker */}
          <span className="absolute -top-1 h-3.5 w-px bg-zinc-900" style={{ left: "85%" }} />
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-zinc-400">
          <span>0%</span>
          <span>threshold 85%</span>
          <span>100%</span>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {steps.map((s) => (
          <div key={s} className="flex items-center gap-2.5">
            <CheckCircle size={16} weight="fill" className="flex-shrink-0 text-emerald-500" />
            <p className="text-[13px] text-zinc-700">{s}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-zinc-100 pt-3 text-[12px] text-zinc-500">
        Below the threshold? Nothing moves without you — see next.
      </p>
    </CardShell>
  );
}

/* 4 · Planner in the Loop — cost-optimized PO routed for approval */
function PlannerCard() {
  return (
    <CardShell
      title="Vendor PO · awaiting approval"
      sub="PO-78291 · Acme Industries"
      badge={<Chip tone="amber">Review</Chip>}
    >
      <div className="mt-5 grid grid-cols-3 gap-y-4 border-t border-zinc-100 pt-4">
        {[
          ["Units", "500"],
          ["Unit cost", "$0.53"],
          ["vs last buy", "−6%"],
          ["Total", "$12.4K"],
          ["Confidence", "84%"],
          ["Delivery", "Feb 12"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-zinc-400">{k}</p>
            <p className="text-[14px] font-medium text-zinc-900">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl bg-zinc-50 p-3.5">
        <p className="text-[12px] leading-relaxed text-zinc-600">
          Confidence 84% sits below your 85% threshold — Lens drafted the
          cost-optimized PO and routed it to you instead of executing.
        </p>
      </div>
      <div className="mt-5 flex gap-2.5">
        <span className="flex-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-center text-[13px] font-medium text-white">
          Approve
        </span>
        <span className="flex-1 rounded-lg border border-zinc-200 px-4 py-2.5 text-center text-[13px] font-medium text-zinc-700">
          Adjust
        </span>
      </div>
      <p className="mt-4 border-t border-zinc-100 pt-3 text-[12px] text-zinc-500">
        You stay in command — the system executes only what you&apos;d sign.
      </p>
    </CardShell>
  );
}

/* 5 · Continuous Learning — accuracy compounds quarter over quarter */
function LearningCard() {
  const quarters = [
    ["Q1", 78],
    ["Q2", 84],
    ["Q3", 89],
    ["Q4", 94],
  ] as const;
  return (
    <CardShell
      title="Model performance"
      sub="1,240 decisions learned this quarter"
      badge={
        <span className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12.5px] text-zinc-700">
          <TrendUp size={13} /> Improving
        </span>
      }
    >
      <p className="mt-5 border-t border-zinc-100 pt-4 text-[11.5px] text-zinc-400">
        Forecast accuracy
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        {quarters.map(([q, v]) => (
          <div key={q} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[10px] font-medium text-zinc-600">{v}%</span>
            <div className="w-full rounded-md bg-[#8b6bc7]" style={{ height: (v - 60) * 3.4, opacity: 0.55 + (v - 78) * 0.028 }} />
            <span className="text-[9.5px] text-zinc-400">{q}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-3 border-t border-zinc-100 pt-4">
        {[
          ["Override rate", "11% → 4%"],
          ["Expedite spend", "−42%"],
          ["Stockout events", "−31%"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between">
            <p className="text-[13px] text-zinc-500">{k}</p>
            <p className="text-[13.5px] font-medium text-emerald-600">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 border-t border-zinc-100 pt-3 text-[12px] text-zinc-500">
        Every decision sharpens the next recommendation.
      </p>
    </CardShell>
  );
}

/* ── Customer Inventory & Order Intelligence — per-feature cards ─────────── */

/* 1 · Unified Visibility — one live view of an order, stock, and specs */
function OrderViewCard() {
  const steps = [
    { label: "Open", date: "Jan 14", done: true },
    { label: "In process", date: "Jan 16", done: true },
    { label: "Shipped", date: "—", done: false },
    { label: "Delivered", date: "—", done: false },
  ];
  return (
    <CardShell
      title="Order XC-2384 · One view"
      sub="Distributor portal · 18 lines"
      badge={
        <span className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12.5px] text-zinc-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
        </span>
      }
    >
      <div className="mt-5 grid grid-cols-3 gap-y-4 border-t border-zinc-100 pt-4">
        {[
          ["Status", "In transit"],
          ["ETA", "Feb 1"],
          ["Lines", "18"],
          ["On-hand", "2.1K"],
          ["Alt SKUs", "3"],
          ["Specs", "Attached"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-zinc-400">{k}</p>
            <p className="text-[14px] font-medium text-zinc-900">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[11.5px] text-zinc-400">Order progress</p>
      <div className="mt-3 flex items-start">
        {steps.map((s, i) => (
          <div key={s.label} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <div className={`h-px flex-1 ${i === 0 ? "bg-transparent" : s.done ? "bg-emerald-500" : "bg-zinc-200"}`} />
              {s.done ? (
                <CheckCircle size={20} weight="fill" className="flex-shrink-0 text-emerald-500" />
              ) : (
                <span className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-zinc-200 bg-white" />
              )}
              <div className={`h-px flex-1 ${i === steps.length - 1 ? "bg-transparent" : steps[i + 1].done ? "bg-emerald-500" : "bg-zinc-200"}`} />
            </div>
            <p className={`mt-1.5 text-[11px] font-medium ${s.done ? "text-zinc-900" : "text-zinc-400"}`}>{s.label}</p>
            <p className="text-[10px] text-zinc-400">{s.date}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-[12px] text-emerald-700">
        Order ETA: Feb 1 — every line, shipment, and spec in one place.
      </div>
      <p className="mt-4 border-t border-zinc-100 pt-3 text-[12px] text-zinc-500">
        SKU cross-reference built in — part numbers match across systems.
      </p>
    </CardShell>
  );
}

/* 2 · Intelligent Self-Service — search by name, SKU, or image */
function SelfServiceCard() {
  const results = [
    { name: "SKU-8841 · Oak plank 8mm", detail: "1.2K units · ships today", chip: <Chip tone="green">In stock</Chip> },
    { name: "SKU-8842 · Oak plank 10mm", detail: "Suggested alternative · same spec", chip: <Chip tone="violet">Alt</Chip> },
    { name: "SKU-7719 · Oak laminate", detail: "240 units · restock Feb 4", chip: <Chip tone="amber">Low</Chip> },
  ];
  return (
    <CardShell
      title="Search · self-service"
      sub="By name, SKU, or image"
      badge={
        <span className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12.5px] text-zinc-700">
          <MagnifyingGlass size={13} /> 24/7
        </span>
      }
    >
      <div className="mt-5 flex items-center gap-2 rounded-xl border border-zinc-200 px-3.5 py-2.5">
        <MagnifyingGlass size={15} className="text-zinc-400" />
        <p className="text-[13.5px] text-zinc-900">
          oak plank 8mm<span className="animate-pulse text-zinc-400">|</span>
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {results.map((r) => (
          <div key={r.name} className="flex items-start justify-between gap-3 rounded-xl bg-zinc-50 p-3.5">
            <div>
              <p className="text-[13.5px] font-medium text-zinc-900">{r.name}</p>
              <p className="mt-0.5 text-[12px] text-zinc-500">{r.detail}</p>
            </div>
            {r.chip}
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-zinc-100 pt-3 text-[12px] text-zinc-500">
        Live availability, alternatives, and full product detail — no phone call.
      </p>
    </CardShell>
  );
}

/* 3 · Proactive Notifications — pushed before the customer asks */
function NotificationsCard() {
  const alerts = [
    {
      icon: WarningCircle,
      name: "Delay flagged · XC-2384",
      detail: "ETA slipped 2 days — customer notified 09:12",
      chip: <Chip tone="amber">Pushed</Chip>,
    },
    {
      icon: Package,
      name: "Backorder risk · SKU-8841",
      detail: "Alternative suggested before cutoff",
      chip: <Chip tone="violet">Auto</Chip>,
    },
    {
      icon: BellRinging,
      name: "Back in stock · SKU-7719",
      detail: "3 waiting customers alerted",
      chip: <Chip tone="green">Sent</Chip>,
    },
  ];
  return (
    <CardShell
      title="Alerts · pushed to customers"
      sub="Lens watches every order"
      badge={<Chip tone="violet">Proactive</Chip>}
    >
      <div className="mt-5 flex flex-col gap-3 border-t border-zinc-100 pt-4">
        {alerts.map((a) => (
          <div key={a.name} className="flex items-start justify-between gap-3 rounded-xl bg-zinc-50 p-3.5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#EBE8F3]">
                <a.icon size={15} className="text-[#5C3D97]" />
              </span>
              <div>
                <p className="text-[13.5px] font-medium text-zinc-900">{a.name}</p>
                <p className="mt-0.5 text-[12px] text-zinc-500">{a.detail}</p>
              </div>
            </div>
            {a.chip}
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-y-4 border-t border-zinc-100 pt-4">
        {[
          ["Alerts today", "38"],
          ["Before asked", "100%"],
          ["Calls avoided", "31"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-zinc-400">{k}</p>
            <p className="text-[14px] font-medium text-zinc-900">{v}</p>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

/* 4 · Guided Resolution — an actual chat thread that shows "raised in context"
   and "one thread" instead of just telling it. Three participants (customer,
   Lens, service rep), a live-attached context card, and a resolved footer. */
function ResolutionCard() {
  const messages: {
    icon: Icon;
    name: string;
    time: string;
    text: string;
    lens?: boolean;
    attached?: React.ReactNode;
  }[] = [
    {
      icon: User,
      name: "Ana · Riverside HW",
      time: "9:14",
      text: "Short shipment on PO-4881 — receiving 38 of 40 boxes on SKU-8841.",
    },
    {
      icon: Sparkle,
      lens: true,
      name: "Navanta Lens",
      time: "9:14",
      text: "Matched invoice, ASN, and receipt. 2 units short at DC-Chicago.",
      attached: (
        <div className="mt-2 flex items-center gap-2.5 rounded-lg border border-zinc-200 bg-white px-3 py-2">
          <FileText size={14} className="text-zinc-400" />
          <p className="flex-1 text-[11.5px] font-medium text-zinc-800">
            PO-4881 · ASN #24-118
          </p>
          <span className="text-[10.5px] text-zinc-400">Δ 2 units</span>
        </div>
      ),
    },
    {
      icon: Sparkle,
      lens: true,
      name: "Navanta Lens",
      time: "9:15",
      text: "Replacement · 2 units queued from DC-Columbus. Ships today.",
    },
    {
      icon: Headset,
      name: "Jordan · Service",
      time: "9:40",
      text: "Credit issued. Ana notified. Closing.",
    },
  ];
  return (
    <CardShell
      title="Issue #1842 · resolved"
      sub="Raised in context · one thread"
      badge={<Chip tone="green">Resolved</Chip>}
    >
      <div className="mt-5 grid grid-cols-3 gap-y-4 border-t border-zinc-100 pt-4">
        {[
          ["Time to fix", "26 min"],
          ["Handoffs", "0"],
          ["Thread", "1"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-zinc-400">{k}</p>
            <p className="text-[14px] font-medium text-zinc-900">{v}</p>
          </div>
        ))}
      </div>

      {/* The thread itself — system-style icon tiles, bubbles, timestamps */}
      <div className="mt-5 flex flex-col gap-3">
        {messages.map((m, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#EBE8F3]">
              <m.icon size={15} className="text-[#5C3D97]" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <p className="truncate text-[11.5px] font-medium text-zinc-900">{m.name}</p>
                <p className="text-[10.5px] text-zinc-400">{m.time}</p>
              </div>
              <div className={`mt-1 rounded-lg px-3 py-2 text-[12.5px] leading-snug text-zinc-800 ${m.lens ? "bg-[#f4f0fa]" : "bg-zinc-50"}`}>
                {m.text}
                {m.attached}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2.5">
        <CheckCircle size={15} weight="fill" className="flex-shrink-0 text-emerald-600" />
        <p className="text-[12px] leading-snug text-emerald-800">
          One thread. Customer, Lens, and team stayed in the same context — no
          email chain, no handoffs.
        </p>
      </div>
    </CardShell>
  );
}

/* 5 · Continuous Learning — a personalized customer dashboard that shows
   the workspace sharpening: a named account header, a real bar chart with a
   Y-axis, and a live list of what's been saved this month. */
function CustomerLearningCard() {
  const quarters = [
    ["Q1", 54],
    ["Q2", 63],
    ["Q3", 74],
    ["Q4", 82],
  ] as const;
  const CHART_H = 96;
  const MAX = 100;
  const yTicks = [100, 75, 50, 25, 0];
  const saved = [
    { icon: PushPin, label: "Oak plank family", meta: "12 SKUs · pinned" },
    { icon: Star, label: "Riverside HW · reorder pack", meta: "Q3 favorites" },
    { icon: ArrowsClockwise, label: "Auto-reorder · SKU-8841", meta: "every 4 wks" },
  ];
  return (
    <CardShell
      title="Riverside HW · workspace"
      sub="Personalized · sharpens each visit"
      badge={
        <span className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12.5px] text-emerald-700">
          <TrendUp size={13} /> +28% YoY
        </span>
      }
    >
      <div className="mt-5 grid grid-cols-3 gap-y-4 border-t border-zinc-100 pt-4">
        {[
          ["Saved", "12"],
          ["Favorites", "28"],
          ["Reorders", "2 clicks"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-zinc-400">{k}</p>
            <p className="text-[14px] font-medium text-zinc-900">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-[11.5px] font-medium text-zinc-700">Self-serve rate</p>
        <p className="text-[11px] text-zinc-400">last 4 quarters</p>
      </div>

      {/* Real chart — Y-axis ticks + gridlines behind the bars */}
      <div className="mt-3 flex gap-3">
        <div className="flex flex-col justify-between" style={{ height: CHART_H }}>
          {yTicks.map((t) => (
            <span key={t} className="text-[9px] leading-none text-zinc-300">
              {t}
            </span>
          ))}
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-0 flex flex-col justify-between">
            {yTicks.map((t) => (
              <span key={t} className="h-px w-full bg-zinc-100" />
            ))}
          </div>
          <div className="relative flex h-full items-end justify-between gap-2.5" style={{ height: CHART_H }}>
            {quarters.map(([q, v], i) => (
              <div key={q} className="flex flex-1 flex-col items-center gap-1">
                <span className={`text-[10px] font-medium ${i === quarters.length - 1 ? "text-[#5C3D97]" : "text-zinc-500"}`}>
                  {v}%
                </span>
                <div
                  className={`w-full rounded-t-md ${i === quarters.length - 1 ? "bg-[#5C3D97]" : "bg-[#8b6bc7]"}`}
                  style={{ height: (v / MAX) * (CHART_H - 12), opacity: 0.55 + i * 0.13 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-1 grid grid-cols-4 gap-2.5 pl-8">
        {quarters.map(([q]) => (
          <span key={q} className="text-center text-[9.5px] text-zinc-400">
            {q}
          </span>
        ))}
      </div>

      <p className="mt-5 border-t border-zinc-100 pt-4 text-[11.5px] font-medium text-zinc-700">
        Saved this month
      </p>
      <div className="mt-2 flex flex-col gap-2">
        {saved.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5 rounded-lg bg-zinc-50 px-3 py-2">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#EBE8F3]">
              <s.icon size={15} className="text-[#5C3D97]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-zinc-800">{s.label}</p>
              <p className="text-[10.5px] text-zinc-400">{s.meta}</p>
            </div>
            <ArrowRight size={12} className="text-zinc-300" />
          </div>
        ))}
      </div>
    </CardShell>
  );
}

/* ── Procurement Control Tower — per-feature cards ───────────────────────── */

/* 1 · Unified Visibility — answers "fragmented spend" and "no single source
   of truth": separate ERPs, spreadsheets, and sites unified into one view. */
function SpendViewCard() {
  const sources = ["SAP", "Oracle", "D365", "Sheets"];
  return (
    <CardShell
      title="Spend · one source of truth"
      sub="Every ERP, spreadsheet, and site — unified"
      badge={
        <span className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12.5px] text-zinc-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
        </span>
      }
    >
      {/* Fragmented sources → connected */}
      <div className="mt-5 flex items-center gap-2 border-t border-zinc-100 pt-4">
        {sources.map((s) => (
          <span
            key={s}
            className="flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-[10.5px] font-medium text-zinc-600"
          >
            <CheckCircle size={11} weight="fill" className="text-emerald-500" /> {s}
          </span>
        ))}
        <ArrowRight size={12} className="text-zinc-300" />
        <span className="rounded-md bg-[#EBE8F3] px-2 py-1 text-[10.5px] font-medium text-[#5C3D97]">
          One view
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-y-4 border-t border-zinc-100 pt-4">
        {[
          ["Spend", "$15.1M"],
          ["Sites · BUs", "9 · 3"],
          ["Suppliers", "12"],
          ["Systems", "4 → 1"],
          ["Part names", "1,180 → 640"],
          ["Leakage found", "$610K"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-zinc-400">{k}</p>
            <p className="text-[14px] font-medium text-zinc-900">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[11.5px] text-zinc-400">Spend by site · normalized</p>
      <div className="mt-2 flex flex-col gap-2.5">
        {[
          ["West DC", 75],
          ["Midwest DC", 48],
          ["South Central", 32],
        ].map(([site, w]) => (
          <div key={site as string} className="flex items-center gap-3">
            <p className="w-24 flex-shrink-0 text-[11.5px] text-zinc-500">{site}</p>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100">
              <div className="h-full rounded-full bg-[#8b6bc7]" style={{ width: `${w}%` }} />
            </div>
            <p className="w-8 text-right text-[11.5px] font-medium text-zinc-700">{w}%</p>
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-zinc-100 pt-3 text-[12px] text-zinc-500">
        Fragmented spend across systems that never talked — finally one view.
      </p>
    </CardShell>
  );
}

/* 2 · Intelligent Analysis — answers "reactive, siloed decisions": habit
   buying exposed and replaced with data-driven signals. */
function CategoryScanCard() {
  const signals = [
    {
      icon: Lightning,
      name: "Missed volume discount",
      detail: "Combined volume unlocks 8% tier · $214K/yr",
      chip: <Chip tone="violet">Act</Chip>,
    },
    {
      icon: WarningCircle,
      name: "Same part, 3 prices",
      detail: "$0.49 · $0.53 · $0.61 across sites",
      chip: <Chip tone="amber">High</Chip>,
    },
    {
      icon: ArrowsClockwise,
      name: "Habit buy detected",
      detail: "Site 4 pays a 12% premium to its usual vendor",
      chip: <Chip tone="zinc">Watch</Chip>,
    },
  ];
  return (
    <CardShell
      title="Category scan · Fasteners"
      sub="Refreshed hourly · 34 categories"
      badge={
        <span className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12.5px] text-zinc-700">
          <Brain size={13} /> AI
        </span>
      }
    >
      <div className="mt-5 flex flex-col gap-3 border-t border-zinc-100 pt-4">
        {signals.map((s) => (
          <div key={s.name} className="flex items-start justify-between gap-3 rounded-xl bg-zinc-50 p-3.5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#EBE8F3]">
                <s.icon size={15} className="text-[#5C3D97]" />
              </span>
              <div>
                <p className="text-[13.5px] font-medium text-zinc-900">{s.name}</p>
                <p className="mt-0.5 text-[12px] text-zinc-500">{s.detail}</p>
              </div>
            </div>
            {s.chip}
          </div>
        ))}
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="text-[11.5px] text-zinc-400">Savings quantified</p>
          <p className="text-[11.5px] font-medium text-zinc-900">$2.48M – $2.75M</p>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-100">
          <div className="h-full rounded-full bg-[#8b6bc7]" style={{ width: "78%" }} />
        </div>
      </div>
      <p className="mt-4 border-t border-zinc-100 pt-3 text-[12px] text-zinc-500">
        Buying strategy from data — not habit, not whatever&apos;s on hand.
      </p>
    </CardShell>
  );
}

/* 3 · Agentic Actions — answers "decentralized buying": sites stop buying
   alone; volume pools into consolidated buys with real leverage. */
function RecommendationsCard() {
  const recs = [
    { name: "Pool fastener volume · 9 sites → 1 buy", detail: "$12.4M leverage · 4 suppliers bidding", conf: 92, chip: <Chip tone="green">Ready</Chip> },
    { name: "Merge duplicate contracts", detail: "3 BUs · same vendor · 3 different rates", conf: 88, chip: <Chip tone="green">Ready</Chip> },
    { name: "Move to tiered pricing", detail: "8% discount unlocked at combined volume", conf: 76, chip: <Chip tone="amber">Review</Chip> },
  ];
  return (
    <CardShell
      title="Consolidation · graded"
      sub="One company · one buying power"
      badge={<Chip tone="violet">Agentic</Chip>}
    >
      <div className="mt-5 flex flex-col gap-3 border-t border-zinc-100 pt-4">
        {recs.map((r) => (
          <div key={r.name} className="rounded-xl bg-zinc-50 p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13.5px] font-medium text-zinc-900">{r.name}</p>
                <p className="mt-0.5 text-[12px] text-zinc-500">{r.detail}</p>
              </div>
              {r.chip}
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-200/70">
                <div className="h-full rounded-full bg-[#8b6bc7]" style={{ width: `${r.conf}%` }} />
              </div>
              <p className="text-[11px] font-medium text-zinc-600">{r.conf}%</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-zinc-100 pt-3 text-[12px] text-zinc-500">
        Sites stop buying alone — the company buys as one.
      </p>
    </CardShell>
  );
}

/* 4 · Planner in the Loop — the award stays a human call */
function AwardApprovalCard() {
  return (
    <CardShell
      title="Consolidated award · approval"
      sub="Fasteners · 9 sites pooled · 4 bids"
      badge={<Chip tone="amber">Review</Chip>}
    >
      <div className="mt-5 grid grid-cols-3 gap-y-4 border-t border-zinc-100 pt-4">
        {[
          ["Best bid", "$0.49"],
          ["vs avg paid", "−11%"],
          ["Savings / yr", "$1.1M"],
          ["Volume", "8.4M units"],
          ["Confidence", "84%"],
          ["Term", "24 mo"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-zinc-400">{k}</p>
            <p className="text-[14px] font-medium text-zinc-900">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl bg-zinc-50 p-3.5">
        <p className="text-[12px] leading-relaxed text-zinc-600">
          Lens pooled nine sites&apos; volume into one negotiated buy and
          drafted the award — the decision routes to your category manager,
          not around them.
        </p>
      </div>
      <div className="mt-5 flex gap-2.5">
        <span className="flex-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-center text-[13px] font-medium text-white">
          Approve award
        </span>
        <span className="flex-1 rounded-lg border border-zinc-200 px-4 py-2.5 text-center text-[13px] font-medium text-zinc-700">
          Adjust
        </span>
      </div>
      <p className="mt-4 border-t border-zinc-100 pt-3 text-[12px] text-zinc-500">
        People stay in control of every decision.
      </p>
    </CardShell>
  );
}

/* 5 · Continuous Learning — answers "one-off, stale analysis": a live engine
   refreshed hourly, not manual reports that are outdated on arrival. */
function SavingsEngineCard() {
  const quarters = [
    ["Q1", 0.3],
    ["Q2", 0.7],
    ["Q3", 1.2],
    ["Q4", 1.8],
  ] as const;
  return (
    <CardShell
      title="Savings engine · live"
      sub="Refreshed hourly — not quarterly"
      badge={
        <span className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12.5px] text-zinc-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
        </span>
      }
    >
      <p className="mt-5 border-t border-zinc-100 pt-4 text-[11.5px] text-zinc-400">
        Realized savings · cumulative
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        {quarters.map(([q, v]) => (
          <div key={q} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[10px] font-medium text-zinc-600">${v}M</span>
            <div className="w-full rounded-md bg-[#8b6bc7]" style={{ height: v * 58, opacity: 0.55 + v * 0.25 }} />
            <span className="text-[9.5px] text-zinc-400">{q}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-3 border-t border-zinc-100 pt-4">
        {[
          ["Analysis age", "12 min"],
          ["Maverick spend", "−38%"],
          ["Realized vs target", "104%"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between">
            <p className="text-[13px] text-zinc-500">{k}</p>
            <p className="text-[13.5px] font-medium text-emerald-600">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 border-t border-zinc-100 pt-3 text-[12px] text-zinc-500">
        No one-off studies — a continuous engine that never goes stale.
      </p>
    </CardShell>
  );
}

/* Per-tab, per-feature card sequences (Structure 1) */
const VISUALS: Record<string, React.ComponentType[]> = {
  central: [VisibilityCard, AnalysisCard, AgenticCard, PlannerCard, LearningCard],
  orders: [OrderViewCard, SelfServiceCard, NotificationsCard, ResolutionCard, CustomerLearningCard],
  procurement: [SpendViewCard, CategoryScanCard, RecommendationsCard, AwardApprovalCard, SavingsEngineCard],
};

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
          active ? "bg-[#EBE8F3]" : "bg-white"
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
                  onClick={() => {
                    setActive(i);
                    setFeature(0); // fresh tab starts on its first feature
                  }}
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

              {/* Center — each feature has its own product-UI card
                  (Structure 1); it swaps as the timer advances. */}
              <div className="flex min-h-[560px] items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${tab.key}-${feature}`}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.99, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {(() => {
                      const Visual = VISUALS[tab.key]?.[feature] ?? VisibilityCard;
                      return <Visual />;
                    })()}
                  </motion.div>
                </AnimatePresence>
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
