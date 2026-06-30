/**
 * Turn an ISO 3166-1 alpha-2 country code into a flag emoji and a display name.
 *
 * The flag works for any valid code (built from regional-indicator letters).
 * Names cover common countries; unknown codes fall back to the code itself
 * (better to show "ZZ" than nothing) or the platform's Intl display name.
 */

/** Flag emoji for a 2-letter code, e.g. "JP" → 🇯🇵. */
export function countryFlag(code: string): string {
  if (code.length !== 2) return "";
  const A = 0x1f1e6; // regional indicator "A"
  const base = "A".charCodeAt(0);
  return String.fromCodePoint(
    A + (code.toUpperCase().charCodeAt(0) - base),
    A + (code.toUpperCase().charCodeAt(1) - base),
  );
}

/** Human-readable country name for a code, e.g. "JP" → "Japan". */
export function countryName(code: string): string {
  try {
    const dn = new Intl.DisplayNames(["en"], { type: "region" });
    return dn.of(code.toUpperCase()) ?? code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}
