"use client";

import { motion } from "motion/react";
import { CountUp } from "@/components/CountUp";
import { BurstSparkles } from "@/components/BurstSparkles";
import { SceneStat } from "@/scenes/SceneStat";
import { SPARKLE_AFTER_COUNT_UP_S } from "@/lib/timing";
import type { SceneProps } from "@/scenes/types";

export function SceneGames({ data }: SceneProps) {
  return (
    // Gentle pop after the count completes (SCENES.md: 1 → 1.05 → 1).
    <motion.div
      className="relative"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ delay: SPARKLE_AFTER_COUNT_UP_S, duration: 0.5, ease: "easeInOut" }}
    >
      <SceneStat
        label="You played"
        value={<CountUp value={data.gamesPlayed} />}
        caption="games this year"
      />
      {/* Celebrate once the count lands. */}
      <BurstSparkles />
    </motion.div>
  );
}
