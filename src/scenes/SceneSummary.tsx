"use client";

import { motion, type Variants } from "motion/react";
import type { SceneProps } from "@/scenes/types";

// Cards appear one by one with stagger (SCENES.md Player Summary).
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function SceneSummary({ data }: SceneProps) {
  const items = [
    { label: "Playing since", value: data.joinedYear },
    { label: "Followers", value: data.followers.toLocaleString() },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-4"
    >
      {items.map((it) => (
        <motion.div
          key={it.label}
          variants={card}
          className="flex flex-col items-center gap-1 rounded-card bg-white/70 px-12 py-6 shadow-soft"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-ink-soft">
            {it.label}
          </span>
          <span className="text-4xl font-extrabold text-primary-deep">
            {it.value}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
