/**
 * Shared stat layout for scenes: label → value → optional caption.
 * The value carries the strongest emphasis (COMPONENTS.md: Statistics).
 */
export function SceneStat({
  label,
  value,
  caption,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  caption?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-bold uppercase tracking-widest text-ink-soft">
        {label}
      </p>
      <div className="text-7xl font-extrabold text-primary-deep sm:text-8xl">
        {value}
      </div>
      {caption && <p className="text-base text-ink-soft">{caption}</p>}
    </div>
  );
}
