import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token')?.value;

  // If the user is trying to access /admin/login but is already authenticated, redirect to /admin
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // If the user is trying to access any other /admin route...
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
