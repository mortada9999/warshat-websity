'use client';

import React from 'react';

interface TornEdgeProps {
  color: string;
  seed: number;
  isNotebook?: boolean;
}

export default function TornEdge({ color, seed, isNotebook = false }: TornEdgeProps) {
  const filterId = `tf-${seed}`;
  const clipId = `clip-${seed}`;
  const noiseSeed = 1000 + seed * 317;

  return (
    <div 
      className="absolute left-0 right-0 h-[100px] pointer-events-none z-20" 
      style={{ top: '-99px' }} 
      aria-hidden="true"
    >
      <svg
        className="absolute bottom-0 right-0 w-[200%] sm:w-full h-auto min-h-[50px] object-cover"
        viewBox="0 0 2429 144"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} x="-5%" y="-20%" width="110%" height="150%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="3" seed={noiseSeed} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="28" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          
          <mask id={clipId}>
            <path
              d="M2437.62 112.088L2381.62 112.306C1606.78 115.31 854.364 122.328 463.232 125.977L445.164 126.146C59.7545 129.74 52.1082 129.745 44.5684 129.745H-11.4316V17.7451H44.5684C51.4158 17.7451 58.157 17.7498 444.119 14.1504L462.188 13.9814C853.316 10.3328 1606.01 3.3112 2381.18 0.305664L2437.18 0.0888672L2437.62 112.088Z"
              filter={`url(#${filterId})`}
              fill="white"
            />
            <rect x="-12" y="46" width="2450" height="100" fill="white" />
          </mask>
        </defs>

        <g mask={`url(#${clipId})`}>
          {/* Base solid color */}
          <rect x="-12" y="-12" width="2450" height="160" fill={color} />
          
          {/* Red notebook margin lines that perfectly match the CSS line below (5% right margin) */}
          {isNotebook && (
            <>
              {/* Desktop (sm and up, SVG is w-full): 5% from right edge -> 95% */}
              <line className="hidden sm:block" x1="95%" y1="0" x2="95%" y2="160" stroke="rgba(210, 90, 90, 0.4)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              {/* Mobile (under sm, SVG is w-[200%]): 5vw is 2.5% of SVG width -> 97.5% */}
              <line className="sm:hidden" x1="97.5%" y1="0" x2="97.5%" y2="160" stroke="rgba(210, 90, 90, 0.4)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
