export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  AllowedTable,
  getFileForTable,
  isAllowedTable,
} from '@/lib/site-data-config';
import { isSupabaseConfigured } from '@/lib/supabase-client';
import { readSiteDataFromSupabase, writeSiteDataToSupabase } from '@/lib/site-data-store';

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

async function readLocationsData(): Promise<Record<string, unknown>> {
  const locations = await readSiteDataFromSupabase('locations.json');
  if (locations && typeof locations === 'object' && !Array.isArray(locations)) {
    return locations as Record<string, unknown>;
  }
  return {};
}

async function writeLocationsData(locationsData: Record<string, unknown>): Promise<void> {
  await writeSiteDataToSupabase('locations.json', locationsData);
}

function parseTableParam(url: string): AllowedTable | null {
  const { searchParams } = new URL(url);
  const table = searchParams.get('table');
  if (!table || !isAllowedTable(table)) {
    return null;
  }
  return table;
}

export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
    }

    const table = parseTableParam(request.url);
    if (!table) {
      return NextResponse.json({ error: 'Invalid table requested' }, { status: 400 });
    }

    const file = getFileForTable(table);
    const supabaseData = await readSiteDataFromSupabase(file);

    if (supabaseData === null) {
      return NextResponse.json({ error: 'Table data not found' }, { status: 404 });
    }

    return NextResponse.json({ data: `${JSON.stringify(supabaseData, null, 2)}\n` });
  } catch (error) {
    console.error('GET Error in /api/admin/data:', error);
    return NextResponse.json({ error: 'Failed to read table data', details: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
    }

    const table = parseTableParam(request.url);
    if (!table) {
      return NextResponse.json({ error: 'Invalid table requested' }, { status: 400 });
    }

    const { content } = await request.json();
    if (typeof content !== 'string') {
      return NextResponse.json({ error: 'No content provided' }, { status: 400 });
    }

    let parsedContent: unknown;
    try {
      parsedContent = JSON.parse(content);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
    }

    const file = getFileForTable(table);
    await writeSiteDataToSupabase(file, parsedContent);

    let locationsAdded = 0;
    let locationsRemoved = 0;

    if (table === 'areas') {
      const locationsData = await readLocationsData();
      const areaNames = [...collectAreaNames(parsedContent)];
      const areaSlugs = new Set(areaNames.map((areaName) => slugifyAreaName(areaName)).filter(Boolean));

      for (const areaName of areaNames) {
        const slug = slugifyAreaName(areaName);
        if (!slug || locationsData[slug]) {
          continue;
        }

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
        await writeLocationsData(locationsData);
      }
    }

    try {
      revalidatePath('/admin');
      revalidatePath('/', 'layout');
    } catch (error) {
      console.error('Failed to revalidate path:', error);
    }

    return NextResponse.json({ success: true, locationsAdded, locationsRemoved });
  } catch (error) {
    console.error('POST Error in /api/admin/data:', error);
    return NextResponse.json({ error: 'Failed to save table data', details: String(error) }, { status: 500 });
  }
}
