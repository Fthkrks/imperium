import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import brandDetailsJson from "@/data/brand-details.json";

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

  return (
    <SiteShell>
      <section className="container" style={{ padding: "4rem 0" }}>
        <h1>{detail.title}</h1>
        <p>{detail.description}</p>
      </section>
    </SiteShell>
  );
}
