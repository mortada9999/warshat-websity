'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { useAdmin } from '@/components/AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import { AdminCardOverlay, AdminAddButton, InactiveOverlay } from '@/components/AdminOverlay';
import AnimatedUnderline from '@/components/AnimatedUnderline';
import styles from './KidsPage.module.css';



/* ════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════ */
export default function KidsPage() {
  const { t } = useLanguage();
  const { isAdmin } = useAdmin();
  const { getByCategory } = useWorkshopStore();
  const kidsCourses = getByCategory('kids_course', false);
  const kidsWorkshops = getByCategory('kids_workshop', false);

  return (
    <main dir="rtl">

      {/* ══ HERO ═════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <p className={styles.heroLabel}>
          {t('ورشة فن — قسم الأطفال', 'WARSHAT FAN — KIDS DEPT')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 className={styles.heroTitle}>
            {t('ورش', 'Workshops')}{' '}
            <span className={styles.hl}>{t('واشتراكات', '& Courses')}</span>
            <br />
            {t('الأطفال', 'for Kids')}
          </h1>
          <AnimatedUnderline variant={2} strokeColor="#374A00" className="mt-2 translate-y-1" />
        </div>

        <p className={styles.heroSub}>
          {t(
            'مكان آمن وممتع يكتشف فيه طفلك موهبته الفنية — مع مدربين متخصصين.',
            'A safe and fun place where your child discovers their artistic talent with expert instructors.',
          )}
        </p>

        <div className={styles.heroBtns}>
          <a href="#workshops" className={styles.btnDark}>
            {t('الورش الأسبوعية', 'Weekly Workshops')}
          </a>
          <a href="#courses" className={styles.btnOutline}>
            {t('الكورسات والاشتراكات', 'Courses')}
          </a>
        </div>
      </section>

      {/* ══ STATS STRIP ══════════════════════════════════════ */}
      <div className={styles.statsStrip}>
        {[
          { nAr: '+٢٠٠', nEn: '200+', lAr: 'طفل مسجّل',     lEn: 'Kids Enrolled' },
          { nAr: '٣',    nEn: '3',    lAr: 'ورش أسبوعية',  lEn: 'Workshops' },
          { nAr: '٤',    nEn: '4',    lAr: 'كورسات',        lEn: 'Courses' },
          { nAr: '+٤',   nEn: '4+',   lAr: 'سنوات خبرة',    lEn: 'Yrs Exp.' },
        ].map((s, i) => (
          <div key={i} className={styles.statItem}>
            <span className={styles.statNum}>{t(s.nAr, s.nEn)}</span>
            <span className={styles.statLabel}>{t(s.lAr, s.lEn)}</span>
          </div>
        ))}
      </div>

      {/* ══ WORKSHOPS ═════════════════════════════════════════ */}
      <section id="workshops" className={styles.sectionWhite}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>
            {t('الورش الأسبوعية', 'WEEKLY WORKSHOPS')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h2 className={styles.sectionTitle}>
              {t('نشاطات', 'Activities')}{' '}
              <span className={styles.hl}>{t('مستمرة ومرنة', 'Ongoing & Flexible')}</span>
            </h2>
            <AnimatedUnderline variant={2} strokeColor="#374A00" className="mt-2 translate-y-1" />
          </div>
          <p className={styles.sectionSub}>
            {t(
              'لا تحتاج إلى التزام طويل الأمد، مناسبة جداً لتجربة أنشطة فنية ممتعة في عطلة نهاية الأسبوع.',
              'No long-term commitment needed, great for a weekend art activity.',
            )}
          </p>

          <div className={styles.cardStack}>
            {kidsWorkshops.map((c, index) => (
              <div key={c.id} style={{ position: 'relative' }}>
                <AdminCardOverlay workshop={c} />
                <InactiveOverlay workshop={c} />
                <article className={styles.courseCard}>
                  {/* Image area */}
                  <div className={styles.cardImage}>
                    {c.image ? (
                      <img src={c.image} alt={t(c.titleAr, c.titleEn)} className={styles.cardImg} />
                    ) : (
                      <div className={styles.cardImgPlaceholder}>
                        <span>{t('أضف صورة', 'Add Image')}</span>
                      </div>
                    )}
                  </div>

                  {/* Number circle */}
                  <div className={styles.cardNum}>{index + 1}</div>

                  {/* Head row */}
                  <div className={styles.cardHead}>
                    <h3 className={styles.cardTitle}>{t(c.titleAr, c.titleEn)}</h3>
                    {c.pattern === 'featured' && (
                      <span className={styles.popularBadge}>
                        {t('الأكثر طلباً', 'Most Popular')}
                      </span>
                    )}
                  </div>

                  <p className={styles.cardMeta}>{t(c.subtitleAr || '', c.subtitleEn || '')}</p>
                  <p className={styles.cardDesc}>{t(c.descAr || '', c.descEn || '')}</p>

                  <hr className={styles.cardDivider} />

                  <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>
                      {c.price ? `${c.price.toLocaleString()} د.ع` : t('تواصل معنا', 'Contact Us')}
                    </span>
                    <a
                      href="https://wa.me/9647705874761"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardBtn}
                    >
                      {t('سجّل الآن', 'Enroll Now')}
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
          
          {isAdmin && (
            <div style={{ marginTop: '2rem' }}>
              <AdminAddButton category="kids_workshop" />
            </div>
          )}
        </div>
      </section>

      {/* ══ COURSES ═════════════════════════════════════════════ */}
      <section id="courses" className={styles.section}>
        <div className={styles.sectionInner}>

          <p className={styles.sectionLabel}>
            {t('الكورسات والاشتراكات', 'COURSES')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h2 className={styles.sectionTitle}>
              {t('تأسيس', 'Foundation')}{' '}
              <span className={styles.hl}>{t('وتطوير مهارات', '& Skill Building')}</span>
            </h2>
            <AnimatedUnderline variant={1} strokeColor="#374A00" className="mt-2 translate-y-1" />
          </div>
          <p className={styles.sectionSub}>
            {t(
              'برامج متكاملة — يخرج منها طفلك بمهارة حقيقية وعمل فني يفخر به.',
              'Comprehensive programs — your child leaves with a real skill and artwork to be proud of.',
            )}
          </p>

          <div className={styles.cardStack}>
            {kidsCourses.map((c, index) => (
              <div key={c.id} style={{ position: 'relative' }}>
                <AdminCardOverlay workshop={c} />
                <InactiveOverlay workshop={c} />
                <article className={styles.courseCard}>
                  {/* Image area */}
                  <div className={styles.cardImage}>
                    {c.image ? (
                      <img src={c.image} alt={t(c.titleAr, c.titleEn)} className={styles.cardImg} />
                    ) : (
                      <div className={styles.cardImgPlaceholder}>
                        <span>{t('أضف صورة', 'Add Image')}</span>
                      </div>
                    )}
                  </div>

                  {/* Number circle */}
                  <div className={styles.cardNum}>{index + 1}</div>

                  {/* Head row */}
                  <div className={styles.cardHead}>
                    <h3 className={styles.cardTitle}>{t(c.titleAr, c.titleEn)}</h3>
                    {c.pattern === 'featured' && (
                      <span className={styles.popularBadge}>
                        {t('الأكثر طلباً', 'Most Popular')}
                      </span>
                    )}
                  </div>

                  <p className={styles.cardMeta}>{t(c.subtitleAr || '', c.subtitleEn || '')}</p>
                  <p className={styles.cardDesc}>{t(c.descAr || '', c.descEn || '')}</p>

                  <hr className={styles.cardDivider} />

                  <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>
                      {c.price ? `${c.price.toLocaleString()} د.ع` : t('تواصل معنا', 'Contact Us')}
                    </span>
                    <a
                      href="https://wa.me/9647705874761"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardBtn}
                    >
                      {t('سجّل الآن', 'Enroll Now')}
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
          
          {isAdmin && (
            <div style={{ marginTop: '2rem' }}>
              <AdminAddButton category="kids_course" />
            </div>
          )}

          {/* Dashed help CTA */}
          <div className={styles.ctaBox} style={{ marginTop: '3rem' }}>
            <p className={styles.ctaText}>
              {t(
                'لا تعرف أي كورس يناسب طفلك؟ تواصل معنا على واتساب وسنساعدك في اختيار البرنامج المناسب.',
                "Not sure which course fits your child? Contact us on WhatsApp and we'll help you choose the right program.",
              )}
            </p>
            <a
              href="https://wa.me/9647705874761"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnDark}
            >
              {t('تواصل معنا', 'Contact Us')}
            </a>
          </div>
        </div>
      </section>



      {/* ══ FOOTER ═══════════════════════════════════════════ */}
      <footer className={styles.footer}>
        <span className={styles.footerText}>
          {t('ورشة فن — بغداد، العراق', 'Warshat Fan — Baghdad, Iraq')} · {new Date().getFullYear()}
        </span>
        <Link href="/" className={styles.footerLink}>
          {t('الرئيسية', 'Home')}
        </Link>
      </footer>
    </main>
  );
}
