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

// Section background colors — each section's tornColor matches its own bg
// so the torn edge "tears away" the previous section's color beneath it.
const SECTIONS = [
  { bg: '#F6F6F4',  torn: false, color: '#F6F6F4'  },   // 0 Hero
  { bg: '#F0EBD8',  torn: true,  color: '#F0EBD8'  },   // 1 Recreational
  { bg: '#2C3319',  torn: true,  color: '#2C3319'  },   // 2 Training
  { bg: '#F6F0E2',  torn: true,  color: '#F6F0E2'  },   // 3 Courses Banner
  { bg: '#FFF5EB',  torn: true,  color: '#FFF5EB'  },   // 4 Kids Banner
  { bg: '#121212',  torn: true,  color: '#121212'  },   // 5 Footer
];

const SECTION_CONTENT = [
  <HeroSection key="hero" />,
  <RecreationalSection key="recreational" />,
  <TrainingSection key="training" />,
  <CoursesBannerSection key="courses" />,
  <KidsBannerSection key="kids" />,
  <FooterSection key="footer" />,
];

export default function HomePage() {
  return (
    <>
      {SECTIONS.map((s, i) => (
        <ScrollSection
          key={i}
          sectionIndex={i}
          totalSections={TOTAL_SECTIONS}
          bgColor={s.bg}
          tornEdge={s.torn}
          tornColor={s.color}
        >
          {SECTION_CONTENT[i]}
        </ScrollSection>
      ))}
    </>
  );
}
