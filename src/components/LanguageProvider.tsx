'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Lang } from '@/lib/types';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  isRtl: boolean;
  t: (ar: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ar',
  setLang: () => {},
  isRtl: true,
  t: (ar) => ar,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'ar' || saved === 'en') {
      setLangState(saved);
    }
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    if (l === 'en') {
      document.body.classList.add('ltr');
    } else {
      document.body.classList.remove('ltr');
    }
  }

  const isRtl = lang === 'ar';
  const t = (ar: string, en: string) => (lang === 'ar' ? ar : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, isRtl, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
