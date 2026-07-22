"use client";

import { motion } from "framer-motion";

/** Dark header band for inner pages — gives the transparent nav a dark
 *  backdrop and sets up the page title. */
export default function PageHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <header className="relative overflow-hidden bg-[#0c0b0a] pb-20 pt-40">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_0%,#2a2119_0%,#161210_55%,#0c0b0a_100%)]"
      />
      <div className="relative mx-auto max-w-[1560px] px-6 lg:px-10">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] font-medium text-[#a98be0]"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="mt-3 text-[40px] font-medium leading-[1.05] tracking-tight text-white sm:text-[56px]"
        >
          {title}
        </motion.h1>
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/60"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </header>
  );
}
