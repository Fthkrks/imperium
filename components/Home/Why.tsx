"use client";

import React from 'react';
import { useSiteData } from "@/components/SiteDataContext";

type WhyFeature = {
  title?: string;
  description?: string;
  icon?: string;
};

function Why() {
  const { why } = useSiteData();
  const whyData = why || { features: [] };
  const features = Array.isArray(whyData.features) ? (whyData.features as WhyFeature[]) : [];

  return (
    <section className="why-us-new" id="why-us">
      <div className="container">
        <h2 className="why-us-new-title">Why Us?</h2>
        <div className="why-us-new-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="why-us-new-card">
              <div
                className="why-us-new-icon"
                dangerouslySetInnerHTML={{ __html: feature.icon ?? '' }}
              />
              <h3 className="why-us-new-card-title">{feature.title ?? ''}</h3>
              <p className="why-us-new-card-desc">{feature.description ?? ''}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Why;