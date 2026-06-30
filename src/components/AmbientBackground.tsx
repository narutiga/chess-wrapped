"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Subtle ambient background: a faint chessboard texture plus a few very soft,
 * slowly drifting lavender/mint blobs. Motion is intentionally barely noticeable —
 * it adds depth without drawing attention. No particles, no flashy effects.
 *
 * Ported from the reference source. See BRAND.md (Backgrounds: faint chessboard
 * pattern at 2–3% opacity) and ANIMATION.md (calm, barely-noticed motion).
 */
export function AmbientBackground() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Extremely subtle chessboard pattern (~2.5% opacity) */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(45deg, var(--color-ink) 25%, transparent 25%, transparent 75%, var(--color-ink) 75%), linear-gradient(45deg, var(--color-ink) 25%, transparent 25%, transparent 75%, var(--color-ink) 75%)",
          backgroundSize: "120px 120px",
          backgroundPosition: "0 0, 60px 60px",
        }}
      />

      {/* Soft drifting blobs */}
      <Blob
        className="left-[-10%] top-[-8%] bg-accent"
        size={420}
        reduce={!!reduce}
        drift={{ x: 30, y: 24 }}
        duration={26}
      />
      <Blob
        className="right-[-12%] top-[20%] bg-primary"
        size={360}
        reduce={!!reduce}
        drift={{ x: -26, y: 30 }}
        duration={32}
        delay={3}
      />
      <Blob
        className="bottom-[-12%] left-[25%] bg-accent"
        size={380}
        reduce={!!reduce}
        drift={{ x: 24, y: -20 }}
        duration={30}
        delay={6}
      />
    </div>
  );
}

function Blob({
  className,
  size,
  drift,
  duration,
  delay = 0,
  reduce,
}: {
  className: string;
  size: number;
  drift: { x: number; y: number };
  duration: number;
  delay?: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      className={`absolute rounded-full opacity-40 blur-3xl ${className}`}
      style={{ width: size, height: size }}
      animate={reduce ? undefined : { x: [0, drift.x, 0], y: [0, drift.y, 0] }}
      transition={
        reduce
          ? undefined
          : { duration, delay, repeat: Infinity, ease: "easeInOut" }
      }
    />
  );
}
