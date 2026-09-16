import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { listWorkshops, listAllWorkshopsAdmin, createWorkshop } from '@/lib/db';
import { isAuthorized, unauthorizedResponse } from '@/lib/auth';
import type { WorkshopFilters } from '@/lib/types';

export const runtime = 'edge';

const CATEGORY_VALUES = ['open_activity', 'workshop', 'kids_course', 'kids_workshop', 'course'] as const;
const BRANCH_VALUES   = ['zayouna', 'yarmouk', 'both'] as const;

const createSchema = z.object({
  title_ar:       z.string().min(1).max(200),
  title_en:       z.string().min(1).max(200),
  description_ar: z.string().max(2000).nullable().optional(),
  description_en: z.string().max(2000).nullable().optional(),
  category:       z.enum(CATEGORY_VALUES),
  price:          z.number().int().nonnegative().nullable().optional(),
  image_url:      z.string().url().nullable().optional(),
  is_active:      z.literal(0).or(z.literal(1)).optional(),
  tags:           z.string().max(500).nullable().optional(),
  seats:          z.number().int().positive().nullable().optional(),
  branch:         z.enum(BRANCH_VALUES).nullable().optional(),
  sort_order:     z.number().int().optional(),
});

// GET /api/workshops — public: list active workshops
// GET /api/workshops?admin=1 — admin: list all workshops
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === '1';

    if (isAdmin) {
      if (!isAuthorized(req)) return unauthorizedResponse();
      const workshops = await listAllWorkshopsAdmin();
      return NextResponse.json({ workshops });
    }

    const filters: WorkshopFilters = {};
    const cat    = searchParams.get('category');
    const branch = searchParams.get('branch');

    if (cat && CATEGORY_VALUES.includes(cat as typeof CATEGORY_VALUES[number])) {
      filters.category = cat as typeof CATEGORY_VALUES[number];
    }
    if (branch && BRANCH_VALUES.includes(branch as typeof BRANCH_VALUES[number])) {
      filters.branch = branch as typeof BRANCH_VALUES[number];
    }

    const workshops = await listWorkshops(filters);
    return NextResponse.json({ workshops });
  } catch (err) {
    console.error('[GET /api/workshops]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/workshops — admin only: create workshop
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorizedResponse();

  try {
    const body = await req.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const id = uuidv4();

    await createWorkshop({
      id,
      title_ar:       data.title_ar,
      title_en:       data.title_en,
      description_ar: data.description_ar ?? null,
      description_en: data.description_en ?? null,
      category:       data.category,
      price:          data.price          ?? null,
      image_url:      data.image_url      ?? null,
      is_active:      data.is_active      ?? 1,
      tags:           data.tags           ?? null,
      seats:          data.seats          ?? null,
      branch:         data.branch         ?? null,
      sort_order:     data.sort_order     ?? 0,
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/workshops]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
