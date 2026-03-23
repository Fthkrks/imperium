import React from "react";
import { useSiteData } from "@/components/SiteDataContext";

function Services() {
  const { servicesResidential = [], servicesCommercial = [] } = useSiteData();
  return (
    <>
      <section className="services" id="services">
        <div className="container">
          <div className="section-header">
            <span className="label">Our Services</span>
            <h2>Appliances We Repair</h2>
            <p>
              Expert repairs for all your home and business appliances, backed
              by our 90-day warranty
            </p>
          </div>
          <div className="services-category" id="residential">
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
              {servicesResidential.map((service: any, index: number) => (
                <a key={index} className="service-card" href={service.href}>
                  <div className="icon-wrapper">
                    <img
                      alt={service.title}
                      className="service-icon"
                      src={service.icon}
                    />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </a>
              ))}
            </div>
          </div>
          <div className="services-category" id="commercial">
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
              {servicesCommercial.map((service: any, index: number) => (
                <a key={index} className="service-card" href={service.href}>
                  <div className="icon-wrapper">
                    <img
                      alt={service.title}
                      className="service-icon"
                      src={service.icon}
                    />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
