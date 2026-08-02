"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

/**
 * Drives a 0→1 progress value over `duration` ms via requestAnimationFrame,
 * calling `onComplete` once it reaches 1. Pausable — pausing freezes progress
 * in place (e.g. on card hover) and resuming continues from there rather than
 * restarting, so hovering never loses or skips time. `resetKey` restarts the
 * timer from 0 whenever it changes (e.g. the active tab/feature index).
 */
export function useAdvanceTimer(
  duration: number,
  onComplete: () => void,
  resetKey: string | number,
): { progress: MotionValue<number>; setPaused: (p: boolean) => void } {
  const progress = useMotionValue(0);
  const pausedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let raf: number;
    let last = performance.now();
    let elapsed = 0;
    progress.set(0);

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current) {
        elapsed += dt;
        const p = Math.min(1, elapsed / duration);
        progress.set(p);
        if (p >= 1) {
          onCompleteRef.current();
          return; // caller changes resetKey on complete, which restarts this effect
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, duration]);

  const setPaused = (p: boolean) => {
    pausedRef.current = p;
  };

  return { progress, setPaused };
}
