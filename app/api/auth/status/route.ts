import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, isValidAdminSessionToken } from '@/lib/admin-auth';

export async function GET() {
  const cookieStore = await cookies();
  const authenticated = await isValidAdminSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);

  return NextResponse.json({ authenticated });
}
