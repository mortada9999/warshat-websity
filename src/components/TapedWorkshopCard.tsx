'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from './LanguageProvider';
import { useSoundContext } from '@/lib/SoundContext';
import { useBooking } from './BookingProvider';
import styles from './TrainingSection.module.css';

const TAPE_CONFIGS = [
  // Card 1: Pottery (Image left. Tape on top edge, left of center)
  [
    { top: '-14px', left: '25%', width: '90px', height: '28px', rotate: '-2deg' }
  ],
  // Card 2: Lino Cut (Image right. Tape 1 top right. Tape 2 vertical on right edge)
  [
    { top: '-14px', left: 'auto', right: '30%', width: '75px', height: '26px', rotate: '3deg' },
    // A tape of 85x30 rotated ~90deg needs its center on the edge. Center = right + 42.5. So right: -42.5px
    { top: '60px', right: '-42px', left: 'auto', width: '85px', height: '30px', rotate: '82deg' }
  ],
  // Card 3: Needle Felting (Image left. Tape on top edge, right of center)
  [
    { top: '-16px', left: 'auto', right: '40%', width: '110px', height: '32px', rotate: '-4deg' }
  ]
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Workshop {
  id: string | number;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descAr: string;
  descEn: string;
  image: string;
}

interface Props {
  workshop: Workshop;
  index: number;
}

export default function TapedWorkshopCard({ workshop: w, index }: Props) {
  const { lang, t } = useLanguage();
  const { openBooking } = useBooking();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !cardRef.current) return;

    // Peeling animation: As user scrolls down past the card, it peels off and falls.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 25%', // Wait until card is higher up before peeling
        end: 'top -20%',  
        scrub: 1, 
      }
    });

    // Card falls DOWN
    tl.to(cardRef.current, {
      y: 300, 
      rotate: index % 2 === 0 ? 12 : -12, 
      opacity: 0,
      duration: 1,
      ease: 'power2.in'
    }, 0);

    // Tapes fly UP to un-stick the card
    const tapes = containerRef.current.querySelectorAll('.collage-tape');
    tl.to(tapes, {
      y: -300, 
      rotate: (i) => index % 2 === 0 ? -45 + (i * 10) : 45 - (i * 10), 
      opacity: 0,
      duration: 1,
      ease: 'power2.in'
    }, 0); 
  }, { scope: containerRef });

  const cardTapes = TAPE_CONFIGS[index % TAPE_CONFIGS.length];

  return (
    <div ref={containerRef} className="relative w-full pt-8">
      {/* Tape Elements — OUTSIDE the masked article so they're not clipped */}
      {cardTapes.map((tape, i) => (
        <div 
          key={i}
          className={`collage-tape absolute z-20 bg-white/20 backdrop-blur-[2px] border border-white/40 shadow-sm ${styles.collageTape}`}
          style={{ 
            top: tape.top,
            left: tape.left,
            right: 'right' in tape ? (tape as any).right : undefined,
            width: tape.width,
            height: tape.height,
            transform: `scale(var(--tape-scale, 1)) rotate(${tape.rotate})`,
            backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 20%, transparent 60%, rgba(255,255,255,0.3) 100%)'
          }}
        />
      ))}


      {/* Shadow wrapper — drop-shadow follows torn edges */}
      <div style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.18)) drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
        {/* Card Element */}
        <article
          ref={cardRef}
          className={`relative ${styles.workshopCard} ${styles.tornpaper} ${index % 2 === 0 ? styles.cardAlt : styles.cardWarm}`}
          style={{ '--card-mask': `url(#mask_tornpaper_${index})` } as React.CSSProperties}
        >
        {/* Mask SVG — each card gets its own mask so torn-paper edges work for all */}
        <svg className={styles.tornpaperMaskSvg}>
          <mask id={`mask_tornpaper_${index}`}>
            <use href="#symbol_tornpaper" />
          </mask>
        </svg>

        {/* Image Container */}
        <div className={styles.workshopImageWrap}>
          <div className={styles.workshopImageFrame}>
            <Image
              src={w.image}
              alt={lang === 'ar' ? w.titleAr : w.titleEn}
              fill
              className={styles.workshopImage}
              sizes="(max-width: 1024px) 100vw, 525px"
            />
          </div>
        </div>

        {/* Content */}
        <div className={styles.workshopContent}>
          <h3 className={lang === 'ar' ? styles.workshopTitleAr : styles.workshopTitleEn}>
            {lang === 'ar' ? w.titleAr : w.titleEn}
          </h3>
          
          {w.subtitleAr && (
            <p className={styles.workshopSubtitle}>
              {t(w.subtitleAr, w.subtitleEn)}
            </p>
          )}
          
          {w.descAr && (
            <p className={styles.workshopDesc}>
              {t(w.descAr, w.descEn)}
            </p>
          )}
          
          {/* Book Now Button */}
          <button onClick={() => openBooking(w as any)} className={styles.bookBtn}>{t('احجز الآن', 'Book Now')}</button>
        </div>
      </article>
      </div>
    </div>
  );
}
