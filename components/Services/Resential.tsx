import React from 'react'
import { useSiteData } from "@/components/SiteDataContext";

function Resential() {
  const { servicesResidential } = useSiteData();
  return (
    <section className="services-section">
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
    </section>
  )
}

export default Resential