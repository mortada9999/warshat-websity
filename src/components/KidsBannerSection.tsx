'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function KidsBannerSection() {
  return (
    <section 
      id="kids" 
      className="relative flex flex-col items-center justify-center w-full h-full min-h-screen px-6 md:px-12 bg-[#F6F0E2] overflow-hidden z-20"
      aria-label="ورش الأطفال"
    >
      {/* Decorative Playful Elements */}
      <div className="absolute top-[10%] left-[5%] md:left-[15%] w-16 h-16 bg-[#FFDF9D] opacity-60 rounded-full blur-xl" aria-hidden="true" />
      <div className="absolute bottom-[20%] right-[5%] md:right-[15%] w-24 h-24 bg-[#C5D475] opacity-60 rounded-full blur-2xl" aria-hidden="true" />

      <div className="flex flex-col items-center w-full max-w-[1280px] h-full justify-center">
        
        {/* Section Heading */}
        <div className="relative flex flex-col items-center justify-center w-full pb-8 md:pb-12 z-40">
          <h2 className="font-amiri font-bold text-4xl md:text-6xl text-[#374A00] text-center leading-[120%] mb-2">
            ورش و اشتراكات الأطفال
          </h2>
          <svg width="234" height="16" viewBox="0 0 234 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8C77.4833 13.3333 154.967 10.6667 232.45 0" stroke="#C5D475" strokeWidth="3.9245" strokeLinecap="round" />
          </svg>
        </div>

        {/* Content Area: Cloud Image + Text */}
        <div className="relative w-full max-w-[908px] mt-4 flex justify-center z-10">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] flex items-center justify-center"
          >
            {/* Cloud Image */}
            <Image
              src="/images/figma/kids-cloud.png"
              alt="ورش فنية للأطفال"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 1024px) 100vw, 908px"
            />

            {/* Text Overlay on Cloud */}
            <div className="absolute flex flex-col items-center justify-center text-center p-6 md:p-12 w-[80%] md:w-[60%] max-w-[500px]">
              <h3 className="font-amiri text-2xl md:text-4xl text-[#374A00] font-bold mb-4">
                عالم من الإبداع للصغار
              </h3>
              <p className="font-ibm-plex text-sm md:text-lg text-[#45483A] mb-6 leading-relaxed">
                نقدم ورش عمل فنية ممتعة ومحفزة لخيال الأطفال، حيث يكتشفون مواهبهم
                في بيئة مليئة بالألوان والمرح.
              </p>
              <button className="px-8 py-3 bg-[#A25F00] text-white font-ibm-plex font-semibold text-sm md:text-base uppercase tracking-widest rounded-full shadow-lg transition-transform hover:scale-105 hover:bg-[#7D713C]">
                Book Now
              </button>
            </div>

            {/* Circular Kid Photo */}
            <div className="absolute -bottom-8 md:-bottom-16 -right-4 md:-right-12 w-[120px] h-[120px] md:w-[214px] md:h-[214px] rounded-full border-[6px] border-white shadow-xl overflow-hidden bg-white hover:rotate-3 transition-transform duration-300">
              <Image
                src="/images/figma/image1.png"
                alt="طفل يرسم"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 120px, 214px"
              />
            </div>
          </motion.div>
          
        </div>

        {/* Section Footer */}
        <div className="flex flex-col items-center gap-4 mt-12 pb-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl">🎨</span>
            <span className="text-2xl">🖌️</span>
            <span className="text-2xl">🌈</span>
          </div>
          <p className="font-amiri text-xl md:text-2xl text-[#374A00] text-center">
            اشتراكات شهرية وفصلية للأطفال
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#A25F00] text-[#A25F00] font-ibm-plex font-semibold text-sm uppercase tracking-widest rounded-sm hover:bg-[#A25F00] hover:text-white transition-colors"
          >
            تواصل معنا
          </a>
        </div>
      </div>
    </section>
  );
}
