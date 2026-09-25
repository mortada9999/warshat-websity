'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import type { WorkshopItem } from '@/lib/workshopStore';
import type { Category } from '@/lib/types';

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: 'open_activity', label: 'نشاط مفتوح (يومي)' },
  { value: 'workshop', label: 'ورشة تدريبية' },
  { value: 'course', label: 'كورس' },
  { value: 'kids_course', label: 'كورس أطفال' },
  { value: 'kids_workshop', label: 'ورشة أطفال' },
];

export default function WorkshopEditorModal() {
  const { editorState, closeEditor } = useAdmin();
  const { addWorkshop, updateWorkshop } = useWorkshopStore();
  const { isOpen, workshop, defaultCategory } = editorState;

  const isNew = !workshop;
  const [isDragging, setIsDragging] = useState(false);

  const [form, setForm] = useState({
    titleAr: '',
    titleEn: '',
    subtitleAr: '',
    subtitleEn: '',
    descAr: '',
    descEn: '',
    price: '',
    image: '',
    category: (defaultCategory || 'open_activity') as Category,
    sessionsAr: '',
    sessionsEn: '',
    pattern: 'blueprint',
    sortOrder: 0 as number | string,
    featuresArStr: '',
    featuresEnStr: '',
    paymentType: 'full' as 'full' | 'deposit' | 'form_only',
    depositAmount: '',
  });

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      if (workshop) {
        setForm({
          titleAr: workshop.titleAr,
          titleEn: workshop.titleEn,
          subtitleAr: workshop.subtitleAr || '',
          subtitleEn: workshop.subtitleEn || '',
          descAr: workshop.descAr || '',
          descEn: workshop.descEn || '',
          price: workshop.price || '',
          image: workshop.image,
          category: workshop.category,
          sessionsAr: workshop.sessionsAr || '',
          sessionsEn: workshop.sessionsEn || '',
          pattern: workshop.pattern || 'blueprint',
          sortOrder: workshop.sortOrder,
          featuresArStr: workshop.featuresAr?.join('\n') || '',
          featuresEnStr: workshop.featuresEn?.join('\n') || '',
          paymentType: workshop.paymentType || 'full',
          depositAmount: workshop.depositAmount || '',
        });
      } else {
        setForm({
          titleAr: '',
          titleEn: '',
          subtitleAr: '',
          subtitleEn: '',
          descAr: '',
          descEn: '',
          price: '',
          image: '/images/figma/pottery.png',
          category: defaultCategory || 'open_activity',
          sessionsAr: '',
          sessionsEn: '',
          pattern: 'blueprint',
          sortOrder: 0 as number | string,
          featuresArStr: '',
          featuresEnStr: '',
          paymentType: 'full',
          depositAmount: '',
        });
      }
    }
  }, [isOpen, workshop, defaultCategory]);

  // Aggressive scroll lock (Native + Lenis)
  useEffect(() => {
    if (isOpen) {
      const html = document.documentElement;
      const body = document.body;
      
      const prevHtmlOverflow = html.style.overflow;
      const prevBodyOverflow = body.style.overflow;
      
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';

      // Stop Lenis smooth scroll if it exists
      const win = window as unknown as Record<string, any>;
      if (win.__lenis && typeof win.__lenis.stop === 'function') {
        win.__lenis.stop();
      }

      return () => {
        html.style.overflow = prevHtmlOverflow;
        body.style.overflow = prevBodyOverflow;
        
        if (win.__lenis && typeof win.__lenis.start === 'function') {
          win.__lenis.start();
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-format price and deposit with commas
    if (name === 'price' || name === 'depositAmount') {
      const digits = value.replace(/\D/g, ''); // strip non-digits
      if (digits) {
        setForm(prev => ({ ...prev, [name]: Number(digits).toLocaleString('en-US') }));
      } else {
        setForm(prev => ({ ...prev, [name]: '' }));
      }
      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: name === 'sortOrder' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titleAr.trim()) return;

    const item: Omit<WorkshopItem, 'id'> = {
      titleAr: form.titleAr,
      titleEn: form.titleEn,
      subtitleAr: form.subtitleAr || undefined,
      subtitleEn: form.subtitleEn || undefined,
      descAr: form.descAr || undefined,
      descEn: form.descEn || undefined,
      price: form.price || undefined,
      image: form.image,
      category: form.category,
      sessionsAr: form.sessionsAr || undefined,
      sessionsEn: form.sessionsEn || undefined,
      featuresAr: form.featuresArStr.split('\n').map(s => s.trim()).filter(Boolean),
      featuresEn: form.featuresEnStr.split('\n').map(s => s.trim()).filter(Boolean),
      pattern: form.pattern || undefined,
      paymentType: form.paymentType,
      depositAmount: form.depositAmount || undefined,
      isActive: true,
      sortOrder: Number(form.sortOrder) || 0,
    };

    if (isNew) {
      addWorkshop(item);
    } else {
      updateWorkshop(workshop!.id, item);
    }

    closeEditor();
  };

  const showSessions = form.category === 'course' || form.category === 'kids_course';
  const showDescription = form.category === 'workshop' || form.category === 'kids_course' || form.category === 'kids_workshop';

  return (
    <div
      onClick={closeEditor}
      onWheel={e => e.stopPropagation()}
      onTouchMove={e => e.stopPropagation()}
      data-lenis-prevent="true"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(18,18,18,0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 10000,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        data-lenis-prevent="true"
        style={{
          background: '#F6F6F4',
          borderRadius: '0',
          border: '1px solid #DEDEDE',
          padding: '32px',
          width: '100%', maxWidth: '520px', maxHeight: '85vh', overflowY: 'auto',
          boxShadow: 'rgba(18,18,18,0.05) 0px 4px 5px 0px',
          fontFamily: 'IBM Plex Arabic, sans-serif',
        }}
      >
        <h2 style={{ color: '#121212', marginBottom: '24px', fontFamily: 'Aref Ruqaa, serif', fontWeight: 400, fontSize: '1.5rem' }}>
          {isNew ? '+ إضافة ورشة جديدة' : '✏️ تعديل الورشة'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Category */}
          <div>
            <label style={labelStyle}>التصنيف</label>
            <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
              {CATEGORY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Names */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>الاسم (عربي) *</label>
              <input required name="titleAr" value={form.titleAr} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>الاسم (إنجليزي)</label>
              <input name="titleEn" value={form.titleEn} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          {/* Price & Payment Type */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>السعر (مثل: 10,000)</label>
              <input name="price" value={form.price} onChange={handleChange} style={inputStyle} placeholder="10,000" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>آلية الدفع للحجز</label>
              <select name="paymentType" value={form.paymentType} onChange={handleChange} style={inputStyle}>
                <option value="full">دفع كامل المبلغ</option>
                <option value="deposit">عربون (جزء من المبلغ)</option>
                <option value="form_only">حجز فقط (بدون دفع)</option>
              </select>
            </div>
          </div>

          {form.paymentType === 'deposit' && (
            <div>
              <label style={labelStyle}>مبلغ العربون (مثل: 5,000)</label>
              <input name="depositAmount" value={form.depositAmount} onChange={handleChange} style={inputStyle} placeholder="5,000" />
            </div>
          )}

          {/* Image Upload */}
          <div>
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event) => {
                  if (event.target?.result) {
                    setForm(prev => ({ ...prev, image: event.target!.result as string }));
                  }
                };
                reader.readAsDataURL(file);
              }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px',
                border: isDragging ? '1.5px dashed #059669' : '1.5px dashed #D1D5DB',
                borderRadius: '6px',
                background: isDragging ? '#F0FDF4' : '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'center',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {form.image ? (
                <>
                  <div style={{
                    width: '100%', height: '120px', 
                    backgroundImage: `url(${form.image})`, 
                    backgroundSize: 'contain', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat',
                    marginBottom: '12px'
                  }} />
                  <span style={{ fontSize: '14px', color: '#059669', fontWeight: 600 }}>تغيير الصورة</span>
                </>
              ) : (
                <>
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}>
                    <rect x="3" y="5" width="14" height="14" rx="2" ry="2" />
                    <polyline points="17 14 13 10 3 20" />
                    <circle cx="7.5" cy="9.5" r="1.5" />
                    <line x1="20" y1="2" x2="20" y2="8" />
                    <line x1="17" y1="5" x2="23" y2="5" />
                  </svg>
                  <div style={{ fontSize: '15px', color: '#4B5563', marginBottom: '6px' }}>
                    <span style={{ color: '#059669', fontWeight: 500 }}>ارفع ملفات</span> أو اسحب وأفلت الصور هنا
                  </div>
                  <div style={{ fontSize: '13px', color: '#9CA3AF' }}>
                    PNG, JPG, GIF حتى 5 ميجابايت لكل صورة
                  </div>
                </>
              )}
              <input 
                id="image-upload"
                type="file" 
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    if (event.target?.result) {
                      setForm(prev => ({ ...prev, image: event.target!.result as string }));
                    }
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </div>
          </div>

          {/* Sessions (courses only) */}
          {showSessions && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>عدد الجلسات (عربي)</label>
                <input name="sessionsAr" value={form.sessionsAr} onChange={handleChange} style={inputStyle} placeholder="8 جلسات" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Sessions (English)</label>
                <input name="sessionsEn" value={form.sessionsEn} onChange={handleChange} style={inputStyle} placeholder="8 Sessions" />
              </div>
            </div>
          )}

          {/* Features */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>النقاط / الميزات (عربي) - نقطة في كل سطر</label>
              <textarea name="featuresArStr" value={form.featuresArStr} onChange={handleChange} style={{ ...inputStyle, height: '80px', resize: 'vertical' }} placeholder="شهادة إتمام الكورس&#10;مشرف فني متخصص" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Features (English) - one per line</label>
              <textarea name="featuresEnStr" value={form.featuresEnStr} onChange={handleChange} style={{ ...inputStyle, height: '80px', resize: 'vertical' }} placeholder="Completion certificate&#10;Specialist art instructor" dir="ltr" />
            </div>
          </div>

          {/* Description (workshops/kids) */}
          {showDescription && (
            <>
              <div>
                <label style={labelStyle}>وصف مختصر (عربي)</label>
                <input name="subtitleAr" value={form.subtitleAr} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>الوصف الكامل (عربي)</label>
                <textarea name="descAr" value={form.descAr} onChange={handleChange} style={{ ...inputStyle, height: '80px', resize: 'vertical' }} />
              </div>
            </>
          )}

          {/* Sort Order */}
          <div>
            <label style={labelStyle}>الترتيب</label>
            <input type="number" name="sortOrder" value={form.sortOrder} onChange={handleChange} style={inputStyle} />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button type="submit" style={{
              flex: 1, background: '#121212', color: '#F6F6F4', border: 'none',
              padding: '12px', borderRadius: '0', cursor: 'pointer', fontWeight: 600,
              fontFamily: 'inherit', fontSize: '15px',
              transition: 'opacity 0.2s ease',
            }}>
              {isNew ? 'إضافة' : 'حفظ التعديلات'}
            </button>
            <button type="button" onClick={closeEditor} style={{
              flex: 1, background: 'transparent', color: '#121212', border: '1px solid #DEDEDE',
              padding: '12px', borderRadius: '0', cursor: 'pointer', fontWeight: 600,
              fontFamily: 'inherit', fontSize: '15px',
              transition: 'opacity 0.2s ease',
            }}>
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: '4px', fontSize: '13px', color: '#6B6B6B', fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1px solid #DEDEDE', borderRadius: '0',
  outline: 'none', fontFamily: 'inherit', fontSize: '14px', background: 'white',
  transition: 'border-color 0.2s ease',
};
