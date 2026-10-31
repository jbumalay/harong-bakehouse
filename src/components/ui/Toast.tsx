import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, X, Info } from 'lucide-react';

interface ToastOptions {
  title?: string;
  message: string;
  type?: 'success' | 'info' | 'error';
  duration?: number;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<(ToastOptions & { id: number })[]>([]);

  const showToast = useCallback((options: ToastOptions) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...options, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, options.duration || 4000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto bg-[#30231D] text-[#FFFEFC] px-4 py-3 rounded-none border border-[#8A7769]/40 shadow-xl flex items-start gap-3 transition-all animate-toast-in"
          >
            <div className="mt-0.5 shrink-0 text-[#B66B4E]">
              {toast.type === 'error' ? (
                <X className="w-4 h-4" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 text-sm">
              {toast.title && <div className="font-medium text-white mb-0.5">{toast.title}</div>}
              <div className="text-sm text-[#EAE0D1]">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8A7769] hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
