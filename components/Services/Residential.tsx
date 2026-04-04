"use client";

import React from 'react'
import { useSiteData } from "@/components/SiteDataContext";

function isInlineSvg(icon: unknown): icon is string {
  if (typeof icon !== "string") return false;
  const value = icon.trim();
  return value.startsWith("<svg") || value.startsWith("<?xml");
}

function sanitizeInlineSvg(svg: string): string {
  return svg
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "");
}

function normalizeIconSrc(icon: unknown): string {
  if (typeof icon !== "string") return "";
  return icon.trim();
}

function ServiceIcon({ icon, title }: { icon: unknown; title: string }) {
  if (isInlineSvg(icon)) {
    return (
      <div
        className="service-icon service-icon-svg"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: sanitizeInlineSvg(icon) }}
      />
    );
  }

  return <img alt={title} className="service-icon" src={normalizeIconSrc(icon)} />;
}

function Residential() {
  const { servicesResidential } = useSiteData();
  return (
    <section className="services-section" style={{ marginTop: "3rem", marginBottom: "3rem" }}>
      <div className="services-category">
        <h3 className="services-category-title">
          <svg
            fill="none"
            height={22}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            width={22}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Residential
        </h3>
        <div className="services-grid">
          {(servicesResidential || []).map((service: any, index: number) => (
            <a
              key={`${service?.title || "service"}-${index}`}
              className="service-card"
              href={service?.href || "#"}
            >
              <div className="svg-div">
                <ServiceIcon icon={service?.icon} title={service?.title || "Service"} />
              </div>
              <div className="name-div">
                <span>{service?.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Residential
