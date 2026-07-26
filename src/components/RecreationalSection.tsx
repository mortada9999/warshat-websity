'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './RecreationalSection.module.css';

const ACTIVITIES = [
  {
    id: 1,
    title: 'تلوين الفخار',
    description: 'اختر قطعة فخارية وزيّنها بلمستك الخاصة بألوان الأكريليك.',
    price: '١٥,٠٠٠ د.ع',
    image: '/images/activity-pottery.png',
  },
  {
    id: 2,
    title: 'الرسم على الحقائب',
    description: 'حقيبة قماشية جاهزة تحوّلها إلى لوحة فنية تعبّر عنك.',
    price: '١٢,٠٠٠ د.ع',
    image: '/images/activity-totebag.png',
  },
  {
    id: 3,
    title: 'تلوين اللوحات',
    description: 'كانفاس بأحجام مختلفة مع ألوان أكريليك لتفريغ طاقتك الإبداعية.',
    price: '١٠,٠٠٠ د.ع',
    image: '/images/activity-canvas.png',
  },
  {
    id: 4,
    title: 'صناعة الأساور',
    description: 'تشكيلة واسعة من الخرز والأحجار لصنع أساور ومقتنيات مميزة.',
    price: '٨,٠٠٠ د.ع',
    image: '/images/activity-bracelet.png',
  },
];

const inView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

export default function RecreationalSection() {
  return (
    <section id="activities" className={styles.section} aria-label="النشاطات الترفيهية">
      <div className={styles.inner}>

        {/* ── Header ── */}
        <motion.div
          {...inView}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={styles.header}
        >
          <p className={styles.eyebrow}>بدون حجز مسبق</p>
          <h2 className={styles.title}>النشاطات الترفيهية</h2>
          <p className={styles.subtitle}>
            نشاطات فنية حرة يومياً — تعال بوقتك وصمم قطعتك الفنية بلمستك الخاصة.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className={styles.grid}>
          {ACTIVITIES.map((act, i) => (
            <motion.article
              key={act.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{act.title}</h3>
                <p className={styles.cardDesc}>{act.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.price}>{act.price}</span>
                  <span className={styles.tag}>متاح الآن</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.cta}
        >
          <a href="#trainings" className="btn btn-ghost">
            تصفّح الورش التدريبية
          </a>
        </motion.div>

      </div>
    </section>
  );
}
