"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Drives automatic scene progression for the Wrapped player.
 *
 * Each scene holds for its own duration, then advances on its own
 * (SCENES.md: ~27s total, each scene leads naturally to the next).
 * Tap/click can skip ahead at any time.
 *
 * @param durations  per-scene hold time in ms, in scene order
 */
export function useSceneProgress(durations: number[]) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = durations.length;
  const isLast = index >= count - 1;

  const clear = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const next = useCallback(() => {
    clear();
    setIndex((i) => Math.min(i + 1, count - 1));
  }, [count]);

  const prev = useCallback(() => {
    clear();
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback(
    (i: number) => {
      clear();
      setIndex(Math.max(0, Math.min(i, count - 1)));
    },
    [count],
  );

  // Auto-advance: schedule the jump to the next scene, except on the last one.
  useEffect(() => {
    clear();
    if (isLast) return;
    timer.current = setTimeout(() => {
      setIndex((i) => Math.min(i + 1, count - 1));
    }, durations[index]);
    return clear;
  }, [index, isLast, count, durations]);

  return { index, isLast, next, prev, goTo };
}
