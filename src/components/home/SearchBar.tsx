'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { locations, propertyTypes, priceRanges, bedroomOptions } from '@/lib/data';
import { easeOutExpo } from '@/components/ui/animations';
import { useLanguage } from '@/context/LanguageContext';

export default function SearchBar() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [priceIdx, setPriceIdx] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location && location !== 'All Locations' && location !== 'Tất cả vị trí') {
      params.set('location', location);
    }
    if (type && type !== 'All Types' && type !== 'Tất cả loại hình') {
      params.set('type', type);
    }
    if (priceIdx > 0 && priceRanges[priceIdx]) {
      const selectedRange = priceRanges[priceIdx];
      if (selectedRange.max !== Infinity) {
        params.set('maxPrice', selectedRange.max.toString());
      }
    }
    if (bedrooms > 0) params.set('bedrooms', bedrooms.toString());
    router.push(`/properties${params.toString() ? '?' + params.toString() : ''}`);
  };

  const selectClasses =
    'w-full appearance-none bg-transparent text-sm text-charcoal font-medium px-4 py-3 border-0 focus:outline-none cursor-pointer';

  return (
    <motion.section
      className="container-main -mt-12 relative z-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.1, ease: easeOutExpo }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-charcoal/[0.06] p-2.5 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-charcoal/[0.08]">
          {/* Location */}
          <div className="relative group">
            <label className="block px-4 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              {t.searchBar.locationLabel[language]}
            </label>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={selectClasses}
                aria-label={t.searchBar.locationLabel[language]}
              >
                <option value="">{t.searchBar.locationPlaceholder[language]}</option>
                {locations
                  .filter((l) => l !== 'All Locations')
                  .map((l) => (
                    <option key={l} value={l}>
                      {language === 'vi' ? l.replace('District', 'Quận').replace('City', 'TP') : l}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Type */}
          <div className="relative group">
            <label className="block px-4 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              {t.searchBar.typeLabel[language]}
            </label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={selectClasses}
                aria-label={t.searchBar.typeLabel[language]}
              >
                <option value="">{t.searchBar.typePlaceholder[language]}</option>
                {propertyTypes
                  .filter((item) => item !== 'All Types')
                  .map((item) => (
                    <option key={item} value={item}>
                      {language === 'vi'
                        ? item === 'Villa'
                          ? 'Biệt Thự'
                          : item === 'Apartment'
                            ? 'Căn Hộ Thượng Lưu'
                            : item === 'Penthouse'
                              ? 'Duplex / Penthouse'
                              : item === 'Townhouse'
                                ? 'Nhà Phố Đương Đại'
                                : 'Dinh Thự'
                        : item}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="relative group">
            <label className="block px-4 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              {t.searchBar.priceLabel[language]}
            </label>
            <div className="relative">
              <select
                value={priceIdx}
                onChange={(e) => setPriceIdx(Number(e.target.value))}
                className={selectClasses}
                aria-label={t.searchBar.priceLabel[language]}
              >
                {priceRanges.map((r, i) => (
                  <option key={i} value={i}>
                    {language === 'vi' && r.labelVi ? r.labelVi : r.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="relative group">
            <label className="block px-4 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              {t.searchBar.bedroomsLabel[language]}
            </label>
            <div className="relative">
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className={selectClasses}
                aria-label={t.searchBar.bedroomsLabel[language]}
              >
                {bedroomOptions.map((b) => (
                  <option key={b.value} value={b.value}>
                    {language === 'vi' && b.labelVi ? b.labelVi : b.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-center justify-center p-1.5">
            <button
              onClick={handleSearch}
              className="w-full h-full bg-charcoal text-white text-sm font-semibold rounded-xl hover:bg-navy hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 min-h-[52px] active:scale-[0.98]"
              aria-label={t.searchBar.searchButton[language]}
            >
              <svg className="w-4 h-4 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>{t.searchBar.searchButton[language]}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
