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
};

type ContactData = {
  phone?: string;
  phoneHref?: string;
};



type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getServiceDetailsMap(): Promise<Record<string, DetailEntry>> {
  const data = await getSiteData("service-details.json");
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {};
  }
  return data as Record<string, DetailEntry>;
}

export async function generateStaticParams() {
  const serviceDetails = await getServiceDetailsMap();
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const serviceDetails = await getServiceDetailsMap();
  const { slug } = await params;
  const detail = serviceDetails[slug];

  if (!detail) {
    return {
      title: "Service Not Found - mperium Appliance",
      description: "Requested service could not be found.",
    };
  }

  return {
    title: detail.title,
    description: detail.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const serviceDetails = await getServiceDetailsMap();
  const { slug } = await params;
  const detail = serviceDetails[slug];
  const rawContact = await getSiteData("contact.json");
  const contactData: ContactData =
    rawContact && typeof rawContact === "object" && !Array.isArray(rawContact)
      ? (rawContact as ContactData)
      : {};
  

  if (!detail) notFound();

  const serviceName = detail.title
    .replace(" - mperium Appliance", "")
    .replace(" Services", "")
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
                {serviceName}
                <span className="text-orange"> Service</span>
              </h1>
              <p className="detail-hero-description">{detail.description}</p>
              <div className="detail-hero-actions">
                <a className="dhero-btn-primary hover:bg-[#11528E]! open-form-trigger" href="#">
                  Book Repair
                </a>
                <a className="dhero-btn-secondary" href={`tel:${contactData?.phoneHref}`}>
                  Call {contactData?.phone}
                </a>
              </div>
            </div>
            <div className="detail-hero-visual">
              <div className="dhero-image-frame">
                <img
                  alt={`${serviceName} technician`}
                  className="dhero-photo"
                  src="/legacy/assets/rafixhero3.png"
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
      <TrustLogos/>
      <div className="container">
        <Resential/>
      <Commercial/>
      </div>

      <Brands/>
      <Contact/>
    </SiteShell>
  );
}
