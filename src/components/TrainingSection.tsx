'use client';

import React from 'react';
import Image from 'next/image';
import AnimatedTapedButton from './AnimatedTapedButton';
import AnimatedUnderline from './AnimatedUnderline';
import TapedWorkshopCard from './TapedWorkshopCard';
import { useLanguage } from './LanguageProvider';
import { useAdmin } from './AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import { AdminCardOverlay, AdminAddButton, InactiveOverlay } from './AdminOverlay';
import { HiddenWorkshopsMenu } from './HiddenWorkshopsMenu';
import styles from './TrainingSection.module.css';

export default function TrainingSection() {
  const { t } = useLanguage();
  const { isAdmin } = useAdmin();
  const { getByCategory } = useWorkshopStore();

  const workshops = getByCategory('workshop', false);

  return (
    <section
  id="training"
  className="relative flex flex-col items-center w-full px-6 md:px-12 pt-2 md:pt-4 z-20"
  aria-label={t('الورش التدريبية', 'Training workshops')}
>
      <HiddenWorkshopsMenu category="workshop" />

      {/* ── Torn Paper SVG Definitions ── */}
      <svg preserveAspectRatio="none" aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, zIndex: -1 }}>
        <symbol id="symbol_tornpaper">
          <filter id="filter_tornpaper">
            <feTurbulence baseFrequency="0.05" type="turbulence" numOctaves="10" seed="24" result="edge_noise" />
            <feGaussianBlur stdDeviation="0.5" in="SourceGraphic" />
            <feMorphology operator="erode" radius="5" />
            <feOffset dx="-1" dy="-1" />
            <feDisplacementMap scale="10" xChannelSelector="B" yChannelSelector="G" in2="edge_noise" />
          </filter>
          <rect width="100%" height="100%" fill="white" filter="url(#filter_tornpaper)" />
        </symbol>
      </svg>
      <svg aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, zIndex: -1 }}>
        <filter id="filter_grungepaper">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" result="grunge_noise" numOctaves="5" seed="15" />
          <feDiffuseLighting in="grunge_noise" lightingColor="white" surfaceScale="2">
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feBlend mode="multiply" in="SourceGraphic" />
        </filter>
      </svg>

      {/* ── Wood Grain Texture SVG Filter ── */}
      <svg aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, zIndex: -1 }}>
        <filter id="filter_sandy_texture" x="0%" y="0%" width="100%" height="100%">
          {/* Stretched noise for wood grain direction */}
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.4" numOctaves="5" seed="7" result="wood_grain" />
          {/* Warm side-lighting to reveal grain depth */}
          <feDiffuseLighting in="wood_grain" lightingColor="#F2E8CE" surfaceScale="1.2" result="lit_wood">
            <feDistantLight azimuth="180" elevation="45" />
          </feDiffuseLighting>
          {/* Blend with source */}
          <feBlend mode="multiply" in="SourceGraphic" in2="lit_wood" />
        </filter>
      </svg>

      <div className="flex flex-col items-center w-full max-w-[1280px] gap-8 md:gap-12">
        
        {/* Section Heading */}
        <div className="relative flex flex-col items-center justify-center w-full pb-4 z-40">
          <div className="w-fit mx-auto flex flex-col items-center">
            <h2 className={`font-amiri font-bold text-3xl md:text-5xl text-[#4D6314] text-center leading-loose ${styles.headingRaised}`}>
              {t('الورش التدريبية', 'Training Workshops')}
            </h2>
            {/* Curved Line under heading — draws itself on scroll */}
            <AnimatedUnderline variant={0} strokeColor="#4D6314" className="mt-2 translate-y-3" />
          </div>
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
        <div className="flex flex-col items-center gap-4 mt-8 md:mt-12 pt-6 md:pt-8 pb-8 md:pb-0 w-full">
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
