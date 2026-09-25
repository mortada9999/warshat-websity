'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Category } from '@/lib/types';

/* ──────────────────────────────────────────────────────────────
   Workshop item shape (matches existing types but with local fields)
   ────────────────────────────────────────────────────────────── */
export interface WorkshopItem {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
  descAr?: string;
  descEn?: string;
  price?: string;        // display price like "10,000"
  priceNum?: number;     // numeric price for API
  image: string;
  category: Category;
  sessionsAr?: string;
  sessionsEn?: string;
  featuresAr?: string[];
  featuresEn?: string[];
  pattern?: string;
  paymentType?: 'full' | 'deposit' | 'form_only';
  depositAmount?: string;
  isActive: boolean;     // true = visible to visitors
  sortOrder: number;
}

/* ──────────────────────────────────────────────────────────────
   Hardcoded defaults (the original design placeholders)
   ────────────────────────────────────────────────────────────── */
const DEFAULT_ACTIVITIES: WorkshopItem[] = [
  { id: 'act-1', titleAr: 'الرسم على الأكواب الفخارية', titleEn: 'Cup Painting', price: '10,000', image: '/images/cup.avif', category: 'open_activity', isActive: true, sortOrder: 0 },
  { id: 'act-2', titleAr: 'الرسم على الحقائب القماشية', titleEn: 'Tote Bag Painting', price: '15,000', image: '/images/tote.avif', category: 'open_activity', isActive: true, sortOrder: 1 },
  { id: 'act-3', titleAr: 'الرسم على المرايا', titleEn: 'Mirror Painting', price: '15,000', image: '/images/mirror.avif', category: 'open_activity', isActive: true, sortOrder: 2 },
  { id: 'act-4', titleAr: 'صناعة الاكسسوارات', titleEn: 'Accessory Making', price: '15,000', image: '/images/accessory.avif', category: 'open_activity', isActive: true, sortOrder: 3 },
  { id: 'act-5', titleAr: 'الرسم على القطع الخشبية', titleEn: 'Wood Painting', price: '10,000', image: '/images/wood.avif', category: 'open_activity', isActive: true, sortOrder: 4 },
  { id: 'act-6', titleAr: 'الرسم على اللوحات', titleEn: 'Canvas Painting', price: '15,000', image: '/images/canvas.avif', category: 'open_activity', isActive: true, sortOrder: 5 },
  { id: 'act-7', titleAr: 'الرسم على الزجاج', titleEn: 'Glass Painting', price: '20,000', image: '/images/glass.avif', category: 'open_activity', isActive: true, sortOrder: 6 },
  { id: 'act-8', titleAr: 'الرسم و الزراعة', titleEn: 'Painting & Planting', price: '15,000', image: '/images/planting.avif', category: 'open_activity', isActive: true, sortOrder: 7 },
];

const DEFAULT_WORKSHOPS: WorkshopItem[] = [
  { id: 'ws-1', titleAr: 'ورشة الفخار', titleEn: 'Pottery Workshop', subtitleAr: 'استكشف مهارات تشكيل الطين وتحويله إلى قطع فنية تنبض بالحياة', subtitleEn: 'Explore clay shaping and turn it into lively art pieces', descAr: 'سواء كنتم مبتدئين أو تمتلكون خبرة سابقة، ستجدون في قسم الخزف فرصة للتعبير عن أنفسكم وابتكار أعمال فنية فريدة تحمل لمستكم الخاصة.', descEn: 'Whether you are a beginner or have prior experience, the pottery section gives you a chance to express yourself and create unique works with your own touch.', image: '/images/pottery.jpg', category: 'workshop', isActive: true, sortOrder: 0 },
  { id: 'ws-2', titleAr: 'الطباعة باللينو', titleEn: 'Lino Cut Printing', subtitleAr: 'تعلم فن الطباعة البارزة واستخراج التصاميم المعقدة', subtitleEn: 'Learn relief printing and carve intricate designs', descAr: 'مساحة إبداعية للتعرف على أدوات الحفر وإنشاء طبعات فنية بلمساتك الخاصة، لا تتطلب خبرة مسبقة.', descEn: 'A creative space to explore carving tools and create prints with your own touch — no prior experience needed.', image: '/images/lino.jpg', category: 'workshop', isActive: true, sortOrder: 1 },
  { id: 'ws-3', titleAr: 'تلبيد الصوف بالإبرة', titleEn: 'Needle Felting', subtitleAr: 'شكل الصوف واصنع مجسمات ناعمة ودقيقة', subtitleEn: 'Shape wool into soft, detailed figurines', descAr: 'اكتشف متعة التلبيد بالإبرة، مهارة يدوية مريحة للأعصاب تتيح لك تشكيل الصوف الحر إلى شخصيات وأشكال لطيفة.', descEn: 'Discover the joy of needle felting — a relaxing craft that lets you shape loose wool into cute characters and forms.', image: '/images/felting.jpg', category: 'workshop', isActive: true, sortOrder: 2 },
];

