"use client";

import FadeIn from "./FadeIn";

const MAIN_LINKS = [
  { label: "About", href: "#" },
  { label: "Careers", href: "#career" },
  { label: "Contact", href: "#contact" },
];

const PRODUCT_LINKS = [
  { label: "Navanta Lens", href: "#intelligence" },
  { label: "Driving Outcomes", href: "#outcomes" },
  { label: "The Approach", href: "#features" },
  { label: "The Advantages", href: "#advantages" },
];

const COMPANY_LINKS = [
  { label: "About", href: "#" },
  { label: "Team", href: "#" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0c0b0a] text-white">
      <div className="mx-auto max-w-[1560px] px-6 py-24 lg:px-10">
        {/* Big primary links */}
        <FadeIn>
          <div className="grid gap-16 md:grid-cols-2">
            <p className="max-w-xs self-end text-[13.5px] leading-relaxed text-white/55">
              Navanta is the supply chain intelligence layer for industrial
              enterprises — unifying orders, inventory, and procurement into
              decisions that protect margin, growth, and customer trust.
            </p>
            <div>
              <ul className="space-y-1.5">
                {MAIN_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[30px] font-medium text-white transition-colors hover:text-white/70 sm:text-[34px]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-14 grid grid-cols-2 gap-8">
                <ul className="space-y-3">
                  {PRODUCT_LINKS.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-[15px] text-white/80 hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {COMPANY_LINKS.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-[15px] text-white/80 hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Legal bar */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[11.5px] uppercase tracking-wide text-white/45">
          <span>© 2026 Navanta. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white/80">
              Terms &amp; Conditions
            </a>
            <a href="#" className="hover:text-white/80">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Brand image band — rail-yard photo from Figma */}
      <div className="relative flex h-[420px] items-center justify-center overflow-hidden sm:h-[520px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/footer-railyard.jpg"
          alt=""
          aria-hidden
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
