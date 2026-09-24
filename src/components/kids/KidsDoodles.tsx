'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';

/* ── All kids illustration filenames (emptied so user can arrange them manually) ── */
const ALL_DOODLES: string[] = [];

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
  bottom: string;
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
      // Distribute horizontally across the bottom line
      // Even index -> Left side, Odd index -> Right side to avoid center text overlap
      const isLeft = i % 2 === 0;
      const leftOffset = isLeft
        ? rand() * 35 + 5   // 5% – 40% (left side)
        : rand() * 35 + 60; // 60% – 95% (right side)

      // Randomize slightly off the exact bottom line (0% to -2% so they overlap the line slightly)
      const bottomOffset = rand() * -2;

      return {
        src: `/images/kids/${file}`,
        bottom: `${bottomOffset}%`,
        left: `${leftOffset}%`,
        size: Math.floor(rand() * 100 + 160), // 160px – 260px (Much larger)
        rotate: Math.floor(rand() * 30 - 15), // -15° to +15°
        opacity: rand() * 0.2 + 0.8, // 0.8 – 1.0 (Much clearer)
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
            bottom: d.bottom,
            left: d.left,
            width: d.size,
            height: d.size,
            transform: `translateX(-50%) rotate(${d.rotate}deg)`,
            transformOrigin: 'bottom center',
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
