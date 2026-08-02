'use client';

import React from 'react';
import Image from 'next/image';
import styles from './TrainingSection.module.css';

const WORKSHOPS = [
  {
    id: 1,
    titleAr: 'ورشة الفخار',
    titleEn: '',
    subtitle: 'استكشف مهارات تشكيل الطين وتحويله إلى قطع فنية تنبض بالحياة',
    desc: 'سواء كنتم مبتدئين أو تمتلكون خبرة سابقة، ستجدون في قسم الخزف فرصة للتعبير عن أنفسكم وابتكار أعمال فنية فريدة تحمل لمستكم الخاصة.',
    image: '/images/figma/pottery.png',
    bgClass: 'cardAlt',
    font: 'ar',
  },
  {
    id: 2,
    titleAr: '',
    titleEn: 'lino cut printing',
    subtitle: '',
    desc: '',
    image: '/images/figma/mirror.png',
    bgClass: 'cardWarm',
    font: 'en',
  },
  {
    id: 3,
    titleAr: '',
    titleEn: 'needle felting',
    subtitle: '',
    desc: '',
    image: '/images/figma/tote-bag.png',
    bgClass: 'cardAlt',
    font: 'en',
  },
];

export default function TrainingSection() {
  return (
    <section id="training" className={styles.section} aria-label="الورش التدريبية">
      {/* Top decorative wave */}
      <div className={styles.topWave} aria-hidden="true">
        <svg viewBox="0 0 1280 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 48V0c213 32 427 48 640 32S1067 0 1280 0v48H0z" fill="var(--fg-bg-main)" />
        </svg>
      </div>

      <div className={styles.inner}>
        {/* Section heading */}
        <div className={styles.headingWrap}>
          <h2 className={styles.heading}>الورش التدريبية</h2>
          <div className={styles.headingLine} aria-hidden="true" />
        </div>

        {/* Workshop cards */}
        <div className={styles.workshopList}>
          {WORKSHOPS.map((w) => (
            <article
              key={w.id}
              className={`${styles.workshopCard} ${styles[w.bgClass]}`}
            >
              {/* Image side */}
              <div className={styles.workshopImageWrap}>
                <div className={styles.workshopImageFrame}>
                  <Image
                    src={w.image}
                    alt={w.titleAr || w.titleEn}
                    fill
                    className={styles.workshopImage}
                    sizes="(max-width: 768px) 100vw, 525px"
                  />
                </div>
                {/* Decorative tape */}
                <div className={styles.tape} aria-hidden="true" />
              </div>

              {/* Content side */}
              <div className={styles.workshopContent}>
                {w.font === 'ar' ? (
                  <h3 className={styles.workshopTitleAr}>{w.titleAr}</h3>
                ) : (
                  <h3 className={styles.workshopTitleEn}>{w.titleEn}</h3>
                )}
                {w.subtitle && (
                  <p className={styles.workshopSubtitle}>{w.subtitle}</p>
                )}
                {w.desc && (
                  <p className={styles.workshopDesc}>{w.desc}</p>
                )}
                <button className={styles.bookBtn}>Book Now</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
