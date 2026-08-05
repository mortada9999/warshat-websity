'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import type { Lang } from '@/lib/types';
import styles from './MenuOverlay.module.css';

interface MenuOverlayProps {
  onClose: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (ar: string, en: string) => string;
}

const NAV_LINKS = [
  { num: '01', href: '/',            ar: 'الرئيسية',         en: 'HOME' },
  { num: '02', href: '/#activities', ar: 'النشاطات',          en: 'ACTIVITIES' },
  { num: '03', href: '/#trainings',  ar: 'الورش التدريبية',   en: 'WORKSHOPS' },
  { num: '04', href: '/#courses',    ar: 'الكورسات',         en: 'COURSES' },
  { num: '05', href: '/location',    ar: 'المواقع',            en: 'LOCATIONS' },
];

const SOCIALS = [
  { name: 'Wa', icon: '📱', href: '#' },
  { name: 'In', icon: '📸', href: 'https://www.instagram.com/warshatfan/' },
  { name: 'Pi', icon: '📌', href: '#' },
  { name: 'Be', icon: '🎨', href: '#' },
];

const panelVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.4, ease: [0.55, 0, 0.78, 0] },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
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
      {/* Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in sidebar panel */}
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.panel}
      >
        {/* Close Button (Floating red circle on the edge) */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label={t('إغلاق القائمة', 'Close menu')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 18L18 6M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className={styles.panelContent}>
          {/* Main Nav Links */}
          <nav aria-label={t('التنقل الرئيسي', 'Primary navigation')} className={styles.nav}>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className={styles.navList}
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={itemVariants} className={styles.navItem}>
                  <span className={styles.navNum}>{link.num}</span>
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

          {/* Socials & Lang */}
          <div className={styles.bottomSection}>
            <div className={styles.socials} aria-label="Social links">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className={styles.socialIconBtn}
                  aria-label={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.name}
                </a>
              ))}
            </div>

            <button
              className={styles.langToggle}
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            >
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
