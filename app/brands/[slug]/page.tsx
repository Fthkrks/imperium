import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { getSiteData } from "@/lib/redis-fetch";
import { BUSINESS } from "@/lib/business";
import { BRAND_ROUTES, BRANDS_WITHOUT_LOGO } from "@/lib/routes";
import Brands from "@/components/Home/Brands";
import Residential from "@/components/Services/Residential";
import Commercial from "@/components/Services/Commercial";
import Contact from "@/components/Home/Contact";

type DetailEntry = {
  title: string;
  description: string;
  image?: string;
  premium?: boolean;
};

type ContactData = {
  phone?: string;
  phoneHref?: string;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getBrandDetailsMap(): Promise<Record<string, DetailEntry>> {
    const rawContact = await getSiteData("contact.json");

  const data = await getSiteData("brands.json");
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {};
  }
  return data as Record<string, DetailEntry>;
}

export async function generateStaticParams() {
  const brandDetails = await getBrandDetailsMap();
  return [
    ...Object.keys(BRAND_ROUTES),
    ...Object.keys(brandDetails).filter((slug) => !/^\d+$/.test(slug)),
  ].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const brandDetails = await getBrandDetailsMap();
  const { slug } = await params;
  const detail = brandDetails[BRAND_ROUTES[slug] ?? slug];

  if (!detail) {
    return {
      title: "Brand Not Found - Imperium Appliance Repair",
      description: "Requested brand could not be found.",
    };
  }

  const brandName = getBrandName(detail.title);
  return {
    title: { absolute: `${BUSINESS.name} | ${brandName} Appliance Service in Houston, TX` },
    description: describeBrand(brandName),
    alternates: { canonical: `/brands/${slug}` },
  };
}

function getBrandName(title: string) {
  return title
    .replace(" Appliance Repair - Imperium Appliance Repair", "")
    .replace(" - Imperium Appliance Repair", "")
    .trim();
}

function describeBrand(brandName: string) {
  return `${BUSINESS.name} repairs ${brandName} appliances across the greater Houston area. Book online or call ${BUSINESS.phone} to schedule service.`;
}

export default async function BrandDetailPage({ params }: PageProps) {
    const rawContact = await getSiteData("contact.json");
        const contactData: ContactData =
      rawContact && typeof rawContact === "object" && !Array.isArray(rawContact)
        ? (rawContact as ContactData)
        : {};
  const brandDetails = await getBrandDetailsMap();
  const { slug } = await params;
  const detail = brandDetails[BRAND_ROUTES[slug] ?? slug];

  if (!detail) notFound();

  const brandName = getBrandName(detail.title);

  return (
    <SiteShell forceSolidHeader>
      <section className="detail-hero">
        <div className="detail-hero-bg-pattern" />
        <div className="detail-hero-glow detail-hero-glow-1" />
        <div className="detail-hero-glow detail-hero-glow-2" />
        <div className="container detail-hero-content">
          <div className="detail-hero-grid">
            <div className="detail-hero-text">
              <h1>
                We Repair {brandName}
                <span className="text-orange"> Appliances</span>
              </h1>
              <p className="detail-hero-description">{describeBrand(brandName)}</p>
              <div className="detail-hero-actions">
                <a className="dhero-btn-primary hover:bg-[#11528E]! open-form-trigger" href="#">
                  Schedule Repair
                </a>
                <a className="dhero-btn-secondary" href={contactData?.phoneHref}>
                  Call {contactData?.phone}
                </a>
              </div>
            </div>
            <div className="detail-hero-visual">
              <div className="dhero-image-frame">
                {BRANDS_WITHOUT_LOGO.includes(slug) || !detail.image ? (
                  <div className="dhero-brand-name">{brandName}</div>
                ) : (
                  <img alt={`${brandName} logo`} className="dhero-photo" src={detail.image} />
                )}
              </div>
            </div>
          </div>

          <div className="dhero-stats-bar">
            <div className="dhero-stat">
              <div>
                <span className="dhero-stat-number">Same Day</span>
                <span className="dhero-stat-label">Availability</span>
              </div>
            </div>
            <div className="dhero-stat-divider" />
            <div className="dhero-stat">
              <div>
                <span className="dhero-stat-number">90 / 30 Days</span>
                <span className="dhero-stat-label">Parts / Labor Warranty</span>
              </div>
            </div>
            <div className="dhero-stat-divider" />
            <div className="dhero-stat">
              <div>
                <span className="dhero-stat-number">Licensed</span>
                <span className="dhero-stat-label">Technicians</span>
              </div>
            </div>
            <div className="dhero-stat-divider" />
            <div className="dhero-stat">
              <div>
                <span className="dhero-stat-number">Transparent</span>
                <span className="dhero-stat-label">Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <Residential />
        <Commercial />
      </div>

      <Brands />
      <Contact />
    </SiteShell>
  );
}
