'use client';

import React from 'react';
import Image from 'next/image';
import styles from './CoursesBannerSection.module.css';

/* ─── Data ─────────────────────────────────────────────────────────────── */
const COURSES = [
  {
    id: 1,
    titleAr: 'كورس تعليم الرسم',
    sessions: '٨ جلسات',
    image: '/images/activity-canvas.png',
    rotate: '-3deg',
    paletteColor: '#a25f00',
  },
  {
    id: 2,
    titleAr: 'تقنيات الفخار المتقدمة',
    sessions: '١٢ جلسة',
    image: '/images/activity-pottery.png',
    rotate: '2deg',
    paletteColor: '#597257',
  },
  {
    id: 3,
    titleAr: 'كورس الحياكة والخياطة',
    sessions: '٦ جلسات',
    image: '/images/activity-totebag.png',
    rotate: '-1.5deg',
    paletteColor: '#374a00',
  },
];

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function CoursesBannerSection() {
  return (
    <section id="courses" aria-label="الكورسات" className={styles.section}>

      {/* ── Canvas paper texture layer ── */}
      <div className={styles.canvasTexture} aria-hidden="true" />

      {/* ── Paint smear bg blobs ── */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.blob3} aria-hidden="true" />

      {/* ── Brush strokes decoration ── */}
      <img
        src="/textures/brush-strokes.png"
        alt=""
        aria-hidden="true"
        className={styles.brushDeco}
      />

      {/* ── Content ── */}
      <div className={styles.inner} dir="rtl">

        {/* ── Heading ── */}
        <header className={styles.headingArea}>
          {/* Handwritten-style title on torn paper label */}
          <div className={styles.titleLabel}>
            <h2 className={styles.heading}>الكورسات</h2>
            {/* Hand-drawn underline */}
            <svg viewBox="0 0 220 14" fill="none" aria-hidden="true" className={styles.underlineSvg}>
              <path
                d="M6 10 C50 2, 110 14, 160 7 S200 4, 215 9"
                stroke="#a25f00"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <p className={styles.subHeading}>دورات متخصصة تغطي مختلف المهارات الفنية</p>
        </header>

        {/* ── Easel cards row ── */}
        <div className={styles.easelRow}>
          {COURSES.map((course) => (
            <article
              key={course.id}
              className={styles.easel}
              style={{ '--rotate': course.rotate, '--palette': course.paletteColor } as React.CSSProperties}
            >
              {/* ── Canvas frame ── */}
              <div className={styles.canvasFrame}>
                {/* Inner canvas — the painting surface */}
                <div className={styles.canvas}>
                  <Image
                    src={course.image}
                    alt={course.titleAr}
                    fill
                    className={styles.canvasImg}
                    sizes="(max-width: 768px) 80vw, 30vw"
                  />
                  {/* Color smear overlay at bottom */}
                  <div className={styles.canvasOverlay} />
                </div>
                {/* Frame border — thick painted wood look */}
                <div className={styles.frameBorder} />
              </div>

              {/* ── Easel legs ── */}
              <div className={styles.easelLegs} aria-hidden="true">
                <div className={styles.legLeft} />
                <div className={styles.legRight} />
                <div className={styles.legCross} />
              </div>

              {/* ── Info card below canvas ── */}
              <div className={styles.infoCard}>
                {/* Color palette dot */}
                <span className={styles.paletteDot} style={{ background: course.paletteColor }} />
                <h3 className={styles.cardTitle}>{course.titleAr}</h3>
                <p className={styles.cardSessions}>{course.sessions}</p>
                <a href="#book" className={styles.bookBtn}>احجز الآن</a>
              </div>
            </article>
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <footer className={styles.footerCta}>
          <a href="#" className={styles.allCoursesLink}>
            عرض جميع الكورسات
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1L13 7L7 13M12 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </footer>

      </div>
    </section>
  );
}
