'use client';

import React from 'react';
import Image from 'next/image';

/* ─── Data ─────────────────────────────────────────────────────────────── */
const COURSES = [
  {
    id: 1,
    titleAr: 'كورس تعليم الرسم',
    sessions: '٨ جلسات',
    image: '/images/figma/pottery.png',
    rotate: '-rotate-3',
  },
  {
    id: 2,
    titleAr: 'تقنيات الفخار المتقدمة',
    sessions: '١٢ جلسة',
    image: '/images/figma/mirror.png',
    rotate: 'rotate-2',
  },
  {
    id: 3,
    titleAr: 'كورس الحياكة',
    sessions: '٦ جلسات',
    image: '/images/figma/tote-bag.png',
    rotate: '-rotate-1',
  },
];

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function CoursesBannerSection() {
  return (
    <section
      id="courses"
      aria-label="الكورسات"
      className="relative w-full min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/cork-board.jpg')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/*
        Massive inner padding creates the "safe zone" —
        all content stays strictly inside the cork area, never touching the wooden frame.
      */}
      <div className="w-full h-full flex flex-col items-center gap-12 px-24 py-24 md:px-32 md:py-28 lg:px-40 lg:py-36">

        {/* ── Section title: torn-paper look ── */}
        <div className="relative inline-block">
          {/* Static pin above the paper — outside the card transform */}
          <img
            src="/images/pin.png"
            alt=""
            aria-hidden="true"
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 z-30 drop-shadow-md pointer-events-none"
          />
          {/* Paper label with rough edges via box-shadow & slight rotation */}
          <div
            className="relative bg-[#FAFAFA] px-10 py-4 rotate-1 shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
            style={{
              clipPath:
                'polygon(0% 4%, 2% 0%, 5% 3%, 8% 1%, 12% 4%, 15% 0%, 20% 3%, 25% 1%, 30% 4%, 35% 0%, 40% 3%, 45% 1%, 50% 4%, 55% 0%, 60% 3%, 65% 1%, 70% 4%, 75% 0%, 80% 3%, 85% 1%, 90% 4%, 95% 0%, 100% 3%, 100% 97%, 97% 100%, 92% 97%, 87% 100%, 82% 97%, 77% 100%, 72% 97%, 67% 100%, 62% 97%, 57% 100%, 52% 97%, 47% 100%, 42% 97%, 37% 100%, 32% 97%, 27% 100%, 22% 97%, 17% 100%, 12% 97%, 7% 100%, 2% 97%, 0% 100%)',
            }}
          >
            <h2
              className="text-5xl md:text-6xl font-bold text-[#374A00] text-center leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              الكورسات
            </h2>
            {/* Brush-stroke underline */}
            <svg
              viewBox="0 0 240 12"
              fill="none"
              className="mx-auto mt-2 w-48"
              aria-hidden="true"
            >
              <path
                d="M4 8C80 2 160 12 236 6"
                stroke="#A25F00"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 w-full">
          {COURSES.map((course) => (
            /*
              Outer wrapper: relative, holds the static pin.
              The pin does NOT move — it stays fixed while the card below swings.
            */
            <div
              key={course.id}
              className={`relative pt-6 ${course.rotate}`}
              style={{ width: 'clamp(200px, 22vw, 260px)' }}
            >
              {/* Static pin — outside the hover/scale container */}
              <img
                src="/images/pin.png"
                alt=""
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 z-30 drop-shadow-md pointer-events-none"
              />

              {/*
                Paper card: hover scale + un-rotate, origin-top.
                This creates the pendulum/swing effect — card swings from the static pin.
              */}
              <article
                className="relative bg-[#FAFAFA] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden
                           transition-all duration-300 ease-out
                           hover:scale-105 hover:rotate-0
                           origin-top"
              >
                {/* Course image */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.titleAr}
                    fill
                    className="object-cover"
                    sizes="260px"
                  />
                </div>

                {/* Card body */}
                <div
                  className="flex flex-col items-end gap-2 p-4 text-right"
                  dir="rtl"
                >
                  <h3
                    className="text-lg font-bold text-[#597257] leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {course.titleAr}
                  </h3>

                  {/* Session count */}
                  <div className="flex items-center gap-1 text-xs text-[#45483A]" style={{ fontFamily: 'var(--font-body)' }}>
                    <span>{course.sessions}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#45483A" strokeWidth="1.5"/>
                      <path d="M3 9h18M8 2v4M16 2v4" stroke="#45483A" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* Dashed separator */}
                  <div className="w-full border-t border-dashed border-[#C5C8B6]" />

                  {/*
                    Book Now button — uses the existing .bookBtn pattern
                    from TrainingSection.module.css for project consistency.
                  */}
                  <a
                    href="#book"
                    className="self-stretch text-center mt-1 px-6 py-2 rounded
                               bg-[#374a00] text-white text-xs font-semibold
                               transition-all duration-200
                               hover:bg-[#2a3800] hover:-translate-y-px"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    احجز الآن
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* ── Footer CTA note ── */}
        <div className="relative">
          <img
            src="/images/pin.png"
            alt=""
            aria-hidden="true"
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-9 h-9 z-30 drop-shadow-md pointer-events-none"
          />
          <div
            className="relative bg-[#FAFAFA]/90 px-8 py-3 -rotate-1 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
          >
            <p
              className="text-sm text-[#45483A] font-bold text-center"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              دورات متخصصة تغطي مختلف المهارات الفنية
            </p>
            <a
              href="#"
              className="mt-2 flex items-center justify-center gap-2 text-[#A25F00] text-xs font-semibold tracking-widest uppercase hover:underline"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              جميع الكورسات
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1L13 7L7 13M12 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
