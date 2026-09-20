'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from './LanguageProvider';
import { useAdmin } from './AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import { AdminCardOverlay, AdminAddButton, InactiveOverlay } from './AdminOverlay';
import { HiddenWorkshopsMenu } from './HiddenWorkshopsMenu';
import AnimatedUnderline from './AnimatedUnderline';
import styles from './CoursesBannerSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Barcode visual ── */
const BAR_WIDTHS = [3,1,2,1,3,2,1,2,1,3,1,2,3,1,2,1,3,2,1,2,3,1,2,1,3,2,1,3,1,2,3,1,2,1,3,1,2,2,1,3];

function Barcode() {
  return (
    <div className={styles.barcode} aria-hidden="true">
      {BAR_WIDTHS.map((w, i) => (
        <span key={i} style={{ width: `${w * 2.5}px` }} />
      ))}
    </div>
  );
}

/* ── Metal capsule with slit ── */
function MetalCapsule() {
  return (
    <div className={styles.metalCapsule}>
      <div className={styles.bolt} />
      <div className={styles.slitOpening} />
      <div className={styles.bolt} />
    </div>
  );
}



export default function CoursesBannerSection() {
  const { t, lang } = useLanguage();
  const { isAdmin } = useAdmin();
  const { getByCategory } = useWorkshopStore();
  const sectionRef = useRef<HTMLElement>(null);

  const courses = getByCategory('course', false);

  // GSAP scrub: tickets slide out of slot on scroll-down, retract on scroll-up
  useGSAP(() => {
    const wrappers = sectionRef.current?.querySelectorAll<HTMLElement>('[data-slot-wrapper]');
    if (!wrappers?.length) return;

    wrappers.forEach((wrapper) => {
      const ticket = wrapper.querySelector<HTMLElement>('[data-ticket]');
      if (!ticket) return;

      // Start: ticket fully hidden above (inside capsule)
      gsap.set(ticket, { yPercent: -100 });

      // Scrub: slides fully out on scroll-down, goes back in on scroll-up
      gsap.to(ticket, {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 85%',
          end: 'top 15%',
          scrub: 1.5,
        },
      });
    });
  }, { scope: sectionRef, dependencies: [courses] });

  const getFeatures = (course: ReturnType<typeof getByCategory>[0]): string[] => {
    const list: string[] = [];
    if (course.sessionsAr) list.push(t(course.sessionsAr, course.sessionsEn || ''));
    
    const customFeatures = lang === 'ar' ? course.featuresAr : (course.featuresEn || course.featuresAr);
    
    if (customFeatures && customFeatures.length > 0) {
      list.push(...customFeatures);
    } else {
      if (list.length < 2) list.push(t('شهادة إتمام الكورس', 'Completion certificate'));
      if (list.length < 3) list.push(t('مشرف فني متخصص', 'Specialist art instructor'));
    }
    
    return list;
  };

  const getBadge = (course: ReturnType<typeof getByCategory>[0]): string => {
    if (course.sessionsAr) return t(course.sessionsAr, course.sessionsEn || '');
    return t('متاح الآن', 'Available Now');
  };

  return (
    <section
      ref={sectionRef}
      id="courses"
      className={styles.coursesSection}
      aria-label={t('الكورسات', 'Courses')}
    >
      <HiddenWorkshopsMenu category="course" />



      {/* ── Section Heading (Jagged Paper) ── */}
      <div className={styles.headingArea}>
        <p className={styles.headingLabel}>{t('اختر الكورس المناسب لك', 'Pick The Perfect Course')}</p>
        <div className={styles.headingPaper}>
          <h2 className={styles.headingMain}>
            {t('الكورسات', 'Courses')}
          </h2>
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div className={styles.cardsGrid}>
        {courses.map((course) => {
          const features = getFeatures(course);
          return (
            <div
              key={course.id}
              className={styles.slotWrapper}
              data-slot-wrapper
            >
              {/* Admin */}
              <div style={{ position: 'relative', width: '100%' }}>
                <AdminCardOverlay workshop={course} />
                <InactiveOverlay workshop={course} />
              </div>

              {/* Metal capsule slot */}
              <MetalCapsule />

              {/* Receipt ticket wrapper for clipping */}
              <div className={styles.ticketMask}>
                {/* Receipt ticket — animated by GSAP */}
                <div className={styles.ticket} data-ticket>

                  {/* Coloured ribbon badge */}
                  <span className={styles.badge}>{getBadge(course)}</span>

                  {/* Title */}
                  <p className={styles.courseName}>{t(course.titleAr, course.titleEn)}</p>
                  <p className={styles.courseNameEn}>{t(course.titleEn, course.titleAr)}</p>

                  {/* Image Area */}
                  <div className={styles.cardImageWrap}>
                    <Image
                      src={course.image}
                      alt={course.titleAr}
                      fill
                      className={styles.cardImage}
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>

                  <hr className={styles.divider} />

                  {/* Features */}
                  <ul className={styles.featuresList}>
                    {features.map((f, fi) => (
                      <li key={fi} className={styles.featureItem}>
                        <span className={styles.featureBullet} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <hr className={styles.divider} />

                  {/* CTA */}
                  <a href="#book" className={styles.ctaBtn}>
                    {t('احجز الآن', 'Book Now')}
                  </a>

                  <hr className={styles.divider} />

                  {/* Price (outline style) moved to bottom */}
                  {course.price && (
                    <div className={styles.priceRow}>
                      <span className={styles.priceFrom}>{t('السعر:', 'Price:')}</span>
                      <span className={styles.priceValue}>{course.price}</span>
                      <span className={styles.priceCurrency}>IQD</span>
                    </div>
                  )}

                  <Barcode />
                </div>
              </div>
            </div>
          );
        })}

        {/* Admin add */}
        {isAdmin && (
          <div className={styles.slotWrapper} data-slot-wrapper>
            <MetalCapsule />
            <div className={styles.ticketMask}>
              <div className={styles.ticket} data-ticket style={{ paddingBottom: '2rem' }}>
                <AdminAddButton category="course" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── WhatsApp Horizontal Ticket ── */}
      <div className={styles.whatsappWrapper}>
        <div className={styles.whatsappTicket}>
          <div className={styles.whatsappContent}>
            <h3 className={styles.whatsappTitle}>
              <span className={styles.whatsappTitleMain}>{t('عندك استفسار عن الكورسات؟', 'Questions about our courses?')}</span>
              <span className={styles.whatsappTitleScript}>{t('تواصل معنا على الواتساب', 'Contact us on WhatsApp')}</span>
            </h3>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
              {t('اضغط هنا لمراسلتنا لمعرفة كافة التفاصيل', 'Click here to message us for all details')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
