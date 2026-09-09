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
  /** CSS width of the SVG element (e.g. '234', '160') */
  svgWidth?: string;
  /** CSS height of the SVG element */
  svgHeight?: string;
  /** ScrollTrigger start position */
  start?: string;
  /** ScrollTrigger end position */
  end?: string;
  /** Scrub value for smoothness */
  scrub?: number | boolean;
  /** Extra className for the wrapper */
  className?: string;
}

/**
 * A reusable animated SVG underline that "draws itself" as the user scrolls.
 * Uses stroke-dasharray & stroke-dashoffset with GSAP ScrollTrigger scrub.
 *
 * Usage:
 * ```tsx
 * <AnimatedUnderline strokeColor="#4D6314" />
 * ```
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
  end = 'top 40%',
  scrub = 1,
  className = '',
}: AnimatedUnderlineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const path = pathRef.current;
    if (!path) return;

    // Get the total length of the SVG path
    const totalLength = path.getTotalLength();

    // Set initial state: path fully hidden (dashoffset = totalLength)
    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    // Animate: draw the path by reducing dashoffset to 0
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: svgRef.current,
        start,
        end,
        scrub,
      },
    });
  }, { scope: svgRef });

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{
        width: svgWidth || '80%',
        maxWidth: svgWidth ? `${svgWidth}px` : undefined,
        height: 'auto',
      }}
    >
      <path
        ref={pathRef}
        d={pathD}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
