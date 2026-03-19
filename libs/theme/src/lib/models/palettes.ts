export interface CommonColors {
  black?: string;
  white?: string;
}
export interface PaletteColor {
  light?: string;
  main?: string;
  dark?: string;
  extraLight?: string;
  extraDark?: string;
  borderLine?: string;
  [key: string]: any;
}
export interface TypeText {
  primary?: string;
  secondary?: string;
  disabled?: string;
}
export interface TypeBackground {
  default?: string;
  overlay?: string;
  paper?: string;
  secondary?: string;
}
export interface TypeAction {
  active?: string;
  activatedOpacity?: number;
  activatedBackground?: string;
  hover?: string;
  hoverOpacity?: number;
  hoverBackground?: string;
  selected?: string;
  selectedOpacity?: number;
  selectedBackground?: string;
  disabled?: string;
  disabledOpacity?: number;
  disabledBackground?: string;
  focus?: string;
  focusOpacity?: number;
}
export type TypeDivider = string;

export type Palettes = {
  common?: CommonColors;
  primary?: PaletteColor;
  secondary?: PaletteColor;
  error?: PaletteColor;
  warning?: PaletteColor;
  info?: PaletteColor;
  success?: PaletteColor;
  text?: TypeText;
  divider?: TypeDivider;
  action?: TypeAction;
  [key: string]: any;
};
