'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Lang } from '@/lib/types';
import styles from './MenuOverlay.module.css';

interface MenuOverlayProps {
  onClose: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (ar: string, en: string) => string;
}

const NAV_LINKS = [
  { href: '/',            ar: 'الرئيسية',         en: 'Home' },
  { href: '/#activities', ar: 'النشاطات',          en: 'Activities' },
  { href: '/#trainings',  ar: 'الورش التدريبية',   en: 'Workshops' },
  { href: '/location',    ar: 'المواقع',            en: 'Locations' },
  { href: '/loyalty',     ar: 'بطاقة الولاء',       en: 'Loyalty Card' },
];

const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/warshatfan/' },
  { name: 'TikTok',    href: '#' },
  { name: 'Pinterest', href: '#' },
];

const panelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.35, ease: [0.55, 0, 0.78, 0] },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function MenuOverlay({ onClose, lang, setLang, t }: MenuOverlayProps) {
  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={t('القائمة الرئيسية', 'Main navigation')}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel — from inline-end (right in RTL) */}
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.panel}
      >
        {/* Top row: logo + close */}
        <div className={styles.topRow}>
          <Link href="/" className={styles.brandLink} onClick={onClose}>
            <Image
              src="/logo.png"
              alt="ورشة فن"
              width={36}
              height={36}
              className={styles.brandLogo}
            />
            <span className={styles.brandName}>ورشة فن</span>
          </Link>

          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={t('إغلاق القائمة', 'Close menu')}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M2.5 2.5L15.5 15.5M15.5 2.5L2.5 15.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label={t('التنقل الرئيسي', 'Primary navigation')} className={styles.nav}>
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className={styles.navList}
          >
            {NAV_LINKS.map((link) => (
              <motion.li key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  className={styles.navLink}
                  onClick={onClose}
                >
                  {lang === 'ar' ? link.ar : link.en}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* Bottom row: lang toggle + socials */}
        <div className={styles.bottomRow}>
          <button
            className={styles.langToggle}
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            aria-label={t('Switch to English', 'التحويل إلى العربية')}
          >
            <span className={lang === 'ar' ? styles.activeLang : styles.inactiveLang}>ع</span>
            <span className={styles.langSlash}>/</span>
            <span className={lang === 'en' ? styles.activeLang : styles.inactiveLang}>EN</span>
          </button>

          <div className={styles.socials} aria-label="Social links">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className={styles.socialLink}
                aria-label={s.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
