'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import styles from './Header.module.css';

export default function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Logo / Brand */}
        <Link href="/" className={styles.logo} id="site-logo">
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>
            {t('ورشة فن', 'Warshat Fan')}
          </span>
        </Link>

        <nav className={styles.nav} aria-label={t('التنقل الرئيسي', 'Main navigation')}>
          <Link href="/" className={styles.navLink} id="nav-home">
            {t('الرئيسية', 'Home')}
          </Link>
          <Link href="/?category=workshop" className={styles.navLink} id="nav-workshops">
            {t('ورش العمل', 'Workshops')}
          </Link>
          <Link href="/?category=course" className={styles.navLink} id="nav-courses">
            {t('الدورات', 'Courses')}
          </Link>
          <Link href="/?category=kids" className={styles.navLink} id="nav-kids">
            {t('الأطفال', 'Kids')}
          </Link>
        </nav>

        <div className={styles.actions}>
          {/* Language Toggle */}
          <button
            id="lang-toggle"
            className={styles.langBtn}
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            aria-label={t('التبديل إلى الإنجليزية', 'Switch to Arabic')}
          >
            {lang === 'ar' ? 'EN' : 'عر'}
          </button>
        </div>
      </div>
    </header>
  );
}
