'use client';

import React from 'react';
import ScrollSection from '@/components/ScrollSection';
import HeroSection from '@/components/HeroSection';
import RecreationalSection from '@/components/RecreationalSection';
import TrainingSection from '@/components/TrainingSection';
import CoursesBannerSection from '@/components/CoursesBannerSection';
import KidsBannerSection from '@/components/KidsBannerSection';
import FooterSection from '@/components/FooterSection';

const TOTAL_SECTIONS = 6;

export default function HomePage() {
  return (
    <>
      {/* ── 1: Hero ── */}
      <ScrollSection
        sectionIndex={0}
        totalSections={TOTAL_SECTIONS}
        bgColor="var(--bg)"
      >
        <HeroSection />
      </ScrollSection>

      {/* ── 2: Recreational Activities ── */}
      <ScrollSection
        sectionIndex={1}
        totalSections={TOTAL_SECTIONS}
        bgColor="#F0EBD8"
      >
        <RecreationalSection />
      </ScrollSection>

      {/* ── 3: Training Workshops ── */}
      <ScrollSection
        sectionIndex={2}
        totalSections={TOTAL_SECTIONS}
        bgColor="#2C3319"
      >
        <TrainingSection />
      </ScrollSection>

      {/* ── 4: Courses Banner ── */}
      <ScrollSection
        sectionIndex={3}
        totalSections={TOTAL_SECTIONS}
        bgColor="#F6F0E2"
      >
        <CoursesBannerSection />
      </ScrollSection>

      {/* ── 5: Kids Workshops Banner ── */}
      <ScrollSection
        sectionIndex={4}
        totalSections={TOTAL_SECTIONS}
        bgColor="#FFF5EB"
      >
        <KidsBannerSection />
      </ScrollSection>

      {/* ── 6: Dark Footer ── */}
      <ScrollSection
        sectionIndex={5}
        totalSections={TOTAL_SECTIONS}
        bgColor="#121212"
      >
        <FooterSection />
      </ScrollSection>
    </>
  );
}
