'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { language, t } = useLanguage();

  return (
    <div className="pt-[var(--nav-height)] min-h-[80vh] flex items-center justify-center bg-ivory">
      <div className="text-center px-6 py-16">
        <p className="font-display text-8xl font-bold text-champagne/40 mb-4 select-none">404</p>
        <h1 className="font-display text-3xl font-semibold text-charcoal mb-3">
          {language === 'vi' ? 'Không Tìm Thấy Trang' : 'Page Not Found'}
        </h1>
        <p className="text-sm text-slate mb-8 max-w-md mx-auto leading-relaxed">
          {language === 'vi'
            ? 'Bất động sản hoặc trang bạn đang tìm kiếm hiện không tồn tại hoặc đã được chuyển nhượng.'
            : 'The luxury property or page you are looking for does not exist or has been relocated.'}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-white text-sm font-semibold rounded-full hover:bg-navy transition-all shadow-md"
        >
          <span>{t.nav.home[language]}</span>
          <svg className="w-4 h-4 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
