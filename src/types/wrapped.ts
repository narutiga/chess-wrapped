/**
 * The single internal data model that every scene receives.
 *
 * Scenes never read Chess.com API responses directly — they read this model.
 * It is the contract between the data layer and the scenes, and must stay
 * identical no matter how the data was fetched (Stage A or Stage B).
 *
 * See docs/DATA.md for field definitions and the API mapping.
 */

/** A Chess.com game mode. Always lowercase. Never stores an icon or emoji. */
export type GameMode = "bullet" | "blitz" | "rapid" | "daily";

export interface WrappedData {
  /** Chess.com username, e.g. "riku_jp". */
  username: string;
  /** Target year of the recap, e.g. 2026. */
  year: number;

  /** Total games in the recap (win + loss + draw). */
  gamesPlayed: number;
  /** Win rate as a whole number 0–100, already rounded. Draws count in the denominator. */
  winRate: number;

  /** The mode with the most games played. */
  favoriteMode: GameMode;

  /** Current rating in the favorite mode only. Never mixes modes. */
  currentRating: number;
  /** Peak rating in the favorite mode only. May equal currentRating. */
  bestRating: number;

  /** 4-digit year the player joined, e.g. 2026. */
  joinedYear: number;
  /** Month + year the player joined, e.g. "Feb 2026". */
  joinedLabel: string;
  /** ISO 3166-1 alpha-2 country code (e.g. "JP"), or null if unknown. */
  country: string | null;
  /** Follower count (a lifetime value). */
  followers: number;

  /** Avatar image URL, or null if the player has none. */
  avatar: string | null;
}
