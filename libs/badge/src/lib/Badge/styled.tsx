import type { CSSObject } from '@emotion/react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ThemeSchema } from '@thanh-libs/theme';
import type { BadgePlacement, BadgeColor } from '../models';

export const BadgeRootStyled = styled.span(
  (): CSSObject => {
    return {
      position: 'relative',
      display: 'inline-flex',
      verticalAlign: 'middle',
      flexShrink: 0,
    };
  }
);

export interface BadgeBadgeOwnerState {
  ownerColor?: BadgeColor;
  ownerDot?: boolean;
  ownerPlacement?: BadgePlacement;
  ownerOffset?: [number, number];
  ownerInvisible?: boolean;
}

export const BadgeBadgeStyled = styled.span<BadgeBadgeOwnerState>(
  ({ ownerColor = 'primary', ownerDot, ownerPlacement = 'top-right', ownerOffset, ownerInvisible }): CSSObject => {
    const { palette, shape, typography }: ThemeSchema = useTheme();

    const baseColor = palette?.[ownerColor]?.main || '#1976d2';
    const contrastText = palette?.[ownerColor]?.contrastText || '#fff';
    
    let top = 'auto', bottom = 'auto', left = 'auto', right = 'auto';
    let transform = '';

    const offsetXPx = ownerOffset?.[0] || 0;
    const offsetYPx = ownerOffset?.[1] || 0;

    switch (ownerPlacement) {
      case 'top-left':
        top = `${0 + offsetYPx}px`;
        left = `${0 + offsetXPx}px`;
        transform = ownerInvisible ? 'scale(0) translate(-50%, -50%)' : 'scale(1) translate(-50%, -50%)';
        break;
      case 'bottom-right':
        bottom = `${0 - offsetYPx}px`;
        right = `${0 - offsetXPx}px`;
        transform = ownerInvisible ? 'scale(0) translate(50%, 50%)' : 'scale(1) translate(50%, 50%)';
        break;
      case 'bottom-left':
        bottom = `${0 - offsetYPx}px`;
        left = `${0 + offsetXPx}px`;
        transform = ownerInvisible ? 'scale(0) translate(-50%, 50%)' : 'scale(1) translate(-50%, 50%)';
        break;
      case 'top-right':
      default:
        top = `${0 + offsetYPx}px`;
        right = `${0 - offsetXPx}px`;
        transform = ownerInvisible ? 'scale(0) translate(50%, -50%)' : 'scale(1) translate(50%, -50%)';
        break;
    }

    const dotStyle: CSSObject = {
      height: '8px',
      minWidth: '8px',
      padding: 0,
      borderRadius: '50%',
    };

    const countStyle: CSSObject = {
      height: '20px',
      minWidth: '20px',
      padding: '0 6px',
      borderRadius: shape?.borderRadius || '10px',
      fontSize: typography?.body?.fontSize || '0.75rem',
      fontWeight: typography?.fontWeight || 500,
      lineHeight: '20px',
      whiteSpace: 'nowrap',
      textAlign: 'center',
    };

    return {
      position: 'absolute',
      display: 'flex',
      flexFlow: 'row wrap',
      placeContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      zIndex: 1,
      backgroundColor: baseColor,
      color: contrastText,
      transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      top,
      bottom,
      left,
      right,
      transform,
      ...(ownerDot ? dotStyle : countStyle),
    };
  }
);
