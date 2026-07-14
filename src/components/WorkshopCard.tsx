'use client';

import React from 'react';
import Link from 'next/link';
import type { Workshop } from '@/lib/types';
import { CATEGORY_LABELS, BRANCH_LABELS } from '@/lib/types';
import { useLanguage } from './LanguageProvider';
import styles from './WorkshopCard.module.css';

interface WorkshopCardProps {
  workshop: Workshop;
}

const CATEGORY_ICONS: Record<string, string> = {
  open_activity: '🎨',
  workshop:      '🛠',
  kids:          '🌟',
  course:        '📚',
};

export default function WorkshopCard({ workshop }: WorkshopCardProps) {
  const { lang, t } = useLanguage();

  const title       = lang === 'ar' ? workshop.title_ar : workshop.title_en;
  const description = lang === 'ar' ? workshop.description_ar : workshop.description_en;
  const tags        = workshop.tags?.split(',').map(s => s.trim()).filter(Boolean) ?? [];
  const catLabel    = CATEGORY_LABELS[workshop.category]?.[lang] ?? workshop.category;
  const branchLabel = workshop.branch ? BRANCH_LABELS[workshop.branch]?.[lang] : null;

  return (
    <Link href={`/workshops/${workshop.id}`} className={`card ${styles.card}`} id={`workshop-${workshop.id}`}>
      {/* Image */}
      <div className={styles.imageWrap}>
        {workshop.image_url ? (
          <img
            src={workshop.image_url}
            alt={title}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderIcon}>
              {CATEGORY_ICONS[workshop.category] ?? '✦'}
            </span>
          </div>
        )}
        {/* Category badge overlay */}
        <span className={`badge badge-orange ${styles.catBadge}`}>
          {CATEGORY_ICONS[workshop.category]} {catLabel}
        </span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {description && (
          <p className={styles.description}>
            {description.length > 100 ? description.slice(0, 100) + '…' : description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className={`badge badge-beige ${styles.tag}`}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.meta}>
            {branchLabel && (
              <span className={styles.branch}>
                📍 {branchLabel}
              </span>
            )}
            {workshop.seats != null && (
              <span className={styles.seats}>
                👥 {t(`${workshop.seats} مقعداً`, `${workshop.seats} seats`)}
              </span>
            )}
          </div>
          <div className={styles.price}>
            {workshop.price != null && workshop.price > 0
              ? <span className={styles.priceValue}>{workshop.price.toLocaleString()} <span className={styles.currency}>{t('د.ع', 'IQD')}</span></span>
              : <span className={styles.free}>{t('مجاني', 'Free')}</span>
            }
          </div>
        </div>
      </div>
    </Link>
  );
}
