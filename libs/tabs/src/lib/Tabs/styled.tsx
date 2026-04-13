import type { CSSObject } from '@emotion/react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ThemeSchema } from '@thanh-libs/theme';

export interface TabsOwnerState {
  ownerOrientation?: 'horizontal' | 'vertical';
  ownerVariant?: 'standard' | 'scrollable' | 'fullWidth';
  ownerSelected?: boolean;
  ownerDisabled?: boolean;
}

export const TabsRootStyled = styled.div<TabsOwnerState>(
  ({ ownerOrientation }): CSSObject => ({
    display: 'flex',
    flexDirection: ownerOrientation === 'vertical' ? 'row' : 'column',
    width: '100%',
  })
);

export const TabsListStyled = styled.div<TabsOwnerState>(
  ({ ownerOrientation, ownerVariant }): CSSObject => {
    const { palette }: ThemeSchema = useTheme();

    return {
      display: 'flex',
      flexDirection: ownerOrientation === 'vertical' ? 'column' : 'row',
      borderBottom: ownerOrientation === 'vertical' ? 'none' : `1px solid ${palette?.divider || 'rgba(0,0,0,0.12)'}`,
      borderRight: ownerOrientation === 'vertical' ? `1px solid ${palette?.divider || 'rgba(0,0,0,0.12)'}` : 'none',
      overflowX: ownerVariant === 'scrollable' && ownerOrientation !== 'vertical' ? 'auto' : 'hidden',
      overflowY: ownerVariant === 'scrollable' && ownerOrientation === 'vertical' ? 'auto' : 'hidden',
      scrollbarWidth: 'none', // Firefox
      '&::-webkit-scrollbar': {
        display: 'none', // Chrome/Safari
      },
      width: ownerOrientation === 'vertical' ? 'max-content' : '100%',
    };
  }
);

export const TabRootStyled = styled.button<TabsOwnerState>(
  ({ ownerOrientation, ownerVariant, ownerSelected, ownerDisabled }): CSSObject => {
    const { palette, typography }: ThemeSchema = useTheme();

    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      backgroundColor: 'transparent',
      outline: 0,
      border: 0,
      margin: 0,
      borderRadius: 0,
      cursor: ownerDisabled ? 'not-allowed' : 'pointer',
      opacity: ownerDisabled ? 0.38 : (ownerSelected ? 1 : 0.6),
      color: ownerSelected ? (palette?.primary?.main || '#1976d2') : (palette?.text?.primary || '#000'),
      fontFamily: typography?.fontFamily,
      fontSize: typography?.body?.fontSize || '0.875rem',
      fontWeight: ownerSelected ? 500 : (typography?.fontWeight || 400),
      textTransform: 'uppercase',
      minWidth: ownerVariant === 'scrollable' ? 'auto' : 90,
      maxWidth: 360,
      padding: '12px 16px',
      position: 'relative',
      flex: ownerVariant === 'fullWidth' ? 1 : 'none',
      flexShrink: 0,
      transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      
      '&:hover': {
        opacity: ownerDisabled ? 0.38 : 1,
      },
      '&:focus-visible': {
        backgroundColor: palette?.action?.focus || 'rgba(0, 0, 0, 0.12)',
      },

      // The selected indicator
      '&::after': {
        content: '""',
        position: 'absolute',
        backgroundColor: palette?.primary?.main || '#1976d2',
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        ...(ownerOrientation === 'vertical'
          ? {
              right: 0,
              top: 0,
              bottom: 0,
              width: 2,
              transform: ownerSelected ? 'scaleY(1)' : 'scaleY(0)',
            }
          : {
              left: 0,
              right: 0,
              bottom: 0,
              height: 2,
              transform: ownerSelected ? 'scaleX(1)' : 'scaleX(0)',
            }),
      },
    };
  }
);

export const TabPanelRootStyled = styled.div<TabsOwnerState>(
  (): CSSObject => {
    const { typography }: ThemeSchema = useTheme();

    return {
      padding: '24px',
      fontFamily: typography?.fontFamily,
      flexGrow: 1,
    };
  }
);
