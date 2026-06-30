import type { SceneDef } from "@/scenes/types";
import { SceneWelcome } from "@/scenes/SceneWelcome";
import { SceneGames } from "@/scenes/SceneGames";
import { SceneFavoriteMode } from "@/scenes/SceneFavoriteMode";
import { SceneRating } from "@/scenes/SceneRating";
import { SceneWinRate } from "@/scenes/SceneWinRate";
import { SceneSummary } from "@/scenes/SceneSummary";
import { ScenePoster } from "@/scenes/ScenePoster";

/**
 * The ordered scene list. This is the story.
 *
 * Order and durations follow SCENES.md (Scene Timing). To reorder or retime
 * the experience, edit this one list — nothing else needs to change.
 */
export const SCENES: SceneDef[] = [
  { id: "welcome", duration: 3000, component: SceneWelcome },
  { id: "games", duration: 4000, component: SceneGames },
  { id: "favorite-mode", duration: 4000, component: SceneFavoriteMode },
  { id: "rating", duration: 4000, component: SceneRating },
  { id: "win-rate", duration: 3000, component: SceneWinRate },
  { id: "summary", duration: 3000, component: SceneSummary },
  { id: "poster", duration: 6000, component: ScenePoster },
];
