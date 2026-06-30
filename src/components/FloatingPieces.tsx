"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Softly floating Unicode chess pieces in the four corners.
 * - Each piece drifts gently up and down only (no rotation, no bounce)
 * - Independent timing per piece so they never move in lockstep
 * - Doesn't animate when prefers-reduced-motion is set
 * To swap in original artwork later, replace the <span>{p.char}</span> here with
 * an <Image>/<svg> and it applies everywhere.
 *
 * Ported from the reference source (framer-motion → motion/react). Decoration
 * only — noticed on a second look (BRAND.md). Size/opacity come from `className`.
 */

type Piece = {
  char: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  /** Vertical float distance (px) */
  rise: number;
  /** One full cycle (seconds) */
  duration: number;
  delay: number;
};

const PIECES: Piece[] = [
  { char: "♞", top: "12%", left: "8%", rise: 5, duration: 9, delay: 0 },
  { char: "♛", top: "20%", right: "10%", rise: 5, duration: 11, delay: 1.5 },
  { char: "♜", bottom: "14%", left: "14%", rise: 5, duration: 8, delay: 3 },
  { char: "♝", bottom: "18%", right: "12%", rise: 5, duration: 10, delay: 0.8 },
];

export function FloatingPieces({
  className = "",
}: {
  /** Extra classes passed to the wrapper div (for opacity/size tuning) */
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 select-none ${className}`}
    >
      {PIECES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute leading-none"
          style={{
            top: p.top,
            bottom: p.bottom,
            left: p.left,
            right: p.right,
          }}
          animate={reduce ? undefined : { y: [0, -p.rise, 0] }}
          transition={
            reduce
              ? undefined
              : {
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          {p.char}
        </motion.span>
      ))}
    </div>
  );
}
