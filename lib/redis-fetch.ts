import { isAllowedFile } from '@/lib/site-data-config';
import { isSupabaseConfigured } from '@/lib/supabase-client';
import { readSiteDataFromSupabase } from '@/lib/site-data-store';

export async function getSiteData(file: string) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Site data source is Supabase-only.');
  }

  if (!isAllowedFile(file)) {
    throw new Error(`Unsupported site data key: ${file}`);
  }

  try {
    const supabaseData = await readSiteDataFromSupabase(file);
    if (supabaseData !== null) {
      return supabaseData;
    }
    return null;
  } catch (error) {
    console.error(`Supabase read Error for ${file}:`, error);
    return null;
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
