'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ActivityCard from './ActivityCard';

const MOCK_ACTIVITIES = [
  {
    id: 1,
    title: 'تلوين الفخار',
    description: 'اختر قطعة فخارية وقم بتلوينها بألوان الأكريليك وتزيينها بلمستك الخاصة.',
    price: '١٥,٠٠٠',
    emoji: '🏺',
    accentColor: '#E7DFCB', // Mint/Cream
  },
  {
    id: 2,
    title: 'الرسم على الحقائب',
    description: 'حقيبة قماشية (Tote Bag) جاهزة لتحويلها إلى لوحة فنية تعبر عنك.',
    price: '١٢,٠٠٠',
    emoji: '🛍️',
    accentColor: '#F6F0E2', // Surface
  },
  {
    id: 3,
    title: 'تلوين اللوحات (Canvas)',
    description: 'لوحات كانفاس بأحجام مختلفة مع ألوان أكريليك لتفريغ طاقتك الإبداعية.',
    price: '١٠,٠٠٠',
    emoji: '🎨',
    accentColor: '#E7DCC6', // Surface-2
  },
  {
    id: 4,
    title: 'صناعة الأساور',
    description: 'تشكيلة واسعة من الخرز والأحجار لصنع أساور و قلادات مميزة.',
    price: '٨,٠٠٠',
    emoji: '📿',
    accentColor: '#F0EBD8', // Background blend
  },
];

/* ── Animation Variants ── */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

export default function RecreationalSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6 py-20 relative">
      
      {/* ── Background Decoration ── */}
      <div 
        className="absolute top-0 w-full h-full opacity-30 pointer-events-none"
        style={{ backgroundImage: 'var(--tex-canvas)', backgroundSize: '400px' }}
      />
      
      {/* ── Section Header ── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl mb-4 relative inline-block"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            color: 'var(--clr-heading)',
          }}
        >
          النشاطات الترفيهية
          {/* Honey Brush Underline */}
          <svg 
            className="absolute -bottom-4 right-0 w-full h-4 text-[#C08A2D] opacity-80" 
            viewBox="0 0 200 12" 
            fill="none" 
            preserveAspectRatio="none"
          >
            <path d="M2 9.5C45.5 3.5 110.5 -1.5 198 8.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </h2>
        <p 
          className="text-lg mt-6 max-w-lg mx-auto"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--clr-text-muted)',
          }}
        >
          نشاطات فنية حرة يومياً بدون حجز مسبق. تعال بوقتك وصمم قطعتك الفنية بلمستك الخاصة!
        </p>
      </motion.div>

      {/* ── Grid ── */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl relative z-10"
      >
        {MOCK_ACTIVITIES.map((activity) => (
          <motion.div key={activity.id} variants={item}>
            <ActivityCard {...activity} />
          </motion.div>
        ))}
      </motion.div>
      
    </div>
  );
}
