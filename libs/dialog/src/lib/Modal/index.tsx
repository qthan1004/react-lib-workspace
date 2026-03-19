import { useCallback, useEffect, useRef } from 'react';
import { useTheme } from '@emotion/react';
import type { ThemeSchema } from '@thanhdq/theme';

import type { ModalProps } from '../models';
import { DEFAULT_Z_INDEX } from '../constants';
import { trapFocus } from '../helpers';
import { Portal } from '../Portal';
import { ModalBackdrop, ModalContent } from './styled';

/**
 * Modal — full-screen overlay with centered content.
 *
 * Features:
 * - Portal rendering (avoids overflow/z-index issues)
 * - Backdrop click to close
 * - ESC key to close
 * - Focus trap (WCAG 2.2 — SC 2.4.3)
 * - aria-modal + role="dialog" (WCAG 2.2 — SC 4.1.2)
 * - Body scroll lock when open
 * - keepMounted option for animation support
 */
export const Modal = ({
  open,
  onClose,
  children,
  disableBackdropClick = false,
  disableEscapeKey = false,
  zIndex,
  keepMounted = false,
  container,
  ...rest
}: ModalProps) => {
  const theme = useTheme() as ThemeSchema;
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const resolvedZIndex = zIndex ?? theme.zIndex?.modal ?? DEFAULT_Z_INDEX;

  // ESC key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableEscapeKey) {
        e.stopPropagation();
        onClose?.();
      }
    },
    [disableEscapeKey, onClose],
  );

  // Backdrop click handler
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Only close if clicking the backdrop itself, not its children
      if (e.target === e.currentTarget && !disableBackdropClick) {
        onClose?.();
      }
    },
    [disableBackdropClick, onClose],
  );

  // Focus trap, body scroll lock, ESC key
  useEffect(() => {
    if (!open) return;

    // Save current focus to restore later
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // ESC key listener
    document.addEventListener('keydown', handleKeyDown);

    // Focus trap
    let cleanupTrap: (() => void) | undefined;
    const content = contentRef.current;
    if (content) {
      // Auto-focus content or first focusable element
      const timer = requestAnimationFrame(() => {
        content.focus();
      });

      cleanupTrap = trapFocus(content);

      return () => {
        cancelAnimationFrame(timer);
        cleanupTrap?.();
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;

        // Restore focus
        previousFocusRef.current?.focus();
      };
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open, handleKeyDown]);

  // Don't render if closed and not keepMounted
  if (!open && !keepMounted) return null;

  return (
    <Portal container={container}>
      <ModalBackdrop
        ownerZIndex={resolvedZIndex}
        ownerOpen={open}
        onClick={handleBackdropClick}
        {...rest}
      >
        <ModalContent
          ref={contentRef}
          ownerOpen={open}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          {children}
        </ModalContent>
      </ModalBackdrop>
    </Portal>
  );
};

Modal.displayName = 'Modal';
export default Modal;
