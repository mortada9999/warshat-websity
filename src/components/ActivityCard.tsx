'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ActivityCardProps {
  title: string;
  description: string;
  price: string;
  emoji: string;
  accentColor: string;
}

export default function ActivityCard({
  title,
  description,
  price,
  emoji,
  accentColor,
}: ActivityCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: -1 }}
      className="relative flex flex-col items-center p-6 bg-white rounded-3xl"
      style={{
        boxShadow: '0 8px 24px rgba(58, 46, 28, 0.08)',
        border: '1px solid rgba(93, 74, 45, 0.08)',
      }}
    >
      {/* ── Circular Image/Emoji ── */}
      <div
        className="w-36 h-36 rounded-full flex items-center justify-center text-6xl mb-5 shadow-inner"
        style={{ backgroundColor: accentColor }}
      >
        {emoji}
      </div>

      {/* ── Content ── */}
      <h3
        className="text-2xl font-bold mb-2 text-center"
        style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--clr-heading)',
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p
        className="text-sm text-center mb-6"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--clr-text-muted)',
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      {/* ── Brush Price Chip ── */}
      <div
        className="mt-auto px-5 py-2 text-white font-bold text-sm transform -rotate-2"
        style={{
          backgroundColor: 'var(--clr-coral)',
          borderRadius: '8px 30px 10px 40px',
          fontFamily: 'var(--font-body)',
          boxShadow: '0 4px 12px rgba(200, 90, 60, 0.25)',
        }}
      >
        {price} د.ع
      </div>
    </motion.div>
  );
}