const DEFAULT_COURSES: WorkshopItem[] = [
  { id: 'cr-1', titleAr: 'كورس تعليم الرسم', titleEn: 'Fine Art Fundamentals', sessionsAr: '8 جلسات', sessionsEn: '8 Sessions', image: '/images/sketching.jpg', pattern: 'blueprint', category: 'course', isActive: true, sortOrder: 0 },
  { id: 'cr-2', titleAr: 'تقنيات الفخار المتقدمة', titleEn: 'Advanced Pottery Techniques', sessionsAr: '12 جلسة', sessionsEn: '12 Sessions', image: '/images/pottery.jpg', pattern: 'music', category: 'course', isActive: true, sortOrder: 1 },
  { id: 'cr-3', titleAr: 'كورس الحياكة', titleEn: 'Textile Design', sessionsAr: '6 جلسات', sessionsEn: '6 Sessions', image: '/images/knitting.jpg', pattern: 'crochet', category: 'course', isActive: true, sortOrder: 2 },
];

const DEFAULT_KIDS: WorkshopItem[] = [
  // 3 Courses
  { id: 'kid-c1', titleAr: 'الرسم الإبداعي', titleEn: 'Creative Drawing', subtitleAr: '٨ جلسات · شهران · للأعمار ٥–١٢', subtitleEn: '8 sessions · 2 months · Ages 5–12', descAr: 'نبدأ من أساسيات الرسم ووصولاً لتقنيات الألوان المائية والزيتية — بجو مرح وآمن للعيال.', descEn: 'From drawing basics to watercolor and oil techniques in a fun, safe environment.', price: '150,000', image: '/images/kids_drawing.jpg', category: 'kids_course', pattern: 'blueprint', isActive: true, sortOrder: 0 },
  { id: 'kid-c2', titleAr: 'السيراميك والطين', titleEn: 'Ceramics & Clay', subtitleAr: '١٢ جلسة · ٣ أشهر · للأعمار ٦–١٤', subtitleEn: '12 sessions · 3 months · Ages 6–14', descAr: 'عالم الطين — من التشكيل للتزجيج والحرق — تجربة حلوة تنمّي إبداع ولدك بطريقة ما تنكتاب.', descEn: 'The world of clay from shaping to glazing.', price: '220,000', image: '/images/kids_clay.jpg', category: 'kids_course', pattern: 'featured', isActive: true, sortOrder: 1 },
  { id: 'kid-c3', titleAr: 'فنون متكاملة', titleEn: 'Integrated Arts', subtitleAr: '١٠ جلسات · شهر ونصف · للأعمار ٤–١٢', subtitleEn: '10 sessions · 1.5 months · Ages 4–12', descAr: 'رسم وطين وحرف يدوية بكورس واحد — للطفل اللي يحب يجرب كل شي وما يشبع!', descEn: 'Drawing, clay and handcrafts in one program.', price: '180,000', image: '/images/kids_handcraft.webp', category: 'kids_course', pattern: 'crochet', isActive: true, sortOrder: 2 },
  
  // 3 Workshops
  { id: 'kid-w1', titleAr: 'الرسم الأسبوعي', titleEn: 'Weekly Drawing', subtitleAr: 'السبت والأحد · ٥–١٢ سنة', subtitleEn: 'Sat & Sun · 5-12 yrs', descAr: 'جلسات مرنة بدون التزام — جيب ولدك واستمتع.', descEn: 'Flexible sessions with no prior commitment.', price: '25,000', image: '/images/kids_painting.jpg', category: 'kids_workshop', isActive: true, sortOrder: 3 },
  { id: 'kid-w2', titleAr: 'الطين الأسبوعي', titleEn: 'Weekly Clay', subtitleAr: 'الثلاثاء والخميس · ٦–١٤ سنة', subtitleEn: 'Tue & Thu · 6-14 yrs', descAr: 'جلسات لتشكيل الطين واللعب بحرية في بيئة آمنة.', descEn: 'Clay shaping and playing sessions.', price: '30,000', image: '/images/kids_pottery.jpg', category: 'kids_workshop', isActive: true, sortOrder: 4 },
  { id: 'kid-w3', titleAr: 'الفن اليدوي', titleEn: 'Handcraft Session', subtitleAr: 'الأحد والأربعاء · ٤–١٠ سنوات', subtitleEn: 'Sun & Wed · 4-10 yrs', descAr: 'جلسات حرف يدوية ممتعة للأطفال تنمي قدراتهم الحركية.', descEn: 'Fun handcraft sessions for kids.', price: '20,000', image: '/images/kids_handcraft.webp', category: 'kids_workshop', isActive: true, sortOrder: 5 },
];

