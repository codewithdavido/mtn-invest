import React from 'react';
import LandingNav from './components/LandingNav';
import HeroSection from './components/HeroSection';
import TrustStats from './components/TrustStats';
import ProductCards from './components/ProductCards';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import LandingFooter from './components/LandingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <LandingNav />
      <HeroSection />
      <TrustStats />
      <ProductCards />
      <HowItWorks />
      <Testimonials />
      <FaqSection />
      <LandingFooter />
    </div>
  );
}