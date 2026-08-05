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
      className="relative flex flex-col items-center justify-center w-full h-full px-6 md:px-12 bg-[#FBFAEF] overflow-hidden z-20"
      aria-label="الكورسات"
    >
      {/* Background Texture/Image Placeholder */}
      <div className="absolute inset-0 opacity-5 bg-[url(/images/figma/texture-placeholder.png)] bg-cover bg-center pointer-events-none" aria-hidden="true" />
      
      <div className="relative flex flex-col items-center w-full max-w-[1280px] h-full justify-center mt-12 md:mt-0">
        
        {/* Glassmorphism Overlay Container */}
        <div className="flex flex-col items-center w-full max-w-[1184px] bg-white/80 backdrop-blur-md border border-[#C5C8B6]/20 rounded-xl shadow-2xl p-8 md:p-12">
          
          {/* Section Heading */}
          <div className="relative flex flex-col items-center justify-center w-full pb-8 md:pb-12 z-40">
            <h2 className="font-amiri font-bold text-4xl md:text-6xl text-[#374A00] text-center leading-[120%] mb-2">
              الكورسات
            </h2>
            <svg width="234" height="16" viewBox="0 0 234 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 8C77.4833 13.3333 154.967 10.6667 232.45 0" stroke="#A25F00" strokeWidth="3.9245" strokeLinecap="round" />
            </svg>
          </div>

          {/* Courses List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-h-[60vh] overflow-y-auto md:overflow-visible pb-4 hide-scrollbar">
            {COURSES.map((course, index) => (
              <article 
                key={course.id} 
                className={`relative flex flex-col items-start bg-white border border-[#C5C8B6]/10 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] p-6 md:p-8 transition-transform duration-300 hover:scale-105 ${index === 0 ? '-rotate-1' : index === 1 ? 'rotate-2' : '-rotate-2'}`}
              >
                
                {/* Image Placeholder / Frame */}
                <div className="relative w-full aspect-square border-4 border-[#F6F6F4] shadow-sm mb-6 overflow-hidden bg-gray-100">
                  <Image
                    src={course.image}
                    alt={course.titleAr}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Course Info */}
                <div className="flex flex-col w-full text-right items-end">
                  <h3 className="font-amiri text-3xl md:text-4xl font-bold text-[#597257] mb-2">{course.titleAr}</h3>
                  <p className="font-ibm-plex text-lg text-[#45483A] mb-4">{course.titleEn}</p>
                  
                  {/* Dashed line and Sessions */}
                  <div className="w-full border-t border-dashed border-[#C5C8B6] pt-4 mb-6 flex justify-end">
                    <span className="font-ibm-plex font-bold text-base text-[#A25F00]">{course.sessions}</span>
                  </div>
                  
                  {/* Book Button */}
                  <a href="#book" className="inline-block text-center w-full md:w-auto px-10 py-3 bg-[#7D713C] text-white font-ibm-plex font-semibold text-sm uppercase tracking-widest rounded-sm shadow-md transition-colors hover:bg-[#597257]">
                    Book Now
                  </a>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
