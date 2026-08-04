"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ClockCountdown,
  Flag,
  CheckCircle,
  Warning,
  Package,
  TrendUp,
  type Icon,
} from "@phosphor-icons/react";

type Note = {
  icon: Icon;
  title: string;
  body: string;
  nested?: string[];
};

const NOTES: Note[] = [
  {
    icon: ClockCountdown,
    title: "Demand shift detected",
    body: "Midwest DC trending +18% on SKU 4482, reorder point review suggested",
  },
  {
    icon: Flag,
    title: "Delay risk flagged",
    body: "PO #4821, Rotterdam ETA slipped 6 days on ocean leg",
    nested: [
      "Expedite via alternate carrier adds $2.1K.",
      "Competitive quote requested.",
    ],
  },
  {
    icon: CheckCircle,
    title: "Reorder executed",
    body: "Auto-PO issued for 240 units, planner approved at 92% confidence",
  },
  {
    icon: Warning,
    title: "Supplier risk elevated",
    body: "Kirby Risk on-time delivery fell to 91%, alternate supplier suggested",
  },
  {
    icon: Package,
    title: "Stockout prevented",
    body: "DC-West rebalance shipped 180 units ahead of a demand spike",
  },
  {
    icon: TrendUp,
    title: "Savings captured",
    body: "$21K committed via a consolidated buy across 3 sites",
  },
];

const WINDOW = 3;
const INTERVAL = 2400;

function MobileNotificationCard({ note }: { note: Note }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#2a1f15]/40 backdrop-blur-2xl backdrop-saturate-150">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <note.icon size={14} className="text-white/75" />
        <span className="text-[12px] font-medium text-white/95">{note.title}</span>
      </div>
      <div className="px-3 py-2">
        <p className="text-[11.5px] leading-snug text-white/75">{note.body}</p>
      </div>
    </div>
  );
}

function NotificationCard({ note }: { note: Note }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#2a1f15]/40 backdrop-blur-2xl backdrop-saturate-150">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-2.5">
        <note.icon size={16} className="text-white/75" />
        <span className="text-[14px] font-medium text-white/95">
          {note.title}
        </span>
      </div>
      <div className="px-4 py-3">
        <p className="text-[13.5px] leading-snug text-white/75">{note.body}</p>
        {note.nested && (
          <div className="mt-2.5 rounded-xl bg-white/[0.07] px-3.5 py-2.5">
            {note.nested.map((line) => (
              <p
                key={line}
                className="text-[13px] leading-relaxed text-white/80"
              >
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HeroNotifications() {
  const [feed, setFeed] = useState<{ id: number; note: Note }[]>(() =>
    Array.from({ length: WINDOW }, (_, i) => ({ id: i, note: NOTES[i] }))
  );

  const [mobileIdx, setMobileIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setFeed((prev) => {
        const id = prev[prev.length - 1].id + 1;
        return [...prev, { id, note: NOTES[id % NOTES.length] }].slice(-WINDOW);
      });
      setMobileIdx((i) => (i + 1) % NOTES.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.8 }}
      className="pointer-events-none absolute z-10 bottom-16 left-0 right-0 lg:bottom-16 lg:left-auto lg:right-10"
    >
      {/* Mobile: single centered card, compact */}
      <div className="flex justify-center px-8 lg:hidden">
        <div className="w-full max-w-[280px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mobileIdx}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.25 } }}
              transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.8 }}
            >
              <MobileNotificationCard note={NOTES[mobileIdx]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop: 3-card zigzag stack */}
      <div className="hidden lg:flex h-[440px] w-[460px] flex-col justify-end gap-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {feed.map(({ id, note }) => (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.97,
                transition: { duration: 0.32 },
              }}
              transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
              className={id % 2 === 0 ? "w-[76%] self-end" : "w-[76%] self-start"}
            >
              <NotificationCard note={note} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
