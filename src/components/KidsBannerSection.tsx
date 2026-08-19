'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import { HiddenWorkshopsMenu } from './HiddenWorkshopsMenu';

export default function KidsBannerSection() {
  const { t } = useLanguage();
  return (
    <section 
      id="kids" 
      className="relative flex flex-col items-center justify-center w-full h-full min-h-screen px-6 md:px-12 bg-[#F6F0E2] overflow-hidden z-20"
      aria-label={t('ورش الأطفال', 'Kids workshops')}
    >
      <HiddenWorkshopsMenu category="kids" />
      {/* Decorative Playful Elements */}
      <div className="absolute top-[10%] left-[5%] md:left-[15%] w-16 h-16 bg-[#FFDF9D] opacity-60 rounded-full blur-xl" aria-hidden="true" />
      <div className="absolute bottom-[20%] right-[5%] md:right-[15%] w-24 h-24 bg-[#C5D475] opacity-60 rounded-full blur-2xl" aria-hidden="true" />

      <div className="flex flex-col items-center w-full max-w-[1280px] h-full justify-center">
        
        {/* Section Heading */}
        <div className="relative flex flex-col items-center justify-center w-full pb-8 md:pb-12 z-40">
          <h2 className="font-amiri font-bold text-3xl md:text-6xl text-[#374A00] text-center leading-[120%] mb-2">
            {t('ورش و اشتراكات الأطفال', 'Kids Workshops & Subscriptions')}
          </h2>
          <svg width="234" height="16" viewBox="0 0 234 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8C77.4833 13.3333 154.967 10.6667 232.45 0" stroke="#C5D475" strokeWidth="3.9245" strokeLinecap="round" />
          </svg>
        </div>

      </div>
    </section>
  );
}
