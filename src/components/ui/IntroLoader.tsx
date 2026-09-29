'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState('01');

  useEffect(() => {
    // Only run intro once per session
    try {
      const hasLoaded = sessionStorage.getItem('luxe_intro_shown');
      if (hasLoaded) {
        setLoading(false);
        return;
      }
    } catch {
      // ignore
    }

    const t1 = setTimeout(() => setStep('02'), 350);
    const t2 = setTimeout(() => setStep('03'), 700);
    const t3 = setTimeout(() => {
      setLoading(false);
      try {
        sessionStorage.setItem('luxe_intro_shown', 'true');
      } catch {
        // ignore
      }
    }, 1150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0c1218] flex flex-col items-center justify-center text-white select-none pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Subtle gold line border on exit */}
          <div className="text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[11px] font-semibold tracking-[0.28em] uppercase text-champagne mb-3"
            >
              Curated Residence Rentals
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl font-semibold tracking-wider text-white mb-6"
            >
              LUXEESTATE
            </motion.h1>

            {/* Step Counter */}
            <div className="flex items-center justify-center gap-3 text-xs font-mono text-white/50">
              <span className="text-champagne font-bold">{step}</span>
              <span className="w-8 h-[1px] bg-white/20" />
              <span>03</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
