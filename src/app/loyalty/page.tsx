'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';

/* ── Mock user data (replace with real auth+db later) ── */
const MOCK_USER = {
  name: 'سارة العزاوي',
  memberId: 'WF-٢٠٢٥-٠٠١٤',
  points: 340,
  tier: 'فضي',           // برونزي | فضي | ذهبي
  starsEarned: 3,
  starsTotal: 5,
  joinedDate: 'مارس ٢٠٢٥',
  branch: 'الزيونة',
};

const TIERS = [
  { name: 'برونزي', minPoints: 0,   maxPoints: 199,  color: '#C08A2D' },
  { name: 'فضي',   minPoints: 200,  maxPoints: 499,  color: '#9B9B9B' },
  { name: 'ذهبي',  minPoints: 500,  maxPoints: 1000, color: '#C4622D' },
];

const BENEFITS = [
  { icon: '★', label: 'خصم ١٠٪ على جميع النشاطات', tier: 'فضي' },
  { icon: '★', label: 'جلسة ترفيهية مجانية شهرياً', tier: 'فضي' },
  { icon: '★', label: 'أولوية الحجز في الورش التدريبية', tier: 'ذهبي' },
];

const RECENT_ACTIVITY = [
  { date: 'يوليو ٢٠٢٥',   label: 'تلوين الفخار',           points: '+٢٠' },
  { date: 'يونيو ٢٠٢٥',   label: 'ورشة التطريز',           points: '+٤٠' },
  { date: 'يونيو ٢٠٢٥',   label: 'صناعة الأساور',          points: '+١٥' },
  { date: 'مايو ٢٠٢٥',    label: 'تلوين اللوحات',          points: '+١٥' },
];

const currentTier = TIERS.find((t) => t.name === MOCK_USER.tier)!;
const nextTier    = TIERS.find((t) => t.minPoints > currentTier.minPoints);
const progress    = nextTier
  ? ((MOCK_USER.points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
  : 100;

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function LoyaltyPage() {
  return (
    <main className={styles.page}>

      {/* ── Back link ── */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.backLink} aria-label="العودة إلى الرئيسية">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>الرئيسية</span>
        </Link>
        <p className={styles.pageLabel}>بطاقة الولاء</p>
      </div>

      {/* ── Ticket Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={styles.ticketWrap}
        aria-label="بطاقة ولاء ورشة فن"
      >
        {/* ─ Top half of ticket ─ */}
        <div className={styles.ticketTop}>
          {/* Brand stripe */}
          <div className={styles.brandStripe}>
            <span className={styles.brandName}>ورشة فن</span>
            <span className={styles.memberSince}>عضو منذ {MOCK_USER.joinedDate}</span>
          </div>

          {/* Main content */}
          <div className={styles.topContent}>
            {/* Left: member info */}
            <div className={styles.memberInfo}>
              <div className={styles.tierBadge} style={{ borderColor: currentTier.color }}>
                <span className={styles.tierDot} style={{ background: currentTier.color }} />
                <span className={styles.tierName} style={{ color: currentTier.color }}>
                  {MOCK_USER.tier}
                </span>
              </div>
              <h1 className={styles.memberName}>{MOCK_USER.name}</h1>
              <p className={styles.memberId}>{MOCK_USER.memberId}</p>
              <p className={styles.branchLabel}>فرع {MOCK_USER.branch}</p>
            </div>

            {/* Right: star tier + points */}
            <div className={styles.pointsBlock}>
              <div className={styles.starsRow} aria-label={`${MOCK_USER.starsEarned} من ${MOCK_USER.starsTotal} نجوم`}>
                {Array.from({ length: MOCK_USER.starsTotal }).map((_, i) => (
                  <span
                    key={i}
                    className={styles.starIcon}
                    style={{ color: i < MOCK_USER.starsEarned ? currentTier.color : 'rgba(18,18,18,0.15)' }}
                  >
                    <Star filled={i < MOCK_USER.starsEarned} />
                  </span>
                ))}
              </div>
              <div className={styles.pointsCount} aria-label={`${MOCK_USER.points} نقطة`}>
                <span className={styles.pointsNum}>{MOCK_USER.points}</span>
                <span className={styles.pointsLabel}>نقطة</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {nextTier && (
            <div className={styles.progressWrap} aria-label={`التقدم نحو مستوى ${nextTier.name}`}>
              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: currentTier.color }}
                />
              </div>
              <p className={styles.progressLabel}>
                {nextTier.minPoints - MOCK_USER.points} نقطة متبقية للوصول إلى {nextTier.name}
              </p>
            </div>
          )}
        </div>

        {/* ─ Perforation ─ */}
        <div className={styles.perforation} aria-hidden="true">
          <div className={styles.notchRight} />
          <div className={styles.dots}>
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className={styles.dot} />
            ))}
          </div>
          <div className={styles.notchLeft} />
        </div>

        {/* ─ Bottom half ─ */}
        <div className={styles.ticketBottom}>
          <div className={styles.benefitsList} aria-label="مزايا العضوية">
            {BENEFITS.map((b) => (
              <div key={b.label} className={styles.benefitItem}>
                <span className={styles.benefitIcon} aria-hidden="true">{b.icon}</span>
                <span className={styles.benefitText}>{b.label}</span>
                <span className={styles.benefitTier}>{b.tier}</span>
              </div>
            ))}
          </div>
          {/* Barcode decoration */}
          <div className={styles.barcodeWrap} aria-hidden="true">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={styles.barLine}
                style={{ height: `${28 + (i % 3) * 10}px`, opacity: 0.15 + (i % 4) * 0.07 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Recent Activity ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={styles.activitySection}
        aria-label="آخر النشاطات"
      >
        <h2 className={styles.activityTitle}>آخر النشاطات</h2>
        <ul className={styles.activityList}>
          {RECENT_ACTIVITY.map((a, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
              className={styles.activityItem}
            >
              <div className={styles.activityLeft}>
                <span className={styles.activityLabel}>{a.label}</span>
                <span className={styles.activityDate}>{a.date}</span>
              </div>
              <span className={styles.activityPoints}>{a.points}</span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* ── Tier overview ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.4 }}
        className={styles.tierSection}
        aria-label="مستويات العضوية"
      >
        <h2 className={styles.activityTitle}>مستويات العضوية</h2>
        <div className={styles.tierGrid}>
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`${styles.tierCard} ${t.name === MOCK_USER.tier ? styles.tierCardActive : ''}`}
              style={t.name === MOCK_USER.tier ? { borderColor: t.color } : {}}
            >
              <span className={styles.tierCardDot} style={{ background: t.color }} />
              <span className={styles.tierCardName} style={t.name === MOCK_USER.tier ? { color: t.color } : {}}>
                {t.name}
              </span>
              <span className={styles.tierCardRange}>
                {t.minPoints}–{t.maxPoints === 1000 ? '+' : t.maxPoints} نقطة
              </span>
            </div>
          ))}
        </div>
      </motion.section>

    </main>
  );
}
