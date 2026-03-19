import type { ElementType } from 'react';
import type { TypographyVariant } from '../models';

/**
 * Maps each Typography variant to its default semantic HTML tag.
 * h1–h5 → <h1>–<h5>, body → <p>
 */
export const VARIANT_TAG_MAP: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  body: 'p',
};

/** Set of heading variants for quick lookup */
export const HEADING_VARIANTS = new Set<TypographyVariant>([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
]);

/** Maps heading variant to aria-level number (WCAG 2.2 — SC 1.3.1 Info and Relationships) */
export const HEADING_LEVEL_MAP: Record<string, number> = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
};

/** Palette keys that can be used as `color` prop shortcuts */
export const PALETTE_KEYS = new Set<string>([
  'primary',
  'error',
  'success',
  'warning',
  'info',
]);

/**
 * Fallback typography scale when theme.typography is not defined.
 * WCAG 2.2 — SC 1.4.12 Text Spacing: body line-height ≥ 1.5×
 */
export const FALLBACK_SCALE: Record<
  TypographyVariant,
  { fontSize: number; fontWeight: number; lineHeight: number }
> = {
  h1: { fontSize: 38, fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: 30, fontWeight: 700, lineHeight: 1.3 },
  h3: { fontSize: 24, fontWeight: 600, lineHeight: 1.4 },
  h4: { fontSize: 20, fontWeight: 600, lineHeight: 1.5 },
  h5: { fontSize: 16, fontWeight: 600, lineHeight: 1.5 },
  body: { fontSize: 14, fontWeight: 400, lineHeight: 1.6 },
};
