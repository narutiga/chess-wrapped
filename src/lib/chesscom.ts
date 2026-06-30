/**
 * Chess.com Public API client.
 *
 * Fetches only the endpoints Chess Wrapped needs. No OAuth.
 * See docs/DATA.md and docs/SCENES.md (Two Data Stages).
 */

import type {
  ChessComArchives,
  ChessComMonthlyGames,
  ChessComPlayer,
} from "@/types/chesscom";

const BASE = "https://api.chess.com/pub";

/** Thrown when a username does not exist on Chess.com. */
export class PlayerNotFoundError extends Error {
  constructor(username: string) {
    super(`Player not found: ${username}`);
    this.name = "PlayerNotFoundError";
  }
}

async function getJson<T>(url: string, username: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (res.status === 404) {
    throw new PlayerNotFoundError(username);
  }
  if (!res.ok) {
    throw new Error(`Chess.com API error ${res.status} for ${url}`);
  }

  return (await res.json()) as T;
}

export function fetchPlayer(username: string): Promise<ChessComPlayer> {
  return getJson<ChessComPlayer>(`${BASE}/player/${username}`, username);
}

/** The list of monthly archive URLs for a player (one per month played). */
export function fetchArchives(username: string): Promise<ChessComArchives> {
  return getJson<ChessComArchives>(
    `${BASE}/player/${username}/games/archives`,
    username,
  );
}

/**
 * Games for one month. The URL comes straight from the archives list, so it
 * already includes the base path and username.
 */
export function fetchMonth(
  url: string,
  username: string,
): Promise<ChessComMonthlyGames> {
  return getJson<ChessComMonthlyGames>(url, username);
}
