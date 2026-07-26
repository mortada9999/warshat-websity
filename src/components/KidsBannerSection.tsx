'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './KidsBannerSection.module.css';

const PROGRAMS = [
  { id: 1, title: 'اشتراك أسبوعي', sessions: 'جلستان في الأسبوع', ageGroup: '٥–١٢ سنة' },
  { id: 2, title: 'ورش نهاية الأسبوع', sessions: 'السبت والأحد', ageGroup: '٤–١٤ سنة' },
  { id: 3, title: 'اشتراك شهري', sessions: '٨ جلسات شهرياً', ageGroup: '٥–١٢ سنة' },
];

export default function KidsBannerSection() {
  return (
    <section id="kids" className={styles.section} aria-label="ورش الأطفال">

      {/* Left: Content */}
      <div className={styles.contentCol}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={styles.textBlock}
        >
          <p className={styles.eyebrow}>برامج الأطفال</p>
          <h2 className={styles.title}>ورش وأشتراكات الأطفال</h2>
          <p className={styles.subtitle}>
            برامج إبداعية مصممة خصيصاً للأطفال — نبني ثقتهم ونطوّر موهبتهم عبر الفن.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
          }}
          className={styles.programList}
          role="list"
        >
          {PROGRAMS.map((p) => (
            <motion.li
              key={p.id}
              variants={{
                hidden: { opacity: 0, x: -16 },
                show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={styles.programItem}
            >
              <div className={styles.programInfo}>
                <span className={styles.programTitle}>{p.title}</span>
                <span className={styles.programMeta}>{p.sessions}</span>
              </div>
              <span className={styles.ageTag}>{p.ageGroup}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={styles.ctaRow}
        >
          <button className="btn btn-accent" type="button">
            استعرض البرامج
          </button>
        </motion.div>

      </div>

      {/* Right: Image */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={styles.imageCol}
        aria-hidden="true"
      >
        <Image
          src="/images/banner-kids.png"
          alt="ورش فنية للأطفال"
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
        />
      </motion.div>

    </section>
  );
}
