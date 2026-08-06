"use client";
import { Fragment, useState } from "react";
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
  UsersThree,
  ShoppingCart,
  Package,
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

/* Order Status card — a 1:1 reproduction of Figma node 850:13534 (Design System).
   The design's frame is 309.5x180, whose aspect matches CardMedia's 1203/700 slot to
   within 0.1px, so the card fills the slot exactly at any width and cannot clip.
   Everything is expressed in `--u`, where 1u == 1px in that frame, resolved against
   the card's own width with container query units.

   The step markers and connector rules are the design's own exported SVGs, committed
   under public/outcomes/order-status (the Figma asset URLs are served by the local Dev
   Mode server and would not survive a build). They carry geometry that CSS cannot
   approximate: the pending ring is #E8E8E8 at 0.98px, the dashed rules are black at
   0.3 opacity on a 2.59/2.59 dash, and the In Process -> Shipped gap carries a green
   rule sitting on top of the dashed one. Step columns are fixed to the design's own
   widths and separated by flex spacers, which is what makes the circle centres land
   on the design's deliberately uneven 76.9 / 80.9 / 78.9 spacing. */
const U = (n: number) => `calc(var(--u) * ${n})`;
const OS = "/outcomes/order-status";

const OS_STEPS = [
  { label: "Open", date: "Jan 14", done: true, w: 32, labelW: 31 },
  { label: "In Process", date: "Jan 16", done: true, w: 50, labelW: 50 },
  { label: "Shipped", date: "", done: false, w: 40, labelW: 40 },
  { label: "Delivered", date: "", done: false, w: 46, labelW: 46 },
];

/* Absolute rule offsets inside each gap, straight from the design. */
const OS_RULES: { src: string; x: number; w: number }[][] = [
  [{ src: "line54", x: -11.402, w: 68.242 }],
  [
    { src: "line55", x: -17.602, w: 55.128 },
    { src: "line56", x: -25.246, w: 43.277 },
  ],
  [{ src: "line57", x: -13.211, w: 51.988 }],
];

function OsDoneMark() {
  return (
    <div className="relative shrink-0" style={{ width: U(32), height: U(32) }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${OS}/ellipse.svg`}
        alt=""
        aria-hidden
        className="absolute block max-w-none"
        style={{ left: U(5.107), top: U(5.11), width: U(21.782), height: U(21.782) }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${OS}/check.svg`}
        alt=""
        aria-hidden
        className="absolute block max-w-none"
        style={{ left: U(12.42), top: U(13.535), width: U(7.3), height: U(5.334) }}
      />
    </div>
  );
}

