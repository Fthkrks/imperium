import { isAllowedFile } from '@/lib/site-data-config';
import { isSupabaseConfigured } from '@/lib/supabase-client';
import { readSiteDataFromSupabase } from '@/lib/site-data-store';
import { normalizeContact } from '@/lib/business';
import { fixWarrantyCopy } from '@/lib/site-copy';
import { BLOG_ARTICLES } from '@/lib/seo-content';

export type Area = { slug: string; name: string };

// Stored posts shorter than this are the original short versions.
const SHORT_POST_LENGTH = 1500;

function withFullArticles(posts: unknown) {
  if (!Array.isArray(posts)) return posts;
  return posts.map((post) => {
    const article = BLOG_ARTICLES[post?.slug];
    return article && String(post?.content ?? '').length < SHORT_POST_LENGTH ? { ...post, content: article } : post;
  });
}

export async function getSiteData(file: string) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Site data source is Supabase-only.');
  }

  if (!isAllowedFile(file)) {
    throw new Error(`Unsupported site data key: ${file}`);
  }

  try {
    const supabaseData = await readSiteDataFromSupabase(file);
    if (file === 'contact.json') {
      return normalizeContact(supabaseData as Record<string, unknown> | null);
    }
    if (file === 'blog.json') {
      const posts = Array.isArray(supabaseData) ? supabaseData.filter((post) => post.status === 'publish') : [];
      return fixWarrantyCopy(withFullArticles(posts));
    }
    return fixWarrantyCopy(supabaseData);
  } catch (error) {
    console.error(`Supabase read Error for ${file}:`, error);
    return file === 'contact.json' ? normalizeContact(null) : null;
  }
}

export async function getAllSiteData() {
  const [
    contact, blog, servicesResidential, servicesCommercial, 
    testimonials, why, areas, locations, faq, brands, metadata
  ] = await Promise.all([
    getSiteData('contact.json'),
    getSiteData('blog.json'),
    getSiteData('services-residential.json'),
    getSiteData('services-commercial.json'),
    getSiteData('testimonials.json'),
    getSiteData('why.json'),
    getSiteData('areas.json'),
    getSiteData('locations.json'),
    getSiteData('faq.json'),
    getSiteData('brands.json'),
    getSiteData('metadata.json'),
  ]);

  return {
    contact: contact || {},
    blog: blog || [],
    servicesResidential: servicesResidential || [],
    servicesCommercial: servicesCommercial || [],
    testimonials: testimonials || [],
    why: why || {},
    areas: areas || {},
    locations: locations || {},
    faq: faq || [],
    brands: brands || {},
    metadata: metadata || {}
  };
}

export async function getServiceAreas(): Promise<Area[]> {
  const locations = (await getSiteData('locations.json')) as Record<string, { name?: string }> | null;
  return Object.entries(locations ?? {}).map(([slug, location]) => ({
    slug,
    name: slug === 'woodlands' ? 'The Woodlands' : location?.name || slug,
  }));
}
