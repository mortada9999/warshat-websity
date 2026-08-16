'use client';

import React from 'react';
import Image from 'next/image';
import AnimatedTapedButton from './AnimatedTapedButton';
import TapedWorkshopCard from './TapedWorkshopCard';
import { useLanguage } from './LanguageProvider';
import styles from './TrainingSection.module.css';

const WORKSHOPS = [
  {
    id: 1,
    titleAr: 'ورشة الفخار',
    titleEn: 'Pottery Workshop',
    subtitleAr: 'استكشف مهارات تشكيل الطين وتحويله إلى قطع فنية تنبض بالحياة',
    subtitleEn: 'Explore clay shaping and turn it into lively art pieces',
    descAr: 'سواء كنتم مبتدئين أو تمتلكون خبرة سابقة، ستجدون في قسم الخزف فرصة للتعبير عن أنفسكم وابتكار أعمال فنية فريدة تحمل لمستكم الخاصة.',
    descEn: 'Whether you are a beginner or have prior experience, the pottery section gives you a chance to express yourself and create unique works with your own touch.',
    image: '/images/figma/pottery.png',
  },
  {
    id: 2,
    titleAr: 'الطباعة باللينو',
    titleEn: 'Lino Cut Printing',
    subtitleAr: 'تعلم فن الطباعة البارزة واستخراج التصاميم المعقدة',
    subtitleEn: 'Learn relief printing and carve intricate designs',
    descAr: 'مساحة إبداعية للتعرف على أدوات الحفر وإنشاء طبعات فنية بلمساتك الخاصة، لا تتطلب خبرة مسبقة.',
    descEn: 'A creative space to explore carving tools and create prints with your own touch — no prior experience needed.',
    image: '/images/figma/mirror.png',
  },
  {
    id: 3,
    titleAr: 'تلبيد الصوف بالإبرة',
    titleEn: 'Needle Felting',
    subtitleAr: 'شكل الصوف واصنع مجسمات ناعمة ودقيقة',
    subtitleEn: 'Shape wool into soft, detailed figurines',
    descAr: 'اكتشف متعة التلبيد بالإبرة، مهارة يدوية مريحة للأعصاب تتيح لك تشكيل الصوف الحر إلى شخصيات وأشكال لطيفة.',
    descEn: 'Discover the joy of needle felting — a relaxing craft that lets you shape loose wool into cute characters and forms.',
    image: '/images/figma/tote-bag.png',
  },
];

export default function TrainingSection() {
  const { t } = useLanguage();
  return (
    <section 
      id="training" 
      className="relative flex flex-col items-center justify-center w-full h-full px-6 md:px-12 bg-[#F6F0E2] z-20"
      aria-label={t('الورش التدريبية', 'Training workshops')}
    >
      <div className="flex flex-col items-center w-full max-w-[1280px] gap-8 md:gap-12 mt-8 md:mt-12 h-full">
        
        {/* Section Heading */}
        <div className="relative flex flex-col items-center justify-center w-full pb-4 z-40">
          <h2 className="font-amiri font-bold text-3xl md:text-5xl text-[#4D6314] text-center leading-[120%] mb-2">
            {t('الورش التدريبية', 'Training Workshops')}
          </h2>
          {/* Curved Line under heading */}
          <svg width="234" height="16" viewBox="0 0 234 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8C77.4833 13.3333 154.967 10.6667 232.45 0" stroke="#4D6314" strokeWidth="3.9245" strokeLinecap="round" />
          </svg>
        </div>

        {/* Workshop Cards List */}
        <div className={styles.workshopList}>
          {WORKSHOPS.map((w, index) => (
            <TapedWorkshopCard key={w.id} workshop={w} index={index} />
          ))}
        </div>

        {/* Section Footer - Booking CTA */}
        <div className="flex flex-col items-center gap-4 mt-8 md:mt-12 pt-6 md:pt-8 w-full">
          <div className="w-16 h-[2px] bg-[#A25F00]/30" />
          <p className="font-amiri text-xl md:text-2xl text-[#374A00] text-center">
            {t('احجز مكانك في الورشة القادمة', 'Book your spot in the next workshop')}
          </p>
          <a
            href="#book"
            className="inline-flex items-center gap-2 px-10 py-3 bg-[#A25F00] text-white font-ibm-plex font-semibold text-sm uppercase tracking-widest rounded-sm shadow-md hover:bg-[#7D4A00] transition-colors"
          >
            {t('احجز الآن', 'Book Now')}
          </a>
        </div>
      </div>
    </section>
  );
}
