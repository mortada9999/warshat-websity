'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TrainingCardProps {
  title: string;
  instructor: string;
  duration: string;
  price: string;
  emoji: string;
  imageBg: string;
}

export default function TrainingCard({
  title,
  instructor,
  duration,
  price,
  emoji,
  imageBg,
}: TrainingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: -0.5 }}
      className="relative flex flex-col bg-white rounded-xl overflow-visible transition-all duration-300"
      style={{
        border: '1.5px solid var(--clr-olive)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
      }}
    >
      {/* ── Image Area (16:10 Ratio) ── */}
      <div 
        className="w-full aspect-[16/10] rounded-t-[10px] flex items-center justify-center text-6xl"
        style={{ backgroundColor: imageBg }}
      >
        {emoji}
      </div>

      {/* ── Content ── */}
      <div className="p-6 flex flex-col flex-grow items-center text-center">
        <h3
          className="text-xl md:text-2xl font-bold mb-3"
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--clr-heading)',
          }}
        >
          {title}
        </h3>
        
        <div 
          className="text-sm mb-6 flex flex-col gap-1 w-full opacity-80"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--clr-text-muted)' }}
        >
          <p>👨‍🎨 المدرب: <span className="font-bold">{instructor}</span></p>
          <p>⏱️ المدة: <span className="font-bold">{duration}</span></p>
          <p>💳 السعر: <span className="font-bold text-[#C85A3C]">{price} د.ع</span></p>
        </div>

        {/* ── Book CTA ── */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="mt-auto px-8 py-3 w-full sm:w-auto font-bold text-white text-sm cursor-pointer"
          style={{
            backgroundColor: 'var(--clr-olive)',
            borderRadius: '4px', // "slightly squared (4px) olive block"
            fontFamily: 'var(--font-body)',
            boxShadow: '0 4px 14px var(--clr-olive-glow)',
          }}
        >
          احجز مكانك
        </motion.button>
      </div>

      {/* ── Decorative Triangle Under Card ── */}
      <div 
        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white"
        style={{
          borderBottom: '1.5px solid var(--clr-olive)',
          borderRight: '1.5px solid var(--clr-olive)',
          rotate: '45deg',
        }}
      />
    </motion.div>
  );
}
