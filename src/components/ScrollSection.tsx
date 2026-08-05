'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSectionProps {
  children: React.ReactNode;
  sectionIndex: number;
  totalSections: number;
  bgColor?: string;
  className?: string;
  tornEdge?: boolean;
  tornColor?: string;
  isSticky?: boolean;
}

export default function ScrollSection({
  children,
  sectionIndex,
  totalSections,
  bgColor = 'var(--bg)',
  className = '',
  tornEdge = false,
  tornColor,
  isSticky = true,
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
  const zIndex = (sectionIndex + 1) * 10;
  const edgeColor = tornColor ?? bgColor;

  // Exit animations — only sticky non-last sections peel away
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    isLast || !isSticky ? [1, 1, 1] : [1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    isLast || !isSticky ? [1, 1, 1] : [1, 1, 0.92]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    isLast || !isSticky ? [0, 0, 0] : [0, 0, -60]
  );

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{
        // Only sticky sections get the extra scroll height
        height: isSticky && !isLast ? '200vh' : 'auto',
        zIndex
      }}
    >
      <motion.div
        style={{
          position: isSticky ? 'sticky' : 'relative',
          top: 0,
          height: isSticky ? '100vh' : 'auto',
          width: '100%',
          backgroundColor: bgColor,
          overflow: isSticky ? 'hidden' : 'visible',
          opacity,
          scale,
          y,
        }}
        className={`flex flex-col ${className}`}
      >
        {tornEdge && (
          <PaperTear color={edgeColor} seed={sectionIndex} zIndex={zIndex + 1} />
        )}
        
        {/* Content wrapper */}
        <div className="relative w-full h-full flex flex-col justify-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function PaperTear({ color, seed, zIndex }: { color: string; seed: number; zIndex: number }) {
  const filterId = `tf-${seed}`;
  const noiseSeed = 1000 + seed * 317;

  return (
    <div 
      className="absolute left-0 right-0 h-[100px] pointer-events-none" 
      style={{ top: '-99px', zIndex }} 
      aria-hidden="true"
    >
      <svg
        className="absolute top-0 left-0 w-full h-full block"
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

