'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HoloLoyaltyCard from '@/components/HoloLoyaltyCard';
import { useLoyalty, SessionEntry, LOYALTY_CONFIG } from '@/lib/loyaltyStore';
import styles from './page.module.css';

import { useLanguage } from '@/components/LanguageProvider';

const TicketList = ({ history }: { history: SessionEntry[] }) => {
  const [showAll, setShowAll] = useState(false);
  const { t, lang } = useLanguage();
  
  // Filter only sessions
  const sessions = history.filter(h => h.type === 'session');
  const total = sessions.length;
  
  if (total === 0) {
    return (
      <div className={styles.ticketList}>
        <div className={`${styles.ticket} ${styles.ticketEmpty}`}>
          {t('أول تذكرة بانتظارك', 'Your first ticket is waiting')}
        </div>
      </div>
    );
  }

  const displayed = showAll ? sessions : sessions.slice(0, 4);

  const formatNum = (num: number) => {
    if (lang === 'ar') {
      return num.toString().replace(/\d/g, d => String.fromCharCode(d.charCodeAt(0) + 1584));
    }
    return num.toString();
  };

  const AR_MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر', 'كانون', 'شباط', 'آذار', 'نيسان', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين', 'أيار'];
  const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'May'];
  
  const parseMonth = (dateStr: string) => {
    // Attempt to extract the month name from the date string.
    // Skip any part containing digits (Arabic or English).
    const parts = dateStr.split(' ');
    let month = parts.find(p => !/\d|[٠-٩]/.test(p) && p.length > 1) || parts[0];
    
    // If the date string only has month and year (e.g. "يوليو ٢٠٢٥"), we want to return just "month".
    if (lang === 'en') {
      const idx = AR_MONTHS.findIndex(m => month.includes(m));
      if (idx !== -1) month = EN_MONTHS[idx];
    }
    return month;
  };

  const translateDate = (dateStr: string) => {
    if (lang === 'ar') return dateStr;
    let res = dateStr;
    AR_MONTHS.forEach((m, idx) => {
      res = res.replace(m, EN_MONTHS[idx]);
    });
    res = res.replace(/[٠-٩]/g, d => String.fromCharCode(d.charCodeAt(0) - 1584));
    return res;
  };

  return (
    <div className={styles.ticketList}>
      {displayed.map((session, idx) => {
        const sessionNum = total - idx;
        const r = idx % 2 === 0 ? '-0.5deg' : '0.5deg';
        
        let seal = null;
        if (sessionNum > 0 && sessionNum % LOYALTY_CONFIG.freeThreshold === 0) {
          seal = t('ورشة مجانية', 'Free Session');
        } else if (sessionNum > 0 && sessionNum % LOYALTY_CONFIG.discountThreshold === 0) {
          seal = t('خصم ٥٠٪', '50% Off');
        }

        const branchText = session.branch 
          ? t(` · فرع ${session.branch === 'Zayouna' ? 'زيونة' : 'اليرموك'}`, ` · ${session.branch} branch`) 
          : '';

        // Fallback for missing or generic placeholder titles
        const displayTitle = (session.note && session.note !== 'جلسة جديدة') 
          ? session.note 
          : t('تلوين الفخار', 'Pottery Workshop');

        return (
          <div key={idx} className={styles.ticketWrap} style={{ '--r': r } as React.CSSProperties}>
            <article className={styles.ticket} aria-label={`Session ${sessionNum}`}>
              <div className={styles.neck}>
                <span className={styles.neckNum}>{formatNum(sessionNum)}</span>
                <span className={styles.neckMonth}>{parseMonth(session.date)}</span>
              </div>
              <div className={styles.main}>
                <div>
                  <h3 className={styles.title}>{displayTitle}</h3>
                  <div className={styles.meta}>
                    <svg className={styles.ticketPin} width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                    </svg>
                    <span>{translateDate(session.date)}{branchText}</span>
                  </div>
                </div>
                {seal && <div className={styles.seal}>{seal}</div>}
              </div>
            </article>
          </div>
        );
      })}
      
      {total > 4 && (
        <button className={styles.more} onClick={() => setShowAll(!showAll)}>
          {showAll ? t('إخفاء', 'Hide') : (lang === 'ar' ? `عرض الكل (${formatNum(total)})` : `Show all (${formatNum(total)})`)}
        </button>
      )}
    </div>
  );
};

export default function ProfilePage() {
  const { currentMember } = useLoyalty();
  const { t } = useLanguage();
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
        <Link href="/" className={styles.backLink} aria-label={t('العودة إلى الرئيسية', 'Back to Home')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{t('الرئيسية', 'Home')}</span>
        </Link>
        <p className={styles.pageLabel}>{t('الملف الشخصي', 'Profile')}</p>
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
          <p className={styles.profileMeta}>{t(`عضو منذ ${member.createdAt}`, `Member since 2025`)}</p>
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



      {/* ── Recent Activity ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.35 }}
        className={styles.activitySection}
        aria-label="ورش تدريبية"
      >
        <h2 className={styles.sectionTitle}>ورش تدريبية</h2>
        <TicketList history={member.history} />
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
