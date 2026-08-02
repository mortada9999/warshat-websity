'use client';

import React from 'react';
import Image from 'next/image';
import styles from './RecreationalSection.module.css';

const ACTIVITIES = [
  { title: 'الرسم على الأكواب الفخارية', price: '10,000', image: '/images/figma/pottery.png' },
  { title: 'الرسم على الحقائب القماشية', price: '15,000', image: '/images/figma/tote-bag.png' },
  { title: 'الرسم على المرايا',         price: '15,000', image: '/images/figma/mirror.png' },
  { title: 'صناعة الاكسسوارات',         price: '15,000', image: '/images/figma/pottery.png' },
  { title: 'الرسم على القطع الخشبية',   price: '10,000', image: '/images/figma/tote-bag.png' },
  { title: 'الرسم على اللوحات',         price: '15,000', image: '/images/figma/mirror.png' },
  { title: 'الرسم على الزجاج',          price: '20,000', image: '/images/figma/pottery.png' },
  { title: 'الرسم و الزراعة',           price: '15,000', image: '/images/figma/tote-bag.png' },
];

export default function RecreationalSection() {
  return (
    <section id="entertainment" className={styles.section} aria-label="النشاطات الترفيهية">
      <div className={styles.inner}>
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headingWrap}>
            <h2 className={styles.heading}>النشاطات الترفيهية المفتوحة</h2>
            <div className={styles.headingLine} aria-hidden="true" />
          </div>
          <a href="#" className={styles.viewAll}>View All</a>
        </div>

        {/* Activities grid */}
        <div className={styles.grid}>
          {ACTIVITIES.map((act, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardImageWrap}>
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{act.title}</h3>
                <span className={styles.cardPrice}>{act.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
