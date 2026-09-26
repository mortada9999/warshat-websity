'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import type { WorkshopItem } from '@/lib/workshopStore';
import styles from './BookingSheet.module.css';

interface BookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  workshop: WorkshopItem | null;
}

export default function BookingSheet({ isOpen, onClose, workshop }: BookingSheetProps) {
  const { data: session } = useSession();
  
  const [seats, setSeats] = useState(1);
  const [guests, setGuests] = useState([{ name: '', phone: '' }]);
  const [paymentType, setPaymentType] = useState<'full' | 'deposit'>('full');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (isOpen && session?.user) {
      setGuests((prev) => {
        const newGuests = [...prev];
        if (!newGuests[0].name) newGuests[0].name = session.user?.name || '';
        return newGuests;
      });
    }
  }, [isOpen, session]);

  // Reset when opened/closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSeats(1);
        setGuests([{ name: session?.user?.name || '', phone: '' }]);
        setPaymentType('full');
        setIsSubmitting(false);
      }, 300);
    }
  }, [isOpen, session]);

  if (!workshop) return null;

  const handleSeatChange = (delta: number) => {
    setSeats((prev) => {
      const newVal = Math.max(1, prev + delta);
      setGuests((currentGuests) => {
        const newGuests = [...currentGuests];
        while (newGuests.length < newVal) {
          newGuests.push({ name: '', phone: '' });
        }
        return newGuests.slice(0, newVal);
      });
      return newVal;
    });
  };

  const handleGuestChange = (index: number, field: 'name' | 'phone', value: string) => {
    setGuests((prev) => {
      const newGuests = [...prev];
      newGuests[index][field] = value;
      return newGuests;
    });
  };

  const handleBook = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const priceNum = workshop.priceNum || 0;
  const totalPrice = priceNum * seats;
  const depositPrice = Math.floor(totalPrice * 0.5); // Example 50% deposit

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className={styles.sheet}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > 150 || velocity.y > 500) {
                  onClose();
                }
              }}
            >
              <div className={styles.dragHandle}>
                <div className={styles.dragBar} />
              </div>

              <div className={styles.scrollArea}>
                <div className={styles.header}>
                  <h2 className={styles.title}>{workshop.titleAr}</h2>
                  <div className={styles.meta}>
                    <span>📍 {(workshop as any).branch === 'Zayouna' ? 'فرع الزيونة' : (workshop as any).branch === 'Al-Yarmouk' ? 'فرع اليرموك' : 'فرع الزيونة / اليرموك'}</span>
                  </div>
                  <div className={styles.brushSeparator} />
                </div>

                <div className={styles.counterWrap}>
                  <span className={styles.counterLabel}>عدد المقاعد</span>
                  <div className={styles.counterControls}>
                    <button 
                      className={styles.counterBtn} 
                      onClick={() => handleSeatChange(-1)}
                      disabled={seats <= 1}
                    >
                      −
                    </button>
                    <span className={styles.counterValue}>{seats}</span>
                    <button 
                      className={styles.counterBtn} 
                      onClick={() => handleSeatChange(1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.guestsContainer}>
                  {guests.map((guest, idx) => (
                    <div key={idx} className={styles.guestBox}>
                      <h4 className={styles.guestTitle}>
                        {idx === 0 ? 'بيانات الحجز الأساسية' : `المرافق رقم ${idx}`}
                      </h4>
                      <div className={styles.inputGroup}>
                        <input
                          type="text"
                          placeholder="الاسم الثلاثي"
                          className={styles.input}
                          value={guest.name}
                          onChange={(e) => handleGuestChange(idx, 'name', e.target.value)}
                        />
                        <input
                          type="tel"
                          placeholder="رقم الهاتف (مثال: 077xxxxxxxx)"
                          className={styles.input}
                          dir="ltr"
                          value={guest.phone}
                          onChange={(e) => handleGuestChange(idx, 'phone', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className={styles.sectionTitle}>طريقة الدفع</h3>
                <div className={styles.paymentTypes}>
                  <div 
                    className={`${styles.paymentOption} ${paymentType === 'full' ? styles.selected : ''}`}
                    onClick={() => setPaymentType('full')}
                  >
                    <span className={styles.paymentLabel}>دفع كامل</span>
                    <span className={styles.paymentDesc}>{totalPrice.toLocaleString()} د.ع</span>
                  </div>
                  <div 
                    className={`${styles.paymentOption} ${paymentType === 'deposit' ? styles.selected : ''}`}
                    onClick={() => setPaymentType('deposit')}
                  >
                    <span className={styles.paymentLabel}>عربون فقط</span>
                    <span className={styles.paymentDesc}>{depositPrice.toLocaleString()} د.ع</span>
                  </div>
                </div>
              </div>

              <div className={styles.footer}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>المبلغ الإجمالي</span>
                  <span className={styles.totalPrice}>
                    {(paymentType === 'full' ? totalPrice : depositPrice).toLocaleString()} د.ع
                  </span>
                </div>
                <button className={styles.submitBtn} onClick={handleBook}>
                  {isSubmitting ? 'قيد التطوير 🔜' : 'احجز مقعدك'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
