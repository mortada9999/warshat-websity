'use client';

import React from 'react';
import Image from 'next/image';
import AnimatedTapedButton from './AnimatedTapedButton';
import TapedWorkshopCard from './TapedWorkshopCard';
import { useLanguage } from './LanguageProvider';
import { useAdmin } from './AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import { AdminCardOverlay, AdminAddButton, InactiveOverlay } from './AdminOverlay';
import styles from './TrainingSection.module.css';

export default function TrainingSection() {
  const { t } = useLanguage();
  const { isAdmin } = useAdmin();
  const { getByCategory } = useWorkshopStore();

  const workshops = getByCategory('workshop', isAdmin);

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
          {workshops.map((w, index) => (
            <div key={w.id} className="relative">
              <AdminCardOverlay workshop={w} />
              <InactiveOverlay workshop={w} />
              <TapedWorkshopCard workshop={{
                id: index + 1,
                titleAr: w.titleAr,
                titleEn: w.titleEn,
                subtitleAr: w.subtitleAr || '',
                subtitleEn: w.subtitleEn || '',
                descAr: w.descAr || '',
                descEn: w.descEn || '',
                image: w.image,
              }} index={index} />
            </div>
          ))}
        </div>

        {/* Admin Add Button */}
        {isAdmin && (
          <div className="relative z-50 w-full max-w-[800px]">
            <AdminAddButton category="workshop" />
          </div>
        )}

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
