'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Workshop } from '@/lib/types';
import styles from './WixActivityCard.module.css';
import { useLanguage } from './LanguageProvider';
import { useAdmin } from './AdminProvider';
import WorkshopEditorModal from './WorkshopEditorModal';

interface WixActivityCardProps {
  workshop: Workshop;
  onRefresh?: () => void;
}

export default function WixActivityCard({ workshop, onRefresh }: WixActivityCardProps) {
  const { lang } = useLanguage();
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);

  const title = lang === 'ar' ? workshop.title_ar : workshop.title_en;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('هل أنت متأكد من حذف هذا النشاط؟')) {
      await fetch(`/api/workshops/${workshop.id}`, { method: 'DELETE' });
      if (onRefresh) onRefresh();
    }
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        {isAdmin && (
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, display: 'flex', gap: 8 }}>
            <button onClick={(e) => { e.preventDefault(); setIsEditing(true); }} style={adminBtnStyle}>✏️</button>
            <button onClick={handleDelete} style={{ ...adminBtnStyle, background: '#fee' }}>🗑️</button>
          </div>
        )}
        <Link href={`/workshops/${workshop.id}`} className={styles.card}>
          <div className={styles.circleWrap}>
            {workshop.image_url ? (
              <img src={workshop.image_url} alt={title} className={styles.image} loading="lazy" />
            ) : (
              <div className={styles.placeholder} />
            )}
          </div>

          <h3 className={styles.title}>{title}</h3>

          {workshop.price != null && workshop.price > 0 && (
            <div className={styles.priceWrap}>
              {/* Orange brush stroke effect using CSS border-radius */}
              <span className={styles.price}>
                {workshop.price.toLocaleString()}
              </span>
            </div>
          )}
        </Link>
      </div>

      {isEditing && (
        <WorkshopEditorModal 
          workshop={workshop} 
          onClose={() => setIsEditing(false)} 
          onSave={() => { setIsEditing(false); if (onRefresh) onRefresh(); }} 
        />
      )}
    </>
  );
}

const adminBtnStyle = {
  background: '#fff',
  border: '1px solid #ddd',
  padding: '6px 8px',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '12px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};
