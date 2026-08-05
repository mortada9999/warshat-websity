'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './CoursesBannerSection.module.css';

// Ensure plugins are registered only on the client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const COURSES = [
  {
    id: 1,
    titleAr: 'كورس تعليم الرسم',
    titleEn: 'Fine Art Fundamentals',
    sessions: '8 Sessions',
    image: '/images/figma/pottery.png',
  },
  {
    id: 2,
    titleAr: 'تقنيات الفخار المتقدمة',
    titleEn: 'Advanced Pottery Techniques',
    sessions: '12 Sessions',
    image: '/images/figma/mirror.png',
  },
  {
    id: 3,
    titleAr: 'كورس الحياكة',
    titleEn: 'Textile Design',
    sessions: '6 Sessions',
    image: '/images/figma/tote-bag.png',
  },
];

export default function CoursesBannerSection() {
  const containerRef = useRef<HTMLSelectElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Select all cards
    const cards = gsap.utils.toArray('.gsap-course-card') as HTMLElement[];
    
    // Float up and fade in smoothly
    cards.forEach((card) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
      });
    });

    // Section Header Animation
    gsap.from('.gsap-header', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef as any}
      id="courses" 
      className="relative flex flex-col items-center justify-center w-full min-h-screen py-20 px-6 md:px-12 z-20 bg-[#F9F8F6] overflow-hidden"
      aria-label="الكورسات"
    >
      {/* Subtle Noise Overlay for paper texture */}
      <div className={styles.noiseOverlay} aria-hidden="true" />
      
      <div className="relative flex flex-col items-center w-full max-w-6xl z-10">
        
        {/* Section Header */}
        <div className="relative flex flex-col items-center justify-center w-full mb-16 md:mb-24 gsap-header">
          <h2 className="font-amiri font-bold text-4xl md:text-5xl text-[#374A00] text-center leading-[120%] mb-4">
            الكورسات
          </h2>
          {/* Subtle line separator */}
          <svg width="200" height="12" viewBox="0 0 234 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8C77.4833 13.3333 154.967 10.6667 232.45 0" stroke="#C5C8B6" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="font-ibm-plex text-[#597257] mt-6 text-center max-w-lg px-4 text-sm md:text-base">
            انغمس في عالم الفن والإبداع من خلال دوراتنا المتخصصة والمصممة لتطوير مهاراتك الفنية بأسلوب أكاديمي وعملي.
          </p>
        </div>

        {/* Scrapbook Staggered Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 w-full">
          {COURSES.map((course, index) => (
            <article 
              key={course.id} 
              // Staggering on desktop using margins/translates, keeping it vertical on mobile
              className={`gsap-course-card relative flex flex-col bg-white p-4 md:p-5 pb-8 md:pb-10 shadow-lg border border-[#E5E5DF] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl w-full max-w-[380px] mx-auto ${index === 1 ? 'lg:translate-y-12' : index === 2 ? 'lg:-translate-y-6' : ''}`}
            >
              {/* The Washi Tape */}
              <div 
                className={`absolute -top-4 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-white/30 backdrop-blur-[2px] border border-white/40 shadow-sm z-20 ${index % 2 === 0 ? 'rotate-3' : '-rotate-2'}`}
                style={{
                  backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 20%, transparent 60%, rgba(255,255,255,0.3) 100%)'
                }}
              />
              
              {/* Polaroid Image Frame */}
              <div className="relative w-full h-56 md:h-64 mb-6 overflow-hidden bg-gray-100">
                <Image
                  src={course.image}
                  alt={course.titleAr}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
              </div>

              {/* Course Info */}
              <div className="flex flex-col w-full text-right items-end px-2">
                
                {/* Title with Brush Stroke Accent */}
                <div className="relative inline-block mb-1">
                  {/* SVG Brush Stroke Background */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[140%] opacity-20 -z-10 pointer-events-none">
                    <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#C5C8B6]">
                      <path d="M10,30 C40,15 90,25 150,20 C180,15 190,30 185,45 C150,40 80,55 20,45 C5,40 0,35 10,30 Z" />
                    </svg>
                  </div>
                  <h3 className="font-amiri text-2xl md:text-3xl font-bold text-[#374A00] relative z-10">
                    {course.titleAr}
                  </h3>
                </div>
                
                <p className="font-ibm-plex text-xs md:text-sm text-[#597257] mb-5 tracking-wide">
                  {course.titleEn}
                </p>
                
                {/* Footer of the polaroid: Sessions & Button */}
                <div className="w-full border-t border-dashed border-[#E5E5DF] pt-4 mt-auto flex items-center justify-between flex-row-reverse">
                  <span className="font-ibm-plex font-bold text-sm text-[#A25F00]">{course.sessions}</span>
                  
                  {/* Standardized Book Button (Reusing system style) */}
                  <a href="#book" className="inline-block px-6 py-2 bg-[#4D6314] text-white font-ibm-plex font-semibold text-xs md:text-sm uppercase tracking-widest rounded shadow hover:bg-[#374A00] transition-colors">
                    Book Now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 md:mt-24">
          <a
            href="#"
            className="text-[#A25F00] font-ibm-plex font-bold text-sm uppercase tracking-widest hover:underline inline-flex items-center gap-2"
          >
            جميع الكورسات
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 7L7 13M12 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
