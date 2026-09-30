'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useTheme } from './ThemeContext';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  dismissToast: (id: string) => void;
  toast: {
    success: (message: string, title?: string, duration?: number) => string;
    error: (message: string, title?: string, duration?: number) => string;
    warning: (message: string, title?: string, duration?: number) => string;
    info: (message: string, title?: string, duration?: number) => string;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration = 4200 }: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const newToast: ToastItem = { id, type, title, message, duration };

      setToasts((prev) => [newToast, ...prev].slice(0, 3)); // keep max 3 visible

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast]
  );

  const toast = {
    success: (message: string, title = 'Berhasil', duration = 4000) =>
      showToast({ type: 'success', title, message, duration }),
    error: (message: string, title = 'Terjadi Kesalahan', duration = 4500) =>
      showToast({ type: 'error', title, message, duration }),
    warning: (message: string, title = 'Perhatian', duration = 4000) =>
      showToast({ type: 'warning', title, message, duration }),
    info: (message: string, title = 'Informasi', duration = 3500) =>
      showToast({ type: 'info', title, message, duration })
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />;
    }
  };

  const getGlow = (type: ToastType) => {
    switch (type) {
      case 'success':
        return isLight
          ? 'border-emerald-200/90 shadow-emerald-500/10 bg-white/95'
          : 'border-emerald-500/30 shadow-emerald-500/20 bg-[#0c1310]/95';
      case 'error':
        return isLight
          ? 'border-rose-200/90 shadow-rose-500/10 bg-white/95'
          : 'border-rose-500/30 shadow-rose-500/20 bg-[#160c0f]/95';
      case 'warning':
        return isLight
          ? 'border-amber-200/90 shadow-amber-500/10 bg-white/95'
          : 'border-amber-500/30 shadow-amber-500/20 bg-[#16120a]/95';
      case 'info':
      default:
        return isLight
          ? 'border-blue-200/90 shadow-blue-500/10 bg-white/95'
          : 'border-blue-500/30 shadow-blue-500/20 bg-[#0a0f18]/95';
    }
  };

  const getBadgeStyle = (type: ToastType) => {
    switch (type) {
      case 'success':
        return isLight ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-500/10 border-emerald-500/20';
      case 'error':
        return isLight ? 'bg-rose-50 border-rose-200' : 'bg-rose-500/10 border-rose-500/20';
      case 'warning':
        return isLight ? 'bg-amber-50 border-amber-200' : 'bg-amber-500/10 border-amber-500/20';
      case 'info':
      default:
        return isLight ? 'bg-blue-50 border-blue-200' : 'bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, dismissToast, toast }}>
      {children}

      {/* Floating Apple Cupertino Toast Container */}
      <div className="fixed top-4 inset-x-0 z-[99999] pointer-events-none flex flex-col items-center gap-2.5 px-4 sm:px-6">
        <AnimatePresence mode="sync">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: -26, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, scale: 0.92, filter: 'blur(6px)', transition: { duration: 0.18 } }}
              transition={{ type: 'spring', stiffness: 420, damping: 26, mass: 0.8 }}
              className={`pointer-events-auto relative w-full max-w-md sm:max-w-lg rounded-2xl p-3.5 sm:p-4 backdrop-blur-2xl border shadow-2xl transition-colors overflow-hidden ${getGlow(
                t.type
              )}`}
            >
              <div className="flex items-start gap-3">
                {/* Icon Badge */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${getBadgeStyle(
                    t.type
                  )}`}
                >
                  {getIcon(t.type)}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0 pr-1">
                  {t.title && (
                    <h4
                      className={`text-xs sm:text-sm font-bold tracking-tight mb-0.5 ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {t.title}
                    </h4>
                  )}
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed break-words font-medium ${
                      isLight ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {t.message}
                  </p>
                </div>

                {/* Dismiss Button */}
                <button
                  type="button"
                  onClick={() => dismissToast(t.id)}
                  aria-label="Tutup notifikasi"
                  className={`p-1 rounded-lg transition-colors flex-shrink-0 ${
                    isLight
                      ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Smooth Animated Progress Bar */}
              {t.duration && t.duration > 0 && (
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: t.duration / 1000, ease: 'linear' }}
                  className={`absolute bottom-0 left-0 h-[2.5px] rounded-full opacity-60 ${
                    t.type === 'success'
                      ? 'bg-emerald-500'
                      : t.type === 'error'
                      ? 'bg-rose-500'
                      : t.type === 'warning'
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
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
