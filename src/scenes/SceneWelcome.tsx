"use client";

import { motion, type Variants } from "motion/react";
import type { SceneProps } from "@/scenes/types";

// Title fades upward, then the username fades in (SCENES.md Welcome).
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function SceneWelcome({ data }: SceneProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center gap-4"
    >
      <motion.p
        variants={item}
        className="rounded-full bg-white/70 px-4 py-1 text-sm font-bold text-primary-deep shadow-sm"
      >
        ♟️ Chess Wrapped {data.year}
      </motion.p>
      <motion.h1
        variants={item}
        className="text-balance text-4xl font-extrabold text-ink sm:text-5xl"
      >
        Hey, <span className="text-lavender-gradient">{data.username}</span>
      </motion.h1>
      <motion.p variants={item} className="text-pretty text-lg text-ink-soft">
        Let&apos;s look back at your year.
      </motion.p>
    </motion.div>
  );
}
