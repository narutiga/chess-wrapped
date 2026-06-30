import { TiltCard } from "@/components/TiltCard";
import { GoldSparkles } from "@/components/GoldSparkles";
import { GAME_MODE_INFO } from "@/lib/gameModes";
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
          opacity: 0.06,
          WebkitMaskImage:
            "radial-gradient(120% 120% at 100% 100%, #000 0%, transparent 55%)",
          maskImage:
            "radial-gradient(120% 120% at 100% 100%, #000 0%, transparent 55%)",
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

      {/* Title */}
      <p className="relative text-sm font-bold text-white/90">
        ♟️ Chess Wrapped {data.year}
      </p>

      {/* Avatar */}
      <div className="relative mt-5 flex justify-center">
        {data.avatar ? (
          // Plain <img> (not next/image) so it survives image export.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.avatar}
            alt=""
            crossOrigin="anonymous"
            className="h-20 w-20 rounded-full object-cover shadow-soft ring-4 ring-white"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl shadow-soft ring-4 ring-white">
            ♟️
          </div>
        )}
      </div>

      <p className="relative mt-3 text-2xl font-extrabold text-white">
        {data.username}
      </p>

      {/* Hero stat: current rating — the clear protagonist. */}
      <div className="relative mb-8 mt-8">
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-white/55">
          Current rating
        </span>
        <p className="mt-1 text-7xl font-extrabold leading-none text-gold drop-shadow-[0_2px_10px_rgba(245,217,139,0.4)]">
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
        <Stat label="Since" value={data.joinedYear} />
      </div>

      {/* Footer */}
      <p className="relative mt-7 text-[0.7rem] font-medium text-white/50">
        chess-wrapped
      </p>
    </TiltCard>
  );
}
