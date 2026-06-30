"use client";

import { motion, useReducedMotion } from "motion/react";
import { CountUp } from "@/components/CountUp";
import { BurstSparkles } from "@/components/BurstSparkles";
import { COUNT_UP_MS } from "@/lib/timing";
import type { SceneProps } from "@/scenes/types";

const RING_DIAMETER = 220;
const RING_STROKE_WIDTH = 16;
const RING_RADIUS = (RING_DIAMETER - RING_STROKE_WIDTH) / 2;

export function SceneWinRate({ data }: SceneProps) {
  const reduce = useReducedMotion();
  // Win rate as a 0–1 fraction, used directly as the ring's pathLength.
  const winRateFraction = Math.max(0, Math.min(100, data.winRate)) / 100;

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-sm font-bold uppercase tracking-widest text-ink-soft">
        Win rate
      </p>

      <div
        className="relative"
        style={{ width: RING_DIAMETER, height: RING_DIAMETER }}
      >
        <svg width={RING_DIAMETER} height={RING_DIAMETER} className="-rotate-90">
          {/* Track */}
          <circle
            cx={RING_DIAMETER / 2}
            cy={RING_DIAMETER / 2}
            r={RING_RADIUS}
            fill="none"
            stroke="var(--draw)"
            strokeWidth={RING_STROKE_WIDTH}
            opacity={0.4}
          />
          {/* Progress ring. With pathLength normalized to 1, animating it from
              0 to winRateFraction fills exactly that fraction of the circle. */}
          <motion.circle
            cx={RING_DIAMETER / 2}
            cy={RING_DIAMETER / 2}
            r={RING_RADIUS}
            fill="none"
            stroke="var(--primary-deep)"
            strokeWidth={RING_STROKE_WIDTH}
            strokeLinecap="round"
            pathLength={1}
            initial={{ pathLength: reduce ? winRateFraction : 0 }}
            animate={{ pathLength: winRateFraction }}
            transition={{ duration: COUNT_UP_MS / 1000, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <CountUp
            value={data.winRate}
            suffix="%"
            className="text-5xl font-extrabold text-primary-deep"
          />
        </div>
        {/* Celebrate once the ring fills (SCENES.md: tiny sparkle at completion). */}
        <BurstSparkles />
      </div>
    </div>
  );
}
