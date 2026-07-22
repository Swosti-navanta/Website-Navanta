"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagnifyingGlass, ArrowRight } from "@phosphor-icons/react";

type Role = { title: string; team: string; location: string; tags: string[] };

const ROLES: Role[] = [
  { title: "Senior AI Engineer — Supply Chain", team: "Engineering", location: "US · Remote", tags: ["us", "remote"] },
  { title: "Data Engineer — Enterprise Integrations", team: "Engineering", location: "India · Hybrid", tags: ["india"] },
  { title: "Full-Stack Engineer — Lens Platform", team: "Engineering", location: "India · Remote", tags: ["india", "remote"] },
  { title: "Forward-Deployed Solutions Lead", team: "Delivery & Solutions", location: "US · Hybrid", tags: ["us"] },
  { title: "Supply Chain Domain Expert", team: "Delivery & Solutions", location: "US · Remote", tags: ["us", "remote"] },
  { title: "Product Designer", team: "Product & Design", location: "Remote", tags: ["us", "india", "remote"] },
];

const TEAMS = ["Engineering", "Delivery & Solutions", "Product & Design"];
const FILTERS = [
  { key: "all", label: "All" },
  { key: "us", label: "United States" },
  { key: "india", label: "India" },
];

export default function CareersPositions() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROLES.filter(
      (r) =>
        (filter === "all" || r.tags.includes(filter)) &&
        (!q || `${r.title} ${r.team} ${r.location}`.toLowerCase().includes(q))
    );
  }, [filter, query]);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-10">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-2 text-[13.5px] transition-colors ${
                filter === f.key
                  ? "bg-zinc-900 font-medium text-white"
                  : "border border-zinc-200 text-zinc-600 hover:border-zinc-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2">
          <MagnifyingGlass size={15} className="text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roles…"
            className="w-40 bg-transparent text-[13.5px] text-zinc-800 outline-none placeholder:text-zinc-400"
          />
        </label>
      </div>

      {/* Grouped roles */}
      <div className="mt-10 space-y-12">
        {TEAMS.map((team) => {
          const roles = visible.filter((r) => r.team === team);
          return (
            <div key={team}>
              <h3 className="text-[20px] font-medium text-zinc-900">{team}</h3>
              {roles.length === 0 ? (
                <p className="mt-3 text-[14px] text-zinc-400">No open positions available.</p>
              ) : (
                <div className="mt-2 divide-y divide-zinc-100">
                  <AnimatePresence initial={false}>
                    {roles.map((r) => (
                      <motion.a
                        key={r.title}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={`mailto:admin@navanta.ai?subject=Application — ${encodeURIComponent(r.title)}`}
                        className="group flex items-center justify-between gap-4 py-4"
                      >
                        <span className="text-[15.5px] text-zinc-800 transition-colors group-hover:text-[#5C3D97]">
                          {r.title}
                        </span>
                        <span className="flex items-center gap-3 text-[13.5px] text-zinc-400">
                          {r.location}
                          <ArrowRight
                            size={15}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        </span>
                      </motion.a>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          );
        })}

        {/* General application */}
        <div>
          <h3 className="text-[20px] font-medium text-zinc-900">
            Can&apos;t find the role you&apos;re looking for?
          </h3>
          <a
            href="mailto:admin@navanta.ai?subject=General Application"
            className="group mt-2 flex items-center justify-between gap-4 py-4"
          >
            <span className="text-[15.5px] text-zinc-800 transition-colors group-hover:text-[#5C3D97]">
              General Application
            </span>
            <span className="flex items-center gap-3 text-[13.5px] text-zinc-400">
              US · India · Remote
              <ArrowRight size={15} className="opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
