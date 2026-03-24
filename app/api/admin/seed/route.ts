import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (secret !== process.env.ADMIN_SEED_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({
      success: false,
      error: 'JSON seed endpoint is disabled. Run supabase/schema.sql in Supabase SQL Editor.',
    });
  } catch (error) {
    console.error('Seed Error:', error);
    return NextResponse.json({ error: 'Failed to complete seeding', details: String(error) }, { status: 500 });
  }
}
