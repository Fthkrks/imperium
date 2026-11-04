import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { getAllSiteData, getSiteData } from '@/lib/redis-fetch';
import { SiteDataProvider } from '@/components/SiteDataContext';
import { BUSINESS, SITE_URL, normalizeContact } from '@/lib/business';

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
      metadataBase: new URL(SITE_URL),
      openGraph: { siteName: BUSINESS.name, type: "website", url: SITE_URL, images: ["/logo.png"] },
      title: metadataJson.title || "Imperium Appliance Repair",
      description: metadataJson.description || "Professional appliance repair services.",
      keywords: metadataJson.keywords || "",
      icons: {
        icon: "/favicon.ico",
      },
    };
  } catch {
    return {
      title: "Imperium Appliance Repair",
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
    contact: normalizeContact(null),
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

  // Client components do not need article bodies or location details, so keep pages light.
  const clientData = {
    ...siteData,
    locations: {},
    blog: ((siteData.blog ?? []) as Array<Record<string, unknown>>).map((post) => ({ ...post, content: "" })),
    brands: Object.fromEntries(
      Object.entries((siteData.brands ?? {}) as Record<string, { title?: string; premium?: boolean }>).map(([slug, brand]) => [
        slug,
        { title: brand?.title, premium: brand?.premium },
      ]),
    ),
  };

  const contact = siteData.contact as { phone?: string; email?: string };
  const locations = (siteData.locations ?? {}) as Record<string, { name?: string }>;
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    address: { "@type": "PostalAddress", addressLocality: "Houston", addressRegion: "TX", addressCountry: "US" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "17:00" },
    ],
    name: BUSINESS.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    telephone: contact.phone || BUSINESS.phone,
    email: contact.email || BUSINESS.email,
    areaServed: Object.values(locations)
      .map((location) => location?.name)
      .filter(Boolean)
      .map((name) => ({ "@type": "City", name: `${name}, TX` })),
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="/legacy/assets/fonts.css" />
        <link rel="stylesheet" href="/legacy/assets/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/legacy/assets/aos.css" />
        <link rel="stylesheet" href="/legacy/assets/styles.css" />
        <link rel="stylesheet" href="/legacy/assets/refrigerator.css" />
        <link rel="stylesheet" href="/legacy/assets/brand.css" />
        <link rel="stylesheet" href="/legacy/assets/location.css" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema).replace(/</g, "\\u003c") }}
        />
        <SiteDataProvider data={clientData}>
          {children}
          <Script src="/legacy/assets/swiper-bundle.min.js" strategy="afterInteractive" />
          <Script src="/legacy/assets/aos.js" strategy="afterInteractive" />
          <Script src="/legacy/assets/script.js" strategy="afterInteractive" />
        </SiteDataProvider>
      </body>
    </html>
  );
}
