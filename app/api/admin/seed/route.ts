import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

const ALLOWED_FILES = [
  'contact.json',
  'blog.json',
  'services-residential.json',
  'services-commercial.json',
  'testimonials.json',
  'why.json',
  'areas.json',
  'locations.json',
  'faq.json',
  'brands.json',
  'metadata.json',
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (secret !== process.env.ADMIN_SEED_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!redisUrl || !redisToken) {
      return NextResponse.json({ error: 'Upstash Redis variables are not set.' }, { status: 500 });
    }

    const redis = new Redis({ url: redisUrl, token: redisToken });
    const seededFiles = [];

    for (const file of ALLOWED_FILES) {
      try {
        const filePath = path.join(process.cwd(), 'data', file);
        const content = await fs.readFile(filePath, 'utf8');
        await redis.set(`data:${file}`, content);
        seededFiles.push(file);
      } catch (e) {
        console.error(`Failed to seed ${file}:`, e);
      }
    }

    return NextResponse.json({ success: true, seededFiles });
  } catch (error) {
    console.error('Seed Error:', error);
    return NextResponse.json({ error: 'Failed to complete seeding', details: String(error) }, { status: 500 });
  }
}
