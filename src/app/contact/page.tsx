'use client';

import { useState } from 'react';
import { FadeUp } from '@/components/ui/animations';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  };

  return (
    <div className="pt-[var(--nav-height)] bg-ivory">
      {/* Header */}
      <section className="py-20 md:py-28 bg-white border-b border-charcoal/[0.06]">
        <div className="container-narrow text-center">
          <FadeUp>
            <p className="text-eyebrow mb-3 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
              {t.contact.badge[language]}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-heading text-charcoal mb-4">
              {t.contact.title[language]}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body max-w-lg mx-auto text-slate text-base">
              {t.contact.subtitle[language]}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
            {/* Info Column */}
            <div className="lg:col-span-2 space-y-8">
              <FadeUp>
                <h2 className="font-display text-2xl font-semibold text-charcoal mb-6">
                  {language === 'vi' ? 'Hệ Thống Văn Phòng' : 'Our Private Offices'}
                </h2>
              </FadeUp>

              {/* HCMC Office */}
              <FadeUp delay={0.1}>
                <div className="p-6 bg-white rounded-2xl border border-charcoal/[0.08] shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-champagne mb-2">
                    {t.contact.hcmOffice.title[language]}
                  </p>
                  <p className="text-sm font-medium text-charcoal leading-relaxed mb-3">
                    {t.contact.hcmOffice.address[language]}
                  </p>
                  <p className="text-xs text-slate">
                    Hotline:{' '}
                    <a href="tel:+842888889999" className="text-navy font-bold hover:underline">
                      {t.contact.hcmOffice.phone}
                    </a>
                  </p>
                </div>
              </FadeUp>

              {/* Hanoi Office */}
              <FadeUp delay={0.15}>
                <div className="p-6 bg-white rounded-2xl border border-charcoal/[0.08] shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-champagne mb-2">
                    {t.contact.hnOffice.title[language]}
                  </p>
                  <p className="text-sm font-medium text-charcoal leading-relaxed mb-3">
                    {t.contact.hnOffice.address[language]}
                  </p>
                  <p className="text-xs text-slate">
                    Hotline:{' '}
                    <a href="tel:+842477778888" className="text-navy font-bold hover:underline">
                      {t.contact.hnOffice.phone}
                    </a>
                  </p>
                </div>
              </FadeUp>

              {/* Working Hours */}
              <FadeUp delay={0.2}>
                <div className="p-5 rounded-2xl bg-white/60 border border-charcoal/[0.06] text-xs space-y-1.5 text-slate">
                  <p className="font-semibold text-charcoal uppercase tracking-wider">
                    {language === 'vi' ? 'Thời gian phục vụ khách VIP' : 'Private Client Hours'}
                  </p>
                  <p>{language === 'vi' ? 'Thứ Hai – Thứ Bảy: 08:30 – 19:30' : 'Monday – Saturday: 8:30 AM – 7:30 PM'}</p>
                  <p>{language === 'vi' ? 'Chủ Nhật: Theo lịch hẹn trước' : 'Sunday: By private appointment'}</p>
                </div>
              </FadeUp>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-3">
              <FadeUp delay={0.2}>
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-charcoal/[0.08] shadow-xl">
                  {!sent ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="font-display text-xl font-semibold text-charcoal mb-4">
                        {t.contact.form.title[language]}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider"
                          >
                            {t.contact.form.nameLabel[language]} <span className="text-error">*</span>
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            className="w-full px-4 py-3 text-sm bg-ivory rounded-xl border border-charcoal/[0.1] focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                            placeholder={t.contact.form.namePlaceholder[language]}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contact-phone"
                            className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider"
                          >
                            {t.contact.form.phoneLabel[language]} <span className="text-error">*</span>
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            required
                            className="w-full px-4 py-3 text-sm bg-ivory rounded-xl border border-charcoal/[0.1] focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                            placeholder={t.contact.form.phonePlaceholder[language]}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider"
                          >
                            {t.contact.form.emailLabel[language]}
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            className="w-full px-4 py-3 text-sm bg-ivory rounded-xl border border-charcoal/[0.1] focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                            placeholder={t.contact.form.emailPlaceholder[language]}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contact-interest"
                            className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider"
                          >
                            {t.contact.form.interestLabel[language]}
                          </label>
                          <select
                            id="contact-interest"
                            className="w-full px-4 py-3 text-sm bg-ivory rounded-xl border border-charcoal/[0.1] focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                          >
                            <option value="">{t.contact.form.interestPlaceholder[language]}</option>
                            <option value="villa">{language === 'vi' ? 'Biệt thự ven sông' : 'Riverside Villa'}</option>
                            <option value="penthouse">{language === 'vi' ? 'Penthouse / Duplex' : 'Penthouse / Duplex'}</option>
                            <option value="apartment">{language === 'vi' ? 'Căn hộ thượng lưu' : 'Luxury Apartment'}</option>
                            <option value="off-market">{language === 'vi' ? 'Bất động sản kín (Off-market)' : 'Off-market Portfolio'}</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider"
                        >
                          {t.contact.form.messageLabel[language]}
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          className="w-full px-4 py-3 text-sm bg-ivory rounded-xl border border-charcoal/[0.1] focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all resize-none"
                          placeholder={t.contact.form.messagePlaceholder[language]}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-charcoal text-white text-sm font-semibold rounded-xl hover:bg-navy transition-all duration-300 shadow-lg disabled:opacity-50"
                      >
                        {loading ? t.contact.form.sending[language] : t.contact.form.submitButton[language]}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="font-display text-2xl font-semibold text-charcoal mb-2">
                        {language === 'vi' ? 'Đã Nhận Yêu Cầu Tư Vấn' : 'Inquiry Received'}
                      </h4>
                      <p className="text-sm text-slate max-w-sm mx-auto leading-relaxed mb-6">
                        {t.contact.form.success[language]}
                      </p>
                      <button
                        onClick={() => setSent(false)}
                        className="px-6 py-2.5 bg-ivory-dark text-charcoal text-xs font-semibold rounded-full hover:bg-charcoal hover:text-white transition-colors"
                      >
                        {language === 'vi' ? 'Gửi tin nhắn khác' : 'Send another inquiry'}
                      </button>
                    </div>
                  )}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
