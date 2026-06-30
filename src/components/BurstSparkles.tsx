"use client";

import { motion, useReducedMotion } from "motion/react";
import { SPARKLE_AFTER_COUNT_UP_S } from "@/lib/timing";

/**
 * A one-shot gold sparkle burst to celebrate a value landing.
 *
 * 2–3 sparkles appear quickly and fade once — they never repeat
 * (COMPONENTS.md / ANIMATION.md: "Sparkles celebrate. They do not entertain.").
 * Place inside a relatively-positioned element; sparkles radiate from center.
 *
 * @param delay  seconds before bursting. Defaults to just after a count-up
 *               lands (SPARKLE_AFTER_COUNT_UP_S) so the two stay in sync.
 */
const POINTS = [
  { x: -130, y: -58, size: 56 },
  { x: 136, y: -34, size: 46 },
  { x: 30, y: -110, size: 36 },
];

export function BurstSparkles({
  delay = SPARKLE_AFTER_COUNT_UP_S,
}: {
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {POINTS.map((p, i) => (
        <motion.span
          className="sparkle-glow absolute left-1/2 top-1/2 text-gold"
          key={i}
          style={{ fontSize: p.size }}
          initial={{ opacity: 0, scale: 0, x: p.x, y: p.y }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.1, 0.6] }}
          transition={{ delay: delay + i * 0.08, duration: 1.1, ease: "easeOut" }}
        >
          ✦
        </motion.span>
      ))}
    </span>
  );
}
