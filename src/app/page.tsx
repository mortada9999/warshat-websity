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
import HiddenWorkshopsSection from '@/components/HiddenWorkshopsSection';
import FooterSection from '@/components/FooterSection';
import TornEdge from '@/components/TornEdge';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const SECTIONS = [
  { Component: HeroSection,         bg: '#F6F0E2', torn: false, isNotebook: false },
  { Component: RecreationalSection, bg: '#E8F3E8', torn: true,  isNotebook: false },
  { Component: TrainingSection,     bg: '#F6F0E2', torn: true,  isNotebook: false },
  { Component: CoursesBannerSection,bg: '#FDFBF7', torn: true,  isNotebook: true  },
  { Component: KidsBannerSection,   bg: '#F6F0E2', torn: true,  isNotebook: false },
];

export default function HomePage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.stackable-section') as HTMLElement[];
    
    sections.forEach((section, index) => {
      if (index === sections.length - 1) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'bottom bottom',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <>
      <main ref={containerRef} className="relative z-10 bg-[#F6F6F4] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {SECTIONS.map(({ Component, bg, torn, isNotebook }, i) => (
          <div
            key={i}
            className="stackable-section relative w-full"
            style={{ 
              backgroundColor: bg,
              // Background image is now handled by a separate absolute div to create a header margin

              zIndex: (i + 1) * 10,
              boxShadow: i > 0 && !torn ? '0 -10px 30px rgba(0,0,0,0.05)' : 'none',
              minHeight: 'min(100dvh, 100vh)',
              paddingBottom: '60vh',
            }}
          >
            {/* Single continuous red margin line for notebook sections.
                `right: calc(5% - 0.75px)` centers this 1.5px line on the 5% mark
                so it lines up exactly with the TornEdge SVG stroke (which is a
                1.5px stroke centered on 5%) on every breakpoint. */}
            {isNotebook && (
              <div 
                className="absolute z-0 pointer-events-none top-0 bottom-0"
                style={{ 
                  right: 'calc(5% - 0.75px)',
                  width: '1.5px',
                  backgroundColor: 'rgba(210, 90, 90, 0.4)',
                }}
                aria-hidden="true"
              />
            )}
            {/* Horizontal blue lines starting below the header margin */}
            {isNotebook && (
              <div 
                className="absolute left-0 right-0 bottom-0 pointer-events-none z-0 notebook-lines"
                style={{ 
                  top: '140px',
                }}
                aria-hidden="true"
              />
            )}
            {torn && <TornEdge color={bg} seed={i} isNotebook={isNotebook} />}
            <Component />
          </div>
        ))}
      </main>
      <HiddenWorkshopsSection />
      <FooterSection />
    </>
  );
}
