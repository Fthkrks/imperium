import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import serviceDetailsJson from "@/data/service-details.json";

type DetailEntry = {
  title: string;
  description: string;
};

const serviceDetails = serviceDetailsJson as Record<string, DetailEntry>;

const commonProblems = [
  {
    title: "Not Starting",
    description: "Appliance does not power on or requires repeated attempts to start.",
  },
  {
    title: "Strange Noises",
    description: "Grinding, buzzing, rattling, or unusual vibrations during operation.",
  },
  {
    title: "Poor Performance",
    description: "Inconsistent temperature, weak cycles, or reduced cleaning and drying quality.",
  },
  {
    title: "Leaks & Odors",
    description: "Water leaks, bad smells, and moisture build-up that can damage nearby areas.",
  },
];

const supportedBrands = [
  "Whirlpool",
  "GE",
  "Samsung",
  "LG",
  "Bosch",
  "Maytag",
  "KitchenAid",
  "Frigidaire",
  "Electrolux",
  "Kenmore",
  "Miele",
  "Viking",
];

const serviceSteps = [
  {
    title: "Fast Scheduling",
    description: "Book online or by phone and get same-day or next-day availability in most areas.",
  },
  {
    title: "Accurate Diagnosis",
    description: "A licensed technician identifies the root cause and explains your options clearly.",
  },
  {
    title: "On-Site Repair",
    description: "We complete repairs with quality parts and proven methods during the same visit when possible.",
  },
  {
    title: "Warranty Support",
    description: "Every completed repair is backed by our 90-day workmanship warranty.",
  },
];

const faqItems = [
  {
    question: "How quickly can you come out?",
    answer:
      "Most appointments are available the same day or next day depending on technician coverage and parts availability.",
  },
  {
    question: "Do you offer warranty on repairs?",
    answer:
      "Yes. We provide a 90-day workmanship warranty so you can book with confidence.",
  },
  {
    question: "What brands do you service?",
    answer:
      "We repair most major home appliance brands and carry common replacement parts for faster turnaround.",
  },
  {
    question: "Are your technicians licensed?",
    answer:
      "Yes. Our technicians are licensed, experienced, and trained to handle both residential and commercial repair jobs.",
  },
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = serviceDetails[slug];

  if (!detail) {
    return {
      title: "Service Not Found - RAFIX Appliance Repair",
      description: "Requested service could not be found.",
    };
  }

  return {
    title: detail.title,
    description: detail.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = serviceDetails[slug];

  if (!detail) notFound();

  const serviceName = detail.title
    .replace(" - RAFIX Appliance Repair", "")
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
                <a className="dhero-btn-primary open-form-trigger" href="#">
                  Book Repair
                </a>
                <a className="dhero-btn-secondary" href="tel:+18322024422">
                  Call +1 (832) 202-4422
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

      <section className="detail-problems">
        <div className="container">
          <h2>Common {serviceName} Problems We Fix</h2>
          <div className="problems-grid" style={{ marginTop: "1.5rem" }}>
            {commonProblems.map((problem) => (
              <article key={problem.title} className="problem-card">
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-brands">
        <div className="container">
          <h2>Brands We Service</h2>
          <div className="detail-brands-grid" style={{ marginTop: "1.5rem" }}>
            {supportedBrands.map((brand) => (
              <div key={brand} className="detail-brand-card">
                <span className="detail-brand-name">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-process">
        <div className="container">
          <h2>How Our Repair Process Works</h2>
          <div className="detail-steps" style={{ marginTop: "2rem" }}>
            {serviceSteps.map((step, index) => (
              <div key={step.title}>
                <div className="detail-step">
                  <div className="detail-step-number">{index + 1}</div>
                  <div className="detail-step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
                {index < serviceSteps.length - 1 && <div className="detail-step-divider" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list" style={{ marginTop: "1.5rem" }}>
            {faqItems.map((item) => (
              <article key={item.question} className="faq-item open">
                <div className="faq-question">{item.question}</div>
                <div className="faq-answer" style={{ maxHeight: "300px" }}>
                  <p>{item.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-cta">
        <div className="container">
          <div className="detail-cta-card">
            <div className="detail-cta-content">
              <h2>Need {serviceName} Repair Today?</h2>
              <p>
                Book now for fast, professional service from RAFIX Appliance Repair. We are ready to help
                with urgent and routine repairs.
              </p>
              <div className="detail-cta-badges">
                <span className="detail-cta-badge">Same-Day Service</span>
                <span className="detail-cta-badge">90-Day Warranty</span>
                <span className="detail-cta-badge">Licensed Team</span>
              </div>
              <div className="detail-cta-buttons">
                <a className="detail-cta-primary open-form-trigger" href="#">
                  Schedule Service
                </a>
                <a className="detail-cta-secondary" href="tel:+18322024422">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
