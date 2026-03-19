import type { ElementType, ReactNode, HTMLAttributes } from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Typography variant — decides fontSize, fontWeight, lineHeight from theme */
  variant?: TypographyVariant;
  /** Override the rendered HTML tag. When overriding a heading, `role` and `aria-level` are auto-added (WCAG 2.2 SC 1.3.1) */
  component?: ElementType;
  /** Text color. Supports palette keys ('primary', 'error', 'success', 'warning', 'info'), 'inherit', or any CSS color */
  color?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  /** Override font weight (e.g. 400, 500, 600, 700) */
  weight?: number;
  /** Add margin-bottom: 0.35em for spacing between paragraphs */
  gutterBottom?: boolean;
  /** Truncate text with ellipsis (single line) */
  noWrap?: boolean;
  /** Content */
  children?: ReactNode;
}
