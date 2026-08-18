'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Category } from '@/lib/types';
import type { WorkshopItem } from '@/lib/workshopStore';

/* ──────────────────────────────────────────────────────────────
   Admin Context
   ────────────────────────────────────────────────────────────── */
interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  adminSecret: string;
  setAdminSecret: (val: string) => void;
  /** Open the editor modal for a workshop (null = new) */
  openEditor: (workshop: WorkshopItem | null, defaultCategory?: Category) => void;
  closeEditor: () => void;
  /** Current editor state */
  editorState: { isOpen: boolean; workshop: WorkshopItem | null; defaultCategory?: Category };
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  setIsAdmin: () => {},
  adminSecret: '',
  setAdminSecret: () => {},
  openEditor: () => {},
  closeEditor: () => {},
  editorState: { isOpen: false, workshop: null },
});

/* ──────────────────────────────────────────────────────────────
   Provider
   ────────────────────────────────────────────────────────────── */
export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSecret, setAdminSecretState] = useState('');
  const [editorState, setEditorState] = useState<{
    isOpen: boolean;
    workshop: WorkshopItem | null;
    defaultCategory?: Category;
  }>({ isOpen: false, workshop: null });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('edit') === 'true') {
      setIsAdmin(true);
      localStorage.setItem('visual_admin', 'true');
    } else if (urlParams.get('edit') === 'false') {
      setIsAdmin(false);
      localStorage.removeItem('visual_admin');
    } else {
      setIsAdmin(localStorage.getItem('visual_admin') === 'true');
    }
    // Restore secret
    setAdminSecretState(localStorage.getItem('admin_secret') ?? '');
  }, []);

  const setAdminSecret = useCallback((val: string) => {
    setAdminSecretState(val);
    localStorage.setItem('admin_secret', val);
  }, []);

  const openEditor = useCallback((workshop: WorkshopItem | null, defaultCategory?: Category) => {
    setEditorState({ isOpen: true, workshop, defaultCategory });
  }, []);

  const closeEditor = useCallback(() => {
    setEditorState({ isOpen: false, workshop: null });
  }, []);

  return (
    <AdminContext.Provider value={{
      isAdmin, setIsAdmin,
      adminSecret, setAdminSecret,
      openEditor, closeEditor,
      editorState,
    }}>
      {children}

      {/* ── Floating Admin Bar ── */}
      {isAdmin && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(18,18,18,0.95)',
            backdropFilter: 'blur(8px)',
            color: 'white',
            padding: '10px 20px',
            fontSize: '14px',
            zIndex: 9999,
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'IBM Plex Arabic, sans-serif',
            borderTop: '2px solid #C4622D',
          }}
        >
          <span style={{ opacity: 0.7 }}>✏️ وضع التعديل المباشر</span>

          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />

          <button
            onClick={() => {
              setIsAdmin(false);
              localStorage.removeItem('visual_admin');
            }}
            style={{
              background: '#C4622D',
              border: 'none',
              color: 'white',
              borderRadius: '0',
              padding: '6px 16px',
              cursor: 'pointer',
              fontWeight: 600,
              fontFamily: 'inherit',
              fontSize: '13px',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            خروج ✕
          </button>
        </div>
      )}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
