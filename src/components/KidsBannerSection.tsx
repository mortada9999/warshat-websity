'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import AnimatedUnderline from './AnimatedUnderline';
import { HiddenWorkshopsMenu } from './HiddenWorkshopsMenu';
import styles from './KidsBannerSection.module.css';

export default function KidsBannerSection() {
  const { t } = useLanguage();

  return (
    <section
      id="kids"
      className={styles.section}
      aria-label={t('ورش الأطفال', 'Kids workshops')}
    >
      <HiddenWorkshopsMenu category="kids_course" />
      <HiddenWorkshopsMenu category="kids_workshop" />

      <div className={styles.inner}>

        {/* Label */}
        <p className={styles.label}>
          {t('ورشة فن — قسم الأطفال', 'WARSHAT FAN — KIDS DEPT')}
        </p>

        {/* Heading + underline */}
        <div className={styles.headingWrap}>
          <h2 className={styles.heading}>
            {t('ورش', 'Workshops')}{' '}
            <span className={styles.hl}>{t('واشتراكات', '& Courses')}</span>
            <br />
            {t('الأطفال', 'for Kids')}
          </h2>
          <AnimatedUnderline variant={2} strokeColor="#374A00" className="mt-2 translate-y-1" />
        </div>

        {/* Sub */}
        <p className={styles.sub}>
          {t(
            'مكان آمن وممتع يكتشف فيه طفلك موهبته الفنية مع مدربين متخصصين.',
            'A safe and fun place where your child discovers their artistic talent.',
          )}
        </p>

        {/* Stats */}
        <div className={styles.statsRow}>
          {[
            { nAr: '+٢٠٠', nEn: '200+', lAr: 'طفل مسجّل',   lEn: 'Kids Enrolled' },
            { nAr: '٣',    nEn: '3',    lAr: 'ورش أسبوعية', lEn: 'Workshops' },
            { nAr: '٤',    nEn: '4',    lAr: 'كورسات',      lEn: 'Courses' },
          ].map((s, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statNum}>{t(s.nAr, s.nEn)}</span>
              <span className={styles.statLabel}>{t(s.lAr, s.lEn)}</span>
            </div>
          ))}
        </div>

        {/* CTA → /kids */}
        <Link href="/kids" className={styles.btn}>
          {t('استعرض الورش والكورسات', 'Browse Workshops & Courses')}
          <span>←</span>
        </Link>

      </div>
    </section>
  );
}
