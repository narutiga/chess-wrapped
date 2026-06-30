"use client";

import { AnimatePresence } from "motion/react";
import { useSceneProgress } from "@/hooks/useSceneProgress";
import { SceneContainer } from "@/components/SceneContainer";
import { AmbientBackground } from "@/components/AmbientBackground";
import { FloatingPieces } from "@/components/FloatingPieces";
import { SCENES } from "@/scenes/registry";
import type { WrappedData } from "@/types/wrapped";

/**
 * Plays the Wrapped scenes in order for one player.
 *
 * Auto-advances per scene timing (SCENES.md). Tap/click skips ahead.
 * Knows nothing about how the data was fetched — it just receives WrappedData.
 */
export function WrappedPlayer({ data }: { data: WrappedData }) {
  const durations = SCENES.map((s) => s.duration);
  const { index, isLast, next } = useSceneProgress(durations);

  const current = SCENES[index];
  const Scene = current.component;

  return (
    <main
      onClick={() => !isLast && next()}
      className="no-select relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-bg to-bg-2"
    >
      <AmbientBackground />
      <FloatingPieces className="text-[7rem] opacity-[0.16]" />

      <AnimatePresence mode="wait">
        <SceneContainer key={current.id}>
          <Scene data={data} />
        </SceneContainer>
      </AnimatePresence>
    </main>
  );
}
