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
  const [guests, setGuests] = useState([{ name: '', phone: '', age: '' }]);
  const [branch, setBranch] = useState<'Zayouna' | 'Al-Yarmouk'>('Zayouna');
  const [paymentType, setPaymentType] = useState<string>('at_workshop');
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
    
    // Set default payment type based on workshop allowed options
    if (isOpen && workshop) {
      const allowed = (workshop as any).paymentOptions || ['at_workshop'];
      if (allowed.length > 0) {
        setPaymentType(allowed[0]);
      }
    }
  }, [isOpen, session, workshop]);

  // Reset when opened/closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSeats(1);
        setGuests([{ name: session?.user?.name || '', phone: '', age: '' }]);
        setPaymentType('at_workshop');
        setIsSubmitting(false);
      }, 300);
    } else {
      // Prevent body scroll when open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, session]);

  if (!workshop) return null;

  const handleSeatChange = (delta: number) => {
    setSeats((prev) => {
      const newVal = Math.max(1, prev + delta);
      setGuests((currentGuests) => {
        const newGuests = [...currentGuests];
        while (newGuests.length < newVal) {
          newGuests.push({ name: '', phone: '', age: '' });
        }
        return newGuests.slice(0, newVal);
      });
      return newVal;
    });
  };

  const handleGuestChange = (index: number, field: 'name' | 'phone' | 'age', value: string) => {
    setGuests((prev) => {
      const newGuests = [...prev];
      newGuests[index][field] = value;
      return newGuests;
    });
  };

  const handleBook = () => {
    setIsSubmitting(true);
    // TODO: Send to API
    setTimeout(() => {
      setIsSubmitting(false);
      alert('تم إرسال الحجز بنجاح!');
      onClose();
    }, 1500);
  };

  const priceNum = workshop.priceNum || 0;
  const totalPrice = priceNum * seats;
  const depositPrice = Math.floor(totalPrice * 0.5); // Example 50% deposit

  // Map of available payment options
  const paymentLabels: Record<string, { label: string, desc: string }> = {
    'online_full': { label: 'دفع إلكتروني بالكامل', desc: `${totalPrice.toLocaleString()} د.ع` },
    'deposit': { label: 'الدفع بعربون', desc: `${depositPrice.toLocaleString()} د.ع` },
    'cash_full': { label: 'دفع كامل', desc: `${totalPrice.toLocaleString()} د.ع (كاش / تحويل)` },
    'at_workshop': { label: 'الدفع في الورشة', desc: 'التسجيل الآن والدفع عند الحضور' },
  };

  const allowedOptions = (workshop as any).paymentOptions || ['at_workshop', 'deposit', 'cash_full', 'online_full']; // fallback if admin didn't set

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
            >
              {/* Drag handle ONLY controls closing */}
              <motion.div 
                className={styles.dragHandle}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.y > 50 || velocity.y > 100) {
                    onClose();
                  }
                }}
              >
                <div className={styles.dragBar} />
              </motion.div>

              <div className={styles.scrollArea} data-lenis-prevent="true">
                <div className={styles.header}>
                  <h2 className={styles.title}>{workshop.titleAr}</h2>
                  <div className={styles.meta} style={{ flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#888' }}>الفرع المفضل</span>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => setBranch('Zayouna')}
                        className={`${styles.branchPill} ${branch === 'Zayouna' ? styles.branchPillActive : ''}`}
                      >
                        📍 فرع الزيونة
                      </button>
                      <button 
                        onClick={() => setBranch('Al-Yarmouk')}
                        className={`${styles.branchPill} ${branch === 'Al-Yarmouk' ? styles.branchPillActive : ''}`}
                      >
                        📍 فرع اليرموك
                      </button>
                    </div>
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
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <input
                            type="tel"
                            placeholder="الهاتف (077...)"
                            className={styles.input}
                            dir="ltr"
                            style={{ flex: 2 }}
                            value={guest.phone}
                            onChange={(e) => handleGuestChange(idx, 'phone', e.target.value)}
                          />
                          <input
                            type="number"
                            placeholder="العمر"
                            className={styles.input}
                            style={{ flex: 1 }}
                            value={guest.age}
                            onChange={(e) => handleGuestChange(idx, 'age', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className={styles.sectionTitle}>طريقة الدفع</h3>
                <div className={styles.paymentTypes} style={{ flexWrap: 'wrap' }}>
                  {allowedOptions.map((opt: string) => {
                    if (!paymentLabels[opt]) return null;
                    return (
                      <div 
                        key={opt}
                        className={`${styles.paymentOption} ${paymentType === opt ? styles.selected : ''}`}
                        onClick={() => setPaymentType(opt)}
                        style={{ flexBasis: allowedOptions.length > 2 ? '45%' : '100%' }}
                      >
                        <span className={styles.paymentLabel}>{paymentLabels[opt].label}</span>
                        {priceNum > 0 && (
                          <span className={styles.paymentDesc}>{paymentLabels[opt].desc}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.footer}>
                {priceNum > 0 && (
                  <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>المبلغ الإجمالي</span>
                    <span className={styles.totalPrice}>
                      {(paymentType === 'deposit' ? depositPrice : totalPrice).toLocaleString()} د.ع
                    </span>
                  </div>
                )}
                <button className={styles.submitBtn} onClick={handleBook} disabled={isSubmitting}>
                  {isSubmitting ? 'جاري الإرسال...' : 'احجز مقعدك'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
