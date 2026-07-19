/**
 * Mock DB layer for v0 UI design phase
 */
import type { Workshop, WorkshopFilters } from './types';

export async function listWorkshops(filters: WorkshopFilters = {}): Promise<Workshop[]> {
  return [];
}

export async function listAllWorkshopsAdmin(): Promise<Workshop[]> {
  return [];
}

export async function getWorkshopById(id: string): Promise<Workshop | null> {
  return null;
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

export async function createWorkshop(input: CreateWorkshopInput): Promise<void> {}

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

export async function updateWorkshop(id: string, input: UpdateWorkshopInput): Promise<void> {}

export async function deactivateWorkshop(id: string): Promise<void> {}


