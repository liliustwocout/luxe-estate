'use client';

import Image from 'next/image';
import { FadeUp, ImageReveal } from '@/components/ui/animations';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutSection() {
  const { language, t } = useLanguage();

  const stats = [
    {
      value: '120+',
      label: language === 'vi' ? 'Căn Hộ Đang Cho Thuê' : 'Curated Rentals Available',
    },
    {
      value: '100%',
      label: language === 'vi' ? 'Đầy Đủ Nội Thất Cao Cấp' : 'Fully Furnished Suites',
    },
    {
      value: '1,500+',
      label: language === 'vi' ? 'Khách Thuê Thượng Lưu' : 'VIP & Expat Tenants',
    },
    {
      value: '99.4%',
      label: language === 'vi' ? 'Mức Độ Hài Lòng' : 'Tenant Satisfaction',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative z-10">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <ImageReveal className="rounded-2xl">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80"
                alt="Modern luxury interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-navy">
                  LuxeEstate Rental Standard
                </p>
                <p className="text-xs sm:text-sm font-medium text-charcoal mt-0.5">
                  {language === 'vi'
                    ? '42 tiêu chuẩn kiểm duyệt nội thất & an ninh căn hộ cho thuê'
                    : '42-point luxury interior inspection & security verification'}
                </p>
              </div>
            </div>
          </ImageReveal>

          {/* Content */}
          <div>
            <FadeUp>
              <p className="text-eyebrow mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                {t.about.badge[language]}
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-heading text-charcoal mb-6">
                {language === 'vi' ? (
                  <>
                    Không gian sống <br />
                    <span className="text-champagne italic font-normal">kiến tạo di sản</span>
                  </>
                ) : (
                  <>
                    Living spaces that <br />
                    <span className="text-champagne italic font-normal">define legacy</span>
                  </>
                )}
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-body mb-6 text-slate leading-relaxed">
                {t.about.storyP1[language]}
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-body mb-10 text-slate leading-relaxed">
                {t.about.storyP2[language]}
              </p>
            </FadeUp>

            {/* Stats */}
            <FadeUp delay={0.4}>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-charcoal/[0.08]">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-l-2 border-champagne pl-4">
                    <p className="font-display text-2xl md:text-3xl font-semibold text-charcoal">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
