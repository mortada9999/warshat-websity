'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Workshop } from '@/lib/types';
import styles from './WixTrainingCard.module.css';
import { useLanguage } from './LanguageProvider';
import { useAdmin } from './AdminProvider';
import WorkshopEditorModal from './WorkshopEditorModal';

interface WixTrainingCardProps {
  workshop: Workshop;
  onRefresh?: () => void;
}

export default function WixTrainingCard({ workshop, onRefresh }: WixTrainingCardProps) {
  const { lang } = useLanguage();
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);

  const title = lang === 'ar' ? workshop.title_ar : workshop.title_en;
  const description = lang === 'ar' ? workshop.description_ar : workshop.description_en;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('هل أنت متأكد من حذف هذه الورشة؟')) {
      await fetch(`/api/workshops/${workshop.id}`, { method: 'DELETE' });
      if (onRefresh) onRefresh();
    }
  };

  return (
    <>
      <div className={styles.cardWrapper} style={{ position: 'relative' }}>
        {isAdmin && (
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, display: 'flex', gap: 8 }}>
            <button onClick={(e) => { e.preventDefault(); setIsEditing(true); }} style={adminBtnStyle}>✏️ تعديل</button>
            <button onClick={handleDelete} style={{ ...adminBtnStyle, background: '#fee' }}>🗑️ حذف</button>
          </div>
        )}
        <div className={styles.card}>
          <div className={styles.imageWrap}>
            {workshop.image_url ? (
              <img src={workshop.image_url} alt={title} className={styles.image} loading="lazy" />
            ) : (
              <div className={styles.placeholder} />
            )}
          </div>
          
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            
            {description && (
              <p className={styles.desc}>
                {description}
              </p>
            )}

            <Link href={`/workshops/${workshop.id}`} className={styles.bookBtn}>
              Book Now
            </Link>
          </div>
        </div>
        {/* Decorative triangle hanging from bottom */}
        <div className={styles.triangle} />
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
  padding: '6px 12px',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '14px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};
