'use client';

import React, { useState, useMemo } from 'react';
import { useAdmin } from './AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import type { Category } from '@/lib/types';
import Image from 'next/image';

export function HiddenWorkshopsMenu({ category }: { category: Category }) {
  const { isAdmin, openEditor } = useAdmin();
  const { allWorkshops } = useWorkshopStore();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  if (!isAdmin) return null;

  // Filter for hidden workshops in this specific category
  const hiddenWorkshops = allWorkshops.filter(w => !w.isActive && w.category === category);
  
  if (hiddenWorkshops.length === 0) return null;

  const filteredList = hiddenWorkshops.filter(w => 
    w.titleAr.toLowerCase().includes(search.toLowerCase()) || 
    (w.titleEn && w.titleEn.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px', // Assuming LTR/RTL positioning based on user's screenshot
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1.5px dashed #4D6314',
          color: '#4D6314',
          padding: '8px 16px',
          borderRadius: '8px',
          fontFamily: 'IBM Plex Arabic, sans-serif',
          fontWeight: 600,
          fontSize: '13px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        title="عرض الورش المخفية"
      >
        <span>الورش المخفية</span>
        <span style={{ 
          background: '#4D6314', 
          color: '#FFF', 
          borderRadius: '50%', 
          width: '20px', 
          height: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '11px' 
        }}>
          {hiddenWorkshops.length}
        </span>
      </button>

      {isOpen && (
        <div 
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            zIndex: 100000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
            fontFamily: 'IBM Plex Arabic, sans-serif'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div 
            style={{
              background: '#FDFBF7',
              width: '100%', maxWidth: '500px', maxHeight: '80vh',
              borderRadius: '12px',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
            }}
            onClick={e => e.stopPropagation()}
            data-lenis-prevent="true"
          >
            {/* Header */}
            <div style={{ padding: '20px', borderBottom: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#374A00', fontSize: '18px', fontWeight: 'bold' }}>
                الورش المخفية
              </h3>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#888' }}>
                ✕
              </button>
            </div>

            {/* Search */}
            <div style={{ padding: '16px 20px', background: '#F6F6F4' }}>
              <input 
                type="text" 
                placeholder="ابحث عن ورشة مخفية..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', padding: '10px 14px',
                  borderRadius: '6px', border: '1px solid #DEDEDE',
                  fontSize: '14px', outline: 'none'
                }}
              />
            </div>

            {/* List */}
            <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredList.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#888', padding: '20px 0' }}>لا توجد نتائج مطابقة</p>
              ) : (
                filteredList.map(w => (
                  <div key={w.id} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px', border: '1px solid #EAEAEA', borderRadius: '8px',
                    background: '#FFF'
                  }}>
                    {w.image ? (
                      <div style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                        <Image src={w.image} alt={w.titleAr} fill className="object-cover" sizes="48px" />
                      </div>
                    ) : (
                      <div style={{ width: '48px', height: '48px', borderRadius: '6px', background: '#F0F0F0', flexShrink: 0 }} />
                    )}
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '15px', color: '#121212', fontWeight: 600 }}>{w.titleAr}</h4>
                    </div>

                    <button
                      onClick={() => {
                        setIsOpen(false);
                        openEditor(w);
                      }}
                      style={{
                        padding: '6px 14px', background: '#4D6314', color: '#FFF',
                        border: 'none', borderRadius: '6px', cursor: 'pointer',
                        fontSize: '12px', fontWeight: 600, transition: 'background 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#374A00'}
                      onMouseLeave={e => e.currentTarget.style.background = '#4D6314'}
                    >
                      تحديث ونشر
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