function OsPendingMark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${OS}/radio-empty.svg`}
      alt=""
      aria-hidden
      className="block max-w-none shrink-0"
      style={{ width: U(32), height: U(32) }}
    />
  );
}

function OsGap({ rules }: { rules: { src: string; x: number; w: number }[] }) {
  return (
    <div className="relative min-w-px flex-1" style={{ height: U(22.835) }}>
      {rules.map((r) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={r.src}
          src={`${OS}/${r.src}.svg`}
          alt=""
          aria-hidden
          className="absolute block max-w-none"
          style={{ left: U(r.x), top: U(17.414), width: U(r.w), height: U(1) }}
        />
      ))}
    </div>
  );
}

function OrderStatusMock() {
  return (
    <div className="@container h-full w-full">
      <div
        className="flex h-full w-full flex-col items-start bg-white"
        style={
          {
            "--u": "calc(100cqw / 309.5)",
            gap: U(12),
            paddingBottom: U(8.304),
            borderRadius: U(8),
            filter: `drop-shadow(0 0 ${U(0.5)} rgba(0,0,0,0.15)) drop-shadow(0 0 ${U(10)} rgba(0,0,0,0.04))`,
          } as React.CSSProperties
        }
      >
        <div
          className="flex w-full shrink-0 items-center justify-between whitespace-nowrap border-b border-[#EEEEEE] font-medium text-[#181A1B]"
          style={{
            height: U(40),
            paddingInline: U(12),
            fontSize: U(12),
            lineHeight: U(15),
            borderBottomWidth: U(1),
          }}
        >
          <p>Order Status</p>
          <p>4 Items</p>
        </div>

        <div
          className="flex min-h-px w-full flex-1 flex-col items-start justify-center"
          style={{ gap: U(16) }}
        >
          <div className="w-full shrink-0" style={{ paddingInline: U(8) }}>
            <div
              className="flex w-full items-start"
              style={{ gap: U(6.228), paddingInline: U(8.835) }}
            >
              {OS_STEPS.map((s, i) => (
                <Fragment key={s.label}>
                  {i > 0 && <OsGap rules={OS_RULES[i - 1]} />}
                  <div
                    className="flex shrink-0 flex-col items-center"
                    style={{ width: U(s.w) }}
                  >
                    {s.done ? <OsDoneMark /> : <OsPendingMark />}
                    <div
                      className="flex flex-col items-center whitespace-nowrap"
                      style={{
                        width: U(s.labelW),
                        gap: U(4),
                        fontSize: U(10),
                        lineHeight: 1.4,
                      }}
                    >
                      <p
                        className={`text-center font-medium ${
                          s.done ? "text-black" : "text-[#858585]"
                        }`}
                      >
                        {s.label}
                      </p>
                      {s.date && <p className="text-[#4C4C4C]">{s.date}</p>}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="w-full shrink-0" style={{ paddingInline: U(12) }}>
            <div
              className="flex w-full items-center whitespace-nowrap bg-[#E8F3EC]"
              style={{
                gap: U(3.93),
                padding: U(8),
                borderRadius: U(8),
                fontSize: U(10),
                lineHeight: 1.4,
              }}
            >
              <p className="font-medium text-[#0C5840]">Order ETA:</p>
              <p className="text-black">Feb 1, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Claim card — a 1:1 reproduction of Figma node 850:13600 (Design System). Same
   309.5x180 frame and the same `--u` container-query scaling as the Order Status card
   above, so it fills CardMedia's slot exactly and cannot clip. The part photo and the
   verified-badge glyphs are the design's own exported assets, committed under
   public/outcomes/claims. `max-w-none` is required on every one of them: Tailwind's
   preflight `img { max-width: 100% }` would otherwise clamp them to their container. */
const CL = "/outcomes/claims";

const CLAIM_ROWS = [
  { label: "Part Number", value: "TRN-87432", verified: false },
  { label: "Part Match", value: "Matched", verified: true },
  { label: "Warranty Check", value: "Eligible", verified: true },
  { label: "Coverage Available", value: "100%", verified: false },
];

/* 6u green dot with the design's 2.696x1.97 tick sitting on it. */
function ClaimTick() {
  return (
    <span
      className="relative block shrink-0"
      style={{ width: U(6), height: U(6) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${CL}/dot.svg`}
        alt=""
        aria-hidden
        className="absolute inset-0 block max-w-none"
        style={{ width: U(6), height: U(6) }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${CL}/dot-check.svg`}
        alt=""
        aria-hidden
        className="absolute block max-w-none"
        style={{ left: U(1.705), top: U(2.119), width: U(2.696), height: U(1.97) }}
      />
    </span>
  );
}

function ClaimMock() {
  return (
    <div className="@container h-full w-full">
      <div
        className="flex h-full w-full flex-col items-start bg-white"
        style={
          {
            "--u": "calc(100cqw / 309.5)",
            gap: U(12),
            paddingBottom: U(12),
            borderRadius: U(8),
            filter: `drop-shadow(0 0 ${U(0.5)} rgba(0,0,0,0.15)) drop-shadow(0 0 ${U(10)} rgba(0,0,0,0.04))`,
          } as React.CSSProperties
        }
      >
        <div
          className="flex w-full shrink-0 items-center whitespace-nowrap border-b border-[#EEEEEE] font-medium text-[#181A1B]"
          style={{
            height: U(40),
            paddingInline: U(12),
            fontSize: U(12),
            lineHeight: U(15),
            borderBottomWidth: U(1),
          }}
        >
          <p>Claim #CLM-9213</p>
        </div>

        <div
          className="flex min-h-px w-full flex-1 items-start"
          style={{ paddingInline: U(12), gap: U(8.835) }}
        >
          <div
            className="relative shrink-0"
            style={{ width: U(111.297), height: U(116), borderRadius: U(4) }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${CL}/part.png`}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 block size-full max-w-none object-cover"
              style={{
                borderRadius: U(4),
                /* part.png is a transparent cutout — 57% of it is fully transparent —
                   so the design's shadow has to follow the object's alpha. A
                   box-shadow on the wrapper draws a rectangle around empty space;
                   drop-shadow() traces the silhouette. */
                filter: `drop-shadow(0 ${U(2)} ${U(4)} rgba(0,0,0,0.25))`,
              }}
            />
          </div>

          <div
            className="flex h-full min-w-px flex-1 flex-col items-start"
            style={{ gap: U(6) }}
          >
            {CLAIM_ROWS.map((r) => (
              <div
                key={r.label}
                className="flex min-h-px w-full flex-1 flex-col justify-center bg-[#F5F5F5]"
                style={{
                  paddingInline: U(8),
                  paddingBlock: U(3.93),
                  borderRadius: U(4),
                }}
              >
                <div
                  className="flex w-full shrink-0 items-center justify-between whitespace-nowrap"
                  style={{ fontSize: U(7.86), lineHeight: 1.4 }}
                >
                  <p className="font-normal text-[#424242]">{r.label}</p>
                  {r.verified ? (
                    <span className="flex shrink-0 items-center" style={{ gap: U(2) }}>
                      <ClaimTick />
                      <p className="font-medium text-black">{r.value}</p>
                    </span>
                  ) : (
                    <p className="font-medium text-black">{r.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Purchase Rate card — a 1:1 reproduction of Figma node 850:13648 (Design System).
   Same 309.5x180 frame and `--u` scaling as the cards above. The area chart is the
   design's own exported SVG; the design applies a vertical flip to it, hence scaleY(-1),
   and the image is inset very slightly past its box (right -0.11%, bottom -0.7%) exactly
   as the design has it. The first two stat tiles are fixed-width (77u, 74u) and the
   third takes the remainder, which is what lines them up on 12 / 95 / 175. */
const RV = "/outcomes/revenue";

function PurchaseRateMock() {
  return (
    <div className="@container h-full w-full">
      <div
        className="flex h-full w-full flex-col items-start bg-white"
        style={
          {
            "--u": "calc(100cqw / 309.5)",
            gap: U(12),
            paddingBottom: U(12),
            borderRadius: U(8),
            filter: `drop-shadow(0 0 ${U(0.5)} rgba(0,0,0,0.15)) drop-shadow(0 0 ${U(10)} rgba(0,0,0,0.04))`,
          } as React.CSSProperties
        }
      >
        <div
          className="flex w-full shrink-0 items-center justify-between whitespace-nowrap border-b border-[#EEEEEE] font-medium text-[#181A1B]"
          style={{
            height: U(40),
            paddingInline: U(12),
            fontSize: U(12),
            lineHeight: U(15),
            borderBottomWidth: U(1),
          }}
        >
          <p>Purchase Rate</p>
          <p>42%</p>
        </div>

        <div
          className="flex min-h-px w-full flex-1 flex-col items-start"
          style={{ gap: U(12) }}
        >
          <div
            className="min-h-px w-full flex-1"
            style={{ paddingInline: U(12) }}
          >
            {/* The design applies a vertical flip to the chart group, which puts the
                area's flat baseline at the bottom. Set as an inline transform because
                Tailwind v4 does not emit a rule for `-scale-y-100`. */}
            <div className="relative h-full w-full" style={{ transform: "scaleY(-1)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${RV}/chart.svg`}
                alt=""
                aria-hidden
                className="absolute block max-w-none"
                style={{ inset: `0 -0.11% -0.7% 0`, width: "100.11%", height: "100.7%" }}
              />
            </div>
          </div>

          <div
            className="flex w-full shrink-0 items-start"
            style={{ paddingInline: U(12), gap: U(6) }}
          >
            <div
              className="flex shrink-0 flex-col items-start bg-[#F5F5F5]"
              style={{ width: U(77), padding: U(8), borderRadius: U(5.895) }}
            >
              <div
                className="flex w-full flex-col items-start whitespace-nowrap"
                style={{ gap: U(3.93), fontSize: U(7.86), lineHeight: 1.4 }}
              >
                <p className="font-normal text-[#424242]">Overall Orders</p>
                <p className="font-medium text-black">34</p>
              </div>
            </div>

            <div
              className="flex shrink-0 flex-col items-start bg-[#F5F5F5]"
              style={{ width: U(74), padding: U(8), borderRadius: U(5.895) }}
            >
              <div
                className="flex w-full flex-col items-start whitespace-nowrap"
                style={{ gap: U(3.93), fontSize: U(7.86), lineHeight: 1.4 }}
              >
                <p className="font-normal text-[#424242]">Revenue</p>
                <p className="font-medium text-black">$68.2K</p>
              </div>
            </div>

            <div
              className="flex min-w-px flex-1 flex-col items-start bg-[#F5F5F5]"
              style={{ padding: U(8), borderRadius: U(5.895) }}
            >
              <div
                className="flex w-full flex-col items-start whitespace-nowrap"
                style={{ gap: U(3.93), fontSize: U(7.86), lineHeight: 1.4 }}
              >
                <p className="font-normal text-[#424242]">Purchase Increase</p>
                <span className="flex items-center" style={{ gap: U(2) }}>
                  <span
                    className="relative block shrink-0"
                    style={{ width: U(6), height: U(6) }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${RV}/dot.svg`}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 block max-w-none"
                      style={{ width: U(6), height: U(6) }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${RV}/arrow-up.svg`}
                      alt=""
                      aria-hidden
                      className="absolute block max-w-none"
                      style={{ left: U(1.912), top: U(1.704), width: U(2.178), height: U(2.592) }}
                    />
                  </span>
                  <p className="font-medium text-black">8% vs last week</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Automation Overview card — a 1:1 reproduction of Figma node 850:13693. Four 24.5u
   rows on a 6u gap, each with an 8u Phosphor-style glyph exported from the design
   (#343330) whose vector sits at the design's own inset inside that 8u box. */
const AU = "/outcomes/automation";

const AU_ROWS = [
  { icon: "clipboard", label: "Order Status Updates", x: 1.125, y: 0.375, w: 5.75, h: 7 },
  { icon: "bell", label: "Order Notifications", x: 0.875, y: 0.625, w: 6.249, h: 6.751 },
  { icon: "callbell", label: "Escalations", x: 0.375, y: 0.625, w: 7.25, h: 6.25 },
  { icon: "file", label: "Create Case", x: 1.125, y: 0.625, w: 5.75, h: 6.75 },
];

function AutomationMock() {
  return (
    <div className="@container h-full w-full">
      <div
        className="flex h-full w-full flex-col items-start bg-white"
        style={
          {
            "--u": "calc(100cqw / 309.5)",
            gap: U(12),
            paddingBottom: U(12),
            borderRadius: U(8),
            filter: `drop-shadow(0 0 ${U(0.5)} rgba(0,0,0,0.15)) drop-shadow(0 0 ${U(10)} rgba(0,0,0,0.04))`,
          } as React.CSSProperties
        }
      >
        <div
          className="flex w-full shrink-0 items-center whitespace-nowrap border-b border-[#EEEEEE] font-medium text-[#181A1B]"
          style={{
            height: U(40),
            paddingInline: U(12),
            fontSize: U(12),
            lineHeight: U(15),
            borderBottomWidth: U(1),
          }}
        >
          <p>Automation Overview</p>
        </div>

        <div
          className="flex min-h-px w-full flex-1 items-start"
          style={{ paddingInline: U(12) }}
        >
          <div
            className="flex h-full min-w-px flex-1 flex-col items-start"
            style={{ gap: U(6) }}
          >
            {AU_ROWS.map((r) => (
              <div
                key={r.label}
                className="flex min-h-px w-full flex-1 flex-col justify-center bg-[#F5F5F5]"
                style={{
                  paddingInline: U(12),
                  paddingBlock: U(3.93),
                  borderRadius: U(5.895),
                }}
              >
                <div
                  className="flex w-full shrink-0 items-start justify-between whitespace-nowrap"
                  style={{ fontSize: U(7.86), lineHeight: 1.4 }}
                >
                  <span className="flex shrink-0 items-center" style={{ gap: U(4) }}>
                    <span
                      className="relative block shrink-0"
                      style={{ width: U(8), height: U(8) }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${AU}/${r.icon}.svg`}
                        alt=""
                        aria-hidden
                        className="absolute block max-w-none"
                        style={{ left: U(r.x), top: U(r.y), width: U(r.w), height: U(r.h) }}
                      />
                    </span>
                    <p className="font-normal text-[#292929]">{r.label}</p>
                  </span>
                  <p className="font-medium text-[#008234]">Automated</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Inventory Optimization mockups ──────────────────────────────────
   Rebuilt as table views in the Procurement tab's design language, so all three
   tabs read as one system: the 240.5-wide frame, the 25u header (30u with a
   dropdown pill), 6.5u semibold column heads over 7u regular cells on 20u rows,
   the exported gradient bars, and the design's status chips.

   No Figma node exists for these four, so the content is still authored here —
   only the chrome and typography come from the design system. Confidence values
   are set to the percentages the design exports bars for (88 / 84 / 81 / 75) so
   the bar fill and its label always agree. ──────────────────────────────────── */

/** Status chip in the design's three tones. */
function PChip({ tone, children }: { tone: "good" | "warn" | "flat"; children: React.ReactNode }) {
  const tones = {
    good: { background: "#E5FFD7", color: "#1D4514" },
    warn: { background: "#FFF4E7", color: "#A64E25" },
    flat: { background: "#E7E7E7", color: "#000000" },
  } as const;
  return (
    <span
      className="flex shrink-0 items-center justify-center whitespace-nowrap font-medium"
      style={{
        ...tones[tone],
        paddingInline: U(3),
        paddingBlock: U(1),
        borderRadius: U(2),
        fontSize: U(5.5),
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  );
}

/* 1 · One view, every location */
const NETWORK_TABLE = [
  { loc: "DC-Chicago", onHand: "4.2K", demand: "+12%", pos: "3" },
  { loc: "DC-Columbus", onHand: "6.8K", demand: "−4%", pos: "1" },
  { loc: "Store-042", onHand: "320", demand: "+8%", pos: "2" },
  { loc: "Store-118", onHand: "640", demand: "+6%", pos: "1" },
];

function NetworkViewMock() {
  return (
    <PFrame title="Network Overview" gap={2.209} pb={8.304}>
      <div
        className="flex w-full shrink-0 items-start"
        style={{ paddingInline: U(8), gap: U(8.835) }}
      >
        <div
          className="flex min-w-px flex-1 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Location</PTh>
          {NETWORK_TABLE.map((r, i) => (
            <PTd key={i}>{r.loc}</PTd>
          ))}
        </div>
        <div
          className="flex shrink-0 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>On-hand</PTh>
          {NETWORK_TABLE.map((r, i) => (
            <PTd key={i}>{r.onHand}</PTd>
          ))}
        </div>
        <div
          className="flex shrink-0 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Demand 7d</PTh>
          {NETWORK_TABLE.map((r, i) => (
            <PTd key={i}>{r.demand}</PTd>
          ))}
        </div>
        <div
          className="flex shrink-0 flex-col items-center"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>POs</PTh>
          {NETWORK_TABLE.map((r, i) => (
            <PTd key={i}>{r.pos}</PTd>
          ))}
        </div>
      </div>
    </PFrame>
  );
}

/* 2 · Higher fill rates — chart + tiles, mirroring the Expedite Impact layout */
const FILL_WEEKS = [88, 90, 89, 92, 93, 94, 95, 96];

const FILL_TILES: { label: string; value: string }[] = [
  { label: "Adjustments", value: "3" },
  { label: "Stockouts", value: "0" },
  { label: "Turns", value: "6.1×" },
];

function FillRateMock() {
  return (
    <PFrame title="Fill Rate" pill="Trailing 8 wks" gap={2.209} pb={8.304}>
      <div className="flex min-h-px w-full flex-1 flex-col items-start justify-between">
        <div
          className="flex w-full shrink-0 items-start"
          style={{ height: U(53), paddingTop: U(7), paddingInline: U(8), gap: U(10) }}
        >
          <div
            className="flex min-w-px flex-1 flex-col items-start justify-center whitespace-nowrap"
            style={{ gap: U(2), paddingLeft: U(2) }}
          >
            <p className="font-normal text-black" style={{ fontSize: U(6), lineHeight: 1.4 }}>
              Network Fill Rate
            </p>
            <p className="font-medium text-black" style={{ fontSize: U(12), lineHeight: 1.4 }}>
              96.4%
            </p>
            <p className="font-medium text-[#0B6E4E]" style={{ fontSize: U(6), lineHeight: 1.4 }}>
              Self-tuned to demand
            </p>
          </div>

          <div
            className="flex min-w-px flex-1 flex-col items-start justify-end"
            style={{ height: "100%", paddingInline: U(3) }}
          >
            <div className="flex w-full items-end" style={{ height: U(45.203), gap: U(2) }}>
              {FILL_WEEKS.map((v, i) => (
                <div
                  key={i}
                  className="min-w-px flex-1"
                  style={{
                    height: `${((v - 82) / 16) * 100}%`,
                    borderRadius: U(1),
                    background:
                      i === FILL_WEEKS.length - 1
                        ? "#7A55C0"
                        : "linear-gradient(to bottom, #C3ADEE, #D1B9FF)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex w-full shrink-0 items-start"
          style={{ paddingInline: U(8), gap: U(6) }}
        >
          {FILL_TILES.map((t) => (
            <div
              key={t.label}
              className="flex min-w-px flex-1 flex-col items-start bg-[#F5F5F5]"
              style={{ paddingInline: U(5.895), paddingBlock: U(3.93), borderRadius: U(4) }}
            >
              <div
                className="flex w-full shrink-0 flex-col items-start whitespace-nowrap text-black"
                style={{ gap: U(3.93) }}
              >
                <p className="font-normal" style={{ fontSize: U(6), lineHeight: 1.4 }}>
                  {t.label}
                </p>
                <p className="font-medium" style={{ fontSize: U(8), lineHeight: 1.4 }}>
                  {t.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PFrame>
  );
}

/* 3 · Decisions in days */
const QUEUE_TABLE: {
  product: string;
  scope: string;
  conf: string;
  bar: string;
  action: string;
}[] = [
  { product: "SKU-432", scope: "240 units", conf: "88%", bar: "bar-88", action: "Reorder" },
  { product: "SKU-344", scope: "3 stores", conf: "84%", bar: "bar-84", action: "Reorder" },
  { product: "SKU-332", scope: "80 units", conf: "81%", bar: "bar-81", action: "Reorder" },
  { product: "SKU-324", scope: "2 stores", conf: "75%", bar: "bar-75", action: "Reorder" },
];

/* Dropdown-style "Reorder ⌄" pill for the action column — light border,
   caret trailing, matches the site's neutral input surface. */
function PActionPill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center whitespace-nowrap rounded-md border border-solid border-[#E5E7EB] bg-white font-medium text-[#181A1B]"
      style={{
        gap: U(4),
        paddingInline: U(6),
        paddingBlock: U(3),
        fontSize: U(7),
        lineHeight: 1.2,
        borderWidth: U(0.5),
      }}
    >
      {label}
      {/* Inline chevron — an SVG on a square viewBox renders crisply at these
          tiny sizes, unlike the imported asset which fudges its own aspect. */}
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: U(7), height: U(7) }}
      >
        <path d="M3 4.5 L6 7.5 L9 4.5" />
      </svg>
    </span>
  );
}

function ActionQueueMock() {
  return (
    <PFrame title="Stocking Actions" gap={2.209} pb={8.304}>
      <div
        className="flex w-full shrink-0 items-start"
        style={{ paddingInline: U(8), gap: U(8.835) }}
      >
        <div
          className="flex min-w-px flex-1 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Product</PTh>
          {QUEUE_TABLE.map((r, i) => (
            <PTd key={i}>{r.product}</PTd>
          ))}
        </div>
        <div
          className="flex shrink-0 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Scope</PTh>
          {QUEUE_TABLE.map((r, i) => (
            <PTd key={i}>{r.scope}</PTd>
          ))}
        </div>
        <div
          className="flex shrink-0 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Confidence</PTh>
          {QUEUE_TABLE.map((r, i) => (
            <PTd key={i} raw>
              <span className="flex items-center" style={{ gap: U(8) }}>
                <PBar src={r.bar} />
                <p
                  className="whitespace-nowrap font-normal text-black"
                  style={{ fontSize: U(7), lineHeight: 1.4 }}
                >
                  {r.conf}
                </p>
              </span>
            </PTd>
          ))}
        </div>
        <div
          className="flex shrink-0 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Action</PTh>
          {QUEUE_TABLE.map((r, i) => (
            <PTd key={i} raw>
              <PActionPill label={r.action} />
            </PTd>
          ))}
        </div>
      </div>
    </PFrame>
  );
}

/* 4 · Higher turns, lower cost */
const REBALANCE_TABLE: {
  move: string;
  units: string;
  cost: string;
  state: string;
  tone: "good" | "flat";
}[] = [
  { move: "Columbus → Chicago", units: "240", cost: "$0.49/u", state: "Released", tone: "good" },
  { move: "Auto-PO · Acme", units: "500", cost: "$0.53/u", state: "Auto", tone: "good" },
  { move: "Chicago → Store-042", units: "120", cost: "$0.51/u", state: "Released", tone: "good" },
  { move: "Auto-PO · Corewell", units: "300", cost: "$0.55/u", state: "Queued", tone: "flat" },
];

function RebalanceMock() {
  return (
    <PFrame title="Rebalance & Reorder" pill="Automated" gap={2.209} pb={8.304}>
      <div
        className="flex w-full shrink-0 items-start"
        style={{ paddingInline: U(8), gap: U(8.835) }}
      >
        <div
          className="flex min-w-px flex-1 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh h={18}>Movement</PTh>
          {REBALANCE_TABLE.map((r, i) => (
            <PTd key={i} h={18}>
              {r.move}
            </PTd>
          ))}
        </div>
        <div
          className="flex shrink-0 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh h={18}>Units</PTh>
          {REBALANCE_TABLE.map((r, i) => (
            <PTd key={i} h={18}>
              {r.units}
            </PTd>
          ))}
        </div>
        <div
          className="flex shrink-0 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh h={18}>Cost</PTh>
          {REBALANCE_TABLE.map((r, i) => (
            <PTd key={i} h={18}>
              {r.cost}
            </PTd>
          ))}
        </div>
        <div
          className="flex shrink-0 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh h={18}>Status</PTh>
          {REBALANCE_TABLE.map((r, i) => (
            <PTd key={i} h={18} raw>
              <PChip tone={r.tone}>{r.state}</PChip>
            </PTd>
          ))}
        </div>
      </div>
    </PFrame>
  );
}

/* ── Procurement Optimization mockups ────────────────────────────────
   1:1 reproductions of Figma nodes 986:10994 / 11059 / 11119 / 11173.

   These use their own 240.5-wide frame (not the 309.5 of the Customer Engagement
   cards), so `--u` here is 1px of a 240.5 frame. The frames are 139.5-140 tall,
   an aspect of ~1.718 that matches CardMedia's 1203/700 slot to within a pixel,
   so they fill it exactly and cannot clip. Unlike the Customer cards these carry
   no drop-shadow — the design doesn't specify one.

   The designs call for Geist via `var(--font/family/portal)`. Geist is not a
   dependency here, so these render in the project's Inter; at the 5.5-8u sizes
   involved the two are practically indistinguishable. Everything else — sizes,
   spacing, colours, the exported bar/icon/chart SVGs — is the design's own. ─── */
const PR = "/outcomes/procurement";

/** Header pill (`All Categories` / `This Year`) with the design's caret. */
function PPill({ label }: { label: string }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center whitespace-nowrap border-solid border-[#D8D8D8]"
      style={{
        borderWidth: U(0.5),
        borderRadius: U(4),
        paddingInline: U(8),
        paddingBlock: U(4),
        gap: U(5),
        fontSize: U(7),
        lineHeight: U(9),
      }}
    >
      <span className="font-medium text-[#181A1B]">{label}</span>
      <span className="relative block shrink-0" style={{ width: U(8), height: U(8) }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${PR}/caret-down.svg`}
          alt=""
          aria-hidden
          className="absolute block max-w-none"
          style={{ left: U(1.124), top: U(2.624), width: U(5.752), height: U(3.252) }}
        />
      </span>
    </span>
  );
}

/** Frame + bordered header. The header is 25u without a pill and 30u with one. */
function PFrame({
  title,
  pill,
  gap,
  pb,
  children,
}: {
  title: string;
  pill?: string;
  gap: number;
  pb: number;
  children: React.ReactNode;
}) {
  return (
    <div className="@container h-full w-full">
      <div
        className="flex h-full w-full flex-col items-start bg-white"
        style={
          {
            "--u": "calc(100cqw / 240.5)",
            gap: U(gap),
            paddingBottom: U(pb),
            borderRadius: U(7.965),
          } as React.CSSProperties
        }
      >
        <div
          className={`flex w-full shrink-0 items-center border-b border-solid border-[#EEEEEE] ${
            pill ? "justify-between" : ""
          }`}
          style={{
            height: U(pill ? 30 : 25),
            paddingInline: U(12),
            borderBottomWidth: U(1),
          }}
        >
          <p
            className="whitespace-nowrap font-medium text-[#181A1B]"
            style={{ fontSize: U(10), lineHeight: U(12) }}
          >
            {title}
          </p>
          {pill ? <PPill label={pill} /> : null}
        </div>
        {children}
      </div>
    </div>
  );
}

/** Table column header cell — 6.5u semibold. */
function PTh({ children, h = 20 }: { children: React.ReactNode; h?: number }) {
  return (
    <div className="flex shrink-0 items-center" style={{ height: U(h) }}>
      <p
        className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-black"
        style={{ fontSize: U(6.5), lineHeight: 1.4 }}
      >
        {children}
      </p>
    </div>
  );
}

/** Table body cell — 7u regular. */
function PTd({
  children,
  h = 20,
  raw = false,
}: {
  children: React.ReactNode;
  h?: number;
  raw?: boolean;
}) {
  return (
    <div className="flex w-full shrink-0 items-center" style={{ height: U(h) }}>
      {raw ? (
        children
      ) : (
        <p
          className="whitespace-nowrap font-normal text-black"
          style={{ fontSize: U(7), lineHeight: 1.4 }}
        >
          {children}
        </p>
      )}
    </div>
  );
}

/** 33.25u confidence/share bar — the exported SVG bleeds 1u past its box. */
function PBar({ src }: { src: string }) {
  return (
    <span className="relative block shrink-0" style={{ width: U(33.25), height: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${PR}/${src}.svg`}
        alt=""
        aria-hidden
        className="absolute block max-w-none"
        style={{ left: U(-1.001), top: U(-1), width: U(35.25), height: U(2) }}
      />
    </span>
  );
}

/* 1 · Confidence-graded POs — node 986:10994 */
const PO_TABLE = [
  { po: "PO-78291", vendor: "Acme Industries", conf: "88%", bar: "bar-88" },
  { po: "PO-78292", vendor: "Global Components", conf: "84%", bar: "bar-84" },
  { po: "PO-78293", vendor: "Prime Supplies", conf: "81%", bar: "bar-81" },
  { po: "PO-78293", vendor: "Prime Supplies", conf: "81%", bar: "bar-81" },
];

function PoConfidenceMock() {
  return (
    <PFrame title="Purchase Orders" gap={2.209} pb={8.304}>
      <div
        className="flex w-full shrink-0 items-start"
        style={{ paddingInline: U(8), gap: U(8.835) }}
      >
        <div
          className="flex shrink-0 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>PO #</PTh>
          {PO_TABLE.map((r, i) => (
            <PTd key={i}>{r.po}</PTd>
          ))}
        </div>
        <div
          className="flex min-w-px flex-1 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Vendor</PTh>
          {PO_TABLE.map((r, i) => (
            <PTd key={i}>{r.vendor}</PTd>
          ))}
        </div>
        <div
          className="flex shrink-0 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Confidence</PTh>
          {PO_TABLE.map((r, i) => (
            <PTd key={i} raw>
              <span className="flex items-center" style={{ gap: U(8) }}>
                <PBar src={r.bar} />
                <p
                  className="whitespace-nowrap font-normal text-black"
                  style={{ fontSize: U(7), lineHeight: 1.4 }}
                >
                  {r.conf}
                </p>
              </span>
            </PTd>
          ))}
        </div>
        <div
          className="flex shrink-0 flex-col items-center"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Action</PTh>
          {PO_TABLE.map((_, i) => (
            <PTd key={i} raw>
              <span
                className="flex shrink-0 items-center border-solid border-[#DCDCDB]"
                style={{ borderWidth: U(0.5), borderRadius: U(3), padding: U(2) }}
              >
                <span className="relative block shrink-0" style={{ width: U(8), height: U(8) }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${PR}/dots.svg`}
                    alt=""
                    aria-hidden
                    className="absolute block max-w-none"
                    style={{ left: U(3.5), top: U(1.375), width: U(1), height: U(5.25) }}
                  />
                </span>
              </span>
            </PTd>
          ))}
        </div>
      </div>
    </PFrame>
  );
}

/* 2 · Risk flagged early — node 986:11059 */
const RISK_TABLE: {
  vendor: string;
  score: string;
  state: string;
  bg: string;
  fg: string;
  icon?: string;
  iconX?: number;
  iconY?: number;
  iconW?: number;
  iconH?: number;
}[] = [
  { vendor: "Acme Industries", score: "4.2/5", state: "Critical", bg: "#FFE7E7", fg: "#A62525", icon: "warn-critical", iconX: 0.391, iconY: 0.391, iconW: 4.219, iconH: 4.219 },
  { vendor: "Global Components", score: "4.2/5", state: "High", bg: "#FFF4E7", fg: "#A64E25", icon: "warn-high", iconX: 0.234, iconY: 0.391, iconW: 4.532, iconH: 4.063 },
  { vendor: "Prime Supplies", score: "4.2/5", state: "Low", bg: "#E5FFD7", fg: "#1D4514", icon: "warn-low", iconX: 0.391, iconY: 0.391, iconW: 4.219, iconH: 4.219 },
  { vendor: "Prime Supplies", score: "4.2/5", state: "Watch", bg: "#E7E7E7", fg: "#000000" },
];

function SupplierRiskMock() {
  return (
    <PFrame title="Supplier Risk Monitor" gap={2.209} pb={8.304}>
      <div
        className="flex w-full shrink-0 items-start"
        style={{ paddingInline: U(8), gap: U(8.835) }}
      >
        <div
          className="flex shrink-0 flex-col items-start"
          style={{ width: U(84), gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Vendor</PTh>
          {RISK_TABLE.map((r, i) => (
            <PTd key={i}>{r.vendor}</PTd>
          ))}
        </div>
        <div
          className="flex min-w-px flex-1 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Risk Score</PTh>
          {RISK_TABLE.map((r, i) => (
            <PTd key={i}>{r.score}</PTd>
          ))}
        </div>
        <div
          className="flex min-w-px flex-1 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Status</PTh>
          {RISK_TABLE.map((r, i) => (
            <PTd key={i} raw>
              <span
                className="flex shrink-0 items-center justify-center whitespace-nowrap"
                style={{
                  background: r.bg,
                  color: r.fg,
                  gap: U(2),
                  paddingInline: U(3),
                  paddingBlock: U(1),
                  borderRadius: U(2),
                  fontSize: U(5.5),
                  lineHeight: 1.4,
                }}
              >
                {r.icon ? (
                  <span className="relative block shrink-0" style={{ width: U(5), height: U(5) }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${PR}/${r.icon}.svg`}
                      alt=""
                      aria-hidden
                      className="absolute block max-w-none"
                      style={{
                        left: U(r.iconX!),
                        top: U(r.iconY!),
                        width: U(r.iconW!),
                        height: U(r.iconH!),
                      }}
                    />
                  </span>
                ) : null}
                <span className="font-medium">{r.state}</span>
              </span>
            </PTd>
          ))}
        </div>
        <div
          className="flex min-w-px flex-1 flex-col items-start"
          style={{ gap: U(1), paddingRight: U(8) }}
        >
          <PTh>Action</PTh>
          {RISK_TABLE.map((_, i) => (
            <PTd key={i} raw>
              <span
                className="flex shrink-0 items-center whitespace-nowrap border-solid border-[#DCDCDB] font-semibold text-[#181818]"
                style={{
                  borderWidth: U(0.5),
                  borderRadius: U(3),
                  paddingInline: U(4),
                  paddingBlock: U(2),
                  fontSize: U(5.5),
                  lineHeight: 1.4,
                }}
              >
                Override
              </span>
            </PTd>
          ))}
        </div>
      </div>
    </PFrame>
  );
}

/* 3 · Savings you can defend — node 986:11119 */
const SPEND_TABLE = [
  { cat: "Indirect Materials", spend: "$7.2M", share: "75%", bar: "bar-75" },
  { cat: "MRO", spend: "$5.1M", share: "20%", bar: "bar-20" },
];

function SavingsEngineMock() {
  return (
    <PFrame title="Normalized Spend Overview" pill="All Categories" gap={8} pb={4}>
      <div
        className="flex w-full shrink-0 items-center whitespace-nowrap text-black"
        style={{ paddingInline: U(8), gap: U(6) }}
      >
        {[
          { label: "Total Spend", value: "$15.1M" },
          { label: "Total Saving", value: "$2.48M - $2.75M" },
        ].map((t) => (
          <div
            key={t.label}
            className="flex min-w-px flex-1 flex-col items-start justify-center bg-[#F5F5F5]"
            style={{ gap: U(2), padding: U(4), borderRadius: U(4) }}
          >
            <p className="font-normal" style={{ fontSize: U(6), lineHeight: 1.4 }}>
              {t.label}
            </p>
            <p className="font-medium" style={{ fontSize: U(8), lineHeight: 1.4 }}>
              {t.value}
            </p>
          </div>
        ))}
      </div>

      <div
        className="flex w-full shrink-0 items-start justify-between"
        style={{ paddingInline: U(8) }}
      >
        <div
          className="flex shrink-0 flex-col items-start"
          style={{ width: U(71.329), paddingRight: U(8) }}
        >
          <PTh h={18}>Categories</PTh>
          {SPEND_TABLE.map((r) => (
            <PTd key={r.cat} h={18}>
              {r.cat}
            </PTd>
          ))}
        </div>
        <div className="flex shrink-0 flex-col items-start" style={{ paddingRight: U(8) }}>
          <PTh h={18}>Spend</PTh>
          {SPEND_TABLE.map((r) => (
            <PTd key={r.cat} h={18}>
              {r.spend}
            </PTd>
          ))}
        </div>
        <div className="flex shrink-0 flex-col items-start" style={{ paddingRight: U(8) }}>
          <PTh h={18}>Pocket Share</PTh>
          {SPEND_TABLE.map((r) => (
            <PTd key={r.cat} h={18} raw>
              <span className="flex items-center" style={{ gap: U(8), height: U(20) }}>
                <PBar src={r.bar} />
                <p
                  className="whitespace-nowrap font-normal text-black"
                  style={{ fontSize: U(7), lineHeight: 1.4 }}
                >
                  {r.share}
                </p>
              </span>
            </PTd>
          ))}
        </div>
      </div>
    </PFrame>
  );
}

/* 4 · Fewer expedites — node 986:11173 */
const EXPEDITE_MONTHS = [
  { m: "Jan", x: 123.5 },
  { m: "Feb", x: 144.273 },
  { m: "Mar", x: 165.055 },
  { m: "Apr", x: 185.828 },
  { m: "May", x: 206.602 },
  { m: "Jun", x: 227.383 },
];

const EXPEDITE_TILES: { label: string; value: string; w?: number }[] = [
  { label: "High Risk", value: "12" },
  { label: "At Risk", value: "28" },
  { label: "Monitored", value: "86", w: 81 },
];

function ExpediteMock() {
  const axis = "absolute whitespace-nowrap font-normal text-[#555555]";
  const axisStyle = { fontSize: U(5.5), lineHeight: 1.4 } as React.CSSProperties;
  return (
    <PFrame title="Expedite Impact" pill="This Year" gap={2.209} pb={8.304}>
      <div className="flex min-h-px w-full flex-1 flex-col items-start justify-between">
        <div
          className="relative flex w-full shrink-0 items-start"
          style={{ height: U(53), paddingTop: U(7), paddingInline: U(8), gap: U(10) }}
        >
          <div
            className="flex min-w-px flex-1 flex-col items-start justify-center whitespace-nowrap"
            style={{ gap: U(2), paddingLeft: U(2) }}
          >
            <p className="font-normal text-black" style={{ fontSize: U(6), lineHeight: 1.4 }}>
              Expedite Reduced
            </p>
            <p className="font-medium text-black" style={{ fontSize: U(12), lineHeight: 1.4 }}>
              42%
            </p>
            <p className="font-medium text-[#0B6E4E]" style={{ fontSize: U(6), lineHeight: 1.4 }}>
              5% vs Last quarter
            </p>
          </div>

          <div
            className="flex min-w-px flex-1 flex-col items-start justify-end bg-white"
            style={{ height: "100%", paddingInline: U(3) }}
          >
            {/* The design rotates the chart group 180deg. */}
            <div className="w-full shrink-0" style={{ transform: "rotate(180deg)" }}>
              <div className="relative w-full" style={{ height: U(45.203) }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${PR}/expedite-chart.svg`}
                  alt=""
                  aria-hidden
                  className="absolute block max-w-none"
                  style={{ inset: "-0.82% -0.44% -1.01% -0.29%", width: "100.73%", height: "101.83%" }}
                />
              </div>
            </div>
          </div>

          <p className={`${axis} -translate-x-full text-right`} style={{ ...axisStyle, left: U(120.078), top: U(4) }}>100%</p>
          <p className={`${axis} -translate-x-full text-right`} style={{ ...axisStyle, left: U(120.078), top: U(25) }}>50%</p>
          <p className={`${axis} -translate-x-full text-right`} style={{ ...axisStyle, left: U(120.078), top: U(48.871) }}>0%</p>
          {EXPEDITE_MONTHS.map((mo) => (
            <p key={mo.m} className={axis} style={{ ...axisStyle, left: U(mo.x), top: U(56.871), width: U(11.197) }}>
              {mo.m}
            </p>
          ))}
        </div>

        <div
          className="flex w-full shrink-0 items-start"
          style={{ paddingInline: U(8), gap: U(6) }}
        >
          {EXPEDITE_TILES.map((t) => (
            <div
              key={t.label}
              className={`flex flex-col items-start bg-[#F5F5F5] ${t.w ? "shrink-0" : "min-w-px flex-1"}`}
              style={{
                ...(t.w ? { width: U(t.w) } : {}),
                paddingInline: U(5.895),
                paddingBlock: U(3.93),
                borderRadius: U(4),
              }}
            >
              <div
                className="flex w-full shrink-0 flex-col items-start whitespace-nowrap text-black"
                style={{ gap: U(3.93) }}
              >
                <p className="font-normal" style={{ fontSize: U(6), lineHeight: 1.4 }}>
                  {t.label}
                </p>
                <p className="font-medium" style={{ fontSize: U(8), lineHeight: 1.4 }}>
                  {t.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PFrame>
  );
}

const TABS: { key: string; label: string; icon: Icon; cards: Card[] }[] = [
  {
    key: "customer",
    label: "Customer Engagement",
    icon: UsersThree,
    cards: [
      {
        metric: "Fewer inbound calls",
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
        sub: "one surface, every desk",
        body: "One command surface automating routine service work across every desk.",
        icon: Robot,
        mock: AutomationMock,
      },
    ],
  },
  {
    key: "procurement",
    label: "Procurement Optimization",
    icon: ShoppingCart,
    cards: [
      {
        metric: "Confidence-graded POs",
        sub: "demand-sensed buying",
        body: "Demand-sensed, cost-optimized POs, the planner approves, the system executes.",
        icon: SealCheck,
        mock: PoConfidenceMock,
      },
      {
        metric: "Risk flagged early",
        sub: "continuous supplier scoring",
        body: "Continuous supplier scoring, with alternates suggested before disruption lands.",
        icon: WarningCircle,
        mock: SupplierRiskMock,
      },
      {
        metric: "Savings you can defend",
        sub: "normalized spend, every category",
        body: "Normalized spend across every category, validated, evidence-backed savings.",
        icon: PiggyBank,
        mock: SavingsEngineMock,
      },
      {
        metric: "Fewer expedites",
        sub: "early risk flags at PO level",
        body: "Early risk flags routed to the right play before expedite premiums hit.",
        icon: Timer,
        mock: ExpediteMock,
      },
    ],
  },
  {
    key: "inventory",
    label: "Inventory Optimization",
    icon: Package,
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
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
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
          <h2 className="font-medium tracking-tight text-zinc-900">
            Driving Outcomes
          </h2>
          <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-zinc-500">
            Three pillars turning intelligence into measurable business value.
          </p>
          {/* Tabs — custom dropdown on mobile, pills on md+ */}
          <div className="mt-8 md:hidden">
            <MobileTabDropdown items={TABS} active={active} onChange={setActive} />
          </div>
          <div className="mt-8 hidden md:flex">
            <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setActive(i)}
                  className={`relative flex items-center rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors ${
                    i === active ? "text-white" : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {i === active && (
                    <motion.span
                      layoutId="outcomes-tab-pill"
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
                    <p className="text-[16px] font-medium leading-snug text-zinc-900">
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
