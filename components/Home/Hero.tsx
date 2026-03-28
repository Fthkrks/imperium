import React from 'react'
import { useSiteData } from '../SiteDataContext';

function Hero() {
  const { contact: contactData } = useSiteData();

  return (
    <>
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img alt="Professional Appliance Repair Technician" className="hero-bg-photo" src="https://images.pexels.com/photos/31718639/pexels-photo-31718639.jpeg" />
          <div className="hero-bg-overlay" />
          <div className="grid-pattern" />
          <div className="diagonal-blue" />
          <div className="diagonal-orange" />
        </div>
        <div className="container hero-content">
          <div className="hero-grid">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="pulse-dot">
                  <span className="ping" />
                  <span className="dot" />
                </span>
                Available for Same-Day Service
              </div>
              <h1>
                Fast, Reliable <br />
                <span className="text-blue">Appliance Repair</span> <br />
                You Can Trust
              </h1>
              <p className="hero-description">
                Imperium Appliance Repair is your trusted choice for high-quality appliance repair services. We focus on fast, accurate diagnostics and dependable repairs for all major appliances, with professional technicians, same-day service, and honest pricing you can rely on.
              </p>
              <div className="hero-buttons">
                <a className="btn-primary hover:bg-[#11528E]! open-form-trigger" href="#">
                  Book Now
                  <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                    <line x1={5} x2={19} y1={12} y2={12} />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a className="btn-secondary" href={`tel:${contactData?.phoneHref}`}>
                  Call {contactData?.phone}
                </a>
              </div>
              <div className="trust-badges">
                <div className="trust-badge">
                  <div className="icon">
                    <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><circle cx={12} cy={12} r={10} /><polyline points="12 6 12 12 16 14" /></svg>
                  </div>
                  <span>Same Day Service</span>
                </div>
                <div className="trust-badge">
                  <div className="icon">
                    <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  </div>
                  <span>90-Day Warranty</span>
                </div>
                <div className="trust-badge">
                  <div className="icon">
                    <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
                  </div>
                  <span>Licensed Experts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bottom-clip" />
      </section>
    </>
  )
}

export default Hero