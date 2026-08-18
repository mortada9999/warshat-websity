'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DoodleBackground from './DoodleBackground';
import PolaroidCard from './PolaroidCard';
import StickyNoteCard from './StickyNoteCard';
import type { StickyNoteColor } from './StickyNoteCard';

interface Course {
  title: string;
  image: string;
  rotate: number;
}

interface Workshop {
  title: string;
  desc: string;
  image: string;
  color: StickyNoteColor;
  rotate: number;
}

const COURSES: Course[] = [
  { title: 'الرسم بالألوان المائية', image: '/images/KIDS1.PNG', rotate: -4 },
  { title: 'صناعة الأساور', image: '/images/kids4.png', rotate: 5 },
  { title: 'الرسم على القماش', image: '/images/kids5.png', rotate: -2 },
  { title: 'تشكيل الصلصال', image: '/images/kids6.png', rotate: 3 },
  { title: 'الكولاج الورقي', image: '/images/kids7.png', rotate: -5 },
  { title: 'الرسم بالطباشير', image: '/images/kids8.png', rotate: 4 },
];

const WORKSHOPS: Workshop[] = [
  {
    title: 'ورشة الطين',
    desc: 'نشكّل ونلوّن قطعاً فخارية بأيدينا',
    image: '/images/workshop-clay.png',
    color: 'yellow',
    rotate: -3,
  },
  {
    title: 'ورشة التطريز',
    desc: 'غرز بسيطة وملوّنة على القماش',
    image: '/images/workshop-embroidery.png',
    color: 'blue',
    rotate: 4,
  },
  {
    title: 'ورشة الرسم الزيتي',
    desc: 'لوحات زيتية خطوة بخطوة',
    image: '/images/workshop-oilpaint.png',
    color: 'pink',
    rotate: -4,
  },
  {
    title: 'ورشة الحقائب',
    desc: 'نرسم على الحقائب القماشية',
    image: '/images/activity-totebag.png',
    color: 'mint',
    rotate: 2,
  },
];

export default function KidsPage() {
  return (
    <main dir="rtl" className="relative min-h-screen overflow-x-hidden text-stone-800">
      <DoodleBackground />

      {/* ── Hero / title ── */}
      <section className="relative z-10 px-6 pb-10 pt-32 text-center sm:pt-36">
        <motion.h1
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          className="font-handwritten text-4xl text-[#E4572E] sm:text-6xl"
        >
          قسم الأطفال
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-handwritten mx-auto mt-3 max-w-xl text-lg text-stone-500 sm:text-xl"
        >
          كورسات وورش تدريبية ملوّنة، مثل صفحة دفتر رسم لطفل مفعم بالخيال
        </motion.p>
      </section>

      {/* ── Courses: Polaroids on yarn ── */}
      <section className="relative z-10 px-4 py-14">
        <h2 className="font-handwritten mb-2 text-center text-3xl text-[#B98A5A] sm:text-4xl">
          كورسات
        </h2>
        <p className="mb-8 text-center text-sm text-stone-500">معلّقة على خيط ملوّن</p>

        {/* Yarn line */}
        <div className="relative mx-auto mb-6 max-w-4xl">
          <svg
            viewBox="0 0 800 40"
            className="h-8 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 18 C 160 38, 320 2, 480 20 S 720 34, 800 14"
              fill="none"
              stroke="#E4572E"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Polaroids (scattered, organic) */}
        <div className="mx-auto flex max-w-5xl flex-wrap items-start justify-center gap-x-5 gap-y-10 sm:gap-x-8">
          {COURSES.map((c) => (
            <PolaroidCard
              key={c.title}
              title={c.title}
              image={c.image}
              rotate={c.rotate}
            />
          ))}
        </div>
      </section>

      {/* ── Workshops: sticky notes on corkboard ── */}
      <section className="relative z-10 px-4 py-16">
        <div
          className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border-8 border-[#B98A5A] shadow-[0_18px_40px_rgba(60,40,20,0.25)]"
          style={{
            backgroundImage: 'url("/images/cork-board.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* darken overlay for readability */}
          <div className="absolute inset-0 bg-[#5b3d1e]/20" aria-hidden="true" />

          <div className="relative px-6 py-12">
            <h2 className="font-handwritten mb-1 text-center text-3xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] sm:text-4xl">
              ورش تدريبية
            </h2>
            <p className="mb-10 text-center text-sm text-[#F3E6CE]">ملاحظات لاصقة على لوحة الفلين</p>

            <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-12 sm:gap-x-10">
              {WORKSHOPS.map((w) => (
                <StickyNoteCard
                  key={w.title}
                  title={w.title}
                  desc={w.desc}
                  image={w.image}
                  color={w.color}
                  rotate={w.rotate}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer note ── */}
      <footer className="relative z-10 px-6 pb-16 pt-6 text-center">
        <p className="font-handwritten text-lg text-stone-500">صُنع بحبّ وشغفٍ فنّي 🎨</p>
      </footer>
    </main>
  );
}
