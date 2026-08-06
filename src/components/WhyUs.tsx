"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowsLeftRight,
  Database,
  Factory,
  Fan,
  Package,
  Truck,
  type Icon,
} from "@phosphor-icons/react";
import FadeIn from "./FadeIn";

/* ── Why Us — three pillars, one expanding row ──────────────────────────────
   Each pillar's infographic is a miniature product-UI vignette — panels,
   status chips, a toast — rather than an abstract graphic, so the section
   reads as proof from the product itself, sibling to the Outcomes mockups.
   All hand-built JSX/SVG on the site palette; no assets, no images. */

/* One easing for the whole choreography — card width, copy reveal, and the
   infographic responses ride the same curve so a hover reads as one motion.
   (The card's md:ease-[…] repeats it literally: variants can't be composed
   onto a const at scan time.) */
const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/* Status chip in the green tone the Outcomes mocks use for delivery states. */
function LiveChip({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 whitespace-nowrap rounded bg-[#E8F3EC] px-1.5 py-0.5 text-[10px] font-medium text-[#0C5840]">
      {children}
    </span>
  );
}

/* Frosted industry pill floating over the Domain vignette. Rests at a slight
   tilt and straightens while the card is expanded — its response beat. */
function IndustryChip({
  icon: Glyph,
  label,
  tilt,
  active,
  className,
}: {
  icon: Icon;
  label: string;
  tilt: string;
  active: boolean;
  className: string;
}) {
  return (
    <span
      /* hidden sm:flex — below sm the card is barely wider than the panel and
         the chips land on its text instead of floating around it. */
      className={`absolute z-10 hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-zinc-200/70 bg-white/80 px-3 py-1.5 text-[11px] font-medium text-zinc-700 shadow-[0_2px_10px_rgba(0,0,0,0.05)] backdrop-blur transition-transform duration-500 sm:flex ${EASE} motion-reduce:transition-none ${tilt} ${
        active ? "md:rotate-0" : ""
      } ${className}`}
    >
      <Glyph size={13} className="text-[#5C3D97]" />
      {label}
    </span>
  );
}

/* 1 · Domain Expertise — a "Systems Connected" panel with live integration
   rows, industries floating as frosted chips. Operators and engineers as one
   team, told through the surface they actually share. */
const DOMAIN_ROWS: { icon: Icon; label: string; status: string }[] = [
  { icon: Database, label: "SAP S/4HANA", status: "Synced" },
  { icon: Package, label: "Oracle WMS", status: "Synced" },
  { icon: ArrowsLeftRight, label: "EDI 850/856", status: "Mapped" },
  { icon: Truck, label: "Carrier APIs", status: "Live" },
];

function DomainVisual({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#F7F7F5] px-6">
      {/* Faint lavender glow so the white panel doesn't sit flat on the grey. */}
      <div
        className="absolute h-[240px] w-[240px] rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, #EBE8F3 0%, transparent 70%)" }}
      />
      <div className="relative w-full max-w-[280px] overflow-hidden rounded-xl border border-zinc-200/70 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between gap-2 border-b border-zinc-100 px-3.5 py-2.5">
          <p className="truncate text-[12px] font-medium text-zinc-900">Systems Connected</p>
          <span className="shrink-0 text-[10px] font-medium text-[#5C3D97]">30+</span>
        </div>
        <div className="space-y-1 p-2">
          {DOMAIN_ROWS.map((r) => (
            <div
              key={r.label}
              className="flex items-center justify-between gap-2 rounded-lg bg-zinc-50 px-2.5 py-2"
            >
              <span className="flex min-w-0 items-center gap-2 text-[12px] text-zinc-700">
                <r.icon size={13} className="shrink-0 text-zinc-400" />
                <span className="truncate">{r.label}</span>
              </span>
              <LiveChip>{r.status}</LiveChip>
            </div>
          ))}
        </div>
      </div>
      <IndustryChip icon={Fan} label="HVAC" tilt="rotate-[-4deg]" active={active} className="left-[6%] top-[13%]" />
      <IndustryChip icon={Factory} label="Manufacturing" tilt="rotate-[3deg]" active={active} className="right-[5%] top-[9%]" />
      <IndustryChip icon={Package} label="Logistics" tilt="rotate-[3deg]" active={active} className="bottom-[14%] left-[7%]" />
      <IndustryChip icon={Truck} label="Distribution" tilt="rotate-[-3deg]" active={active} className="bottom-[9%] right-[6%]" />
    </div>
  );
}

/* 2 · Data Intelligence — the Lens's nightly review: confidence donut, triage
   legend, and a released-action toast so "autonomous decisions" is shown
   leaving the system, not asserted. */
const DONUT_R = 45;
const DONUT_C = 2 * Math.PI * DONUT_R;

const LENS_SEGMENTS = [
  { label: "Auto-approved", pct: 62, color: "#5C3D97" },
  { label: "Planner review", pct: 24, color: "#8B72C7" },
  { label: "Deferred", pct: 10, color: "#C9BCE4" },
];

