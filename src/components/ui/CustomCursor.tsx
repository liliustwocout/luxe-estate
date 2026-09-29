'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const clickable = target.closest('a, button, [role="button"], input, select, textarea, .group, [data-cursor="pointer"]');
      setIsHovered(Boolean(clickable));
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, visible]);

  if (pathname?.startsWith('/admin') || isMobile || !visible) return null;

  return (
    <>
      {/* Central precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-champagne pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600 }}
      />

      {/* Trailing smooth magnetic ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-champagne/60 pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 backdrop-blur-[0.5px]"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: isHovered ? 48 : 26,
          height: isHovered ? 48 : 26,
          backgroundColor: isHovered ? 'rgba(201, 169, 110, 0.12)' : 'rgba(201, 169, 110, 0.02)',
          borderColor: isHovered ? 'rgba(201, 169, 110, 0.9)' : 'rgba(201, 169, 110, 0.4)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
    </>
  );
}
