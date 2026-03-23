import { promises as fs } from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

export async function getSiteData(file: string) {
  if (redis) {
    try {
      const cachedData = await redis.get(`data:${file}`);
      if (cachedData) {
        return typeof cachedData === 'string' ? JSON.parse(cachedData) : cachedData;
      }
    } catch (e) {
      console.error('Redis GET Error in fetching data:', e);
    }
  }

  try {
    const filePath = path.join(process.cwd(), 'data', file);
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.error(`Local file read Error for ${file}:`, e);
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
