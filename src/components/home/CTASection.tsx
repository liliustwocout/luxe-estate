'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FadeUp } from '@/components/ui/animations';
import { useLanguage } from '@/context/LanguageContext';
import ViewingModal from '@/components/properties/ViewingModal';
import { properties } from '@/lib/data';

export default function CTASection() {
  const { language, t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const featuredProperty = properties[1] || properties[0];

  return (
    <>
      <section className="py-24 md:py-32">
        <div className="container-main">
          <div className="relative rounded-3xl overflow-hidden bg-charcoal py-20 md:py-28 px-8 md:px-16 text-center shadow-2xl">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#15232d] to-charcoal opacity-100" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy-light/20 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <FadeUp>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne mb-5">
                  {language === 'vi'
                    ? 'SẴN SÀNG KHÁM PHÁ KHÔNG GIAN THUÊ LÝ TƯỞNG?'
                    : 'READY TO DISCOVER YOUR NEXT RENTAL HOME?'}
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
                  {language === 'vi'
                    ? 'Đặt lịch đi xem căn hộ thực tế cùng chuyên viên LuxeEstate'
                    : 'Schedule a private walkthrough with our rental advisors'}
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-sm md:text-base text-white/70 mb-10 max-w-lg mx-auto leading-relaxed font-light">
                  {language === 'vi'
                    ? 'Đội ngũ chuyên viên sẽ tiếp đón riêng tư, hỗ trợ đàm phán hợp đồng thuê song ngữ và thủ tục nhận nhà sẵn sàng dọn vào ngay.'
                    : 'Our private client directors provide dedicated walkthroughs, bilingual lease structuring, and seamless move-in coordination.'}
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-charcoal text-sm font-semibold rounded-full hover:bg-champagne hover:text-white transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{t.common.scheduleTour[language]}</span>
                  </button>

                  <Link
                    href="/properties"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white text-sm font-medium rounded-full hover:bg-white/20 transition-all duration-300"
                  >
                    {t.hero.ctaExplore[language]}
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-4 text-white/80 hover:text-white text-sm font-medium transition-colors"
                  >
                    {t.nav.contact[language]} →
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Viewing Modal */}
      <ViewingModal
        property={featuredProperty}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
