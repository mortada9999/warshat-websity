'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';

/* ── All 16 kids illustration filenames ───────────────────── */
const ALL_DOODLES = [
  'Picsart_26-09-23_21-50-51-480.png',
  'Picsart_26-09-23_21-51-43-658.png',
  'Picsart_26-09-23_21-52-28-402.png',
  'Picsart_26-09-23_21-54-51-519.png',
  'Picsart_26-09-23_21-55-58-212.png',
  'Picsart_26-09-23_21-56-43-732.png',
  'Picsart_26-09-23_21-57-34-123.png',
  'Picsart_26-09-23_21-58-38-281.png',
  'Picsart_26-09-23_21-59-46-925.png',
  'Picsart_26-09-23_22-11-44-786.png',
  'Picsart_26-09-23_22-13-32-415.png',
  'Picsart_26-09-23_22-15-13-257.png',
  'Picsart_26-09-23_22-16-01-724.png',
  'Picsart_26-09-23_22-23-03-700.png',
  'Picsart_26-09-23_22-24-17-667.png',
  'Picsart_26-09-23_22-25-38-499.png',
];

/* Seeded PRNG for deterministic "random" layout across renders */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* Fisher-Yates shuffle with seed */
function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  const rand = seededRandom(seed);
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface DoodlePosition {
  src: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
  opacity: number;
}

interface KidsDoodlesProps {
  /** How many doodles to show (default 6, max 16) */
  count?: number;
  /** Seed for shuffle/positioning (use different seeds for different sections) */
  seed?: number;
  /** Extra className for the wrapper */
  className?: string;
}

/**
 * Scatters cute kids illustration PNGs as decorative floating elements.
 * Fully responsive, pointer-events-none, and uses `position: absolute` within a relative parent.
 */
export default function KidsDoodles({ count = 6, seed = 42, className = '' }: KidsDoodlesProps) {
  const doodles = useMemo<DoodlePosition[]>(() => {
    const rand = seededRandom(seed + 100);
    const shuffled = shuffleWithSeed(ALL_DOODLES, seed);
    const selected = shuffled.slice(0, Math.min(count, ALL_DOODLES.length));

    return selected.map((file, i) => {
      // Distribute vertically across the section
      const verticalSlot = (i / selected.length) * 100;
      const topOffset = verticalSlot + rand() * (100 / selected.length) * 0.6;
      // Alternate sides: even → left side (0–25%), odd → right side (75–100%)
      const isLeft = i % 2 === 0;
      const leftOffset = isLeft
        ? rand() * 20 + 2   // 2% – 22%
        : rand() * 20 + 78; // 78% – 98%

      return {
        src: `/images/kids/${file}`,
        top: `${Math.min(topOffset, 92)}%`,
        left: `${leftOffset}%`,
        size: Math.floor(rand() * 40 + 60), // 60px – 100px
        rotate: Math.floor(rand() * 30 - 15), // -15° to +15°
        opacity: rand() * 0.25 + 0.15, // 0.15 – 0.4
      };
    });
  }, [count, seed]);

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {doodles.map((d, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            transform: `rotate(${d.rotate}deg) translate(-50%, -50%)`,
            opacity: d.opacity,
            transition: 'opacity 0.3s ease',
          }}
        >
          <Image
            src={d.src}
            alt=""
            width={d.size}
            height={d.size}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            loading="lazy"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
