import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Allowed files for security
const ALLOWED_FILES = [
  'contact.json',
  'services-residential.json',
  'services-commercial.json',
  'testimonials.json',
  'why.json',
  'areas.json',
  'faq.json',
  'brand-details.json',
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');

    if (!file || !ALLOWED_FILES.includes(file)) {
      return NextResponse.json({ error: 'Invalid file requested' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'data', file);
    const fileContents = await fs.readFile(filePath, 'utf8');

    return NextResponse.json({ data: fileContents });
  } catch (error) {
    return NextResponse.json({ error: 'File not found or unreadable' }, { status: 500 });
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
    try {
      JSON.parse(content);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'data', file);
    await fs.writeFile(filePath, content, 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
  }
}
