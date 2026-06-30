import { TiltCard } from "@/components/TiltCard";
import { GoldSparkles } from "@/components/GoldSparkles";
import { GAME_MODE_INFO } from "@/lib/gameModes";
import { countryFlag, countryName } from "@/lib/country";
import type { WrappedData } from "@/types/wrapped";

/** One supporting statistic on the poster. */
function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white/60">
        {label}
      </span>
      <span className="text-xl font-extrabold text-white">{value}</span>
    </div>
  );
}

/**
 * The poster itself — pure presentation (gradient, texture, spotlight, edge,
 * sparkles, stats). No interactivity. `innerRef` exposes the card element for
 * image export. See POSTER.md.
 */
export function PosterCard({
  data,
  innerRef,
}: {
  data: WrappedData;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  const fav = GAME_MODE_INFO[data.favoriteMode];

  return (
    <TiltCard
      innerRef={innerRef}
      className="w-[340px] overflow-hidden rounded-card p-7 text-center shadow-soft-lg"
    >
      {/* Deep lavender surface (base color = the stat purple). */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #9a80e0 0%, #8f73d8 50%, #6f54bf 100%)",
        }}
      />
      {/* Faint chessboard texture, fading in only from the bottom-right
          corner (POSTER.md: very faint board pattern, 2–3% opacity). */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%)",
          backgroundSize: "36px 36px",
          backgroundPosition: "0 0, 18px 18px",
          opacity: 0.16,
          // Wide radial mask: the pattern shows in the bottom-right corner,
          // fading up and to the left.
          WebkitMaskImage:
            "radial-gradient(130% 68% at 100% 100%, #000 0%, transparent 60%)",
          maskImage:
            "radial-gradient(130% 68% at 100% 100%, #000 0%, transparent 60%)",
        }}
      />
      {/* Soft top spotlight — light falling onto the card (subtle texture). */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.28), rgba(255,255,255,0) 55%)",
        }}
      />
      {/* Fine inner edge highlight — the lip of fine paper / glass. */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-card"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      />
      {/* Scattered gold sparkles — elegant, premium accent. */}
      <GoldSparkles />

      {/* Faint king watermark, top-right (POSTER.md decoration). Sits fully
          inside the card; white gradient fading top → bottom. */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-5 select-none text-[8.5rem] leading-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0.08) 90%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        ♔
      </span>

      {/* Title */}
      <p className="relative text-sm font-bold text-white/90">
        ♟️ Chess Wrapped {data.year}
      </p>

      {/* Header: avatar + identity side by side. */}
      <div className="relative mt-5 flex items-center gap-4 text-left">
        {data.avatar ? (
          // Plain <img> (not next/image) so it survives image export.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.avatar}
            alt=""
            crossOrigin="anonymous"
            className="h-20 w-20 shrink-0 rounded-full object-cover shadow-soft ring-4 ring-white"
          />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-3xl shadow-soft ring-4 ring-white">
            ♟️
          </div>
        )}

        <div className="min-w-0">
          <p className="truncate text-xl font-extrabold text-white">
            {data.username}
          </p>
          {data.country && (
            <p className="mt-1 text-xs font-medium text-white/90">
              {countryFlag(data.country)} {countryName(data.country)}
            </p>
          )}
          <p className="mt-0.5 text-xs font-medium text-white/80">
            Member since {data.joinedLabel}
          </p>
        </div>
      </div>

      {/* Hero stat: current rating — the clear protagonist. */}
      <div className="relative mb-8 mt-8">
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-white/55">
          Current rating
        </span>
        <p
          className="mt-1 text-7xl font-extrabold leading-none"
          style={{
            // Pale warm yellow number with a soft glow.
            color: "#f8e4a3",
            textShadow:
              "0 0 10px rgba(245,217,139,0.35), 0 0 24px rgba(245,217,139,0.2), 0 0 44px rgba(255,245,200,0.14)",
          }}
        >
          {data.currentRating.toLocaleString()}
        </p>
      </div>

      {/* Favorite mode — a quiet title, not a button. */}
      <div className="relative inline-flex items-center gap-2 rounded-badge border border-white/25 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/85">
        <span aria-hidden className="text-gold">
          {fav.glyph}
        </span>
        {fav.label} player
      </div>

      {/* Supporting stats */}
      <div className="relative mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-left">
        <Stat label="Peak" value={data.bestRating.toLocaleString()} />
        <Stat label="Games" value={data.gamesPlayed.toLocaleString()} />
        <Stat label="Win rate" value={`${data.winRate}%`} />
        <Stat label="Followers" value={data.followers.toLocaleString()} />
      </div>

      {/* Footer: divider lines with a centered crown, then the credit line. */}
      <div className="relative mt-10">
        <div className="flex items-center justify-center gap-3">
          <span className="h-0.5 flex-1 rounded-full bg-white/25" />
          <span aria-hidden className="text-base text-white">
            ♛
          </span>
          <span className="h-0.5 flex-1 rounded-full bg-white/25" />
        </div>
        <p className="mt-0.5 text-[0.7rem] font-medium text-white/90">
          Made with <span className="text-gold">♥</span> &amp; Chess.com API
        </p>
      </div>
    </TiltCard>
  );
}
