'use client';

import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useLanguage } from '@/components/LanguageProvider';
import styles from './page.module.css';

export default function LoginPage() {
  const { t } = useLanguage();

  const handleGoogleLogin = () => {
    // NextAuth: sign in using 'google' provider, redirect to home page or dashboard
    signIn('google', { callbackUrl: '/?edit=true' });
  };

  const handleTestLogin = () => {
    signIn('credentials', { callbackUrl: '/?edit=true' });
  };

  return (
    <main className={styles.main}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>
          {t('تسجيل الدخول', 'Login')}
        </h1>
        <p className={styles.subtitle}>
          {t('مرحباً بك مجدداً في نظام إدارة ورشة فن', 'Welcome back to Warshat Fan management system')}
        </p>

        <button onClick={handleGoogleLogin} className={styles.googleBtn} style={{ marginBottom: '1rem' }}>
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google"
            width={24}
            height={24}
            className={styles.googleIcon}
            unoptimized
          />
          {t('المتابعة باستخدام جوجل', 'Continue with Google')}
        </button>

        <button onClick={handleTestLogin} className={styles.googleBtn} style={{ background: '#f3f4f6', borderColor: '#d1d5db' }}>
          🧪 {t('دخول تجريبي (بدون حساب)', 'Test Login (No Account)')}
        </button>
      </div>
    </main>
  );
}
