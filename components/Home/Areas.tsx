"use client";
import React from 'react'
import Link from 'next/link'
import areasData from '@/data/areas.json'
/* slug helper: "New Caney" → "new-caney", "Georgetown " → "georgetown" */
function toSlug(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}

/* Reusable checkmark icon */
const CheckIcon = () => (
  <svg fill="none" height={22} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width={22} xmlns="http://www.w3.org/2000/svg"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

/* Area item component */
function AreaItem({ name }: { name: string }) {
  return (
    <Link href={`/location/${toSlug(name)}`} className="area-item area-item-link">
      <CheckIcon />
      <span>{name}</span>
    </Link>
  );
}

/* Area slider component */
function AreaSlider({ pages }: { pages: React.ReactNode[][] }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalPages = pages.length;

  React.useEffect(() => {
    if (totalPages <= 1) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const [touchStart, setTouchStart] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      } else if (diff < 0 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div className="areas-slider">
      <div className="areas-slider-viewport">
        <div 
          className="areas-slider-track" 
          style={{ transform: `translateX(-${currentPage * 100}%)`, transition: 'transform 0.3s ease' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {pages.map((items, idx) => (
            <div key={idx} className="areas-slider-page">
              {items}
            </div>
          ))}
        </div>
      </div>
      <div className="areas-slider-dots">
        {pages.map((_, idx) => (
          <button 
            key={idx} 
            className={idx === currentPage ? 'active' : ''} 
            onClick={() => setCurrentPage(idx)}
            aria-label={`Page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Areas() {
  const houstonPages = areasData.houston.map((page, pageIdx) => 
    page.map((area, idx) => <AreaItem key={`h-${pageIdx}-${idx}`} name={area} />)
  );

  const austinPages = areasData.austin.map((page, pageIdx) => 
    page.map((area, idx) => <AreaItem key={`a-${pageIdx}-${idx}`} name={area} />)
  );

  return (
    <>
          <section className="service-areas" id="service-areas">
        <div className="container">
          <div className="section-header">
            <span className="label">Service Areas</span>
            <h2>Serving the Greater Houston &amp; Austin Areas</h2>
            <p>When you need expert appliance repair service, RAFIX is the right choice. We proudly provide same-day and next-day appliance repair service across Houston and Austin areas.</p>
          </div>
          <div className="areas-maps-grid">
            <div className="areas-map-card">
              <div className="areas-map-wrapper">
                <iframe allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443088.1302985258!2d-95.6834015!3d29.8168824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" />
              </div>
              <div className="areas-map-label">
                <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx={12} cy={10} r={3} /></svg>
                <span>Houston, TX</span>
              </div>
              <AreaSlider pages={houstonPages} />
            </div>
            <div className="areas-map-card">
              <div className="areas-map-wrapper">
                <iframe allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d441400.7551391056!2d-97.9222068!3d30.3074624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b599a0cc032f%3A0x5d9b464bd469d57a!2sAustin%2C%20TX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" />
              </div>
              <div className="areas-map-label">
                <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx={12} cy={10} r={3} /></svg>
                <span>Austin, TX</span>
              </div>
              <AreaSlider pages={austinPages} />
            </div>
          </div>
          <div className="areas-callout">
            <div className="areas-callout-icon">
              <svg fill="none" height={24} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx={12} cy={10} r={3} /></svg>
            </div>
            <div className="areas-callout-text">
              <strong>Don't See Your Area?</strong>
              <p>We may still be able to help! Give us a call to check if we service your location.</p>
              <a href="tel:3468920910">Call (346) 892-0910</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Areas