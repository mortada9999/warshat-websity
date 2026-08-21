'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HoloLoyaltyCard from '@/components/HoloLoyaltyCard';
import { useLoyalty } from '@/lib/loyaltyStore';
import styles from './page.module.css';

export default function ProfilePage() {
  const { currentMember } = useLoyalty();
  const member = currentMember;

  // Derived stats
  const totalSessions = member.history.filter((h) => h.type === 'session').length;
  const sessionsToNext5 = Math.max(0, 5 - member.sessions);
  const sessionsToNext10 = Math.max(0, 10 - member.sessions);
  const totalRewards = member.history.filter(
    (h) => h.type === 'reward5' || h.type === 'reward10',
  ).length;

  // Activity type icons
  const getIcon = (type: string) => {
    if (type === 'session') return '';
    if (type === 'reward5') return '🎁';
    if (type === 'reward10') return '🎉';
    return '✦';
  };

  return (
    <main className={styles.page}>
      {/* ── Back link ── */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.backLink} aria-label="العودة إلى الرئيسية">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>الرئيسية</span>
        </Link>
        <p className={styles.pageLabel}>الملف الشخصي</p>
      </div>

      {/* ── Profile Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={styles.profileHeader}
      >
        <div className={styles.avatar} aria-hidden="true">
          {member.name.charAt(0)}
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.profileName}>{member.name}</h1>
          <p className={styles.profileMeta}>عضو منذ {member.createdAt}</p>
        </div>
      </motion.div>

      {/* ── Holographic Loyalty Card ── */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={styles.cardSection}
        aria-label="بطاقة الولاء"
      >
        <HoloLoyaltyCard member={member} />
      </motion.section>

      {/* ── Quick Stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.25 }}
        className={styles.statsGrid}
      >
        <div className={styles.statCard}>
          <span className={styles.statNum}>{totalSessions}</span>
          <span className={styles.statLabel}>جلسة محضورة</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{sessionsToNext5 === 0 ? '✓' : sessionsToNext5}</span>
          <span className={styles.statLabel}>
            {sessionsToNext5 === 0 ? 'خصم ٥٠٪ جاهز!' : 'للخصم ٥٠٪'}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{sessionsToNext10 === 0 ? '✓' : sessionsToNext10}</span>
          <span className={styles.statLabel}>
            {sessionsToNext10 === 0 ? 'ورشة مجانية!' : 'للورشة المجانية'}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{totalRewards}</span>
          <span className={styles.statLabel}>مكافآت محصّلة</span>
        </div>
      </motion.div>

      {/* ── Recent Activity ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.35 }}
        className={styles.activitySection}
        aria-label="ورش تدريبية"
      >
        <h2 className={styles.sectionTitle}>ورش تدريبية</h2>
        {member.history.length === 0 ? (
          <p className={styles.emptyText}>لم تحضر أي جلسة بعد</p>
        ) : (
          <ul className={styles.activityList}>
            {member.history.slice(0, 10).map((entry, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.05, ease: 'easeOut' }}
                className={styles.activityItem}
              >
                <div className={styles.activityLeft}>
                  <span className={styles.activityIcon}>{getIcon(entry.type)}</span>
                  <div className={styles.activityInfo}>
                    <span className={styles.activityLabel}>{entry.note}</span>
                    <span className={styles.activityDate}>{entry.date}</span>
                  </div>
                </div>
                <span
                  className={`${styles.activityBadge} ${
                    entry.type === 'session'
                      ? styles.badgeSession
                      : entry.type === 'reward5'
                        ? styles.badgeReward5
                        : styles.badgeReward10
                  }`}
                >
                  {entry.type === 'session'
                    ? 'جلسة'
                    : entry.type === 'reward5'
                      ? 'خصم ٥٠٪'
                      : 'ورشة مجانية'}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.section>

      {/* ── How it works ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.45 }}
        className={styles.howSection}
        aria-label="كيف يعمل"
      >
        <h2 className={styles.sectionTitle}>كيف يعمل نظام الولاء؟</h2>
        <div className={styles.howGrid}>
          <div className={styles.howCard}>
            <span className={styles.howNum}>١</span>
            <p className={styles.howText}>احضر ورش ترفيهية أو تدريبية واكسب نقاط</p>
          </div>
          <div className={styles.howCard}>
            <span className={styles.howNum}>٢</span>
            <p className={styles.howText}>عند ٥ جلسات احصل على خصم ٥٠٪</p>
          </div>
          <div className={styles.howCard}>
            <span className={styles.howNum}>٣</span>
            <p className={styles.howText}>عند ١٠ جلسات احصل على ورشة مجانية!</p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
