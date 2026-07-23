'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import WorkshopForm from '@/components/WorkshopForm';
import type { Workshop } from '@/lib/types';
import styles from '../../admin.module.css';

export default function EditWorkshopPage() {
  const { id } = useParams<{ id: string }>();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    fetch(`/api/workshops/${id}`)
      .then(r => r.json())
      .then((d: any) => {
        if (d.workshop) setWorkshop(d.workshop);
        else setError('الورشة غير موجودة');
      })
      .catch(() => setError('تعذّر تحميل الورشة'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <AdminNav />
      <main className={styles.main}>
        <div className={`container ${styles.formWrap}`}>
          <h1 className={styles.pageTitle}>تعديل الورشة</h1>
          {loading ? (
            <div className={styles.loadingMsg}>جارٍ التحميل…</div>
          ) : error ? (
            <p style={{ color: '#e87070' }}>{error}</p>
          ) : workshop ? (
            <WorkshopForm mode="edit" initial={workshop} workshopId={workshop.id} />
          ) : null}
        </div>
      </main>
    </>
  );
}
