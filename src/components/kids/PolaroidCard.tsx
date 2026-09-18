'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PolaroidCardProps {
  title: string;
  image: string;
  rotate: number;
  alt?: string;
}

/**
 * PolaroidCard — a photo hanging from the yarn line by a wooden peg.
 * Grayscale by default, straightens and colours-in on hover.
 */
export default function PolaroidCard({ title, image, rotate, alt }: PolaroidCardProps) {
  return (
    <motion.div
      className="group relative flex flex-col items-center"
      initial={{ opacity: 0, y: 40, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.1, margin: '50px' }}
      transition={{ type: 'spring', stiffness: 160, damping: 16 }}
      whileHover={{ scale: 1.1, rotate: 0, y: -10 }}
    >
      {/* Wooden peg */}
      <div
        className="z-10 h-4 w-2.5 -translate-y-1 rounded-b-sm shadow-sm"
        style={{
          background:
            'linear-gradient(90deg, #a2703f 0%, #d0a36a 45%, #8c5d30 100%)',
        }}
      />
      {/* Short string from yarn down to the photo */}
      <div className="h-6 w-px bg-stone-400" />

      {/* Polaroid frame */}
      <div className="rounded-sm bg-white p-2 pb-3 shadow-[0_10px_24px_rgba(60,40,20,0.18)] transition-shadow duration-300 group-hover:shadow-[0_18px_36px_rgba(60,40,20,0.28)]">
        <div className="relative aspect-square w-36 overflow-hidden bg-stone-200 sm:w-44">
          <Image
            src={image}
            alt={alt ?? title}
            fill
            sizes="(max-width: 640px) 144px, 176px"
            className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
          />
          {/* little tape strip for collage feel */}
          <span
            className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-[-4deg] bg-white/50 shadow-sm"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Handwritten Arabic title */}
      <p className="font-handwritten mt-2 max-w-[9rem] rotate-[-2deg] text-center text-lg leading-tight text-stone-700 sm:max-w-[11rem] sm:text-xl">
        {title}
      </p>
    </motion.div>
  );
}
