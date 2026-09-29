'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Property } from '@/lib/types';
import { formatPrice } from '@/lib/translations';
import { useLanguage } from '@/context/LanguageContext';
import ViewingModal from './ViewingModal';

export default function PropertyCard({
  property,
  index = 0,
}: {
  property: Property;
  index?: number;
}) {
  const { language, t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const displayTitle = language === 'vi' && property.titleVi ? property.titleVi : property.title;
  const displayLocation =
    language === 'vi' && property.locationVi ? property.locationVi : property.location;
  const displayType = language === 'vi' && property.typeVi ? property.typeVi : property.type;
  const displayFurnishing =
    language === 'vi' ? property.furnishingVi : property.furnishing;
  const displayAvailability =
    language === 'vi' ? (property.availableFromVi || 'Còn trống') : (property.availableFrom || 'Available');
  const priceInfo = formatPrice(property.monthlyRent || property.price, language);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-charcoal/[0.08] hover:border-champagne/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
      >
        {/* Image Container with Link */}
        <Link href={`/properties/${property.slug}`} className="relative aspect-[16/10] overflow-hidden block">
          <Image
            src={property.images[0]}
            alt={displayTitle}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25" />

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-charcoal/85 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-white rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                {t.common.forRent[language]}
              </span>
              <span className="inline-block px-2.5 py-1 bg-white/90 backdrop-blur-md text-[10px] font-semibold tracking-wide text-charcoal rounded-full shadow-sm">
                {displayType}
              </span>
            </div>

            {/* Availability status badge */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/90 backdrop-blur-md text-[10px] font-semibold text-white rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {property.isAvailable ? t.common.available[language] : (language === 'vi' ? 'Đã Cọc' : 'Reserved')}
            </span>
          </div>

          {/* Monthly Rent Pill on Image */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-white/75 block font-medium mb-0.5">
                {t.common.monthlyRent[language]}
              </span>
              <div className="font-semibold text-lg sm:text-xl flex items-baseline gap-1.5 drop-shadow-md text-white">
                <span>{priceInfo.main}</span>
              </div>
              {priceInfo.sub && (
                <p className="text-[11px] text-champagne-light drop-shadow-sm font-medium">
                  {priceInfo.sub}
                </p>
              )}
            </div>

            <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-champagne group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Title */}
            <Link href={`/properties/${property.slug}`}>
              <h3 className="font-display text-lg font-semibold text-charcoal mb-1 line-clamp-1 group-hover:text-navy transition-colors duration-300">
                {displayTitle}
              </h3>
            </Link>

            {/* Location */}
            <p className="text-xs text-slate flex items-center gap-1.5 mb-3.5 line-clamp-1">
              <svg
                className="w-3.5 h-3.5 text-champagne flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z"
                />
              </svg>
              <span>{displayLocation}</span>
            </p>

            {/* Specs row: Area, Beds, Baths */}
            <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-ivory rounded-2xl border border-charcoal/[0.06] text-center text-xs text-slate mb-3">
              <div className="flex flex-col items-center">
                <span className="font-bold text-charcoal text-sm">{property.area} m²</span>
                <span className="text-[10px] text-muted uppercase tracking-wider">{t.common.area[language]}</span>
              </div>
              <div className="flex flex-col items-center border-x border-charcoal/[0.08]">
                <span className="font-bold text-charcoal text-sm">{property.bedrooms}</span>
                <span className="text-[10px] text-muted uppercase tracking-wider">{language === 'vi' ? 'Phòng ngủ' : 'Beds'}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-charcoal text-sm">{property.bathrooms}</span>
                <span className="text-[10px] text-muted uppercase tracking-wider">{language === 'vi' ? 'Phòng tắm' : 'Baths'}</span>
              </div>
            </div>

            {/* Furnishing & Available Details */}
            <div className="flex items-center justify-between text-[11px] text-slate pb-3 mb-3 border-b border-charcoal/[0.06]">
              <span className="inline-flex items-center gap-1 font-medium text-charcoal">
                <svg className="w-3.5 h-3.5 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {displayFurnishing}
              </span>
              <span className="text-muted text-[10px]">
                {displayAvailability}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-1">
            <Link
              href={`/properties/${property.slug}`}
              className="flex-1 py-2.5 px-3 bg-ivory-dark hover:bg-charcoal hover:text-white text-charcoal text-xs font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 group/btn"
            >
              <span>{t.common.viewProperty[language]}</span>
            </Link>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="py-2.5 px-3 bg-charcoal text-white hover:bg-navy text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
              title={t.common.scheduleTour[language]}
            >
              <svg className="w-3.5 h-3.5 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">{t.common.scheduleTour[language]}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Viewing Modal for this property */}
      <ViewingModal
        property={property}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
