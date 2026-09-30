'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useDisplayMode } from '@/context/DisplayModeContext';
import LiteArchitecturalBackground from './LiteArchitecturalBackground';

// Dynamic import for Three.js WebGL canvas (client-side only)
const Architectural3DCanvas = dynamic(
  () => import('./Architectural3DCanvas'),
  { ssr: false }
);

export default function Scene3D() {
  const { mode } = useDisplayMode();

  return (
    <AnimatePresence mode="wait">
      {mode === 'ultra' ? (
        <motion.div
          key="3d-canvas-ultra"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed inset-0 pointer-events-none z-[1]"
        >
          <Architectural3DCanvas />
        </motion.div>
      ) : (
        <motion.div
          key="lite-bg-canvas"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 pointer-events-none z-[1]"
        >
          <LiteArchitecturalBackground />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
