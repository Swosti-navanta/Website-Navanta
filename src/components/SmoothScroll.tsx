"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Shared handle on the site-wide Lenis instance, for components that need to
 *  pause/resume or drive scrolling directly — e.g. the footer reveal gate. */
export const lenisRef: { current: Lenis | null } = { current: null };

/** Site-wide inertial smooth scrolling — fast while flicking,
 *  gentle ease-out when the user stops. */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09, // lower = longer glide
      wheelMultiplier: 1.05,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
