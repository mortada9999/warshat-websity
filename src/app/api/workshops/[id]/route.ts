import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getWorkshopById, updateWorkshop, deactivateWorkshop } from '@/lib/db';
import { isAuthorized, unauthorizedResponse } from '@/lib/auth';

export const runtime = 'edge';

const updateSchema = z.object({
  title_ar:       z.string().min(1).max(200).optional(),
  title_en:       z.string().min(1).max(200).optional(),
  description_ar: z.string().max(2000).nullable().optional(),
  description_en: z.string().max(2000).nullable().optional(),
  category:       z.enum(['open_activity', 'workshop', 'kids', 'course']).optional(),
  price:          z.number().int().nonnegative().nullable().optional(),
  image_url:      z.string().url().nullable().optional(),
  is_active:      z.literal(0).or(z.literal(1)).optional(),
  tags:           z.string().max(500).nullable().optional(),
  seats:          z.number().int().positive().nullable().optional(),
  branch:         z.enum(['zayouna', 'yarmouk', 'both']).nullable().optional(),
  sort_order:     z.number().int().optional(),
});

// GET /api/workshops/[id] — public
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const workshop = await getWorkshopById(id);
    if (!workshop) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ workshop });
  } catch (err) {
    console.error('[GET /api/workshops/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/workshops/[id] — admin only
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) return unauthorizedResponse();

  try {
    const { id } = await params;
    const existing = await getWorkshopById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await updateWorkshop(id, parsed.data);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[PATCH /api/workshops/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/workshops/[id] — admin only, soft-delete
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) return unauthorizedResponse();

  try {
    const { id } = await params;
    const existing = await getWorkshopById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await deactivateWorkshop(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/workshops/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
