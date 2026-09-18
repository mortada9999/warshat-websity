import type { Metadata } from 'next';
import CafeMenuPage from '@/components/cafe/CafeMenuPage';

export const metadata: Metadata = {
  title: 'قهوة فن — المنيو | Warshat Fan',
  description: 'استعرض منيو قهوة فن — مشروبات ومأكولات بغداديّة بلمسة فنية.',
};

export default function CafeMenu() {
  return <CafeMenuPage />;
}
