'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './page.module.css';

/* ── Animation Variants ─────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const scaleTap = { scale: 0.96 };

/* ── Branch Data ────────────────────────────────────────────────────── */
const BRANCHES = [
  {
    id: 'yarmouk',
    title: 'بغداد - اليرموك',
    branchLabel: 'فرع اليرموك',
    address: 'تقاطع الأردن / فرع الخطوط الجوية العراقية',
    mapUrl: 'https://maps.google.com/?q=33.2925,44.3350',
    icon: '🎨',
    cardClass: styles.cardYarmouk,
    iconClass: styles.iconYarmouk,
    btnClass: styles.btnYarmouk,
  },
  {
    id: 'zayouna',
    title: 'بغداد - زيونة',
    branchLabel: 'فرع الزيونة',
    address: 'شارع الربيعي / عمارة سنتر الموج التجاري - الطابق الرابع',
    mapUrl: 'https://maps.google.com/?q=33.3275,44.4200',
    icon: '✨',
    cardClass: styles.cardZayouna,
    iconClass: styles.iconZayouna,
    btnClass: styles.btnZayouna,
  },
] as const;

const SOCIALS = [
  {
    label: 'Instagram',
    url: 'https://instagram.com/warshat.fann',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    url: 'https://tiktok.com/@warshat.fann',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.88a8.28 8.28 0 004.76 1.5V6.93a4.84 4.84 0 01-1-.24z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    url: 'https://wa.me/9647700000000',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    url: 'https://facebook.com/warshat.fann',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
] as const;

/* ── Page Component ─────────────────────────────────────────────────── */
export default function LocationPage() {
  return (
    <div className={styles.page}>
      {/* Decorative blobs */}
      <div className={styles.blobTop} />
      <div className={styles.blobMid} />
      <div className={styles.blobBottom} />

      <div className={styles.wrapper}>
        {/* ── Logo & Brand ── */}
        <motion.div
          className={styles.logoSection}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <div className={styles.logoFrame}>
            <img src="/images/figma/1logo.png" alt="ورشة فن" className={styles.logoImg} />
          </div>
          <h1 className={styles.brandName}>ورشة فن</h1>
          <span className={styles.brandSub}>مساحة الإبداع والتعلم</span>
        </motion.div>

        {/* ── Divider ── */}
        <motion.div
          className={styles.divider}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        />

        {/* ── Section Label ── */}
        <motion.div
          className={styles.sectionLabel}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <span className={styles.sectionIcon}>📍</span>
          فروعنا
        </motion.div>

        {/* ── Branch Cards ── */}
        <div className={styles.cardsStack}>
          {BRANCHES.map((branch, idx) => (
            <motion.div
              key={branch.id}
              className={`${styles.branchCard} ${branch.cardClass}`}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3 + idx}
            >
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={`${styles.cardIcon} ${branch.iconClass}`}>
                  {branch.icon}
                </div>
                <div>
                  <h2 className={styles.cardTitle}>{branch.title}</h2>
                  <span className={styles.cardBranch}>{branch.branchLabel}</span>
                </div>
              </div>

              {/* Address */}
              <div className={styles.cardDetails}>
                <span className={styles.detailIcon}>📌</span>
                <p className={styles.cardAddress}>{branch.address}</p>
              </div>

              {/* Location Button */}
              <motion.a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.locationBtn} ${branch.btnClass}`}
                whileTap={scaleTap}
                whileHover={{ y: -1 }}
              >
                <span className={styles.btnIcon}>🗺️</span>
                اللوكيشن
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* ── Working Hours ── */}
        <motion.div
          className={styles.hoursCard}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <h3 className={styles.hoursTitle}>🕐 ساعات العمل</h3>
          <p className={styles.hoursText}>
            يومياً من <span className={styles.hoursBold}>١٠ صباحاً</span> لغاية <span className={styles.hoursBold}>١٠ مساءً</span>
          </p>
        </motion.div>

        {/* ── Call Button ── */}
        <motion.a
          href="tel:+9647700000000"
          className={styles.callBtn}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
          whileTap={scaleTap}
        >
          <span className={styles.callIcon}>📞</span>
          اتصل بنا
        </motion.a>

        {/* ── Social Links ── */}
        <motion.div
          className={styles.socialSection}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={7}
        >
          <span className={styles.socialLabel}>تابعونا</span>
          <div className={styles.socialRow}>
            {SOCIALS.map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.label}
                whileTap={scaleTap}
                whileHover={{ y: -3, scale: 1.08 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <p className={styles.footerText}>© ورشة فن ٢٠٢٥ — جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
}
