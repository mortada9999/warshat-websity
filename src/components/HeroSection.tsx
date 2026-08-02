'use client';

import React from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.section} aria-label="الصفحة الرئيسية">
      <div className={styles.inner}>
        {/* Background decorative shapes */}
        <div className={styles.abstractShape} aria-hidden="true" />
        <div className={styles.blurShape} aria-hidden="true" />

        {/* Central hand image */}
        <div className={styles.heroImageWrap}>
          <Image
            src="/images/figma/hero-hand.png"
            alt="يد تمسك ورقة فنية — ورشة فن"
            width={512}
            height={684}
            className={styles.heroImage}
            priority
          />
        </div>

        {/* Bottom buttons */}
        <div className={styles.buttonsRow}>
          <a href="#about" className={styles.cardBtn}>
            <span className={styles.cardBtnAr}>من نحن</span>
            <span className={styles.cardBtnEn}>About Us</span>
          </a>
          <a href="#cafe" className={styles.cardBtn}>
            <span className={styles.cardBtnAr}>قهوة فن</span>
            <span className={styles.cardBtnEn}>Art Caffe</span>
          </a>
        </div>
      </div>
    </section>
  );
}
