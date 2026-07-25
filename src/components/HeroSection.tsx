'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/* ── Animation Variants ───────────────────────────────────────────── */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const blobFloat = (delay: number) => ({
  animate: {
    y: [0, -12, 0],
    rotate: [0, 4, -3, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    },
  },
});

/* ── Component ────────────────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <div className="relative flex items-center justify-center h-full w-full overflow-hidden">
      {/* ── Decorative Organic Blobs ── */}
      <motion.div
        {...blobFloat(0)}
        className="absolute -top-16 -right-12 w-48 h-48 md:w-72 md:h-72 rounded-[55%_45%_60%_40%/50%_60%_40%_50%] opacity-20 pointer-events-none"
        style={{ backgroundColor: 'var(--clr-honey)' }}
      />
      <motion.div
        {...blobFloat(1.5)}
        className="absolute top-1/4 -left-16 w-36 h-36 md:w-56 md:h-56 rounded-[40%_60%_55%_45%/55%_45%_60%_40%] opacity-12 pointer-events-none"
        style={{ backgroundColor: 'var(--clr-coral)' }}
      />
      <motion.div
        {...blobFloat(3)}
        className="absolute -bottom-12 right-1/4 w-40 h-40 md:w-60 md:h-60 rounded-[60%_40%_50%_50%/40%_55%_45%_60%] opacity-10 pointer-events-none"
        style={{ backgroundColor: 'var(--clr-olive)' }}
      />
      {/* Small accent blob */}
      <motion.div
        {...blobFloat(2)}
        className="absolute top-16 left-1/3 w-12 h-12 md:w-16 md:h-16 rounded-[45%_55%_50%_50%/60%_40%_60%_40%] opacity-25 pointer-events-none"
        style={{ backgroundColor: '#ABC175' }}
      />
      <motion.div
        {...blobFloat(4)}
        className="absolute bottom-24 -left-8 w-20 h-20 md:w-28 md:h-28 rounded-[50%_50%_45%_55%/45%_55%_50%_50%] opacity-15 pointer-events-none"
        style={{ backgroundColor: 'var(--clr-honey)' }}
      />

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl"
      >
        {/* Logo */}
        <motion.div variants={fadeUp} className="mb-6">
          <div
            className="w-24 h-24 md:w-28 md:h-28 p-2 rounded-full mx-auto"
            style={{
              background: 'var(--clr-surface)',
              border: '1px solid var(--clr-border)',
              boxShadow: '0 8px 24px rgba(58, 46, 28, 0.15)',
            }}
          >
            <img
              src="/logo.png"
              alt="ورشة فن"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-4"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            color: 'var(--clr-heading)',
            lineHeight: 1.15,
          }}
        >
          المكان المثالي للترفيه
          <br />
          <span style={{ color: 'var(--clr-coral)' }}>عن طريق الفن</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl mb-8"
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--clr-text-muted)',
            fontWeight: 400,
          }}
        >
          و لتعلم مختلف الفنون بأحترافية!
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <Link href="/about" className="w-full sm:w-auto">
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold cursor-pointer w-full sm:w-auto"
              style={{
                fontFamily: 'var(--font-body)',
                background: 'var(--clr-olive)',
                color: '#fff',
                boxShadow: '0 4px 16px var(--clr-olive-glow)',
                transition: 'background 0.25s ease',
              }}
              id="hero-about-btn"
            >
              <span>🎨</span>
              من نحن
            </motion.div>
          </Link>

          <Link href="/menu" className="w-full sm:w-auto">
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold cursor-pointer w-full sm:w-auto"
              style={{
                fontFamily: 'var(--font-body)',
                background: 'var(--clr-surface)',
                color: 'var(--clr-text)',
                border: '1.5px solid var(--clr-border)',
                transition: 'background 0.25s ease, border-color 0.25s ease',
              }}
              id="hero-menu-btn"
            >
              <span>📋</span>
              القائمة
            </motion.div>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-col items-center gap-2 opacity-40"
        >
          <span
            className="text-xs"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--clr-text-dim)',
            }}
          >
            مرر للأسفل
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: '1.5px solid var(--clr-text-dim)' }}
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full"
              style={{ backgroundColor: 'var(--clr-text-dim)' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
