'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import WixHero from '@/components/WixHero';
import WixActivityCard from '@/components/WixActivityCard';
import WixTrainingCard from '@/components/WixTrainingCard';
import WixBanner from '@/components/WixBanner';
import { useLanguage } from '@/components/LanguageProvider';
import type { Workshop } from '@/lib/types';
import styles from './page.module.css';

// Mock workshop data for preview (adjusted to match design)
const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: '1',
    title_ar: 'الرسم على الاكواب الفخارية',
    title_en: 'Pottery Mug Painting',
    description_ar: '',
    description_en: '',
    category: 'open_activity',
    branch: 'zayouna',
    price: 10000,
    seats: 20,
    image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title_ar: 'الرسم على الحقائب القماشية',
    title_en: 'Tote Bag Painting',
    description_ar: '',
    description_en: '',
    category: 'open_activity',
    branch: 'yarmouk',
    price: 15000,
    seats: 20,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title_ar: 'الرسم على المراية',
    title_en: 'Mirror Painting',
    description_ar: '',
    description_en: '',
    category: 'open_activity',
    branch: 'zayouna',
    price: 15000,
    seats: 20,
    image_url: 'https://images.unsplash.com/photo-1497942304796-b8bc2cc898f3?auto=format&fit=crop&q=80&w=400',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title_ar: 'صناعة الاكسسوارات',
    title_en: 'Accessories Making',
    description_ar: '',
    description_en: '',
    category: 'open_activity',
    branch: 'yarmouk',
    price: 15000,
    seats: 20,
    image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title_ar: 'ورشة الفخار',
    title_en: 'Pottery Workshop',
    description_ar: 'ورشة الفخار',
    description_en: 'Pottery Workshop',
    category: 'workshop',
    branch: 'zayouna',
    price: 0,
    seats: 12,
    image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    title_ar: 'needle felting',
    title_en: 'Needle Felting',
    description_ar: 'needle felting',
    description_en: 'Needle Felting',
    category: 'workshop',
    branch: 'yarmouk',
    price: 0,
    seats: 12,
    image_url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=800',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  }
];

export default function HomePage() {
  const { t, lang } = useLanguage();
  const [workshops, setWorkshops] = useState<Workshop[]>(MOCK_WORKSHOPS);

  return (
    <>
      <Header />

      <WixHero />

      {/* النشاطات الترفيهية المفتوحة */}
      <section style={{ backgroundColor: 'var(--olive-light)', padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--olive)', marginBottom: '0.5rem', fontSize: '2rem', fontWeight: 'bold' }}>
            {t('النشاطات الترفيهية المفتوحة', 'Open Recreational Activities')}
          </h2>
          <p style={{ color: 'var(--olive)', marginBottom: '3rem', fontSize: '1.2rem' }}>
            {t('يومياً و بدون حجز!', 'Daily & No Reservation Required!')}
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {workshops.filter(w => w.category === 'open_activity').map((w) => (
              <WixActivityCard key={w.id} workshop={w} />
            ))}
          </div>
        </div>
      </section>

      {/* الورش التدريبية */}
      <section style={{ backgroundColor: '#fff', padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--olive)', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 'bold' }}>
            {t('الورش التدريبية', 'Training Workshops')}
          </h2>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '3rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {workshops.filter(w => w.category === 'workshop').map((w) => (
              <WixTrainingCard key={w.id} workshop={w} />
            ))}
          </div>
        </div>
      </section>

      {/* كورسات الحياكة */}
      <WixBanner 
        titleAr="كورسات الحياكة" 
        titleEn="Knitting Courses" 
        href="/?category=course" 
        panelBg="var(--bg-paper)" 
        imageUrl="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=800" 
        imageFirst={false} 
        lang={lang as 'ar' | 'en'} 
      />

      {/* ورش و اشتراكات الاطفال */}
      <WixBanner 
        titleAr="ورش و اشتراكات الاطفال" 
        titleEn="Kids Workshops & Subscriptions" 
        href="/?category=kids" 
        panelBg="var(--blush-light)" 
        imageUrl="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800" 
        imageFirst={true} 
        lang={lang as 'ar' | 'en'} 
      />

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
