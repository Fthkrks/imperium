import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { getSiteData } from "@/lib/redis-fetch";
import { BUSINESS } from "@/lib/business";
import { SERVICE_ROUTES, findService } from "@/lib/routes";
import Brands from "@/components/Home/Brands";
import Residential from "@/components/Services/Residential";
import Commercial from "@/components/Services/Commercial";
import Contact from "@/components/Home/Contact";

type ContactData = {
  phone?: string;
  phoneHref?: string;
};



type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICE_ROUTES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    return {
      title: "Service Not Found - Imperium Appliance Repair",
      description: "Requested service could not be found.",
    };
  }

  return {
    title: { absolute: `${service.name} in Houston, TX | ${BUSINESS.name}` },
    description: describeService(service.name),
    alternates: { canonical: `/services/${slug}` },
  };
}

function describeService(name: string) {
  return `Expert ${name.toLowerCase()} across the greater Houston area from ${BUSINESS.name}. Book online or call ${BUSINESS.phone} to schedule service.`;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = findService(slug);
  const rawContact = await getSiteData("contact.json");
  const contactData: ContactData =
    rawContact && typeof rawContact === "object" && !Array.isArray(rawContact)
      ? (rawContact as ContactData)
      : {};


  if (!service) notFound();

  const serviceName = service.name;

  return (
    <SiteShell>
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img alt={`${serviceName} technician`} className="hero-bg-photo" src="https://images.pexels.com/photos/34734504/pexels-photo-34734504.jpeg?auto=compress&cs=tinysrgb&w=1600" fetchPriority="high" />
          <div className="hero-bg-overlay" />
          <div className="grid-pattern" />
          <div className="diagonal-blue" />
          <div className="diagonal-orange" />
        </div>
        <div className="container hero-content">
          <div className="hero-grid">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="pulse-dot">
                  <span className="ping" />
                  <span className="dot" />
                </span>
                Available for Same-Day Service
              </div>
              <h1>
                {serviceName} <span className="text-blue">Service</span>
              </h1>
              <p className="hero-description">{describeService(serviceName)}</p>
              <div className="hero-buttons">
                <a className="btn-primary hover:bg-[#11528E]! open-form-trigger" href="#">
                  Book Repair
                  <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                    <line x1={5} x2={19} y1={12} y2={12} />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a className="btn-secondary" href={contactData?.phoneHref}>
                  Call {contactData?.phone}
                </a>
              </div>
              <div className="trust-badges">
                <div className="trust-badge">
                  <div className="icon">
                    <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><circle cx={12} cy={12} r={10} /><polyline points="12 6 12 12 16 14" /></svg>
                  </div>
                  <span>Same Day Service</span>
                </div>
                <div className="trust-badge">
                  <div className="icon">
                    <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  </div>
                  <span>90-Day Parts / 30-Day Labor</span>
                </div>
                <div className="trust-badge">
                  <div className="icon">
                    <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
                  </div>
                  <span>Licensed Experts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bottom-clip" />
      </section>
      <div className="container">
        <Residential />
      </div>

      <Brands />
      <Contact />
    </SiteShell>
  );
}
