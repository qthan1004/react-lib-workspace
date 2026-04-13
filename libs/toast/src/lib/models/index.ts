import type { ReactNode } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastMessage {
  id: string;
  message: ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastProps extends ToastMessage {
  onClose: (id: string) => void;
  placement?: ToastPlacement;
}

export interface ToastProviderProps {
  children?: ReactNode;
  placement?: ToastPlacement;
  duration?: number;
}

export interface ToastContextType {
  addToast: (message: ReactNode, options?: { variant?: ToastVariant; duration?: number }) => string;
  removeToast: (id: string) => void;
}
