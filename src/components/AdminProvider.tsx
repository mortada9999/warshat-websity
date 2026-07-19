'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  setIsAdmin: () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if URL has ?edit=true or if local storage has it
    if (typeof window !== 'undefined') {
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
    }
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
      
      {/* If in admin mode, show a small indicator at the bottom right */}
      {isAdmin && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          zIndex: 9999,
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          وضع التعديل المباشر مفعل ✏️
          <button 
            onClick={() => {
              setIsAdmin(false);
              localStorage.removeItem('visual_admin');
            }}
            style={{
              background: 'red',
              border: 'none',
              color: 'white',
              borderRadius: '4px',
              padding: '2px 8px',
              cursor: 'pointer'
            }}
          >
            خروج
          </button>
        </div>
      )}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
