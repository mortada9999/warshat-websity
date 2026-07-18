'use client';

import React from 'react';
import type { Branch } from '@/lib/types';
import { BRANCH_LABELS } from '@/lib/types';
import { useLanguage } from './LanguageProvider';
import { PinIcon, MapIcon } from './Icons';
import styles from './BranchFilter.module.css';

interface BranchFilterProps {
  active: Branch | 'all';
  onChange: (b: Branch | 'all') => void;
}

const BRANCHES: { value: Branch | 'all' }[] = [
  { value: 'all' },
  { value: 'zayouna' },
  { value: 'yarmouk' },
];

export default function BranchFilter({ active, onChange }: BranchFilterProps) {
  const { t } = useLanguage();

  return (
    <div className={styles.filter} role="group" aria-label={t('الفرع', 'Branch')}>
      {BRANCHES.map(({ value }) => {
        const label =
          value === 'all'
            ? t('كل الفروع', 'All Branches')
            : t(BRANCH_LABELS[value].ar, BRANCH_LABELS[value].en);
        const isActive = active === value;
        return (
          <button
            key={value}
            id={`branch-${value}`}
            className={`${styles.btn} ${isActive ? styles.active : ''}`}
            onClick={() => onChange(value)}
            aria-pressed={isActive}
          >
            {value === 'all' ? <MapIcon size={15} /> : <PinIcon size={15} />}
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
