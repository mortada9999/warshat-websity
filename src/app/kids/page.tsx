import type { Metadata } from 'next';
import KidsPage from '@/components/kids/KidsPage';

export const metadata: Metadata = {
  title: 'ورش واشتراكات الأطفال — ورشة فن',
  description: 'كورسات وورش تدريبية ملوّنة للأطفال في ورشة فن — بغداد.',
};

export default function Page() {
  return <KidsPage />;
}
