import type { ThemeSchema } from '@thanhdq/theme';
import { PALETTE_KEYS } from '../constants';

type PaletteKey = 'primary' | 'error' | 'success' | 'warning' | 'info';

/**
 * Resolves a color prop value to an actual CSS color string.
 *
 * - `'inherit'` or `undefined` → returns `undefined` (uses CSS inherit)
 * - Palette key (`'primary'`, `'error'`, etc.) → resolves from `theme.palette`
 * - Any other string → returned as-is (treated as raw CSS color)
 */
export function resolveColor(
  color: string | undefined,
  theme: ThemeSchema,
): string | undefined {
  if (!color || color === 'inherit') return undefined;

  if (PALETTE_KEYS.has(color)) {
    const paletteColor = theme.palette?.[color as PaletteKey];
    return paletteColor?.main ?? paletteColor?.dark ?? color;
  }

  return color;
}
