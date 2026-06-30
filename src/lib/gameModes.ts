import type { GameMode } from "@/types/wrapped";

/**
 * Display info for each game mode — the single source of truth for the
 * label and Unicode glyph shown anywhere a mode appears (favorite-mode
 * scene, poster). Order follows SCENES.md (Favorite Game Mode).
 */
export const GAME_MODE_INFO: Record<GameMode, { label: string; glyph: string }> = {
  bullet: { label: "Bullet", glyph: "♟" },
  blitz: { label: "Blitz", glyph: "♞" },
  rapid: { label: "Rapid", glyph: "♝" },
  daily: { label: "Daily", glyph: "♜" },
};

/** Modes in display order. */
export const GAME_MODES: GameMode[] = ["bullet", "blitz", "rapid", "daily"];
