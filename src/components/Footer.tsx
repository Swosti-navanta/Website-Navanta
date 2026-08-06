"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import FadeIn from "./FadeIn";

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
