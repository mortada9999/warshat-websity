'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from './LanguageProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ── 3 unique hand-drawn brush-stroke paths ── */
const BRUSH_PATHS = [
  // Variant 0: gentle wobble with natural dip
  'M2 7 C20 3, 45 11, 75 6 S130 2, 160 8 S220 4, 260 9 C280 6, 292 4, 298 7',
  // Variant 1: aggressive wave with peaks near edges
  'M3 5 C25 10, 55 2, 85 8 C115 12, 140 3, 170 7 S230 11, 265 4 C285 2, 295 8, 298 6',
  // Variant 2: artistic sweep, rises then dips
  'M2 9 C30 3, 65 11, 100 5 C135 1, 155 10, 190 7 S250 3, 280 8 C290 10, 296 4, 298 6',
];

/*
 * Transforms that create visual variation WITHOUT flipping
 * the horizontal direction (no scaleX(-1) — that would reverse
 * the clip-path reveal direction).
 */
const VARIANT_STYLES: Record<number, React.CSSProperties> = {
  0: {},                                           // natural
  1: { transform: 'rotate(0.4deg)' },              // gentle organic tilt
  2: { transform: 'rotate(-0.5deg)' },             // subtle reverse tilt
};

interface AnimatedUnderlineProps {
  /** Visual variant (0 | 1 | 2) — different path + transform */
  variant?: number;
  /** Stroke color (should match heading color) */
  strokeColor?: string;
  /** Stroke thickness */
  strokeWidth?: number;
  /** Optional custom CSS classes (e.g. margin/spacing) */
  className?: string;
  /** ScrollTrigger start */
  start?: string;
  /** ScrollTrigger end */
  end?: string;
  /** Scrub smoothness */
  scrub?: number | boolean;
}

/**
 * Animated brush-stroke underline that draws itself on scroll.
 *
 * Direction-aware:
 *   Arabic (RTL) → reveals right → left
 *   English (LTR) → reveals left → right
 *
 * USAGE: wrap <h2> + <AnimatedUnderline> inside a
 *        `w-fit mx-auto flex flex-col items-center` container.
 */
export default function AnimatedUnderline({
  variant = 0,
  strokeColor = '#4D6314',
  strokeWidth = 5,
  className = '',
  start = 'top 85%',
  end = 'top 50%',
  scrub = 1,
}: AnimatedUnderlineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { isRtl } = useLanguage();
  const idx = Math.abs(variant) % 3;

  useGSAP(() => {
    const el = wrapperRef.current;
    if (!el) return;

    /*
     * RTL (Arabic):  clip the LEFT side → reveal right-to-left
     * LTR (English): clip the RIGHT side → reveal left-to-right
     */
    const hiddenClip = isRtl
      ? 'inset(0% 0% 0% 100%)'   // left edge clips 100%
      : 'inset(0% 100% 0% 0%)';  // right edge clips 100%

    const visibleClip = 'inset(0% 0% 0% 0%)';

    gsap.set(el, { clipPath: hiddenClip });

    gsap.to(el, {
      clipPath: visibleClip,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
      },
    });
  }, { scope: wrapperRef, dependencies: [isRtl] });

  return (
    <div
      ref={wrapperRef}
      className={`w-full ${className || 'mt-3.5'}`}
      style={VARIANT_STYLES[idx] || {}}
      suppressHydrationWarning
    >
      <svg
        width="100%"
        height="14"
        viewBox="0 0 300 16"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d={BRUSH_PATHS[idx]}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
