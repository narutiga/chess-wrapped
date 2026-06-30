"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useTransition } from "react";
import { getWrapped } from "@/app/actions";
import type { WrappedData } from "@/types/wrapped";

/**
 * Username input for the Welcome screen.
 *
 * Visuals ported from the reference source (pill, ring, lifting Go button,
 * pawn-hop on submit — SCENES.md "Pawn performs one gentle bounce").
 * Architecture: page-in-state — instead of routing, it calls the getWrapped
 * Server Action and hands the result up via onResult.
 */
export function SearchBar({
  initialValue = "",
  onResult,
}: {
  initialValue?: string;
  onResult: (data: WrappedData) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [submitting, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const username = value.trim();
    if (!username) {
      setError("Please enter a username");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await getWrapped(username);
      if (result.ok) onResult(result.data);
      else setError(result.message);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <motion.div
        // Input fades as the transition begins so attention moves forward.
        animate={{ opacity: submitting ? 0.35 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="group flex items-center gap-2 rounded-3xl bg-white/80 p-2 pl-5 shadow-lg shadow-primary/20 ring-2 ring-primary/40 backdrop-blur transition-shadow duration-200 hover:shadow-xl hover:shadow-primary/30 hover:ring-primary/60 focus-within:shadow-xl focus-within:shadow-accent/40 focus-within:ring-2 focus-within:ring-accent"
      >
        <input
          type="text"
          inputMode="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Chess.com username"
          aria-label="Chess.com username"
          className="min-w-0 flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-ink-soft/70"
          disabled={submitting}
        />
        <motion.button
          type="submit"
          // Hover: lift + stronger shadow. Click: quick scale-down and back.
          whileHover={submitting ? undefined : { y: -2 }}
          whileTap={submitting ? undefined : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          disabled={submitting}
          className="relative shrink-0 overflow-hidden rounded-2xl bg-primary-deep px-5 py-3 text-base font-bold text-white shadow-md transition-shadow duration-200 hover:shadow-lg hover:shadow-primary-deep/40 disabled:opacity-90"
        >
          {/* Keep label width stable; swap in a hopping pawn on submit. */}
          <span className={submitting ? "opacity-0" : "opacity-100"}>Go</span>
          <AnimatePresence>
            {submitting && (
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: [6, -8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                ♟
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 pl-2 text-sm font-medium text-rose-500"
        >
          {error}
        </motion.p>
      )}
    </form>
  );
}
