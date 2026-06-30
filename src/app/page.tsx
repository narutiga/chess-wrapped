"use client";

import { useEffect, useState, useTransition } from "react";
import { motion, type Variants } from "motion/react";
import { getWrapped } from "@/app/actions";
import { AmbientBackground } from "@/components/AmbientBackground";
import { FloatingPieces } from "@/components/FloatingPieces";
import { SearchBar } from "@/components/SearchBar";
import { WrappedPlayer } from "@/components/WrappedPlayer";
import type { WrappedData } from "@/types/wrapped";

const EXAMPLES = ["hikaru", "magnuscarlsen", "erik"];

// Staggered entrance: each element fades up slightly after the previous one.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  const [data, setData] = useState<WrappedData | null>(null);
  const [exampleError, setExampleError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function runExample(name: string) {
    setExampleError(null);
    startTransition(async () => {
      const result = await getWrapped(name);
      if (result.ok) setData(result.data);
      else setExampleError(result.message);
    });
  }

  // Open a shared link (?u=username) straight into that player's Wrapped.
  useEffect(() => {
    const u = new URLSearchParams(window.location.search).get("u");
    if (!u) return;
    startTransition(async () => {
      const result = await getWrapped(u);
      if (result.ok) setData(result.data);
      else setExampleError(result.message);
    });
  }, []);

  // Once data is loaded, hand off to the scene player.
  if (data) return <WrappedPlayer data={data} />;

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-bg to-bg-2 px-6 py-16 text-center">
      {/* Ambient layers (very subtle, slow) */}
      <AmbientBackground />
      {/* Floating pieces shared by home and story */}
      <FloatingPieces className="text-[7rem] opacity-[0.16]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <motion.p
          variants={item}
          className="mb-3 rounded-full bg-white/70 px-4 py-1 text-sm font-bold text-primary-deep shadow-sm"
        >
          ♟️ Chess Wrapped
        </motion.p>
        <motion.h1
          variants={item}
          className="max-w-xl text-balance text-4xl font-extrabold leading-tight text-ink sm:text-5xl"
        >
          Turn your chess into
          <br />
          <span className="text-lavender-gradient">a story worth sharing</span>.
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-5 max-w-md text-pretty text-base text-ink-soft sm:text-lg"
        >
          Just enter a Chess.com username.
          <br />
          Your own Wrapped — made to show off.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex w-full justify-center">
          <SearchBar onResult={setData} />
        </motion.div>

        <motion.p variants={item} className="mt-6 text-sm text-ink-soft">
          Try it:
          {EXAMPLES.map((u) => (
            <button
              key={u}
              onClick={() => runExample(u)}
              className="mx-1 font-bold text-primary-deep underline-offset-2 hover:underline"
            >
              {u}
            </button>
          ))}
        </motion.p>

        {exampleError && (
          <motion.p variants={item} className="mt-4 text-sm text-ink-soft">
            {exampleError}
          </motion.p>
        )}
      </motion.div>
    </main>
  );
}
