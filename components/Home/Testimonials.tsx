"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';

import testimonialsData from "@/data/testimonials.json";

interface Testimonial {
  initials?: string;
  avatar?: string;
  name: string;
  location: string;
  text: string;
}

const TESTIMONIALS = testimonialsData as Testimonial[];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsPerView(3);
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

  const offset = currentIndex * (cardWidth + 20); // 20px is the CSS gap

  // Generate pagination dots
  const totalPages = maxIndex + 1;
  const dots = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <>
      <section className="testimonials" id="reviews">
        <div className="container">
          <div className="section-header">
            <span className="label">Testimonials</span>
            <h2>What Our Customers Say</h2>
            <div className="rating-display">
              <img alt="Google" className="rating-google-icon" src="/legacy/assets/google-icon.png" />
              <div className="stars">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} height={20} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span>4.9/5 Average Rating</span>
            </div>
          </div>
          <div 
            className="testimonials-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className="testimonials-track" 
              ref={trackRef}
              style={{ transform: `translateX(-${offset}px)`, transition: 'transform 0.5s ease-out' }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {TESTIMONIALS.map((testimonial, idx) => (
                <div key={idx} className="testimonial-card">
                  <div className="review-header">
                    <img alt="Google" className="review-google-icon" src="/legacy/assets/google-icon.png" />
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map(i => (
                        <svg key={i} height={16} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="review-text">{testimonial.text}</p>
                  <div className="reviewer">
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
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-controls">
            <button aria-label="Previous review" className="carousel-nav prev" onClick={prevSlide} disabled={currentIndex <= 0}>
              <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="carousel-dots">
              {dots.map(idx => (
                <button
                  key={idx}
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button aria-label="Next review" className="carousel-nav next" onClick={nextSlide} disabled={currentIndex >= maxIndex}>
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