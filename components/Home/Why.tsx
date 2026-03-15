import React from 'react'

function Why() {
  return (
    <>
          <section className="why-us" id="why-us">
        <div className="bg-pattern" />
        <div className="container why-us-content">
          <div className="why-us-grid">
            <div className="why-us-left">
              <span className="label">Why Choose RAFIX</span>
              <h2>The Repair Service <br />Homeowners Trust</h2>
              <p>We combine technical expertise with old-fashioned customer service. No hidden fees, no waiting around, just honest work.</p>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg fill="none" height={24} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
                      <circle cx={12} cy={12} r={10} />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h3>Same-Day Service</h3>
                    <p>We arrive when you need us, often within hours.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg fill="none" height={24} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
                      <circle cx={12} cy={8} r={7} />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  </div>
                  <div>
                    <h3>Certified Technicians</h3>
                    <p>Factory-trained experts for all major brands.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg fill="none" height={24} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
                      <line x1={12} x2={12} y1={1} y2={23} />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div>
                    <h3>Upfront Pricing</h3>
                    <p>Flat-rate pricing. No surprises on your bill.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg fill="none" height={24} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3>90-Day Warranty</h3>
                    <p>We stand behind our parts and labor.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-us-right">
              <div className="stats-grid">
                <div className="stat-col">
                  <div className="stat-card">
                    <div className="stat-number" data-digits>15+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number" data-digits>10k+</div>
                    <div className="stat-label">Repairs Completed</div>
                  </div>
                </div>
                <div className="stat-col">
                  <div className="stat-card stat-card-google">
                    <div className="stat-number-row">
                      <img alt="Google" className="stat-google-icon" src="/legacy/assets/google-icon.png" />
                      <div className="stat-number" data-digits>4.9</div>
                    </div>
                    <div className="stars">
                      <svg height={16} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      <svg height={16} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      <svg height={16} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      <svg height={16} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      <svg height={16} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    </div>
                    <div className="stat-label">Average Rating</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number" data-digits>100%</div>
                    <div className="stat-label">Satisfaction Guarantee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Why