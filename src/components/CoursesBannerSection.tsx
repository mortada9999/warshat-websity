'use client';

import React from 'react';
import Image from 'next/image';

const COURSES = [
  {
    id: 1,
    titleAr: 'كورس تعليم الرسم',
    titleEn: 'Fine Art Fundamentals',
    sessions: '8 Sessions',
    image: '/images/figma/pottery.png',
  },
  {
    id: 2,
    titleAr: 'تقنيات الفخار المتقدمة',
    titleEn: 'Advanced Pottery Techniques',
    sessions: '12 Sessions',
    image: '/images/figma/mirror.png',
  },
  {
    id: 3,
    titleAr: 'كورس الحياكة',
    titleEn: 'Textile Design',
    sessions: '6 Sessions',
    image: '/images/figma/tote-bag.png',
  },
];

export default function CoursesBannerSection() {
  return (
    <section 
      id="courses" 
      className="relative flex flex-col items-center justify-center w-full min-h-screen py-16 md:py-24 px-4 md:px-8 bg-[#F4F5F0]"
      aria-label="الكورسات"
    >
      {/* ── Cork Board with real image ── */}
      <div 
        className="relative w-full flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/cork-board.jpg')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '80vh',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {/* Content overlaid on cork area */}
        <div 
          className="relative flex flex-col items-center gap-6 md:gap-8 w-full"
          style={{
            padding: 'clamp(16px, 3vw, 32px) clamp(12px, 2.5vw, 28px)',
            maxWidth: '480px',
          }}
        >
          {/* ── Section Heading — pinned paper ── */}
          <div className="relative bg-[#F8F5F0] px-8 md:px-12 py-3 md:py-4 shadow-lg -rotate-1 mt-2">
            <img src="/images/pin.png" alt="" className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 md:w-9 md:h-9 z-20 drop-shadow-md pointer-events-none" />
            <h2 className="font-amiri font-bold text-3xl md:text-5xl text-[#374A00] text-center leading-[120%] mb-1">
              الكورسات
            </h2>
            <svg width="180" height="10" viewBox="0 0 234 16" fill="none" className="mx-auto">
              <path d="M0 8C77.4833 13.3333 154.967 10.6667 232.45 0" stroke="#A25F00" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* ── Courses Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 w-full place-items-center">
            {COURSES.map((course, index) => (
              <div key={course.id} className={`relative flex flex-col items-center w-full max-w-[160px] md:max-w-[180px] ${index === 0 ? '-rotate-2.5' : index === 1 ? 'rotate-1.5' : '-rotate-1.5'}`}>
                <img src="/images/pin.png" alt="" className="absolute -top-4 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 z-30 drop-shadow-md pointer-events-none" />
                <article className="relative flex flex-col items-start bg-[#FAFAFA] shadow-[0_10px_28px_rgba(0,0,0,0.4)] p-2.5 md:p-3 w-full z-20 transition-transform duration-300 hover:scale-105">
                  <div className="relative w-full aspect-[4/3] border-2 border-[#F6F6F4] shadow-sm mb-1.5 overflow-hidden bg-gray-100">
                    <Image src={course.image} alt={course.titleAr} fill className="object-cover" sizes="180px" />
                  </div>
                  <div className="flex flex-col w-full text-right items-end mt-0.5">
                    <h3 className="font-amiri text-base md:text-lg font-bold text-[#597257] mb-0.5 leading-tight">{course.titleAr}</h3>
                    <p className="font-ibm-plex text-[10px] md:text-[11px] text-[#45483A] mb-1.5">{course.titleEn}</p>
                    <div className="w-full border-t border-dashed border-[#C5C8B6] pt-1 mb-2 flex justify-end">
                      <span className="font-ibm-plex font-bold text-[10px] md:text-[11px] text-[#A25F00]">{course.sessions}</span>
                    </div>
                    <a href="#book" className="inline-block text-center w-full px-3 py-1.5 bg-[#7D713C] text-white font-ibm-plex font-semibold text-[10px] uppercase tracking-wider shadow-sm transition-colors hover:bg-[#597257]">Book Now</a>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* ── Footer CTA ── */}
          <div className="relative bg-white/90 px-5 py-2.5 shadow-md rotate-[0.5deg]">
            <img src="/images/pin.png" alt="" className="absolute -top-4 left-1/2 -translate-x-1/2 w-7 h-7 z-20 drop-shadow-md pointer-events-none" />
            <p className="font-amiri text-sm md:text-base text-[#45483A] text-center font-bold mb-1">دورات متخصصة تغطي مختلف المهارات الفنية</p>
            <a href="#" className="text-[#A25F00] font-ibm-plex font-semibold text-xs uppercase tracking-widest hover:underline inline-flex items-center gap-2">
              جميع الكورسات
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L13 7L7 13M12 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
