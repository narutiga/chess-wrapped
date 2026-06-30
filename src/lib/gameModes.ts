import type { GameMode } from "@/types/wrapped";

/**
 * Display info for each game mode — the single source of truth for the
 * label and Unicode glyph shown anywhere a mode appears (favorite-mode
 * scene, poster). Order follows SCENES.md (Favorite Game Mode).
 *
 * Each glyph carries a U+FE0E text-variation selector so it always renders as
 * a flat text glyph. Without it, some platforms (notably iOS/Safari) show the
 * pawn ♟ as a color emoji while the other pieces stay text — an inconsistent mix.
 */
export const GAME_MODE_INFO: Record<GameMode, { label: string; glyph: string }> = {
  bullet: { label: "Bullet", glyph: "♟︎" },
  blitz: { label: "Blitz", glyph: "♞︎" },
  rapid: { label: "Rapid", glyph: "♝︎" },
  daily: { label: "Daily", glyph: "♜︎" },
};

/** Modes in display order. */
export const GAME_MODES: GameMode[] = ["bullet", "blitz", "rapid", "daily"];
