'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AdminNav from '@/components/AdminNav';
import { CATEGORY_LABELS, BRANCH_LABELS } from '@/lib/types';
import type { Workshop } from '@/lib/types';
import styles from './page.module.css';

export default function AdminPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading]     = useState(true);
  const [deleting, setDeleting]   = useState<string | null>(null);
  const [error, setError]         = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const secret = localStorage.getItem('admin_secret') ?? '';
    try {
      const res  = await fetch('/api/workshops?admin=1', {
        headers: { 'Authorization': `Bearer ${secret}` },
      });
      const data: any = await res.json();
      if (res.status === 401) {
        setError('مفتاح الإدارة غير صحيح');
        setWorkshops([]);
      } else {
        setWorkshops(data.workshops ?? []);
        setError('');
      }
    } catch {
      setError('تعذّر الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    if (!confirm('هل أنت متأكد من إلغاء تفعيل هذه الورشة؟')) return;
    setDeleting(id);
    const secret = localStorage.getItem('admin_secret') ?? '';
    try {
      const res = await fetch(`/api/workshops/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${secret}` },
      });
      if (res.ok) {
        setWorkshops(prev => prev.map(w => w.id === id ? { ...w, is_active: 0 } : w));
      } else {
        alert('فشل الحذف');
      }
    } finally {
      setDeleting(null);
    }
  }

  const CATEGORY_ICONS: Record<string, string> = {
    open_activity: '🎨', workshop: '🛠', kids: '🌟', course: '📚',
  };

  return (
    <>
      <AdminNav />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>إدارة الورش</h1>
            <Link href="/admin/new" className="btn btn-primary" id="new-workshop-btn">
              + إضافة ورشة جديدة
            </Link>
          </div>

          {/* Secret input hint */}
          <div className={styles.secretHint}>
            <label htmlFor="admin_secret_hint" className={styles.secretLabel}>
              مفتاح الإدارة (ADMIN_SECRET):
            </label>
            <input
              id="admin_secret_hint"
              type="password"
              className={`form-input ${styles.secretInput}`}
              placeholder="أدخل المفتاح للاستمرار"
              defaultValue={typeof window !== 'undefined' ? localStorage.getItem('admin_secret') ?? '' : ''}
              onChange={e => {
                localStorage.setItem('admin_secret', e.target.value);
              }}
            />
            <button className="btn btn-ghost btn-sm" onClick={load}>تحميل</button>
          </div>

          {error && <div className={styles.error} role="alert">{error}</div>}

          {loading ? (
            <div className={styles.loadingMsg}>جارٍ التحميل…</div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table} aria-label="قائمة الورش">
                <thead>
                  <tr>
                    <th>الصورة</th>
                    <th>العنوان</th>
                    <th>التصنيف</th>
                    <th>الفرع</th>
                    <th>السعر</th>
                    <th>المقاعد</th>
                    <th>الحالة</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {workshops.length === 0 ? (
                    <tr>
                      <td colSpan={8} className={styles.emptyRow}>
                        لا توجد ورش بعد. <Link href="/admin/new">أضف أول ورشة</Link>
                      </td>
                    </tr>
                  ) : workshops.map(w => (
                    <tr key={w.id} className={w.is_active === 0 ? styles.inactiveRow : ''}>
                      <td>
                        {w.image_url ? (
                          <img src={w.image_url} alt="" className={styles.thumb} />
                        ) : (
                          <span className={styles.thumbIcon}>
                            {CATEGORY_ICONS[w.category] ?? '✦'}
                          </span>
                        )}
                      </td>
                      <td className={styles.titleCell}>
                        <span className={styles.titleAr}>{w.title_ar}</span>
                        <span className={styles.titleEn}>{w.title_en}</span>
                      </td>
                      <td>
                        <span className="badge badge-orange">
                          {CATEGORY_LABELS[w.category]?.ar ?? w.category}
                        </span>
                      </td>
                      <td>
                        {w.branch ? BRANCH_LABELS[w.branch]?.ar : '—'}
                      </td>
                      <td>
                        {w.price != null && w.price > 0
                          ? `${w.price.toLocaleString()} د.ع`
                          : <span className={styles.free}>مجاني</span>
                        }
                      </td>
                      <td>{w.seats ?? '—'}</td>
                      <td>
                        {w.is_active === 1
                          ? <span className="badge badge-green">مفعّل</span>
                          : <span className="badge badge-red">معطّل</span>
                        }
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <Link
                            href={`/admin/${w.id}/edit`}
                            className="btn btn-ghost btn-sm"
                            id={`edit-${w.id}`}
                          >
                            تعديل
                          </Link>
                          {w.is_active === 1 && (
                            <button
                              className="btn btn-danger btn-sm"
                              id={`delete-${w.id}`}
                              disabled={deleting === w.id}
                              onClick={() => handleDelete(w.id)}
                            >
                              {deleting === w.id ? '…' : 'تعطيل'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
