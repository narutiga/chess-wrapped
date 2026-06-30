"use server";

import { getWrappedData, NoGamesError } from "@/lib/wrapped";
import { PlayerNotFoundError } from "@/lib/chesscom";
import { TARGET_YEAR } from "@/lib/config";
import type { WrappedData } from "@/types/wrapped";

export type WrappedResult =
  | { ok: true; data: WrappedData }
  | { ok: false; message: string };

/**
 * Fetch a player's Wrapped for the target year.
 *
 * Friendly errors only — never leak raw API errors to the UI.
 * See docs/SCENES.md (When a Player Has No Games) and
 * docs/DEVELOPMENT.md (Error Handling).
 */
export async function getWrapped(usernameRaw: string): Promise<WrappedResult> {
  const username = usernameRaw.trim();

  if (!username) {
    return { ok: false, message: "Enter a Chess.com username to begin." };
  }

  try {
    const data = await getWrappedData(username, TARGET_YEAR);
    return { ok: true, data };
  } catch (err) {
    if (err instanceof PlayerNotFoundError) {
      return {
        ok: false,
        message: `We couldn't find "${username}" on Chess.com. Check the spelling and try again.`,
      };
    }
    if (err instanceof NoGamesError) {
      return {
        ok: false,
        message: `Hmm, no games yet for "${username}" in ${TARGET_YEAR}. Play a few and come back!`,
      };
    }
    return {
      ok: false,
      message: "Something went wrong reaching Chess.com. Please try again in a moment.",
    };
  }
}
