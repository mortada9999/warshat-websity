'use client';

import React from 'react';
import styles from './ScrollSection.module.css';

interface ScrollSectionProps {
  children: React.ReactNode;
  /** 0-based index — Hero is 0 */
  sectionIndex: number;
  totalSections: number;
  bgColor?: string;
  className?: string;
  /** Whether to render a torn-paper top edge (skip on hero) */
  tornEdge?: boolean;
  /** Color of the torn edge SVG (matches the section bg so it masks correctly) */
  tornColor?: string;
}

/**
 * Shanesayers-style collage stacking.
 *
 * Mechanic (pure CSS, no JS):
 * - Each section's *outer* wrapper is tall enough to create scroll distance.
 * - The *inner* sticky panel is `position: sticky; top: 0; height: 100vh`.
 * - Sections are stacked by z-index (later sections sit on top).
 * - As you scroll the *next* section's outer wrapper into view, its sticky
 *   panel slides up over the current one — exactly like a new sheet of paper
 *   being pushed from below.
 * - A torn-paper SVG clip sits at the very top of each non-hero section to
 *   give the rough collage edge.
 */
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
  // Later sections need MORE z-index so they cover earlier ones
  const zIndex = sectionIndex + 1;

  // Each non-last section needs its own scroll range to "hold" before the
  // next one covers it. The last section just takes one viewport height.
  const outerHeight = isLast ? '100vh' : '200vh';

  const edgeColor = tornColor ?? bgColor;

  return (
    <div
      className={styles.outer}
      style={{ height: outerHeight }}
    >
      <div
        className={`${styles.panel} ${className}`}
        style={{
          backgroundColor: bgColor,
          zIndex,
        }}
      >
        {/* Torn paper top edge — drawn in the section's own bg color so it
            "tears" away the previous section's color underneath.
            Lives outside .content so it can overflow above the panel. */}
        {tornEdge && (
          <div className={styles.tornWrap} aria-hidden="true">
            <TornEdge color={edgeColor} seed={sectionIndex} />
          </div>
        )}

        {/* Content clipped to panel bounds */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Torn paper edge SVG ──────────────────────────────────────────────────
   Each section gets a unique tear shape based on its seed.
   The SVG is full-width, ~40px tall, placed absolutely at the top.
   It fills with the section's own bg color — so when section N slides over
   section N-1, the tear "eats" into the previous section's color.
────────────────────────────────────────────────────────────────────────── */

// Pre-computed tear paths — each is a polygon that traces a rough torn edge
// across a 0–100 viewBox width, then closes at the bottom corners.
const TEAR_PATHS: string[] = [
  // Path 1 — gentle jagged
  'M0,28 L3,18 L8,24 L14,12 L19,22 L25,8 L31,20 L37,14 L43,26 L49,10 L55,22 L61,16 L67,28 L73,12 L79,24 L85,10 L91,20 L97,16 L100,22 L100,40 L0,40 Z',
  // Path 2 — deeper rip
  'M0,22 L4,10 L9,20 L15,6 L20,18 L27,4 L33,16 L38,8 L44,20 L50,4 L56,18 L62,8 L68,22 L74,6 L80,18 L86,8 L92,20 L97,10 L100,18 L100,40 L0,40 Z',
  // Path 3 — wide waves
  'M0,30 L5,16 L11,26 L18,10 L24,22 L30,14 L36,28 L42,8 L48,24 L54,12 L60,26 L66,14 L72,30 L78,10 L84,22 L90,14 L96,26 L100,18 L100,40 L0,40 Z',
  // Path 4 — subtle
  'M0,24 L6,18 L12,26 L18,16 L24,24 L30,12 L36,22 L42,18 L48,28 L54,14 L60,24 L66,16 L72,26 L78,12 L84,22 L90,18 L96,28 L100,20 L100,40 L0,40 Z',
  // Path 5 — aggressive
  'M0,20 L4,8 L9,18 L14,4 L19,16 L25,6 L30,22 L35,4 L41,18 L47,8 L53,20 L59,6 L65,22 L70,4 L76,18 L82,8 L88,22 L94,6 L100,20 L100,40 L0,40 Z',
];

function TornEdge({ color, seed }: { color: string; seed: number }) {
  const path = TEAR_PATHS[seed % TEAR_PATHS.length];
  return (
    <svg
      className={styles.tornSvg}
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={path} fill={color} />
    </svg>
  );
}
