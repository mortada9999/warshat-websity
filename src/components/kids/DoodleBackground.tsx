'use client';

import React from 'react';

/**
 * DoodleBackground
 * Sketchbook paper texture + scattered chalk/crayon SVG doodles
 * (stars, clouds, paint palette, squiggles) around the page edges.
 */
export default function DoodleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Sketchbook paper texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#FDF9EF',
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'160\' height=\'160\' filter=\'url(%23n)\' opacity=\'0.045\'/%3E%3C/svg%3E")',
        }}
      />

      {/* ── Crayon doodles ── */}

      {/* Star — top right */}
      <svg
        viewBox="0 0 48 48"
        className="absolute right-6 top-28 h-10 w-10 rotate-12 opacity-70 md:right-20 md:top-32 md:h-14 md:w-14"
        fill="none"
        stroke="#F4B942"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 5l4.7 11.3L40 21l-11.3 4.7L24 37l-4.7-11.3L8 21l11.3-4.7L24 5z" />
        <circle cx="24" cy="21" r="2.2" fill="#F4B942" stroke="none" />
      </svg>

      {/* Cloud — top left */}
      <svg
        viewBox="0 0 80 48"
        className="absolute left-4 top-36 h-12 w-20 opacity-60 md:left-16 md:top-40 md:h-16 md:w-28"
        fill="#BBD6EE"
      >
        <path d="M20 38a14 14 0 0 1-1-28 18 18 0 0 1 35 5 13 13 0 0 1 0 23H20z" opacity="0.85" />
      </svg>

      {/* Paint palette — bottom right */}
      <svg
        viewBox="0 0 72 64"
        className="absolute bottom-16 right-8 h-16 w-20 -rotate-6 opacity-60 md:bottom-24 md:right-24 md:h-20 md:w-24"
      >
        <path
          d="M36 8c14 0 26 10 26 23 0 10-7 15-14 15-5 0-7-4-12-4s-7 4-12 4C17 46 10 41 10 31 10 18 22 8 36 8z"
          fill="#E8D3B0"
          stroke="#B98A5A"
          strokeWidth="2"
        />
        <circle cx="36" cy="28" r="5" fill="#E8D3B0" stroke="#B98A5A" strokeWidth="2" />
        <circle cx="20" cy="20" r="3.4" fill="#E46F6F" />
        <circle cx="30" cy="14" r="3.4" fill="#F4B942" />
        <circle cx="42" cy="14" r="3.4" fill="#6FA8DC" />
        <circle cx="52" cy="22" r="3.4" fill="#8BC98A" />
        <circle cx="16" cy="32" r="3.4" fill="#B88BE0" />
      </svg>

      {/* Squiggle — bottom left */}
      <svg
        viewBox="0 0 100 40"
        className="absolute bottom-24 left-4 h-8 w-24 opacity-50 md:bottom-32 md:left-20 md:h-10 md:w-32"
        fill="none"
        stroke="#C98BB9"
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        <path d="M4 28c10-14 16 10 26-4s16 10 26-4 16 10 26-4" />
      </svg>

      {/* Heart — mid left */}
      <svg
        viewBox="0 0 32 28"
        className="absolute left-1/2 top-[40%] h-7 w-8 -translate-x-1/2 opacity-40 md:left-[22%] md:top-[46%] md:h-9 md:w-10"
        fill="#EF8FA6"
      >
        <path d="M16 26S3 18 3 10C3 5 7 2 11 2c3 0 5 1.6 5 3.4C16 3.6 18 2 21 2c4 0 8 3 8 8 0 8-13 16-13 16z" />
      </svg>

      {/* Crayon / pencil — right edge */}
      <svg
        viewBox="0 0 24 80"
        className="absolute right-2 top-1/2 h-24 w-7 -rotate-[20deg] opacity-50 md:right-8"
      >
        <rect x="6" y="2" width="12" height="58" rx="3" fill="#8BC98A" />
        <path d="M6 60h12l-3 14a2 2 0 0 1-6 0l-3-14z" fill="#D9A05B" />
        <path d="M8 5h8v52H8z" fill="#A5D8A5" />
      </svg>

      {/* Small dots */}
      <span className="absolute left-1/4 top-[24%] h-2 w-2 rounded-full bg-[#F4B942] opacity-60" />
      <span className="absolute right-1/4 top-[18%] h-2.5 w-2.5 rounded-full bg-[#6FA8DC] opacity-60" />
      <span className="absolute bottom-[38%] right-[12%] h-2 w-2 rounded-full bg-[#EF8FA6] opacity-60" />
    </div>
  );
}
