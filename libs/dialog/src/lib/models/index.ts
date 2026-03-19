import type { ReactNode, HTMLAttributes } from 'react';

export interface PortalProps {
  children: ReactNode;
  /** Container element to render portal into (default: document.body) */
  container?: Element | null;
}

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether modal is visible */
  open: boolean;
  /** Called when modal requests to close (ESC key, backdrop click) */
  onClose?: () => void;
  /** Modal content */
  children?: ReactNode;
  /** Disable backdrop click to close */
  disableBackdropClick?: boolean;
  /** Disable ESC key to close */
  disableEscapeKey?: boolean;
  /** Custom z-index (default: theme.zIndex.modal ?? 1300) */
  zIndex?: number;
  /** Keep modal mounted when closed (for transition preservation) */
  keepMounted?: boolean;
  /** Portal container */
  container?: Element | null;
}
