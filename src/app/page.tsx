'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import BranchFilter from '@/components/BranchFilter';
import WorkshopCard from '@/components/WorkshopCard';
import { SparkIcon } from '@/components/Icons';
import { useLanguage } from '@/components/LanguageProvider';
import type { Workshop, Category, Branch } from '@/lib/types';
import styles from './page.module.css';

// Mock workshop data for preview
const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: '1',
    title_ar: 'ورشة الرسم الحديث',
    title_en: 'Modern Painting Workshop',
    description_ar: 'تعلم تقنيات الرسم الحديثة والألوان المائية',
    description_en: 'Learn modern painting techniques and watercolor methods',
    category: 'workshop',
    branch: 'zayouna',
    price: 50000,
    seats: 12,
    image_url: 'https://picsum.photos/600/400?random=1',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title_ar: 'نشاط فني مفتوح للجميع',
    title_en: 'Open Art Activity for All',
    description_ar: 'ساعة من الفن الحر والإبداع بدون قيود',
    description_en: 'One hour of free art and unlimited creativity',
    category: 'open_activity',
    branch: 'yarmouk',
    price: 25000,
    seats: 20,
    image_url: 'https://picsum.photos/600/400?random=2',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title_ar: 'دورة النحت والتشكيل',
    title_en: 'Sculpture & Modeling Course',
    description_ar: 'دورة متقدمة في فنون النحت والتشكيل بالطين',
    description_en: 'Advanced course in sculpture and clay modeling',
    category: 'course',
    branch: 'zayouna',
    price: 120000,
    seats: 8,
    image_url: 'https://picsum.photos/600/400?random=3',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title_ar: 'ورشة فن للأطفال',
    title_en: 'Art Workshop for Kids',
    description_ar: 'تعليم الفن للأطفال من 5-12 سنة بطرق مرحة',
    description_en: 'Fun art classes for children ages 5-12',
    category: 'kids',
    branch: 'yarmouk',
    price: 35000,
    seats: 15,
    image_url: 'https://picsum.photos/600/400?random=4',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const [workshops, setWorkshops]   = useState<Workshop[]>(MOCK_WORKSHOPS);
  const [loading, setLoading]       = useState(false);
  const [category, setCategory]     = useState<Category | 'all'>('all');
  const [branch, setBranch]         = useState<Branch | 'all'>('all');

  useEffect(() => {
    // Filter mock data based on category and branch
    let filtered = MOCK_WORKSHOPS;
    if (category !== 'all') {
      filtered = filtered.filter(w => w.category === category);
    }
    if (branch !== 'all') {
      filtered = filtered.filter(w => w.branch === branch);
    }
    setWorkshops(filtered);
  }, [category, branch]);

  return (
    <>
      <Header />

      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroBg} aria-hidden />
        <div className={`container ${styles.heroContent}`}>
          <figure className={styles.heroFrame}>
            <img src="/textures/brush-strokes.png" alt={t('لوحة فنية بضربات فرشاة', 'Abstract brush-stroke painting')} className={styles.heroFrameImg} />
          </figure>
          <p className={styles.heroEyebrow}>{t('مرحباً بك في', 'Welcome to')}</p>
          <h1 id="hero-heading" className={styles.heroTitle}>
            {t('ورشة فن', 'Warshat Fan')}
          </h1>
          <p className={styles.heroTagline}>{t('تذوّق الفن', 'taste the Art')}</p>
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
              {workshops.map((w) => (
                <WorkshopCard key={w.id} workshop={w} />
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
