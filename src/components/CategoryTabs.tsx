'use client';

import React from 'react';
import type { Category } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/types';
import { useLanguage } from './LanguageProvider';
import styles from './CategoryTabs.module.css';

interface CategoryTabsProps {
  active: Category | 'all';
  onChange: (cat: Category | 'all') => void;
}

const ALL_TABS: { value: Category | 'all' }[] = [
  { value: 'all' },
  { value: 'open_activity' },
  { value: 'workshop' },
  { value: 'kids_course' },
  { value: 'kids_workshop' },
  { value: 'course' },
];

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  const { t } = useLanguage();

  return (
    <div className={styles.tabs} role="tablist" aria-label={t('التصنيفات', 'Categories')}>
      {ALL_TABS.map(({ value }) => {
        const label =
          value === 'all'
            ? t('الكل', 'All')
            : t(CATEGORY_LABELS[value].ar, CATEGORY_LABELS[value].en);
        const isActive = active === value;
        return (
          <button
            key={value}
            role="tab"
            id={`tab-${value}`}
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onChange(value)}
          >
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
