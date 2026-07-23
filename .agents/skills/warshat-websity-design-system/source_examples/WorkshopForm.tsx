'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Workshop, Category, Branch } from '@/lib/types';
import styles from './WorkshopForm.module.css';

interface WorkshopFormProps {
  initial?: Partial<Workshop>;
  mode: 'create' | 'edit';
  workshopId?: string;
}

const CATEGORIES: { value: Category; ar: string; en: string }[] = [
  { value: 'open_activity', ar: 'نشاط مفتوح', en: 'Open Activity' },
  { value: 'workshop',      ar: 'ورشة عمل',   en: 'Workshop' },
  { value: 'kids',          ar: 'أطفال',       en: 'Kids' },
  { value: 'course',        ar: 'دورة',        en: 'Course' },
];

const BRANCHES: { value: Branch; ar: string; en: string }[] = [
  { value: 'zayouna', ar: 'الزيونة', en: 'Zayouna' },
  { value: 'yarmouk', ar: 'اليرموك', en: 'Yarmouk' },
  { value: 'both',    ar: 'الفرعين', en: 'Both' },
];

export default function WorkshopForm({ initial, mode, workshopId }: WorkshopFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');
  const [imagePreview, setImagePreview] = useState(initial?.image_url ?? '');

  const [form, setForm] = useState({
    title_ar:       initial?.title_ar       ?? '',
    title_en:       initial?.title_en       ?? '',
    description_ar: initial?.description_ar ?? '',
    description_en: initial?.description_en ?? '',
    category:       initial?.category       ?? 'workshop',
    price:          initial?.price?.toString()  ?? '',
    image_url:      initial?.image_url      ?? '',
    is_active:      initial?.is_active      ?? 1,
    tags:           initial?.tags           ?? '',
    seats:          initial?.seats?.toString()  ?? '',
    branch:         initial?.branch         ?? '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'image_url') setImagePreview(value);
  }

  function handleToggle() {
    setForm(prev => ({ ...prev, is_active: prev.is_active === 1 ? 0 : 1 }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const secret = localStorage.getItem('admin_secret') ?? '';
    const payload = {
      title_ar:       form.title_ar,
      title_en:       form.title_en,
      description_ar: form.description_ar || null,
      description_en: form.description_en || null,
      category:       form.category,
      price:          form.price ? parseInt(form.price) : null,
      image_url:      form.image_url || null,
      is_active:      form.is_active as 0 | 1,
      tags:           form.tags || null,
      seats:          form.seats ? parseInt(form.seats) : null,
      branch:         form.branch || null,
    };

    try {
      const url    = mode === 'create' ? '/api/workshops' : `/api/workshops/${workshopId}`;
      const method = mode === 'create' ? 'POST'          : 'PATCH';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${secret}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        setError('مفتاح الإدارة غير صحيح. أدخله في الإعدادات.');
        return;
      }
      if (!res.ok) {
        const data: any = await res.json();
        setError(data.error ?? 'حدث خطأ');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('تعذّر الاتصال بالخادم');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {error && <div className={styles.errorBanner} role="alert">{error}</div>}

      {/* ── Titles ── */}
      <div className={styles.row}>
        <div className="form-group">
          <label className="form-label" htmlFor="title_ar">العنوان بالعربي *</label>
          <input
            id="title_ar"
            name="title_ar"
            value={form.title_ar}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="ورشة الرسم بالألوان المائية"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="title_en">العنوان بالإنجليزي *</label>
          <input
            id="title_en"
            name="title_en"
            value={form.title_en}
            onChange={handleChange}
            required
            className="form-input"
            dir="ltr"
            placeholder="Watercolor Painting Workshop"
          />
        </div>
      </div>

      {/* ── Descriptions ── */}
      <div className={styles.row}>
        <div className="form-group">
          <label className="form-label" htmlFor="description_ar">الوصف بالعربي</label>
          <textarea
            id="description_ar"
            name="description_ar"
            value={form.description_ar}
            onChange={handleChange}
            className="form-textarea"
            placeholder="وصف تفصيلي عن الورشة..."
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description_en">الوصف بالإنجليزي</label>
          <textarea
            id="description_en"
            name="description_en"
            value={form.description_en}
            onChange={handleChange}
            className="form-textarea"
            dir="ltr"
            placeholder="Detailed description of the workshop..."
          />
        </div>
      </div>

      {/* ── Category / Branch ── */}
      <div className={styles.row}>
        <div className="form-group">
          <label className="form-label" htmlFor="category">التصنيف *</label>
          <select id="category" name="category" value={form.category} onChange={handleChange} className="form-select">
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.ar} / {c.en}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="branch">الفرع</label>
          <select id="branch" name="branch" value={form.branch} onChange={handleChange} className="form-select">
            <option value="">— بدون تحديد —</option>
            {BRANCHES.map(b => (
              <option key={b.value} value={b.value}>{b.ar} / {b.en}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Price / Seats ── */}
      <div className={styles.row}>
        <div className="form-group">
          <label className="form-label" htmlFor="price">السعر (دينار عراقي)</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={handleChange}
            className="form-input"
            placeholder="0 = مجاني"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="seats">عدد المقاعد</label>
          <input
            id="seats"
            name="seats"
            type="number"
            min="1"
            value={form.seats}
            onChange={handleChange}
            className="form-input"
            placeholder="مثال: 15"
          />
        </div>
      </div>

      {/* ── Tags ── */}
      <div className="form-group">
        <label className="form-label" htmlFor="tags">الوسوم (مفصولة بفاصلة)</label>
        <input
          id="tags"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className="form-input"
          placeholder="رسم, ألوان, مبتدئين"
        />
      </div>

      {/* ── Image URL ── */}
      <div className="form-group">
        <label className="form-label" htmlFor="image_url">رابط الصورة</label>
        <input
          id="image_url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          className="form-input"
          dir="ltr"
          placeholder="https://example.com/image.jpg"
        />
        {imagePreview && (
          <div className={styles.imagePreview}>
            <img src={imagePreview} alt="معاينة الصورة" onError={() => setImagePreview('')} />
          </div>
        )}
      </div>

      {/* ── Active toggle ── */}
      <div className={styles.activeRow}>
        <button
          type="button"
          id="toggle-active"
          onClick={handleToggle}
          className={`${styles.toggle} ${form.is_active === 1 ? styles.toggleOn : ''}`}
          aria-pressed={form.is_active === 1}
        >
          <span className={styles.toggleThumb} />
        </button>
        <span className={styles.activeLabel}>
          {form.is_active === 1 ? 'مفعّل — يظهر للزوار' : 'معطّل — مخفي عن الزوار'}
        </span>
      </div>

      {/* ── ADMIN SECRET (stored in localStorage, never sent as URL) ── */}
      <div className={styles.secretRow}>
        <div className="form-group">
          <label className="form-label" htmlFor="admin_secret_input">مفتاح الإدارة (ADMIN_SECRET)</label>
          <input
            id="admin_secret_input"
            type="password"
            className="form-input"
            placeholder="أدخل المفتاح السري"
            defaultValue={typeof window !== 'undefined' ? localStorage.getItem('admin_secret') ?? '' : ''}
            onChange={e => localStorage.setItem('admin_secret', e.target.value)}
          />
          <p className="form-error" style={{ color: 'var(--clr-text-muted)', marginTop: '0.3rem' }}>
            يُحفظ محلياً في متصفحك — لا يُرسل إلا مع طلبات API
          </p>
        </div>
      </div>

      {/* ── Submit ── */}
      <div className={styles.actions}>
        <button type="button" className="btn btn-ghost" onClick={() => router.back()}>
          إلغاء
        </button>
        <button
          id="submit-form"
          type="submit"
          className="btn btn-primary"
          disabled={saving}
        >
          {saving ? '…جارٍ الحفظ' : mode === 'create' ? 'إنشاء الورشة' : 'حفظ التعديلات'}
        </button>
      </div>
    </form>
  );
}
