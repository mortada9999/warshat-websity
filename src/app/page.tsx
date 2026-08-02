'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import RecreationalSection from '@/components/RecreationalSection';
import TrainingSection from '@/components/TrainingSection';
import CoursesBannerSection from '@/components/CoursesBannerSection';
import KidsBannerSection from '@/components/KidsBannerSection';
import FooterSection from '@/components/FooterSection';

export default function HomePage() {
  return (
    <main>
      {/* Figma order (top to bottom by Y coordinates): */}
      {/* Hero → Entertainment → Training → Courses → Kids → Footer */}
      <HeroSection />
      <RecreationalSection />
      <TrainingSection />
      <CoursesBannerSection />
      <KidsBannerSection />
      <FooterSection />
    </main>
  );
}
