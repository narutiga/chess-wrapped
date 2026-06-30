"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { toPng } from "html-to-image";
import type { WrappedData } from "@/types/wrapped";

/**
 * Download + Copy-link actions for the poster.
 *
 * Download exports the poster element (`cardRef`) to a PNG. Copy link copies
 * a /?u=username share URL. Both stop propagation so the tap-to-advance story
 * control doesn't fire. See POSTER.md / DEVELOPMENT.md (Sharing).
 */
export function PosterActions({
  data,
  cardRef,
}: {
  data: WrappedData;
  cardRef: React.RefObject<HTMLDivElement | null>;
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="flex items-center gap-3"
    >
      <motion.button
        onClick={handleDownload}
        disabled={downloading}
        whileTap={{ scale: 0.97 }}
        className="rounded-control bg-primary-deep px-7 py-3 font-bold text-white shadow-md transition hover:shadow-lg disabled:opacity-70"
      >
        {downloading ? "Saving…" : "Download"}
      </motion.button>
      <motion.button
        onClick={handleCopyLink}
        whileTap={{ scale: 0.97 }}
        className="rounded-control border border-primary-deep/30 bg-white/70 px-6 py-3 font-bold text-primary-deep shadow-sm transition hover:bg-white"
      >
        {copied ? "Copied!" : "Copy link"}
      </motion.button>
    </motion.div>
  );
}
