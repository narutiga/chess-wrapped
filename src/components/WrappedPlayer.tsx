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
export function WrappedPlayer({
  data,
  onRestart,
}: {
  data: WrappedData;
  onRestart?: () => void;
}) {
  const durations = SCENES.map((s) => s.duration);
  const { index, isLast, next } = useSceneProgress(durations);

  const current = SCENES[index];
  const Scene = current.component;

  return (
    <main
      onClick={() => !isLast && next()}
      // During playback the scenes are pinned and clipped; on the final
      // (poster) scene we allow vertical scroll so tall content stays reachable.
      className={`no-select relative min-h-screen w-full bg-gradient-to-b from-bg to-bg-2 ${
        isLast ? "overflow-y-auto" : "overflow-hidden"
      }`}
    >
      <AmbientBackground />
      <FloatingPieces className="text-[7rem] opacity-[0.16]" />

      <AnimatePresence mode="wait">
        <SceneContainer key={current.id} scrollable={isLast}>
          <Scene data={data} onRestart={onRestart} />
        </SceneContainer>
      </AnimatePresence>
    </main>
  );
}
