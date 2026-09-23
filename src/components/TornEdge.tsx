'use client';

import React from 'react';

interface TornEdgeProps {
  color: string;
  seed: number;
  isNotebook?: boolean;
  textureClass?: string;
}

export default function TornEdge({ color, seed, isNotebook = false, textureClass }: TornEdgeProps) {
  const noiseSeed = 1000 + seed * 317;

  // Generate the SVG markup as a string to use in CSS mask-image
  const svgMarkup = `<svg viewBox="0 0 2429 144" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="tf" x="-5%" y="-20%" width="110%" height="150%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="3" seed="${noiseSeed}" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="28" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <path
      d="M2437.62 112.088L2381.62 112.306C1606.78 115.31 854.364 122.328 463.232 125.977L445.164 126.146C59.7545 129.74 52.1082 129.745 44.5684 129.745H-11.4316V17.7451H44.5684C51.4158 17.7451 58.157 17.7498 444.119 14.1504L462.188 13.9814C853.316 10.3328 1606.01 3.3112 2381.18 0.305664L2437.18 0.0888672L2437.62 112.088Z"
      filter="url(#tf)"
      fill="black"
    />
    <rect x="-12" y="46" width="2450" height="100" fill="black" />
  </svg>`;

  // Encode for use in CSS url()
  // Replace # with %23 so the browser parses it correctly in a data URI
  const encodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(svgMarkup).replace(/%20/g, ' ')}`;

  return (
    <div 
      className="absolute left-0 right-0 h-[100px] pointer-events-none z-20 overflow-hidden" 
      style={{ top: '-99px' }} 
      aria-hidden="true"
    >
      <div 
        className={`absolute bottom-0 right-0 h-full w-full max-sm:[mask-size:200%_100%] max-sm:[-webkit-mask-size:200%_100%] sm:[mask-size:100%_100%] sm:[-webkit-mask-size:100%_100%] ${textureClass || ''}`}
        style={{
          backgroundColor: textureClass ? undefined : color,
          WebkitMaskImage: `url('${encodedSvg}')`,
          WebkitMaskPosition: 'bottom right',
          WebkitMaskRepeat: 'no-repeat',
          maskImage: `url('${encodedSvg}')`,
          maskPosition: 'bottom right',
          maskRepeat: 'no-repeat',
        }}
      >
        {/* Red notebook margin lines (5% from right edge matches the mask styling perfectly) */}
        {isNotebook && (
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line x1="95%" y1="0" x2="95%" y2="100%" stroke="rgba(210, 90, 90, 0.4)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
        )}
      </div>
    </div>
  );
}
