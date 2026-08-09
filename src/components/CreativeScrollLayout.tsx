'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import styles from './CreativeScrollLayout.module.css';

// تأكد من تسجيل إضافة ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function CreativeScrollLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  // 1. إعداد Lenis ومزامنته بدقة مع GSAP
  useEffect(() => {
    // نهج متقدم: إيقاف الحلقة التلقائية (autoRaf: false) والاعتماد الكامل على GSAP Ticker
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      syncTouch: true,
      touchMultiplier: 2,
    });

    // تحديث ScrollTrigger عند كل تمرير لضمان مزامنة الأنيميشن
    lenis.on('scroll', ScrollTrigger.update);

    // إضافة Lenis إلى قلب محرك GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // إيقاف الـ lagSmoothing لمنع التقطيع (Jitter) أثناء التمرير السريع
    gsap.ticker.lagSmoothing(0);

    return () => {
      // التنظيف عند إزالة المكون
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // استخدام useGSAP الخاص بـ React لمنع مشاكل Strict Mode و Memory Leaks
  useGSAP(() => {
    // استخدام matchMedia لفصل تجربة الكمبيوتر عن الموبايل
    const mm = gsap.matchMedia();

    // 4. التوافق مع الهواتف (Mobile-First): الأكواد التالية ستعمل فقط على الشاشات الكبيرة (الكمبيوتر والتابلت)
    mm.add('(min-width: 768px)', () => {
      
      // 2. تثبيت الأقسام (Section Pinning)
      // نثبت هذا القسم ونقوم بتكبير وإخفاء النص الذي بداخله (Scrub)
      ScrollTrigger.create({
        trigger: '.pinned-section',
        start: 'top top',
        end: '+=100%', // سيظل مثبتاً لمسافة تعادل 100% من ارتفاع الشاشة
        pin: true,
        scrub: true,
        animation: gsap.to('.pinned-element', { scale: 1.5, opacity: 0 }),
      });

      // 3. التمرير الأفقي الوهمي (Horizontal Scroll)
      const cards = gsap.utils.toArray('.horizontal-card');
      if (cardsWrapperRef.current && horizontalSectionRef.current) {
        
        // حساب المسافة الكلية التي يجب تحريك البطاقات فيها
        // مثلاً: إذا كان لدينا 4 بطاقات، سنتحرك بنسبة 300% لليسار (-100 * (4 - 1))
        const totalMovement = -100 * (cards.length - 1);
        
        gsap.to(cards, {
          xPercent: totalMovement,
          ease: 'none', // يجب أن تكون none لكي ترتبط الحركة بالتمرير مباشرة وبخط مستقيم
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            start: 'top top',
            end: () => `+=${cardsWrapperRef.current?.scrollWidth}`, // نهاية الحركة تعتمد على العرض الحقيقي للبطاقات
            pin: true,      // تثبيت القسم بالكامل حتى ننتهي من عرض كل البطاقات أفقياً
            scrub: 1,       // نعومة قدرها ثانية واحدة ليعطي إحساساً إبداعياً وثقيلاً نوعاً ما
            invalidateOnRefresh: true, // مهم جداً لإعادة الحساب عند تغيير مقاس الشاشة (Resize)
          }
        });
      }
    });

    // في الشاشات الصغيرة (<768px)، سيعمل الموقع بشكل طبيعي عمودياً (بفضل التصميم في الـ CSS Module) 
    // ولن يقوم GSAP بأي Pinning لأننا بداخل matchMedia

    return () => {
      mm.revert();
    };
  }, { scope: containerRef }); // حصر الاستعلامات (Selectors) داخل هذا المكون فقط

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      
      {/* قسم عادي للافتتاحية */}
      <section className={`${styles.section} ${styles.normalSection}`}>
        <h1>ورشة فن (عالم الإبداع)</h1>
        <p>قم بالتمرير للأسفل لتبدأ الرحلة السحرية...</p>
      </section>

      {/* قسم التثبيت Pinning */}
      <section className={`${styles.section} ${styles.pinnedSection} pinned-section`}>
        <div className="pinned-element">
          <h2>مرحباً بك في عالمنا</h2>
          <p>هذا القسم ثابت حتى تنتهي الحركة تماماً!</p>
        </div>
      </section>

      {/* قسم التمرير الأفقي */}
      <section ref={horizontalSectionRef} className={styles.horizontalSection}>
        <div ref={cardsWrapperRef} className={styles.cardsWrapper}>
          <div className={`${styles.card} horizontal-card`} style={{ backgroundColor: '#ff6b6b' }}>
            <span>الفعاليات</span>
          </div>
          <div className={`${styles.card} horizontal-card`} style={{ backgroundColor: '#4ecdc4' }}>
            <span>ورش العمل</span>
          </div>
          <div className={`${styles.card} horizontal-card`} style={{ backgroundColor: '#45b7d1' }}>
            <span>الفنون</span>
          </div>
          <div className={`${styles.card} horizontal-card`} style={{ backgroundColor: '#f9ca24' }}>
            <span>الابتكار</span>
          </div>
        </div>
      </section>

      {/* قسم نهاية الصفحة */}
      <section className={`${styles.section} ${styles.normalSection}`}>
        <h1>هكذا تصنع الإبداع!</h1>
        <p>مرحباً بك في عصر الويب الحديث.</p>
      </section>
      
    </div>
  );
}
