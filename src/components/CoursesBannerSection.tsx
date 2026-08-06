'use client';

import React from 'react';
import Image from 'next/image';
import styles from './CoursesBannerSection.module.css';

type CoursePattern = 'crochet' | 'music' | 'blueprint';

const COURSES: {
  id: number;
  titleAr: string;
  titleEn: string;
  sessions: string;
  image: string;
  pattern: CoursePattern;
}[] = [
  {
    id: 1,
    titleAr: 'كورس تعليم الرسم',
    titleEn: 'Fine Art Fundamentals',
    sessions: '8 جلسات',
    image: '/images/figma/pottery.png',
    pattern: 'blueprint',
  },
  {
    id: 2,
    titleAr: 'تقنيات الفخار المتقدمة',
    titleEn: 'Advanced Pottery Techniques',
    sessions: '12 جلسة',
    image: '/images/figma/mirror.png',
    pattern: 'music',
  },
  {
    id: 3,
    titleAr: 'كورس الحياكة',
    titleEn: 'Textile Design',
    sessions: '6 جلسات',
    image: '/images/figma/tote-bag.png',
    pattern: 'crochet',
  },
];

const PATTERN_CLASSES: Record<CoursePattern, string> = {
  crochet:   styles.patternCrochet,
  music:     styles.patternMusic,
  blueprint: styles.patternBlueprint,
};

export default function CoursesBannerSection() {
  return (
    <section 
      id="courses" 
      className="relative flex flex-col items-center justify-center w-full min-h-screen pb-[60vh] py-16 px-4 md:px-8 z-20"
      style={{
        backgroundColor: '#FDFBF7',
        backgroundImage: 'linear-gradient(90deg, transparent 48px, rgba(210, 90, 90, 0.4) 48px, rgba(210, 90, 90, 0.4) 49px, transparent 49px), linear-gradient(0deg, transparent, transparent 39px, #C5D0E8 39px, #C5D0E8 40px)',
        backgroundSize: '100% 40px',
        backgroundRepeat: 'repeat'
      }}
      aria-label="الكورسات"
    >
      <div className="relative flex flex-col items-center w-full max-w-6xl z-10 bg-transparent">
        
        {/* Section Header */}
        <div className="relative flex flex-col items-center justify-center w-full mb-16 md:mb-24 gsap-header bg-transparent">
          <h2 className="font-amiri font-bold text-4xl md:text-5xl text-[#374A00] text-center leading-[120%] mb-3">
            الكورسات
          </h2>
          <svg width="160" height="10" viewBox="0 0 234 16" fill="none" className={styles.headingLine}>
            <path d="M0 8C77.4833 13.3333 154.967 10.6667 232.45 0" stroke="#C5C8B6" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="font-ibm-plex text-[#597257] mt-5 text-center max-w-md px-4 text-sm md:text-base leading-relaxed">
            انغمس في عالم الفن والإبداع من خلال دوراتنا المتخصصة والمصممة لتطوير مهاراتك الفنية بأسلوب أكاديمي وعملي.
          </p>
        </div>

        {/* ── Vertical Card Stack ── */}
        <div className={styles.cardStack}>
          {COURSES.map((course) => (
            <article key={course.id} className={styles.card}>
              
              {/* Pattern background layer */}
              <div className={`${styles.patternLayer} ${PATTERN_CLASSES[course.pattern]}`} aria-hidden="true" />

              {/* Card content */}
              <div className={styles.cardInner}>
                
                {/* Image */}
                <div className={styles.cardImageWrap}>
                  <Image
                    src={course.image}
                    alt={course.titleAr}
                    fill
                    className={styles.cardImage}
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                </div>

                {/* Text — solid bg for readability over pattern */}
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{course.titleAr}</h3>
                  <p className={styles.cardEn}>{course.titleEn}</p>
                  <p className={styles.cardSessions}>{course.sessions}</p>
                  <a href="#book" className={styles.bookBtn}>Book Now</a>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* ── View All CTA ── */}
        <div className="mt-12 md:mt-16">
          <a href="#" className={styles.viewAllLink}>
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
