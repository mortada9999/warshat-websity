'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="الصفحة الرئيسية">

      {/* ── Content column ── */}
      <div className={styles.content}>

        <motion.p
          {...fadeUp(0.15)}
          className={styles.eyebrow}
          aria-hidden="true"
        >
          بغداد — اليرموك · الزيونة
        </motion.p>

        <motion.h1 {...fadeUp(0.25)} className={styles.heading}>
          المكان المثالي
          <br />
          <em className={styles.accentLine}>للترفيه</em>
          {' '}عن طريق الفن
        </motion.h1>

        <motion.p {...fadeUp(0.38)} className={styles.subtitle}>
          ورش تدريبية، نشاطات ترفيهية، ودورات متخصصة — لكل من يحب أن يصنع شيئاً بيديه.
        </motion.p>

        <motion.div {...fadeUp(0.48)} className={styles.ctas}>
          <a href="#activities" className={`btn btn-primary ${styles.ctaPrimary}`}>
            اكتشف النشاطات
          </a>
          <Link href="/loyalty" className={`btn btn-ghost ${styles.ctaSecondary}`}>
            بطاقة الولاء
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.58)} className={styles.metaRow}>
          <div className={styles.metaItem}>
            <svg className={styles.pinSvg} viewBox="0 0 12 16" fill="none" aria-hidden="true">
              <path
                d="M6 0C2.69 0 0 2.69 0 6c0 4.5 6 10 6 10S12 10.5 12 6c0-3.31-2.69-6-6-6zm0 8.25A2.25 2.25 0 1 1 8.25 6 2.25 2.25 0 0 1 6 8.25z"
                fill="currentColor"
              />
            </svg>
            <span>اليرموك، بغداد</span>
          </div>
          <span className={styles.metaDot} aria-hidden="true" />
          <div className={styles.metaItem}>
            <svg className={styles.pinSvg} viewBox="0 0 12 16" fill="none" aria-hidden="true">
              <path
                d="M6 0C2.69 0 0 2.69 0 6c0 4.5 6 10 6 10S12 10.5 12 6c0-3.31-2.69-6-6-6zm0 8.25A2.25 2.25 0 1 1 8.25 6 2.25 2.25 0 0 1 6 8.25z"
                fill="currentColor"
              />
            </svg>
            <span>زيونة، بغداد</span>
          </div>
        </motion.div>
      </div>

      {/* ── Image column ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className={styles.imageWrap}
        aria-hidden="true"
      >
        <Image
          src="/images/hero-craft.png"
          alt="مساحة ورشة فن الإبداعية في بغداد"
          fill
          className={styles.heroImage}
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
        />

        {/* Caption badge */}
        <div className={styles.imageBadge}>
          <span className={styles.imageBadgeTitle}>ورشة فن</span>
          <span className={styles.imageBadgeSub}>مساحة الإبداع · بغداد ٢٠٢٥</span>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollHint} aria-hidden="true">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className={styles.scrollDot}
          />
        </div>
      </motion.div>

    </section>
  );
}
