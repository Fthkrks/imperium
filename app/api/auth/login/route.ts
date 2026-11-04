import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
  isAdminPasswordConfigured,
  isValidAdminPassword,
} from '@/lib/admin-auth';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    if (!isAdminPasswordConfigured()) {
      console.error('ADMIN_PASSWORD is not configured; admin login is disabled.');
      return NextResponse.json(
        { success: false, error: 'Admin login is not configured.' },
        { status: 503 }
      );
    }

    if (isRateLimited(`login:${getClientIp(request)}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const { password } = await request.json();

    if (await isValidAdminPassword(password)) {
      const response = NextResponse.json({ success: true });

      response.cookies.set(ADMIN_COOKIE, await createAdminSessionToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: SESSION_MAX_AGE_SECONDS,
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
