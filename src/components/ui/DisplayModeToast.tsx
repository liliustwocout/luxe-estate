'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDisplayMode } from '@/context/DisplayModeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function DisplayModeToast() {
  const { toast, dismissToast } = useDisplayMode();
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!toast?.visible) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 3600);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  return (
    <AnimatePresence>
      {toast?.visible && (
        <motion.div
          key="display-mode-toast"
          initial={{ opacity: 0, y: -24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] max-w-md w-[92%] sm:w-auto pointer-events-auto"
        >
          <div
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border backdrop-blur-xl ${
              toast.mode === 'ultra'
                ? 'bg-[#0f1722]/95 border-[#c9a96e]/40 text-white shadow-[#c9a96e]/10'
                : 'bg-[#111820]/95 border-emerald-500/40 text-white shadow-emerald-500/10'
            }`}
          >
            {/* Status Icon */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base font-bold ${
                toast.mode === 'ultra'
                  ? 'bg-gradient-to-br from-[#c9a96e]/30 to-[#c9a96e]/10 text-[#d4bc8b] border border-[#c9a96e]/30'
                  : 'bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {toast.mode === 'ultra' ? '✨' : '⚡'}
            </div>

            {/* Message & Description */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold tracking-wide text-white">
                  {toast.mode === 'ultra'
                    ? t.displayMode.ultraTitle[language]
                    : t.displayMode.liteTitle[language]}
                </p>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                    toast.mode === 'ultra'
                      ? 'bg-[#c9a96e]/20 text-[#d4bc8b]'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {toast.mode === 'ultra' ? 'WebGL 60FPS' : 'Zero GPU'}
                </span>
              </div>
              <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">
                {toast.mode === 'ultra'
                  ? t.displayMode.ultraDesc[language]
                  : t.displayMode.liteDesc[language]}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={dismissToast}
              className="text-white/40 hover:text-white/90 transition-colors p-1 rounded-lg"
              aria-label="Đóng thông báo"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
