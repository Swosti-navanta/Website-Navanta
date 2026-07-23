"use client";

import { useEffect, useRef } from "react";

/** Full-bleed background video with Safari-proof autoplay (same technique as
 *  the home hero: raw HTML keeps `muted` in SSR output, JS retries play). */
export default function BgVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = wrapRef.current?.querySelector("video");
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.autoplay = true;
    if (v.readyState === 0) v.load();

    const tryPlay = () => {
      if (!v.paused) return;
      const p = v.play();
      if (p) p.catch(() => {});
    };
    tryPlay();
    const iv = setInterval(() => {
      if (v.paused) tryPlay();
      else clearInterval(iv);
    }, 350);
    const stop = setTimeout(() => clearInterval(iv), 8000);
    const events = ["canplay", "loadeddata"] as const;
    events.forEach((e) => v.addEventListener(e, tryPlay));
    const gestures = ["pointerdown", "pointermove", "touchstart", "scroll", "wheel"] as const;
    const onG = () => tryPlay();
    gestures.forEach((e) => window.addEventListener(e, onG, { passive: true }));
    return () => {
      clearInterval(iv);
      clearTimeout(stop);
      events.forEach((e) => v.removeEventListener(e, tryPlay));
      gestures.forEach((e) => window.removeEventListener(e, onG));
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="absolute inset-0"
      dangerouslySetInnerHTML={{
        __html: `<video class="absolute inset-0 h-full w-full object-cover pointer-events-none" src="/hero/hero.mp4" poster="/hero/poster.jpg" autoplay muted loop playsinline webkit-playsinline preload="auto" disableremoteplayback></video>`,
      }}
    />
  );
}