function LensVisual({ active }: { active: boolean }) {
  let consumed = 0;
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#F7F7F5] px-6">
      <div className="w-full max-w-[310px] overflow-hidden rounded-xl border border-zinc-200/70 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between gap-2 border-b border-zinc-100 px-3.5 py-2.5">
          <p className="truncate text-[12px] font-medium text-zinc-900">Lens — Nightly Review</p>
          <span className="shrink-0 text-[10px] text-zinc-400">734 SKUs</span>
        </div>
        <div className="flex items-center gap-4 p-4">
          {/* cqw cap keeps the donut inside the panel while a hovered sibling
              compresses this card. */}
          <div className="relative h-[min(110px,36cqw)] w-[min(110px,36cqw)] shrink-0">
            {/* A 12° nudge on expand — enough for the donut to feel alive
                without looping motion; gated anyway, it is pure decoration. */}
            <svg
              viewBox="0 0 120 120"
              className={`h-full w-full -rotate-90 transition-transform duration-500 ${EASE} motion-reduce:transition-none ${
                active ? "md:rotate-[-78deg]" : ""
              }`}
            >
              <circle cx="60" cy="60" r={DONUT_R} fill="none" stroke="#E4E4E7" strokeWidth="11" />
              {LENS_SEGMENTS.map((s) => {
                const len = (s.pct / 100) * DONUT_C;
                const offset = -((consumed / 100) * DONUT_C);
                consumed += s.pct;
                return (
                  <circle
                    key={s.label}
                    cx="60"
                    cy="60"
                    r={DONUT_R}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="11"
                    strokeDasharray={`${len} ${DONUT_C - len}`}
                    strokeDashoffset={offset}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[18px] font-medium leading-none text-zinc-900">92%</p>
              <p className="mt-1 hidden text-[9px] text-zinc-400 @min-[15rem]:block">confidence</p>
            </div>
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            {LENS_SEGMENTS.map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-1.5 text-[11.5px] text-zinc-600">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="truncate">{s.label}</span>
                </span>
                <span className="shrink-0 text-[11.5px] font-medium text-zinc-900">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* The decision leaving the system — overlaps the panel edge like a real
          toast. Capped + truncating so a compressed card can't push it out. */}
      <div className="absolute bottom-[9%] left-1/2 flex w-max max-w-[calc(100%-3rem)] -translate-x-1/2 items-center gap-2 rounded-lg border border-zinc-200/70 bg-white px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
        <p className="truncate text-[10.5px] text-zinc-700">
          Reorder released · SKU-432 · <span className="font-medium text-zinc-900">88%</span>
        </p>
      </div>
    </div>
  );
}

/* 3 · Outcome Based — the commercial model as a stat bento. The numbers
   deliberately repeat the chips below: the visual is the receipt for the
   claim. */
function OutcomeVisual({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#F7F7F5] px-6">
      <div className="grid w-full max-w-[310px] grid-cols-[1.15fr_1fr] gap-2">
        <div
          className="row-span-2 flex min-w-0 flex-col justify-between overflow-hidden rounded-xl bg-[#5C3D97] p-4"
          style={{
            /* Same faint top sheen the tab pills use — depth without a shadow. */
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 55%)",
          }}
        >
          <p className="text-[13px] font-medium text-white">Fees tied to outcomes</p>
          {/* cqw caps: the stats scale with the card instead of outgrowing
              their tiles while the flex-grow animation runs — the Outcomes
              mocks' container-unit trick. */}
          <p className="text-[min(50px,12cqw)] font-medium leading-none tracking-tight text-white">
            75%
          </p>
        </div>
        <div className="min-w-0 overflow-hidden rounded-xl bg-[#EBE8F3] p-3">
          <p className="text-[11px] font-medium text-[#5C3D97]/70">Time to launch</p>
          <p className="mt-1.5 text-[min(19px,5.5cqw)] font-medium leading-none text-[#5C3D97]">
            12–16 wks
          </p>
        </div>
        <div className="min-w-0 overflow-hidden rounded-xl border border-zinc-200/70 bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[10px] text-zinc-500">Fill rate</p>
            <p className="shrink-0 text-[10px] font-medium text-[#0C5840]">+4.2%</p>
          </div>
          <svg viewBox="0 0 96 34" className="mt-2 w-full overflow-visible">
            {/* The outcome materialises on expand: the area saturates, the line
                draws itself (pathLength=1 normalises the dash math), and the
                endpoint lands last. Drawn at rest below md — no hover there. */}
            <path
              d="M0,28 L14,24 L28,26 L42,18 L56,20 L70,10 L84,12 L96,5 L96,34 L0,34 Z"
              fill="#EBE8F3"
              className={`transition-opacity duration-700 ${active ? "" : "md:opacity-40"}`}
            />
            <path
              d="M0,28 L14,24 L28,26 L42,18 L56,20 L70,10 L84,12 L96,5"
              fill="none"
              stroke="#5C3D97"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              className={`[stroke-dasharray:1] transition-[stroke-dashoffset] duration-700 ${EASE} motion-reduce:transition-none ${
                active ? "" : "md:[stroke-dashoffset:1]"
              }`}
            />
            <circle
              cx="96"
              cy="5"
              r="2.5"
              fill="#5C3D97"
              className={`transition-opacity duration-300 ${
                active ? "md:delay-500" : "md:opacity-0"
              }`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Pillars ─────────────────────────────────────────────────────────────── */

type Pillar = {
  title: string;
  copy: string;
  chips: string[];
  visual: ComponentType<{ active: boolean }>;
};

const PILLARS: Pillar[] = [
  {
    title: "Domain Expertise",
    copy: "Navanta's team brings deep industry and function context, supply chain operators and AI engineers working as one.",
    chips: ["8+ industries", "30+ systems connected"],
    visual: DomainVisual,
  },
  {
    title: "Data Intelligence",
    copy: "Your data cleansed, unified, and reasoned over by the Lens, driving Agentic decisions and actions.",
    chips: ["734 SKUs reviewed / night", "50+ external signals"],
    visual: LensVisual,
  },
  {
    title: "Outcome Based",
    copy: "We put our fees where our forecasts are, the majority of Navanta's fee is tied to measured outcomes.",
    chips: ["75% fees tied to outcomes", "12–16 weeks to launch"],
    visual: OutcomeVisual,
  },
];

function PillarCard({
  pillar,
  active,
  onEnter,
  onLeave,
  onTap,
}: {
  pillar: Pillar;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onTap: () => void;
}) {
  const Visual = pillar.visual;
  return (
    <article
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onTap}
      /* flex-grow is the whole trick: with basis-0 the widths are purely
         grow-driven, so easing 1 → 1.7 expands this card and compresses its
         siblings in the same layout resolve. Explicit numbers in style keep
         both endpoints on one property, which is what makes the CSS
         transition reliable. Inert below md, where the column has no free
         space to distribute. */
      style={{ flexGrow: active ? 1.7 : 1 }}
      className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white md:basis-0 md:transition-[flex-grow] md:duration-500 md:ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      {/* Decorative on purpose: every load-bearing number in the vignette is
          restated by the copy and chips below. @container lets the vignettes
          size their fixed bits against the animating card width. */}
      <div
        aria-hidden
        className="relative h-[260px] shrink-0 overflow-hidden @container md:h-auto md:min-h-0 md:flex-1"
      >
        <div
          className={`absolute inset-0 transition-transform duration-500 ${EASE} motion-reduce:transition-none ${
            active ? "md:scale-[1.04]" : ""
          }`}
        >
          <Visual active={active} />
        </div>
      </div>

      <div className="px-6 pb-6 pt-5">
        <h3 className="text-[20px] font-medium text-zinc-900">{pillar.title}</h3>
        {/* 0fr → 1fr row reveal: the copy measures itself — no magic
            max-height numbers — and pushes the title up as it opens. Pinned
            open below md, where there is no hover to lean on. Tailwind v4's
            translate-y-* sets the `translate` property, hence the list. */}
        <div
          className={`grid grid-rows-[1fr] transition-[grid-template-rows,opacity,translate] duration-500 ${EASE} ${
            active ? "" : "md:translate-y-2 md:opacity-0 md:grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p className="mt-2 text-[14px] leading-relaxed text-zinc-500">{pillar.copy}</p>
            {/* pb-0.5: the fr track rounds subpixel while opening and can
                shave the chips' bottom edge — 2px of slack keeps it clean. */}
            <div className="mt-4 flex flex-wrap gap-2 pb-0.5">
              {pillar.chips.map((c) => (
                <span
                  key={c}
                  className="whitespace-nowrap rounded-full bg-[#EBE8F3] px-3 py-1 text-[12px] font-medium text-[#5C3D97]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WhyUs() {
  const [active, setActive] = useState<number | null>(null);

  /* Hover owns the state on pointer devices; a tap owns it on touch devices
     (iPads sit at md+, where hover never fires). Guarding both sides is what
     stops a desktop click from collapsing the card under the cursor — and a
     tap's emulated mouseenter from fighting the toggle. */
  const canHover = useRef(true);
  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  return (
    /* id="advantages" keeps the footer's /#advantages anchor alive now that
       the old Advantages section is gone. */
    <section id="advantages" className="bg-[#fafaf9] py-28">
      <div className="mx-auto max-w-[1560px] px-6 lg:px-10">
        <FadeIn>
          <h2 className="font-medium tracking-tight text-zinc-900">Why Us?</h2>
          <p className="mt-3 text-[16px] text-zinc-500">
            From day one, our methodology and solutions work together across three pillars
          </p>
        </FadeIn>

        {/* One FadeIn around the whole row — the cards must stay direct flex
            children for the grow transition to distribute widths. */}
        <FadeIn delay={0.1}>
          <div className="mt-12 flex flex-col gap-6 md:h-[500px] md:flex-row">
            {PILLARS.map((p, i) => (
              <PillarCard
                key={p.title}
                pillar={p}
                active={active === i}
                onEnter={() => canHover.current && setActive(i)}
                onLeave={() => canHover.current && setActive(null)}
                onTap={() => !canHover.current && setActive(active === i ? null : i)}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}