export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

// Allowed files for security
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

function slugifyAreaName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function collectAreaNames(value: unknown, names = new Set<string>()): Set<string> {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed) names.add(trimmed);
    return names;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectAreaNames(item, names));
    return names;
  }

  if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectAreaNames(item, names));
  }

  return names;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');

    if (!file || !ALLOWED_FILES.includes(file)) {
      return NextResponse.json({ error: 'Invalid file requested' }, { status: 400 });
    }

    let fileContents: string | null = null;
    if (redis) {
      try {
        const cachedData = await redis.get(`data:${file}`);
        if (cachedData) {
          fileContents = typeof cachedData === 'string' ? cachedData : JSON.stringify(cachedData);
        }
      } catch (e) {
        console.error('Redis GET Error:', e);
      }
    }

    if (!fileContents) {
      const filePath = path.join(process.cwd(), 'data', file);
      fileContents = await fs.readFile(filePath, 'utf8');
      
      if (redis && fileContents) {
        try { await redis.set(`data:${file}`, fileContents); } catch (e) {}
      }
    }

    return NextResponse.json({ data: fileContents });
  } catch (error) {
    console.error('GET Error in /api/admin/data:', error);
    return NextResponse.json({ error: 'File not found or unreadable', details: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');

    if (!file || !ALLOWED_FILES.includes(file)) {
      return NextResponse.json({ error: 'Invalid file requested' }, { status: 400 });
    }

    const { content } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'No content provided' }, { status: 400 });
    }

    // Verify it's valid JSON before saving
    let parsedContent: unknown;
    try {
      parsedContent = JSON.parse(content);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
    }

    if (redis) {
      await redis.set(`data:${file}`, content);
    } else {
      const filePath = path.join(process.cwd(), 'data', file);
      await fs.writeFile(filePath, content, 'utf8');
    }

    let locationsAdded = 0;
    let locationsRemoved = 0;

    if (file === 'areas.json') {
      let locationsData: Record<string, any> = {};
      try {
        let rawLocations: string | null = null;
        if (redis) {
          const cachedLocs = await redis.get('data:locations.json');
          if (cachedLocs) rawLocations = typeof cachedLocs === 'string' ? cachedLocs : JSON.stringify(cachedLocs);
        }
        
        if (!rawLocations) {
          const locationsPath = path.join(process.cwd(), 'data', 'locations.json');
          rawLocations = await fs.readFile(locationsPath, 'utf8');
        }
        
        if (rawLocations) {
          const parsedLocations = JSON.parse(rawLocations);
          if (parsedLocations && typeof parsedLocations === 'object' && !Array.isArray(parsedLocations)) {
            locationsData = parsedLocations;
          }
        }
      } catch {
        locationsData = {};
      }

      const areaNames = [...collectAreaNames(parsedContent)];
      const areaSlugs = new Set(areaNames.map((areaName) => slugifyAreaName(areaName)).filter(Boolean));

      for (const areaName of areaNames) {
        const slug = slugifyAreaName(areaName);
        if (!slug || locationsData[slug]) continue;

        locationsData[slug] = {
          name: areaName,
          slug,
          region: '',
          description: '',
          mapEmbedUrl: '',
          subAreas: [],
        };
        locationsAdded += 1;
      }

      for (const existingSlug of Object.keys(locationsData)) {
        if (!areaSlugs.has(existingSlug)) {
          delete locationsData[existingSlug];
          locationsRemoved += 1;
        }
      }

      if (locationsAdded > 0 || locationsRemoved > 0) {
        const newLocationsContent = `${JSON.stringify(locationsData, null, 2)}\n`;
        if (redis) {
          await redis.set('data:locations.json', newLocationsContent);
        } else {
          const locationsPath = path.join(process.cwd(), 'data', 'locations.json');
          await fs.writeFile(locationsPath, newLocationsContent, 'utf8');
        }
      }
    }

    // Clear cache so changes appear immediately on admin and main site
    try {
      revalidatePath('/admin');
      revalidatePath('/', 'layout');
    } catch (err) {
      console.error('Failed to revalidate path:', err);
    }

    return NextResponse.json({ success: true, locationsAdded, locationsRemoved });
  } catch (error) {
    console.error('POST Error in /api/admin/data:', error);
    return NextResponse.json({ error: 'Failed to save file', details: String(error) }, { status: 500 });
  }
}
