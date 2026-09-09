'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface AnimatedUnderlineProps {
  /** SVG viewBox width */
  width?: number;
  /** SVG viewBox height */
  height?: number;
  /** The SVG path `d` attribute */
  pathD?: string;
  /** Stroke color */
  strokeColor?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** CSS width of the SVG element (e.g. '234px', '160px') */
  svgWidth?: string;
  /** CSS height of the SVG element */
  svgHeight?: string;
  /** ScrollTrigger start position */
  start?: string;
  /** ScrollTrigger end position */
  end?: string;
  /** Scrub value for smoothness */
  scrub?: number | boolean;
  /** Extra className for the SVG */
  className?: string;
}

/**
 * A reusable animated SVG underline that "draws itself" via clip-path reveal
 * as the user scrolls. Uses GSAP ScrollTrigger with scrub.
 *
 * RTL direction: reveals from right → left (inset from left shrinks to 0).
 */
export default function AnimatedUnderline({
  width = 234,
  height = 16,
  pathD = 'M0 8C77.4833 13.3333 154.967 10.6667 232.45 0',
  strokeColor = '#4D6314',
  strokeWidth = 3.9245,
  svgWidth,
  svgHeight,
  start = 'top 85%',
  end = 'top 50%',
  scrub = 1,
  className = '',
}: AnimatedUnderlineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Start fully hidden (clip from the left = 100%)
    gsap.set(el, {
      clipPath: 'inset(0 0 0 100%)',
    });

    // Animate: reveal from right to left (Arabic RTL direction)
    gsap.to(el, {
      clipPath: 'inset(0 0 0 0%)',
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
      },
    });
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className="inline-block w-fit">
      <svg
        width={svgWidth || String(width)}
        height={svgHeight || String(height)}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path
          d={pathD}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
