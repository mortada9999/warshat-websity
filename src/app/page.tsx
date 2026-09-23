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
import trainingStyles from '@/components/TrainingSection.module.css';
import coursesStyles from '@/components/CoursesBannerSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

const SECTIONS = [
  { Component: HeroSection,         bg: '#F6F0E2', torn: false, isNotebook: false, wrapperClass: '' },
  { Component: RecreationalSection, bg: '#E8F3E8', torn: true,  isNotebook: false, wrapperClass: '' },
  { Component: TrainingSection,     bg: '#E8D9B5', torn: true,  isNotebook: false, wrapperClass: trainingStyles.sandySection },
  { Component: CoursesBannerSection,bg: '#2a3a1f', torn: true,  isNotebook: false, wrapperClass: coursesStyles.textureSection },
  { Component: KidsBannerSection,   bg: '#FDFBF7', torn: true,  isNotebook: true,  wrapperClass: '' },
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
        <div className="w-full overflow-hidden">
           {SECTIONS.map(({ Component, bg, torn, isNotebook, wrapperClass }, i) => (
            <div
              key={i}
              className={`stackable-section relative w-full ${wrapperClass || ''}`}
              style={{ 
                backgroundColor: wrapperClass ? undefined : bg,
                zIndex: (i + 1) * 10,
                boxShadow: i > 0 && !torn ? '0 -10px 30px rgba(0,0,0,0.05)' : 'none',
                minHeight: '100svh',
                paddingBottom: i === SECTIONS.length - 1 ? '0' : '60svh',
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
                    top: '0',
                  }}
                  aria-hidden="true"
                />
              )}
              {torn && <TornEdge color={bg} seed={i} isNotebook={isNotebook} textureClass={wrapperClass} />}
              {/* Content wrapper — keeps section at natural height, not stretched by parent paddingBottom */}
              <div style={{ minHeight: '100svh', position: 'relative' }}>
                <Component />
              </div>
            </div>
          ))}
        </div>
      </main>
      <FooterSection />
    </>
  );
}
