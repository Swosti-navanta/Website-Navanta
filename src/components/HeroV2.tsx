"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import HeroNotifications from "./HeroNotifications";

const EASE = [0.22, 1, 0.36, 1] as const;

/** HeroV2 — same content as Hero, wrapped in a scroll-shrink shell:
 *  as you scroll, the full-bleed hero scales down into a rounded card
 *  (white gutters appear), and expands back on the way up.
 *  Revert: switch page.tsx back to importing Hero. */
export default function HeroV2() {
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const radius = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      // progress 0 → 1 over the first 90% of a viewport of scrolling
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));
      scale.set(1 - 0.07 * p);
      radius.set(36 * p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scale, radius]);

  // Cross-browser autoplay. Safari blocks autoplay unless `muted`/`playsinline`
  // are set on the element (React can omit the muted attribute), and blocks it
  // entirely under Low Power Mode or a "Never Auto-Play" setting. So: force the
  // attributes, try to play on load, and — if still blocked — start on the first
  // user interaction. Also resume when the tab becomes visible again.
  useEffect(() => {
    const v = videoWrapRef.current?.querySelector("video");
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.autoplay = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    if (v.readyState === 0) v.load();

    const tryPlay = () => {
      if (!v.paused) return;
      const p = v.play();
      if (p) p.catch(() => {});
    };

    tryPlay();

    // Retry every 350ms for the first 8s — covers Safari's late autoplay veto.
    const iv = setInterval(() => {
      if (v.paused) tryPlay();
      else clearInterval(iv);
    }, 350);
    const ivStop = setTimeout(() => clearInterval(iv), 8000);

    const mediaEvents = ["canplay", "loadeddata", "canplaythrough"] as const;
    mediaEvents.forEach((e) => v.addEventListener(e, tryPlay));

    // Any user gesture counts as activation → start playback immediately.
    const gestures = [
      "pointerdown",
      "pointermove",
      "touchstart",
      "scroll",
      "wheel",
      "keydown",
    ] as const;
    const onGesture = () => tryPlay();
    gestures.forEach((e) =>
      window.addEventListener(e, onGesture, { passive: true })
    );

    const onVisible = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(iv);
      clearTimeout(ivStop);
      mediaEvents.forEach((e) => v.removeEventListener(e, tryPlay));
      gestures.forEach((e) => window.removeEventListener(e, onGesture));
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="relative bg-white">
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="relative flex min-h-screen items-center overflow-hidden bg-[#191512]"
      >
      {/* --- Background media --------------------------------------------- */}
      {/* Gradient fallback shows until the video paints. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,#3a2f26_0%,#241d17_45%,#120f0c_100%)]"
      />
      {/* Raw HTML video: React strips the `muted` attribute from SSR output,
          which makes Safari reject autoplay on a fresh page load. Rendering
          the tag verbatim guarantees muted+autoplay are present at parse time. */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0"
        dangerouslySetInnerHTML={{
          __html: `<video class="absolute inset-0 h-full w-full object-cover pointer-events-none" src="/hero/hero.mp4" poster="/hero/poster.jpg" autoplay muted loop playsinline webkit-playsinline preload="auto" disableremoteplayback></video>`,
        }}
      />

      {/* Legibility overlays — warehouse stays visible, with a slightly deeper
          left-weighted scrim for the text. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/12"
      />
      {/* Soft bottom fade into the next section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent"
      />

      {/* --- Content -------------------------------------------------------- */}
      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-6 pb-28 pt-36 lg:px-10">
        <div className="max-w-[1080px]">
          <motion.h1
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="text-[40px] font-medium leading-[1.08] tracking-[-0.01em] text-white sm:text-[56px] lg:text-[68px]"
          >
            The Supply Chain Intelligence
            <br />
            Layer for Industrial Enterprises
          </motion.h1>

          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/75 sm:text-[19px]"
          >
            Navanta unifies your orders, inventory, and procurement into one
            intelligence layer — turning fragmented signals into decisions
            from day one.
          </motion.p>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="mt-10"
          >
            <a
              href="/contact#demo"
              className="inline-block rounded-lg bg-white px-6 py-3.5 text-[15px] font-medium text-black transition-colors hover:bg-white/90"
            >
              Request a Demo
            </a>
          </motion.div>
        </div>
      </div>

      {/* --- Agent notification feed (rolling chat-style popup) ------------- */}
      <HeroNotifications />

      {/* --- Scroll cue ------------------------------------------------------ */}
      <motion.a
        href="#challenges"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={26} weight="light" />
        </motion.span>
      </motion.a>
      </motion.div>
    </section>
  );
}
