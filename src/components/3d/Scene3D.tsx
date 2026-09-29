'use client';

import dynamic from 'next/dynamic';

// Next.js dynamic import with ssr: false inside a Client Component
const Architectural3DCanvas = dynamic(
  () => import('./Architectural3DCanvas'),
  { ssr: false }
);

export default function Scene3D() {
  return <Architectural3DCanvas />;
}
