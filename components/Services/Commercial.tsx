import React from 'react'
import commercialServices from "@/data/services-commercial.json";
function Commercial() {
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
              {commercialServices.map((service, index) => (
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

export default Commercial