'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from './LanguageProvider';
import { useSoundContext } from '@/lib/SoundContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const handRef = useRef<HTMLDivElement>(null); // For Scroll Scrub
  const handInnerRef = useRef<HTMLDivElement>(null); // For On-Load Presentation
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    // 1. Configure GSAP for mobile URL bar
    ScrollTrigger.config({ ignoreMobileResize: true });

    // 2. Wait for fonts and all images to be ready
    const checkReady = async () => {
      try {
        await document.fonts.ready;
        if (sectionRef.current) {
          const imgs = Array.from(sectionRef.current.querySelectorAll('img'));
          await Promise.all(imgs.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve; // Continue on error
            });
          }));
        }
      } catch (e) {}

      if (mounted) {
        setIsReady(true);
        setTimeout(() => ScrollTrigger.refresh(), 50);
      }
    };

    checkReady();

    // 3. Fallback timeout to ensure it always reveals
    const fallback = setTimeout(() => {
      if (mounted && !isReady) {
        setIsReady(true);
        setTimeout(() => ScrollTrigger.refresh(), 50);
      }
    }, 1500);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      mounted = false;
      clearTimeout(fallback);
      window.removeEventListener('load', handleLoad);
    };
  }, [isReady]);

  useGSAP(() => {
    if (!isReady || !handRef.current || !handInnerRef.current || !sectionRef.current) return;

    // 1. On-Load Presentation: 3D Hand-out reveal
    gsap.fromTo(handInnerRef.current,
      {
        scale: 0.5,
        y: 80,
        rotateX: 45,
        opacity: 0,
        transformPerspective: 1000
      },
      {
        scale: 1,
        y: 0,
        rotateX: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'back.out(1.5)',
        immediateRender: true,
      }
    );

    // 2. Scroll Scrub: Hand retreats on scroll down
    gsap.to(handRef.current, {
      scale: 0.7,
      y: 150,
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
      },
      immediateRender: false,
    });

    // 3. Buttons Peeling Animation
    const btns = gsap.utils.toArray('.hero-btn-container') as HTMLElement[];
    btns.forEach((btn, index) => {
      const paper = btn.querySelector('.hero-btn-paper');
      
      if (!paper) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: btn,
          start: `top ${50 + index * 15}%`, 
          end: `top ${10 - index * 10}%`,
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });

      // Paper falls gracefully
      tl.to(paper, {
        y: 250 + (index * 50),
        x: 0,
        rotate: index === 0 ? 8 : -8,
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power2.in',
        immediateRender: false,
      }, 0);

      // Tape flies UP
      const tape = btn.querySelector('.hero-btn-tape');
      if (tape) {
        tl.to(tape, {
          y: -150 - (index * 30),
          rotate: index === 0 ? -45 : 45,
          opacity: 0,
          duration: 1,
          ease: 'power2.in',
          immediateRender: false,
        }, 0);
      }
    });
    
    // Log sizes for debugging
    setTimeout(() => {
      btns.forEach((btn, index) => {
        const paper = btn.querySelector('.hero-btn-paper');
        if (paper) console.log(`Button ${index} paper width:`, paper.getBoundingClientRect().width);
      });
    }, 500);

  }, { scope: sectionRef, dependencies: [isReady] });

  return (
    <section 
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#F6F0E2] pt-24 pb-32 md:pb-64 px-6 md:px-12 z-30"
      aria-label={t('القسم الرئيسي للورش', 'Main workshops section')}
    >
      {/* Background decorative shapes — placed in a clipping layer so they don't cause scroll, 
          leaving the main section overflow visible so the papers can fall outside it. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Yellow Blur */}
        <div 
          className="absolute w-[200px] h-[200px] md:w-[256px] md:h-[256px] rounded-full opacity-40 bg-[#FFDF9D] mix-blend-multiply blur-[30px] md:blur-[40px] left-[-20%] md:left-[10%] top-[10%] md:top-[20%]"
          aria-hidden="true" 
        />
        {/* Green Blur */}
        <div 
          className="absolute w-[220px] h-[220px] md:w-[288px] md:h-[288px] rounded-full opacity-30 bg-[#C5D475] mix-blend-multiply blur-[30px] md:blur-[40px] right-[-20%] md:right-[5%] bottom-[15%] md:bottom-[20%]"
          aria-hidden="true" 
        />
      </div>

      {/* Main Content Container — perspective enables 3D rotateX on child */}
      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-[896px]" style={{ perspective: '1200px' }}>
        
        {/* Central Image (The Hand) */}
        <div 
          ref={handRef} 
          className={`relative flex flex-col items-center justify-center w-full max-w-[512px] transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        >
          <div ref={handInnerRef} className="relative w-full -rotate-1 drop-shadow-xl">
            {/* النص فوق الورقة */}
            <div className="absolute top-[32%] left-[18%] w-[55%] h-[32%] flex flex-col items-center justify-between">
              
              <span className="text-[#4A5830] text-lg md:text-3xl font-bold relative bottom-3 md:bottom-8">
                {t('ورشة فن', 'Warshat Fan')}
              </span>
              
              {/* العنوان الرئيسي في المنتصف */}
              <h1 className="text-center text-[#34401F] text-base md:text-2xl font-normal leading-[160%] relative bottom-2 md:bottom-6">
                {t('المكان المثالي للترفيه', 'The ideal place for')}
                <br />
                {t('عن طريق الفن', 'entertainment through art')}
              </h1>
              
              <p className="text-center text-[#4A5830] text-[9px] md:text-sm relative right-[2%] md:right-[4%] w-full">
                {t('و لتعلم مختلف الفنون بأحترافية', 'And to learn various arts professionally!')}
              </p>
            </div>
            {/* صورة اليد — طبقة أمام النص مع multiply لإظهار النص من خلال الورقة الفاتحة */}
            <Image
              src="/images/figma/hero-hand3.png"
              alt={t('يد تمسك ورقة فنية — ورشة فن', 'A hand holding an art paper — Warshat Fan')}
              width={512}
              height={684}
              className="relative z-20 w-full h-auto object-contain"
              style={{
                width: '100%',
                height: 'auto',
                mixBlendMode: 'multiply',
                maskImage: 'linear-gradient(to bottom, #000 78%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, #000 78%, transparent 100%)',
              }}
              priority
              quality={100}
              unoptimized
            />
          </div>
        </div>

        {/* Navigation Options */}
        <div className={`flex flex-row items-center justify-center gap-6 md:gap-8 mt-8 md:mt-12 z-30 transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`} dir="rtl">
          
          {/* About Us Button */}
          <a 
            href="#about" 
            className="hero-btn-container relative block cursor-pointer shrink-0 min-h-[44px] w-[118px] md:w-[145px]"
          >
            {/* Tape — flies UP on scroll */}
            <div 
              className="hero-btn-tape absolute top-0 left-1/2 w-[35%] h-[26px] md:h-[32px] z-20 pointer-events-none drop-shadow-sm"
              style={{ transform: 'translate(-50%, -50%) rotate(3deg)' }}
            >
              <div 
                className="w-full h-full bg-[#E2DBC3]/40 backdrop-blur-[2px]"
                style={{
                  clipPath: 'polygon(0% 2%, 98% 0%, 100% 97%, 2% 100%)',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.15\'/%3E%3C/svg%3E")'
                }}
              />
            </div>

            {/* Paper — GSAP animates this */}
            <div 
              className="hero-btn-paper relative w-full active:scale-[0.96]" 
              style={{ transform: 'rotate(2deg)' }}
            >
              <Image 
                src="/images/figma/paper-about.webp" 
                alt="About Us"
                width={400} height={308}
                className="block w-full h-auto"
                style={{ filter: 'drop-shadow(1px 3px 4px rgba(60,50,30,0.3))' }}
                priority
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-2">
                <span 
                  className={`text-center text-[#374A00] leading-tight ${lang === 'ar' ? 'font-bold pt-2' : 'font-bold tracking-wider uppercase pt-1'}`} 
                  style={{ fontSize: lang === 'ar' ? 'clamp(17px, 14cqi, 30px)' : 'clamp(14px, 12cqi, 26px)' }}
                >
                  {t('من نحن', 'ABOUT US')}
                </span>
              </div>
            </div>
          </a>

          {/* Art Caffe Button */}
          <Link 
            href="/cafe" 
            className="hero-btn-container relative block cursor-pointer shrink-0 min-h-[44px] w-[118px] md:w-[145px]"
          >
            {/* Tape — flies UP on scroll */}
            <div 
              className="hero-btn-tape absolute top-0 left-1/2 w-[35%] h-[26px] md:h-[32px] z-20 pointer-events-none drop-shadow-sm"
              style={{ transform: 'translate(-50%, -50%) rotate(-4deg)' }}
            >
              <div 
                className="w-full h-full bg-[#E2DBC3]/40 backdrop-blur-[2px]"
                style={{
                  clipPath: 'polygon(1% 0%, 100% 3%, 97% 100%, 0% 98%)',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.15\'/%3E%3C/svg%3E")'
                }}
              />
            </div>

            {/* Paper — GSAP animates this */}
            <div 
              className="hero-btn-paper relative w-full active:scale-[0.96]"
              style={{ transform: 'rotate(-2deg)' }}
            >
              <Image 
                src="/images/figma/paper-cafe.webp" 
                alt="Art Caffe"
                width={400} height={302}
                className="block w-full h-auto"
                style={{ filter: 'drop-shadow(1px 3px 4px rgba(60,50,30,0.3))' }}
                priority
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-2">
                <span 
                  className={`text-center text-[#374A00] leading-tight ${lang === 'ar' ? 'font-bold pt-2' : 'font-bold tracking-wider uppercase pt-1'}`} 
                  style={{ fontSize: lang === 'ar' ? 'clamp(17px, 14cqi, 30px)' : 'clamp(14px, 12cqi, 26px)' }}
                >
                  {t('قهوة فن', 'ART CAFFE')}
                </span>
              </div>

              {/* Beans Sticker */}
              <img 
                src="/images/beans.png" 
                alt=""
                className="absolute z-10 pointer-events-none"
                style={{ 
                  width: '38%', 
                  height: 'auto', 
                  top: '5%',
                  left: '-2%',
                  transform: 'rotate(-6deg)', 
                  mixBlendMode: 'multiply',
                  filter: 'drop-shadow(1px 2px 2px rgba(60,50,30,0.3))'
                }}
              />
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
