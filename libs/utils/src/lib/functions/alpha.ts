/**
 * Converts a hex color string to an rgba() CSS value with the given opacity.
 *
 * @param hex - A 3 or 6 digit hex color string (with or without leading `#`).
 * @param opacity - A number between 0 and 1 representing the alpha channel.
 * @returns A CSS `rgba(r, g, b, opacity)` string.
 *
 * @example
 * alpha('#1890ff', 0.2)  // → 'rgba(24, 144, 255, 0.2)'
 * alpha('FF4D4F', 0.5)   // → 'rgba(255, 77, 79, 0.5)'
 */
export function alpha(hex: string, opacity: number): string {
  const clean = hex.replace('#', '');

  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;

  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);

  if ([r, g, b].some(isNaN)) {
    console.warn(`[alpha] Invalid hex color: "${hex}"`);
    return `rgba(0, 0, 0, ${opacity})`;
  }

  const clampedOpacity = Math.min(1, Math.max(0, opacity));

  return `rgba(${r}, ${g}, ${b}, ${clampedOpacity})`;
}
