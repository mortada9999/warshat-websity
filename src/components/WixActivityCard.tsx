'use client';

import React from 'react';
import Link from 'next/link';
import type { Workshop } from '@/lib/types';
import styles from './WixActivityCard.module.css';
import { useLanguage } from './LanguageProvider';

interface WixActivityCardProps {
  workshop: Workshop;
}

export default function WixActivityCard({ workshop }: WixActivityCardProps) {
  const { lang } = useLanguage();

  const title = lang === 'ar' ? workshop.title_ar : workshop.title_en;

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Link href={`/workshops/${workshop.id}`} className={styles.card}>
          <div className={styles.circleWrap}>
            {workshop.image_url ? (
              <img src={workshop.image_url} alt={title} className={styles.image} loading="lazy" />
            ) : (
              <div className={styles.placeholder} />
            )}
          </div>

          <h3 className={styles.title}>{title}</h3>

          {workshop.price != null && workshop.price > 0 && (
            <div className={styles.priceWrap}>
              {/* Orange brush stroke effect using CSS border-radius */}
              <span className={styles.price}>
                {workshop.price.toLocaleString()}
              </span>
            </div>
          )}
        </Link>
      </div>


    </>
  );
}

const adminBtnStyle = {
  background: '#fff',
  border: '1px solid #ddd',
  padding: '6px 8px',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '12px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};
