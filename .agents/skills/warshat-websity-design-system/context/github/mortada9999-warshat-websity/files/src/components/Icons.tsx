import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const base = (size: number, strokeWidth: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export function PinIcon({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function UsersIcon({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function MapIcon({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <path d="M9 20 3 17V4l6 3 6-3 6 3v13l-6-3-6 3Z" />
      <path d="M9 7v13M15 4v13" />
    </svg>
  );
}

export function SparkIcon({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
    </svg>
  );
}

export function ArrowIcon({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
