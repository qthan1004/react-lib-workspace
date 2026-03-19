import { CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { ThemeSchema } from '@thanhdq/theme';

import type { ModalSize } from '../models';

import {
  ANIMATION_DURATION,
  BACKDROP_OPACITY,
  DEFAULT_Z_INDEX,
  MODAL_SIZES,
} from '../constants';

import { normalizeUnit } from '../helpers';
 
interface ModalBackdropProps {
  ownerZIndex?: number;
  ownerOpen: boolean;
}

export const ModalBackdropStyled = styled.div<ModalBackdropProps>(
  ({ ownerZIndex, ownerOpen }): CSSObject => {
    const { zIndex, palette }: ThemeSchema = useTheme();

    return {
      position: 'fixed',
      inset: 0,
      zIndex: ownerZIndex ?? zIndex?.modal ?? DEFAULT_Z_INDEX,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        palette?.background?.overlay ?? `rgba(0, 0, 0, ${BACKDROP_OPACITY})`,
      opacity: ownerOpen ? 1 : 0,
      visibility: ownerOpen ? 'visible' : 'hidden',
      transition: `opacity ${ANIMATION_DURATION}ms ease, visibility ${ANIMATION_DURATION}ms ease`,
    };
  },
);

interface ModalContentProps {
  ownerOpen: boolean;
  ownerSize: ModalSize;
  ownerWidth?: string | number;
  ownerHeight?: string | number;
}

export const ModalContentStyled = styled.div<ModalContentProps>(
  ({ ownerOpen, ownerSize, ownerWidth, ownerHeight }): CSSObject => {
    const preset = MODAL_SIZES[ownerSize];
    const isFullscreen = ownerSize === 'fullscreen';

    return {
      position: 'relative',
      outline: 'none',
      boxSizing: 'border-box',
      overflowY: 'auto',

      // Width: custom > preset
      width: ownerWidth ? normalizeUnit(ownerWidth) : preset.width,
      maxWidth: isFullscreen ? undefined : '95dvw',

      // Height: custom > preset maxHeight
      ...(ownerHeight
        ? { height: normalizeUnit(ownerHeight) }
        : { maxHeight: preset.maxHeight }),

      // Fullscreen: no border radius, fill viewport
      ...(isFullscreen && !ownerWidth && !ownerHeight
        ? { height: '100dvh', borderRadius: 0 }
        : {}),

      // Animation
      transform: ownerOpen ? 'scale(1)' : 'scale(0.95)',
      opacity: ownerOpen ? 1 : 0,
      transition: `transform ${ANIMATION_DURATION}ms ease, opacity ${ANIMATION_DURATION}ms ease`,
    };
  },
);
