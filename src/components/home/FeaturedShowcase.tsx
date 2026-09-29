'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '@/lib/data';
import { formatPrice } from '@/lib/translations';
import { useLanguage } from '@/context/LanguageContext';
import ViewingModal from '@/components/properties/ViewingModal';

export default function FeaturedShowcase() {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const featuredList = properties.filter((p) => p.featured);
  const total = featuredList.length;
  const current = featuredList[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const displayTitle = language === 'vi' && current.titleVi ? current.titleVi : current.title;
  const displayLocation = language === 'vi' && current.locationVi ? current.locationVi : current.location;
  const displayType = language === 'vi' && current.typeVi ? current.typeVi : current.type;
  const displayFurnishing = language === 'vi' ? current.furnishingVi : current.furnishing;
  const priceInfo = formatPrice(current.monthlyRent || current.price, language);

  const slideNumber = String(currentIndex + 1).padStart(2, '0');
  const totalNumber = String(total).padStart(2, '0');

  return (
    <>
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Subtle decorative architectural background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-main relative z-10">
          {/* Section Header with Navigation Arrows */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/15 text-charcoal text-xs font-semibold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                {t.featured.badge[language]}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal tracking-tight">
                {t.featured.title[language]}
              </h2>
              <p className="text-slate text-sm sm:text-base max-w-xl mt-2 font-light">
                {t.featured.subtitle[language]}
              </p>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center gap-4">
              <div className="font-mono text-sm tracking-widest text-slate">
                <span className="text-charcoal font-bold text-lg">{slideNumber}</span>
                <span className="text-muted mx-1.5">/</span>
                <span className="text-muted">{totalNumber}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous property"
                  className="w-12 h-12 rounded-full border border-charcoal/15 hover:border-charcoal hover:bg-charcoal hover:text-white text-charcoal flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next property"
                  className="w-12 h-12 rounded-full border border-charcoal/15 hover:border-charcoal hover:bg-charcoal hover:text-white text-charcoal flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Large Cinematic Showcase Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-ivory border border-charcoal/[0.08] p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden group"
              >
                {/* Left: Cinematic Large Image Container (7 cols) */}
                <div className="lg:col-span-7 relative">
                  <Link
                    href={`/properties/${current.slug}`}
                    className="relative block aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <Image
                      src={current.images[0]}
                      alt={displayTitle}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Image Top Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3.5 py-1 bg-charcoal/85 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider rounded-full border border-white/10">
                        {t.common.forRent[language]}
                      </span>
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-charcoal text-[11px] font-semibold rounded-full shadow-sm">
                        {displayType}
                      </span>
                    </div>

                    {/* Slide Counter on image corner */}
                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-xs">
                      {slideNumber} / {totalNumber}
                    </div>
                  </Link>

                  {/* Thumbnail Row */}
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {current.images.slice(1, 5).map((img, idx) => (
                      <div key={idx} className="relative aspect-[16/10] rounded-xl overflow-hidden border border-charcoal/10">
                        <Image src={img} alt="" fill className="object-cover hover:scale-110 transition-transform duration-300" sizes="15vw" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Property Details & Rental Offer (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full">
                  <div>
                    {/* Status Pill */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {language === 'vi' ? 'Còn trống · Sẵn sàng dọn vào' : 'Available Now'}
                      </span>
                      <span className="text-xs text-muted">
                        {language === 'vi' ? current.floorVi : current.floor}
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={`/properties/${current.slug}`}>
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal hover:text-navy transition-colors mb-2">
                        {displayTitle}
                      </h3>
                    </Link>

                    {/* Location */}
                    <p className="text-xs sm:text-sm text-slate flex items-center gap-1.5 mb-6">
                      <svg className="w-4 h-4 text-champagne flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                      </svg>
                      <span>{displayLocation}</span>
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 p-3.5 bg-white rounded-2xl border border-charcoal/[0.06] text-center mb-6 shadow-sm">
                      <div>
                        <span className="font-bold text-charcoal text-base">{current.area} m²</span>
                        <span className="block text-[10px] text-muted uppercase tracking-wider">{t.common.area[language]}</span>
                      </div>
                      <div className="border-x border-charcoal/[0.08]">
                        <span className="font-bold text-charcoal text-base">{current.bedrooms}</span>
                        <span className="block text-[10px] text-muted uppercase tracking-wider">{language === 'vi' ? 'Phòng ngủ' : 'Beds'}</span>
                      </div>
                      <div>
                        <span className="font-bold text-charcoal text-base">{current.bathrooms}</span>
                        <span className="block text-[10px] text-muted uppercase tracking-wider">{language === 'vi' ? 'Phòng tắm' : 'Baths'}</span>
                      </div>
                    </div>

                    {/* Furnishing & Deposit */}
                    <div className="space-y-2 mb-8 text-xs text-slate">
                      <div className="flex items-center justify-between">
                        <span className="text-muted">{t.common.furnishing[language]}:</span>
                        <span className="font-semibold text-charcoal">{displayFurnishing}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">{t.common.securityDeposit[language]}:</span>
                        <span className="font-semibold text-charcoal">{language === 'vi' ? current.securityDepositVi : current.securityDeposit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTAs */}
                  <div className="pt-6 border-t border-charcoal/[0.08]">
                    <div className="mb-5">
                      <span className="text-[11px] uppercase tracking-wider text-muted font-medium block mb-0.5">
                        {t.common.monthlyRent[language]}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-3xl font-bold text-charcoal">
                          {priceInfo.main}
                        </span>
                        {priceInfo.sub && (
                          <span className="text-xs text-champagne font-semibold">
                            ({priceInfo.sub})
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <Link
                        href={`/properties/${current.slug}`}
                        className="w-full sm:flex-1 py-3.5 px-6 bg-charcoal text-white hover:bg-navy text-xs font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99] text-center"
                      >
                        <span>{t.common.viewProperty[language]}</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="w-full sm:w-auto py-3.5 px-6 bg-white hover:bg-ivory text-charcoal border border-charcoal/15 text-xs font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
                        <span>{t.common.scheduleTour[language]}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Viewing Modal */}
      <ViewingModal
        property={current}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
