'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import AnimatedUnderline from './AnimatedUnderline';
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
          <div className="w-fit mx-auto flex flex-col items-center">
            <h2 className="font-amiri font-bold text-3xl md:text-6xl text-[#374A00] text-center leading-[120%]">
              {t('ورش و اشتراكات الأطفال', 'Kids Workshops & Subscriptions')}
            </h2>
            <AnimatedUnderline variant={2} strokeColor="#374A00" />
          </div>
        </div>

      </div>
    </section>
  );
}
