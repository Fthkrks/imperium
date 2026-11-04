import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";
import { getSiteData } from "@/lib/redis-fetch";
import { BRAND_ROUTES, SERVICE_ROUTES } from "@/lib/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [brands, locations, blog] = await Promise.all([
    getSiteData("brands.json").catch(() => null),
    getSiteData("locations.json").catch(() => null),
    getSiteData("blog.json").catch(() => null),
  ]);

  const brandSlugs = Object.keys((brands as Record<string, unknown>) ?? {}).filter((slug) => !/^\d+$/.test(slug));
  const paths = [
    "/",
    "/services",
    "/blog",
    ...SERVICE_ROUTES.map(({ slug }) => `/services/${slug}`),
    ...Object.keys(BRAND_ROUTES).map((slug) => `/brands/${slug}`),
    ...brandSlugs.map((slug) => `/brands/${slug}`),
    ...Object.keys((locations as Record<string, unknown>) ?? {}).map((slug) => `/location/${slug}`),
    ...(((blog as Array<{ slug: string }>) ?? []).map(({ slug }) => `/blog/${slug}`)),
  ];

  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
