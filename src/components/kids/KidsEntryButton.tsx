'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * KidsEntryButton — the "gateway" to the kids page.
 * A mini wooden chalkboard hanging from a colourful yarn string.
 * Bouncy / swinging hover via spring physics.
 */
export default function KidsEntryButton() {
  return (
    <motion.div
      className="inline-flex flex-col items-center"
      style={{ transformOrigin: 'top center' }}
      animate={{ rotate: [0, -4, 3.5, -2.5, 1.5, 0] }}
      transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut' }}
      whileHover={{
        rotate: 0,
        scale: 1.07,
        transition: { type: 'spring', stiffness: 260, damping: 12 },
      }}
    >
      {/* Colourful yarn string */}
      <div
        className="relative h-16 w-2 rounded-full shadow-sm sm:h-20"
        style={{
          background:
            'linear-gradient(180deg, #F472B6 0%, #FBBF24 35%, #38BDF8 70%, #34D399 100%)',
        }}
        aria-hidden="true"
      >
        {/* little yarn fuzz */}
        <span className="absolute -left-1 top-4 h-1.5 w-1.5 rounded-full bg-rose-300" />
        <span className="absolute -right-1 top-10 h-1.5 w-1.5 rounded-full bg-sky-300" />
      </div>

      {/* Chalkboard in a wooden frame */}
      <Link
        href="/kids"
        className="relative mt-[-2px] inline-block rounded-md border-[6px] border-[#B98A5A] bg-[#3E4A3D] px-5 py-4 text-center shadow-[0_12px_24px_rgba(60,40,20,0.25)] transition-colors hover:bg-[#465548] sm:px-7 sm:py-5"
      >
        <span className="font-handwritten block text-xl leading-tight text-[#F7F3E3] sm:text-2xl">
          ورش الأطفال
        </span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-[#C8E6C9] sm:text-xs">
          Kids Corner
        </span>
      </Link>
    </motion.div>
  );
}
