import { createPortal } from 'react-dom';
import type { PortalProps } from '../models';

/**
 * Portal — renders children into a DOM node outside the parent hierarchy.
 * Useful for modals, popovers, tooltips to avoid overflow/z-index issues.
 */
export const Portal = ({ children, container }: PortalProps) => {
  const target = container ?? (typeof document !== 'undefined' ? document.body : null);

  if (!target) return null;

  return createPortal(children, target);
};

Portal.displayName = 'Portal';
export default Portal;
