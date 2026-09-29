'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPropertyBySlug } from '@/lib/data';
import { formatPrice } from '@/lib/translations';
import PropertyGallery from '@/components/properties/PropertyGallery';
import ViewingModal from '@/components/properties/ViewingModal';
import { FadeUp, FadeIn } from '@/components/ui/animations';
import { useLanguage } from '@/context/LanguageContext';

const featureIcons: Record<string, string> = {
  // English keys
  'Private Swimming Pool': '🏊',
  'Swimming Pool': '🏊',
  'Infinity Pool': '🏊',
  'Sky Pool': '🏊',
  'Rooftop Pool': '🏊',
  'Community Pool': '🏊',
  'Rooftop Saltwater Pool': '🏊',
  'Tropical Garden': '🌿',
  'Private Garden': '🌿',
  'Zen Garden': '🎋',
  'Mature Garden': '🌳',
  'Smart Home Control': '🏠',
  'Smart Home': '🏠',
  'Smart Home Ecosystem': '🏠',
  'Smart Keyless Entry': '🔑',
  'Biometric Access Control': '🔒',
  'Parking Garage': '🅿️',
  'Parking': '🅿️',
  '24/7 Security': '🛡️',
  '24/7 Concierge Security': '🛎️',
  'White-Glove Concierge Service': '🛎️',
  'Air Conditioning': '❄️',
  'River View': '🌊',
  'Direct River View': '🌊',
  'City View': '🌆',
  'Ocean View': '🌅',
  'Lake View': '🏞️',
  'Home Theater': '🎬',
  'Private Cinema Room': '🎬',
  'Wine Cellar': '🍷',
  'Wine Room': '🍷',
  'Rooftop Sky Terrace': '🏗️',
  'Rooftop Terrace': '🏗️',
  'Private Direct Elevator': '🛗',
  'Private Elevator': '🛗',
  'Beach Elevator': '🛗',
  'Direct Private Beach Elevator': '🛗',
  'Sky Lounge & Wet Bar': '🍸',
  'Sky Lounge': '🍸',
  'Japanese Zen Garden Courtyard': '🎋',
  'Skylight Atrium': '☀️',
  'Restored Colonial Heritage': '🏛️',
  'Classic Wood-Paneled Library': '📚',
  'Al Fresco Dining Veranda': '🍷',
  'Carved Marble Water Fountain': '⛲',
  '5.5m Double Height Ceilings': '📐',
  'Lakefront Cantilevered Deck': '🌊',
  'Wraparound Sunset Terrace': '🌅',
  'Spa Bathroom': '🛁',

  // Vietnamese keys
  'Hồ bơi vô cực riêng': '🏊',
  'Vườn nhiệt đới cảnh quan': '🌿',
  'Hệ thống Smart Home': '🏠',
  'Gara riêng 3 xe hơi': '🚗',
  'An ninh & bảo vệ 24/7': '🛡️',
  'Điều hòa âm trần trung tâm': '❄️',
  'Tầm nhìn trực diện sông Sài Gòn': '🌊',
  'Nội thất nhập khẩu từ Ý': '🛋️',
  'Phòng chiếu phim gia đình': '🎬',
  'Hầm rượu vang nhiệt độ chuẩn': '🍷',
  'Sân thượng chân mây riêng': '🏗️',
  'Thang máy riêng bảo mật thẻ từ': '🛗',
  'Hệ thống điều khiển thông minh': '📱',
  'Dịch vụ quản gia Concierge VIP': '🛎️',
  'An ninh đa lớp 24/7': '🔒',
  'Điều hòa đa vùng độc lập': '❄️',
  'Tầm nhìn 360° toàn cảnh Sài Gòn': '🌆',
  'Nội thất đặt đóng riêng xa xỉ': '✨',
  'Phòng xông hơi Sauna & Spa riêng': '🧖',
  'Sky Lounge & Quầy bar tầng thượng': '🍸',
  'Vườn thiền Zen trung tâm': '🎋',
  'Giếng trời lấy sáng tự nhiên': '☀️',
  'Hệ sinh thái Smart Home': '🏠',
  'Gara trong nhà 2 xe hơi': '🚗',
  'Khu compound khép kín an ninh': '🛡️',
  'Hệ thống điều hòa Inverter': '❄️',
  'Ban công xanh ngắm cảnh': '🌿',
  'Sàn gỗ Teak tự nhiên cao cấp': '🪵',
  'Khu bếp phong cách châu Âu': '🍳',
  'Hồ bơi vô cực chân mây': '🏊',
  'Phòng Gym & Yoga tiêu chuẩn': '🧘',
  'Khóa cửa vân tay thông minh': '🔐',
  'Suất đậu xe định danh tầng hầm': '🅿️',
  'Lễ tân & an ninh 24/7': '🛎️',
  'Điều hòa âm trần Daikin': '❄️',
  'Tầm nhìn hoàng hôn trên sông': '🌅',
  'Executive Lounge & Co-working': '💼',
  'Kiến trúc di sản Pháp phục dựng': '🏛️',
  'Vườn cổ thụ rợp bóng mát': '🌳',
  'Sân đỗ 4 xe hơi riêng': '🚗',
  'Hệ thống an ninh giám sát': '📹',
  'Điều hòa toàn bộ khuôn viên': '❄️',
  'Thư viện ốp gỗ quý cổ điển': '📚',
  'Khu phụ trợ riêng cho gia nhân': '🏡',
  'Hiên thưởng trà ngoài trời': '🍵',
  'Đài phun nước điêu khắc cẩm thạch': '⛲',
  'Trần thông tầng cao 5.5m': '📐',
  'Phòng ngủ tầng lửng sang trọng': '🛏️',
  'Ban công đón nắng sớm ngắm phố': '☕',
  'Điểm sạc xe điện tầng hầm': '⚡',
  'Khóa vân tay & thẻ từ sinh trắc học': '🔒',
  'Hồ bơi điện phân muối tầng thượng': '🏊',
  'Quầy café nghệ thuật tại sảnh đón': '☕',
  'Sàn vọng cảnh vươn mặt hồ': '🌊',
  'Sân vườn cỏ xanh riêng biệt': '🌿',
  'Studio sáng tạo & làm việc riêng': '🎨',
  'Gara 2 xe có mái che': '🚗',
  'Đặc quyền cư dân Clubhouse 5 sao': '⭐',
  'Hệ thống điện năng lượng mặt trời': '☀️',
  'Khu tiệc BBQ sân vườn ngoài trời': '🍖',
  'Hệ thống an ninh thông minh': '🛡️',
  'Đường dạo bộ ven hồ trong lành': '🏃',
  'Tầm nhìn trực diện đại dương vô cực': '🌊',
  'Sân thượng ngắm hoàng hôn biển': '🌅',
  'Thang máy thẳng xuống bãi cát': '🛗',
  'Chỗ đỗ xe có mái che': '🚗',
  'An ninh bảo vệ 24/7': '🛡️',
  'Hệ thống thông gió biển & điều hòa': '💨',
  'Bồn tắm ngâm hướng biển sang trọng': '🛁',
  'Nội thất cao cấp hoàn thiện 100%': '🛋️',
  'Hồ bơi vô cực chân mây tầng thượng': '🏊',
};

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { language, t } = useLanguage();
  const rawProperty = getPropertyBySlug(slug);
  const [modalOpen, setModalOpen] = useState(false);

  if (!rawProperty) {
    notFound();
  }

  const title = language === 'vi' && rawProperty.titleVi ? rawProperty.titleVi : rawProperty.title;
  const location = language === 'vi' && rawProperty.locationVi ? rawProperty.locationVi : rawProperty.location;
  const address = language === 'vi' && rawProperty.addressVi ? rawProperty.addressVi : rawProperty.address;
  const type = language === 'vi' && rawProperty.typeVi ? rawProperty.typeVi : rawProperty.type;
  const description = language === 'vi' && rawProperty.descriptionVi ? rawProperty.descriptionVi : rawProperty.description;
  const features = language === 'vi' && rawProperty.featuresVi ? rawProperty.featuresVi : rawProperty.features;
  const priceInfo = formatPrice(rawProperty.price, language);

  return (
    <>
      <div className="pt-[var(--nav-height)] bg-ivory">
        {/* Breadcrumb Navigation */}
        <div className="container-main py-4">
          <nav className="flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-charcoal transition-colors">
              {t.nav.home[language]}
            </Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-charcoal transition-colors">
              {t.nav.properties[language]}
            </Link>
            <span>/</span>
            <span className="text-charcoal font-medium truncate max-w-[260px]">{title}</span>
          </nav>
        </div>

        {/* Gallery Hero */}
        <section className="container-main mb-10">
          <FadeIn>
            <PropertyGallery images={rawProperty.images} title={title} />
          </FadeIn>
        </section>

        {/* Content Section */}
        <section className="container-main pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Main Details (Col 1-2) */}
            <div className="lg:col-span-2">
              {/* Header Title & Badges */}
              <FadeUp>
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-charcoal text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                      {t.common.forRent[language]}
                    </span>
                    <span className="inline-block px-3 py-1 bg-navy text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm">
                      {type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {rawProperty.isAvailable ? (language === 'vi' ? 'Còn trống dọn vào ngay' : 'Available Now') : (language === 'vi' ? 'Đã Cọc' : 'Reserved')}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-champagne/15 text-charcoal text-xs font-semibold rounded-full">
                      {language === 'vi' ? rawProperty.furnishingVi : rawProperty.furnishing}
                    </span>
                  </div>

                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-charcoal mb-3 leading-tight">
                    {title}
                  </h1>

                  <p className="text-sm md:text-base text-slate flex items-center gap-2">
                    <svg className="w-4 h-4 text-champagne flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                    </svg>
                    <span>{address}</span>
                  </p>
                </div>
              </FadeUp>

              {/* Rental Specs Grid */}
              <FadeUp delay={0.1}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 bg-white rounded-3xl border border-charcoal/[0.08] shadow-sm mb-8">
                  <div className="text-center p-3 rounded-2xl bg-ivory/60">
                    <p className="text-[11px] text-muted uppercase tracking-wider mb-0.5">{language === 'vi' ? 'Phòng ngủ' : 'Bedrooms'}</p>
                    <p className="font-display text-2xl font-bold text-charcoal">{rawProperty.bedrooms}</p>
                    <p className="text-[11px] text-slate">{language === 'vi' ? 'Khép kín' : 'En-suite'}</p>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-ivory/60">
                    <p className="text-[11px] text-muted uppercase tracking-wider mb-0.5">{language === 'vi' ? 'Phòng tắm' : 'Bathrooms'}</p>
                    <p className="font-display text-2xl font-bold text-charcoal">{rawProperty.bathrooms}</p>
                    <p className="text-[11px] text-slate">{language === 'vi' ? 'Hiện đại' : 'Modern'}</p>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-ivory/60">
                    <p className="text-[11px] text-muted uppercase tracking-wider mb-0.5">{language === 'vi' ? 'Diện tích' : 'Area'}</p>
                    <p className="font-display text-2xl font-bold text-charcoal">{rawProperty.area} <span className="text-sm font-normal">m²</span></p>
                    <p className="text-[11px] text-slate">{language === 'vi' ? 'Sử dụng' : 'Usable'}</p>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-ivory/60">
                    <p className="text-[11px] text-muted uppercase tracking-wider mb-0.5">{language === 'vi' ? 'Vị trí tầng' : 'Floor'}</p>
                    <p className="font-display text-xl font-bold text-charcoal truncate">{language === 'vi' ? (rawProperty.floorVi || rawProperty.floor) : rawProperty.floor}</p>
                    <p className="text-[11px] text-slate">{language === 'vi' ? 'View thoáng' : 'Panoramic'}</p>
                  </div>
                </div>

                {/* Rental Details Key-Value Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 text-xs">
                  <div className="p-4 bg-white rounded-2xl border border-charcoal/[0.08] shadow-sm flex flex-col justify-between">
                    <span className="text-muted uppercase tracking-wider font-medium">{t.propertyDetail.furnishingLabel[language]}</span>
                    <span className="font-semibold text-charcoal text-sm mt-1">{language === 'vi' ? rawProperty.furnishingVi : rawProperty.furnishing}</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-charcoal/[0.08] shadow-sm flex flex-col justify-between">
                    <span className="text-muted uppercase tracking-wider font-medium">{t.propertyDetail.securityDepositLabel[language]}</span>
                    <span className="font-semibold text-charcoal text-sm mt-1">{language === 'vi' ? (rawProperty.securityDepositVi || rawProperty.securityDeposit) : rawProperty.securityDeposit}</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-charcoal/[0.08] shadow-sm flex flex-col justify-between">
                    <span className="text-muted uppercase tracking-wider font-medium">{t.propertyDetail.leaseTermLabel[language]}</span>
                    <span className="font-semibold text-charcoal text-sm mt-1">{language === 'vi' ? (rawProperty.leaseTermVi || rawProperty.leaseTerm) : rawProperty.leaseTerm}</span>
                  </div>
                </div>
              </FadeUp>

              {/* Description */}
              <FadeUp delay={0.2}>
                <div className="mb-10 bg-white p-7 md:p-8 rounded-2xl border border-charcoal/[0.08] shadow-sm">
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-4">
                    {t.propertyDetail.overviewTitle[language]}
                  </h2>
                  <p className="text-body text-slate leading-relaxed text-base whitespace-pre-line">
                    {description}
                  </p>
                </div>
              </FadeUp>

              {/* Features & Amenities */}
              <FadeUp delay={0.3}>
                <div className="mb-10 bg-white p-7 md:p-8 rounded-2xl border border-charcoal/[0.08] shadow-sm">
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-6 flex items-center justify-between">
                    <span>{t.propertyDetail.featuresTitle[language]}</span>
                    <span className="text-xs font-normal text-muted bg-ivory px-3 py-1 rounded-full border border-charcoal/10">
                      {features.length} {language === 'vi' ? 'tiêu chuẩn VIP' : 'exclusive amenities'}
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 px-4 py-3 bg-ivory rounded-xl border border-charcoal/[0.06] text-sm text-charcoal font-medium hover:border-champagne/40 transition-colors"
                      >
                        <span className="text-lg flex-shrink-0">{featureIcons[feature] || '✓'}</span>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Location Map Placeholder */}
              <FadeUp delay={0.4}>
                <div className="bg-white p-7 md:p-8 rounded-2xl border border-charcoal/[0.08] shadow-sm">
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-4">
                    {t.propertyDetail.locationTitle[language]}
                  </h2>
                  <div className="rounded-2xl overflow-hidden border border-charcoal/[0.08]">
                    <div className="relative aspect-[16/8] bg-ivory-dark flex items-center justify-center p-6">
                      <div className="text-center max-w-md">
                        <div className="w-12 h-12 rounded-full bg-navy/10 text-navy flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                        </div>
                        <p className="font-semibold text-charcoal text-base mb-1">{location}</p>
                        <p className="text-xs text-slate mb-4">{address}</p>
                        <a
                          href={`https://www.google.com/maps?q=${rawProperty.coordinates?.lat},${rawProperty.coordinates?.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-charcoal/10 rounded-full text-xs font-semibold text-navy hover:bg-navy hover:text-white transition-all shadow-sm"
                        >
                          <span>{language === 'vi' ? 'Xem vị trí trên Google Maps' : 'Open in Google Maps'}</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Sidebar — Sticky Action Card (Col 3) */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-[calc(var(--nav-height)+24px)]">
                <FadeUp delay={0.15}>
                  <div className="bg-white rounded-3xl border border-charcoal/[0.08] p-7 md:p-8 shadow-xl">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                      {t.propertyDetail.offeredAt[language]}
                    </p>
                    <div className="mb-6">
                      <p className="font-display text-3xl md:text-4xl font-semibold text-charcoal">
                        {priceInfo.main}
                      </p>
                      {priceInfo.sub && (
                        <p className="text-sm font-semibold text-champagne mt-0.5">
                          {priceInfo.sub}
                        </p>
                      )}
                      <div className="mt-3 pt-3 border-t border-charcoal/[0.06] flex items-center justify-between text-xs text-slate">
                        <span className="text-muted">{t.propertyDetail.securityDepositLabel[language]}:</span>
                        <span className="font-semibold text-charcoal">
                          {language === 'vi' ? (rawProperty.securityDepositVi || rawProperty.securityDeposit) : rawProperty.securityDeposit}
                        </span>
                      </div>
                    </div>

                    {/* Book viewing CTA */}
                    <button
                      onClick={() => setModalOpen(true)}
                      className="w-full py-4 bg-charcoal text-white text-sm font-semibold rounded-2xl hover:bg-navy transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group mb-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{t.propertyDetail.bookViewingBtn[language]}</span>
                      <svg
                        className="w-4 h-4 text-champagne transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>

                    <p className="text-[11px] text-muted text-center mb-6 leading-relaxed">
                      {t.propertyDetail.sidebarCard.conciergeNotice[language]}
                    </p>

                    {/* Advisor contact section */}
                    <div className="pt-6 border-t border-charcoal/[0.08]">
                      <div className="flex items-center gap-3.5 mb-5">
                        <div className="w-12 h-12 rounded-full bg-navy text-champagne flex items-center justify-center font-display font-semibold text-base shadow-sm">
                          LE
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-charcoal">LuxeEstate Private Office</p>
                          <p className="text-xs text-muted">
                            {language === 'vi' ? 'Chuyên viên quản lý danh mục VIP' : 'Senior Portfolio Advisor'}
                          </p>
                        </div>
                      </div>

                      <a
                        href="tel:+842888889999"
                        className="w-full py-3.5 border border-charcoal/[0.12] text-charcoal text-xs font-semibold rounded-xl hover:bg-ivory hover:border-charcoal/30 transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <span>{t.propertyDetail.sidebarCard.instantCall[language]}</span>
                      </a>

                      <div className="mt-4 pt-4 border-t border-charcoal/[0.06] text-center">
                        <span className="text-[11px] text-slate inline-flex items-center gap-1.5 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          {t.propertyDetail.sidebarCard.verifiedBadge[language]}
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-30 p-4 bg-white/95 backdrop-blur-xl border-t border-charcoal/[0.1] shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="font-display text-base font-bold text-charcoal">
              {priceInfo.main}
            </p>
            {priceInfo.sub && (
              <p className="text-[11px] font-semibold text-champagne">
                {priceInfo.sub}
              </p>
            )}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 bg-charcoal text-white text-xs font-semibold rounded-xl hover:bg-navy transition-colors shadow-md flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{t.common.scheduleTour[language]}</span>
          </button>
        </div>
      </div>

      {/* Viewing Modal */}
      <ViewingModal
        property={rawProperty}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
