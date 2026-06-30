/**
 * Raw Chess.com Public API response shapes.
 *
 * These mirror the JSON returned by the API. Only the fields Chess Wrapped
 * actually uses are typed. The data layer maps these into the WrappedData
 * internal model — scenes never see these types.
 *
 * See docs/DATA.md for the mapping.
 */

import type { GameMode } from "@/types/wrapped";

/** GET /pub/player/{username} */
export interface ChessComPlayer {
  username: string;
  followers: number;
  /** Unix timestamp in seconds. */
  joined: number;
  /** Avatar image URL; absent if the player has none. */
  avatar?: string;
}

/** GET /pub/player/{username}/games/archives — list of monthly archive URLs. */
export interface ChessComArchives {
  archives: string[];
}

/** One player's side of a game in a monthly archive. */
export interface ChessComArchiveSide {
  username: string;
  rating?: number;
  /** Outcome for this side: "win", or a loss/draw reason like "checkmated". */
  result?: string;
}

/** One game in a monthly archive (only the fields Stage B uses). */
export interface ChessComArchiveGame {
  white: ChessComArchiveSide;
  black: ChessComArchiveSide;
  time_class?: GameMode;
  end_time?: number;
}

/** GET /pub/player/{username}/games/{YYYY}/{MM} */
export interface ChessComMonthlyGames {
  games: ChessComArchiveGame[];
}
