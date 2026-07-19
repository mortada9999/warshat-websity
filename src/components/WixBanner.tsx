'use client';

import React from 'react';
import Link from 'next/link';
import styles from './WixBanner.module.css';

interface WixBannerProps {
  titleAr: string;
  titleEn: string;
  href: string;
  panelBg: string;
  imageUrl?: string | null;
  imageFirst?: boolean;
  lang: 'ar' | 'en';
  blobColor?: string;
}

export default function WixBanner({
  titleAr, titleEn, href, panelBg, imageUrl, imageFirst = true, lang, blobColor = 'var(--olive-light)'
}: WixBannerProps) {
  const title = lang === 'ar' ? titleAr : titleEn;

  return (
    <article className={`${styles.banner} ${imageFirst ? styles.imgLeft : styles.imgRight}`}>
      
      {/* Image pane */}
      <div className={styles.imagePane}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>

      {/* Text pane */}
      <div className={styles.textPane} style={{ backgroundColor: panelBg }}>
        {/* Decorative blobs */}
        <div className={styles.blob1} style={{ backgroundColor: blobColor }} />
        <div className={styles.blob2} style={{ backgroundColor: blobColor }} />

        <div className={styles.textInner}>
          <h2 className={styles.title}>{title}</h2>
          <div>
            <Link href={href} className={styles.button}>
              {lang === 'ar' ? 'المزيد' : 'More'}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
