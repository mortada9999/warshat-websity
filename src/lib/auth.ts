import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextRequest } from 'next/server';

/**
 * Validates the Authorization: Bearer <ADMIN_SECRET> header.
 * ADMIN_SECRET is read from the Cloudflare env binding — never hard-coded.
 */
export function isAuthorized(req: NextRequest): boolean {
  try {
    const { env } = getRequestContext<CloudflareEnv>();
    const secret = env.ADMIN_SECRET;

    if (!secret) return false;

    const authHeader = req.headers.get('authorization') ?? '';
    if (!authHeader.startsWith('Bearer ')) return false;

    const token = authHeader.slice('Bearer '.length).trim();
    // Constant-time comparison to prevent timing attacks
    return timingSafeEqual(token, secret);
  } catch {
    return false;
  }
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function unauthorizedResponse(): Response {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}
