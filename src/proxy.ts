import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** API routes that require auth */
const ADMIN_API_PATHS = ['/api/workshops'];

export default function proxy(req: NextRequest) {
  // Add HTTPS redirect for non-secure connections (handled by Cloudflare in production,
  // but explicit for any reverse-proxy setups)
  const proto = req.headers.get('x-forwarded-proto');
  if (proto && proto !== 'https' && process.env.NODE_ENV === 'production') {
    const url = req.nextUrl.clone();
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
