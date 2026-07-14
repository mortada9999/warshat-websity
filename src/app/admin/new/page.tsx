import React from 'react';
import AdminNav from '@/components/AdminNav';
import WorkshopForm from '@/components/WorkshopForm';
import styles from '../admin.module.css';

export const metadata = {
  title: 'إضافة ورشة جديدة — ورشة فن',
};

export default function NewWorkshopPage() {
  return (
    <>
      <AdminNav />
      <main className={styles.main}>
        <div className={`container ${styles.formWrap}`}>
          <h1 className={styles.pageTitle}>إضافة ورشة جديدة</h1>
          <WorkshopForm mode="create" />
        </div>
      </main>
    </>
  );
}
