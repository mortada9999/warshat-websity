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
  { value: 'kids', label: 'أطفال' },
];

export default function WorkshopEditorModal() {
  const { editorState, closeEditor } = useAdmin();
  const { addWorkshop, updateWorkshop } = useWorkshopStore();
  const { isOpen, workshop, defaultCategory } = editorState;

  const isNew = !workshop;

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
    sortOrder: 0,
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
          sortOrder: 0,
        });
      }
    }
  }, [isOpen, workshop, defaultCategory]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'sortOrder' ? Number(value) : value,
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
      pattern: form.pattern || undefined,
      isActive: true,
      sortOrder: form.sortOrder,
    };

    if (isNew) {
      addWorkshop(item);
    } else {
      updateWorkshop(workshop!.id, item);
    }

    closeEditor();
  };

  const showSessions = form.category === 'course';
  const showDescription = form.category === 'workshop' || form.category === 'kids';

  return (
    <div
      onClick={closeEditor}
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

          {/* Price */}
          <div>
            <label style={labelStyle}>السعر (مثل: 10,000)</label>
            <input name="price" value={form.price} onChange={handleChange} style={inputStyle} placeholder="10,000" />
          </div>

          {/* Image */}
          <div>
            <label style={labelStyle}>رابط الصورة</label>
            <input name="image" value={form.image} onChange={handleChange} style={inputStyle} placeholder="/images/figma/pottery.png" />
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
