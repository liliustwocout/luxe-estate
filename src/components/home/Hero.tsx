'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { easeOutExpo } from '@/components/ui/animations';
import { useLanguage } from '@/context/LanguageContext';
import ViewingModal from '@/components/properties/ViewingModal';
import { properties } from '@/lib/data';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Multi-layer parallax
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const floatBadgeY1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const floatBadgeY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const floatBadgeY3 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const featuredProperty = properties[0];

  return (
    <>
      <section
        ref={ref}
        className="relative min-h-[100svh] pt-24 pb-20 flex items-center overflow-hidden bg-[#0c1218]"
      >
        {/* Cinematic Background Image with Zoom & Dark Vignette */}
        <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale, opacity: bgOpacity }}>
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&q=85"
            alt="Cinematic luxury residence"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Cinematic lighting gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1218] via-transparent to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80" />
        </motion.div>

        {/* Floating Architectural Badge: Top Right */}
        <motion.div
          className="hidden lg:flex absolute top-32 right-12 z-10 items-center gap-3 p-3.5 pr-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl"
          style={{ y: floatBadgeY1 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: easeOutExpo }}
        >
          <div className="w-10 h-10 rounded-xl bg-champagne/20 border border-champagne/40 flex items-center justify-center text-champagne font-mono font-bold text-xs">
            01
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-champagne font-semibold">
              Featured Residence
            </p>
            <p className="text-xs font-semibold text-white">Lumina Residence · $1,200 / mo</p>
          </div>
        </motion.div>

        {/* Floating Badge: Right Mid-Low */}
        <motion.div
          className="hidden xl:flex absolute bottom-36 right-16 z-10 items-center gap-3 px-4 py-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15 text-white shadow-2xl"
          style={{ y: floatBadgeY2 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: easeOutExpo }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Hanoi · Saigon</p>
            <p className="text-xs font-semibold text-white">100% Inspected & Ready</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div className="relative z-10 container-main w-full" style={{ y: textY }}>
          <div className="max-w-4xl">
            {/* Eyebrow Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
            >
              <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/95">
                {t.hero.badge[language]}
              </span>
            </motion.div>

            {/* Cinematic Large Typography with line reveals */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white mb-6 leading-[1.05]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  key={`line1-${language}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: easeOutExpo }}
                >
                  {language === 'vi' ? 'Khám Phá' : 'DISCOVER'}
                </motion.span>
              </span>

              <span className="block overflow-hidden">
                <motion.span
                  className="block text-champagne-light italic font-normal"
                  key={`line2-${language}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.42, ease: easeOutExpo }}
                >
                  {language === 'vi' ? 'Không Gian Thuê' : 'YOUR NEXT'}
                </motion.span>
              </span>

              <span className="block overflow-hidden">
                <motion.span
                  className="block text-white"
                  key={`line3-${language}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.54, ease: easeOutExpo }}
                >
                  {language === 'vi' ? 'Đẳng Cấp Nhất' : 'HOME.'}
                </motion.span>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              key={`desc-${language}`}
              className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mb-10 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: easeOutExpo }}
            >
              {t.hero.description[language]}
            </motion.p>

            {/* Dual CTAs: Explore Properties & Schedule a Viewing */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: easeOutExpo }}
            >
              <Link
                href="/properties"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-charcoal text-sm font-semibold rounded-full hover:bg-champagne hover:text-white transition-all duration-300 shadow-2xl hover:shadow-champagne/20 hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <span>{t.hero.ctaExplore[language]}</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full backdrop-blur-md border border-white/25 hover:border-champagne/60 transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
                <span>{t.hero.ctaBook[language]}</span>
              </button>
            </motion.div>

            {/* Key Stats Bar with glass container */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-white/15 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: easeOutExpo }}
            >
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {t.hero.stat1Value}
                </p>
                <p className="text-xs text-white/60 mt-1 uppercase tracking-wider font-medium">
                  {t.hero.stat1Label[language]}
                </p>
              </div>

              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-champagne tracking-tight">
                  {t.hero.stat2Value}
                </p>
                <p className="text-xs text-white/60 mt-1 uppercase tracking-wider font-medium">
                  {t.hero.stat2Label[language]}
                </p>
              </div>

              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {t.hero.stat3Value}
                </p>
                <p className="text-xs text-white/60 mt-1 uppercase tracking-wider font-medium">
                  {t.hero.stat3Label[language]}
                </p>
              </div>

              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {t.hero.stat4Value}
                </p>
                <p className="text-xs text-white/60 mt-1 uppercase tracking-wider font-medium">
                  {t.hero.stat4Label[language]}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Viewing Modal triggered from Hero */}
      <ViewingModal
        property={featuredProperty}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
