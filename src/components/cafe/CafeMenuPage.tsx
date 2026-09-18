'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CafeMenuPage.module.css';

const MENU_IMAGES = [
  '/cafe/0c640f_127463e10eaf424f979ae7061274fd2d~mv2.jpg',
  '/cafe/0c640f_3341dbef4a5341dd98fffd16857f82ff~mv2.jpg',
  '/cafe/0c640f_383352c4f5074869bfa338d8859b2c7f~mv2.jpg',
  '/cafe/0c640f_4a1428f8cd76456ab105391127061a70~mv2.jpg',
  '/cafe/0c640f_afe872187c324f05afe10828f64ddb37~mv2.jpg',
  '/cafe/0c640f_ddf2b39bed3543c683c6a5edb6d5af35~mv2.jpg',
];

export default function CafeMenuPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <main className={styles.page} dir="rtl">

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.label}>قهوة فن</p>
          <h1 className={styles.heading}>
            المنيو
          </h1>
          <p className={styles.sub}>
            مشروبات وأطعمة بلمسة فنية بغداديّة — اختر ما يُلهمك
          </p>
          <Link href="/" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            العودة للرئيسية
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section className={styles.gallery}>
        {MENU_IMAGES.map((src, i) => (
          <div
            key={i}
            className={styles.card}
            onClick={() => setLightbox(src)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setLightbox(src)}
            aria-label={`صفحة المنيو ${i + 1}`}
          >
            <div className={styles.imgWrapper}>
              <Image
                src={src}
                alt={`منيو قهوة فن — صفحة ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.img}
              />
              <div className={styles.overlay}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
            </div>
            <p className={styles.cardLabel}>صفحة {i + 1}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <p className={styles.ctaText}>
          هل أعجبك المنيو؟ تواصل معنا على واتساب وسنساعدك في اختيار ما يناسبك
        </p>
        <a
          href="https://wa.me/9647705874761"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12.003 2.003a9.994 9.994 0 0 0-8.777 14.772L2.002 22l5.398-1.188A10 10 0 1 0 12.003 2.003zm0 18.001a7.992 7.992 0 0 1-4.073-1.115l-.292-.173-3.023.666.715-2.942-.19-.301A7.994 7.994 0 1 1 12.003 20z"/>
          </svg>
          تواصل عبر واتساب
        </a>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className={styles.lightbox}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="عرض الصورة"
        >
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="إغلاق">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div className={styles.lightboxImgWrap} onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox}
              alt="صورة المنيو"
              fill
              sizes="95vw"
              className={styles.lightboxImg}
            />
          </div>
        </div>
      )}
    </main>
  );
}
