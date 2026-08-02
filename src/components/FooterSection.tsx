'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './FooterSection.module.css';

export default function FooterSection() {
  return (
    <footer className={styles.footer} aria-label="تذييل الصفحة">
      {/* Top decorative wave */}
      <div className={styles.topWave} aria-hidden="true">
        <svg viewBox="0 0 1280 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 40V0c213 28 427 36 640 28S1067 0 1280 0v40H0z" fill="var(--fg-bg-footer)" />
        </svg>
      </div>

      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <Image
            src="/images/figma/footer-logo.png"
            alt="Warshafa Logo"
            width={67}
            height={67}
            className={styles.logoImg}
          />
        </div>

        {/* Nav links (Figma: Amiri/18px #45483a) */}
        <nav className={styles.navLinks} aria-label="روابط تذييل الصفحة">
          <Link href="/privacy" className={styles.navLink}>Privacy</Link>
          <Link href="/terms" className={styles.navLink}>Terms</Link>
          <Link href="/location" className={styles.navLink}>Location</Link>
        </nav>

        {/* Copyright (Figma: IBM Plex Sans/14px #45483a) */}
        <p className={styles.copyright}>
          © 2024 Let&apos;s Make Art Workshop Studio
        </p>
      </div>
    </footer>
  );
}
