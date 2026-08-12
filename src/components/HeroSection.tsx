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

      // Paper falls gracefully in place (not thrown away)
      tl.to(paper, {
        y: 250 + (index * 50), // Falls straight down
        x: 0, // Stays in place horizontally
        rotate: index === 0 ? 10 : -10, // Very gentle tilt
        scale: 0.9, // Slight push back
        opacity: 0,
        duration: 1,
        ease: 'power2.in'
      }, 0);

      // Tape flies UP elegantly
      tl.to(tape, {
        y: -150 - (index * 30),
        x: 0,
        rotate: index === 0 ? -25 : 25,
        opacity: 0,
        duration: 1,
        ease: 'power2.in'
      }, 0);
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#F6F0E2] overflow-x-hidden pt-24 pb-32 md:pb-64 px-6 md:px-12"
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
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:gap-16 mt-4 z-30">
          
          {/* About Us Button */}
          <a href="#about" className="hero-btn-container group relative flex flex-col items-center transition-transform hover:-translate-y-2 hover:rotate-2 duration-300">
            {/* Realistic Scotch Tape */}
            <div 
              className="hero-btn-tape absolute -top-5 left-1/2 -translate-x-1/2 w-[60px] md:w-[90px] h-[22px] md:h-[30px] rotate-[10deg] bg-white/20 backdrop-blur-[2px] border border-white/40 shadow-sm z-20"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 20%, transparent 60%, rgba(255,255,255,0.3) 100%)'
              }}
            />
            
            {/* The paper card */}
            <div className="hero-btn-paper flex flex-col items-center justify-center px-6 md:px-16 py-5 md:py-8 -rotate-3 bg-[#F8F5F0] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] transition-shadow duration-300">
              <span className="font-amiri text-[#374A00] text-2xl md:text-5xl leading-[130%]">من نحن</span>
              <span className="font-ibm-plex text-[#45483A] text-xs md:text-sm leading-[150%] mt-1.5 md:mt-2 tracking-widest uppercase">About Us</span>
            </div>
          </a>

          {/* Art Caffe Button */}
          <a href="#cafe" className="hero-btn-container group relative flex flex-col items-center transition-transform hover:-translate-y-2 hover:-rotate-2 duration-300">
            {/* Realistic Scotch Tape */}
            <div 
              className="hero-btn-tape absolute -top-5 left-1/2 -translate-x-1/2 w-[55px] md:w-[85px] h-[22px] md:h-[30px] -rotate-[8deg] bg-white/20 backdrop-blur-[2px] border border-white/40 shadow-sm z-20"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 20%, transparent 60%, rgba(255,255,255,0.3) 100%)'
              }}
            />
            
            {/* The paper card */}
            <div className="hero-btn-paper flex flex-col items-center justify-center px-6 md:px-16 py-5 md:py-8 rotate-2 bg-[#F4F5F0] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] transition-shadow duration-300">
              <span className="font-amiri text-[#374A00] text-2xl md:text-5xl leading-[130%]">قهوة فن</span>
              <span className="font-ibm-plex text-[#45483A] text-xs md:text-sm leading-[150%] mt-1.5 md:mt-2 tracking-widest uppercase">Art Caffe</span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
