/**
 * Builds the WrappedData internal model from a player's games in the target
 * year (Stage B — see docs/DATA.md / docs/SCENES.md "Two Data Stages").
 *
 * We fetch only the target year's monthly archives, aggregate the games into
 * the model the scenes consume, and discard everything else. Field definitions
 * follow docs/DATA.md.
 */

import type {
  ChessComArchiveGame,
  ChessComArchiveSide,
  ChessComPlayer,
} from "@/types/chesscom";
import type { GameMode, WrappedData } from "@/types/wrapped";
import { fetchArchives, fetchMonth, fetchPlayer } from "@/lib/chesscom";

/** Result strings that count as a draw; "win" is a win; everything else a loss. */
const DRAW_RESULTS = new Set([
  "agreed",
  "repetition",
  "stalemate",
  "insufficient",
  "50move",
  "timevsinsufficient",
]);

/** Thrown when the player has no games in the target year. */
export class NoGamesError extends Error {
  constructor(username: string) {
    super(`No games found for: ${username}`);
    this.name = "NoGamesError";
  }
}

type ModeTally = {
  wins: number;
  losses: number;
  draws: number;
  /** This player's rating per game, in chronological order. */
  ratings: number[];
};

function emptyTally(): ModeTally {
  return { wins: 0, losses: 0, draws: 0, ratings: [] };
}

/** The side of a game belonging to `username`, or null if neither matches. */
function mySide(
  game: ChessComArchiveGame,
  username: string,
): ChessComArchiveSide | null {
  const u = username.toLowerCase();
  if (game.white.username.toLowerCase() === u) return game.white;
  if (game.black.username.toLowerCase() === u) return game.black;
  return null;
}

/**
 * Aggregate a year's games into the WrappedData model. Pure; easy to test.
 * Games may arrive in any order; we sort by end_time so "current rating" is
 * genuinely the latest.
 */
export function buildWrappedDataFromGames(
  player: ChessComPlayer,
  games: ChessComArchiveGame[],
  year: number,
): WrappedData {
  const byMode = new Map<GameMode, ModeTally>();

  const sorted = [...games].sort(
    (a, b) => (a.end_time ?? 0) - (b.end_time ?? 0),
  );

  for (const game of sorted) {
    const mode = game.time_class;
    if (!mode) continue;
    const side = mySide(game, player.username);
    if (!side) continue;

    const tally = byMode.get(mode) ?? emptyTally();
    if (side.result === "win") tally.wins++;
    else if (side.result && DRAW_RESULTS.has(side.result)) tally.draws++;
    else tally.losses++;
    if (typeof side.rating === "number") tally.ratings.push(side.rating);
    byMode.set(mode, tally);
  }

  if (byMode.size === 0) {
    throw new NoGamesError(player.username);
  }

  const total = (t: ModeTally) => t.wins + t.losses + t.draws;

  // Favorite mode: most games. Tie → higher current (latest) rating.
  let favoriteMode!: GameMode;
  let favoriteTally!: ModeTally;
  for (const [mode, tally] of byMode) {
    if (!favoriteTally) {
      favoriteMode = mode;
      favoriteTally = tally;
      continue;
    }
    const better =
      total(tally) !== total(favoriteTally)
        ? total(tally) > total(favoriteTally)
        : lastRating(tally) > lastRating(favoriteTally);
    if (better) {
      favoriteMode = mode;
      favoriteTally = tally;
    }
  }

  // Totals across every mode played this year.
  let wins = 0;
  let games_ = 0;
  for (const tally of byMode.values()) {
    wins += tally.wins;
    games_ += total(tally);
  }

  const joined = new Date(player.joined * 1000);

  return {
    username: player.username,
    year,
    gamesPlayed: games_,
    winRate: Math.round((wins / games_) * 100),
    favoriteMode,
    currentRating: lastRating(favoriteTally),
    bestRating: favoriteTally.ratings.length
      ? Math.max(...favoriteTally.ratings)
      : 0,
    joinedYear: joined.getUTCFullYear(),
    joinedLabel: `${MONTHS[joined.getUTCMonth()]} ${joined.getUTCFullYear()}`,
    country: countryCode(player.country),
    followers: player.followers,
    avatar: player.avatar ?? null,
  };
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** The ISO code at the end of a Chess.com country URL (".../country/JP" → "JP"). */
function countryCode(url: string | undefined): string | null {
  if (!url) return null;
  const code = url.split("/").pop();
  return code && code.length === 2 ? code.toUpperCase() : null;
}

function lastRating(t: ModeTally): number {
  return t.ratings.length ? t.ratings[t.ratings.length - 1] : 0;
}

/**
 * Fetch a player's target-year games from Chess.com and build the model.
 *
 * Only the target year's monthly archives are fetched (bounded cost, even for
 * very active players), in parallel.
 */
export async function getWrappedData(
  username: string,
  year: number,
): Promise<WrappedData> {
  const [player, { archives }] = await Promise.all([
    fetchPlayer(username),
    fetchArchives(username),
  ]);

  // Archive URLs end in /YYYY/MM — keep only the target year's months.
  const monthUrls = archives.filter((url) => url.includes(`/${year}/`));
  if (monthUrls.length === 0) {
    throw new NoGamesError(username);
  }

  const months = await Promise.all(
    monthUrls.map((url) => fetchMonth(url, username)),
  );
  const games = months.flatMap((m) => m.games);

  return buildWrappedDataFromGames(player, games, year);
}
