'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './TrainingSection.module.css';

const TRAININGS = [
  {
    id: 1,
    title: 'أساسيات فن التطريز',
    instructor: 'مريم أحمد',
    duration: '٣ أيام — ساعتان يومياً',
    price: '٣٥,٠٠٠ د.ع',
    image: '/images/workshop-embroidery.png',
    seats: '٦ أماكن متبقية',
  },
  {
    id: 2,
    title: 'نحت الطين الاحترافي',
    instructor: 'علي باسم',
    duration: 'يومان — ٣ ساعات يومياً',
    price: '٤٠,٠٠٠ د.ع',
    image: '/images/workshop-clay.png',
    seats: '٤ أماكن متبقية',
  },
  {
    id: 3,
    title: 'الرسم الزيتي للمبتدئين',
    instructor: 'سارة محمد',
    duration: '٤ أيام — ساعتان يومياً',
    price: '٤٥,٠٠٠ د.ع',
    image: '/images/workshop-oilpaint.png',
    seats: '٨ أماكن متبقية',
  },
];

export default function TrainingSection() {
  return (
    <section id="trainings" className={styles.section} aria-label="الورش التدريبية">
      <div className={styles.inner}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={styles.header}
        >
          <p className={styles.eyebrow}>أماكن محدودة</p>
          <h2 className={styles.title}>الورش التدريبية</h2>
          <p className={styles.subtitle}>
            تعلّم فنوناً جديدة بخطوات عملية مع مدربين متخصصين. احجز مكانك الآن.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className={styles.grid}>
          {TRAININGS.map((w, i) => (
            <motion.article
              key={w.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={w.image}
                  alt={w.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className={styles.seatsTag}>{w.seats}</div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{w.title}</h3>
                <div className={styles.meta}>
                  <span className={styles.instructor}>{w.instructor}</span>
                  <span className={styles.separator} aria-hidden="true" />
                  <span className={styles.duration}>{w.duration}</span>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.price}>{w.price}</span>
                  <button className="btn btn-accent btn-sm" type="button">
                    احجز الآن
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
