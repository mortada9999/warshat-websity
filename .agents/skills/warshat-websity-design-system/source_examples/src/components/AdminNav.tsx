'use client';

import React from 'react';
import Link from 'next/link';
import styles from './AdminNav.module.css';

export default function AdminNav() {
  return (
    <nav className={styles.nav} aria-label="Admin navigation">
      <Link href="/" className={styles.brand} id="admin-home-link">
        <span className={styles.icon}>✦</span>
        ورشة فن
      </Link>
      <div className={styles.links}>
        <Link href="/admin" className={styles.link} id="admin-nav-list">الورش</Link>
        <Link href="/admin/new" className={`btn btn-primary btn-sm ${styles.newBtn}`} id="admin-nav-new">
          + إضافة ورشة
        </Link>
      </div>
    </nav>
  );
}
