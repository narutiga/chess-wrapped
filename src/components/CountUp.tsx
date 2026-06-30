"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { COUNT_UP_MS } from "@/lib/timing";

/**
 * Animates a number upward from 0 to `value`.
 *
 * ANIMATION.md (Numbers): always count upward, never place the value instantly,
 * not too fast, and hold the final value. Honors prefers-reduced-motion by
 * showing the final value immediately.
 */
export function CountUp({
  value,
  duration = COUNT_UP_MS,
  suffix = "",
  className,
}: {
  value: number;
  /** Count-up duration in ms. */
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [counted, setCounted] = useState(0);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) return; // reduced motion: render the final value, no count.

    let startTs: number | null = null;
    // Cubic easeOut: 1 - (1 - t)³ — fast at first, decelerating into the value.
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(elapsed / duration, 1); // 0 → 1 over `duration`
      setCounted(Math.round(ease(progress) * value));
      if (progress < 1) frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
    };
  }, [value, duration, reduce]);

  const display = reduce ? value : counted;

  return (
    <span className={className}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
