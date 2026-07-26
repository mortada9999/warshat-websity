'use client';

import React from 'react';
import styles from './ScrollSection.module.css';

interface ScrollSectionProps {
  children: React.ReactNode;
  sectionIndex: number;
  totalSections: number;
  bgColor?: string;
  className?: string;
  tornEdge?: boolean;
  tornColor?: string;
}

export default function ScrollSection({
  children,
  sectionIndex,
  totalSections,
  bgColor = 'var(--bg)',
  className = '',
  tornEdge = false,
  tornColor,
}: ScrollSectionProps) {
  const isLast = sectionIndex === totalSections - 1;
  const zIndex = sectionIndex + 1;
  const outerHeight = isLast ? '100vh' : '200vh';
  const edgeColor = tornColor ?? bgColor;

  return (
    <div className={styles.outer} style={{ height: outerHeight }}>
      <div
        className={`${styles.panel} ${className}`}
        style={{ backgroundColor: bgColor, zIndex }}
      >
          {tornEdge && (
          <PaperTear color={edgeColor} seed={sectionIndex} />
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Organic torn-paper edge using SVG feTurbulence + feDisplacementMap —
 * the exact same technique as shanesayers.com.
 *
 * How it works:
 * - A solid rectangle fills the section's own bg color.
 * - feTurbulence generates fractal noise (unique per seed).
 * - feDisplacementMap warps the rectangle's edge using that noise.
 * - Result: a completely natural, non-repeating torn-paper silhouette.
 * - The SVG is positioned at the TOP of the section panel so the torn
 *   bottom edge of this shape sits over the previous section.
 */
/**
 * Organic paper-tear SVG — matches shanesayers.com technique exactly.
 *
 * Architecture:
 *   1. feTurbulence generates unique fractal noise per section (seed varies).
 *   2. feDisplacementMap warps a solid rectangle using that noise.
 *   3. The displaced rect bottom edge becomes the organic torn-paper seam.
 *   4. A second un-filtered rect fills from below the torn zone to the SVG
 *      bottom, ensuring no gaps.
 *   5. Both rects are in THIS section's own bg color.
 *
 * Visual:
 *   - SVG sits at top: 0 of the sticky panel, height = 120px.
 *   - As this panel slides up from below, the torn bottom edge is the FIRST
 *     thing visible — a ragged organic silhouette against the previous
 *     section's color underneath.
 */
function PaperTear({ color, seed }: { color: string; seed: number }) {
  const filterId = `tf-${seed}`;
  const noiseSeed = 1000 + seed * 317;

  return (
    <div className={styles.tearWrap} aria-hidden="true">
      <svg
        className={styles.tearSvg}
        viewBox="0 0 2429 144"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} x="-5%" y="-20%" width="110%" height="150%"
            colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves="3"
              seed={noiseSeed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="28"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/*
          Exact same approach as shanesayers.com:
          - A wide rect covers from y=0 to ~y=112 (the "paper" body).
          - filter displaces it, creating the torn bottom edge.
          - A solid rect from y=46 down fills any gaps.
          Both use THIS section's background color.
        */}
        <path
          d="M2437.62 112.088L2381.62 112.306C1606.78 115.31 854.364 122.328 463.232 125.977L445.164 126.146C59.7545 129.74 52.1082 129.745 44.5684 129.745H-11.4316V17.7451H44.5684C51.4158 17.7451 58.157 17.7498 444.119 14.1504L462.188 13.9814C853.316 10.3328 1606.01 3.3112 2381.18 0.305664L2437.18 0.0888672L2437.62 112.088Z"
          fill={color}
          filter={`url(#${filterId})`}
        />
        <rect x="-12" y="46" width="2450" height="100" fill={color} />
      </svg>
    </div>
  );
}
