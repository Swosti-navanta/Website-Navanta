"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ClockCountdown,
  Flag,
  CheckCircle,
} from "@phosphor-icons/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Agent-activity cards — Navanta supply-chain content
 *  (replaces the placeholder PPF/detailing copy from the mockup) */
const NOTIFICATIONS = [
  {
    icon: ClockCountdown,
    title: "Demand shift detected",
    body: "Midwest DC trending +18% on SKU 4482 — reorder point review suggested",
  },
  {
    icon: Flag,
    title: "Delay risk flagged",
    body: "PO #4821 — Rotterdam ETA slipped 6 days on ocean leg",
    nested: [
      "Expedite via alternate carrier adds $2.1K.",
      "Competitive quote requested.",
    ],
  },
  {
    icon: CheckCircle,
    title: "Reorder executed",
    body: "Auto-PO issued for 240 units — planner approved at 92% confidence",
  },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cross-browser autoplay. Safari blocks autoplay unless `muted`/`playsinline`
  // are set on the element (React can omit the muted attribute), and blocks it
  // entirely under Low Power Mode or a "Never Auto-Play" setting. So: force the
  // attributes, try to play on load, and — if still blocked — start on the first
  // user interaction. Also resume when the tab becomes visible again.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const play = () => {
      const p = v.play();
      if (p) p.catch(() => {});
    };

    play();
    v.addEventListener("canplay", play);
    v.addEventListener("loadeddata", play);

    // Autoplay blocked (Safari Low Power / site setting) → kick off on first gesture.
    const onInteract = () => play();
    const gestureOpts: AddEventListenerOptions = { once: true, passive: true };
    window.addEventListener("pointerdown", onInteract, gestureOpts);
    window.addEventListener("touchstart", onInteract, gestureOpts);
    window.addEventListener("scroll", onInteract, gestureOpts);
    window.addEventListener("keydown", onInteract, gestureOpts);

    const onVisible = () => {
      if (!document.hidden) play();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      v.removeEventListener("canplay", play);
      v.removeEventListener("loadeddata", play);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("keydown", onInteract);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#191512]">
      {/* --- Background media --------------------------------------------- */}
      {/* Gradient fallback shows until the video paints. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,#3a2f26_0%,#241d17_45%,#120f0c_100%)]"
      />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero/hero.mp4"
        poster="/hero/poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
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
              href="#demo"
              className="inline-block rounded-lg bg-white px-6 py-3.5 text-[15px] font-medium text-black transition-colors hover:bg-white/90"
            >
              Request a Demo
            </a>
          </motion.div>
        </div>
      </div>

      {/* --- Agent notification stack (desktop) ----------------------------- */}
      <div className="absolute bottom-20 right-10 z-10 hidden w-[370px] flex-col gap-3 lg:flex">
        {NOTIFICATIONS.map((n, i) => (
          <motion.div
            key={n.title}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 + i * 0.18 }}
            className="rounded-xl border border-white/10 bg-black/45 backdrop-blur-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <n.icon size={15} className="text-white/70" />
              <span className="text-[13px] font-medium text-white/90">
                {n.title}
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-[13px] leading-snug text-white/70">{n.body}</p>
              {n.nested && (
                <div className="mt-2.5 rounded-lg border border-white/[0.06] bg-black/30 px-3 py-2.5">
                  {n.nested.map((line) => (
                    <p
                      key={line}
                      className="text-[12.5px] leading-relaxed text-white/75"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

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
    </section>
  );
}
