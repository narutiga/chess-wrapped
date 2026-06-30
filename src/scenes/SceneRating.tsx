"use client";

import { motion } from "motion/react";
import { CountUp } from "@/components/CountUp";
import { BurstSparkles } from "@/components/BurstSparkles";
import { SceneStat } from "@/scenes/SceneStat";
import type { SceneProps } from "@/scenes/types";

export function SceneRating({ data }: SceneProps) {
  const showPeak = data.bestRating > data.currentRating;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <SceneStat
          label="Current rating"
          value={<CountUp value={data.currentRating} />}
        />
        {/* Celebrate once the rating lands. */}
        <BurstSparkles />
      </div>

      {/* Peak fades in after the current rating counts up (SCENES.md). */}
      {showPeak && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5, ease: "easeOut" }}
          className="text-lg font-bold text-ink-soft"
        >
          <span className="text-accent">★</span> Best {data.bestRating.toLocaleString()}
        </motion.p>
      )}
    </div>
  );
}
