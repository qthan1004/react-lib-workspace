/**
 * Normalize a CSS value — numbers are converted to px strings.
 */
export const normalizeUnit = (value: string | number): string =>
  typeof value === 'number' ? `${value}px` : value;
