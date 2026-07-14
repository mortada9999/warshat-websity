'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import BranchFilter from '@/components/BranchFilter';
import WorkshopCard from '@/components/WorkshopCard';
import { useLanguage } from '@/components/LanguageProvider';
import type { Workshop, Category, Branch } from '@/lib/types';
import styles from './page.module.css';

export default function HomePage() {
  const { t } = useLanguage();
  const [workshops, setWorkshops]   = useState<Workshop[]>([]);
  const [loading, setLoading]       = useState(true);
  const [category, setCategory]     = useState<Category | 'all'>('all');
  const [branch, setBranch]         = useState<Branch | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchWorkshops = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'all') params.set('category', category);
      if (branch   !== 'all') params.set('branch',   branch);
      const res  = await fetch(`/api/workshops?${params}`);
      const data = (await res.json()) as { workshops?: Workshop[] };
      setWorkshops(data.workshops ?? []);
    } catch {
      setWorkshops([]);
    } finally {
      setLoading(false);
    }
  }, [category, branch]);

  useEffect(() => {
    void fetchWorkshops();
  }, [fetchWorkshops]);

  const filteredWorkshops = workshops.filter(w => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const titleAr = w.title_ar?.toLowerCase() ?? '';
    const titleEn = w.title_en?.toLowerCase() ?? '';
    return titleAr.includes(query) || titleEn.includes(query);
  });

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

          {/* Search bar */}
          <div className={styles.searchRow}>
            <div className={styles.searchContainer}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                id="search-input"
                type="text"
                className={styles.searchInput}
                placeholder={t('ابحث عن ورشة بالاسم...', 'Search workshops by name...')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label={t('ابحث عن ورشة', 'Search workshops')}
              />
              {searchQuery && (
                <button
                  type="button"
                  id="clear-search"
                  className={styles.clearButton}
                  onClick={() => setSearchQuery('')}
                  aria-label={t('مسح البحث', 'Clear search')}
                >
                  ×
                </button>
              )}
            </div>
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
              {loading ? '' : t(`${filteredWorkshops.length} نتيجة`, `${filteredWorkshops.length} results`)}
            </span>
          </div>

          {/* Grid */}
          {loading ? (
            <div className={styles.grid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`card ${styles.skeleton}`} aria-hidden />
              ))}
            </div>
          ) : filteredWorkshops.length === 0 ? (
            <div className={styles.empty} role="status">
              <span className={styles.emptyIcon}>{searchQuery ? '🔍' : '✦'}</span>
              <p>
                {searchQuery
                  ? t('لا توجد ورش تطابق بحثك', 'No workshops match your search')
                  : t('لا توجد ورش في هذا التصنيف', 'No workshops in this category')
                }
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="btn btn-ghost btn-sm"
                  style={{ marginTop: '1rem' }}
                >
                  {t('مسح البحث', 'Clear search')}
                </button>
              )}
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredWorkshops.map((w, i) => (
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
