'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from './AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import type { WorkshopItem } from '@/lib/workshopStore';
import type { Category } from '@/lib/types';

/* ──────────────────────────────────────────────────────────────
   AdminCardOverlay — a single small floating gear that opens
   a clean dropdown menu. Doesn't overlap card content.
   ────────────────────────────────────────────────────────────── */
export function AdminCardOverlay({ workshop }: { workshop: WorkshopItem }) {
  const { isAdmin, openEditor } = useAdmin();
  const { toggleActive, deleteWorkshop } = useWorkshopStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  if (!isAdmin) return null;

  return (
    <div ref={menuRef} style={{ position: 'absolute', top: '-8px', left: '-8px', zIndex: 50 }}>
      {/* Trigger — olive pill with order number and pencil icon */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMenuOpen(v => !v); }}
        style={{
          height: '28px',
          padding: '0 10px',
          borderRadius: '14px',
          background: '#4D6314',
          border: '2px solid #F6F6F4',
          color: '#F6F6F4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          lineHeight: 1,
          fontFamily: 'monospace',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          transition: 'transform 0.15s ease',
          transform: menuOpen ? 'scale(1.05)' : 'scale(1)',
        }}
        title="خيارات الإدارة"
      >
        <span style={{ fontWeight: 600 }}>{workshop.sortOrder}</span>
        <span>✎</span>
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '32px',
          left: '0',
          background: '#F6F6F4',
          border: '1px solid #DEDEDE',
          boxShadow: 'rgba(18,18,18,0.08) 0px 4px 12px',
          minWidth: '120px',
          zIndex: 60,
          fontFamily: 'IBM Plex Arabic, sans-serif',
          overflow: 'hidden',
        }}>
          {/* Edit */}
          <button
            onClick={(e) => {
              e.preventDefault(); e.stopPropagation();
              setMenuOpen(false);
              openEditor(workshop);
            }}
            style={menuItemStyle}
            onMouseEnter={e => (e.currentTarget.style.background = '#E8E6E0')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontSize: '12px', opacity: 0.6 }}>✎</span>
            تعديل
          </button>

          {/* Toggle visibility */}
          <button
            onClick={(e) => {
              e.preventDefault(); e.stopPropagation();
              setMenuOpen(false);
              toggleActive(workshop.id);
            }}
            style={menuItemStyle}
            onMouseEnter={e => (e.currentTarget.style.background = '#E8E6E0')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontSize: '12px', opacity: 0.6 }}>{workshop.isActive ? '◡' : '◉'}</span>
            {workshop.isActive ? 'إخفاء' : 'إظهار'}
          </button>

          {/* Divider */}
          <div style={{ height: '1px', background: '#DEDEDE' }} />

          {/* Delete */}
          <button
            onClick={(e) => {
              e.preventDefault(); e.stopPropagation();
              setMenuOpen(false);
              if (confirm('حذف هذه الورشة نهائياً؟')) deleteWorkshop(workshop.id);
            }}
            style={{ ...menuItemStyle, color: '#B04A2E' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#FCEAE6')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontSize: '12px' }}>✕</span>
            حذف
          </button>
        </div>
      )}
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
        border: '1.5px dashed #4D6314',
        color: '#4D6314',
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
      onMouseEnter={e => { e.currentTarget.style.background = '#4D6314'; e.currentTarget.style.color = '#F6F6F4'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4D6314'; }}
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
        background: '#4D6314',
        color: '#F6F6F4',
        padding: '3px 12px',
        fontFamily: 'IBM Plex Arabic, sans-serif',
        fontSize: '11px',
        fontWeight: 600,
      }}>
        مخفي عن الزوار
      </span>
    </div>
  );
}

/* ── Shared menu item style ── */
const menuItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  padding: '8px 14px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '13px',
  fontFamily: 'IBM Plex Arabic, sans-serif',
  fontWeight: 500,
  color: '#121212',
  textAlign: 'right',
  transition: 'background 0.15s ease',
};
