'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './CoursesBannerSection.module.css';

/* ─── Data ─────────────────────────────────────────────────────────────── */
const COURSES = [
  {
    id: 1,
    index: '٠١',
    titleAr: 'الرسم بالزيت',
    titleEn: 'oil painting',
    blurb: 'من أول طبقة لون حتى اللوحة المكتملة، على قماش حقيقي بأدوات احترافية.',
    sessions: '٨ جلسات',
    level: 'من الصفر',
    price: '١٢٥٠٠٠',
    image: '/images/workshop-oilpaint.png',
  },
  {
    id: 2,
    index: '٠٢',
    titleAr: 'الفخار على الدولاب',
    titleEn: 'wheel throwing',
    blurb: 'تعلّم مركزة الطين، سحب الجدران، والتشكيل النهائي والتزجيج.',
    sessions: '١٢ جلسة',
    level: 'متوسط',
    price: '١٨٠٠٠٠',
    image: '/images/workshop-clay.png',
  },
  {
    id: 3,
    index: '٠٣',
    titleAr: 'التطريز اليدوي',
    titleEn: 'hand embroidery',
    blurb: 'قطبة بقطبة — نبني معك مفردات التطريز وننهي عملاً مؤطراً.',
    sessions: '٦ جلسات',
    level: 'من الصفر',
    price: '٩٠٠٠٠',
    image: '/images/workshop-embroidery.png',
  },
  {
    id: 4,
    index: '٠٤',
    titleAr: 'الأكريليك على كانفاس',
    titleEn: 'acrylic on canvas',
    blurb: 'ألوان سريعة الجفاف، طبقات جسورة، وأسلوب شخصي تبنيه بنفسك.',
    sessions: '٦ جلسات',
    level: 'من الصفر',
    price: '٩٥٠٠٠',
    image: '/images/activity-canvas.png',
  },
];

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function CoursesBannerSection() {
  const [active, setActive] = useState(0);
  const current = COURSES[active];

  return (
    <section id="courses" aria-label="الكورسات" className={styles.section}>
      <div className={styles.inner} dir="rtl">

        {/* ── Header ── */}
        <header className={styles.header}>
          <div className={styles.headText}>
            <span className={styles.eyebrow}>برنامج مكثّف · دفعات محدودة</span>
            <h2 className={styles.heading}>الكورسات</h2>
          </div>
          <p className={styles.lede}>
            مسارات طويلة تبدأ من الأساسيات وتنتهي بعمل تحمله معك.
            كل كورس بمجموعة صغيرة ومدرّب واحد يلازمك حتى النهاية.
          </p>
        </header>

        {/* ── Gallery: index (right) + exhibit (left) ── */}
        <div className={styles.gallery}>

          {/* ── Course index ── */}
          <ol className={styles.index}>
            {COURSES.map((course, i) => {
              const isActive = i === active;
              return (
                <li key={course.id} className={styles.indexItem}>
                  <button
                    type="button"
                    className={`${styles.row} ${isActive ? styles.rowActive : ''}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className={styles.rowNum}>{course.index}</span>

                    <span className={styles.rowMain}>
                      <span className={styles.rowTitle}>{course.titleAr}</span>
                      <span className={styles.rowMeta}>
                        {course.sessions}
                        <span className={styles.dot} aria-hidden="true" />
                        {course.level}
                      </span>
                    </span>

                    <span className={styles.rowPrice}>
                      {course.price}
                      <span className={styles.currency}>د.ع</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* ── Exhibit panel ── */}
          <div className={styles.exhibit}>
            <div className={styles.frame}>
              {COURSES.map((course, i) => (
                <div
                  key={course.id}
                  className={`${styles.plate} ${i === active ? styles.plateActive : ''}`}
                  aria-hidden={i !== active}
                >
                  <Image
                    src={course.image}
                    alt={course.titleAr}
                    fill
                    className={styles.plateImg}
                    sizes="(max-width: 1024px) 92vw, 42vw"
                  />
                </div>
              ))}
            </div>

            {/* Caption + CTA for the active course */}
            <div className={styles.caption} key={current.id}>
              <span className={styles.captionEn}>{current.titleEn}</span>
              <p className={styles.captionBlurb}>{current.blurb}</p>
              <a href="#book" className={styles.bookBtn}>
                احجز مقعدك
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M12 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
