/**
 * Shared animation timing.
 *
 * The count-up and its celebration sparkle are coupled: the sparkle must
 * fire only after the number finishes counting. Keeping both values here
 * (and deriving the sparkle delay from the count-up duration) makes that
 * relationship explicit — change the count-up and the sparkle follows.
 *
 * See ANIMATION.md (Numbers).
 */

/** How long a number counts up, in milliseconds. */
export const COUNT_UP_MS = 1400;

/** Seconds to wait before the celebration sparkle bursts (just after the
 *  count-up lands). Derived from COUNT_UP_MS so they never desync. */
export const SPARKLE_AFTER_COUNT_UP_S = COUNT_UP_MS / 1000 + 0.1;