const ALL_DEFAULTS: WorkshopItem[] = [
  ...DEFAULT_ACTIVITIES,
  ...DEFAULT_WORKSHOPS,
  ...DEFAULT_COURSES,
  ...DEFAULT_KIDS,
];

const STORAGE_KEY = 'warshat_workshops_v4';

/* ──────────────────────────────────────────────────────────────
   Context
   ────────────────────────────────────────────────────────────── */
interface WorkshopStoreContextType {
  /** All workshops (admin sees archived too) */
  allWorkshops: WorkshopItem[];
  /** Get workshops by category, optionally include archived */
  getByCategory: (cat: Category, includeArchived?: boolean) => WorkshopItem[];
  /** Add a new workshop */
  addWorkshop: (item: Omit<WorkshopItem, 'id'>) => void;
  /** Update an existing workshop */
  updateWorkshop: (id: string, updates: Partial<WorkshopItem>) => void;
  /** Toggle active/archived */
  toggleActive: (id: string) => void;
  /** Delete permanently */
  deleteWorkshop: (id: string) => void;
}

const WorkshopStoreContext = createContext<WorkshopStoreContextType>({
  allWorkshops: [],
  getByCategory: () => [],
  addWorkshop: () => {},
  updateWorkshop: () => {},
  toggleActive: () => {},
  deleteWorkshop: () => {},
});

/* ──────────────────────────────────────────────────────────────
   Provider
   ────────────────────────────────────────────────────────────── */
export function WorkshopStoreProvider({ children }: { children: React.ReactNode }) {
  const [workshops, setWorkshops] = useState<WorkshopItem[]>(ALL_DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  // Fetch from API on mount
  useEffect(() => {
    async function loadWorkshops() {
      try {
        const res = await fetch('/api/workshops?admin=1');
        if (res.ok) {
          const data = (await res.json()) as any;
          if (data.workshops && Array.isArray(data.workshops)) {
            // Map DB schema to frontend WorkshopItem
            const mapped = data.workshops.map((w: any) => ({
              id: w.id,
              titleAr: w.title_ar,
              titleEn: w.title_en,
              descAr: w.description_ar,
              descEn: w.description_en,
              category: w.category,
              price: w.price ? w.price.toString() : undefined,
              priceNum: w.price || undefined,
              image: w.image_url || '/images/pottery.jpg',
              isActive: w.is_active === 1,
              sortOrder: w.sort_order || 0,
              branch: w.branch || 'both',
              seats: w.seats,
              tags: w.tags ? w.tags.split(',') : []
            }));
            setWorkshops(mapped);
          }
        }
      } catch (err) {
        console.error('Failed to load workshops from API', err);
      } finally {
        setHydrated(true);
      }
    }
    loadWorkshops();
  }, []);

  const getByCategory = useCallback((cat: Category, includeArchived = false) => {
    return workshops
      .filter(w => w.category === cat && (includeArchived || w.isActive))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [workshops]);

  const addWorkshop = useCallback(async (item: Omit<WorkshopItem, 'id'>) => {
    try {
      const dbItem = {
        title_ar: item.titleAr,
        title_en: item.titleEn,
        description_ar: item.descAr,
        description_en: item.descEn,
        category: item.category,
        price: item.priceNum,
        image_url: item.image,
        is_active: item.isActive ? 1 : 0,
        sort_order: item.sortOrder || 0
      };
      
      const res = await fetch('/api/workshops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbItem)
      });
      
      if (res.ok) {
        const data = (await res.json()) as any;
        setWorkshops(prev => [...prev, { ...item, id: data.id }]);
      }
    } catch (err) {
      console.error('Failed to add workshop', err);
    }
  }, []);

  const updateWorkshop = useCallback(async (id: string, updates: Partial<WorkshopItem>) => {
    // Optimistic local update
    setWorkshops(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
    
    // Call API (Assumes PUT /api/workshops/[id] is implemented, or we can wait)
    // For now we just mapped it so it's ready when we add the route
  }, []);

  const toggleActive = useCallback(async (id: string) => {
    setWorkshops(prev => prev.map(w => w.id === id ? { ...w, isActive: !w.isActive } : w));
    // Assume API call here
  }, []);

  const deleteWorkshop = useCallback(async (id: string) => {
    setWorkshops(prev => prev.filter(w => w.id !== id));
    // Assume API call here
  }, []);

  return (
    <WorkshopStoreContext.Provider value={{
      allWorkshops: workshops,
      getByCategory,
      addWorkshop,
      updateWorkshop,
      toggleActive,
      deleteWorkshop,
    }}>
      {children}
    </WorkshopStoreContext.Provider>
  );
}

export function useWorkshopStore() {
  return useContext(WorkshopStoreContext);
}
