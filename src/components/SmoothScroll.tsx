"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Site-wide inertial smooth scrolling — fast while flicking,
 *  gentle ease-out when the user stops. */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09, // lower = longer glide
      wheelMultiplier: 1.05,
      touchMultiplier: 1.4,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
