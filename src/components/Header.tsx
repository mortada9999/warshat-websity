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

          {/* Logo — inline-start (right in RTL) */}
          <Link href="/" className={styles.logo} aria-label="ورشة فن — الرئيسية">
            <Image
              src="/logo.png"
              alt="ورشة فن"
              width={44}
              height={44}
              className={styles.logoImg}
              priority
            />
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
