"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CaretDown, List, X } from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "Intelligence", href: "#intelligence" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Features", href: "#features" },
  { label: "Advantages", href: "#advantages" },
  { label: "Career", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Smoky progressive blur — stacked gradient-masked backdrop layers that
          dissolve downward with no hard edge (Harvey-style). */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[130%]">
        <div
          className="absolute inset-0 backdrop-blur-[24px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 45%)",
            maskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 45%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-[10px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 15%, black 40%, transparent 70%)",
            maskImage: "linear-gradient(to bottom, black 15%, black 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-[4px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, black 60%, transparent 95%)",
            maskImage: "linear-gradient(to bottom, black 40%, black 60%, transparent 95%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-transparent" />
      </div>
      <nav className="relative z-10 mx-auto flex h-[72px] max-w-[1560px] items-center justify-between px-6 lg:px-10">
        {/* Navanta logo lockup (white SVG) */}
        <a href="#" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/navanta-logo.svg"
            alt="Navanta — Enabling Intelligent Enterprises"
            className="h-9 w-auto"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex items-center gap-1 text-[14.5px] text-white/85 transition-colors hover:text-white"
              >
                {link.label}
                {link.caret && (
                  <CaretDown size={12} weight="bold" className="text-white/60" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/contact"
            className="flex items-center gap-1.5 rounded-lg border border-white/30 px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:border-white/60 hover:bg-white/5"
          >
            Contact Us
            <CaretDown size={12} weight="bold" className="text-white/70" />
          </a>
          <a
            href="#demo"
            className="rounded-lg bg-white px-4 py-2.5 text-[14px] font-medium text-black transition-colors hover:bg-white/90"
          >
            Request a Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="text-white lg:hidden"
        >
          {open ? <X size={26} /> : <List size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="relative z-10 border-t border-white/10 bg-black/90 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-[15px] text-white/85"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-3 flex gap-3">
              <a
                href="#contact"
                className="flex-1 rounded-lg border border-white/30 px-4 py-2.5 text-center text-[14px] font-medium text-white"
              >
                Contact Us
              </a>
              <a
                href="#demo"
                className="flex-1 rounded-lg bg-white px-4 py-2.5 text-center text-[14px] font-medium text-black"
              >
                Request a Demo
              </a>
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  );
}
