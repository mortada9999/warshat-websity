'use client';

import React from 'react';
import { useAdmin } from './AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import type { WorkshopItem } from '@/lib/workshopStore';
import type { Category } from '@/lib/types';

/* ──────────────────────────────────────────────────────────────
   AdminCardOverlay — shown on each workshop card in admin mode
   ────────────────────────────────────────────────────────────── */
export function AdminCardOverlay({ workshop }: { workshop: WorkshopItem }) {
  const { isAdmin, openEditor } = useAdmin();
  const { toggleActive, deleteWorkshop } = useWorkshopStore();

  if (!isAdmin) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '4px',
      left: '4px',
      display: 'flex',
      gap: '4px',
      zIndex: 50,
    }}>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEditor(workshop); }}
        style={btnStyle}
        title="تعديل"
      >
        ✏️
      </button>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleActive(workshop.id); }}
        style={btnStyle}
        title={workshop.isActive ? 'إخفاء' : 'إظهار'}
      >
        {workshop.isActive ? '👁️' : '👁️‍🗨️'}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); e.stopPropagation();
          if (confirm('حذف هذه الورشة نهائياً؟')) deleteWorkshop(workshop.id);
        }}
        style={{ ...btnStyle, background: 'rgba(196,98,45,0.9)' }}
        title="حذف نهائي"
      >
        🗑️
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   AdminAddButton — "Add new workshop" at the end of a section
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
        border: '2px dashed #C4622D',
        color: '#C4622D',
        cursor: 'pointer',
        fontFamily: 'IBM Plex Arabic, sans-serif',
        fontWeight: 600,
        fontSize: '14px',
        borderRadius: '0',
        width: '100%',
        minHeight: '60px',
        transition: 'background 0.2s ease, color 0.2s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#C4622D'; e.currentTarget.style.color = 'white'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C4622D'; }}
    >
      + إضافة ورشة جديدة
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────
   Inactive overlay — dims archived cards in admin view
   ────────────────────────────────────────────────────────────── */
export function InactiveOverlay({ workshop }: { workshop: WorkshopItem }) {
  const { isAdmin } = useAdmin();

  if (!isAdmin || workshop.isActive) return null;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(246,246,244,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 40,
      pointerEvents: 'none',
    }}>
      <span style={{
        background: '#121212',
        color: '#F6F6F4',
        padding: '4px 16px',
        fontFamily: 'IBM Plex Arabic, sans-serif',
        fontSize: '13px',
        fontWeight: 600,
      }}>
        مخفي عن الزوار
      </span>
    </div>
  );
}

/* ── Shared button style ── */
const btnStyle: React.CSSProperties = {
  background: 'rgba(18,18,18,0.85)',
  border: 'none',
  borderRadius: '0',
  padding: '4px 8px',
  cursor: 'pointer',
  fontSize: '14px',
  lineHeight: 1,
  transition: 'opacity 0.2s ease',
};
