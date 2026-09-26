'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { WorkshopItem } from '@/lib/workshopStore';
import BookingSheet from './BookingSheet';

interface BookingContextType {
  openBooking: (workshop: WorkshopItem) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopItem | null>(null);

  const openBooking = useCallback((workshop: WorkshopItem) => {
    setSelectedWorkshop(workshop);
  }, []);

  const closeBooking = useCallback(() => {
    setSelectedWorkshop(null);
  }, []);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}
      <BookingSheet 
        isOpen={!!selectedWorkshop} 
        onClose={closeBooking} 
        workshop={selectedWorkshop} 
      />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return ctx;
}
