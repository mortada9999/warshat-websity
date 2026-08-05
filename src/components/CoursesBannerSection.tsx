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
      className="bg-[url('/images/cork-board.jpg')] bg-[length:100%_100%] bg-center bg-no-repeat relative overflow-hidden flex flex-col items-center justify-center w-full min-h-screen py-24 px-12 md:p-32 lg:p-40 z-20"
      aria-label="الكورسات"
    >
      <div className="relative flex flex-col items-center w-full max-w-[1280px] h-full justify-center z-10 gap-16">
        
        {/* Section Heading - Pinned Paper Style */}
        <div className="relative bg-[#F8F5F0] px-12 py-6 shadow-md -rotate-2">
          <img src="/images/pin.png" alt="pin" className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 z-20 drop-shadow-md" />
          <h2 className="font-amiri font-bold text-4xl md:text-5xl text-[#374A00] text-center leading-[120%] mb-1">
            الكورسات
          </h2>
          <svg width="234" height="16" viewBox="0 0 234 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <path d="M0 8C77.4833 13.3333 154.967 10.6667 232.45 0" stroke="#A25F00" strokeWidth="3.9245" strokeLinecap="round" />
          </svg>
        </div>

        {/* Courses List - Flexible Grid */}
        <div className="flex flex-wrap justify-center items-center gap-10 w-full z-10">
          {COURSES.map((course, index) => (
            <article 
              key={course.id} 
              className={`relative flex flex-col items-start bg-[#FAFAFA] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 md:p-8 transition-transform duration-300 hover:scale-105 hover:z-30 w-[300px] md:w-[340px] shrink-0 ${index === 0 ? '-rotate-1' : index === 1 ? 'rotate-2' : '-rotate-3'}`}
            >
              {/* The Pin */}
              <img src="/images/pin.png" alt="pin" className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 z-20 drop-shadow-md" />
              
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
                <a href="#book" className="inline-block text-center w-full px-10 py-3 bg-[#7D713C] text-white font-ibm-plex font-semibold text-sm uppercase tracking-widest rounded-sm shadow-md transition-colors hover:bg-[#597257]">
                  Book Now
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Section Footer - All Courses CTA */}
        <div className="flex flex-col items-center gap-3 mt-4 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-sm shadow-md rotate-1">
          <p className="font-amiri text-lg text-[#45483A] text-center font-bold">
            دورات متخصصة تغطي مختلف المهارات الفنية
          </p>
          <a
            href="#"
            className="text-[#A25F00] font-ibm-plex font-semibold text-sm uppercase tracking-widest hover:underline inline-flex items-center gap-2"
          >
            جميع الكورسات
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 7L7 13M12 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
