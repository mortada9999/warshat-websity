'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const handRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!handRef.current) return;

    // Animate the hand sliding in from the right side
    gsap.from(handRef.current, {
      x: 400,
      opacity: 0,
      rotation: 25,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.2 // slight delay after page load
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#F6F0E2] overflow-hidden pt-24 pb-48 md:pb-64 px-6 md:px-12"
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

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-[896px]">
        
        {/* Central Image (The Hand) */}
        <div ref={handRef} className="relative flex flex-col items-center justify-center w-full max-w-[512px] -rotate-1">
          <Image
            src="/images/figma/hero-hand.png"
            alt="يد تمسك ورقة فنية — ورشة فن"
            width={512}
            height={684}
            className="w-full h-auto object-contain drop-shadow-xl"
            style={{ width: '100%', height: 'auto' }}
            priority
          />
          {/* مساحة مخصصة للنصوص المستقبلية داخل اليد */}
          <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16 pointer-events-none z-20">
            {/* ضع النص المستقبلي هنا */}
          </div>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 mt-4">
          
          {/* About Us Button */}
          <a href="#about" className="group relative flex flex-col items-center transition-transform hover:-translate-y-1 hover:rotate-1 duration-300">
            {/* The tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[48px] h-[16px] rotate-[12deg] bg-[#FFDF9D]/60 mix-blend-multiply z-20 backdrop-blur-sm" />
            
            {/* The paper card */}
            <div className="flex flex-col items-center justify-center px-8 md:px-10 py-4 -rotate-3 bg-white border border-[#C5C8B6]/20 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] group-hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-shadow duration-300">
              <span className="font-amiri text-[#374A00] text-2xl md:text-3xl leading-[130%]">من نحن</span>
              <span className="font-ibm-plex text-[#45483A] text-[10px] md:text-xs leading-[150%] mt-1">About Us</span>
            </div>
          </a>

          {/* Art Caffe Button */}
          <a href="#cafe" className="group relative flex flex-col items-center transition-transform hover:-translate-y-1 hover:-rotate-1 duration-300">
            {/* The tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[48px] h-[16px] -rotate-[8deg] bg-[#C5D475]/60 mix-blend-multiply z-20 backdrop-blur-sm" />
            
            {/* The paper card */}
            <div className="flex flex-col items-center justify-center px-8 md:px-10 py-4 rotate-2 bg-white border border-[#C5C8B6]/20 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] group-hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-shadow duration-300">
              <span className="font-amiri text-[#374A00] text-2xl md:text-3xl leading-[130%]">قهوة فن</span>
              <span className="font-ibm-plex text-[#45483A] text-[10px] md:text-xs leading-[150%] mt-1">Art Caffe</span>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}
