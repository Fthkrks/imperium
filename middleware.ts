import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE, isValidAdminSessionToken } from '@/lib/admin-auth';

export async function middleware(request: NextRequest) {
  const isAuthenticated = await isValidAdminSessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (pathname.startsWith('/api/admin/data') && !isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
