'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LiteArchitecturalBackground() {
  const { language, t } = useLanguage();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none transition-opacity duration-700 ease-out"
      aria-hidden="true"
    >
      {/* Deep luxury ambient base */}
      <div className="absolute inset-0 bg-[#0c1218]/40" />

      {/* Subtle architectural radial lighting - pure CSS without GPU draw */}
      <div className="absolute top-[-10%] right-[-10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-[#c9a96e]/10 via-[#c9a96e]/3 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-[#1b3a4b]/20 via-[#c9a96e]/5 to-transparent blur-[140px] pointer-events-none" />

      {/* Elegant SVG Architectural Grid & Floorplan Coordinates (Static, 0% CPU) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="arch-grid-pattern"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#c9a96e"
              strokeWidth="0.75"
              strokeDasharray="2 4"
            />
            {/* Architectural intersection marker */}
            <circle cx="80" cy="80" r="1.5" fill="#c9a96e" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arch-grid-pattern)" />
      </svg>

      {/* Minimalist Architectural Elevation Lines */}
      <div className="hidden lg:block absolute left-8 top-1/3 bottom-1/3 w-[1px] bg-gradient-to-b from-transparent via-[#c9a96e]/25 to-transparent">
        <span className="absolute top-0 -left-2 text-[9px] font-mono tracking-widest text-[#c9a96e]/50 rotate-90 origin-left">
          ELEVATION +18.4M
        </span>
      </div>
      <div className="hidden lg:block absolute right-8 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-[#c9a96e]/25 to-transparent">
        <span className="absolute bottom-0 -right-2 text-[9px] font-mono tracking-widest text-[#c9a96e]/50 -rotate-90 origin-right">
          AXIS · GRID 04
        </span>
      </div>

      {/* Subtle indicator pill at bottom showing Lite Mode active */}
      <div className="absolute top-24 right-6 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/50 text-[11px] font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>{t.displayMode.liteSubtitle[language]}</span>
      </div>
    </div>
  );
}
