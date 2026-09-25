'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { useLanguage } from '@/components/LanguageProvider';
import { CATEGORY_LABELS, BRANCH_LABELS } from '@/lib/types';
import type { Workshop } from '@/lib/types';
import styles from './page.module.css';

const CATEGORY_ICONS: Record<string, string> = {
  open_activity: '🎨',
  workshop:      '🛠',
  kids:          '🌟',
  course:        '📚',
};

export default function WorkshopDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch(`/api/workshops/${id}`)
      .then(r => r.json())
      .then((d: any) => setWorkshop(d.workshop ?? null))
      .catch(() => setWorkshop(null))
      .finally(() => setLoading(false));
  }, [id]);

  const title       = workshop ? (lang === 'ar' ? workshop.title_ar : workshop.title_en) : '';
  const description = workshop ? (lang === 'ar' ? workshop.description_ar : workshop.description_en) : '';
  const tags        = workshop?.tags?.split(',').map(s => s.trim()).filter(Boolean) ?? [];
  const catLabel    = workshop ? CATEGORY_LABELS[workshop.category]?.[lang] : '';
  const branchLabel = workshop?.branch ? BRANCH_LABELS[workshop.branch]?.[lang] : null;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={`container ${styles.content}`}>
          {/* Back */}
          <Link href="/" className={styles.back} id="back-to-home">
            ← {t('العودة للرئيسية', 'Back to home')}
          </Link>

          {loading ? (
            <div className={styles.skeleton} aria-label={t('جارٍ التحميل', 'Loading')} />
          ) : !workshop ? (
            <div className={styles.notFound}>
              <span className={styles.notFoundIcon}>✦</span>
              <h1>{t('الورشة غير موجودة', 'Workshop not found')}</h1>
              <Link href="/" className="btn btn-ghost">{t('عودة', 'Go back')}</Link>
            </div>
          ) : (
            <article className={styles.article} aria-labelledby="workshop-title">
              {/* Image */}
              <div className={styles.imageWrap}>
                {workshop.image_url ? (
                  <img
                    src={workshop.image_url}
                    alt={title}
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span>{CATEGORY_ICONS[workshop.category] ?? '✦'}</span>
                  </div>
                )}
                <div className={styles.imageBadges}>
                  <span className="badge badge-orange">
                    {CATEGORY_ICONS[workshop.category]} {catLabel}
                  </span>
                  {workshop.is_active === 0 && (
                    <span className="badge badge-red">{t('غير مفعّل', 'Inactive')}</span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className={styles.body}>
                <header className={styles.header}>
                  <h1 id="workshop-title" className={styles.title}>{title}</h1>
                  <div className={styles.price}>
                    {workshop.price != null && workshop.price > 0 ? (
                      <span className={styles.priceVal}>
                        {workshop.price.toLocaleString()} <small>{t('د.ع', 'IQD')}</small>
                      </span>
                    ) : (
                      <span className={styles.free}>{t('مجاني', 'Free')}</span>
                    )}
                  </div>
                </header>

                {description && (
                  <p className={styles.description}>{description}</p>
                )}

                <div className={styles.divider} />

                {/* Meta grid */}
                <div className={styles.metaGrid}>
                  {branchLabel && (
                    <div className={styles.metaItem}>
                      <span className={styles.metaIcon}>📍</span>
                      <div>
                        <span className={styles.metaKey}>{t('الفرع', 'Branch')}</span>
                        <span className={styles.metaVal}>{branchLabel}</span>
                      </div>
                    </div>
                  )}
                  {workshop.seats != null && (
                    <div className={styles.metaItem}>
                      <span className={styles.metaIcon}>👥</span>
                      <div>
                        <span className={styles.metaKey}>{t('المقاعد', 'Seats')}</span>
                        <span className={styles.metaVal}>
                          {t(`${workshop.seats} مقعداً`, `${workshop.seats} seats`)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className={styles.metaItem}>
                    <span className={styles.metaIcon}>📅</span>
                    <div>
                      <span className={styles.metaKey}>{t('تاريخ الإضافة', 'Added')}</span>
                      <span className={styles.metaVal}>
                        {new Date(workshop.created_at).toLocaleDateString(
                          lang === 'ar' ? 'ar-IQ' : 'en-GB'
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className={styles.tags}>
                    {tags.map(tag => (
                      <span key={tag} className="badge badge-beige">{tag}</span>
                    ))}
                  </div>
                )}

                {/* Book Now Button */}
                <div style={{ marginTop: '1.5rem' }}>
                  <Link href={`/workshops/${id}/book`} className="btn btn-primary" style={{ width: '100%', fontSize: '1.125rem', padding: '0.875rem' }}>
                    {t('احجز الآن', 'Book Now')}
                  </Link>
                </div>
              </div>
            </article>
          )}
        </div>
      </main>
    </>
  );
}
