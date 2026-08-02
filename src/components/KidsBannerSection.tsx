'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './KidsBannerSection.module.css';

export default function KidsBannerSection() {
  return (
    <section id="kids" className={styles.section} aria-label="ورش الأطفال">
      {/* Decorative playful elements */}
      <div className={styles.decoStar} aria-hidden="true" />
      <div className={styles.decoCircle} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Heading */}
        <div className={styles.headingWrap}>
          <h2 className={styles.heading}>ورش و اشتراكات الأطفال</h2>
          <div className={styles.headingLine} aria-hidden="true" />
        </div>

        {/* Content area: cloud image + text */}
        <div className={styles.contentGrid}>
          {/* Cloud image with kid photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={styles.cloudWrap}
          >
            <Image
              src="/images/figma/kids-cloud.png"
              alt="ورش فنية للأطفال"
              width={908}
              height={684}
              className={styles.cloudImage}
            />

            {/* Text overlay on cloud */}
            <div className={styles.cloudOverlay}>
              <h3 className={styles.cloudTitle}>عالم من الإبداع للصغار</h3>
              <p className={styles.cloudDesc}>
                نقدم ورش عمل فنية ممتعة ومحفزة لخيال الأطفال، حيث يكتشفون مواهبهم
                في بيئة مليئة بالألوان والمرح.
              </p>
              <button className={styles.bookBtn}>Book Now</button>
            </div>

            {/* Circular kid photo */}
            <div className={styles.kidPhotoCircle}>
              <Image
                src="/images/figma/image1.png"
                alt="طفل يرسم"
                width={214}
                height={214}
                className={styles.kidPhoto}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative icon (cruelty_free) */}
      <div className={styles.bottomIcon} aria-hidden="true">
        <span className={styles.materialIcon}>🕊️</span>
      </div>
    </section>
  );
}
