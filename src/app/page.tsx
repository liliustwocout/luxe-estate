import Scene3D from '@/components/3d/Scene3D';
import Hero from '@/components/home/Hero';
import SearchBar from '@/components/home/SearchBar';
import FeaturedShowcase from '@/components/home/FeaturedShowcase';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import AboutSection from '@/components/home/AboutSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      {/* Interactive 3D architectural background */}
      <Scene3D />

      {/* Hero section with cinematic typography and dual rental CTAs */}
      <Hero />

      {/* Rental search & filter bar */}
      <SearchBar />

      {/* Featured Residences interactive showcase carousel */}
      <FeaturedShowcase />

      {/* Curated rental properties grid */}
      <FeaturedProperties />

      {/* LuxeEstate rental bespoke advantages */}
      <AboutSection />

      {/* Final Schedule a Viewing & Concierge CTA */}
      <CTASection />
    </>
  );
}
