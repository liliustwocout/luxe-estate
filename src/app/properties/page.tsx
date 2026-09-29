'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  locations,
  propertyTypes,
  bedroomOptions,
  furnishingOptions,
  availabilityOptions,
  filterProperties,
} from '@/lib/data';
import PropertyCard from '@/components/properties/PropertyCard';
import { FadeUp } from '@/components/ui/animations';
import { useLanguage } from '@/context/LanguageContext';

function PropertyListingContent() {
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();

  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [maxRent, setMaxRent] = useState<number>(() => {
    const p = searchParams.get('maxPrice');
    return p ? Number(p) : 3500;
  });
  const [bedrooms, setBedrooms] = useState<number>(() => {
    const b = searchParams.get('bedrooms');
    return b ? Number(b) : 0;
  });
  const [furnishing, setFurnishing] = useState(searchParams.get('furnishing') || '');
  const [availability, setAvailability] = useState(searchParams.get('availability') || '');

  const filteredProperties = useMemo(() => {
    return filterProperties({
      location: location || undefined,
      type: type || undefined,
      maxPrice: maxRent < 3500 ? maxRent : undefined,
      bedrooms: bedrooms || undefined,
      furnishing: furnishing || undefined,
      availability: availability || undefined,
    });
  }, [location, type, maxRent, bedrooms, furnishing, availability]);

  const hasActiveFilters =
    Boolean(location) ||
    Boolean(type) ||
    maxRent < 3500 ||
    bedrooms > 0 ||
    Boolean(furnishing) ||
    Boolean(availability);

  const resetAllFilters = () => {
    setLocation('');
    setType('');
    setMaxRent(3500);
    setBedrooms(0);
    setFurnishing('');
    setAvailability('');
  };

  const selectClasses =
    'w-full appearance-none bg-white text-xs text-charcoal font-medium px-4 py-3 rounded-xl border border-charcoal/[0.1] focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200 cursor-pointer shadow-sm';

  const rentVndMillion = ((maxRent * 25400) / 1_000_000).toFixed(1);

  return (
    <div className="pt-[var(--nav-height)] bg-ivory min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 bg-white border-b border-charcoal/[0.06]">
        <div className="container-main">
          <FadeUp>
            <p className="text-eyebrow mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
              {t.propertiesPage.breadcrumbCurrent[language]}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-heading text-charcoal mb-3">
              {t.propertiesPage.title[language]}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body max-w-2xl text-slate text-sm md:text-base">
              {t.propertiesPage.subtitle[language]}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Main Filter Control Station & Properties Grid */}
      <section className="py-10 md:py-14">
        <div className="container-main">
          {/* Advanced Filter Panel */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-charcoal/[0.08] shadow-sm mb-10">
            {/* Top row: Dropdown selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
              {/* Location */}
              <div className="relative">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-muted mb-1.5">
                  {t.searchBar.locationLabel[language]}
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={selectClasses}
                    aria-label="Filter by location"
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
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div className="relative">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-muted mb-1.5">
                  {t.searchBar.typeLabel[language]}
                </label>
                <div className="relative">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className={selectClasses}
                    aria-label="Filter by type"
                  >
                    <option value="">{t.searchBar.typePlaceholder[language]}</option>
                    {propertyTypes
                      .filter((item) => item !== 'All Types')
                      .map((item) => (
                        <option key={item} value={item}>
                          {language === 'vi'
                            ? item === 'Villa'
                              ? 'Biệt Thự Vườn / Ven Sông'
                              : item === 'Apartment'
                                ? 'Căn Hộ Cao Cấp'
                                : item === 'Penthouse'
                                  ? 'Duplex / Penthouse'
                                  : item === 'Townhouse'
                                    ? 'Nhà Phố Liền Kề'
                                    : 'Studio Loft'
                            : item}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Furnishing */}
              <div className="relative">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-muted mb-1.5">
                  {t.searchBar.furnishingLabel[language]}
                </label>
                <div className="relative">
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value)}
                    className={selectClasses}
                    aria-label="Filter by furnishing"
                  >
                    {furnishingOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {language === 'vi' ? opt.labelVi : opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="relative">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-muted mb-1.5">
                  {t.searchBar.availabilityLabel[language]}
                </label>
                <div className="relative">
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className={selectClasses}
                    aria-label="Filter by availability"
                  >
                    {availabilityOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {language === 'vi' ? opt.labelVi : opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: Interactive Monthly Rent Slider & Bedrooms */}
            <div className="pt-6 border-t border-charcoal/[0.06] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Monthly Rent Slider (7 cols) */}
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-charcoal flex items-center gap-1.5">
                    <span>{t.searchBar.priceLabel[language]}:</span>
                    <span className="text-navy font-bold text-sm">
                      {maxRent >= 3500 ? (language === 'vi' ? 'Tất cả mức giá' : 'Up to $3,500+ / mo') : `$${maxRent.toLocaleString()} / mo`}
                    </span>
                  </span>
                  {maxRent < 3500 && (
                    <span className="text-[11px] font-medium text-champagne bg-champagne/10 px-2 py-0.5 rounded-md">
                      {language === 'vi' ? `~${rentVndMillion} Triệu / tháng` : `≈ ${rentVndMillion}M VND`}
                    </span>
                  )}
                </div>

                {/* Range input slider */}
                <div className="relative py-2">
                  <input
                    type="range"
                    min="500"
                    max="3500"
                    step="100"
                    value={maxRent}
                    onChange={(e) => setMaxRent(Number(e.target.value))}
                    className="w-full h-2 bg-ivory-dark rounded-lg appearance-none cursor-pointer accent-charcoal"
                  />
                  <div className="flex justify-between text-[10px] text-muted font-medium mt-1.5">
                    <span>$500 / mo</span>
                    <span>$1,000</span>
                    <span>$1,500</span>
                    <span>$2,500</span>
                    <span>$3,500+ / mo</span>
                  </div>
                </div>
              </div>

              {/* Bedrooms Quick Buttons (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">
                  {t.common.bedrooms[language]}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {bedroomOptions.map((b) => {
                    const isSelected = bedrooms === b.value;
                    return (
                      <button
                        key={b.value}
                        type="button"
                        onClick={() => setBedrooms(b.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-charcoal text-white shadow-sm'
                            : 'bg-ivory text-charcoal hover:bg-ivory-dark'
                        }`}
                      >
                        {b.value === 0 ? t.common.all[language] : `${b.label} ${language === 'vi' ? 'PN' : 'Beds'}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Active status & count */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-3 border-b border-charcoal/[0.06]">
            <motion.p
              className="text-sm font-medium text-charcoal flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {language === 'vi'
                  ? `Tìm thấy ${filteredProperties.length} căn hộ / biệt thự cho thuê phù hợp`
                  : `${filteredProperties.length} ${filteredProperties.length === 1 ? 'rental property' : 'rental properties'} available`}
              </span>
            </motion.p>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-navy hover:text-charcoal underline underline-offset-4 font-semibold transition-colors flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{t.searchBar.clearFilters[language]}</span>
              </button>
            )}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filteredProperties.length > 0 ? (
              <motion.div
                key={`${location}-${type}-${maxRent}-${bedrooms}-${furnishing}-${availability}-${language}`}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProperties.map((property, i) => (
                  <PropertyCard key={property.id} property={property} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="text-center py-20 bg-white rounded-3xl border border-charcoal/[0.06] p-8 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-charcoal/5 flex items-center justify-center">
                  <svg className="w-7 h-7 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-medium text-charcoal mb-2">
                  {t.propertiesPage.noResultsTitle[language]}
                </h3>
                <p className="text-sm text-slate mb-6 max-w-md mx-auto leading-relaxed">
                  {t.propertiesPage.noResultsDesc[language]}
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-7 py-3 text-sm font-semibold bg-charcoal text-white rounded-full hover:bg-navy transition-colors shadow-md"
                >
                  {t.propertiesPage.resetFilters[language]}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-[var(--nav-height)]">
          <section className="py-16 md:py-20 bg-white border-b border-charcoal/[0.04]">
            <div className="container-main">
              <div className="h-4 w-24 bg-charcoal/5 rounded mb-3 animate-pulse" />
              <div className="h-10 w-64 bg-charcoal/5 rounded mb-3 animate-pulse" />
              <div className="h-5 w-80 bg-charcoal/5 rounded animate-pulse" />
            </div>
          </section>
          <section className="py-12 md:py-16">
            <div className="container-main">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-xl bg-white border border-charcoal/[0.04] overflow-hidden animate-pulse">
                    <div className="aspect-[4/3] bg-charcoal/5" />
                    <div className="p-6 space-y-3">
                      <div className="h-6 w-20 bg-charcoal/5 rounded" />
                      <div className="h-5 w-40 bg-charcoal/5 rounded" />
                      <div className="h-4 w-32 bg-charcoal/5 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      }
    >
      <PropertyListingContent />
    </Suspense>
  );
}
