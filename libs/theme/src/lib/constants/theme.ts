import { pxToRem, alpha } from '@thanhdq/utils';
import ThemeSchema from '../models';
import { COLOR } from './colors';

const {
  BLUE_1,
  BLUE_2,
  BLUE_4,
  BLUE_5,
  BLUE_6,
  BLUE_7,
  BLUE_9,
  BLUE_11,
  RED_1,
  RED_2,
  RED_5,
  RED_7,
  RED_8,
  RED_12,
  GREEN_1,
  GREEN_5,
  GREEN_8,
  YELLOW_1,
  YELLOW_5,
  YELLOW_8,
  GREY_1,
  GREY_2,
  GREY_3,
  GREY_4,
  GREY_6,
  GREY_7,
  GREY_8,
  GREY_9,
  GREY_10,
  GREY_11,
  GREY_12,
  GREY_13,
  GREY_14,
} = COLOR;

export const THEME_DEFAULT: ThemeSchema = {
  font: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    lineHeight: 'normal',
    htmlFontSize: 14,
    fontSize: 16,
  },

  shadows: [
    'none',
    `0 ${pxToRem(2)} 0.5rem 0 ${alpha('#000000', 0.15)}`,
    `0 ${pxToRem(2)} 0 0 ${GREY_3}`,
    `0 ${pxToRem(2)} 0 0 ${alpha('#000000', 0.02)}`,
    `0 ${pxToRem(2)} 0 0 ${alpha('#000000', 0.04)}`,
    `0px ${pxToRem(9)} ${pxToRem(28)} ${pxToRem(8)} ${alpha('#000000', 0.05)}, 0 ${pxToRem(6)} ${pxToRem(16)} 0px ${alpha('#000000', 0.08)}, 0 ${pxToRem(3)} ${pxToRem(6)} -${pxToRem(4)} ${alpha('#000000', 0.12)}`,
    `0 0 0 ${pxToRem(2)} ${alpha(BLUE_2, 0.20)}`,
    `0 0 0 ${pxToRem(2)} ${alpha(RED_2, 0.20)}`,
    `0 ${pxToRem(2)} ${pxToRem(8)} 0 ${alpha('#000000', 0.60)}`,
    `${alpha('#000000', 0.10)} 0px ${pxToRem(1)} ${pxToRem(2)} 0px`,
  ],

  palette: {
    common: {
      black: GREY_13,
      white: GREY_1,
    },
    primary: {
      main: BLUE_7,
      light: BLUE_6,
      dark: BLUE_9,
      extraLight: BLUE_1,
      extraDark: BLUE_11,
      borderLine: BLUE_4,
      boxShadow: `0 0 0 ${pxToRem(2)} ${BLUE_2}`,
    },
    secondary: {
      main: GREY_13,
      dark: GREY_13,
      light: GREY_11,
      extraLight: GREY_2,
      borderLine: GREY_6,
      boxShadow: `0 0 0 ${pxToRem(2)} ${GREY_2}`,
    },
    error: {
      main: GREY_7,
      dark: RED_8,
      light: RED_5,
      extraLight: RED_1,
      extraDark: RED_12,
      borderLine: RED_7,
      boxShadow: `0 0 0 ${pxToRem(2)} ${RED_2}`,
    },
    success: {
      main: GREEN_5,
      light: GREEN_1,
      dark: GREEN_8,
    },
    warning: {
      main: YELLOW_5,
      light: YELLOW_1,
      dark: YELLOW_8,
    },
    info: {
      main: BLUE_9,
    },
    disabled: {
      main: GREY_6,
      light: GREY_3,
      dark: GREY_9,
      borderLine: GREY_3,
    },
    background: {
      default: GREY_1,
      overlay: alpha('#000000', 0.45),
      secondary: GREY_4,
    },
    scrollBar: {
      main: GREY_7,
      dark: GREY_9,
    },
    divider: GREY_4,
  },

  colors: COLOR,

  shape: {
    borderRadiusTiny: pxToRem(4),
    borderRadius: pxToRem(6),
    borderRadiusMedium: pxToRem(8),
    circle: '50%',
    heigh: pxToRem(36),
  },

  spacing: {
    tiny: pxToRem(4),
    small: pxToRem(8),
    medium: pxToRem(12),
    large: pxToRem(16),
    extraLarge: pxToRem(24),
  },

  common: {
    height: pxToRem(36),
  },

  zIndex: {
    alert: 1400,
    drawer: 1200,
    modal: 1300,
    popover: 1500,
    tooltip: 1501,
    dialogs: 1201,
  },

  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 16,
    fontWeight: 400,
    htmlFontSize: 14,
    h1: { fontSize: 38, fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: 30, fontWeight: 700, lineHeight: 1.3 },
    h3: { fontSize: 24, fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: 20, fontWeight: 600, lineHeight: 1.5 },
    h5: { fontSize: 16, fontWeight: 600, lineHeight: 1.5 },
    body: { fontSize: 14, fontWeight: 400, lineHeight: 1.6 },
  },
};

