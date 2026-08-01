'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="الصفحة الرئيسية">

      {/* ── Background abstract blobs ── */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      {/* ── Central collage image ── */}
      <div className={styles.collageWrap} aria-hidden="true">
        <motion.div
          className={styles.collageFrame}
          initial={{ opacity: 0, rotate: -1, scale: 0.96 }}
          animate={{ opacity: 1, rotate: -1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/hero-craft.png"
            alt="مساحة ورشة فن الإبداعية في بغداد"
            fill
            className={styles.collageImage}
            priority
            sizes="(max-width: 768px) 80vw, 420px"
          />
        </motion.div>
      </div>

      {/* ── CTA Buttons ── */}
      <motion.div {...fadeUp(0.35)} className={styles.ctaRow}>
        <Link href="/about" className={styles.ctaBtn}>
          من نحن
        </Link>
        <a href="#activities" className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}>
          قيود فن
        </a>
      </motion.div>

      {/* ── Bottom location strip ── */}
      <motion.div {...fadeUp(0.5)} className={styles.locationStrip}>
        <div className={styles.locationItem}>
          <svg className={styles.pinIcon} viewBox="0 0 12 16" fill="none" aria-hidden="true">
            <path d="M6 0C2.69 0 0 2.69 0 6c0 4.5 6 10 6 10S12 10.5 12 6c0-3.31-2.69-6-6-6zm0 8.25A2.25 2.25 0 1 1 8.25 6 2.25 2.25 0 0 1 6 8.25z" fill="currentColor"/>
          </svg>
          <span>اليرموك، بغداد</span>
        </div>
        <span className={styles.locDot} aria-hidden="true" />
        <div className={styles.locationItem}>
          <svg className={styles.pinIcon} viewBox="0 0 12 16" fill="none" aria-hidden="true">
            <path d="M6 0C2.69 0 0 2.69 0 6c0 4.5 6 10 6 10S12 10.5 12 6c0-3.31-2.69-6-6-6zm0 8.25A2.25 2.25 0 1 1 8.25 6 2.25 2.25 0 0 1 6 8.25z" fill="currentColor"/>
          </svg>
          <span>زيونة، بغداد</span>
        </div>
      </motion.div>

    </section>
  );
}
