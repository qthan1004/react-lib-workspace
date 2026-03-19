import styled from '@emotion/styled';
import { BACKDROP_OPACITY, ANIMATION_DURATION } from '../constants';

interface ModalBackdropProps {
  ownerZIndex: number;
  ownerOpen: boolean;
}

export const ModalBackdrop = styled.div<ModalBackdropProps>(
  ({ ownerZIndex, ownerOpen, theme }) => ({
    position: 'fixed',
    inset: 0,
    zIndex: ownerZIndex,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette?.background?.overlay ?? `rgba(0, 0, 0, ${BACKDROP_OPACITY})`,
    opacity: ownerOpen ? 1 : 0,
    visibility: ownerOpen ? 'visible' : 'hidden',
    transition: `opacity ${ANIMATION_DURATION}ms ease, visibility ${ANIMATION_DURATION}ms ease`,
  }),
);

interface ModalContentProps {
  ownerOpen: boolean;
}

export const ModalContent = styled.div<ModalContentProps>(
  ({ ownerOpen }) => ({
    position: 'relative',
    outline: 'none',
    transform: ownerOpen ? 'scale(1)' : 'scale(0.95)',
    opacity: ownerOpen ? 1 : 0,
    transition: `transform ${ANIMATION_DURATION}ms ease, opacity ${ANIMATION_DURATION}ms ease`,
  }),
);
