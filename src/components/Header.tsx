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
          <img src="/logo.png" alt="ورشة فن" className={styles.logoImg} />
        </Link>

        {/* Hamburger Menu */}
        <button className={styles.hamburger} aria-label={t('القائمة', 'Menu')}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
