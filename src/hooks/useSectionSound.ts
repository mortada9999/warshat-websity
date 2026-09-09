'use client';

import { useRef } from 'react';

/**
 * Hook to play a swoosh sound when a section scrolls into view.
 * (Currently a no-op as scroll sounds were removed by request).
 */
export function useSectionSound<T extends HTMLElement>(
  threshold = 0.3,
  externalRef?: React.RefObject<T | null>
) {
  const internalRef = useRef<T>(null);
  const ref = externalRef || internalRef;
  return ref;
}
