import { CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import type { ThemeSchema } from '@thanhdq/theme';
import { pxToRem } from '@thanhdq/utils';

import type { TypographyVariant } from './models';

import { FALLBACK_SCALE } from './constants';

interface TypographyStyledProps {
  ownerVariant: TypographyVariant;
  ownerColor?: string;
  ownerAlign?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  ownerFontWeight?: number;
  ownerGutterBottom?: boolean;
  ownerNoWrap?: boolean;
}

export const TypographyStyled = styled.p<TypographyStyledProps>(
  ({
    ownerVariant,
    ownerColor,
    ownerAlign,
    ownerFontWeight,
    ownerGutterBottom,
    ownerNoWrap,
  }): CSSObject => {
    const { typography, font }: ThemeSchema = useTheme();

    const typo = typography?.[ownerVariant] ?? FALLBACK_SCALE[ownerVariant];
    const fontFamily =
      typography?.fontFamily ?? font?.fontFamily ?? "'Roboto', sans-serif";
    const htmlFontSize = typography?.htmlFontSize ?? font?.htmlFontSize ?? 14;

    return {
      fontFamily,
      fontSize: pxToRem(typo.fontSize ?? 14, htmlFontSize),
      fontWeight: ownerFontWeight ?? typo.fontWeight ?? 400,
      lineHeight: typo.lineHeight ?? 1.5,
      color: ownerColor ?? 'inherit',
      textAlign: ownerAlign ?? 'inherit',
      margin: 0,
      ...(ownerGutterBottom && {
        marginBottom: '0.35em',
      }),
      ...(ownerNoWrap && {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
    };
  },
);
