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
    
    // Float up and fade in as they scroll into view
    cards.forEach((card) => {
      gsap.from(card, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Section Header Animation
    gsap.from('.gsap-header', {
      y: 50,
      opacity: 0,
      duration: 1,
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
      className={styles.section}
      aria-label="الكورسات"
    >
      {/* Subtle Noise Overlay for paper texture */}
      <div className={styles.noiseOverlay} aria-hidden="true" />
      
      {/* Section Header with SVG Brush Stroke */}
      <div className="relative flex flex-col items-center justify-center w-full mb-16 md:mb-24 z-20 gsap-header">
        
        {/* Decorative SVG Brush Stroke behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[80px] opacity-20 pointer-events-none -z-10">
           <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#A25F00]">
             <path d="M10,30 C30,10 80,20 120,25 C160,30 190,15 190,30 C190,45 160,50 120,45 C80,40 30,50 10,30 Z" />
           </svg>
        </div>

        <h2 className="font-amiri font-bold text-4xl md:text-6xl text-[#374A00] text-center leading-[120%]">
          الكورسات
        </h2>
        <p className="font-ibm-plex text-[#597257] mt-4 text-center max-w-md px-6">
          انغمس في عالم الفن والإبداع من خلال دوراتنا المتخصصة والمصممة لتطوير مهاراتك الفنية.
        </p>
      </div>

      {/* Courses Gallery */}
      <div className={styles.galleryContainer}>
        {COURSES.map((course) => (
          <article 
            key={course.id} 
            className={`${styles.blobCard} gsap-course-card group`}
          >
            {/* The Background Image */}
            <Image
              src={course.image}
              alt={course.titleAr}
              fill
              className={styles.blobImage}
              sizes="(max-width: 768px) 100vw, 380px"
            />
            
            {/* The Hover Content Reveal */}
            <div className={styles.contentOverlay}>
              <h3 className={`font-amiri text-3xl font-bold text-white mb-1 ${styles.contentTitle}`}>
                {course.titleAr}
              </h3>
              <p className={`font-ibm-plex text-sm text-white/80 mb-2 ${styles.contentTitle}`}>
                {course.titleEn}
              </p>
              
              <div className={`flex items-center gap-2 mb-4 ${styles.contentSessions}`}>
                <span className="w-2 h-2 rounded-full bg-[#D9B053]" />
                <span className="font-ibm-plex font-medium text-sm text-[#F8F5F0]">
                  {course.sessions}
                </span>
              </div>
              
              <a href="#book" className={styles.bookButton}>
                Book Now
              </a>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
