'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { easeOutExpo } from '@/components/ui/animations';
import { useLanguage } from '@/context/LanguageContext';
import { useDisplayMode } from '@/context/DisplayModeContext';
import DisplayModeToggle from '@/components/ui/DisplayModeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { mode, toggleMode } = useDisplayMode();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const showSolid = scrolled || !isHome || menuOpen;

  const navLinks = [
    { href: '/properties', label: t.nav.properties[language] },
    { href: '/about', label: t.nav.about[language] },
    { href: '/contact', label: t.nav.contact[language] },
  ];

  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: showSolid ? 'rgba(247, 247, 245, 0.88)' : 'transparent',
          backdropFilter: showSolid ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: showSolid ? 'blur(20px)' : 'none',
          borderBottom: showSolid ? '1px solid rgba(17, 17, 17, 0.08)' : '1px solid transparent',
        }}
      >
        <nav className="container-main flex items-center justify-between h-[var(--nav-height)]">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-2 group">
            <span
              className="font-display text-xl md:text-2xl font-medium tracking-tight transition-colors duration-300"
              style={{ color: !showSolid && isHome ? '#fff' : 'var(--color-primary)' }}
            >
              Luxe<span className="text-champagne font-semibold">Estate</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium tracking-wide transition-colors duration-300 group"
                style={{
                  color: !showSolid && isHome ? 'rgba(255,255,255,0.88)' : 'var(--color-secondary)',
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] bg-champagne transition-all duration-300 ease-out"
                  style={{ width: pathname === link.href ? '100%' : '0%' }}
                />
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] bg-current transition-all duration-300 ease-out group-hover:w-full opacity-60"
                  style={{ width: '0%' }}
                />
              </Link>
            ))}

            {/* 3D Graphics / Lite Performance Mode Toggle */}
            <DisplayModeToggle
              variant="navbar"
              isLightNav={!showSolid && isHome}
            />

            {/* Language Switcher Pill */}
            <div
              className="flex items-center p-0.5 rounded-full border transition-all duration-300"
              style={{
                borderColor:
                  !showSolid && isHome ? 'rgba(255, 255, 255, 0.25)' : 'rgba(17, 17, 17, 0.12)',
                backgroundColor:
                  !showSolid && isHome ? 'rgba(0, 0, 0, 0.25)' : 'rgba(239, 239, 233, 0.7)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <button
                type="button"
                onClick={() => setLanguage('vi')}
                className="px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200"
                style={{
                  backgroundColor:
                    language === 'vi'
                      ? !showSolid && isHome
                        ? '#ffffff'
                        : 'var(--color-primary)'
                      : 'transparent',
                  color:
                    language === 'vi'
                      ? !showSolid && isHome
                        ? 'var(--color-primary)'
                        : '#ffffff'
                      : !showSolid && isHome
                        ? 'rgba(255, 255, 255, 0.75)'
                        : 'var(--color-secondary)',
                  boxShadow: language === 'vi' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                }}
                aria-label="Chuyển sang Tiếng Việt"
              >
                VI
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className="px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200"
                style={{
                  backgroundColor:
                    language === 'en'
                      ? !showSolid && isHome
                        ? '#ffffff'
                        : 'var(--color-primary)'
                      : 'transparent',
                  color:
                    language === 'en'
                      ? !showSolid && isHome
                        ? 'var(--color-primary)'
                        : '#ffffff'
                      : !showSolid && isHome
                        ? 'rgba(255, 255, 255, 0.75)'
                        : 'var(--color-secondary)',
                  boxShadow: language === 'en' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                }}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Schedule a viewing CTA button */}
            <Link
              href="/properties"
              className="ml-1 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              style={{
                backgroundColor: !showSolid && isHome ? 'rgba(255,255,255,0.15)' : 'var(--color-primary)',
                color: '#fff',
                border: !showSolid && isHome ? '1px solid rgba(255,255,255,0.35)' : '1px solid var(--color-primary)',
                backdropFilter: !showSolid && isHome ? 'blur(10px)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (showSolid || !isHome) {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                } else {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.28)';
                }
              }}
              onMouseLeave={(e) => {
                if (showSolid || !isHome) {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                } else {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                }
              }}
            >
              {t.nav.bookViewingBtn[language]}
            </Link>
          </div>

          {/* Mobile Right: 3D Mode Toggle + Language Switcher + Hamburger */}
          <div className="flex items-center gap-2 md:hidden relative z-50">
            {/* Quick 3D / Lite Toggle for Mobile */}
            <button
              type="button"
              onClick={toggleMode}
              className="w-8 h-8 flex items-center justify-center rounded-full border text-xs transition-colors shrink-0 shadow-sm"
              style={{
                borderColor: !showSolid && isHome ? 'rgba(255, 255, 255, 0.3)' : 'rgba(17, 17, 17, 0.12)',
                backgroundColor: !showSolid && isHome ? 'rgba(0, 0, 0, 0.25)' : 'rgba(239, 239, 233, 0.8)',
                color: !showSolid && isHome ? '#ffffff' : 'var(--color-primary)',
              }}
              title={mode === 'ultra' ? 'Đang bật 3D - Bấm để chuyển sang Tối giản (0% Lag)' : 'Đang bật Tối giản - Bấm để bật 3D'}
              aria-label="Chuyển chế độ 3D / Tối giản"
            >
              <span className="text-xs">{mode === 'ultra' ? '✨' : '⚡'}</span>
            </button>

            {/* Compact language switch for mobile */}
            <div
              className="flex items-center p-0.5 rounded-full border text-xs"
              style={{
                borderColor: !showSolid && isHome ? 'rgba(255, 255, 255, 0.3)' : 'rgba(17, 17, 17, 0.12)',
                backgroundColor: !showSolid && isHome ? 'rgba(0, 0, 0, 0.25)' : 'rgba(239, 239, 233, 0.8)',
              }}
            >
              <button
                type="button"
                onClick={() => setLanguage('vi')}
                className="px-2 py-0.5 font-semibold rounded-full transition-all"
                style={{
                  backgroundColor: language === 'vi' ? 'var(--color-primary)' : 'transparent',
                  color: language === 'vi' ? '#ffffff' : (!showSolid && isHome ? '#ffffff' : 'var(--color-secondary)'),
                }}
              >
                VI
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className="px-2 py-0.5 font-semibold rounded-full transition-all"
                style={{
                  backgroundColor: language === 'en' ? 'var(--color-primary)' : 'transparent',
                  color: language === 'en' ? '#ffffff' : (!showSolid && isHome ? '#ffffff' : 'var(--color-secondary)'),
                }}
              >
                EN
              </button>
            </div>

            {/* Hamburger Button */}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <div className="w-6 flex flex-col gap-[6px]">
                <motion.span
                  className="block h-[2px] rounded-full origin-center"
                  style={{
                    backgroundColor: menuOpen
                      ? 'var(--color-primary)'
                      : !showSolid && isHome
                        ? '#fff'
                        : 'var(--color-primary)',
                  }}
                  animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: easeOutExpo }}
                />
                <motion.span
                  className="block h-[2px] rounded-full origin-center"
                  style={{
                    backgroundColor: menuOpen
                      ? 'var(--color-primary)'
                      : !showSolid && isHome
                        ? '#fff'
                        : 'var(--color-primary)',
                  }}
                  animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: easeOutExpo }}
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ivory flex flex-col justify-center items-center md:hidden px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-7 w-full max-w-sm">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: easeOutExpo }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    className="font-display text-2xl font-medium text-charcoal hover:text-navy transition-colors block py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Language Switcher in Mobile Drawer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4, ease: easeOutExpo }}
                className="flex items-center gap-3 my-2"
              >
                <span className="text-xs uppercase tracking-wider text-slate">Ngôn ngữ / Language:</span>
                <div className="flex items-center p-1 rounded-full bg-ivory-dark border border-charcoal/10">
                  <button
                    type="button"
                    onClick={() => setLanguage('vi')}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                      language === 'vi' ? 'bg-charcoal text-white' : 'text-slate'
                    }`}
                  >
                    Tiếng Việt (VI)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                      language === 'en' ? 'bg-charcoal text-white' : 'text-slate'
                    }`}
                  >
                    English (EN)
                  </button>
                </div>
              </motion.div>

              {/* 3D Mode in Mobile Drawer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4, ease: easeOutExpo }}
                className="w-full"
              >
                <DisplayModeToggle variant="drawer" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.32, duration: 0.4, ease: easeOutExpo }}
                className="w-full mt-2"
              >
                <Link
                  href="/properties"
                  className="w-full block text-center py-3.5 bg-charcoal text-white text-sm font-medium rounded-full hover:bg-navy transition-colors shadow-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {t.nav.bookViewingBtn[language]}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
