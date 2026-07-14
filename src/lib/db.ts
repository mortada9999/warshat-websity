/**
 * DB layer — ALL queries use prepared statements with bound parameters.
 * String concatenation with user input is strictly forbidden.
 */
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Workshop, WorkshopFilters } from './types';

function getDB(): D1Database {
  const { env } = getRequestContext<CloudflareEnv>();
  return env.DB;
}

// ---------------------------------------------------------------------------
// READ — fully static SQL strings, values bound via .bind()
// ---------------------------------------------------------------------------

/** Return all active workshops, optionally filtered by category and/or branch */
export async function listWorkshops(filters: WorkshopFilters = {}): Promise<Workshop[]> {
  const db = getDB();
  const { category, branch } = filters;

  // Four fully-static prepared statements — no string interpolation of inputs
  if (category && branch) {
    const result = await db
      .prepare(
        "SELECT * FROM workshops WHERE is_active = 1 AND category = ? AND (branch = ? OR branch = 'both') ORDER BY created_at DESC"
      )
      .bind(category, branch)
      .all<Workshop>();
    return result.results;
  }

  if (category) {
    const result = await db
      .prepare('SELECT * FROM workshops WHERE is_active = 1 AND category = ? ORDER BY created_at DESC')
      .bind(category)
      .all<Workshop>();
    return result.results;
  }

  if (branch) {
    const result = await db
      .prepare(
        "SELECT * FROM workshops WHERE is_active = 1 AND (branch = ? OR branch = 'both') ORDER BY created_at DESC"
      )
      .bind(branch)
      .all<Workshop>();
    return result.results;
  }

  const result = await db
    .prepare('SELECT * FROM workshops WHERE is_active = 1 ORDER BY created_at DESC')
    .all<Workshop>();
  return result.results;
}

/** Return all workshops (including inactive) for admin panel */
export async function listAllWorkshopsAdmin(): Promise<Workshop[]> {
  const db = getDB();
  const result = await db
    .prepare('SELECT * FROM workshops ORDER BY created_at DESC')
    .all<Workshop>();
  return result.results;
}

/** Return a single workshop by ID */
export async function getWorkshopById(id: string): Promise<Workshop | null> {
  const db = getDB();
  const result = await db
    .prepare('SELECT * FROM workshops WHERE id = ?')
    .bind(id)
    .first<Workshop>();
  return result ?? null;
}

// ---------------------------------------------------------------------------
// WRITE
// ---------------------------------------------------------------------------

export interface CreateWorkshopInput {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string | null;
  description_en: string | null;
  category: string;
  price: number | null;
  image_url: string | null;
  is_active: number;
  tags: string | null;
  seats: number | null;
  branch: string | null;
}

export async function createWorkshop(input: CreateWorkshopInput): Promise<void> {
  const db = getDB();
  await db
    .prepare(
      `INSERT INTO workshops
         (id, title_ar, title_en, description_ar, description_en,
          category, price, image_url, is_active, tags, seats, branch)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      input.id,
      input.title_ar,
      input.title_en,
      input.description_ar,
      input.description_en,
      input.category,
      input.price,
      input.image_url,
      input.is_active,
      input.tags,
      input.seats,
      input.branch
    )
    .run();
}

export interface UpdateWorkshopInput {
  title_ar?: string;
  title_en?: string;
  description_ar?: string | null;
  description_en?: string | null;
  category?: string;
  price?: number | null;
  image_url?: string | null;
  is_active?: number;
  tags?: string | null;
  seats?: number | null;
  branch?: string | null;
}

export async function updateWorkshop(id: string, input: UpdateWorkshopInput): Promise<void> {
  const db = getDB();
  // Static query — every column always updated. Unused fields keep their old value
  // by using COALESCE(?, column). This avoids building dynamic SQL.
  await db
    .prepare(
      `UPDATE workshops SET
         title_ar       = COALESCE(?, title_ar),
         title_en       = COALESCE(?, title_en),
         description_ar = ?,
         description_en = ?,
         category       = COALESCE(?, category),
         price          = ?,
         image_url      = ?,
         is_active      = COALESCE(?, is_active),
         tags           = ?,
         seats          = ?,
         branch         = ?
       WHERE id = ?`
    )
    .bind(
      input.title_ar    ?? null,
      input.title_en    ?? null,
      input.description_ar !== undefined ? input.description_ar : null,
      input.description_en !== undefined ? input.description_en : null,
      input.category    ?? null,
      input.price       !== undefined ? input.price   : null,
      input.image_url   !== undefined ? input.image_url : null,
      input.is_active   ?? null,
      input.tags        !== undefined ? input.tags    : null,
      input.seats       !== undefined ? input.seats   : null,
      input.branch      !== undefined ? input.branch  : null,
      id
    )
    .run();
}

/** Soft-delete: marks is_active = 0 */
export async function deactivateWorkshop(id: string): Promise<void> {
  const db = getDB();
  await db
    .prepare('UPDATE workshops SET is_active = 0 WHERE id = ?')
    .bind(id)
    .run();
}
