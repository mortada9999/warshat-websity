'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const handRef = useRef<HTMLDivElement>(null); // For Scroll Scrub
  const handInnerRef = useRef<HTMLDivElement>(null); // For On-Load Presentation

  useGSAP(() => {
    if (!handRef.current || !handInnerRef.current || !sectionRef.current) return;

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
        ease: 'back.out(1.5)'
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
      },
    });

    // 3. Buttons Peeling Animation (like TapedWorkshopCard)
    const btns = gsap.utils.toArray('.hero-btn-container') as HTMLElement[];
    btns.forEach((btn, index) => {
      const tape = btn.querySelector('.hero-btn-tape');
      const paper = btn.querySelector('.hero-btn-paper');
      
      if (!tape || !paper) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: btn,
          // Break synchronicity: second button triggers earlier/later
          start: `top ${50 + index * 15}%`, 
          end: `top ${10 - index * 10}%`,
          scrub: 1.5,
        }
      });

      // Paper flies away (realistic 3D wind effect)
      tl.to(paper, {
        y: 300 + (index * 100),
        x: index === 0 ? -200 : 200, // Fly outwards
        rotate: index === 0 ? -60 : 75,
        rotateX: 65, // Flips in 3D
        rotateY: index === 0 ? 45 : -45,
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: 'power2.in'
      }, 0);

      // Tape flies UP and away
      tl.to(tape, {
        y: -200 - (index * 50),
        x: index === 0 ? -100 : 100,
        rotate: index === 0 ? -80 : 80,
        opacity: 0,
        duration: 1,
        ease: 'power2.in'
      }, 0);
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#F6F0E2] overflow-x-hidden pt-24 pb-48 md:pb-64 px-6 md:px-12"
      aria-label="القسم الرئيسي للورش"
    >
      {/* Background decorative shapes */}
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

      {/* Main Content Container — perspective enables 3D rotateX on child */}
      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-[896px]" style={{ perspective: '1200px' }}>
        
        {/* Central Image (The Hand) */}
        <div 
          ref={handRef} 
          className="relative flex flex-col items-center justify-center w-full max-w-[512px]"
        >
          <div ref={handInnerRef} className="relative w-full -rotate-1 drop-shadow-xl">
            <Image
              src="/images/figma/hero-hand.png"
              alt="يد تمسك ورقة فنية — ورشة فن"
              width={512}
              height={684}
              className="w-full h-auto object-contain"
              style={{ width: '100%', height: 'auto' }}
              priority
            />
            {/* مساحة مخصصة للنصوص المستقبلية داخل اليد */}
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16 pointer-events-none z-20">
              {/* ضع النص المستقبلي هنا */}
            </div>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 mt-4 z-30">
          
          {/* About Us Button */}
          <a href="#about" className="hero-btn-container group relative flex flex-col items-center transition-transform hover:-translate-y-2 hover:rotate-2 duration-300">
            {/* Realistic Scotch Tape */}
            <div 
              className="hero-btn-tape absolute -top-5 left-1/2 -translate-x-1/2 w-[90px] h-[30px] rotate-[10deg] bg-white/20 backdrop-blur-[2px] border border-white/40 shadow-sm z-20"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 20%, transparent 60%, rgba(255,255,255,0.3) 100%)'
              }}
            />
            
            {/* The paper card */}
            <div className="hero-btn-paper flex flex-col items-center justify-center px-12 md:px-16 py-6 md:py-8 -rotate-3 bg-[#F8F5F0] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] transition-shadow duration-300">
              <span className="font-amiri text-[#374A00] text-3xl md:text-5xl leading-[130%]">من نحن</span>
              <span className="font-ibm-plex text-[#45483A] text-xs md:text-sm leading-[150%] mt-2 tracking-widest uppercase">About Us</span>
            </div>
          </a>

          {/* Art Caffe Button */}
          <a href="#cafe" className="hero-btn-container group relative flex flex-col items-center transition-transform hover:-translate-y-2 hover:-rotate-2 duration-300">
            {/* Realistic Scotch Tape */}
            <div 
              className="hero-btn-tape absolute -top-5 left-1/2 -translate-x-1/2 w-[85px] h-[30px] -rotate-[8deg] bg-white/20 backdrop-blur-[2px] border border-white/40 shadow-sm z-20"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 20%, transparent 60%, rgba(255,255,255,0.3) 100%)'
              }}
            />
            
            {/* The paper card */}
            <div className="hero-btn-paper flex flex-col items-center justify-center px-12 md:px-16 py-6 md:py-8 rotate-2 bg-[#F4F5F0] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] transition-shadow duration-300">
              <span className="font-amiri text-[#374A00] text-3xl md:text-5xl leading-[130%]">قهوة فن</span>
              <span className="font-ibm-plex text-[#45483A] text-xs md:text-sm leading-[150%] mt-2 tracking-widest uppercase">Art Caffe</span>
            </div>
          </a>

        </div>

        {/* Scroll Down Indicator */}
        <div className="flex flex-col items-center gap-3 mt-8 animate-bounce">
          <span className="font-ibm-plex text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#A25F00]/50">
            Scroll
          </span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="12" height="20" rx="6" stroke="#A25F00" strokeOpacity="0.4" strokeWidth="1.5"/>
            <rect x="5.5" y="4.5" width="3" height="5" rx="1.5" fill="#A25F00" fillOpacity="0.5"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
