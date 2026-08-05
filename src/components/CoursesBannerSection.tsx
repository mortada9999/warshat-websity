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
      className="relative flex flex-col items-center justify-center w-full min-h-screen py-16 px-4 md:px-12 z-20 bg-[#F4F5F0]"
      aria-label="الكورسات"
    >
      {/* The Cork Board Container (Fixed Proportions) */}
      <div className="relative bg-[url('/images/cork-board.jpg')] bg-[length:100%_100%] bg-center bg-no-repeat w-full max-w-5xl min-h-[800px] mx-auto shadow-2xl p-8 md:p-20 lg:p-24 flex flex-col items-center justify-center gap-16">
        
        {/* Section Heading - Pinned Paper Style */}
        <div className="relative bg-[#F8F5F0] px-10 py-4 shadow-md -rotate-2 mt-4">
          <img src="/images/pin.png" alt="pin" className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 z-20 drop-shadow-md" />
          <h2 className="font-amiri font-bold text-3xl md:text-5xl text-[#374A00] text-center leading-[120%] mb-1">
            الكورسات
          </h2>
          <svg width="200" height="12" viewBox="0 0 234 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <path d="M0 8C77.4833 13.3333 154.967 10.6667 232.45 0" stroke="#A25F00" strokeWidth="3.9245" strokeLinecap="round" />
          </svg>
        </div>

        {/* Courses List - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 w-full z-10 place-items-center">
          {COURSES.map((course, index) => (
            <div key={course.id} className={`relative flex flex-col items-center w-full max-w-[320px] ${index === 0 ? '-rotate-2' : index === 1 ? 'rotate-1' : '-rotate-1'}`}>
              {/* The Parent Container (Static for the Pin) */}
              
              {/* The Static Pin */}
              <img src="/images/pin.png" alt="pin" className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 z-30 drop-shadow-md pointer-events-none" />
              
              {/* The Swinging Paper Card */}
              <article 
                className="relative flex flex-col items-start bg-[#FAFAFA] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 md:p-6 w-full z-20 origin-top transition-transform duration-300 hover:scale-105 hover:-rotate-1"
              >
                {/* Image Frame */}
                <div className="relative w-full h-48 border-4 border-[#F6F6F4] shadow-sm mb-4 overflow-hidden bg-gray-100">
                  <Image
                    src={course.image}
                    alt={course.titleAr}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Course Info */}
                <div className="flex flex-col w-full text-right items-end mt-2">
                  <h3 className="font-amiri text-2xl md:text-3xl font-bold text-[#597257] mb-1">{course.titleAr}</h3>
                  <p className="font-ibm-plex text-sm text-[#45483A] mb-4">{course.titleEn}</p>
                  
                  {/* Dashed line and Sessions */}
                  <div className="w-full border-t border-dashed border-[#C5C8B6] pt-3 mb-5 flex justify-end">
                    <span className="font-ibm-plex font-bold text-sm text-[#A25F00]">{course.sessions}</span>
                  </div>
                  
                  {/* Book Button */}
                  <a href="#book" className="inline-block text-center w-full px-6 py-2 bg-[#7D713C] text-white font-ibm-plex font-semibold text-sm uppercase tracking-widest rounded-sm shadow-md transition-colors hover:bg-[#597257] mt-auto">
                    Book Now
                  </a>
                </div>
              </article>

            </div>

          ))}
        </div>

        {/* Section Footer - All Courses CTA */}
        <div className="flex flex-col items-center gap-2 mt-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-sm shadow-md rotate-1 mb-8">
          <p className="font-amiri text-base text-[#45483A] text-center font-bold">
            دورات متخصصة تغطي مختلف المهارات الفنية
          </p>
          <a
            href="#"
            className="text-[#A25F00] font-ibm-plex font-semibold text-xs uppercase tracking-widest hover:underline inline-flex items-center gap-2"
          >
            جميع الكورسات
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 7L7 13M12 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        
      </div>
    </section>
  );
}
