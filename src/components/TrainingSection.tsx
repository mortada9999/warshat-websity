'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TrainingCard from './TrainingCard';

const MOCK_TRAINING = [
  {
    id: 1,
    title: 'أساسيات فن التطريز',
    instructor: 'مريم أحمد',
    duration: '٣ أيام - ساعتين يومياً',
    price: '٣٥,٠٠٠',
    emoji: '🧵',
    imageBg: '#D6F1E6', // Soft Mint
  },
  {
    id: 2,
    title: 'نحت الطين الاحترافي',
    instructor: 'علي باسم',
    duration: 'يومين - ٣ ساعات يومياً',
    price: '٤٠,٠٠٠',
    emoji: '🏺',
    imageBg: '#F6E6D9', // Soft Peach
  },
  {
    id: 3,
    title: 'الرسم الزيتي للمبتدئين',
    instructor: 'سارة محمد',
    duration: '٤ أيام - ساعتين يومياً',
    price: '٤٥,٠٠٠',
    emoji: '🖼️',
    imageBg: '#E3E8FF', // Soft Blue
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  },
};

export default function TrainingSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6 py-20 relative">
      
      {/* ── Background Decoration ── */}
      <div 
        className="absolute top-0 w-full h-full opacity-10 pointer-events-none"
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
          className="text-4xl md:text-5xl lg:text-6xl mb-4 relative inline-block text-white"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}
        >
          الورش التدريبية
          {/* Honey Brush Underline */}
          <svg 
            className="absolute -bottom-4 right-0 w-full h-4 text-[#C08A2D] opacity-90" 
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
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          تعلم فنون جديدة بخطوات عملية مع مدربين متخصصين. الأماكن محدودة، احجز مكانك الآن!
        </p>
      </motion.div>

      {/* ── Grid ── */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10 pb-4"
      >
        {MOCK_TRAINING.map((training) => (
          <motion.div key={training.id} variants={item}>
            <TrainingCard {...training} />
          </motion.div>
        ))}
      </motion.div>
      
    </div>
  );
}
