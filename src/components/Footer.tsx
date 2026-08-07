"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import FadeIn from "./FadeIn";
import { lenisRef } from "./SmoothScroll";

/* Kept in step with the contact page, which is the source of truth for these.
   Split across two lines here purely for the footer's narrow column. */
const ADDRESS_LINES = ["8 The Green #8618", "Dover, DE 19901"];
const EMAIL = "info@navanta.ai";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const PRODUCT_LINKS = [
  { label: "Navanta Lens", href: "/#intelligence" },
  { label: "Driving Outcomes", href: "/#outcomes" },
  { label: "The Approach", href: "/#features" },
  { label: "The Advantages", href: "/#advantages" },
];

export default function Footer() {
  const bandRef = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);

  // Scroll-linked zoom on the rail-yard image: zoomed in as it enters (scroll
  // up), settling to zoomed out as you scroll down to it.
  useEffect(() => {
    const update = () => {
      const band = bandRef.current;
      if (!band) return;
      const r = band.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 (band top at viewport bottom) → 1 (band top at viewport top)
      const p = Math.min(1, Math.max(0, (vh - r.top) / vh));
      scale.set(1 + (1 - p) * 0.25);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scale]);

  /* Two-stage reveal. Stage one: a magnetic catch takes over CATCH px before
     the rest position and decelerates into it, settling with the footer
     content on screen and PEEK px of the image band showing below. Stage two:
     the next deliberate downward scroll eases the page to the very bottom.

     The last version of this gate required 400ms of total input silence before
     the second scroll counted — a trackpad's momentum tail kept resetting that
     window, so the page felt stuck. This one never asks the user to stop:
     while pinned it classifies wheel events by their delta profile. A momentum
     tail decays monotonically and is discounted; a genuine new push (rising
     deltas, a fresh event after a gap, or a discrete wheel notch) fills a
     small budget and opens the gate — so "scroll again" always works, and a
     single flick still can't blow through. */
  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const PEEK = 110; // px of the band visible at the stage-one rest
    const CATCH = 160; // px before the rest where the magnet takes over
    const SETTLE_S = 0.7; // how long the catch takes to ease in
    const DWELL_MS = 220; // ignore everything this soon after settling — still the same flick
    const GAP_MS = 140; // quiet gap that marks a new gesture
    const BUDGET = 90; // px of intentional scroll that opens the gate
    const REVEAL_S = 1.0;

    let stage: "open" | "settling" | "gated" | "revealing" | "done" = "open";
    let engagedAt = 0; // when the settle landed
    let lastDelta = 0; // previous wheel delta, for the rising-profile test
    let lastEventAt = 0;
    let counting = false; // a new gesture was detected — its deltas now count
    let budget = 0;
    let lastY = 0; // previous scroll position, for direction
    let failsafe: ReturnType<typeof setTimeout> | undefined;

    const gateY = () =>
      Math.max(0, band.offsetTop - window.innerHeight + PEEK);
    const bottomY = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const arm = () => {
      // The settle's failsafe must die here: if it fired after the next stage
      // began, its stray re-arm would collide with a running reveal and kill
      // the animation partway down.
      if (failsafe) clearTimeout(failsafe);
      failsafe = undefined;
      stage = "gated";
      engagedAt = performance.now();
      lastDelta = 0;
      lastEventAt = 0;
      counting = false;
      budget = 0;
    };

    /* The magnetic catch: instead of hard-stopping the glide at the gate, take
       over a little early and decelerate into the rest position, so arriving
       feels sticky rather than hitting a wall. */
    const settle = () => {
      stage = "settling";
      lenisRef.current?.stop();
      lenisRef.current?.scrollTo(gateY(), {
        duration: SETTLE_S,
        immediate: reduced,
        force: true,
        onComplete: arm,
      });
      if (failsafe) clearTimeout(failsafe);
      failsafe = setTimeout(arm, SETTLE_S * 1000 + 400);
    };

    const release = () => {
      stage = "open";
      if (failsafe) clearTimeout(failsafe);
      // Kill any in-flight scrollTo before handing control back, so its tail
      // doesn't fight the user's upward scroll.
      lenisRef.current?.scrollTo(window.scrollY, { immediate: true, force: true });
      lenisRef.current?.start();
    };

    const startReveal = () => {
      stage = "revealing";
      if (failsafe) clearTimeout(failsafe);
      // Lenis stays stopped so the gesture's tail can't fight the ease;
      // `force` runs the scroll anyway and onComplete hands control back.
      lenisRef.current?.scrollTo(bottomY(), {
        duration: REVEAL_S,
        immediate: reduced,
        force: true,
        onComplete: () => {
          stage = "done";
          if (failsafe) clearTimeout(failsafe);
          lenisRef.current?.start();
        },
      });
      // Never leave the page pinned if onComplete doesn't land.
      failsafe = setTimeout(() => {
        stage = "done";
        lenisRef.current?.start();
      }, REVEAL_S * 1000 + 600);
    };

    const onScroll = () => {
      const gy = gateY();
      // Short pages (band already visible at rest) get no gate at all.
      if (gy <= 0 || bottomY() - gy < 60) return;
      const y = window.scrollY;
      const down = y > lastY;
      lastY = y;
      // Catch only on the way down — scrolling up through the zone must never
      // drag the page back to the gate.
      if (stage === "open" && down && y >= gy - CATCH) {
        settle();
        return;
      }
      if (stage === "gated") {
        // Keyboard / scrollbar moves bypass the wheel listener entirely:
        // read intent straight from the scroll position instead.
        if (y > gy + 40) startReveal();
        else if (y < gy - 10) release();
        return;
      }
      if (stage === "done" && y < gy - 80) stage = "open"; // re-arm above the gate
    };

    const onWheel = (e: WheelEvent) => {
      if (stage === "revealing" || stage === "settling") {
        e.preventDefault(); // swallow the tail so it can't fight the ease
        if (stage === "settling" && e.deltaY < 0) release(); // up = hand back
        return;
      }
      if (stage !== "gated") return;
      e.preventDefault(); // hold the stage-one rest
      if (e.deltaY < 0) {
        release();
        return;
      }
      const now = performance.now();
      if (now - engagedAt > DWELL_MS) {
        // Momentum only ever decays — a delta that genuinely accelerates past
        // the previous one is a new push, and an event after a quiet gap is a
        // new gesture (discrete mouse-wheel notches always arrive after one).
        // Either marks the start of real intent; from there the whole gesture
        // counts, so the budget fills mid-ramp and the gate never demands a
        // dead stop. A decaying tail alone never trips the detector.
        const rising = e.deltaY > lastDelta * 1.2 + 2;
        const fresh = now - lastEventAt > GAP_MS;
        if (rising || fresh) counting = true;
        if (counting) budget += e.deltaY;
        if (budget >= BUDGET) startReveal();
      }
      lastDelta = e.deltaY;
      lastEventAt = now;
    };

    // Touch drags are direct manipulation — no momentum tail to filter, so a
    // short dwell alone separates the pinning swipe from the follow-up one.
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (stage === "revealing" || stage === "settling") {
        e.preventDefault();
        return;
      }
      if (stage !== "gated") return;
      const y = e.touches[0].clientY;
      const delta = touchY - y; // >0 = dragging content up (scrolling down)
      touchY = y;
      e.preventDefault();
      if (delta < 0) {
        release();
        return;
      }
      if (performance.now() - engagedAt > DWELL_MS) {
        budget += delta;
        if (budget >= 60) startReveal();
      }
    };

    const onResize = () => {
      if (stage === "gated")
        lenisRef.current?.scrollTo(gateY(), { immediate: true, force: true });
    };

    lastY = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      if (failsafe) clearTimeout(failsafe);
      lenisRef.current?.start(); // never leave scrolling locked
    };
  }, []);

  return (
    <footer id="contact" className="rounded-t-[40px] bg-[#0c0b0a] text-white">
      <div className="mx-auto max-w-[1560px] px-6 pb-8 pt-24 lg:px-10">
        {/* Big primary links */}
        <FadeIn>
          <div className="grid gap-12 md:grid-cols-[1fr_auto_auto] md:gap-x-24">
            <div className="max-w-xs">
              {/* The shipped logo keeps its gradient mark; knocking it to pure white
                  with a filter avoids maintaining a second, near-identical asset. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/navanta-logo.svg"
                alt="Navanta"
                className="h-9 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <address className="mt-6 text-[13.5px] not-italic leading-relaxed text-white/55">
                {ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={`mailto:${EMAIL}`}
                className="group relative mt-2 inline-block text-[13.5px] leading-relaxed text-white/55 transition-colors hover:text-white"
              >
                {EMAIL}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </div>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group relative inline-block text-[15px] text-white/80 transition-colors hover:text-white"
                  >
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group relative inline-block text-[15px] text-white/80 transition-colors hover:text-white"
                  >
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Legal bar */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[11.5px] uppercase tracking-wide text-white/45">
          <span>© 2026 Navanta. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white/80">
              Terms &amp; Conditions
            </a>
            <a href="/privacy" className="hover:text-white/80">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Brand image band, rail-yard photo, curved top, sits below the legal bar */}
      <div
        ref={bandRef}
        className="relative flex h-[440px] items-center justify-center overflow-hidden rounded-t-[40px] sm:h-[600px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/figma/footer-warehouse.jpg"
          alt=""
          aria-hidden
          style={{ scale }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-black/45" />
        <div className="relative flex items-center gap-6 px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/navanta-logo.svg" alt="Navanta" className="h-12 w-auto sm:h-14" />
          <span aria-hidden className="h-12 w-px bg-white/40 sm:h-14" />
          <span className="text-[26px] font-medium text-white sm:text-[40px]">
            Intelligence Layer for Industrial Enterprises
          </span>
        </div>
      </div>
    </footer>
  );
}
