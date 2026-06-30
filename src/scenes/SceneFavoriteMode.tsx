"use client";

import { motion } from "motion/react";
import { GAME_MODES, GAME_MODE_INFO } from "@/lib/gameModes";
import type { SceneProps } from "@/scenes/types";

// A few tiny sparkles that appear and fade once (COMPONENTS.md: 2–3, subtle).
const SPARKLES = [
  { x: -90, y: -10, delay: 0.5 },
  { x: 90, y: 6, delay: 0.65 },
  { x: 10, y: -28, delay: 0.8 },
];

export function SceneFavoriteMode({ data }: SceneProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm font-bold uppercase tracking-widest text-ink-soft">
        Your favorite mode
      </p>

      <ul className="flex flex-col gap-3 text-3xl font-extrabold sm:text-4xl">
        {GAME_MODES.map((mode) => {
          const { glyph, label } = GAME_MODE_INFO[mode];
          const isFav = mode === data.favoriteMode;
          return (
            <motion.li
              key={mode}
              className="relative flex items-center gap-3"
              initial={false}
              animate={
                isFav
                  ? { color: "var(--primary-deep)", scale: [1, 1.06, 1] }
                  : { color: "var(--draw)", scale: 1 }
              }
              transition={{ delay: 0.3, duration: 0.25, ease: "easeOut" }}
            >
              <span aria-hidden>{glyph}</span>
              <span>{label}</span>

              {isFav &&
                SPARKLES.map((s, i) => (
                  <motion.span
                    key={i}
                    className="sparkle-glow pointer-events-none absolute text-xl text-gold"
                    style={{ left: "50%", top: "50%" }}
                    initial={{ opacity: 0, scale: 0, x: s.x, y: s.y }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.1, 0.6] }}
                    transition={{ delay: s.delay, duration: 0.7, ease: "easeOut" }}
                  >
                    ✦
                  </motion.span>
                ))}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
