'use client';

import React from 'react';
import Link from 'next/link';
import type { Workshop } from '@/lib/types';
import styles from './WixTrainingCard.module.css';
import { useLanguage } from './LanguageProvider';

interface WixTrainingCardProps {
  workshop: Workshop;
}

export default function WixTrainingCard({ workshop }: WixTrainingCardProps) {
  const { lang } = useLanguage();

  const title = lang === 'ar' ? workshop.title_ar : workshop.title_en;
  const description = lang === 'ar' ? workshop.description_ar : workshop.description_en;

  return (
    <>
      <div className={styles.cardWrapper} style={{ position: 'relative' }}>
        <div className={styles.card}>
          <div className={styles.imageWrap}>
            {workshop.image_url ? (
              <img src={workshop.image_url} alt={title} className={styles.image} loading="lazy" />
            ) : (
              <div className={styles.placeholder} />
            )}
          </div>
          
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            
            {description && (
              <p className={styles.desc}>
                {description}
              </p>
            )}

            <Link href={`/workshops/${workshop.id}`} className={styles.bookBtn}>
              Book Now
            </Link>
          </div>
        </div>
        {/* Decorative triangle hanging from bottom */}
        <div className={styles.triangle} />
      </div>

    </>
  );
}
