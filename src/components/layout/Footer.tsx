'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const pathname = usePathname();
  const { language, t } = useLanguage();

  if (pathname?.startsWith('/admin')) return null;

  const exploreLinks = [
    { label: language === 'vi' ? 'Tất cả bất động sản' : 'All Properties', href: '/properties' },
    { label: language === 'vi' ? 'Biệt thự sang trọng' : 'Luxury Villas', href: '/properties?type=Villa' },
    { label: language === 'vi' ? 'Duplex & Penthouse' : 'Duplex & Penthouses', href: '/properties?type=Penthouse' },
    { label: language === 'vi' ? 'Căn hộ thượng lưu' : 'Luxury Apartments', href: '/properties?type=Apartment' },
  ];

  const companyLinks = [
    { label: t.nav.about[language], href: '/about' },
    { label: t.nav.contact[language], href: '/contact' },
    { label: t.footer.privacy[language], href: '#' },
    { label: t.footer.terms[language], href: '#' },
  ];

  return (
    <footer className="border-t border-charcoal/[0.08] bg-ivory">
      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-medium tracking-tight text-charcoal">
                Luxe<span className="text-champagne font-semibold">Estate</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate leading-relaxed max-w-sm">
              {t.footer.tagline[language]}
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs text-slate">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory-dark border border-charcoal/10 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {language === 'vi' ? 'Tư vấn trực tiếp 24/7' : '24/7 Concierge Service'}
              </span>
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal mb-4">
              {t.footer.quickLinksTitle[language]}
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate hover:text-charcoal transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal mb-4">
              {t.footer.collectionsTitle[language]}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate hover:text-charcoal transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal mb-4">
              {t.nav.contact[language]}
            </h4>
            <div className="space-y-3 text-sm text-slate">
              <p>
                {language === 'vi' ? 'Quận 1, TP. Hồ Chí Minh' : 'District 1, HCMC'}
                <br />
                Vietnam
              </p>
              <p>
                <a
                  href="tel:+842888889999"
                  className="hover:text-charcoal font-medium transition-colors"
                >
                  (+84) 28 8888 9999
                </a>
              </p>
              <p>
                <a
                  href="mailto:concierge@luxeestate.vn"
                  className="hover:text-charcoal transition-colors"
                >
                  concierge@luxeestate.vn
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-charcoal/[0.08] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            {t.footer.copyright[language]}
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-muted hover:text-charcoal transition-colors">
              {t.footer.privacy[language]}
            </Link>
            <Link href="#" className="text-xs text-muted hover:text-charcoal transition-colors">
              {t.footer.terms[language]}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
