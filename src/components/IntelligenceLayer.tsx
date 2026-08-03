"use client";

import { Children, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useTransform } from "framer-motion";
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
  PushPin,
  Star,
  ArrowsClockwise,
  ArrowRight,
  Sparkle,
  CaretDown,
  Gauge,
  type Icon,
} from "@phosphor-icons/react";
import FadeIn from "./FadeIn";
import { useAdvanceTimer } from "@/hooks/useAdvanceTimer";

type Callout = { icon: Icon; title: string; body: string };

/* One group per dashboard — icon + one-line summary shown in the left rail,
   features listed for reference on the screen itself. */
type FeatureGroup = { name: string; icon: Icon; desc: string; features: Callout[] };

type TabDef = {
  key: string;
  label: string;
  heading: string;
  groups: FeatureGroup[];
};

const TABS: TabDef[] = [
  {
    key: "central",
    label: "Centralized Intelligence",
    heading: "Centralized Planning and Buying Intelligence",
    groups: [
      {
        name: "Parts Planning",
        icon: SquaresFour,
        desc: "Every SKU classified and scored overnight, planners review only the exceptions that matter.",
        features: [
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
            icon: UserCircleCheck,
            title: "Planner in the Loop",
            body: "Cost-optimized vendor POs and exceptions routed to you for approval.",
          },
        ],
      },
      {
        name: "Autonomous Buying",
        icon: Lightning,
        desc: "Lens executes routine buys by confidence level, and learns from every decision the planner makes.",
        features: [
          {
            icon: Lightning,
            title: "Agentic Actions",
            body: "Lens plans and executes stocking decisions by confidence level.",
          },
          {
            icon: GraduationCap,
            title: "Continuous Learning",
            body: "Every decision improves future recommendations and outcomes.",
          },
        ],
      },
    ],
  },
  {
    key: "orders",
    label: "Inventory & Order Intelligence",
    heading: "Customer Inventory and Order Intelligence",
    groups: [
      {
        name: "Order Tracking",
        icon: Package,
        desc: "Every order, shipment, and issue in one live view, customers hear about delays before they ask.",
        features: [
          {
            icon: SquaresFour,
            title: "Unified Visibility",
            body: "Every order, shipment, and location's inventory in one view, SKU cross-reference built in.",
          },
          {
            icon: BellRinging,
            title: "Proactive Notifications",
            body: "Delay, backorder, and back-in-stock alerts pushed before the customer asks.",
          },
          {
            icon: ChatCircleText,
            title: "Guided Resolution",
            body: "Issues raised in context, Lens suggests alternatives and keeps everyone on one thread.",
          },
        ],
      },
      {
        name: "Customer Workspace",
        icon: MagnifyingGlass,
        desc: "Self-serve search, live availability, and alternatives, personalized to every customer visit.",
        features: [
          {
            icon: MagnifyingGlass,
            title: "Intelligent Self-Service",
            body: "Search by name, SKU, or image, live availability, alternatives, full detail.",
          },
          {
            icon: GraduationCap,
            title: "Continuous Learning",
            body: "Personalized dashboards, saved searches, and favorites sharpen every visit.",
          },
        ],
      },
    ],
  },
  {
    key: "procurement",
    label: "Procurement Control",
    heading: "Procurement Control Tower",
    groups: [
      {
        name: "Spend Intelligence",
        icon: Brain,
        desc: "Spend, contracts, and vendors unified, price variance, leakage, and missed discounts surfaced.",
        features: [
          {
            icon: SquaresFour,
            title: "Unified Visibility",
            body: "Spend, contract, and vendor data from every ERP, spreadsheet, and site, one source of truth.",
          },
          {
            icon: Brain,
            title: "Intelligent Analysis",
            body: "Data-driven signals replace habit buying, price variance, leakage, and missed discounts surfaced.",
          },
        ],
      },
      {
        name: "Sourcing & Award",
        icon: CheckCircle,
        desc: "Volume pooled into consolidated, competitive buys, every award validated and savings tracked live.",
        features: [
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
            body: "A continuous engine, not one-off reports, savings tracked live, never stale.",
          },
        ],
      },
    ],
  },
];

/* ── SaaS dashboard primitives ──────────────────────────────────────────────
   Each tab shows a small number of complete product dashboards, a slim icon
   sidebar, a top bar with page title + filters + "Ask Lens", and a soft work
   canvas of white panels, in the site's design language (white surfaces,
   #EBE8F3 tiles, #5C3D97 accents). Several features live on one dashboard. */

/* Presentation cascade — when a dashboard loads, its top bar settles in and
   the canvas panels stagger up one after another, like the product is being
   demoed live. */
const canvasStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
};
const canvasBlock = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function DashShell({
  page,
  controls,
  children,
}: {
  page: string;
  controls?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[720px] w-full max-w-[1060px] overflow-hidden rounded-2xl bg-white shadow-[0_32px_90px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
      <div className="flex w-full">
        {/* App sidebar */}
        <div className="flex w-11 flex-shrink-0 flex-col items-center gap-2.5 border-r border-zinc-100 py-3.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-semibold text-white">
            N
          </span>
          <span className="mt-2 flex h-7 w-7 items-center justify-center rounded-md bg-[#EBE8F3]">
            <SquaresFour size={14} className="text-[#5C3D97]" />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-md">
            <ChatCircleText size={14} className="text-zinc-300" />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-md">
            <Gauge size={14} className="text-zinc-300" />
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-shrink-0 items-center justify-between gap-3 border-b border-zinc-100 px-4 py-2.5"
          >
            <p className="truncate text-[13px] font-semibold text-zinc-900">{page}</p>
            <div className="flex flex-shrink-0 items-center gap-1.5">{controls}</div>
          </motion.div>
          {/* Work canvas, panels cascade in one after another */}
          <motion.div
            variants={canvasStagger}
            initial="hidden"
            animate="visible"
            className="flex flex-1 flex-col gap-3 overflow-hidden bg-zinc-50/70 p-4"
          >
            {Children.map(children, (child) => (
              <motion.div variants={canvasBlock}>{child}</motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* Top-bar filter dropdown (static) */
function Select({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 whitespace-nowrap rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-zinc-600">
      {children} <CaretDown size={9} className="text-zinc-400" />
    </span>
  );
}

/* Branded AI entry point — mirrors the "Ask …" button in the product */
function AskLens() {
  return (
    <span className="flex items-center gap-1 whitespace-nowrap rounded-lg bg-[#4b3382] px-2.5 py-1.5 text-[11px] font-medium text-white">
      <Sparkle size={11} weight="fill" /> Ask Lens
    </span>
  );
}

/* White content panel on the canvas */
function Panel({
  title,
  right,
  children,
  className,
}: {
  title?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl bg-white p-3.5 ring-1 ring-zinc-100 ${className ?? ""}`}>
      {(title || right) && (
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-zinc-900">{title}</p>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

/* Violet-tinted AI summary panel — the "Lens Summary" */
function LensPanel({
  title,
  headline,
  children,
  className,
}: {
  title: string;
  headline?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[#e4dcf3] bg-gradient-to-b from-[#faf7ff] to-[#f3edfb] p-3.5 ${className ?? ""}`}
    >
      <div className="flex items-center gap-1.5">
        <Sparkle size={13} weight="fill" className="text-[#5C3D97]" />
        <p className="text-[12px] font-semibold text-zinc-900">{title}</p>
      </div>
      {headline && <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-600">{headline}</p>}
      {children}
    </div>
  );
}

/* Violet KPI tile — the metric cards along the top of the product screens */
function KpiTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-[#e8e2f4] bg-[#faf8fd] px-3 py-2.5">
      <p className="whitespace-nowrap text-[14px] font-semibold text-zinc-900">{value}</p>
      <p className="mt-0.5 text-[10px] leading-tight text-zinc-500">{label}</p>
    </div>
  );
}

/* Larger KPI card (Buying screen) */
function KpiPanel({
  label,
  value,
  sub,
  violet,
}: {
  label: React.ReactNode;
  value: string;
  sub: string;
  violet?: boolean;
}) {
  return (
    <div
      className={`rounded-xl px-3.5 py-3 ring-1 ${
        violet
          ? "bg-gradient-to-br from-[#faf7ff] to-[#f1eafa] ring-[#e4dcf3]"
          : "bg-white ring-zinc-100"
      }`}
    >
      <p className="flex items-center gap-1 text-[10.5px] font-medium text-zinc-500">{label}</p>
      <p className="mt-1.5 text-[19px] font-semibold leading-none text-zinc-900">{value}</p>
      <p className="mt-1.5 text-[10px] text-zinc-400">{sub}</p>
    </div>
  );
}

/* In-panel tab row — "Feed 26 · Act 3 · Parked 1" */
function SegTabs({ items }: { items: { label: string; count?: number; active?: boolean }[] }) {
  return (
    <div className="flex items-center gap-4">
      {items.map((t) => (
        <span
          key={t.label}
          className={`flex items-center gap-1.5 whitespace-nowrap pb-2 text-[11px] font-medium ${
            t.active
              ? "border-b-2 border-zinc-900 text-zinc-900"
              : "border-b-2 border-transparent text-zinc-400"
          }`}
        >
          {t.label}
          {t.count != null && (
            <span
              className={`rounded-full px-1.5 py-px text-[9px] ${
                t.active ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-500"
              }`}
            >
              {t.count}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

/* Confidence bar + % (the green scoring bars in the product tables) */
function ConfBar({ pct }: { pct: number }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-1 w-12 overflow-hidden rounded-full bg-zinc-100">
        <span className="block h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
      </span>
      <span className="text-[10.5px] font-medium text-zinc-700">{pct}%</span>
    </span>
  );
}

/* Dense product table */
function MiniTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto overflow-y-hidden rounded-lg ring-1 ring-zinc-100">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-zinc-50/80">
            {head.map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-3 py-2 text-left text-[10px] font-medium text-zinc-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 bg-white">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="whitespace-nowrap px-3 py-2.5 align-middle text-[11px] text-zinc-700">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Screen-level caption — the one-line takeaway under each dashboard */
function Caption({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 text-[10.5px] text-zinc-400">{children}</p>;
}

function Chip({
  tone,
  children,
}: {
  tone: "violet" | "amber" | "green" | "zinc" | "red";
  children: React.ReactNode;
}) {
  const tones = {
    violet: "bg-[#EBE8F3] text-[#5C3D97]",
    amber: "bg-amber-100 text-amber-700",
    green: "bg-emerald-100 text-emerald-700",
    zinc: "bg-zinc-100 text-zinc-500",
    red: "bg-red-100 text-red-600",
  } as const;
  return (
    <span className={`whitespace-nowrap rounded-md px-2 py-1 text-[10.5px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* Small outline / dark action buttons for top bars and table rows */
function GhostBtn({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-zinc-600">
      {children}
    </span>
  );
}
function DarkBtn({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 whitespace-nowrap rounded-lg bg-zinc-900 px-2.5 py-1.5 text-[11px] font-medium text-white">
      {children}
    </span>
  );
}

/* ── Centralized Intelligence ───────────────────────────────────────────────
   Dashboard 1 · Parts Planning, see the whole network, signals scored
   overnight, exceptions routed to the planner (Visibility · Analysis ·
   Planner in the Loop). */
function PlanningDashboard() {
  const cols = [
    { key: "X", desc: "Smooth" },
    { key: "Y", desc: "Erratic" },
    { key: "Z", desc: "Lumpy" },
  ];
  const rows: {
    label: string;
    sub: string;
    cells: { skus: string; fill: string; risk?: string; tone: "ok" | "warn" | "hot" }[];
  }[] = [
    {
      label: "A",
      sub: "Top 80% rev",
      cells: [
        { skus: "142 SKUs", fill: "99.6%", tone: "ok" },
        { skus: "64 SKUs", fill: "98.9%", risk: "$12k", tone: "warn" },
        { skus: "22 SKUs", fill: "97.4%", risk: "$31k", tone: "hot" },
      ],
    },
    {
      label: "B",
      sub: "Next 15%",
      cells: [
        { skus: "96 SKUs", fill: "99.2%", tone: "ok" },
        { skus: "40 SKUs", fill: "98.1%", risk: "$8k", tone: "warn" },
        { skus: "18 SKUs", fill: "96.8%", risk: "$9k", tone: "warn" },
      ],
    },
    {
      label: "C",
      sub: "Bottom 5%",
      cells: [
        { skus: "88 SKUs", fill: "99.0%", tone: "ok" },
        { skus: "35 SKUs", fill: "98.4%", tone: "ok" },
        { skus: "13 SKUs", fill: "95.1%", risk: "$6k", tone: "warn" },
      ],
    },
  ];
  const cellTone = {
    ok: "bg-white ring-zinc-100",
    warn: "bg-amber-50/80 ring-amber-100",
    hot: "bg-red-50/80 ring-red-100",
  } as const;
  const sku = (id: string, name: string) => (
    <div>
      <p className="font-medium text-zinc-900">{id}</p>
      <p className="text-[9.5px] text-zinc-400">{name}</p>
    </div>
  );
  const insight = (conf: string, risk: string) => (
    <div className="text-[10px] font-medium leading-snug text-[#5C3D97]">
      {conf} confidence
      <br />
      {risk} at risk
    </div>
  );
  return (
    <DashShell
      page="Parts Planning"
      controls={
        <>
          <Select>Texas (TX)</Select>
          <Select>Dallas (DAL)</Select>
          <Select>All vendors</Select>
          <AskLens />
        </>
      }
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Unified Visibility, the network classified in one live view */}
        <Panel
          title="ABC × XYZ classification"
          right={<p className="text-[10px] text-zinc-400">518 products · revenue × demand pattern</p>}
        >
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-[64px_1fr_1fr_1fr] gap-2">
              <span />
              {cols.map((c) => (
                <p key={c.key} className="pb-0.5 text-center text-[10px] text-zinc-400">
                  <span className="font-semibold text-zinc-600">{c.key}</span> · {c.desc}
                </p>
              ))}
            </div>
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-[64px_1fr_1fr_1fr] items-stretch gap-2">
                <div className="flex flex-col justify-center">
                  <p className="text-[12px] font-semibold text-zinc-800">{r.label}</p>
                  <p className="text-[9px] leading-tight text-zinc-400">{r.sub}</p>
                </div>
                {r.cells.map((c, i) => (
                  <div key={i} className={`rounded-lg p-2.5 ring-1 ${cellTone[c.tone]}`}>
                    <p className="text-[11.5px] font-semibold text-zinc-900">{c.skus}</p>
                    <div className="mt-1 flex items-center justify-between gap-1">
                      <p className="text-[9.5px] text-zinc-500">{c.fill} fill</p>
                      {c.risk && <p className="text-[9.5px] font-medium text-red-500">{c.risk} at risk</p>}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Panel>

        {/* Intelligent Analysis, the overnight Lens review */}
        <LensPanel title="Lens Summary" headline="Reviewed 734 SKUs overnight, every signal scored and ranked by impact.">
          <div className="mt-3 flex flex-col gap-2">
            <div className="rounded-lg bg-white/70 px-3 py-2.5 ring-1 ring-[#e8e2f4]">
              <p className="text-[17px] font-semibold leading-none text-zinc-900">57</p>
              <p className="mt-1.5 text-[10px] leading-snug text-zinc-500">
                Exceptions need you, 10 critical · 37 high · 10 medium
              </p>
            </div>
            <div className="rounded-lg bg-white/70 px-3 py-2.5 ring-1 ring-[#e8e2f4]">
              <p className="text-[17px] font-semibold leading-none text-zinc-900">12</p>
              <p className="mt-1.5 text-[10px] leading-snug text-zinc-500">
                Ready for PO review, 4 branch transfers · 8 alternate vendors
              </p>
            </div>
            <div className="rounded-lg bg-white/70 px-3 py-2.5 ring-1 ring-[#e8e2f4]">
              <p className="flex items-center gap-1 text-[17px] font-semibold leading-none text-zinc-900">
                <TrendUp size={13} className="text-emerald-600" /> +18%
              </p>
              <p className="mt-1.5 text-[10px] leading-snug text-zinc-500">
                Demand shift on SKU-4482, WoW across 4 stores
              </p>
            </div>
          </div>
        </LensPanel>
      </div>

      {/* Planner in the Loop, only the exceptions reach you, drafted */}
      <Panel
        right={
          <div className="flex items-center gap-1.5">
            <GhostBtn>Critical · 10</GhostBtn>
            <GhostBtn>High · 37</GhostBtn>
            <GhostBtn>Customize</GhostBtn>
          </div>
        }
        title="Planner Review"
      >
        <div className="-mt-1 mb-3 border-b border-zinc-100">
          <SegTabs
            items={[
              { label: "Action Center", count: 7, active: true },
              { label: "Watchlist", count: 1 },
              { label: "Approved", count: 5 },
              { label: "Overstock", count: 5 },
            ]}
          />
        </div>
        <MiniTable
          head={["Product", "Branch", "Exception", "Req. qty", "Value", "Lens insight", ""]}
          rows={[
            [
              sku("30-60049-20PK24", "Carrier 90 evaporator coil"),
              <Chip key="b" tone="zinc">DAL · AY</Chip>,
              <Chip key="e" tone="red">Critical</Chip>,
              "12 units",
              "$9,000",
              insight("80%", "$1.2k"),
              <GhostBtn key="a">Review</GhostBtn>,
            ],
            [
              sku("30-60049-20PK18", "Carrier 90 evaporator coil"),
              <Chip key="b" tone="zinc">DAL · AY</Chip>,
              <Chip key="e" tone="amber">High</Chip>,
              "8 units",
              "$7,000",
              insight("76%", "$0.9k"),
              <GhostBtn key="a">Review</GhostBtn>,
            ],
            [
              sku("30-58811-04PK06", "Copeland scroll compressor"),
              <Chip key="b" tone="zinc">HOU · BX</Chip>,
              <Chip key="e" tone="zinc">Medium</Chip>,
              "5 units",
              "$5,000",
              insight("72%", "$0.4k"),
              <GhostBtn key="a">Review</GhostBtn>,
            ],
          ]}
        />
      </Panel>
      <Caption>
        One classified view of the network, signals scored overnight, and only the exceptions routed to your planner.
      </Caption>
    </DashShell>
  );
}

/* Dashboard 2 · Buying — Lens executes above the confidence bar, the planner
   reviews the rest, and calibration compounds (Agentic · Learning). */
function BuyingDashboard() {
  return (
    <DashShell
      page="Buying"
      controls={
        <>
          <Select>Texas (TX)</Select>
          <Select>All branches</Select>
          <AskLens />
        </>
      }
    >
      {/* Agentic Actions, most POs never need a touch */}
      <div className="grid gap-3 sm:grid-cols-3">
        <KpiPanel label="Pending your review" value="4" sub="$21K total · 3 branches" />
        <KpiPanel label="Approved today" value="5" sub="$4K total · 1 vendor" />
        <KpiPanel
          label={
            <>
              <Sparkle size={10} weight="fill" className="text-[#5C3D97]" /> Auto-approval rate · 30d
            </>
          }
          value="85%"
          sub="well within calibration"
          violet
        />
      </div>
      <Panel
        title="Buyer review"
        right={
          <SegTabs
            items={[
              { label: "Buying queue", count: 7, active: true },
              { label: "Approved POs" },
              { label: "Rejected" },
            ]}
          />
        }
      >
        <MiniTable
          head={["Req. number", "Source", "Branch", "Avg lead time", "Total", "Type", "Action"]}
          rows={[
            [
              <span key="r" className="font-medium text-zinc-900">REQ-2026-1300</span>,
              <Chip key="s" tone="zinc">CT</Chip>,
              "DAL",
              "7 days",
              "$9,000",
              <Chip key="t" tone="violet">Lens pre-cleared</Chip>,
              <CheckCircle key="a" size={16} weight="fill" className="text-[#5C3D97]" />,
            ],
            [
              <span key="r" className="font-medium text-zinc-900">REQ-2026-1301</span>,
              <Chip key="s" tone="zinc">AMA</Chip>,
              "DAL",
              "—",
              "$14,000",
              <Chip key="t" tone="amber">2 products need review</Chip>,
              <GhostBtn key="a">Review</GhostBtn>,
            ],
            [
              <span key="r" className="font-medium text-zinc-900">REQ-2026-1302</span>,
              <Chip key="s" tone="zinc">CT</Chip>,
              "HOU",
              "7 days",
              "$7,000",
              <Chip key="t" tone="violet">Lens pre-cleared</Chip>,
              <CheckCircle key="a" size={16} weight="fill" className="text-[#5C3D97]" />,
            ],
            [
              <span key="r" className="font-medium text-zinc-900">REQ-2026-1303</span>,
              <Chip key="s" tone="zinc">CT</Chip>,
              "DAL",
              "5 days",
              "$7,000",
              <Chip key="t" tone="amber">1 product needs review</Chip>,
              <GhostBtn key="a">Review</GhostBtn>,
            ],
          ]}
        />
      </Panel>

      {/* Continuous Learning, calibration compounds quarter over quarter */}
      <Panel
        title="Model calibration · trailing 12 months"
        right={
          <span className="flex items-center gap-1 rounded-md border border-zinc-200 px-2 py-1 text-[10px] text-emerald-700">
            <TrendUp size={11} /> Improving
          </span>
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Auto-approval rate", "62% → 85%"],
            ["Planner override rate", "11% → 4%"],
            ["Forecast accuracy", "94%"],
            ["Expedite spend", "−42%"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-[10px] text-zinc-400">{k}</p>
              <p className="mt-0.5 text-[13px] font-semibold text-emerald-600">{v}</p>
            </div>
          ))}
        </div>
      </Panel>
      <Caption>
        Above the confidence bar, Lens buys on its own, every planner decision sharpens the next call.
      </Caption>
    </DashShell>
  );
}

/* ── Customer Inventory & Order Intelligence ────────────────────────────────
   Dashboard 1 · Order Tracking, one live view of the order, alerts pushed
   before the customer asks, issues fixed in context (Visibility ·
   Notifications · Resolution). */
function OrderTrackingDashboard() {
  const steps = [
    { label: "Open", date: "Jan 12", done: true },
    { label: "In process", date: "Jan 16", done: true },
    { label: "Shipped", date: "—", done: false },
    { label: "Delivered", date: "—", done: false },
  ];
  const status = (
    <span className="flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> In process
    </span>
  );
  const info: [string, string][] = [
    ["Halstead order #", "3097082"],
    ["Customer PO", "23981029"],
    ["PO date", "Jan 12, 2026"],
    ["Warehouse", "Savannah"],
    ["Ship to", "8119 · Matt Powers"],
    ["Shipper", "DHL"],
  ];
  return (
    <DashShell
      page="Order Tracking · #3096652"
      controls={
        <>
          <GhostBtn>Raise an issue</GhostBtn>
          <DarkBtn>
            <Star size={11} /> Add to Watchlist
          </DarkBtn>
        </>
      }
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex min-w-0 flex-col gap-3">
          {/* Unified Visibility, the order, every line and ETA */}
          <Panel title="Order status" right={<p className="text-[10px] text-zinc-400">4 items · placed Jan 12</p>}>
            <div className="flex items-start">
              {steps.map((s, i) => (
                <div key={s.label} className="flex flex-1 flex-col items-center">
                  <div className="flex w-full items-center">
                    <div className={`h-px flex-1 ${i === 0 ? "bg-transparent" : s.done ? "bg-emerald-500" : "bg-zinc-200"}`} />
                    {s.done ? (
                      <CheckCircle size={19} weight="fill" className="flex-shrink-0 text-emerald-500" />
                    ) : (
                      <span className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-zinc-200 bg-white" />
                    )}
                    <div
                      className={`h-px flex-1 ${
                        i === steps.length - 1 ? "bg-transparent" : steps[i + 1].done ? "bg-emerald-500" : "bg-zinc-200"
                      }`}
                    />
                  </div>
                  <p className={`mt-1.5 text-[10.5px] font-medium ${s.done ? "text-zinc-900" : "text-zinc-400"}`}>
                    {s.label}
                  </p>
                  <p className="text-[9.5px] text-zinc-400">{s.date}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-700">
              In process, order ETA: Feb 1, 2026
            </div>
          </Panel>
          <Panel title="Products · 4">
            <MiniTable
              head={["SKU", "Product", "Status", "Qty", "ETA"]}
              rows={[
                ["I4445101L7", "Barlee Brook plank", status, "240", "Mar 05"],
                ["I4445102L7", "Barlee Brook plank", status, "160", "Mar 05"],
                ["I4445108L2", "Oak stair nose 42″", status, "80", "Mar 03"],
              ]}
            />
          </Panel>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <Panel title="Order information">
            <div className="flex flex-col gap-2">
              {info.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-2">
                  <p className="text-[10.5px] text-zinc-400">{k}</p>
                  <p className="text-[11px] font-medium text-zinc-800">{v}</p>
                </div>
              ))}
            </div>
          </Panel>

          {/* Proactive Notifications, pushed before the customer asks */}
          <Panel title="Notifications" right={<Chip tone="violet">Proactive</Chip>}>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2.5 rounded-lg bg-zinc-50 p-2.5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#EBE8F3]">
                  <WarningCircle size={13} className="text-[#5C3D97]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-zinc-900">Delay flagged</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-zinc-500">
                    ETA slipped 2 days, customer notified 09:12
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-lg bg-zinc-50 p-2.5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#EBE8F3]">
                  <BellRinging size={13} className="text-[#5C3D97]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-zinc-900">Back in stock · SKU-7719</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-zinc-500">3 waiting customers alerted</p>
                </div>
              </div>
            </div>
          </Panel>

          {/* Guided Resolution, raised in context, fixed on one thread */}
          <Panel title="Issue #1842" right={<Chip tone="green">Resolved</Chip>}>
            <p className="text-[10.5px] leading-relaxed text-zinc-600">
              Short shipment on SKU-8841, Lens matched invoice, ASN, and receipt,
              queued 2 replacement units, and credit was issued. Fixed in 26 min,
              one thread, zero handoffs.
            </p>
          </Panel>
        </div>
      </div>
      <Caption>
        Every line, shipment, and ETA in one view, alerts pushed before the customer asks, issues fixed in context.
      </Caption>
    </DashShell>
  );
}

/* Dashboard 2 · Customer Workspace — self-serve search and a workspace that
   sharpens every visit (Self-Service · Learning). */
function WorkspaceDashboard() {
  const results = [
    { name: "SKU-8841 · Oak plank 8mm", detail: "1.2K units · ships today", chip: <Chip tone="green">In stock</Chip> },
    { name: "SKU-8842 · Oak plank 10mm", detail: "Suggested alternative · same spec", chip: <Chip tone="violet">Alt</Chip> },
    { name: "SKU-7719 · Oak laminate", detail: "240 units · restock Feb 4", chip: <Chip tone="amber">Low</Chip> },
  ];
  const saved = [
    { icon: PushPin, label: "Oak plank family", meta: "12 SKUs · pinned" },
    { icon: Star, label: "Riverside HW · reorder pack", meta: "Q3 favorites" },
    { icon: ArrowsClockwise, label: "Auto-reorder · SKU-8841", meta: "every 4 wks" },
  ];
  const quarters = [
    ["Q1", 54],
    ["Q2", 63],
    ["Q3", 74],
    ["Q4", 82],
  ] as const;
  return (
    <DashShell
      page="Riverside HW · Workspace"
      controls={
        <>
          <Select>All categories</Select>
          <AskLens />
        </>
      }
    >
      {/* Intelligent Self-Service, search by name, SKU, or image */}
      <div className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 ring-1 ring-zinc-100">
        <MagnifyingGlass size={14} className="text-zinc-400" />
        <p className="text-[12px] text-zinc-900">
          oak plank 8mm<span className="animate-pulse text-zinc-400">|</span>
        </p>
        <span className="ml-auto whitespace-nowrap rounded-md bg-zinc-100 px-2 py-1 text-[9.5px] font-medium text-zinc-500">
          name · SKU · image
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Panel title="Results · 3 matches">
          <div className="flex flex-col gap-2">
            {results.map((r) => (
              <div key={r.name} className="flex items-start justify-between gap-3 rounded-lg bg-zinc-50 p-3">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#EBE8F3]">
                    <Package size={14} className="text-[#5C3D97]" />
                  </span>
                  <div>
                    <p className="text-[12px] font-medium text-zinc-900">{r.name}</p>
                    <p className="mt-0.5 text-[10.5px] text-zinc-500">{r.detail}</p>
                  </div>
                </div>
                {r.chip}
              </div>
            ))}
          </div>
        </Panel>

        {/* Continuous Learning, the workspace remembers */}
        <Panel title="Saved this month">
          <div className="flex flex-col gap-2">
            {saved.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 rounded-lg bg-zinc-50 px-2.5 py-2">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#EBE8F3]">
                  <s.icon size={13} className="text-[#5C3D97]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-medium text-zinc-800">{s.label}</p>
                  <p className="text-[9.5px] text-zinc-400">{s.meta}</p>
                </div>
                <ArrowRight size={11} className="text-zinc-300" />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel
        title="Self-serve rate"
        right={
          <span className="flex items-center gap-1 rounded-md border border-zinc-200 px-2 py-1 text-[10px] text-emerald-700">
            <TrendUp size={11} /> +28% YoY
          </span>
        }
      >
        <div className="flex items-center gap-6">
          <div className="flex max-w-[440px] flex-1 items-end justify-between gap-3 px-1 pt-1">
            {quarters.map(([q, v], i) => (
              <div key={q} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-zinc-600">{v}%</span>
                <div
                  className={`w-full rounded-t-md ${i === quarters.length - 1 ? "bg-[#5C3D97]" : "bg-[#8b6bc7]"}`}
                  style={{ height: v * 0.8, opacity: 0.55 + i * 0.15 }}
                />
                <span className="text-[9px] text-zinc-400">{q}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2.5 border-l border-zinc-100 pl-6">
            {[
              ["Saved searches", "12"],
              ["Favorites", "28"],
              ["Reorders", "2 clicks"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-6">
                <p className="text-[10.5px] text-zinc-400">{k}</p>
                <p className="text-[12px] font-semibold text-zinc-900">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </Panel>
      <Caption>
        Live availability, alternatives, and full detail 24/7, a workspace that sharpens with every visit.
      </Caption>
    </DashShell>
  );
}

/* ── Procurement Control Tower ──────────────────────────────────────────────
   Dashboard 1 · Spend Intelligence, every system unified, opportunities
   quantified and scored (Visibility · Analysis). */
function SpendDashboard() {
  const sources = ["SAP", "Oracle", "D365", "Sheets"];
  const opp = (name: string, id: string) => (
    <div>
      <p className="font-medium text-zinc-900">{name}</p>
      <p className="text-[9.5px] text-zinc-400">{id}</p>
    </div>
  );
  return (
    <DashShell
      page="Spend Intelligence"
      controls={
        <>
          <Select>All sub-categories</Select>
          <AskLens />
        </>
      }
    >
      {/* Unified Visibility, one source of truth */}
      <LensPanel
        title="Lens Brief"
        headline="Scan covered 4 MRO categories and surfaced 29 opportunities, ranked by evidence strength. Scanned MRO, $109.3M of $761.6M indirect spend."
      >
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {sources.map((s) => (
            <span
              key={s}
              className="flex items-center gap-1 rounded-md border border-zinc-200 bg-white/80 px-2 py-1 text-[10px] font-medium text-zinc-600"
            >
              <CheckCircle size={10} weight="fill" className="text-emerald-500" /> {s}
            </span>
          ))}
          <ArrowRight size={11} className="text-zinc-400" />
          <span className="rounded-md bg-[#EBE8F3] px-2 py-1 text-[10px] font-medium text-[#5C3D97]">
            One source of truth
          </span>
        </div>
      </LensPanel>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
        <KpiTile value="$109.3M" label="Total MRO spend" />
        <KpiTile value="$44.7M" label="Addressable · contestable" />
        <KpiTile value="$2.18M–$3.52M" label="Savings potential" />
        <KpiTile value="29" label="Opportunities" />
        <KpiTile value="4 of 15" label="Categories scanned" />
      </div>

      {/* Intelligent Analysis, the opportunity feed */}
      <Panel title="Opportunities" right={<GhostBtn>High confidence ≥60% · 19</GhostBtn>}>
        <div className="-mt-1 mb-3 border-b border-zinc-100">
          <SegTabs
            items={[
              { label: "Feed", count: 26, active: true },
              { label: "Act", count: 3 },
              { label: "Parked", count: 1 },
              { label: "Rejected", count: 1 },
            ]}
          />
        </div>
        <MiniTable
          head={["Opportunity", "Lever", "Spend", "Vendors", "Confidence", "Savings"]}
          rows={[
            [
              opp("Consumable supplies", "OPP-011 · 3 days ago"),
              <Chip key="l" tone="zinc">Competitive RFP</Chip>,
              "$691K",
              "5",
              <ConfBar key="c" pct={82} />,
              <span key="s" className="font-medium text-zinc-900">$27k–36k</span>,
            ],
            [
              opp("Cutting tools", "OPP-014 · 5 days ago"),
              <Chip key="l" tone="zinc">Consolidation</Chip>,
              "$1.2M",
              "8",
              <ConfBar key="c" pct={76} />,
              <span key="s" className="font-medium text-zinc-900">$84k–120k</span>,
            ],
            [
              opp("Abrasives", "OPP-017 · 1 week ago"),
              <Chip key="l" tone="zinc">Tiered pricing</Chip>,
              "$438K",
              "4",
              <ConfBar key="c" pct={68} />,
              <span key="s" className="font-medium text-zinc-900">$22k–31k</span>,
            ],
            [
              opp("Safety equipment", "OPP-019 · 1 week ago"),
              <Chip key="l" tone="zinc">Contract merge</Chip>,
              "$310K",
              "3",
              <ConfBar key="c" pct={64} />,
              <span key="s" className="font-medium text-zinc-900">$14k–19k</span>,
            ],
          ]}
        />
      </Panel>
      <Caption>
        Every ERP, spreadsheet, and site in one source of truth, price variance, leakage, and missed discounts quantified, not guessed.
      </Caption>
    </DashShell>
  );
}

/* Dashboard 2 · Sourcing & Award — volume pooled into one competitive event,
   the award stays a human call, savings tracked live (Agentic · Planner ·
   Learning). */
function SourcingDashboard() {
  const bids = [
    { vendor: "Apex Fastening", price: "$0.49", delta: "−11% vs avg", best: true },
    { vendor: "Acme Industrial", price: "$0.53", delta: "−4% vs avg" },
    { vendor: "Corewell Supply", price: "$0.55", delta: "−2% vs avg" },
    { vendor: "Delta Fastener Co.", price: "$0.61", delta: "+9% vs avg" },
  ];
  const quarters = [
    ["Q1", 0.3],
    ["Q2", 0.7],
    ["Q3", 1.2],
    ["Q4", 1.8],
  ] as const;
  return (
    <DashShell
      page="Sourcing Event · Fasteners"
      controls={
        <>
          <Chip tone="green">4 of 4 bids in</Chip>
          <AskLens />
        </>
      }
    >
      {/* Agentic Actions, nine sites pooled into one event */}
      <LensPanel
        title="Lens Brief"
        headline="Nine sites bought fasteners separately, Lens pooled $12.4M of volume into one competitive event and drafted the award."
      />
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Panel title="Bids · normalized">
          <div className="flex flex-col gap-2">
            {bids.map((b) => (
              <div
                key={b.vendor}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 ${
                  b.best ? "bg-emerald-50 ring-1 ring-emerald-100" : "bg-zinc-50"
                }`}
              >
                <p className="text-[12px] font-medium text-zinc-900">{b.vendor}</p>
                <div className="flex items-center gap-3">
                  <p className="text-[10.5px] text-zinc-500">{b.delta}</p>
                  <p className="w-11 text-right text-[12.5px] font-semibold text-zinc-900">{b.price}</p>
                  {b.best ? <Chip tone="green">Best bid</Chip> : <span className="w-[56px]" />}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-zinc-100 pt-3">
            {["RFP drafted & sent", "Bids normalized", "Award drafted"].map((s) => (
              <span key={s} className="flex items-center gap-1.5 text-[10.5px] text-zinc-600">
                <CheckCircle size={12} weight="fill" className="text-emerald-500" /> {s}
              </span>
            ))}
          </div>
        </Panel>

        {/* Planner in the Loop, the award stays a human call */}
        <Panel title="Award approval" right={<Chip tone="amber">Awaiting review</Chip>}>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Best bid", "$0.49"],
              ["vs avg paid", "−11%"],
              ["Savings / yr", "$1.1M"],
              ["Term", "24 mo"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-zinc-50 px-2.5 py-2">
                <p className="text-[9.5px] text-zinc-400">{k}</p>
                <p className="mt-0.5 text-[12.5px] font-semibold text-zinc-900">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            {["Compliance screened", "Contract terms verified", "Vendor risk scored"].map((s) => (
              <span key={s} className="flex items-center gap-1.5 text-[10.5px] text-zinc-600">
                <CheckCircle size={12} weight="fill" className="text-emerald-500" /> {s}
              </span>
            ))}
          </div>
          <div className="mt-3.5 flex gap-2">
            <span className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-center text-[11px] font-medium text-white">
              Approve award
            </span>
            <span className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-center text-[11px] font-medium text-zinc-700">
              Adjust
            </span>
          </div>
        </Panel>
      </div>

      {/* Continuous Learning, a live savings engine */}
      <Panel
        title="Savings engine"
        right={
          <span className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-2 py-1 text-[10px] font-medium text-zinc-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live · refreshed hourly
          </span>
        }
      >
        <div className="flex items-center gap-6">
          <div className="flex max-w-[440px] flex-1 items-end justify-between gap-3 px-1 pt-1">
            {quarters.map(([q, v], i) => (
              <div key={q} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-zinc-600">${v}M</span>
                <div
                  className={`w-full rounded-t-md ${i === quarters.length - 1 ? "bg-[#5C3D97]" : "bg-[#8b6bc7]"}`}
                  style={{ height: v * 38, opacity: 0.55 + v * 0.25 }}
                />
                <span className="text-[9px] text-zinc-400">{q}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2.5 border-l border-zinc-100 pl-6">
            {[
              ["Analysis age", "12 min"],
              ["Maverick spend", "−38%"],
              ["Realized vs target", "104%"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-6">
                <p className="text-[10.5px] text-zinc-400">{k}</p>
                <p className="text-[12px] font-semibold text-emerald-600">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </Panel>
      <Caption>
        Sites stop buying alone, the company buys as one, people approve every award, and savings never go stale.
      </Caption>
    </DashShell>
  );
}

/* Per-tab dashboards — one per feature group. */
const DASHBOARDS: Record<string, React.ComponentType[]> = {
  central: [PlanningDashboard, BuyingDashboard],
  orders: [OrderTrackingDashboard, WorkspaceDashboard],
  procurement: [SpendDashboard, SourcingDashboard],
};

const DASH_MS = 9000;

/* Left-rail group item — icon + title; the active one reveals its one-line
   summary and its bottom divider doubles as the advance timer. */
function GroupItem({
  group,
  open,
  progressWidth,
  onSelect,
}: {
  group: FeatureGroup;
  open: boolean;
  progressWidth?: import("framer-motion").MotionValue<string>;
  onSelect: () => void;
}) {
  return (
    <div>
      <button
        onClick={onSelect}
        aria-expanded={open}
        className="group flex w-full items-center gap-3.5 pb-2.5 pt-5 text-left"
      >
        <group.icon
          size={22}
          className={`flex-shrink-0 transition-colors duration-300 ${
            open ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"
          }`}
        />
        <span
          className={`text-[19px] font-medium tracking-tight transition-colors duration-300 sm:text-[22px] ${
            open ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
          }`}
        >
          {group.name}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="desc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-xs pb-4 pl-9 text-[13.5px] leading-relaxed text-zinc-400">
              {group.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider, fills as the advance timer on the active item */}
      <div className="relative h-px w-full bg-white/10">
        {open && progressWidth && (
          <motion.div
            className="absolute inset-y-0 left-0 bg-white"
            style={{ width: progressWidth }}
          />
        )}
      </div>
    </div>
  );
}

const DASH_NATIVE_W = 1060;
const DASH_NATIVE_H = 720; // every DashShell is locked to this height

/* Renders a dashboard at its authored size (1060×720) and scales it to fill a
   parent that already has a fixed size, the deck stage. Scales by the parent's
   width; the stage's aspect ratio matches the native ratio, so the scaled
   dashboard fills it exactly. Like a placed image in Figma: it shrinks
   uniformly and never reflows or changes aspect ratio. */
function ScaledDashFill({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const measure = () => {
      const outer = outerRef.current;
      if (!outer) return;
      setScale(outer.clientWidth / DASH_NATIVE_W);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="h-full w-full">
      <div
        className="origin-top-left"
        style={{
          width: DASH_NATIVE_W,
          height: DASH_NATIVE_H,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* Stacked dashboard deck — the active screen up front, the next one waiting
   behind it, dimmed and offset to the bottom-right. When the timer runs out
   the back card glides forward to take the stage. */
function DashboardDeck({
  screens,
  active,
  tabKey,
}: {
  screens: React.ComponentType[];
  active: number;
  tabKey: string;
}) {
  const n = screens.length;
  const OFFSET = 30; // px the back card peeks down-right

  // Stable stack: every screen stays mounted and simply animates between the
  // "front" and "back" slots as `active` changes. The card in the back slot
  // glides up-left into the front (un-dimming) while the next screen fades in
  // behind it — a continuous, one-after-another advance rather than a
  // crossfade, and the internal panel cascade never replays mid-rotation.
  return (
    <div
      className="relative"
      style={{ paddingRight: OFFSET, paddingBottom: OFFSET }}
    >
      {/* Stage reserves the front card's footprint via a fixed aspect ratio;
          the cards are absolutely stacked inside it. */}
      <div
        className="relative w-full"
        style={{ aspectRatio: `${DASH_NATIVE_W} / ${DASH_NATIVE_H}` }}
      >
        {screens.map((Screen, i) => {
          const isFront = i === active;
          const isBack = i === (active + 1) % n;
          const shown = isFront || isBack;
          return (
            <motion.div
              key={`${tabKey}-${i}`}
              className="absolute inset-0"
              initial={false}
              animate={{
                x: isFront ? 0 : OFFSET,
                y: isFront ? 0 : OFFSET,
                opacity: shown ? 1 : 0,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: isFront ? 10 : 1, pointerEvents: isFront ? "auto" : "none" }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <ScaledDashFill>
                  <Screen />
                </ScaledDashFill>
                {/* Dim veil, fades away as this card takes the front slot */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl bg-black/60"
                  initial={false}
                  animate={{ opacity: isFront ? 0 : 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function IntelligenceLayer() {
  const [active, setActive] = useState(0);
  const [dashIdx, setDashIdx] = useState(0);
  const tab = TABS[active];
  const screens = DASHBOARDS[tab.key];

  // Auto-advance: step through this tab's dashboards, then roll on to the
  // next tab (section) once the last one's timer completes — so the whole
  // section cycles central → orders → procurement → central.
  const { progress, setPaused } = useAdvanceTimer(
    DASH_MS,
    () => {
      if (dashIdx + 1 < screens.length) {
        setDashIdx(dashIdx + 1);
      } else {
        setActive((a) => (a + 1) % TABS.length);
        setDashIdx(0);
      }
    },
    `${active}-${dashIdx}`,
  );
  const progressWidth = useTransform(progress, (p) => `${p * 100}%`);

  return (
    <section
      id="intelligence"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#050505] py-28"
    >
      {/* Aurora wash, official background asset from the Figma redesign */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/lens-aurora.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <h2 className="text-[34px] font-medium tracking-tight text-white sm:text-[44px]">
            The Navanta Lens
          </h2>
          <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-zinc-400">
            Our intelligence layer unifies your existing architecture, accelerating
            time-to-value without the $100M sunk cost.
          </p>

          {/* Tab pills */}
          <div className="mt-6 flex">
            <div className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setActive(i);
                    setDashIdx(0); // fresh tab starts on its first dashboard
                  }}
                  className={`rounded-full px-5 py-2.5 text-[14px] transition-colors ${
                    i === active
                      ? "bg-white font-medium text-zinc-900"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Left rail of groups · right stacked dashboard deck */}
        <FadeIn delay={0.1} className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.22 } }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:items-start"
            >
              {/* Rail, one item per dashboard */}
              <div className="flex flex-col lg:pt-2">
                {tab.groups.map((g, i) => (
                  <GroupItem
                    key={g.name}
                    group={g}
                    open={i === dashIdx}
                    progressWidth={i === dashIdx ? progressWidth : undefined}
                    onSelect={() => setDashIdx(i)}
                  />
                ))}
              </div>

              {/* Deck, active dashboard up front, the next waiting behind.
                  Hover-pause lives here, so only the dashboards freeze the
                  timer, not the rail or the surrounding space. */}
              <div
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <DashboardDeck screens={screens} active={dashIdx} tabKey={tab.key} />
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
}
