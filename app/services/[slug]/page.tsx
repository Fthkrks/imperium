import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import serviceDetailsJson from "@/data/service-details.json";
import TrustLogos from "@/components/Home/TrusthLogo";
import Brands from "@/components/Home/Brands";
import Resential from "@/components/Services/Resential";
import Commercial from "@/components/Services/Commercial";
import Contact from "@/components/Home/Contact";

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
                <a className="dhero-btn-primary hover:bg-[#11528E]! open-form-trigger" href="#">
                  Book Repair
                </a>
                <a className="dhero-btn-secondary" href="tel:+13477911731">
                  Call +1 (347) 791-1731
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
