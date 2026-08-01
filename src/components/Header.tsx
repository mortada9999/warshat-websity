'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import MenuOverlay from './MenuOverlay';
import styles from './Header.module.css';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={styles.inner}>
          {/* Hamburger — inline-end (left in RTL) */}
          <button
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(true)}
            aria-label={t('فتح القائمة', 'Open menu')}
            aria-expanded={isMenuOpen}
            aria-haspopup="dialog"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>

          {/* Nav links — center / inline (Figma style) */}
          <nav className={styles.navLinks} aria-label="التنقل السريع">
            <a href="#activities" className={styles.navLink}>{t('النشاطات', 'Activities')}</a>
            <a href="#trainings" className={styles.navLink}>{t('التدريب', 'Training')}</a>
            <a href="#courses" className={styles.navLink}>{t('الكورسات', 'Courses')}</a>
            <a href="#kids" className={styles.navLink}>{t('الأطفال', 'Kids')}</a>
          </nav>

          {/* Loyalty button on the left (inline-end in RTL) */}
          <Link href="/loyalty" className={styles.loyaltyBtn} aria-label="ورشة فن">
            {t('بطاقة الولاء', 'Loyalty')}
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <MenuOverlay
            onClose={() => setIsMenuOpen(false)}
            lang={lang}
            setLang={setLang}
            t={t}
          />
        )}
      </AnimatePresence>
    </>
  );
}
