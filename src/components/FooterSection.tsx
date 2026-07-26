'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './FooterSection.module.css';

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/warshatfan/', label: 'إنستغرام' },
  { name: 'TikTok',    href: '#',                                       label: 'تيك توك' },
  { name: 'Pinterest', href: '#',                                       label: 'بينتريست' },
];

const NAV_QUICK = [
  { href: '/#activities', label: 'النشاطات الترفيهية' },
  { href: '/#trainings',  label: 'الورش التدريبية' },
  { href: '/#courses',    label: 'الكورسات' },
  { href: '/#kids',       label: 'الأطفال' },
  { href: '/loyalty',     label: 'بطاقة الولاء' },
  { href: '/location',    label: 'المواقع' },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function FooterSection() {
  return (
    <footer className={styles.footer} aria-label="قسم الختام">

      {/* ── Big tagline ── */}
      <motion.div {...inView(0)} className={styles.taglineWrap}>
        <h2 className={styles.tagline}>
          خلّينا نصنع فن
        </h2>
        <div className={styles.taglineLine} aria-hidden="true" />
      </motion.div>

      {/* ── Middle grid: logo+desc | nav links | socials ── */}
      <motion.div {...inView(0.1)} className={styles.midGrid}>

        {/* Brand column */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brandLogo} aria-label="ورشة فن">
            <Image
              src="/logo.png"
              alt="شعار ورشة فن"
              width={48}
              height={48}
              className={styles.logoImg}
            />
          </Link>
          <p className={styles.brandDesc}>
            مساحة إبداعية في بغداد تجمع بين الفن اليدوي والتعلم والمتعة — فرعا اليرموك والزيونة.
          </p>
        </div>

        {/* Quick nav */}
        <nav aria-label="روابط سريعة" className={styles.navCol}>
          <p className={styles.colLabel}>استعرض</p>
          <ul className={styles.navList}>
            {NAV_QUICK.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact + socials */}
        <div className={styles.contactCol}>
          <p className={styles.colLabel}>تواصل معنا</p>
          <div className={styles.socialRow}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className={styles.socialChip}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.name}
              </a>
            ))}
          </div>

          {/* Google Sign-in placeholder */}
          <button className={styles.googleBtn} type="button" aria-label="تسجيل الدخول بحساب Google">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>تسجيل الدخول</span>
          </button>
        </div>

      </motion.div>

      {/* ── Divider ── */}
      <div className={styles.footerDivider} aria-hidden="true" />

      {/* ── Bottom bar ── */}
      <motion.div {...inView(0.2)} className={styles.bottomBar}>
        <span className={styles.copyright}>
          &copy; ورشة فن ٢٠٢٥ — جميع الحقوق محفوظة
        </span>
        <div className={styles.locations}>
          <span>بغداد — اليرموك</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>بغداد — الزيونة</span>
        </div>
      </motion.div>

    </footer>
  );
}
