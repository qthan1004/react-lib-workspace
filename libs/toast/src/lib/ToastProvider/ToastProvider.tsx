import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { ToastProviderProps, ToastMessage, ToastContextType, ToastVariant } from '../models';
import { ToastRootStyled, ToastCloseButtonStyled, ToastContainerStyled } from '../Toast/styled';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  placement = 'bottom-center',
  duration: defaultDuration = 4000 
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: React.ReactNode, options?: { variant?: ToastVariant; duration?: number }) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = {
        id,
        message,
        variant: options?.variant || 'info',
        duration: options?.duration ?? defaultDuration,
      };

      setToasts((prev) => [...prev, newToast]);

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, newToast.duration);
      }

      return id;
    },
    [defaultDuration, removeToast]
  );

  const contextValue = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {typeof window !== 'undefined' && createPortal(
        <ToastContainerStyled ownerPlacement={placement}>
          {toasts.map((toast) => (
            <ToastRootStyled key={toast.id} role="alert" ownerVariant={toast.variant || 'info'}>
              <div>{toast.message}</div>
              <ToastCloseButtonStyled onClick={() => removeToast(toast.id)} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </ToastCloseButtonStyled>
            </ToastRootStyled>
          ))}
        </ToastContainerStyled>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
