'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { useAdmin } from '@/components/AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import { AdminCardOverlay, AdminAddButton, InactiveOverlay } from '@/components/AdminOverlay';
import AnimatedUnderline from '@/components/AnimatedUnderline';
import TornEdge from '@/components/TornEdge';
import KidsDoodles from './KidsDoodles';
import { useBooking } from '@/components/BookingProvider';
import styles from './KidsPage.module.css';



/* ════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════ */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function KidsPage() {
  const { t } = useLanguage();
  const { openBooking } = useBooking();
  const { isAdmin } = useAdmin();
  const { getByCategory } = useWorkshopStore();
  const kidsCourses = getByCategory('kids_course', false);
  const kidsWorkshops = getByCategory('kids_workshop', false);

  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.stackable-section') as HTMLElement[];
    sections.forEach((section, index) => {
      if (index === sections.length - 1) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'bottom bottom',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    });
    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <main dir={t('rtl', 'ltr')} ref={containerRef} className={`relative z-10 bg-[#F6F6F4] shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${styles.kidsWrapper}`}>
      <div className="w-full overflow-hidden">

        <div className="stackable-section relative w-full" style={{ backgroundColor: '#F6F0E2', zIndex: 10, minHeight: '100svh' }}>
          {/* ══ HERO ═════════════════════════════════════════════ */}
          <section className={styles.hero}>
            {/* Static Decorative Element 12 */}

            <p className={styles.heroLabel}>
              {t('ورشة فن — قسم الأطفال', 'WARSHAT FAN — KIDS DEPT')}
            </p>

 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
  {/* Cute doodles anchored to the underline, as if walking on it */}
  <KidsDoodles count={4} seed={33} />
  
  {/* الصندوق السحري: يغلف النص فقط ولا يأخذ عرض الشاشة بالكامل */}
  <div className="relative inline-flex flex-col items-center">
    
    <h1 className={styles.heroTitle} style={{ textAlign: 'center' }}>
      {t('ورش', 'Workshops')}{' '}
      <span className={styles.hl}>{t('واشتراكات', '& Courses')}</span>
      <br />
      {t('الأطفال', 'for Kids')}
    </h1>
    
    <AnimatedUnderline variant={2} strokeColor="#374A00" className="mt-2 translate-y-1 w-full" />
    
    {/* الأرانب تقيس مسافتها من حدود النص فقط، لذلك يستحيل أن تهرب للأطراف */}
    <img 
      id="deco-12" 
      src="/images/kids/12.png" 
      alt="Deco 12" 
      className="absolute z-20 pointer-events-none w-32 md:w-48
                 -bottom-10 md:-bottom-10
                 ltr:right-0 md:ltr:-right-8
                 rtl:left-0 md:rtl:-left-8" 
    />
    
  </div>
</div>



            <div className={styles.heroBtns}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('workshops');
                  if (el) {
                    // @ts-ignore
                    const lenis = window.__lenis;
                    if (lenis) {
                      lenis.scrollTo(el, { offset: -20, duration: 1.2 });
                    } else {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className={styles.btnDark}
              >
                {t('الورش الأسبوعية', 'Weekly Workshops')}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('courses');
                  if (el) {
                    // @ts-ignore
                    const lenis = window.__lenis;
                    if (lenis) {
                      lenis.scrollTo(el, { offset: -20, duration: 1.2 });
                    } else {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className={styles.btnOutline}
              >
                {t('الكورسات والاشتراكات', 'Courses')}
              </button>
            </div>
          </section>

          <img
            id="deco-9"
            src="/images/kids/9.png"
            alt="Deco 9"
            className="absolute z-20 pointer-events-none w-28
             ltr:top-161 ltr:right-70
             rtl:top-164 rtl:left-70"
          />
          {/* باقة الزهور والفراشات المدمجة - صورة واحدة فائقة الدقة لا تتفكك أبداً */}
          <img
            id="deco-bouquet"
            src="/images/kids/bouquet2.png"
            alt="Bouquet"
          className="absolute z-20 pointer-events-none w-[440px] md:w-[550px]
           left-1/2 -translate-x-1/2 -bottom-12 md:-bottom-30"
          />
          {/* ══ STATS STRIP ══════════════════════════════════════ */}
          <div className={styles.statsStrip}>
            {[
              { nAr: '+٢٠٠', nEn: '200+', lAr: 'طفل مسجّل', lEn: 'Kids Enrolled' },
              { nAr: '٣', nEn: '3', lAr: 'ورش أسبوعية', lEn: 'Workshops' },
              { nAr: '٤', nEn: '4', lAr: 'كورسات', lEn: 'Courses' },
              { nAr: '+٤', nEn: '4+', lAr: 'سنوات خبرة', lEn: 'Yrs Exp.' },
            ].map((s, i) => (
              <div key={i} className={styles.statItem}>
                <span className={styles.statNum}>{t(s.nAr, s.nEn)}</span>
                <span className={styles.statLabel}>{t(s.lAr, s.lEn)}</span>
              </div>
            ))}
          </div>

          {/* ══ WORKSHOPS (Connected normally below Stats) ═════════════════════════════════════════ */}
          <section id="workshops" className={styles.sectionWhite} style={{ paddingBottom: 'calc(4rem + 60svh)' }}>
            {/* Scattered cute doodles on workshops */}

            <div className={styles.sectionInner}>
              <p className={styles.sectionLabel}>
                {t('الورش الأسبوعية', 'WEEKLY WORKSHOPS')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.5rem' }}>
                {/* الصندوق النسبي: يقيد الصورة بحدود العنوان فقط مثل الأرنب */}
                <div className="relative inline-flex flex-col items-center">
                  <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>
                    {t('نشاطات', 'Activities')}{' '}
                    <span className={styles.hl}>{t('مستمرة ومرنة', 'Ongoing & Flexible')}</span>
                  </h2>
                  <AnimatedUnderline variant={2} strokeColor="#374A00" className="mt-2 translate-y-1 w-full" />
                  
                  {/* الكائنات اللطيفة 13 جالسة فوق الجزء الأصفر مباشرة */}
                  <img
                    id="deco-13"
                    src="/images/kids/13.png"
                    alt="Deco 13"
                    className="absolute z-20 pointer-events-none w-26 md:w-32
                               -top-12 md:-top-9
                               ltr:right-3 md:ltr:right-4
                               rtl:left-1 md:rtl:left-4"
                  />
                </div>
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
                        <button
                          onClick={() => openBooking(c)}
                          className={styles.cardBtn}
                        >
                          {t('سجّل الآن', 'Enroll Now')}
                        </button>
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
        </div>
      </div>

      {/* ══ SECTION 2: COURSES ═════════════════════════════════════════════ */}
      <div className="stackable-section relative w-full" style={{ backgroundColor: '#F6F0E2', zIndex: 20, minHeight: '100svh', paddingBottom: '0' }}>
        <TornEdge color="#F6F0E2" seed={4} isNotebook={false} />
        <section id="courses" className={styles.section}>
          {/* Scattered cute doodles on courses */}
          <KidsDoodles count={5} seed={99} />
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
                      <button
                        onClick={() => openBooking(c)}
                        className={styles.cardBtn}
                      >
                        {t('سجّل الآن', 'Enroll Now')}
                      </button>
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



      </div>

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
