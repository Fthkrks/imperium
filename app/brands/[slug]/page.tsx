import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { getSiteData } from "@/lib/redis-fetch";
import TrustLogos from "@/components/Home/TrusthLogo";
import Brands from "@/components/Home/Brands";
import Resential from "@/components/Services/Resential";
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
  return Object.keys(brandDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const brandDetails = await getBrandDetailsMap();
  const { slug } = await params;
  const detail = brandDetails[slug];

  if (!detail) {
    return {
      title: "Brand Not Found - mperium Appliance",
      description: "Requested brand could not be found.",
    };
  }

  return {
    title: detail.title,
    description: detail.description,
  };
}

export default async function BrandDetailPage({ params }: PageProps) {
    const rawContact = await getSiteData("contact.json");
        const contactData: ContactData =
      rawContact && typeof rawContact === "object" && !Array.isArray(rawContact)
        ? (rawContact as ContactData)
        : {};
  const brandDetails = await getBrandDetailsMap();
  const { slug } = await params;
  const detail = brandDetails[slug];

  if (!detail) notFound();

  const brandName = detail.title
    .replace(" Appliance Repair - mperium Appliance", "")
    .replace(" - mperium Appliance", "")
    .trim();

  return (
    <SiteShell>
      <section className="detail-hero">
        <div className="detail-hero-bg-pattern" />
        <div className="detail-hero-glow detail-hero-glow-1" />
        <div className="detail-hero-glow detail-hero-glow-2" />
        <div className="container detail-hero-content">
          <div className="detail-hero-grid">
            <div className="detail-hero-text">
              <h1>
                {brandName}
                <span className="text-orange"> Service</span>
              </h1>
              <p className="detail-hero-description">{detail.description}</p>
              <div className="detail-hero-actions">
                <a className="dhero-btn-primary hover:bg-[#11528E]! open-form-trigger" href="#">
                  Schedule Repair
                </a>
                <a className="dhero-btn-secondary" href={`tel:${contactData?.phoneHref}`}>
                  Call {contactData?.phone}
                </a>
              </div>
            </div>
            <div className="detail-hero-visual">
              <div className="dhero-image-frame">
                <img
                  alt={`${brandName} technician`}
                  className="dhero-photo"
                  src={detail.image || "/default-brand.jpg"}
                />
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
                <span className="dhero-stat-number">90 Days</span>
                <span className="dhero-stat-label">Warranty</span>
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
      <TrustLogos />
      <div className="container">
        <Resential />
        <Commercial />
      </div>

      <Brands />
      <Contact />
    </SiteShell>
  );
}
