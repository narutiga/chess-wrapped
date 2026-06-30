"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Scattered gold sparkles for an elegant, premium accent (not flashy).
 * Varied sizes and a slow, staggered twinkle — they reward a second look.
 * Honors prefers-reduced-motion (static, no twinkle).
 */

type Spark = {
  top: string;
  left: string;
  size: number;
  delay: number;
  opacity: number;
};

// Positioned to frame the card without covering the central content.
// Strong size contrast: a few large hero sparkles among small ones.
const SPARKS: Spark[] = [
  { top: "8%", left: "12%", size: 26, delay: 0.0, opacity: 0.9 },
  { top: "16%", left: "85%", size: 10, delay: 0.6, opacity: 0.8 },
  { top: "6%", left: "62%", size: 7, delay: 1.1, opacity: 0.6 },
  { top: "44%", left: "6%", size: 8, delay: 0.3, opacity: 0.7 },
  { top: "40%", left: "92%", size: 22, delay: 0.9, opacity: 0.85 },
  { top: "74%", left: "16%", size: 9, delay: 1.4, opacity: 0.7 },
  { top: "82%", left: "80%", size: 24, delay: 0.5, opacity: 0.9 },
  { top: "90%", left: "50%", size: 7, delay: 1.7, opacity: 0.6 },
];

export function GoldSparkles({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {SPARKS.map((s, i) => (
        <motion.span
          key={i}
          className="sparkle-glow absolute text-gold"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
          }}
          initial={{ opacity: reduce ? s.opacity : 0, scale: reduce ? 1 : 0.4 }}
          animate={
            reduce
              ? { opacity: s.opacity }
              : {
                  // Twinkle: fade in → full → dip → settle back.
                  opacity: [0, s.opacity, s.opacity * 0.5, s.opacity],
                  scale: [0.4, 1, 0.85, 1],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  delay: s.delay,
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }
          }
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}
