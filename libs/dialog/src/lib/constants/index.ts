import type { ModalSize } from '../models';

/** Default z-index for modal overlay (matches theme.zIndex.modal) */
export const DEFAULT_Z_INDEX = 1300;

/** Animation duration in ms (Material Design standard) */
export const ANIMATION_DURATION = 225;

/** Backdrop overlay opacity */
export const BACKDROP_OPACITY = 0.5;

/** Size presets for modal content (uses dvh/dvw for mobile viewport support) */
export const MODAL_SIZES: Record<ModalSize, { width: string; maxHeight: string }> = {
  xs:         { width: '360px',  maxHeight: '80dvh' },
  sm:         { width: '480px',  maxHeight: '80dvh' },
  md:         { width: '640px',  maxHeight: '85dvh' },
  lg:         { width: '800px',  maxHeight: '90dvh' },
  xl:         { width: '1024px', maxHeight: '90dvh' },
  fullscreen: { width: '100dvw', maxHeight: '100dvh' },
};
