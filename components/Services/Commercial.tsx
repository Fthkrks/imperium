"use client";

import React from 'react';
import { useSiteData } from "@/components/SiteDataContext";
import { toServiceHref } from "@/lib/routes";

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

function Commercial() {
  const { servicesCommercial } = useSiteData();
  return (
    <section className="commercial-section my-10!">
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
            <rect height={14} rx={2} ry={2} width={20} x={2} y={7} />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          </svg>
          Commercial
        </h3>
        <div className="services-grid">
          {(servicesCommercial || []).map((service: any, index: number) => (
            <a
              key={`${service?.title || "service"}-${index}`}
              className="service-card"
              href={toServiceHref(service?.href)}
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

export default Commercial