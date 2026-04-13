import type { CSSObject } from '@emotion/react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ToastPlacement, ToastVariant } from '../models';

export interface ToastContainerOwnerState {
  ownerPlacement: ToastPlacement;
}

export interface ToastOwnerState {
  ownerVariant: ToastVariant;
}

export const ToastContainerStyled = styled.div<ToastContainerOwnerState>(
  ({ ownerPlacement }): CSSObject => {
    let position: CSSObject = {};
    if (ownerPlacement.includes('top')) position.top = 24;
    if (ownerPlacement.includes('bottom')) position.bottom = 24;
    
    if (ownerPlacement.includes('left')) position.left = 24;
    else if (ownerPlacement.includes('right')) position.right = 24;
    else if (ownerPlacement.includes('center')) {
      position.left = '50%';
      position.transform = 'translateX(-50%)';
    }

    return {
      position: 'fixed',
      display: 'flex',
      flexDirection: ownerPlacement.includes('top') ? 'column' : 'column-reverse',
      gap: 8,
      zIndex: 1400,
      pointerEvents: 'none',
      ...position,
    };
  }
);

export const ToastRootStyled = styled.div<ToastOwnerState>(
  ({ ownerVariant }): CSSObject => {
    const theme = useTheme() as any;
    const { palette, shape, typography } = theme || {};

    let bgColor = palette?.text?.primary || '#323232'; // default dark
    let color = palette?.background?.paper || '#fff';
    
    if (ownerVariant === 'success') {
      bgColor = palette?.success?.main || '#2e7d32';
      color = palette?.success?.contrastText || '#fff';
    } else if (ownerVariant === 'error') {
      bgColor = palette?.error?.main || '#d32f2f';
      color = palette?.error?.contrastText || '#fff';
    } else if (ownerVariant === 'warning') {
      bgColor = palette?.warning?.main || '#ed6c02';
      color = palette?.warning?.contrastText || '#fff';
    } else if (ownerVariant === 'info') {
      bgColor = palette?.info?.main || '#0288d1';
      color = palette?.info?.contrastText || '#fff';
    }

    return {
      minWidth: 288,
      maxWidth: 400,
      backgroundColor: bgColor,
      color,
      fontFamily: typography?.fontFamily,
      fontSize: typography?.body2?.fontSize || '0.875rem',
      fontWeight: typography?.fontWeightRegular || 400,
      borderRadius: shape?.borderRadius || 4,
      boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      pointerEvents: 'auto',
      animation: 'toast-slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '@keyframes toast-slide-in': {
        from: {
          opacity: 0,
          transform: 'translateY(20px)',
        },
        to: {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
    };
  }
);

export const ToastCloseButtonStyled = styled.button(
  (): CSSObject => {
    return {
      background: 'transparent',
      border: 'none',
      color: 'inherit',
      opacity: 0.7,
      cursor: 'pointer',
      padding: 4,
      marginLeft: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.2s',
      '&:hover': {
        opacity: 1,
      },
    };
  }
);
