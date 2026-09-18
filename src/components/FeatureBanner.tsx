'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './FeatureBanner.module.css';

interface FeatureBannerProps {
  /** Arabic title */
  titleAr: string;
  /** Arabic subtitle/description */
  subtitleAr: string;
  /** English title */
  titleEn: string;
  /** Link target */
  href: string;
  /** Background color for the text panel */
  panelBg: string;
  /** Image from workshops data (URL or null) */
  imageUrl?: string | null;
  /** If true: image LEFT, text RIGHT. If false: text LEFT, image RIGHT (RTL aware) */
  imageFirst?: boolean;
  /** Current language */
  lang: 'ar' | 'en';
  /** CTA button label */
  ctaAr?: string;
  ctaEn?: string;
}

export default function FeatureBanner({
  titleAr, subtitleAr, titleEn, href,
  panelBg, imageUrl, imageFirst = true,
  lang, ctaAr = 'المزيد', ctaEn = 'Explore',
}: FeatureBannerProps) {
  const title    = lang === 'ar' ? titleAr    : titleEn;
  const subtitle = lang === 'ar' ? subtitleAr : '';
  const cta      = lang === 'ar' ? ctaAr      : ctaEn;

  const imagePane = (
    <motion.div
      className={styles.imagePane}
      initial={{ opacity: 0, x: imageFirst ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '50px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={title} className={styles.image} loading="lazy" />
      ) : (
        <div className={styles.imagePlaceholder} style={{ background: panelBg }} />
      )}
    </motion.div>
  );

  const textPane = (
    <motion.div
      className={styles.textPane}
      style={{ background: panelBg }}
      initial={{ opacity: 0, x: imageFirst ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '50px' }}
      transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
    >
      <div className={styles.textInner}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: '50px' }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: '50px' }}
            transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: '50px' }}
          transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
        >
          <Link href={href} className={styles.cta}>
            {cta}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <article className={`${styles.banner} ${imageFirst ? styles.imageLeft : styles.imageRight}`}>
      {imageFirst ? (
        <>
          {imagePane}
          {textPane}
        </>
      ) : (
        <>
          {textPane}
          {imagePane}
        </>
      )}
    </article>
  );
}
