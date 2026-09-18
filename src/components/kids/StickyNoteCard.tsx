'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type StickyNoteColor = 'yellow' | 'blue' | 'pink' | 'mint';

const COLOR_MAP: Record<StickyNoteColor, { bg: string; text: string; pin: string }> = {
  yellow: { bg: '#FFF3C4', text: '#8A6D1A', pin: '#E4572E' },
  blue:   { bg: '#D9ECFF', text: '#2C5F8A', pin: '#1E88E5' },
  pink:   { bg: '#FFDCEC', text: '#A03D6B', pin: '#D63384' },
  mint:   { bg: '#DDF5E3', text: '#2E7D46', pin: '#2E9E5B' },
};

interface StickyNoteCardProps {
  title: string;
  desc: string;
  image: string;
  color: StickyNoteColor;
  rotate: number;
  alt?: string;
}

/**
 * StickyNoteCard — a pastel sticky note pinned to a corkboard.
 * Slightly draggable (snaps back), lifts on hover.
 */
export default function StickyNoteCard({
  title,
  desc,
  image,
  color,
  rotate,
  alt,
}: StickyNoteCardProps) {
  const palette = COLOR_MAP[color];

  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.35}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 22 }}
      whileDrag={{ scale: 1.06, rotate: 0, zIndex: 30 }}
      whileHover={{ y: -6, scale: 1.04, rotate: 0 }}
      initial={{ opacity: 0, y: 30, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="relative w-40 cursor-grab select-none sm:w-48"
      style={{ transformOrigin: 'top center' }}
    >
      {/* Push pin */}
      <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
        <Image
          src="/images/pin.png"
          alt=""
          width={30}
          height={30}
          className="h-7 w-7 object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
          unoptimized
        />
      </div>

      {/* Note body */}
      <div
        className="flex flex-col items-center gap-2 rounded-sm px-4 pb-5 pt-7 text-center shadow-[0_10px_22px_rgba(60,40,20,0.22)] transition-shadow duration-300"
        style={{ backgroundColor: palette.bg, color: palette.text }}
      >
        <div className="relative aspect-square w-24 overflow-hidden rounded-sm bg-white/50 sm:w-28">
          <Image
            src={image}
            alt={alt ?? title}
            fill
            sizes="(max-width: 640px) 96px, 112px"
            className="object-cover"
          />
        </div>
        <h3 className="font-handwritten text-lg leading-tight sm:text-xl">{title}</h3>
        <p className="text-xs leading-relaxed opacity-80 sm:text-sm">{desc}</p>
      </div>

      {/* Folded corner illusion */}
      <span
        className="absolute bottom-0 right-0 h-0 w-0 border-l-[16px] border-t-[16px] border-l-transparent border-t-black/10"
        aria-hidden="true"
      />
    </motion.div>
  );
}
