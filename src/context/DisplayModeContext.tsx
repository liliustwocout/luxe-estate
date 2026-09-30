'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLanguage } from './LanguageContext';

export type DisplayMode = 'ultra' | 'lite';

interface DisplayModeContextType {
  mode: DisplayMode;
  is3DActive: boolean;
  setMode: (mode: DisplayMode) => void;
  toggleMode: () => void;
  toast: {
    visible: boolean;
    mode: DisplayMode;
    message: string;
  } | null;
  dismissToast: () => void;
}

const STORAGE_KEY = 'luxeestate_display_mode';

const DisplayModeContext = createContext<DisplayModeContextType | undefined>(undefined);

export function DisplayModeProvider({ children }: { children: React.ReactNode }) {
  const { language, t } = useLanguage();
  const [mode, setModeState] = useState<DisplayMode>('ultra');
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{
    visible: boolean;
    mode: DisplayMode;
    message: string;
  } | null>(null);

  // Initialize from localStorage or device preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as DisplayMode | null;
      if (saved === 'ultra' || saved === 'lite') {
        setModeState(saved);
      } else {
        // If low power or reduced motion is preferred, default to lite
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          setModeState('lite');
        } else {
          setModeState('ultra');
        }
      }
    } catch {
      // localStorage may fail in private window
    }
    setMounted(true);
  }, []);

  const triggerToast = useCallback(
    (newMode: DisplayMode) => {
      const message =
        newMode === 'lite'
          ? t.displayMode.toastSwitchedToLite[language]
          : t.displayMode.toastSwitchedToUltra[language];

      setToast({
        visible: true,
        mode: newMode,
        message,
      });
    },
    [language, t]
  );

  const setMode = useCallback(
    (newMode: DisplayMode, shouldToast = true) => {
      setModeState(newMode);
      try {
        localStorage.setItem(STORAGE_KEY, newMode);
      } catch {
        // ignore
      }
      if (shouldToast && mounted) {
        triggerToast(newMode);
      }
    },
    [mounted, triggerToast]
  );

  const toggleMode = useCallback(() => {
    const nextMode: DisplayMode = mode === 'ultra' ? 'lite' : 'ultra';
    setMode(nextMode, true);
  }, [mode, setMode]);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <DisplayModeContext.Provider
      value={{
        mode,
        is3DActive: mode === 'ultra',
        setMode,
        toggleMode,
        toast,
        dismissToast,
      }}
    >
      {children}
    </DisplayModeContext.Provider>
  );
}

export function useDisplayMode() {
  const context = useContext(DisplayModeContext);
  if (!context) {
    throw new Error('useDisplayMode must be used within a DisplayModeProvider');
  }
  return context;
}
