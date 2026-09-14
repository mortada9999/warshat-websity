'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from './LanguageProvider';
import { useAdmin } from './AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import { AdminCardOverlay, AdminAddButton, InactiveOverlay } from './AdminOverlay';
import { HiddenWorkshopsMenu } from './HiddenWorkshopsMenu';
import AnimatedUnderline from './AnimatedUnderline';
import styles from './CoursesBannerSection.module.css';

type CoursePattern = 'crochet' | 'music' | 'blueprint';

const PATTERN_CLASSES: Record<CoursePattern, string> = {
  crochet:   styles.patternCrochet,
  music:     styles.patternMusic,
  blueprint: styles.patternBlueprint,
};

export default function CoursesBannerSection() {
  const { t } = useLanguage();
  const { isAdmin } = useAdmin();
  const { getByCategory } = useWorkshopStore();

  const courses = getByCategory('course', false);

  return (
    <section 
      id="courses" 
      className="relative flex flex-col items-center justify-start w-full min-h-screen pt-2 pb-16 px-4 md:px-8 z-20"
      aria-label={t('الكورسات', 'Courses')}
    >
      <HiddenWorkshopsMenu category="course" />
      <div className="relative flex flex-col items-center w-full max-w-6xl z-10 bg-transparent">
        
        {/* Section Header */}
        <div className="relative flex flex-col items-center justify-center w-full -mt-12 md:-mt-16 gsap-header bg-transparent z-30">
          <div className="w-fit mx-auto flex flex-col items-center">
            <h2 className="font-amiri font-bold text-4xl md:text-5xl text-[#374A00] text-center leading-loose">
              {t('الكورسات', 'Courses')}
            </h2>
            <AnimatedUnderline variant={1} strokeColor="#374A00" className="mt-2 translate-y-3" />
          </div>
        </div>

        {/* ── Vertical Card Stack ── */}
        <div className={styles.cardStack}>
          {courses.map((course) => {
            const pattern = (course.pattern || 'blueprint') as CoursePattern;
            return (
              <article key={course.id} className={styles.card}>
                
                {/* Admin Controls */}
                <AdminCardOverlay workshop={course} />
                <InactiveOverlay workshop={course} />

                {/* Pattern background layer */}
                <div className={`${styles.patternLayer} ${PATTERN_CLASSES[pattern] || PATTERN_CLASSES.blueprint}`} aria-hidden="true" />

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
                    <h3 className={styles.cardTitle}>{t(course.titleAr, course.titleEn)}</h3>
                    <p className={styles.cardEn}>{t(course.titleEn, course.titleAr)}</p>
                    <p className={styles.cardSessions}>{t(course.sessionsAr || '', course.sessionsEn || '')}</p>
                    <a href="#book" className={styles.bookBtn}>{t('احجز الآن', 'Book Now')}</a>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Admin Add Button */}
        {isAdmin && (
          <div className="w-full max-w-4xl mt-8">
            <AdminAddButton category="course" />
          </div>
        )}

        {/* ── View All CTA ── */}
        <div className="mt-12 md:mt-16">
          <a href="#" className={styles.viewAllLink}>
            {t('جميع الكورسات', 'View All Courses')}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 7L7 13M12 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
