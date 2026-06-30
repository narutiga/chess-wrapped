"use client";

import { useRef } from "react";
import { PosterCard } from "@/scenes/PosterCard";
import { PosterActions } from "@/scenes/PosterActions";
import type { SceneProps } from "@/scenes/types";

/**
 * The final scene: the poster (PosterCard) plus its share actions
 * (PosterActions). The card ref is shared so actions can export it.
 */
export function ScenePoster({ data, onRestart }: SceneProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-[340px] flex-col items-center gap-6">
      <PosterCard data={data} innerRef={cardRef} />
      <PosterActions data={data} cardRef={cardRef} onRestart={onRestart} />
    </div>
  );
}
