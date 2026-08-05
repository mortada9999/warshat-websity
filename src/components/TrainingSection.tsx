'use client';

import React from 'react';
import Image from 'next/image';
import AnimatedTapedButton from './AnimatedTapedButton';
import TapedWorkshopCard from './TapedWorkshopCard';
import styles from './TrainingSection.module.css';

const WORKSHOPS = [
  {
    id: 1,
    titleAr: 'ورشة الفخار',
    titleEn: '',
    subtitle: 'استكشف مهارات تشكيل الطين وتحويله إلى قطع فنية تنبض بالحياة',
    desc: 'سواء كنتم مبتدئين أو تمتلكون خبرة سابقة، ستجدون في قسم الخزف فرصة للتعبير عن أنفسكم وابتكار أعمال فنية فريدة تحمل لمستكم الخاصة.',
    image: '/images/figma/pottery.png',
  },
  {
    id: 2,
    titleAr: '',
    titleEn: 'Lino Cut Printing',
    subtitle: 'تعلم فن الطباعة البارزة واستخراج التصاميم المعقدة',
    desc: 'مساحة إبداعية للتعرف على أدوات الحفر وإنشاء طبعات فنية بلمساتك الخاصة، لا تتطلب خبرة مسبقة.',
    image: '/images/figma/mirror.png',
  },
  {
    id: 3,
    titleAr: '',
    titleEn: 'Needle Felting',
    subtitle: 'شكل الصوف واصنع مجسمات ناعمة ودقيقة',
    desc: 'اكتشف متعة التلبيد بالإبرة، مهارة يدوية مريحة للأعصاب تتيح لك تشكيل الصوف الحر إلى شخصيات وأشكال لطيفة.',
    image: '/images/figma/tote-bag.png',
  },
];

export default function TrainingSection() {
  return (
    <section 
      id="training" 
      className="relative flex flex-col items-center justify-center w-full h-full px-6 md:px-12 bg-[#F6F0E2] pb-48 md:pb-[20vh] z-20"
      aria-label="الورش التدريبية"
    >
      <div className="flex flex-col items-center w-full max-w-[1280px] gap-8 md:gap-12 mt-12 h-full">
        
        {/* Section Heading */}
        <div className="relative flex flex-col items-center justify-center w-full pb-4 z-40">
          <h2 className="font-amiri font-bold text-4xl md:text-5xl text-[#4D6314] text-center leading-[120%] mb-2">
            الورش التدريبية
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
      </div>
    </section>
  );
}
