'use client';

import React from 'react';
import styles from './CoursesBannerSection.module.css';

const COURSES = [
  {
    id: 1,
    titleAr: 'كورس تعليم الرسم',
    titleEn: 'Fine Art Fundamentals',
    sessions: '8 Sessions',
  },
  {
    id: 2,
    titleAr: 'تقنيات الفخار المتقدمة',
    titleEn: 'Advanced Pottery Techniques',
    sessions: '12 Sessions',
  },
  {
    id: 3,
    titleAr: 'كورس الحياكة',
    titleEn: 'Textile Design',
    sessions: '6 Sessions',
  },
];

export default function CoursesBannerSection() {
  return (
    <section id="courses" className={styles.section} aria-label="الكورسات">
      {/* Background image layer */}
      <div className={styles.bgImage} aria-hidden="true" />

      {/* Glassmorphism overlay (Figma: white 80% + blur + border #c5c8b6 + r:12) */}
      <div className={styles.overlay}>
        <div className={styles.inner}>
          {/* Section heading */}
          <div className={styles.headingWrap}>
            <h2 className={styles.heading}>الكورسات</h2>
            <div className={styles.headingLine} aria-hidden="true" />
          </div>

          {/* Courses list */}
          <div className={styles.coursesList}>
            {COURSES.map((course) => (
              <article key={course.id} className={styles.courseCard}>
                {/* Image placeholder */}
                <div className={styles.courseImageWrap}>
                  <div className={styles.courseImagePlaceholder} />
                </div>

                {/* Course info */}
                <div className={styles.courseContent}>
                  <h3 className={styles.courseTitleAr}>{course.titleAr}</h3>
                  <p className={styles.courseTitleEn}>{course.titleEn}</p>
                  <span className={styles.courseSessions}>{course.sessions}</span>
                  <button className={styles.bookBtn}>Book Now</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
