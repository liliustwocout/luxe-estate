'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FadeUp, ImageReveal } from '@/components/ui/animations';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { language, t } = useLanguage();

  const values = [
    {
      index: '01',
      title: t.about.pillars.p1Title[language],
      desc: t.about.pillars.p1Desc[language],
    },
    {
      index: '02',
      title: t.about.pillars.p2Title[language],
      desc: t.about.pillars.p2Desc[language],
    },
    {
      index: '03',
      title: t.about.pillars.p3Title[language],
      desc: t.about.pillars.p3Desc[language],
    },
  ];

  return (
    <div className="pt-[var(--nav-height)] bg-ivory">
      {/* Header */}
      <section className="py-20 md:py-28 bg-white border-b border-charcoal/[0.06]">
        <div className="container-narrow text-center">
          <FadeUp>
            <p className="text-eyebrow mb-3 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
              {t.about.badge[language]}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-heading text-charcoal mb-4">
              {t.about.title[language]}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body max-w-xl mx-auto text-slate text-base md:text-lg">
              {t.about.subtitle[language]}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <ImageReveal className="rounded-2xl">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80"
                  alt="Luxury property exterior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ImageReveal>

            <div>
              <FadeUp>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-champagne mb-2">
                  LuxeEstate Heritage
                </p>
                <h2 className="text-subheading text-charcoal mb-5">
                  {t.about.storyTitle[language]}
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-body mb-5 text-slate leading-relaxed">
                  {t.about.storyP1[language]}
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-body mb-8 text-slate leading-relaxed">
                  {t.about.storyP2[language]}
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-charcoal text-white text-sm font-semibold rounded-full hover:bg-navy transition-all shadow-md"
                >
                  <span>{t.common.exploreProperties[language]}</span>
                  <svg className="w-4 h-4 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </FadeUp>
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal">
              {language === 'vi' ? '3 Trụ Cột Độc Bản Của LuxeEstate' : 'The 3 Pillars of LuxeEstate'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {values.map((value, i) => (
              <FadeUp key={value.title} delay={i * 0.1}>
                <div className="p-8 bg-white rounded-3xl border border-charcoal/[0.08] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-display text-2xl font-light text-champagne tracking-wider">
                        {value.index}
                      </span>
                      <span className="w-8 h-[1px] bg-champagne/40" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
