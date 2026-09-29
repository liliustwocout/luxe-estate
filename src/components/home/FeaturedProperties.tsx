'use client';

import Link from 'next/link';
import { getFeaturedProperties } from '@/lib/data';
import PropertyCard from '@/components/properties/PropertyCard';
import { FadeUp } from '@/components/ui/animations';
import { useLanguage } from '@/context/LanguageContext';

export default function FeaturedProperties() {
  const { language, t } = useLanguage();
  const featured = getFeaturedProperties().slice(0, 6);

  return (
    <section className="py-24 md:py-32">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <FadeUp>
              <p className="text-eyebrow mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                {t.featured.badge[language]}
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-heading text-charcoal">
                {t.featured.title[language]}
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="mt-3 text-sm md:text-base text-slate max-w-xl">
                {t.featured.subtitle[language]}
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-navy transition-colors group px-5 py-2.5 rounded-full border border-charcoal/10 hover:border-charcoal/30 bg-white"
            >
              <span>{t.featured.viewAll[language]}</span>
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
          </FadeUp>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
