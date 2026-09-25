/**
 * Cloudflare D1 REST API Implementation for Vercel
 */
import type { Workshop, WorkshopFilters } from './types';

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;
const D1_TOKEN = process.env.CLOUDFLARE_D1_TOKEN;

async function queryD1(sql: string, params: any[] = []) {
  if (!ACCOUNT_ID || !DATABASE_ID || !D1_TOKEN) {
    console.warn('Missing Cloudflare D1 credentials in .env');
    return [];
  }

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${D1_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql, params }),
      next: { revalidate: 0 } // no cache for admin / dynamic data
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error('D1 Query Error:', text);
    throw new Error('D1 Query Failed');
  }

  const json = (await res.json()) as any;
  if (json.success && json.result?.[0]?.results) {
    return json.result[0].results;
  }
  return [];
}

export async function listWorkshops(filters: WorkshopFilters = {}): Promise<Workshop[]> {
  const results = await queryD1(`SELECT * FROM workshops WHERE is_active = 1 ORDER BY sort_order ASC, created_at DESC`);
  return results as Workshop[];
}

export async function listAllWorkshopsAdmin(): Promise<Workshop[]> {
  const results = await queryD1(`SELECT * FROM workshops ORDER BY sort_order ASC, created_at DESC`);
  return results as Workshop[];
}

export async function getWorkshopById(id: string): Promise<Workshop | null> {
  const results = await queryD1(`SELECT * FROM workshops WHERE id = ?`, [id]);
  return results.length > 0 ? (results[0] as Workshop) : null;
}

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
  sort_order?: number;
}

export async function createWorkshop(input: CreateWorkshopInput): Promise<void> {
  const sql = `
    INSERT INTO workshops (
      id, title_ar, title_en, description_ar, description_en,
      category, price, image_url, is_active, tags, seats, branch, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  await queryD1(sql, [
    input.id, input.title_ar, input.title_en, input.description_ar, input.description_en,
    input.category, input.price, input.image_url, input.is_active, input.tags, input.seats, input.branch, input.sort_order || 0
  ]);
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
  sort_order?: number;
}

export async function updateWorkshop(id: string, input: UpdateWorkshopInput): Promise<void> {
  const fields = [];
  const params = [];
  
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      params.push(value);
    }
  }
  
  if (fields.length === 0) return;
  
  params.push(id);
  const sql = `UPDATE workshops SET ${fields.join(', ')} WHERE id = ?`;
  await queryD1(sql, params);
}

export async function deactivateWorkshop(id: string): Promise<void> {
  await queryD1(`UPDATE workshops SET is_active = 0 WHERE id = ?`, [id]);
}
