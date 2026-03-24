import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { getSiteData } from "@/lib/redis-fetch";
import TrustLogos from "@/components/Home/TrusthLogo";
import Contact from "@/components/Home/Contact";

type LocationEntry = {
  name: string;
  slug: string;
  region: string;
  description: string;
  mapEmbedUrl: string;
  subAreas: string[];
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getLocationsMap(): Promise<Record<string, LocationEntry>> {
  const data = await getSiteData("locations.json");
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {};
  }
  return data as Record<string, LocationEntry>;
}

export async function generateStaticParams() {
  const locations = await getLocationsMap();
  return Object.keys(locations).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locations = await getLocationsMap();
  const { slug } = await params;
  const location = locations[slug];

  if (!location) {
    return {
      title: "Location Not Found - RAFIX Appliance Repair",
      description: "Requested location could not be found.",
    };
  }

  return {
    title: `Appliance Repair in ${location.name}, TX - RAFIX Appliance Repair`,
    description: location.description,
  };
}

export default async function LocationDetailPage({ params }: PageProps) {
  const locations = await getLocationsMap();
  const { slug } = await params;
  const location = locations[slug];

  if (!location) notFound();

  const hasMapEmbed = Boolean(location.mapEmbedUrl?.trim());

  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="loc-hero">
        <div className="loc-hero-bg-pattern" />
        <div className="loc-hero-glow loc-hero-glow-1" />
        <div className="loc-hero-glow loc-hero-glow-2" />
        <div className="container loc-hero-content">
          <div className="loc-hero-text">
            <span className="loc-hero-label">
              <svg fill="none" height={16} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx={12} cy={10} r={3} />
              </svg>
              Service Area — {location.region}
            </span>
            <h1>
              Appliance Repair Service in{" "}
              <span className="loc-hero-highlight">{location.name}, TX</span>
            </h1>
            <p className="loc-hero-description">{location.description}</p>
            <div className="loc-hero-actions">
              <a className="loc-btn-primary open-form-trigger" href="#">
                <svg fill="none" height={18} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={18} xmlns="http://www.w3.org/2000/svg">
                  <rect height={18} rx={2} ry={2} width={18} x={3} y={4} />
                  <line x1={16} x2={16} y1={2} y2={6} />
                  <line x1={8} x2={8} y1={2} y2={6} />
                  <line x1={3} x2={21} y1={10} y2={10} />
                </svg>
                Schedule Repair
              </a>
              <a className="loc-btn-secondary" href="tel:+13477911731">
                <svg fill="none" height={18} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={18} xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call (347) 791-1731
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map + Service Areas Section */}
      <section className="loc-map-section">
        <div className="loc-map-container">
          {hasMapEmbed ? (
            <iframe
              allowFullScreen
              className="loc-map-iframe"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={location.mapEmbedUrl}
              title={`Map of ${location.name}, TX service area`}
            />
          ) : (
            <div className="loc-map-iframe" aria-live="polite" style={{ display: "grid", placeItems: "center", color: "#64748b", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              Map will appear here after adding a Google Maps embed URL in admin.
            </div>
          )}
          <div className="loc-areas-card">
            <div className="loc-areas-card-header">
              <svg fill="none" height={24} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx={12} cy={10} r={3} />
              </svg>
              <h2>Service Areas in {location.name}</h2>
            </div>
            <div className="loc-sub-areas-grid">
              {location.subAreas.map((area) => (
                <div className="loc-sub-area" key={area}>
                  <svg fill="none" height={16} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>{area}</span>
                </div>
              ))}
            </div>
            <div className="loc-areas-note">
              <svg fill="none" height={18} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={18} xmlns="http://www.w3.org/2000/svg">
                <circle cx={12} cy={12} r={10} />
                <line x1={12} x2={12} y1={16} y2={12} />
                <line x1={12} x2={12.01} y1={8} y2={8} />
              </svg>
              <span>Don&apos;t see your area? Call us! We serve many surrounding communities.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="loc-stats">
        <div className="container">
          <div className="loc-stats-bar">
            <div className="loc-stat">
              <svg fill="none" height={28} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" width={28} xmlns="http://www.w3.org/2000/svg">
                <circle cx={12} cy={12} r={10} />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <div>
                <span className="loc-stat-number">Same Day</span>
                <span className="loc-stat-label">Availability</span>
              </div>
            </div>
            <div className="loc-stat-divider" />
            <div className="loc-stat">
              <svg fill="none" height={28} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" width={28} xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div>
                <span className="loc-stat-number">90 Days</span>
                <span className="loc-stat-label">Warranty</span>
              </div>
            </div>
            <div className="loc-stat-divider" />
            <div className="loc-stat">
              <svg fill="none" height={28} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" width={28} xmlns="http://www.w3.org/2000/svg">
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx={8.5} cy={7} r={4} />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <div>
                <span className="loc-stat-number">Licensed</span>
                <span className="loc-stat-label">Technicians</span>
              </div>
            </div>
            <div className="loc-stat-divider" />
            <div className="loc-stat">
              <svg fill="none" height={28} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" width={28} xmlns="http://www.w3.org/2000/svg">
                <line x1={12} x2={12} y1={1} y2={23} />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
              <div>
                <span className="loc-stat-number">Transparent</span>
                <span className="loc-stat-label">Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for this Location */}
      <section className="loc-why">
        <div className="container">
          <div className="loc-why-grid">
            <div className="loc-why-card">
              <div className="loc-why-icon">
                <svg fill="none" height={32} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" width={32} xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Local Expertise</h3>
              <p>Our technicians know {location.name} inside and out, ensuring fast arrival times and familiarity with common appliance issues in your area.</p>
            </div>
            <div className="loc-why-card">
              <div className="loc-why-icon">
                <svg fill="none" height={32} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" width={32} xmlns="http://www.w3.org/2000/svg">
                  <rect height={18} rx={2} ry={2} width={18} x={3} y={4} />
                  <line x1={16} x2={16} y1={2} y2={6} />
                  <line x1={8} x2={8} y1={2} y2={6} />
                  <line x1={3} x2={21} y1={10} y2={10} />
                </svg>
              </div>
              <h3>Same-Day Service</h3>
              <p>We understand appliance breakdowns can&apos;t wait. That&apos;s why we offer same-day and next-day appointments in {location.name}.</p>
            </div>
            <div className="loc-why-card">
              <div className="loc-why-icon">
                <svg fill="none" height={32} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" width={32} xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>90-Day Warranty</h3>
              <p>Every repair in {location.name} comes with our 90-day parts and labor warranty, giving you complete peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      <TrustLogos />
      <Contact />
    </SiteShell>
  );
}
