import { AnimatePresence } from 'framer-motion';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Notification } from 'components';

import type { ReactNode } from 'react';

interface ToastContextState {
  bar: (children: ReactNode, close?: boolean) => JSX.Element;
  toast(children: ReactNode, variant?: 'success' | 'danger' | 'primary'): void;
}

const INITIAL_STATE: ToastContextState = {
  bar(children) {
    return <Notification.Bar>{children}</Notification.Bar>;
  },
  toast: () => null,
};

const ToastContext = createContext(INITIAL_STATE);

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastContent, setToastContent] = useState<ReactNode>();
  const [toastVariant, setToastVariant] = useState<'success' | 'danger' | 'primary'>(
    'primary'
  );

  const bar = useCallback((node: ReactNode, close?: boolean) => {
    return (
      <AnimatePresence>
        {!close && <Notification.Bar>{node}</Notification.Bar>}
      </AnimatePresence>
    );
  }, []);

  const toast = useCallback(
    (node: ReactNode, variant?: 'success' | 'danger' | 'primary') => {
      setToastContent(node);
      setShowToast(true);
      setToastVariant(variant ?? 'primary');

      const timeId = setTimeout(() => {
        setShowToast(false);
      }, 5000);

      return () => {
        clearTimeout(timeId);
      };
    },
    []
  );

  const value = useMemo(() => ({ bar, toast }), [bar, toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {showToast && (
          <Notification.Toast variant={toastVariant}>{toastContent}</Notification.Toast>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
