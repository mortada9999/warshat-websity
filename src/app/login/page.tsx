'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import styles from './page.module.css';

function LoginForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl });
  };

  const handleTestLogin = () => {
    signIn('credentials', { callbackUrl });
  };

  return (
    <div className={styles.loginCard}>
      <h1 className={styles.title}>
        {t('تسجيل الدخول', 'Login')}
      </h1>
      <p className={styles.subtitle}>
        {t('مرحباً بك في ورشة فن', 'Welcome to Warshat Fan')}
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
  );
}

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
