"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { toPng } from "html-to-image";
import type { WrappedData } from "@/types/wrapped";

/**
 * Save / Copy-link / restart actions under the poster, full card width.
 *
 * Save image exports the poster element (`cardRef`) to a PNG. Copy link copies
 * a /?u=username share URL. "Try another player" returns to the entry screen.
 * Buttons stop propagation so the tap-to-advance story control doesn't fire.
 * See POSTER.md / DEVELOPMENT.md (Sharing).
 */
export function PosterActions({
  data,
  cardRef,
  onRestart,
}: {
  data: WrappedData;
  cardRef: React.RefObject<HTMLDivElement | null>;
  onRestart?: () => void;
}) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleDownload(e: React.MouseEvent) {
    e.stopPropagation();
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      const url = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a");
      a.href = url;
      a.download = `chess-wrapped-${data.username}-${data.year}.png`;
      a.click();
    } catch {
      // Export failed (e.g. avatar CORS). Stay on the poster; user can retry.
    } finally {
      setDownloading(false);
    }
  }

  async function handleCopyLink(e: React.MouseEvent) {
    e.stopPropagation();
    const url = `${window.location.origin}/?u=${encodeURIComponent(data.username)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked; ignore quietly.
    }
  }

  function handleRestart(e: React.MouseEvent) {
    e.stopPropagation();
    onRestart?.();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="flex w-full flex-col items-stretch gap-3"
    >
      {/* Save image + Copy link, side by side. */}
      <div className="flex gap-3">
        <motion.button
          onClick={handleDownload}
          disabled={downloading}
          whileTap={{ scale: 0.98 }}
          className="flex-1 rounded-control bg-primary-deep px-5 py-3.5 font-bold text-white shadow-md transition hover:shadow-lg disabled:opacity-70"
        >
          {downloading ? "Saving…" : "Save image"}
        </motion.button>
        <motion.button
          onClick={handleCopyLink}
          whileTap={{ scale: 0.98 }}
          className="flex-1 rounded-control border border-primary-deep/30 bg-white/80 px-5 py-3.5 font-bold text-primary-deep shadow-sm transition hover:bg-white"
        >
          {copied ? "Copied!" : "Copy link"}
        </motion.button>
      </div>

      {/* Restart link. */}
      {onRestart && (
        <button
          onClick={handleRestart}
          className="mt-1 text-sm font-bold text-ink-soft transition hover:text-primary-deep"
        >
          Try another player →
        </button>
      )}
    </motion.div>
  );
}
