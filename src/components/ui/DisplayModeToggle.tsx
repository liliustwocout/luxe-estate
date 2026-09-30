'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDisplayMode, DisplayMode } from '@/context/DisplayModeContext';
import { useLanguage } from '@/context/LanguageContext';

interface DisplayModeToggleProps {
  variant?: 'floating' | 'navbar' | 'compact' | 'drawer';
  isLightNav?: boolean;
  className?: string;
}

export default function DisplayModeToggle({
  variant = 'floating',
  isLightNav = false,
  className = '',
}: DisplayModeToggleProps) {
  const { mode, setMode } = useDisplayMode();
  const { language, t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState<DisplayMode | null>(null);

  // 1. NAVBAR COMPACT VARIANT
  if (variant === 'navbar') {
    return (
      <div
        className={`relative flex items-center p-0.5 rounded-full border transition-all duration-300 ${className}`}
        style={{
          borderColor: isLightNav ? 'rgba(255, 255, 255, 0.25)' : 'rgba(17, 17, 17, 0.12)',
          backgroundColor: isLightNav ? 'rgba(0, 0, 0, 0.3)' : 'rgba(239, 239, 233, 0.75)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Lite Button */}
        <button
          type="button"
          onClick={() => setMode('lite')}
          className="relative z-10 flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full transition-colors duration-200"
          style={{
            color:
              mode === 'lite'
                ? '#ffffff'
                : isLightNav
                  ? 'rgba(255, 255, 255, 0.75)'
                  : 'var(--color-secondary)',
          }}
          title={t.displayMode.liteDesc[language]}
          aria-pressed={mode === 'lite'}
          aria-label={t.displayMode.liteTitle[language]}
        >
          <span className="text-xs">⚡</span>
          <span className="hidden lg:inline">{t.displayMode.liteShort[language]}</span>
        </button>

        {/* Ultra 3D Button */}
        <button
          type="button"
          onClick={() => setMode('ultra')}
          className="relative z-10 flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full transition-colors duration-200"
          style={{
            color:
              mode === 'ultra'
                ? '#111111'
                : isLightNav
                  ? 'rgba(255, 255, 255, 0.75)'
                  : 'var(--color-secondary)',
          }}
          title={t.displayMode.ultraDesc[language]}
          aria-pressed={mode === 'ultra'}
          aria-label={t.displayMode.ultraTitle[language]}
        >
          <span className="text-xs">✨</span>
          <span className="hidden lg:inline">{t.displayMode.ultraShort[language]}</span>
        </button>

        {/* Sliding indicator */}
        <motion.div
          className={`absolute top-0.5 bottom-0.5 rounded-full ${
            mode === 'ultra'
              ? 'bg-gradient-to-r from-[#d4bc8b] to-[#c9a96e] shadow-sm'
              : 'bg-emerald-600 shadow-sm'
          }`}
          layoutId="navbarModeThumb"
          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
          style={{
            left: mode === 'lite' ? '2px' : '50%',
            right: mode === 'lite' ? '50%' : '2px',
          }}
        />
      </div>
    );
  }

  // 2. MOBILE DRAWER VARIANT
  if (variant === 'drawer') {
    return (
      <div className={`flex items-center gap-3 my-2 w-full justify-between ${className}`}>
        <span className="text-xs uppercase tracking-wider text-slate">
          {language === 'vi' ? 'Hiệu năng 3D:' : '3D Graphics:'}
        </span>
        <div className="flex items-center p-1 rounded-full bg-ivory-dark border border-charcoal/10">
          <button
            type="button"
            onClick={() => setMode('lite')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition-all ${
              mode === 'lite' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate hover:text-charcoal'
            }`}
          >
            <span>⚡</span>
            <span>{t.displayMode.liteShort[language]}</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('ultra')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition-all ${
              mode === 'ultra' ? 'bg-charcoal text-[#d4bc8b] shadow-sm' : 'text-slate hover:text-charcoal'
            }`}
          >
            <span>✨</span>
            <span>{t.displayMode.ultraShort[language]}</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. COMPACT INLINE VARIANT
  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white ${className}`}
      >
        <button
          type="button"
          onClick={() => setMode('lite')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            mode === 'lite'
              ? 'bg-emerald-500/90 text-white shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <span>⚡</span>
          <span>{t.displayMode.liteShort[language]}</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('ultra')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            mode === 'ultra'
              ? 'bg-gradient-to-r from-[#c9a96e] to-[#d4bc8b] text-charcoal font-semibold shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <span>✨</span>
          <span>{t.displayMode.ultraShort[language]}</span>
        </button>
      </div>
    );
  }

  // 4. FLOATING LANDING PAGE DOCK VARIANT (Luxury HUD Dock)
  return (
    <aside
      aria-label="Chế độ hiển thị 3D và Hiệu năng"
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 select-none ${className}`}
    >
      <div className="relative">
        {/* Tooltip Hover Bubble */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full mb-3 right-0 w-72 sm:w-80 p-4 rounded-2xl bg-[#0c1218]/95 backdrop-blur-2xl border border-white/20 text-white shadow-[0_16px_50px_rgba(0,0,0,0.6)] pointer-events-none"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">
                  {showTooltip === 'ultra' ? '✨' : '⚡'}
                </span>
                <p className="text-xs font-bold tracking-wide text-white">
                  {showTooltip === 'ultra'
                    ? t.displayMode.ultraTitle[language]
                    : t.displayMode.liteTitle[language]}
                </p>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full font-mono ml-auto font-medium ${
                    showTooltip === 'ultra'
                      ? 'bg-[#c9a96e]/20 text-[#d4bc8b] border border-[#c9a96e]/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {showTooltip === 'ultra' ? 'Full Visual 3D' : 'Fast · 0% Lag'}
                </span>
              </div>
              <p className="text-[12px] leading-relaxed text-white/80 font-light">
                {showTooltip === 'ultra'
                  ? t.displayMode.ultraDesc[language]
                  : t.displayMode.liteDesc[language]}
              </p>
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50 font-mono">
                <span>
                  {showTooltip === 'ultra'
                    ? 'WebGL 60FPS · Wireframe & Gold Dust'
                    : '0% GPU · Zero Lag · Pin tối ưu'}
                </span>
                <span className="text-champagne font-semibold">LuxeEstate</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Dock Container */}
        <motion.div
          layout
          className="flex items-center gap-2 p-1.5 rounded-full bg-[#0c1218]/90 hover:bg-[#0c1218] backdrop-blur-2xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300"
        >
          {/* Status Indicator Dot with Pulse */}
          <div className="flex items-center gap-2 pl-3.5 pr-1 text-white/80">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  mode === 'ultra' ? 'bg-[#c9a96e]' : 'bg-emerald-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  mode === 'ultra' ? 'bg-[#c9a96e]' : 'bg-emerald-400'
                }`}
              />
            </span>
            <span className="hidden sm:inline text-[11px] font-mono tracking-wider uppercase text-white/60 font-medium">
              Chế độ:
            </span>
          </div>

          {/* Toggle Segmented Switch */}
          <div className="relative flex items-center p-1 rounded-full bg-black/50 border border-white/10">
            {/* Lite Button (Tối giản web cho đỡ lag) */}
            <button
              type="button"
              onClick={() => setMode('lite')}
              onMouseEnter={() => setShowTooltip('lite')}
              onMouseLeave={() => setShowTooltip(null)}
              className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-200 ${
                mode === 'lite'
                  ? 'text-white font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
              aria-label="Chuyển sang chế độ tối giản cho đỡ lag"
              aria-pressed={mode === 'lite'}
            >
              <span className="text-xs">⚡</span>
              <span className="tracking-wide">
                {t.displayMode.liteTitle[language]}
              </span>
              {mode === 'lite' && (
                <span className="hidden md:inline text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 font-mono font-medium">
                  Mượt
                </span>
              )}
            </button>

            {/* Ultra 3D Button (Full hiệu năng siêu đẹp) */}
            <button
              type="button"
              onClick={() => setMode('ultra')}
              onMouseEnter={() => setShowTooltip('ultra')}
              onMouseLeave={() => setShowTooltip(null)}
              className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-200 ${
                mode === 'ultra'
                  ? 'text-charcoal font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
              aria-label="Chuyển sang chế độ 3D full hiệu năng siêu đẹp"
              aria-pressed={mode === 'ultra'}
            >
              <span className="text-xs">✨</span>
              <span className="tracking-wide">
                {t.displayMode.ultraTitle[language]}
              </span>
              {mode === 'ultra' && (
                <span className="hidden md:inline text-[9px] px-1.5 py-0.5 rounded-full bg-black/20 text-charcoal font-mono font-bold">
                  3D
                </span>
              )}
            </button>

            {/* Active sliding thumb indicator */}
            <motion.div
              layoutId="floatingModeSlider"
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              className={`absolute top-1 bottom-1 rounded-full ${
                mode === 'ultra'
                  ? 'bg-gradient-to-r from-[#d4bc8b] via-[#c9a96e] to-[#b38e4f] shadow-[0_2px_12px_rgba(201,169,110,0.4)]'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-700 shadow-[0_2px_12px_rgba(16,185,129,0.35)]'
              }`}
              style={{
                left: mode === 'lite' ? '4px' : '50%',
                right: mode === 'lite' ? '50%' : '4px',
              }}
            />
          </div>

          {/* Info (?) trigger */}
          <button
            type="button"
            onClick={() =>
              setShowTooltip((prev) => (prev ? null : mode === 'ultra' ? 'ultra' : 'lite'))
            }
            className="w-7 h-7 mr-0.5 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors text-xs font-mono"
            aria-label="Chi tiết chế độ hiển thị"
            title="Nhấn để xem thông tin chế độ"
          >
            ?
          </button>
        </motion.div>
      </div>
    </aside>
  );
}
