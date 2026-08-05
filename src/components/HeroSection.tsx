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

    // 1. On-Load Presentation: "Handing a business card"
    // Starts small, low, faded, and tilted back. Animates to full size, straight, and visible.
    gsap.fromTo(handInnerRef.current,
      {
        scale: 0.7,
        y: 150,
        opacity: 0,
        rotateX: 15, // 3D tilt back
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.3,
      }
    );

    // 2. Scroll Scrub: Hand retreats on scroll down
    // Retreats down (y: 200), shrinks, and fades out.
    gsap.to(handRef.current, {
      y: 200,
      scale: 0.8,
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
          start: 'top 50%', // Start peeling when they reach middle of screen
          end: 'top 10%',
          scrub: 1,
        }
      });

      // Paper falls DOWN
      tl.to(paper, {
        y: 250,
        rotate: index % 2 === 0 ? 15 : -15,
        opacity: 0,
        duration: 1,
        ease: 'power2.in'
      }, 0);

      // Tape flies UP
      tl.to(tape, {
        y: -150,
        rotate: index % 2 === 0 ? -45 : 45,
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 mt-4 z-30">
          
          {/* About Us Button */}
          <a href="#about" className="hero-btn-container group relative flex flex-col items-center transition-transform hover:-translate-y-1 hover:rotate-1 duration-300">
            {/* The tape */}
            <div className="hero-btn-tape absolute -top-3 left-1/2 -translate-x-1/2 w-[48px] h-[16px] rotate-[12deg] bg-[#FFDF9D]/60 mix-blend-multiply z-20 backdrop-blur-sm" />
            
            {/* The paper card */}
            <div className="hero-btn-paper flex flex-col items-center justify-center px-8 md:px-10 py-4 -rotate-3 bg-white border border-[#C5C8B6]/20 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] group-hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-shadow duration-300">
              <span className="font-amiri text-[#374A00] text-2xl md:text-3xl leading-[130%]">من نحن</span>
              <span className="font-ibm-plex text-[#45483A] text-[10px] md:text-xs leading-[150%] mt-1">About Us</span>
            </div>
          </a>

          {/* Art Caffe Button */}
          <a href="#cafe" className="hero-btn-container group relative flex flex-col items-center transition-transform hover:-translate-y-1 hover:-rotate-1 duration-300">
            {/* The tape */}
            <div className="hero-btn-tape absolute -top-3 left-1/2 -translate-x-1/2 w-[48px] h-[16px] -rotate-[8deg] bg-[#C5D475]/60 mix-blend-multiply z-20 backdrop-blur-sm" />
            
            {/* The paper card */}
            <div className="hero-btn-paper flex flex-col items-center justify-center px-8 md:px-10 py-4 rotate-2 bg-white border border-[#C5C8B6]/20 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] group-hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-shadow duration-300">
              <span className="font-amiri text-[#374A00] text-2xl md:text-3xl leading-[130%]">قهوة فن</span>
              <span className="font-ibm-plex text-[#45483A] text-[10px] md:text-xs leading-[150%] mt-1">Art Caffe</span>
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
