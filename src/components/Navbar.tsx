"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { useDemoModal } from "./DemoModal";

// Section links use "/#id" so they work from any page (jump home, then scroll).
const NAV_LINKS = [
  { label: "Challenges", href: "/#challenges" },
  { label: "Intelligence", href: "/#intelligence" },
  { label: "Outcomes", href: "/#outcomes" },
  { label: "About", href: "/about" },
  { label: "Career", href: "/careers" },
];

/* Harvey-style scroll behavior (matched to the reference recording):
   — at the top, over the dark hero: smoky translucent dark nav, white text,
     white "Request a Demo" button;
   — scrolling DOWN past the hero: the bar slides up out of view;
   — any scroll UP: it slides back down as a solid light bar with dark text
     and a black demo button (the two themes crossfade);
   — returning to the top restores the smoky dark nav. */
export default function Navbar() {
  const { open: openDemo } = useDemoModal();
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true); // very top → no frosted band at all
  const [light, setLight] = useState(false); // past the hero → light theme
  const [hidden, setHidden] = useState(false); // scrolling down → slide away
  const lastY = useRef(0);

  useEffect(() => {
    // The theme follows what's *behind* the bar: sections tagged
    // data-nav-theme="dark" (the hero, the black Impact band, page headers)
    // keep the smoky dark treatment; everything else is light. We probe a
    // point just inside the bar (y ≈ 36) to see if a dark section is under it.
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      const probeY = 36;
      let overDark = false;
      document.querySelectorAll("[data-nav-theme='dark']").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) overDark = true;
      });
      setAtTop(y < 16);
      setLight(!overDark);
      // Small dead zone so tiny jitters don't toggle it; never hide near top.
      if (y < window.innerHeight * 0.5) setHidden(false);
      else if (Math.abs(delta) > 4) setHidden(delta > 0);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open, keep the bar on screen.
  const isHidden = hidden && !open;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: isHidden ? "-110%" : 0, opacity: 1 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Frosted rectangle — matched to the reference: invisible at the very
          top (links sit directly on the hero), then a smoky backdrop-blurred
          band with a crisp bottom edge once scrolling starts; dark-tinted over
          the hero, cream-tinted past it (content smears through both). The
          blur is transitioned (not opacity) so the glass effect itself eases
          in and out. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-all duration-300"
        style={{
          backdropFilter: atTop ? "blur(0px)" : "blur(18px)",
          WebkitBackdropFilter: atTop ? "blur(0px)" : "blur(18px)",
          backgroundColor: atTop
            ? "rgba(0,0,0,0)"
            : light
              ? "rgba(250,249,247,0.78)"
              : "rgba(20,18,16,0.22)",
          borderBottom:
            light && !atTop
              ? "1px solid rgba(228,228,231,0.7)"
              : "1px solid rgba(228,228,231,0)",
        }}
      />

      <nav className="relative z-10 mx-auto flex h-[72px] max-w-[1560px] items-center justify-between px-6 lg:px-10">
        {/* Navanta logo lockup — crossfading white/dark variants; returns home */}
        <a href="/" className="relative flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/navanta-logo.svg"
            alt="Navanta — Enabling Intelligent Enterprises"
            className={`h-9 w-auto transition-opacity duration-300 ${light ? "opacity-0" : "opacity-100"}`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/navanta-logo-dark.png"
            alt=""
            aria-hidden
            className={`absolute left-0 h-9 w-auto transition-opacity duration-300 ${light ? "opacity-100" : "opacity-0"}`}
          />
        </a>

        {/* Desktop links — underline wipes in from the left on hover */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`group relative flex items-center gap-1 py-1 text-[14.5px] transition-colors duration-300 ${
                  light ? "text-zinc-700 hover:text-zinc-950" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    light ? "bg-zinc-900" : "bg-white"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/contact"
            className={`rounded-lg border px-4 py-2.5 text-[14px] font-medium transition-colors duration-300 ${
              light
                ? "border-zinc-300 text-zinc-800 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
                : "border-white/30 text-white hover:border-white hover:bg-white hover:text-black"
            }`}
          >
            Contact Us
          </a>
          <button
            onClick={openDemo}
            className={`rounded-lg px-4 py-2.5 text-[14px] font-medium transition-colors duration-300 ${
              light
                ? "bg-zinc-950 text-white hover:bg-zinc-800"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            Request a Demo
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className={`transition-colors duration-300 lg:hidden ${light ? "text-zinc-900" : "text-white"}`}
        >
          {open ? <X size={26} /> : <List size={26} />}
        </button>
      </nav>

      {/* Mobile menu — smoky dark at the top, solid light once scrolled */}
      {open && (
        <div
          className={`relative z-10 border-t lg:hidden ${light ? "border-zinc-200" : "border-white/10"}`}
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 backdrop-blur-[20px] ${
              light ? "bg-[#faf9f7]/90" : "bg-[#141210]/70"
            }`}
          />
          <ul className="relative flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2.5 text-[15px] ${light ? "text-zinc-800" : "text-white/85"}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-3 flex gap-3">
              <a
                href="/contact"
                className={`flex-1 rounded-lg border px-4 py-2.5 text-center text-[14px] font-medium ${
                  light ? "border-zinc-300 text-zinc-800" : "border-white/30 text-white"
                }`}
              >
                Contact Us
              </a>
              <button
                onClick={() => {
                  setOpen(false);
                  openDemo();
                }}
                className={`flex-1 rounded-lg px-4 py-2.5 text-center text-[14px] font-medium ${
                  light ? "bg-zinc-950 text-white" : "bg-white text-black"
                }`}
              >
                Request a Demo
              </button>
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  );
}
