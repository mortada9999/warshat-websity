'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './RecreationalSection.module.css';

const ACTIVITIES = [
  { id: 1,  title: 'تلوين الفخار',     price: '١٥,٠٠٠',  image: '/images/activity-pottery.png' },
  { id: 2,  title: 'الرسم على الحقائب', price: '١٢,٠٠٠',  image: '/images/activity-totebag.png' },
  { id: 3,  title: 'تلوين اللوحات',    price: '١٠,٠٠٠',  image: '/images/activity-canvas.png' },
  { id: 4,  title: 'صناعة الأكسسوار',  price: '٨,٠٠٠',   image: '/images/activity-bracelet.png' },
  { id: 5,  title: 'صناعة المجلة الفنية', price: '١١,٠٠٠', image: '/images/activity-pottery.png' },
  { id: 6,  title: 'الرسم بالألوان',   price: '٩,٠٠٠',   image: '/images/activity-canvas.png' },
  { id: 7,  title: 'الرسم بالرمل',     price: '١٢,٠٠٠',  image: '/images/activity-totebag.png' },
  { id: 8,  title: 'صنع الزرع',        price: '١٣,٠٠٠',  image: '/images/activity-bracelet.png' },
];

export default function RecreationalSection() {
  return (
    <section id="activities" className={styles.section} aria-label="النشاطات الترفيهية">
      <div className={styles.inner}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={styles.header}
        >
          <p className={styles.viewAll}>View All →</p>
          <h2 className={styles.title}>النشاطات الترفيهية المفتوحة</h2>
        </motion.div>

        {/* ── Circle cards grid ── */}
        <div className={styles.grid}>
          {ACTIVITIES.map((act, i) => (
            <motion.article
              key={act.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={styles.card}
            >
              <div className={styles.circle}>
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  className={styles.image}
                  sizes="140px"
                  loading="lazy"
                />
              </div>
              <h3 className={styles.cardTitle}>{act.title}</h3>
              <p className={styles.cardPrice}>{act.price} د.ع</p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
