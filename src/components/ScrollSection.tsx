'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSectionProps {
  children: React.ReactNode;
  sectionIndex: number;
  totalSections: number;
  bgColor?: string;
  className?: string;
}

/**
 * A full-viewport section that participates in the "peel-away" scroll effect.
 *
 * How it works:
 * - Each section is `position: sticky; top: 0` so it sticks to the viewport.
 * - Lower z-index sections sit *behind* higher ones.
 * - As the user scrolls through a section's scroll range, the section
 *   fades out, scales down slightly, and translates upward — "peeling away"
 *   to reveal the next section underneath.
 * - The last section never peels away (it's the final resting place).
 */
export default function ScrollSection({
  children,
  sectionIndex,
  totalSections,
  bgColor = 'var(--clr-bg)',
  className = '',
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Each section owns a scroll range proportional to its index
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // "start start" = when top of section hits top of viewport
    // "end start"   = when bottom of section hits top of viewport
    offset: ['start start', 'end start'],
  });

  const isLast = sectionIndex === totalSections - 1;

  // Exit animations — only non-last sections peel away
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    isLast ? [1, 1, 1] : [1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    isLast ? [1, 1, 1] : [1, 1, 0.92]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    isLast ? [0, 0, 0] : [0, 0, -60]
  );

  return (
    <div
      ref={sectionRef}
      style={{
        // Each section needs enough scroll height for the effect
        height: isLast ? '100vh' : '200vh',
      }}
    >
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          zIndex: totalSections - sectionIndex,
          backgroundColor: bgColor,
          overflow: 'hidden',
          opacity,
          scale,
          y,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
