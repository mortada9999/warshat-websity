'use client';

import React, { useState } from 'react';
import type { Workshop, Category } from '@/lib/types';

interface WorkshopEditorModalProps {
  workshop: Workshop | null; // if null, we are adding new
  defaultCategory?: Category;
  onClose: () => void;
  onSave: () => void; // callback to refresh the list
}

export default function WorkshopEditorModal({ workshop, defaultCategory, onClose, onSave }: WorkshopEditorModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title_ar: workshop?.title_ar || '',
    title_en: workshop?.title_en || '',
    category: workshop?.category || defaultCategory || 'workshop',
    price: workshop?.price || 0,
    image_url: workshop?.image_url || '',
    description_ar: workshop?.description_ar || '',
    description_en: workshop?.description_en || '',
    sort_order: workshop?.sort_order || 0,
    is_active: workshop ? workshop.is_active : 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'sort_order' || name === 'is_active' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const isNew = !workshop;
      const url = isNew ? '/api/workshops' : `/api/workshops/${workshop.id}`;
      const method = isNew ? 'POST' : 'PATCH';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          // Note: we usually need a way to pass auth for admin actions.
          // Since the prompt doesn't specify auth mechanism, we assume the backend checks session/cookies
          // or we just bypass if running locally for the prototype.
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data: any = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      onSave();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', zIndex: 10000,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '32px',
        width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ color: 'var(--olive)', marginBottom: '24px' }}>
          {workshop ? 'تعديل الورشة' : 'إضافة ورشة جديدة'}
        </h2>

        {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>الاسم (عربي)</label>
            <input required name="title_ar" value={formData.title_ar} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>الاسم (إنجليزي)</label>
            <input required name="title_en" value={formData.title_en} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>التصنيف</label>
            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
              <option value="workshop">ورشة عمل (تدريب)</option>
              <option value="open_activity">نشاط مفتوح</option>
              <option value="kids">أطفال</option>
              <option value="course">دورة</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>السعر (د.ع)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>الترتيب (Sort Order)</label>
              <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>رابط الصورة</label>
            <input name="image_url" value={formData.image_url} onChange={handleChange} style={inputStyle} placeholder="https://..." />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>الوصف</label>
            <textarea name="description_ar" value={formData.description_ar} onChange={handleChange} style={{...inputStyle, height: '80px'}} />
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button type="submit" disabled={loading} style={{
              flex: 1, background: 'var(--olive)', color: '#fff', border: 'none',
              padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
            }}>
              {loading ? 'جاري الحفظ...' : 'حفظ'}
            </button>
            <button type="button" onClick={onClose} style={{
              flex: 1, background: '#eee', color: '#333', border: 'none',
              padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
            }}>
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  outline: 'none',
  fontFamily: 'inherit',
};
