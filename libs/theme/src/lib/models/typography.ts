import { Fonts } from './fonts';
export type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body';

interface FontsRequired {
  fontFamily: React.CSSProperties['fontFamily'];
  fontSize: number;
  fontWeight: number;
  htmlFontSize: number;
}

export interface Typography extends Record<Variant, Fonts>, FontsRequired {}

export interface TypographyOptions
  extends Partial<Record<Variant, Fonts>>,
    Partial<FontsRequired> {}
