'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from './LanguageProvider';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/#entertainment', ar: 'ترفيه', en: 'Entertainment' },
  { href: '/#training',      ar: 'ورش تدريبية', en: 'Training' },
  { href: '/#courses',       ar: 'كورسات', en: 'Courses' },
  { href: '/kids',           ar: 'أطفال', en: 'Kids' },
];

export default function Header() {
  const { lang, setLang, t } = useLanguage();
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

  return (
    <>

      {/* Main Top Header */}
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="ورشة فن — الرئيسية">
            <Image
              src="/images/figma/1logo.png"
              alt="ورشة فن"
              width={200}
              height={200}
              className={styles.logoImg}
              priority
              quality={100}
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {t(link.ar, link.en)}
              </Link>
            ))}
            <Link href="/profile" className={styles.loyaltyLink}>
              {t('الملف الشخصي', 'My Profile')}
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
          </div>
        </div>
      </header>
    </>
  );
}
