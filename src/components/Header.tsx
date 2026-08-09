'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import MenuOverlay from './MenuOverlay';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#entertainment', label: 'Entertainment' },
  { href: '#training',      label: 'Training' },
  { href: '#courses',       label: 'Courses' },
  { href: '#kids',           label: 'Kids' },
];

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Hide top nav and show floating hamburger when scrolled > 70px
      setScrolled(window.scrollY > 70);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial check
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      {/* Floating Hamburger Button (Appears when scrolled and menu is closed) */}
      <button
        className={`${styles.floatingHamburger} ${scrolled && !isMenuOpen ? styles.visible : ''}`}
        onClick={() => setIsMenuOpen(true)}
        aria-label={t('فتح القائمة', 'Open menu')}
        aria-expanded={isMenuOpen}
        aria-haspopup="dialog"
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>

      {/* Main Top Header */}
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="ورشة فن — الرئيسية">
            <Image
              src="/logo.png"
              alt="ورشة فن"
              width={48}
              height={48}
              className={styles.logoImg}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
            <Link href="#loyalty" className={`${styles.loyaltyLink} hidden md:inline-block`}>
              Loyalty Ticket
            </Link>
          </nav>

          {/* Controls: lang switch + mobile hamburger */}
          <div className={styles.controls}>
            {/* Language Toggle */}
            <div className={styles.langSwitch}>
              <button
                className={`${styles.langBtn} ${lang === 'ar' ? styles.activeLang : ''}`}
                onClick={() => setLang('ar')}
              >
                AR
              </button>
              <button
                className={`${styles.langBtn} ${lang === 'en' ? styles.activeLang : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>

            {/* Mobile Hamburger (Only visible on small screens when NOT scrolled) */}
            <button
              className={styles.mobileHamburger}
              onClick={() => setIsMenuOpen(true)}
              aria-label={t('فتح القائمة', 'Open menu')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
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
