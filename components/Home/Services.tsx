"use client";

import React from "react";
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

function Services() {
  const { servicesResidential = [], servicesCommercial = [] } = useSiteData();
  const groups = [
    { id: "residential", title: "Residential", services: servicesResidential },
    { id: "commercial", title: "Commercial", services: servicesCommercial },
  ];

  return (
    <>
      <section className="services" id="services">
        <div className="container">
          <div className="top">
            <h2>Our Appliance Repair Services</h2>
            <span>
              We repair and service all major appliances. Our technicians are
              ready to help with same-day assistance and expert repairs. Explore
              our service options below to find the right solution
            </span>
          </div>
          <div className="bottom">
            {groups.map((group) => (
              <div className="appliance-services" key={group.id} style={{ marginBottom: "2.5rem" }}>
                <div id={group.id} className="services-anchor" />
                <h3 className="services-category-title">{group.title}</h3>
                <div className="services-grid">
                  {group.services.map((service: any, index: number) => (
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
