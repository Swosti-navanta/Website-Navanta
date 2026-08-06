"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import FadeIn from "./FadeIn";
import { lenisRef } from "./SmoothScroll";

/* Kept in step with the contact page, which is the source of truth for these.
   Split across two lines here purely for the footer's narrow column. */
const ADDRESS_LINES = ["8 The Green #8618", "Dover, DE 19901"];
const EMAIL = "admin@navanta.ai";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Career", href: "/careers" },
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

  /* Two-stage reveal for the image band. Stage one: the page scrolls normally and
     hard-stops with the footer content filling the viewport, the band still below
     the fold. The rest of that flick's momentum is swallowed, so a single fast
     trackpad gesture can't blow through — the gate waits for the gesture to end
     (IDLE_MS of no input). Stage two: the next downward scroll is a deliberate,
     separate gesture, and it eases the band up into view. Scrolling up instead
     hands control straight back. Re-arms once you're clear above the gate. */
  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    // Reduced motion still gets the gate — a scroll stop isn't motion — it just
    // snaps the band in instead of easing it.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // A trackpad flick keeps emitting tapering momentum events for a while after
    // the fingers lift, and the gaps between the last few can be sizeable. Wait
    // out a generous quiet window, and ignore the small-delta dribble entirely,
    // so only a genuine new gesture opens the gate.
    const IDLE_MS = 400; // quiet time that marks the end of a scroll gesture
    const MIN_DELTA = 8; // px; below this it's momentum tail, not intent
    const REVEAL_S = reduced ? 0 : 1.1; // how long the band takes to ease up

    let stage: "open" | "gated" | "revealing" | "done" = "open";
    let armed = false; // gesture ended, so a new scroll now counts
    let idle: ReturnType<typeof setTimeout> | undefined;
    let failsafe: ReturnType<typeof setTimeout> | undefined;

    const gateY = () => Math.max(0, band.offsetTop - window.innerHeight);
    const bottomY = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const clearTimers = () => {
      if (idle) clearTimeout(idle);
      if (failsafe) clearTimeout(failsafe);
      idle = undefined;
      failsafe = undefined;
    };

    const release = () => {
      stage = "open";
      armed = false;
      clearTimers();
      lenisRef.current?.start();
    };

    const onScroll = () => {
      const gy = gateY();
      if (gy <= 0) return; // band already in view at rest — nothing to gate
      if (stage === "done") {
        if (window.scrollY < gy - 80) stage = "open"; // re-arm above the gate
        return;
      }
      if (stage === "open" && window.scrollY >= gy - 1) {
        stage = "gated";
        armed = false;
        lenisRef.current?.stop();
        lenisRef.current?.scrollTo(gy, { immediate: true, force: true });
        // The gate usually engages mid-glide, after the flick's own wheel events
        // have already stopped, so start arming here rather than waiting for
        // another event that may never come. Further input resets the timer.
        bumpIdle();
      }
    };

    // Swallow input until the gesture that hit the gate has fully died down.
    const bumpIdle = () => {
      if (idle) clearTimeout(idle);
      idle = setTimeout(() => {
        armed = true;
      }, IDLE_MS);
    };

    const startReveal = () => {
      stage = "revealing";
      armed = false;
      clearTimers();
      // Lenis stays stopped so the tail of the gesture can't fight the animation;
      // `force` runs it anyway and `onComplete` hands scrolling back.
      lenisRef.current?.scrollTo(bottomY(), {
        duration: REVEAL_S,
        immediate: reduced,
        force: true,
        onComplete: () => {
          stage = "done";
          clearTimers();
          lenisRef.current?.start();
        },
      });
      // Never leave the page pinned if onComplete doesn't land.
      failsafe = setTimeout(() => {
        stage = "done";
        lenisRef.current?.start();
      }, REVEAL_S * 1000 + 600);
    };

    const onWheel = (e: WheelEvent) => {
      if (stage === "revealing") {
        e.preventDefault(); // swallow the rest of the flick
        return;
      }
      if (stage !== "gated") return;
      e.preventDefault(); // pin the page while gated
      if (e.deltaY < -MIN_DELTA) {
        release(); // scrolling back up — hand control straight back
        return;
      }
      // Momentum dribble keeps the gate shut and pushes the arming window out.
      if (armed && e.deltaY >= MIN_DELTA) startReveal();
      else bumpIdle();
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (stage === "revealing") {
        e.preventDefault();
        return;
      }
      if (stage !== "gated") return;
      const y = e.touches[0].clientY;
      const delta = touchY - y; // >0 means dragging content upward
      touchY = y;
      e.preventDefault();
      if (delta < 0) {
        release();
        return;
      }
      if (armed) startReveal();
    };
    // A finger lifting is an unambiguous end of gesture.
    const onTouchEnd = () => {
      if (stage === "gated") armed = true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      clearTimers();
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
                className="mt-2 inline-block text-[13.5px] leading-relaxed text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {EMAIL}
              </a>
            </div>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[15px] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[15px] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline">
                    {l.label}
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
