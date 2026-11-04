import type { ReactNode } from "react";
import { BUSINESS, SITE_URL } from "@/lib/business";
import { APPLIANCE_CONTENT, BRAND_CONTENT, type ApplianceContent } from "@/lib/seo-content";
import { SERVICE_ROUTES } from "@/lib/routes";

type Faq = { question: string; answer: string };
export type Area = { slug: string; name: string };
const COST_TEXT =
  "The service call fee is $85, or $51 when you book online, and it is free with a completed repair. Our technician explains the diagnosis and the cost before starting any work.";
const WARRANTY_TEXT = "Repairs come with a 90-day warranty on parts and a 30-day warranty on labor.";
const HOURS_TEXT = "We are open Monday through Friday from 8am to 8pm and Saturday from 8am to 5pm.";
const BUSINESS_ID = `${SITE_URL}/#business`;

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

function breadcrumbSchema(items: Array<[string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

function serviceSchema(name: string, path: string, areaServed: object) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    url: `${SITE_URL}${path}`,
    serviceType: "Appliance repair",
    provider: { "@id": BUSINESS_ID },
    areaServed,
  };
}

function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

const HOUSTON_AREA = { "@type": "City", name: "Houston, TX" };

function Breadcrumbs({ items }: { items: Array<[string, string]> }) {
  return (
    <nav aria-label="Breadcrumb" className="seo-breadcrumbs">
      {items.map(([name, path], index) => (
        <span key={path}>
          {index > 0 ? " / " : ""}
          {index === items.length - 1 ? name : <a href={path}>{name}</a>}
        </span>
      ))}
    </nav>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="seo-block">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Section title="Frequently Asked Questions">
      {faqs.map(({ question, answer }) => (
        <details className="seo-faq" key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </Section>
  );
}

function AreaLinks({ title, areas, suffix = "Appliance Repair" }: { title: string; areas: Area[]; suffix?: string }) {
  if (areas.length === 0) return null;
  return (
    <Section title={title}>
      <ul className="seo-links">
        {areas.map(({ slug, name }) => (
          <li key={slug}>
            <a href={`/location/${slug}`}>
              {suffix} in {name}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function serviceHref(key: string, commercial = false) {
  return `/services/${commercial ? "commercial-" : ""}${key}-repair`;
}

function Pricing() {
  return (
    <Section title="Service Fee, Warranty and Hours">
      <p>{COST_TEXT}</p>
      <p>
        {WARRANTY_TEXT} {HOURS_TEXT} Call <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a> or use the form below to
        schedule.
      </p>
    </Section>
  );
}

export function ServiceSeo({
  name,
  slug,
  appliance,
  isCommercial,
  areas,
}: {
  name: string;
  slug: string;
  appliance: { key: string; content: ApplianceContent };
  isCommercial: boolean;
  areas: Area[];
}) {
  const { key, content } = appliance;
  const path = `/services/${slug}`;
  const crumbs: Array<[string, string]> = [["Home", "/"], ["Services", "/services"], [name, path]];
  const problems = isCommercial ? [...content.commercialProblems, ...content.problems.slice(0, 3)] : content.problems;
  const counterpart = isCommercial
    ? SERVICE_ROUTES.find((route) => route.slug === `${key}-repair`)
    : SERVICE_ROUTES.find((route) => route.slug === `commercial-${key}-repair`);
  const related = Object.entries(APPLIANCE_CONTENT)
    .filter(([otherKey]) => otherKey !== key)
    .filter(([otherKey]) => SERVICE_ROUTES.some((route) => route.slug === `${isCommercial ? "commercial-" : ""}${otherKey}-repair`))
    .slice(0, 8);
  const faqs: Faq[] = [
    {
      question: `How much does ${content.lower} repair cost in Houston?`,
      answer: `The total depends on the failed part and the labor involved. ${COST_TEXT}`,
    },
    {
      question: `Is it worth repairing my ${content.lower}?`,
      answer: content.repairOrReplace,
    },
    {
      question: `Do you offer same-day ${content.lower} repair?`,
      answer: "Yes. We offer same-day appointments when slots are available, so call early for the fastest scheduling.",
    },
    {
      question: "What warranty do your repairs include?",
      answer: WARRANTY_TEXT,
    },
  ];

  return (
    <div className="container seo-content">
      <JsonLd data={serviceSchema(name, path, HOUSTON_AREA)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs items={crumbs} />
      <Section title={`${name} in Houston, TX`}>
        <p>{isCommercial ? content.commercialIntro : content.intro}</p>
      </Section>
      <Section title={`Common ${content.label} Problems We Repair`}>
        <ul className="seo-list">
          {problems.map((problem) => (
            <li key={problem}>{problem}</li>
          ))}
        </ul>
      </Section>
      <Section title="Quick Checks Before You Call">
        <ul className="seo-list">
          {content.checks.map((check) => (
            <li key={check}>{check}</li>
          ))}
        </ul>
        <p>If the problem continues, or if you are not comfortable checking it safely, turn the appliance off and schedule service.</p>
      </Section>
      <Section title="Repair or Replace?">
        <p>{content.repairOrReplace}</p>
        {counterpart ? (
          <p>
            Also see our <a href={`/services/${counterpart.slug}`}>{counterpart.name.toLowerCase()}</a> service.
          </p>
        ) : null}
      </Section>
      <Pricing />
      <AreaLinks title={`Areas We Serve for ${content.label} Repair`} areas={areas} />
      <Section title="Other Appliances We Repair">
        <ul className="seo-links">
          {related.map(([otherKey, other]) => (
            <li key={otherKey}>
              <a href={serviceHref(otherKey, isCommercial)}>
                {isCommercial ? "Commercial " : ""}
                {other.label} Repair
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <FaqList faqs={faqs} />
    </div>
  );
}

export function BrandSeo({ brandName, slug, areas }: { brandName: string; slug: string; areas: Area[] }) {
  const path = `/brands/${slug}`;
  const crumbs: Array<[string, string]> = [["Home", "/"], [`${brandName} Appliance Repair`, path]];
  const brand = BRAND_CONTENT[slug];
  const services = brand?.services ?? ["refrigerator", "washer", "dryer", "dishwasher"];
  const faqs: Faq[] = [
    {
      question: `Do you repair ${brandName} appliances in Houston?`,
      answer: `Yes. Imperium Appliance Repair works on ${brandName} appliances across the greater Houston area, for both homes and businesses.`,
    },
    {
      question: `Are you affiliated with ${brandName}?`,
      answer: `No. Imperium Appliance Repair is an independent repair company and is not affiliated with or endorsed by ${brandName}. If your appliance is under a manufacturer warranty, check your coverage before scheduling repairs.`,
    },
    { question: "How much is the service call?", answer: COST_TEXT },
  ];

  return (
    <div className="container seo-content">
      <JsonLd data={serviceSchema(`${brandName} Appliance Repair`, path, HOUSTON_AREA)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs items={crumbs} />
      <Section title={`${brandName} Appliance Repair in Houston, TX`}>
        <p>
          {brand?.focus} When a {brandName} appliance stops working, our technicians diagnose the problem, explain the
          repair and go over the cost before starting.
        </p>
      </Section>
      <Section title={`${brandName} Appliances We Commonly Repair`}>
        <ul className="seo-links">
          {services.map((key) => {
            const label = APPLIANCE_CONTENT[key]?.label;
            return label ? (
              <li key={key}>
                <a href={serviceHref(key)}>{brandName} {label} Repair</a>
              </li>
            ) : null;
          })}
        </ul>
      </Section>
      <Pricing />
      <AreaLinks title={`${brandName} Repair Service Areas`} areas={areas} />
      <FaqList faqs={faqs} />
    </div>
  );
}

export function LocationSeo({
  name,
  slug,
  subAreas,
  areas,
}: {
  name: string;
  slug: string;
  subAreas: string[];
  areas: Area[];
}) {
  const path = `/location/${slug}`;
  const crumbs: Array<[string, string]> = [["Home", "/"], [`Appliance Repair in ${name}`, path]];
  const neighborhoods = subAreas.slice(0, 4).join(", ");
  const faqs: Faq[] = [
    {
      question: `Do you offer appliance repair in ${name}, TX?`,
      answer: `Yes. Imperium Appliance Repair serves ${name}${neighborhoods ? `, including ${neighborhoods}` : ""}. Contact us with your ZIP code and we will confirm coverage right away.`,
    },
    {
      question: `Can I get same-day appliance repair in ${name}?`,
      answer: "We offer same-day and next-day appointments when slots are available. Call early for the fastest scheduling.",
    },
    { question: `How much is a service call in ${name}?`, answer: COST_TEXT },
  ];
  const residential = SERVICE_ROUTES.filter((route) => !route.slug.startsWith("commercial-"));
  const commercial = SERVICE_ROUTES.filter((route) => route.slug.startsWith("commercial-"));

  return (
    <div className="container seo-content">
      <JsonLd data={serviceSchema(`Appliance Repair in ${name}, TX`, path, { "@type": "City", name: `${name}, TX` })} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs items={crumbs} />
      <Section title={`Home Appliance Repair in ${name}`}>
        <ul className="seo-links">
          {residential.map((route) => (
            <li key={route.slug}>
              <a href={`/services/${route.slug}`}>{route.name} in {name}</a>
            </li>
          ))}
        </ul>
      </Section>
      <Section title={`Commercial Appliance Repair in ${name}`}>
        <ul className="seo-links">
          {commercial.map((route) => (
            <li key={route.slug}>
              <a href={`/services/${route.slug}`}>{route.name}</a>
            </li>
          ))}
        </ul>
      </Section>
      <Pricing />
      <AreaLinks title="Nearby Areas We Serve" areas={areas.filter((area) => area.slug !== slug)} />
      <FaqList faqs={faqs} />
    </div>
  );
}

export function ServicesIndexSeo({ areas }: { areas: Area[] }) {
  return (
    <div className="container seo-content">
      <Pricing />
      <AreaLinks title="Service Areas" areas={areas} />
    </div>
  );
}

export function BlogPostSeo({
  title,
  description,
  slug,
  image,
  publishedAt,
  serviceKey,
}: {
  title: string;
  description: string;
  slug: string;
  image: string;
  publishedAt: string;
  serviceKey?: string;
}) {
  const appliance = serviceKey ? APPLIANCE_CONTENT[serviceKey] : undefined;
  return (
    <div className="container seo-content seo-blog-cta">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description,
          image,
          datePublished: publishedAt,
          mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
          author: { "@type": "Organization", name: BUSINESS.name, url: SITE_URL },
          publisher: { "@id": BUSINESS_ID },
        }}
      />
      <JsonLd data={breadcrumbSchema([["Home", "/"], ["Blog", "/blog"], [title, `/blog/${slug}`]])} />
      <Section title="Need a Technician?">
        <p>
          {appliance ? (
            <>
              Imperium Appliance Repair provides <a href={serviceHref(serviceKey as string)}>{appliance.lower} repair in Houston</a>{" "}
              and the surrounding area.{" "}
            </>
          ) : null}
          Call <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a> or <a href="/#contact">book online</a> and pay a $51
          service fee instead of $85.
        </p>
      </Section>
    </div>
  );
}
