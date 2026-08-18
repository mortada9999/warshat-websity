'use client';

import React from 'react';
import { useAdmin } from './AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import type { WorkshopItem } from '@/lib/workshopStore';
import type { Category } from '@/lib/types';

/* ──────────────────────────────────────────────────────────────
   AdminCardOverlay — elegant controls on each card in admin mode
   ────────────────────────────────────────────────────────────── */
export function AdminCardOverlay({ workshop }: { workshop: WorkshopItem }) {
  const { isAdmin, openEditor } = useAdmin();
  const { toggleActive, deleteWorkshop } = useWorkshopStore();

  if (!isAdmin) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'flex-start',
      gap: '1px',
      zIndex: 50,
      opacity: 0.9,
    }}>
      {/* Edit */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEditor(workshop); }}
        style={{
          ...btnBase,
          background: '#121212',
          color: '#F6F6F4',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#C4622D')}
        onMouseLeave={e => (e.currentTarget.style.background = '#121212')}
        title="تعديل"
      >
        تعديل
      </button>

      {/* Toggle visibility */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleActive(workshop.id); }}
        style={{
          ...btnBase,
          background: workshop.isActive ? '#121212' : '#C4622D',
          color: '#F6F6F4',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        title={workshop.isActive ? 'إخفاء' : 'إظهار'}
      >
        {workshop.isActive ? 'إخفاء' : 'إظهار'}
      </button>

      {/* Delete */}
      <button
        onClick={(e) => {
          e.preventDefault(); e.stopPropagation();
          if (confirm('حذف هذه الورشة نهائياً؟')) deleteWorkshop(workshop.id);
        }}
        style={{
          ...btnBase,
          background: 'transparent',
          color: '#C4622D',
          border: '1px solid #C4622D',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#C4622D'; e.currentTarget.style.color = '#F6F6F4'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C4622D'; }}
        title="حذف نهائي"
      >
        حذف
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   AdminAddButton — dashed "Add new workshop" at section end
   ────────────────────────────────────────────────────────────── */
export function AdminAddButton({ category }: { category: Category }) {
  const { isAdmin, openEditor } = useAdmin();

  if (!isAdmin) return null;

  return (
    <button
      onClick={() => openEditor(null, category)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 24px',
        background: 'transparent',
        border: '1.5px dashed #C4622D',
        color: '#C4622D',
        cursor: 'pointer',
        fontFamily: 'IBM Plex Arabic, sans-serif',
        fontWeight: 600,
        fontSize: '14px',
        borderRadius: '0',
        width: '100%',
        minHeight: '56px',
        transition: 'background 0.2s ease, color 0.2s ease',
        letterSpacing: '0.02em',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#C4622D'; e.currentTarget.style.color = '#F6F6F4'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C4622D'; }}
    >
      + إضافة ورشة جديدة
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────
   InactiveOverlay — dims archived cards in admin view
   ────────────────────────────────────────────────────────────── */
export function InactiveOverlay({ workshop }: { workshop: WorkshopItem }) {
  const { isAdmin } = useAdmin();

  if (!isAdmin || workshop.isActive) return null;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(246,246,244,0.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 40,
      pointerEvents: 'none',
    }}>
      <span style={{
        background: '#121212',
        color: '#F6F6F4',
        padding: '4px 14px',
        fontFamily: 'IBM Plex Arabic, sans-serif',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.04em',
      }}>
        مخفي عن الزوار
      </span>
    </div>
  );
}

/* ── Shared button base ── */
const btnBase: React.CSSProperties = {
  border: 'none',
  borderRadius: '0',
  padding: '5px 12px',
  cursor: 'pointer',
  fontSize: '11px',
  fontFamily: 'IBM Plex Arabic, sans-serif',
  fontWeight: 600,
  lineHeight: 1.4,
  transition: 'background 0.2s ease, color 0.2s ease, opacity 0.2s ease',
  letterSpacing: '0.02em',
};
