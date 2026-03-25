"use client";

import React from 'react';
import { useSiteData } from "@/components/SiteDataContext";

type WhyFeature = {
  title?: string;
  description?: string;
  icon?: string;
};

type WhyStat = {
  value?: string;
  label?: string;
  isGoogle?: boolean;
};

function Why() {
  const { why } = useSiteData();
  const whyData = why || { features: [], stats: [] };
  const features = Array.isArray(whyData.features) ? (whyData.features as WhyFeature[]) : [];
  const stats = Array.isArray(whyData.stats) ? (whyData.stats as WhyStat[][]) : [];
  return (
    <>
          <section className="why-us" id="why-us">
        <div className="bg-pattern" />
        <div className="container why-us-content">
          <div className="why-us-grid">
            <div className="why-us-left">
              <span className="label">Why Choose mperium Appliance</span>
              <h2>The Repair Service <br />Homeowners Trust</h2>
              <p>We combine technical expertise with old-fashioned customer service. No hidden fees, no waiting around, just honest work.</p>
              <div className="features-list">
                {features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <div 
                      className="feature-icon" 
                      dangerouslySetInnerHTML={{ __html: feature.icon ?? '' }} 
                    />
                    <div>
                      <h3>{feature.title ?? ''}</h3>
                      <p>{feature.description ?? ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-us-right">
              <div className="stats-grid">
                {stats.map((col, colIdx) => (
                  <div key={colIdx} className="stat-col">
                    {col.map((stat, statIdx) => (
                      <div 
                        key={statIdx} 
                        className={`stat-card ${stat.isGoogle ? 'stat-card-google' : ''}`}
                      >
                        {stat.isGoogle ? (
                          <>
                            <div className="stat-number-row">
                              <img alt="Google" className="stat-google-icon" src="/legacy/assets/google-icon.png" />
                              <div className="stat-number" data-digits>{stat.value ?? ''}</div>
                            </div>
                            <div className="stars">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} height={16} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="stat-number" data-digits>{stat.value ?? ''}</div>
                        )}
                        <div className="stat-label">{stat.label ?? ''}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Why