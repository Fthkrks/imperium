import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import brandDetailsJson from "@/data/brand-details.json";
import TrustLogos from "@/components/Home/TrusthLogo";
import Brands from "@/components/Home/Brands";
import Resential from "@/components/Services/Resential";
import Commercial from "@/components/Services/Commercial";
import Contact from "@/components/Home/Contact";

type DetailEntry = {
  title: string;
  description: string;
};

const brandDetails = brandDetailsJson as Record<string, DetailEntry>;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(brandDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = brandDetails[slug];

  if (!detail) {
    return {
      title: "Brand Not Found - RAFIX Appliance Repair",
      description: "Requested brand could not be found.",
    };
  }

  return {
    title: detail.title,
    description: detail.description,
  };
}

export default async function BrandDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = brandDetails[slug];

  if (!detail) notFound();

  const brandName = detail.title
    .replace(" Appliance Repair - RAFIX Appliance Repair", "")
    .replace(" - RAFIX Appliance Repair", "")
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
                <a className="dhero-btn-secondary" href="tel:+13477911731">
                  Call +1 (347) 791-1731
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
