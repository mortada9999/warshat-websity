'use client';

import React from 'react';
import Image from 'next/image';
import AnimatedTapedButton from './AnimatedTapedButton';
import { useLanguage } from './LanguageProvider';
import { useAdmin } from './AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import { AdminCardOverlay, AdminAddButton, InactiveOverlay } from './AdminOverlay';

export default function RecreationalSection() {
  const { t } = useLanguage();
  const { isAdmin } = useAdmin();
  const { getByCategory } = useWorkshopStore();

  const activities = getByCategory('open_activity');

  return (
    <section 
      id="entertainment" 
      className="relative flex flex-col items-center justify-center w-full h-full px-6 md:px-12 z-20"
      aria-label={t('النشاطات الترفيهية', 'Recreational activities')}
    >
      <div className="flex flex-col items-center w-full max-w-[1280px] gap-8 md:gap-12 mt-12">
        
        {/* Section Header */}
        <div className="relative flex flex-col items-end w-full pb-4 border-b border-[#C5C8B6]/50 z-40">
          {/* Decorative Brush Stroke Blurs */}
          <div className="absolute left-[5%] md:left-[10%] top-0 w-[150px] md:w-[192px] h-[48px] rounded-full bg-[#4D6314]/20 mix-blend-multiply blur-[12px] -z-10" />
          <div className="absolute left-[15%] md:left-[20%] top-4 w-[100px] md:w-[128px] h-[40px] rounded-full bg-[#D9B053]/20 mix-blend-multiply blur-[12px] -z-10" />
          
          <div className="flex flex-col-reverse md:flex-row w-full justify-between items-end gap-2 md:gap-0">
            <a href="#" className="font-ibm-plex font-semibold text-[#A25F00] text-xs md:text-sm uppercase tracking-widest hover:underline flex items-center gap-2 pb-0 md:pb-2">
              {t('عرض الكل', 'View All')}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.10208 5.25H0V4.08333H7.10208L3.83542 0.816667L4.66667 0L9.33333 4.66667L4.66667 9.33333L3.83542 8.51667L7.10208 5.25Z" fill="#A25F00"/>
              </svg>
            </a>
            
            <h2 className="font-amiri font-bold text-3xl md:text-5xl text-[#4D6314] text-right leading-[120%]">
              {t('النشاطات اليومية المفتوحة', 'Open Daily Activities')}
            </h2>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-12 gap-y-12 w-full pb-8">
          {activities.map((act, i) => (
            <div key={act.id} className="flex flex-col items-center justify-start text-center relative pt-4 group">
              
              {/* Admin Controls */}
              <AdminCardOverlay workshop={act} />
              <InactiveOverlay workshop={act} />

              {/* Title positioned at top of card */}
              <h3 className="font-amiri text-base md:text-2xl text-[#374A00] mb-3 h-10 flex items-center justify-center leading-[120%]">
                {t(act.titleAr, act.titleEn)}
              </h3>
              
              {/* Circular Image with Overlay */}
              <div className="relative w-[100px] h-[100px] md:w-[160px] md:h-[160px] rounded-full border-4 border-[#F6F6F4] shadow-md overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={act.image}
                  alt={t(act.titleAr, act.titleEn)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 120px, 160px"
                />
                <div className="absolute inset-0 bg-[#A25F00]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </div>
              
              {/* The GSAP Animated Button (formerly with tape) */}
              <div className="mt-[-40px] z-10 scale-[0.8] md:scale-100 origin-top">
                <AnimatedTapedButton 
                  text={`${act.price || '—'} IQD`} 
                  tapeStyle={i % 3 === 0 ? 'tape1' : i % 2 === 0 ? 'tape2' : 'tape3'}
                />
              </div>

            </div>
          ))}

          {/* Add New Button (admin only) */}
          {isAdmin && (
            <div className="flex items-center justify-center pt-4">
              <AdminAddButton category="open_activity" />
            </div>
          )}
        </div>

        {/* Section Footer - View All CTA */}
        <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-[#C5C8B6]/20 w-full">
          <p className="font-amiri text-lg md:text-xl text-[#597257] text-center">
            {t('المزيد من النشاطات الإبداعية بانتظارك', 'More creative activities await you')}
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#4D6314] text-white font-ibm-plex font-semibold text-sm uppercase tracking-widest rounded-sm shadow-md hover:bg-[#374A00] transition-colors"
          >
            {t('عرض الكل', 'View All')}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L11 6L6 11M10 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
