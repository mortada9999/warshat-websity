'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import HeroSection from '@/components/HeroSection';
import RecreationalSection from '@/components/RecreationalSection';
import TrainingSection from '@/components/TrainingSection';
import CoursesBannerSection from '@/components/CoursesBannerSection';
import KidsBannerSection from '@/components/KidsBannerSection';
import FooterSection from '@/components/FooterSection';
import TornEdge from '@/components/TornEdge';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const SECTIONS = [
  { Component: HeroSection,         bg: '#F6F0E2', torn: false },
  { Component: RecreationalSection, bg: '#E8F3E8', torn: true  },
  { Component: TrainingSection,     bg: '#F6F0E2', torn: true  },
  { Component: CoursesBannerSection,bg: '#FBFAEF', torn: true  },
  { Component: KidsBannerSection,   bg: '#F6F0E2', torn: true  },
];

export default function HomePage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    const sections = gsap.utils.toArray('.stackable-section') as HTMLElement[];
    
    sections.forEach((section, index) => {
      // Skip last section - footer handles it
      if (index === sections.length - 1) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'bottom bottom',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      });
    });

    // Force ScrollTrigger refresh after Lenis initializes
    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <>
      <main ref={containerRef} className="relative z-10 bg-[#F6F6F4] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {SECTIONS.map(({ Component, bg, torn }, i) => (
          <div
            key={i}
            className="stackable-section relative w-full"
            style={{ 
              backgroundColor: bg,
              zIndex: (i + 1) * 10,
              boxShadow: i > 0 && !torn ? '0 -10px 30px rgba(0,0,0,0.05)' : 'none',
              minHeight: '100vh',
              paddingBottom: '60vh',
            }}
          >
            {torn && <TornEdge color={bg} seed={i} />}
            <Component />
          </div>
        ))}
      </main>
      <FooterSection />
    </>
  );
}
