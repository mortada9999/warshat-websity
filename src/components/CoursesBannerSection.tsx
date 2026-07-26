'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './CoursesBannerSection.module.css';

const COURSES = [
  { id: 1, title: 'الحياكة والتريكو', weeks: '٦ أسابيع', level: 'مبتدئ' },
  { id: 2, title: 'الخياطة اليدوية', weeks: '٤ أسابيع', level: 'متوسط' },
  { id: 3, title: 'فن الكروشيه', weeks: '٥ أسابيع', level: 'مبتدئ' },
];

export default function CoursesBannerSection() {
  return (
    <section id="courses" className={styles.section} aria-label="الكورسات">

      {/* Left: Image */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={styles.imageCol}
        aria-hidden="true"
      >
        <Image
          src="/images/banner-courses.png"
          alt="دورات الحياكة والفنون اليدوية"
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
        />
      </motion.div>

      {/* Right: Content */}
      <div className={styles.contentCol}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={styles.textBlock}
        >
          <p className={styles.eyebrow}>دورات متخصصة</p>
          <h2 className={styles.title}>الكورسات</h2>
          <p className={styles.subtitle}>
            دورات متدرجة المستويات في الحياكة والفنون النسيجية — تعلّم بالتطبيق مع مدربات متخصصات.
          </p>
        </motion.div>

        {/* Course list */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
          }}
          className={styles.courseList}
          role="list"
        >
          {COURSES.map((c) => (
            <motion.li
              key={c.id}
              variants={{
                hidden: { opacity: 0, x: 16 },
                show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={styles.courseItem}
            >
              <div className={styles.courseInfo}>
                <span className={styles.courseTitle}>{c.title}</span>
                <span className={styles.courseMeta}>{c.weeks}</span>
              </div>
              <span className={styles.courseLevel}>{c.level}</span>
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
          <button className="btn btn-primary" type="button">
            استعرض الكورسات
          </button>
        </motion.div>

      </div>

    </section>
  );
}
