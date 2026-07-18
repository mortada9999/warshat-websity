'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import BranchFilter from '@/components/BranchFilter';
import WorkshopCard from '@/components/WorkshopCard';
import { SparkIcon } from '@/components/Icons';
import { useLanguage } from '@/components/LanguageProvider';
import type { Workshop, Category, Branch } from '@/lib/types';
import styles from './page.module.css';

export default function HomePage() {
  const { t } = useLanguage();
  const [workshops, setWorkshops]   = useState<Workshop[]>([]);
  const [loading, setLoading]       = useState(true);
  const [category, setCategory]     = useState<Category | 'all'>('all');
  const [branch, setBranch]         = useState<Branch | 'all'>('all');

  const fetchWorkshops = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'all') params.set('category', category);
      if (branch   !== 'all') params.set('branch',   branch);
      const res  = await fetch(`/api/workshops?${params}`);
      const data: any = await res.json();
      setWorkshops(data.workshops ?? []);
    } catch {
      setWorkshops([]);
    } finally {
      setLoading(false);
    }
  }, [category, branch]);

  useEffect(() => { fetchWorkshops(); }, [fetchWorkshops]);

  return (
    <>
      <Header />

      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroBg} aria-hidden />
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.heroEyebrow}>{t('مرحباً بك في', 'Welcome to')}</p>
          <h1 id="hero-heading" className={styles.heroTitle}>
            {t('ورشة فن', 'Warshat Fan')}
          </h1>
          <p className={styles.heroSub}>
            {t(
              'مساحة الإبداع والتعلم في بغداد — فرعا الزيونة واليرموك',
              "Baghdad\u2019s creative learning space \u2014 Zayouna & Yarmouk branches"
            )}
          </p>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>4</span>
              <span className={styles.statLabel}>{t('تصنيفات', 'Categories')}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>2</span>
              <span className={styles.statLabel}>{t('فروع', 'Branches')}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>{workshops.length}</span>
              <span className={styles.statLabel}>{t('ورشة متاحة', 'Workshops')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workshops Section ── */}
      <main id="workshops" className={styles.main}>
        <div className="container">
          {/* Filters */}
          <div className={styles.filtersRow}>
            <CategoryTabs active={category} onChange={setCategory} />
            <BranchFilter active={branch}   onChange={setBranch}   />
          </div>

          {/* Results header */}
          <div className={styles.resultsHeader}>
            <h2 className="section-title">
              {category === 'all'
                ? t('كل الورش', 'All Workshops')
                : t(
                    { open_activity: 'الأنشطة المفتوحة', workshop: 'ورش العمل', kids: 'أنشطة الأطفال', course: 'الدورات' }[category],
                    { open_activity: 'Open Activities', workshop: 'Workshops', kids: 'Kids Activities', course: 'Courses' }[category]
                  )
              }
            </h2>
            <span className={styles.count}>
              {loading ? '' : t(`${workshops.length} نتيجة`, `${workshops.length} results`)}
            </span>
          </div>

          {/* Grid */}
          {loading ? (
            <div className={styles.grid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`card ${styles.skeleton}`} aria-hidden />
              ))}
            </div>
          ) : workshops.length === 0 ? (
            <div className={styles.empty} role="status">
              <SparkIcon size={40} className={styles.emptyIcon} />
              <p>{t('لا توجد ورش في هذا التصنيف', 'No workshops in this category')}</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {workshops.map((w, i) => (
                <div
                  key={w.id}
                  className={styles.cardWrap}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <WorkshopCard workshop={w} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className="container">
          <p className={styles.footerText}>
            {t('© ورشة فن 2025 — جميع الحقوق محفوظة', '© Warshat Fan 2025 — All rights reserved')}
          </p>
        </div>
      </footer>
    </>
  );
}
