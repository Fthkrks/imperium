import React from 'react'

function Hero() {
  return (
    <>
          <section className="hero" id="hero">
        <div className="hero-bg">
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
                Don't let a broken appliance disrupt your day. Our licensed
                technicians provide expert repairs for all major brands with a
                100% satisfaction guarantee.
              </p>
              <div className="hero-buttons">
                <a className="btn-primary open-form-trigger" href="#">
                  Book Now
                  <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                    <line x1={5} x2={19} y1={12} y2={12} />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a className="btn-secondary" href="tel:3468920910">
                  Call (346) 892-0910
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
            <div className="hero-visual">
              <div className="card-bg" />
              <div className="card-main">
                <div className="card-content">
                  <img alt="Professional Appliance Repair Technician" className="hero-photo" src="/legacy/assets/rafixhero3.png" />
                  <div className="gradient-overlay" />
                  <div className="rating-card">
                    <div className="rating-icon">
                      <img alt="Google" height={28} src="/legacy/assets/google-icon.png" width={28} />
                    </div>
                    <div className="rating-info">
                      <div className="rating-stars">
                        <svg height={14} viewBox="0 0 24 24" width={14} xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <svg height={14} viewBox="0 0 24 24" width={14} xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <svg height={14} viewBox="0 0 24 24" width={14} xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <svg height={14} viewBox="0 0 24 24" width={14} xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <svg height={14} viewBox="0 0 24 24" width={14} xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      </div>
                      <p className="rating-text"><span className="rating-number">4.9</span> <span className="rating-divider">|</span> <span className="rating-reviews">217 reviews</span></p>
                    </div>
                  </div>
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