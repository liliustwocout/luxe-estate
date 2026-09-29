'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Property } from '@/lib/types';
import { easeOutExpo } from '@/components/ui/animations';
import { useLanguage } from '@/context/LanguageContext';

type FormData = {
  customerName: string;
  phone: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().]/g, '');
  return /^((\+84|0)[35789]\d{8}|\+?[1-9]\d{7,14})$/.test(cleaned);
}

export default function ViewingModal({
  property,
  isOpen,
  onClose,
}: {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { language, t } = useLanguage();
  const [form, setForm] = useState<FormData>({
    customerName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bookingCode, setBookingCode] = useState('');

  const displayTitle = language === 'vi' && property.titleVi ? property.titleVi : property.title;
  const displayLocation =
    language === 'vi' && property.locationVi ? property.locationVi : property.location;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.customerName.trim()) {
      newErrors.customerName =
        language === 'vi'
          ? 'Vui lòng nhập họ và tên của quý khách.'
          : 'Please enter your full name.';
    }
    if (!form.phone.trim()) {
      newErrors.phone =
        language === 'vi'
          ? 'Vui lòng nhập số điện thoại liên hệ.'
          : 'Please enter your contact phone number.';
    } else if (!validatePhone(form.phone)) {
      newErrors.phone =
        language === 'vi'
          ? 'Số điện thoại không hợp lệ (VD: 0901234567 hoặc +84).'
          : 'Please enter a valid phone number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    const generatedCode = `LXE-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingCode(generatedCode);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          propertyTitle: displayTitle,
          customerName: form.customerName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          message: form.message.trim() || undefined,
          bookingCode: generatedCode,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const resetForm = () => {
    setForm({
      customerName: '',
      phone: '',
      email: '',
      message: '',
    });
    setErrors({});
    setStatus('idle');
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 350);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClasses = (field: keyof FormData) =>
    `w-full px-4 py-3 text-sm bg-ivory rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-charcoal font-medium ${
      errors[field] ? 'border-error/60 bg-error/5' : 'border-charcoal/[0.12] hover:border-charcoal/25'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-xl my-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-charcoal/10 z-10"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
          >
            {/* Header Strip with gradient */}
            <div className="px-7 pt-7 pb-5 border-b border-charcoal/[0.08] bg-ivory-dark/40 flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne/15 text-charcoal text-[11px] font-semibold uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                  {t.viewingModal.title[language]}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-charcoal leading-snug">
                  {displayTitle}
                </h3>
                <p className="text-xs text-slate mt-1 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{displayLocation}</span>
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-charcoal/10 hover:bg-charcoal hover:text-white transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Success State */}
            {status === 'success' ? (
              <div className="p-8 md:p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-md"
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>

                <h4 className="font-display text-2xl font-semibold text-charcoal mb-2">
                  {t.viewingModal.successTitle[language]}
                </h4>
                <p className="text-sm text-slate mb-6 max-w-md mx-auto leading-relaxed">
                  {t.viewingModal.successMessage[language]}
                </p>

                {/* Booking Summary Box */}
                <div className="bg-ivory rounded-2xl p-5 mb-6 text-left border border-charcoal/[0.08] text-xs space-y-2.5">
                  <div className="flex justify-between items-center pb-2 border-b border-charcoal/[0.06]">
                    <span className="text-muted uppercase tracking-wider">{t.viewingModal.bookingCodeLabel[language]}:</span>
                    <span className="font-mono font-bold text-navy text-sm bg-navy/10 px-2.5 py-0.5 rounded-md">
                      {bookingCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">{t.viewingModal.propertyLabel[language]}:</span>
                    <span className="font-semibold text-charcoal text-right max-w-[220px] truncate">{displayTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">{language === 'vi' ? 'Thời gian' : 'Schedule'}:</span>
                    <span className="font-semibold text-charcoal text-right">
                      {language === 'vi' ? 'Chuyên viên liên hệ hẹn giờ' : 'Advisor will call to confirm'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">{language === 'vi' ? 'Khách hàng' : 'Client'}:</span>
                    <span className="font-semibold text-charcoal">{form.customerName} ({form.phone})</span>
                  </div>
                </div>

                <p className="text-xs text-slate mb-6">
                  {t.viewingModal.vipHotlineText[language]}
                </p>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3.5 bg-charcoal text-white text-sm font-semibold rounded-xl hover:bg-navy transition-colors shadow-md"
                >
                  {t.viewingModal.closeButton[language]}
                </button>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="p-7 md:p-8 space-y-5">
                {/* Note Banner */}
                <div className="p-3.5 rounded-xl bg-ivory-dark/40 border border-charcoal/[0.08] text-xs text-slate flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-champagne flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {language === 'vi'
                      ? 'Để lại thông tin, chuyên viên tư vấn cao cấp sẽ liên hệ ngay để sắp xếp thời gian đón tiếp thuận tiện nhất cho quý khách.'
                      : 'Please leave your contact info. Our senior advisor will reach out promptly to arrange a convenient viewing schedule.'}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="customerName" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                    {t.viewingModal.fullNameLabel[language]} <span className="text-error">*</span>
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    placeholder={t.viewingModal.fullNamePlaceholder[language]}
                    value={form.customerName}
                    onChange={(e) => updateField('customerName', e.target.value)}
                    className={inputClasses('customerName')}
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-xs text-error">{errors.customerName}</p>
                  )}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                      {t.viewingModal.phoneLabel[language]} <span className="text-error">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder={t.viewingModal.phonePlaceholder[language]}
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className={inputClasses('phone')}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-error">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                      {t.viewingModal.emailLabel[language]}
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder={t.viewingModal.emailPlaceholder[language]}
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={inputClasses('email')}
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                    {t.viewingModal.specialRequestsLabel[language]}
                  </label>
                  <textarea
                    id="message"
                    rows={2}
                    placeholder={t.viewingModal.specialRequestsPlaceholder[language]}
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    className={`${inputClasses('message')} resize-none`}
                  />
                </div>

                {/* Privacy Badge */}
                <div className="p-3 rounded-xl bg-ivory text-[11px] text-slate leading-relaxed border border-charcoal/[0.06]">
                  {t.viewingModal.privacyNotice[language]}
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <motion.div
                    className="p-3 rounded-xl bg-red-50 text-error text-xs font-medium text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {language === 'vi'
                      ? 'Đã xảy ra lỗi kết nối. Quý khách vui lòng thử lại hoặc gọi hotline (+84) 28 8888 9999.'
                      : 'Connection error. Please try again or call concierge hotline (+84) 28 8888 9999.'}
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-charcoal text-white text-sm font-semibold rounded-xl hover:bg-navy transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.99]"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin text-champagne" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>{t.viewingModal.submitting[language]}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{t.viewingModal.confirmSubmitButton[language]}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
