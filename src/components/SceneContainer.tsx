"use client";

import { motion } from "motion/react";

/**
 * Wraps a single scene and applies the shared transition.
 *
 * ANIMATION.md (Scene Transitions): the current scene fades and drifts
 * upward a few pixels, the next fades in while rising — the user should
 * barely notice the cut. Every scene reuses this; no per-scene transitions.
 */
export function SceneContainer({
  children,
  scrollable = false,
}: {
  children: React.ReactNode;
  /** Tall scenes (the poster) flow with the page so they can scroll; the rest
   *  stay pinned to the viewport and centered. */
  scrollable?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={
        scrollable
          ? "flex min-h-screen flex-col items-center justify-center px-6 py-10 text-center text-ink"
          : "absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ink"
      }
    >
      {children}
    </motion.section>
  );
}
