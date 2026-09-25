'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { useWorkshopStore, type WorkshopItem } from '@/lib/workshopStore';
import { BRANCH_LABELS } from '@/lib/types';
import styles from './page.module.css';

/* ──────────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────────── */
interface Attendee {
  name: string;
  phone: string;
  age: string;
}

type PaymentType = 'full' | 'deposit' | 'form_only';
type PaymentMethod = 'mastercard' | 'zaincash';

/* ──────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────── */
const IRAQI_PHONE_REGEX = /^07\d{8,9}$/;

function generateBookingCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'WF-';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function parsePrice(priceStr?: string): number {
  if (!priceStr) return 0;
  return parseInt(priceStr.replace(/\D/g, ''), 10) || 0;
}

/* ══════════════════════════════════════════════════════════════
   BOOKING PAGE
   ══════════════════════════════════════════════════════════════ */
export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const { t, lang } = useLanguage();
  const { allWorkshops } = useWorkshopStore();

  // ── Find workshop from store ──
  const [workshop, setWorkshop] = useState<WorkshopItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try client store first (localStorage-based)
    const found = allWorkshops.find(w => w.id === id) || null;
    if (found) {
      setWorkshop(found);
      setLoading(false);
    } else {
      // Fallback: fetch from API
      fetch(`/api/workshops/${id}`)
        .then(r => r.json())
        .then((d: any) => {
          if (d.workshop) {
            // Map API shape to WorkshopItem shape
            const w = d.workshop;
            setWorkshop({
              id: w.id,
              titleAr: w.title_ar,
              titleEn: w.title_en,
              descAr: w.description_ar || undefined,
              descEn: w.description_en || undefined,
              price: w.price ? w.price.toLocaleString() : undefined,
              priceNum: w.price || undefined,
              image: w.image_url || '',
              category: w.category,
              paymentType: w.paymentType || 'full',
              depositAmount: w.depositAmount || '',
              isActive: w.is_active === 1,
              sortOrder: w.sort_order || 0,
            });
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id, allWorkshops]);

  // ── Step state ──
  const [step, setStep] = useState(1);
  const [bookingCode, setBookingCode] = useState('');

  // ── Step 1: Seats ──
  const [seatCount, setSeatCount] = useState(1);
  const [attendees, setAttendees] = useState<Attendee[]>([{ name: '', phone: '', age: '' }]);

  // ── Step 2: Your info ──
  const [userForm, setUserForm] = useState({ name: '', phone: '', age: '' });

  // ── Step 3: Payment ──
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mastercard');

  // ── Errors ──
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync attendees array when seat count changes
  useEffect(() => {
    setAttendees(prev => {
      const arr = [...prev];
      while (arr.length < seatCount) arr.push({ name: '', phone: '', age: '' });
      while (arr.length > seatCount) arr.pop();
      return arr;
    });
  }, [seatCount]);

  // ── Handlers ──
  const updateAttendee = useCallback((index: number, field: keyof Attendee, value: string) => {
    setAttendees(prev => {
      const arr = [...prev];
      arr[index] = { ...arr[index], [field]: value };
      return arr;
    });
    // Clear error
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[`att_${index}_${field}`];
      return copy;
    });
  }, []);

  const updateUserField = useCallback((field: string, value: string) => {
    setUserForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[`user_${field}`];
      return copy;
    });
  }, []);

  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};
    attendees.forEach((att, i) => {
      if (i === 0) return; // Skip primary seat, it's collected in step 2
      if (!att.name.trim()) errs[`att_${i}_name`] = t('مطلوب', 'Required');
      if (!att.phone.trim()) errs[`att_${i}_phone`] = t('مطلوب', 'Required');
      else if (!IRAQI_PHONE_REGEX.test(att.phone.trim())) errs[`att_${i}_phone`] = t('رقم عراقي غير صحيح', 'Invalid Iraqi number');
      if (!att.age.trim()) errs[`att_${i}_age`] = t('مطلوب', 'Required');
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!userForm.name.trim()) errs.user_name = t('مطلوب', 'Required');
    if (!userForm.phone.trim()) errs.user_phone = t('مطلوب', 'Required');
    else if (!IRAQI_PHONE_REGEX.test(userForm.phone.trim())) errs.user_phone = t('رقم عراقي غير صحيح', 'Invalid Iraqi number');
    if (!userForm.age.trim()) errs.user_age = t('مطلوب', 'Required');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const goBack = () => {
    setErrors({});
    setStep(s => Math.max(1, s - 1));
  };

  const handleConfirm = () => {
    const code = generateBookingCode();
    setBookingCode(code);
    setStep(4); // success
  };

  // ── Derived ──
  const workshopTitle = workshop ? t(workshop.titleAr, workshop.titleEn) : '';
  const unitPrice = workshop ? parsePrice(workshop.price) : 0;
  const totalPrice = unitPrice * seatCount;
  const paymentType = workshop?.paymentType || 'full';
  
  // Calculate deposit (either fixed amount per seat, or fallback to 50%)
  let depositAmount = 0;
  if (paymentType === 'deposit') {
    const rawDeposit = workshop?.depositAmount ? parsePrice(workshop.depositAmount) : 0;
    if (rawDeposit > 0) {
      depositAmount = rawDeposit * seatCount;
    } else {
      depositAmount = Math.ceil(totalPrice * 0.5); // 50% fallback
    }
  }

  const amountDue = paymentType === 'deposit' ? depositAmount : paymentType === 'full' ? totalPrice : 0;

  // ── Stepper labels ──
  const stepLabels = [
    t('المقاعد', 'Seats'),
    t('بياناتك', 'Your Info'),
    t('الدفع', 'Payment'),
  ];

  // ── Render ──
  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.skeleton} />
        </div>
      </main>
    );
  }

  if (!workshop) {
    return (
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.notFound}>
            <span className={styles.notFoundIcon}>✦</span>
            <h1>{t('الورشة غير موجودة', 'Workshop not found')}</h1>
            <Link href="/" className="btn btn-ghost">{t('عودة', 'Go back')}</Link>
          </div>
        </div>
      </main>
    );
  }

  // ═══ SUCCESS SCREEN ═══
  if (step === 4) {
    return (
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={`${styles.card} ${styles.fadeIn}`}>
            <div className={styles.successWrap}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={styles.successTitle}>{t('تم الحجز بنجاح!', 'Booking Confirmed!')}</h2>
              <p className={styles.successSub}>{workshopTitle}</p>
              <p className={styles.successSub}>
                {t(`${seatCount} مقعد`, `${seatCount} seat${seatCount > 1 ? 's' : ''}`)}
                {amountDue > 0 && ` · ${amountDue.toLocaleString()} ${t('د.ع', 'IQD')}`}
              </p>
              <div className={styles.bookingCode}>{bookingCode}</div>
              <Link href="/" className={styles.successBtn}>
                {t('العودة للرئيسية', 'Back to Home')}
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        {/* Back */}
        <Link href={`/workshops/${id}`} className={styles.back}>
          ← {t('تفاصيل الورشة', 'Workshop Details')}
        </Link>

        {/* ── STEPPER ── */}
        <div className={styles.stepper}>
          {stepLabels.map((label, i) => (
            <React.Fragment key={i}>
              <div className={styles.stepItem}>
                <div className={`${styles.stepCircle} ${step === i + 1 ? styles.active : ''} ${step > i + 1 ? styles.done : ''}`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`${styles.stepLabel} ${step === i + 1 ? styles.active : ''}`}>{label}</span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className={`${styles.stepLine} ${step > i + 1 ? styles.active : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Workshop info ── */}
        <div className={styles.workshopInfo}>
          <span className={styles.workshopName}>{workshopTitle}</span>
          <div className={styles.workshopMeta}>
            {unitPrice > 0 && (
              <span>💰 {unitPrice.toLocaleString()} {t('د.ع / مقعد', 'IQD / seat')}</span>
            )}
            {workshop.category && (
              <span>🏷️ {t(
                workshop.category === 'workshop' ? 'ورشة عمل' :
                workshop.category === 'course' ? 'دورة' :
                workshop.category === 'kids_course' ? 'كورس أطفال' :
                workshop.category === 'kids_workshop' ? 'ورشة أطفال' :
                'نشاط',
                workshop.category === 'workshop' ? 'Workshop' :
                workshop.category === 'course' ? 'Course' :
                workshop.category === 'kids_course' ? 'Kids Course' :
                workshop.category === 'kids_workshop' ? 'Kids Workshop' :
                'Activity'
              )}</span>
            )}
          </div>
        </div>

        {/* ═══ STEP 1: SEATS ═══ */}
        {step === 1 && (
          <div className={styles.fadeIn}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>{t('عدد المقاعد', 'Number of Seats')}</h3>

              <div className={styles.seatCounter}>
                <span className={styles.seatLabel}>{t('المقاعد', 'Seats')}</span>
                <div className={styles.counterControls}>
                  <button
                    type="button"
                    className={styles.counterBtn}
                    onClick={() => setSeatCount(s => Math.max(1, s - 1))}
                    disabled={seatCount <= 1}
                  >−</button>
                  <div className={styles.counterValue}>{seatCount}</div>
                  <button
                    type="button"
                    className={styles.counterBtn}
                    onClick={() => setSeatCount(s => Math.min(10, s + 1))}
                    disabled={seatCount >= 10}
                  >+</button>
                </div>
              </div>

              {attendees.slice(1).map((att, idx) => {
                const i = idx + 1;
                return (
                  <div key={i} className={styles.attendeeCard}>
                    <div className={styles.attendeeHeader}>
                      {t(`المقعد الإضافي ${i}`, `Extra Seat ${i}`)}
                    </div>
                  <div className={styles.attendeeFields}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>{t('الاسم', 'Name')} *</label>
                      <input
                        className={`${styles.input} ${errors[`att_${i}_name`] ? styles.inputError : ''}`}
                        value={att.name}
                        onChange={e => updateAttendee(i, 'name', e.target.value)}
                        placeholder={t('الاسم الكامل', 'Full name')}
                      />
                      {errors[`att_${i}_name`] && <span className={styles.errorText}>{errors[`att_${i}_name`]}</span>}
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>{t('رقم الهاتف', 'Phone')} *</label>
                      <input
                        className={`${styles.input} ${errors[`att_${i}_phone`] ? styles.inputError : ''}`}
                        value={att.phone}
                        onChange={e => updateAttendee(i, 'phone', e.target.value)}
                        placeholder="07xxxxxxxxx"
                        dir="ltr"
                        type="tel"
                      />
                      {errors[`att_${i}_phone`] && <span className={styles.errorText}>{errors[`att_${i}_phone`]}</span>}
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>{t('العمر', 'Age')} *</label>
                      <input
                        className={`${styles.input} ${errors[`att_${i}_age`] ? styles.inputError : ''}`}
                        value={att.age}
                        onChange={e => updateAttendee(i, 'age', e.target.value)}
                        placeholder={t('مثال: ٢٥', 'e.g. 25')}
                        type="number"
                        min="3"
                        max="99"
                      />
                      {errors[`att_${i}_age`] && <span className={styles.errorText}>{errors[`att_${i}_age`]}</span>}
                    </div>
                  </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.btnRow}>
              <button className={styles.btnPrimary} onClick={goNext}>
                {t('التالي', 'Next')} →
              </button>
            </div>
          </div>
        )}

        {/* ═══ STEP 2: YOUR INFO ═══ */}
        {step === 2 && (
          <div className={styles.fadeIn}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>{t('بيانات الحجز', 'Booking Info')}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t('الاسم الكامل', 'Full Name')} *</label>
                  <input
                    className={`${styles.input} ${errors.user_name ? styles.inputError : ''}`}
                    value={userForm.name}
                    onChange={e => updateUserField('name', e.target.value)}
                    placeholder={t('اسمك الكامل', 'Your full name')}
                  />
                  {errors.user_name && <span className={styles.errorText}>{errors.user_name}</span>}
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t('رقم الهاتف', 'Phone Number')} *</label>
                  <input
                    className={`${styles.input} ${errors.user_phone ? styles.inputError : ''}`}
                    value={userForm.phone}
                    onChange={e => updateUserField('phone', e.target.value)}
                    placeholder="07xxxxxxxxx"
                    dir="ltr"
                    type="tel"
                  />
                  {errors.user_phone && <span className={styles.errorText}>{errors.user_phone}</span>}
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t('العمر', 'Age')} *</label>
                  <input
                    className={`${styles.input} ${errors.user_age ? styles.inputError : ''}`}
                    value={userForm.age}
                    onChange={e => updateUserField('age', e.target.value)}
                    placeholder={t('مثال: ٢٥', 'e.g. 25')}
                    type="number"
                    min="3"
                    max="99"
                  />
                  {errors.user_age && <span className={styles.errorText}>{errors.user_age}</span>}
                </div>
              </div>
            </div>

            <div className={styles.btnRow}>
              <button className={styles.btnSecondary} onClick={goBack}>
                ← {t('رجوع', 'Back')}
              </button>
              <button className={styles.btnPrimary} onClick={goNext}>
                {t('التالي', 'Next')} →
              </button>
            </div>
          </div>
        )}

        {/* ═══ STEP 3: PAYMENT ═══ */}
        {step === 3 && (
          <div className={styles.fadeIn}>
            {/* Summary */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>{t('ملخص الحجز', 'Booking Summary')}</h3>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>{t('الورشة', 'Workshop')}</span>
                <span className={styles.summaryValue}>{workshopTitle}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>{t('عدد المقاعد', 'Seats')}</span>
                <span className={styles.summaryValue}>{seatCount}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>{t('سعر المقعد', 'Per Seat')}</span>
                <span className={styles.summaryValue}>{unitPrice.toLocaleString()} {t('د.ع', 'IQD')}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>{t('المجموع', 'Total')}</span>
                <span>{totalPrice.toLocaleString()} {t('د.ع', 'IQD')}</span>
              </div>
            </div>

            {/* Payment type */}
            {unitPrice > 0 && paymentType !== 'form_only' && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{t('نوع الدفع المطلوب', 'Required Payment')}</h3>
                <div className={styles.optionGroup}>
                  {paymentType === 'full' && (
                    <div className={`${styles.optionCard} ${styles.selected}`}>
                      <div className={`${styles.optionRadio} ${styles.checked}`} />
                      <div>
                        <div className={styles.optionLabel}>{t('دفع كامل', 'Full Payment')}</div>
                        <div className={styles.optionSub}>{totalPrice.toLocaleString()} {t('د.ع', 'IQD')}</div>
                      </div>
                    </div>
                  )}
                  {paymentType === 'deposit' && (
                    <div className={`${styles.optionCard} ${styles.selected}`}>
                      <div className={`${styles.optionRadio} ${styles.checked}`} />
                      <div>
                        <div className={styles.optionLabel}>{t('عربون للحجز', 'Booking Deposit')}</div>
                        <div className={styles.optionSub}>
                          {depositAmount.toLocaleString()} {t('د.ع', 'IQD')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {paymentType === 'form_only' && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{t('تأكيد الحجز', 'Confirm Booking')}</h3>
                <div className={styles.optionGroup}>
                  <div className={`${styles.optionCard} ${styles.selected}`}>
                    <div className={`${styles.optionRadio} ${styles.checked}`} />
                    <div>
                      <div className={styles.optionLabel}>{t('حجز مبدئي', 'Initial Booking')}</div>
                      <div className={styles.optionSub}>{t('يتم الدفع عند الحضور', 'Pay on arrival')}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment method — only if paying */}
            {paymentType !== 'form_only' && unitPrice > 0 && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{t('طريقة الدفع', 'Payment Method')}</h3>
                <div className={styles.optionGroup}>
                  <div
                    className={`${styles.optionCard} ${paymentMethod === 'mastercard' ? styles.selected : ''}`}
                    onClick={() => setPaymentMethod('mastercard')}
                  >
                    <div className={`${styles.optionRadio} ${paymentMethod === 'mastercard' ? styles.checked : ''}`} />
                    <span className={styles.payIcon}>💳</span>
                    <div>
                      <div className={styles.optionLabel}>{t('بطاقة ماستركارد', 'Mastercard')}</div>
                    </div>
                  </div>
                  <div
                    className={`${styles.optionCard} ${paymentMethod === 'zaincash' ? styles.selected : ''}`}
                    onClick={() => setPaymentMethod('zaincash')}
                  >
                    <div className={`${styles.optionRadio} ${paymentMethod === 'zaincash' ? styles.checked : ''}`} />
                    <span className={styles.payIcon}>📱</span>
                    <div>
                      <div className={styles.optionLabel}>{t('زين كاش', 'Zain Cash')}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.devBadge}>
                  🚧 {t('بوابة الدفع قيد التطوير', 'Payment gateway under development')}
                </div>
              </div>
            )}

            {/* Amount due */}
            {amountDue > 0 && (
              <div className={styles.card}>
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`} style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
                  <span>{t('المبلغ المطلوب', 'Amount Due')}</span>
                  <span>{amountDue.toLocaleString()} {t('د.ع', 'IQD')}</span>
                </div>
              </div>
            )}

            <div className={styles.btnRow}>
              <button className={styles.btnSecondary} onClick={goBack}>
                ← {t('رجوع', 'Back')}
              </button>
              <button className={styles.btnPrimary} onClick={handleConfirm}>
                {t('تأكيد الحجز', 'Confirm Booking')} ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
