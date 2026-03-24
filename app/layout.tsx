import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { getAllSiteData, getSiteData } from '@/lib/redis-fetch';
import { SiteDataProvider } from '@/components/SiteDataContext';

type SiteMetadata = {
  title?: string;
  description?: string;
  keywords?: string;
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const rawMetadata = await getSiteData('metadata.json');
    const metadataJson: SiteMetadata =
      rawMetadata && typeof rawMetadata === 'object' && !Array.isArray(rawMetadata)
        ? (rawMetadata as SiteMetadata)
        : {};

    return {
      title: metadataJson.title || "RAFIX Appliance Repair",
      description: metadataJson.description || "Professional appliance repair services.",
      keywords: metadataJson.keywords || "",
    };
  } catch {
    return {
      title: "RAFIX Appliance Repair",
      description: "Professional appliance repair services.",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let siteData: Record<string, unknown> = {
    contact: {},
    blog: [],
    servicesResidential: [],
    servicesCommercial: [],
    testimonials: [],
    why: {},
    areas: {},
    locations: {},
    faq: [],
    brands: {},
    metadata: {},
  };

  try {
    siteData = await getAllSiteData();
  } catch (error) {
    console.error('Failed to load site data from Supabase:', error);
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="/legacy/assets/css2" />
        <link rel="stylesheet" href="/legacy/assets/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/legacy/assets/aos.css" />
        <link rel="stylesheet" href="/legacy/assets/styles.css" />
        <link rel="stylesheet" href="/legacy/assets/refrigerator.css" />
        <link rel="stylesheet" href="/legacy/assets/brand.css" />
        <link rel="stylesheet" href="/legacy/assets/location.css" />
      </head>
      <body>
        <SiteDataProvider data={siteData}>
          {children}
          <Script src="/legacy/assets/swiper-bundle.min.js" strategy="afterInteractive" />
          <Script src="/legacy/assets/aos.js" strategy="afterInteractive" />
          <Script src="/legacy/assets/script.js" strategy="afterInteractive" />
        </SiteDataProvider>
      </body>
    </html>
  );
}
