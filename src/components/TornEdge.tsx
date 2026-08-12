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
        className="absolute top-0 left-0 w-full h-full block"
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
          
          {/* Notebook Lines mapped to SVG coordinates (scaled approximately for 100px height) */}
          {isNotebook && (
            <>
              {/* Blue horizontal lines */}
              <line x1="0" y1="40" x2="2500" y2="40" stroke="#C5D0E8" strokeWidth="1.5" />
              <line x1="0" y1="98" x2="2500" y2="98" stroke="#C5D0E8" strokeWidth="1.5" />
              {/* Red vertical line (approximated for desktop/mobile RTL) */}
              <line x1="95%" y1="0" x2="95%" y2="150" stroke="rgba(210, 90, 90, 0.35)" strokeWidth="3" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
