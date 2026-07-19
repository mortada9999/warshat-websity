export type Category = 'open_activity' | 'workshop' | 'kids' | 'course';
export type Branch = 'zayouna' | 'yarmouk' | 'both';

export interface Workshop {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string | null;
  description_en: string | null;
  category: Category;
  price: number | null;
  image_url: string | null;
  is_active: number; // 1 = active, 0 = inactive (SQLite boolean)
  tags: string | null; // comma-separated
  seats: number | null;
  branch: Branch | null;
  created_at: string;
  sort_order: number;
}

export interface WorkshopFilters {
  category?: Category;
  branch?: Branch;
}

export type Lang = 'ar' | 'en';

export const CATEGORY_LABELS: Record<Category, { ar: string; en: string }> = {
  open_activity: { ar: 'نشاط مفتوح', en: 'Open Activity' },
  workshop:      { ar: 'ورشة عمل',   en: 'Workshop' },
  kids:          { ar: 'أطفال',       en: 'Kids' },
  course:        { ar: 'دورة',        en: 'Course' },
};

export const BRANCH_LABELS: Record<Branch, { ar: string; en: string }> = {
  zayouna: { ar: 'الزيونة', en: 'Zayouna' },
  yarmouk: { ar: 'اليرموك', en: 'Yarmouk' },
  both:    { ar: 'الفرعين', en: 'Both Branches' },
};
