'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { easeOutExpo } from '@/components/ui/animations';
import { useLanguage } from '@/context/LanguageContext';

export default function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const { language } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const goNext = useCallback(() => {
    setSelectedIdx((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setSelectedIdx((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!fullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [fullscreen, goNext, goPrev]);

  return (
    <>
      {/* Main Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 md:gap-3.5 rounded-3xl overflow-hidden shadow-xl border border-charcoal/[0.08]">
        {/* Main Image */}
        <div
          className="md:col-span-3 relative aspect-[16/10] md:aspect-[16/9] cursor-pointer group overflow-hidden"
          onClick={() => setFullscreen(true)}
        >
          <Image
            src={images[selectedIdx]}
            alt={`${title} - Photo ${selectedIdx + 1}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 75vw"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-md text-xs font-semibold text-charcoal rounded-full shadow-lg">
              <svg className="w-4 h-4 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              <span>{language === 'vi' ? 'Xem bộ sưu tập toàn màn hình' : 'View Fullscreen Gallery'}</span>
            </span>
          </div>
        </div>

        {/* Thumbnails Column (Desktop) */}
        <div className="hidden md:flex flex-col gap-2.5 md:gap-3.5">
          {images.slice(0, 4).map((img, i) => (
            <div
              key={i}
              className={`relative flex-1 cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ${
                selectedIdx === i ? 'ring-2 ring-navy ring-offset-2 scale-[1.02]' : 'opacity-75 hover:opacity-100'
              }`}
              onClick={() => setSelectedIdx(i)}
            >
              <Image
                src={img}
                alt={`${title} - Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="25vw"
              />
              {i === 3 && images.length > 4 && (
                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center cursor-pointer transition-colors hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreen(true);
                  }}
                >
                  <span className="text-white text-xs font-semibold uppercase tracking-wider">
                    +{images.length - 4} {language === 'vi' ? 'ảnh khác' : 'more'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile thumbnail strip */}
        <div className="flex md:hidden gap-2 overflow-x-auto pb-1 px-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIdx(i)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-200 ${
                selectedIdx === i ? 'ring-2 ring-navy ring-offset-1' : 'opacity-60'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal View */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close */}
            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-6 right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Close gallery"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Counter & Title */}
            <div className="absolute top-6 left-6 text-sm text-white/80 font-medium flex items-center gap-3">
              <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">
                {selectedIdx + 1} / {images.length}
              </span>
              <span className="text-xs text-white/60 truncate max-w-sm hidden sm:inline">{title}</span>
            </div>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIdx}
                className="relative w-full h-full max-w-6xl max-h-[80vh] mx-auto px-12"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
              >
                <Image
                  src={images[selectedIdx]}
                  alt={`${title} - Photo ${selectedIdx + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Nav Arrows */}
            <button
              onClick={goPrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIdx(i)}
                  className={`w-14 h-14 rounded-xl overflow-hidden transition-all duration-200 flex-shrink-0 relative ${
                    selectedIdx === i ? 'ring-2 ring-champagne scale-110' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