export const THEME_DARK: ThemeSchema = {
  font: THEME_DEFAULT.font,

  shadows: [
    'none',
    `0 ${pxToRem(2)} 0.5rem 0 ${alpha('#000000', 0.4)}`,
    `0 ${pxToRem(2)} 0 0 ${GREY_12}`,
    `0 ${pxToRem(2)} 0 0 ${alpha('#000000', 0.15)}`,
    `0 ${pxToRem(2)} 0 0 ${alpha('#000000', 0.2)}`,
    `0px ${pxToRem(9)} ${pxToRem(28)} ${pxToRem(8)} ${alpha('#000000', 0.25)}, 0 ${pxToRem(6)} ${pxToRem(16)} 0px ${alpha('#000000', 0.3)}, 0 ${pxToRem(3)} ${pxToRem(6)} -${pxToRem(4)} ${alpha('#000000', 0.35)}`,
    `0 0 0 ${pxToRem(2)} ${alpha(BLUE_5, 0.35)}`,
    `0 0 0 ${pxToRem(2)} ${alpha(RED_5, 0.35)}`,
    `0 ${pxToRem(2)} ${pxToRem(8)} 0 ${alpha('#000000', 0.8)}`,
    `${alpha('#000000', 0.3)} 0px ${pxToRem(1)} ${pxToRem(2)} 0px`,
  ],

  palette: {
    common: {
      black: GREY_1,
      white: GREY_14,
    },
    primary: {
      main: BLUE_6,
      light: BLUE_5,
      dark: BLUE_9,
      extraLight: alpha(BLUE_9, 0.15),
      extraDark: BLUE_11,
      borderLine: BLUE_7,
      boxShadow: `0 0 0 ${pxToRem(2)} ${alpha(BLUE_6, 0.35)}`,
    },
    secondary: {
      main: GREY_3,
      dark: GREY_1,
      light: GREY_8,
      extraLight: GREY_12,
      borderLine: GREY_10,
      boxShadow: `0 0 0 ${pxToRem(2)} ${GREY_10}`,
    },
    error: {
      main: GREY_8,
      dark: RED_7,
      light: RED_5,
      extraLight: alpha(RED_8, 0.15),
      extraDark: RED_12,
      borderLine: RED_7,
      boxShadow: `0 0 0 ${pxToRem(2)} ${alpha(RED_5, 0.35)}`,
    },
    success: {
      main: GREEN_5,
      light: alpha(GREEN_8, 0.15),
      dark: GREEN_8,
    },
    warning: {
      main: YELLOW_5,
      light: alpha(YELLOW_8, 0.15),
      dark: YELLOW_8,
    },
    info: {
      main: BLUE_6,
    },
    disabled: {
      main: GREY_10,
      light: GREY_12,
      dark: GREY_8,
      borderLine: GREY_11,
    },
    background: {
      default: GREY_14,
      overlay: alpha('#000000', 0.65),
      secondary: GREY_12,
    },
    scrollBar: {
      main: GREY_10,
      dark: GREY_8,
    },
    divider: GREY_11,
  },

  colors: COLOR,

  shape: THEME_DEFAULT.shape,
  spacing: THEME_DEFAULT.spacing,
  common: THEME_DEFAULT.common,
  zIndex: THEME_DEFAULT.zIndex,
  typography: THEME_DEFAULT.typography,
};

export default THEME_DEFAULT;
