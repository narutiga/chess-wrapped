"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The poster reveal: a settle-in entrance (scale 0.95 → 1) with a single
 * diagonal sheen sweeping top-left → bottom-right once on mount.
 *
 * No pointer tilt or tracking glare — the card is still; only the one-shot
 * sheen plays. Honors prefers-reduced-motion (no sheen, instant card).
 *
 * (Named TiltCard for historical reasons; it no longer tilts.)
 */
export function TiltCard({
  children,
  className,
  innerRef,
}: {
  children: React.ReactNode;
  className?: string;
  /** Ref to the card element, e.g. for image export. */
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={innerRef}
      initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative ${className ?? ""}`}
    >
      {children}

      {/* One-shot diagonal sheen: top-left → bottom-right. */}
      {!reduce && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        >
          <motion.div
            className="absolute -inset-y-1/2 left-0 w-2/3 rotate-45"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
            }}
            // Sweeps the rotated band diagonally across the card: starts
            // off-screen at top-left, ends off-screen at bottom-right.
            initial={{ x: "-180%", y: "60%" }}
            animate={{ x: "260%", y: "-60%" }}
            transition={{ delay: 1, duration: 2.6, ease: "easeInOut" }}
          />
        </div>
      )}
    </motion.div>
  );
}
