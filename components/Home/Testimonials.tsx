"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { useSiteData } from "@/components/SiteDataContext";

interface Testimonial {
  initials?: string;
  avatar?: string;
  name: string;
  location: string;
  text: string;
}

function Testimonials() {
  const { testimonials: testimonialsData } = useSiteData();
  const TESTIMONIALS = (testimonialsData || []) as Testimonial[];
  const CARD_GAP = 14;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [cardWidth, setCardWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setCardsPerView(4);
      else if (window.innerWidth >= 1024) setCardsPerView(3);
      else if (window.innerWidth >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current && trackRef.current.children[0]) {
        const fw = (trackRef.current.children[0] as HTMLElement).offsetWidth;
        setCardWidth(fw);
      }
    };
    updateWidth();
    setTimeout(updateWidth, 100);
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [cardsPerView]);

  const maxIndex = Math.max(0, TESTIMONIALS.length - cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setIsPaused(false);
  };

  const offset = currentIndex * (cardWidth + CARD_GAP);

  return (
    <>
      <section className="testimonials" id="reviews">
        <div className="container">
          <div className="testimonials-wrap">
            <div className="testimonials-heading">
              <div className="eyebrow">
                <span className="eyebrow-line" />
                <span>WHAT CLIENTS SAY</span>
              </div>
              <h2>What Our Clients Say</h2>
              <p>
                Thousands trust Unitech for critical property services. Browse authentic
                <a href="/#reviews"> customer reviews</a> showcasing our service excellence.
                Our integrated approach delivers consistent quality.
              </p>
            </div>
            <div 
              className="testimonials-carousel"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <button aria-label="Previous review" className="carousel-nav prev" onClick={prevSlide}>
                <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="testimonials-viewport">
                <div 
                  className="testimonials-track" 
                  ref={trackRef}
                  style={{ transform: `translateX(-${offset}px)`, transition: 'transform 0.5s ease-out' }}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {TESTIMONIALS.map((testimonial, idx) => (
                    <article key={idx} className="testimonial-card">
                      <div className="review-top">
                        <div className="review-author">
                          <div className="avatar">
                            {testimonial.avatar ? (
                              <img alt={testimonial.name} src={testimonial.avatar} />
                            ) : (
                              <span>{testimonial.initials}</span>
                            )}
                          </div>
                          <div>
                            <p className="name">{testimonial.name}</p>
                            <p className="location">{testimonial.location}</p>
                          </div>
                        </div>
                        <img alt="Google" className="review-google-icon" src="/legacy/assets/google-icon.png" />
                      </div>

                      <div className="review-stars">
                        {[1, 2, 3, 4, 5].map(i => (
                          <svg key={i} height={16} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                        <svg className="verified-icon" viewBox="0 0 24 24" width={14} height={14} xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#3b82f6" />
                          <path d="M8 12.3l2.2 2.2L16 9" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>

                      <p className="review-text">{testimonial.text}</p>
                      <a className="review-link" href="/#reviews">Read more</a>
                    </article>
                  ))}
                </div>
              </div>

              <button aria-label="Next review" className="carousel-nav next" onClick={nextSlide}>
                <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
          {/* Keep old controls hidden via CSS to preserve JS behavior without visual clutter. */}
          <div className="carousel-controls" aria-hidden="true">
            <button aria-label="Previous review" className="carousel-nav prev" onClick={prevSlide}>
              <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="carousel-dots" />
            <button aria-label="Next review" className="carousel-nav next" onClick={nextSlide}>
              <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;