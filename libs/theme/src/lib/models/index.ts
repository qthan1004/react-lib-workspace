import '@emotion/react';
import type { Shadows } from './shadows';
import type { Palettes } from './palettes';
import type { Shapes } from './shapes';
import type { ZIndex } from './zIndex';
import type { Fonts } from './fonts';
import type { Typography } from './typography';
import type { Spacing } from './spacing';
import type { Colors } from '../constants/colors';

export interface ThemeSchema {
  palette?: Palettes;
  shape?: Shapes;
  zIndex?: ZIndex;
  font?: Fonts;
  typography?: Typography;
  spacing?: Spacing;
  shadows?: Shadows[];
  colors?: Colors;
  common?: Record<string, any>;
  [key: string]: any;
}

export type { Shadows, Palettes, Shapes, ZIndex, Fonts, Typography, Spacing, Colors };
export default ThemeSchema;

declare module '@emotion/react' {
  export interface Theme extends ThemeSchema {}
}
