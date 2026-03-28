"use client"

import React, { useEffect, useMemo, useState } from "react"

const BRANDS_IMAGES = [
  "/legacy/assets/20260218002904533_dccd50a9-08d4-48aa-a8b9-15dab143dc7d.jpg",
  "/legacy/assets/20260219113540085_de85eb0c-b81b-426a-ad28-fdeafc9a761f.png",
  "/legacy/assets/20260219113609200_2fb035c7-a746-4168-99b2-b8275f503788.webp",
  "/legacy/assets/20260219113629379_567a4459-7ea4-4510-8882-19c199113e62.webp",
  "/legacy/assets/20260219113639417_4c98e2c0-9bdf-44df-a77c-ba1c1b925c6b.webp",
  "/legacy/assets/20260219113650949_9117c0ba-17db-4b9b-8db3-e60ab7419862.png",
  "/legacy/assets/20260219113703127_85f7e5f4-33f5-4202-b179-a3d4ae8e58fb.webp",
  "/legacy/assets/20260219113709840_b4e05997-39c8-4407-9e17-06e779d9818f.png",
  "/legacy/assets/20260219113717309_1b986d9c-1744-4a54-ae9b-7ee0400b3172.webp",
  "/legacy/assets/20260218002904533_dccd50a9-08d4-48aa-a8b9-15dab143dc7d.jpg",
  "/legacy/assets/20260219113540085_de85eb0c-b81b-426a-ad28-fdeafc9a761f.png",
  "/legacy/assets/20260219113609200_2fb035c7-a746-4168-99b2-b8275f503788.webp",
  "/legacy/assets/20260219113629379_567a4459-7ea4-4510-8882-19c199113e62.webp",
  "/legacy/assets/20260219113639417_4c98e2c0-9bdf-44df-a77c-ba1c1b925c6b.webp",
  "/legacy/assets/20260219113650949_9117c0ba-17db-4b9b-8db3-e60ab7419862.png",
  "/legacy/assets/20260219113703127_85f7e5f4-33f5-4202-b179-a3d4ae8e58fb.webp",
  "/legacy/assets/20260219113709840_b4e05997-39c8-4407-9e17-06e779d9818f.png",
  "/legacy/assets/20260219113717309_1b986d9c-1744-4a54-ae9b-7ee0400b3172.webp",
  "/legacy/assets/20260218002904533_dccd50a9-08d4-48aa-a8b9-15dab143dc7d.jpg",
  "/legacy/assets/20260219113540085_de85eb0c-b81b-426a-ad28-fdeafc9a761f.png",
  "/legacy/assets/20260219113609200_2fb035c7-a746-4168-99b2-b8275f503788.webp",
  "/legacy/assets/20260219113629379_567a4459-7ea4-4510-8882-19c199113e62.webp",
  "/legacy/assets/20260219113639417_4c98e2c0-9bdf-44df-a77c-ba1c1b925c6b.webp",
  "/legacy/assets/20260219113650949_9117c0ba-17db-4b9b-8db3-e60ab7419862.png",
  "/legacy/assets/20260219113703127_85f7e5f4-33f5-4202-b179-a3d4ae8e58fb.webp",
  "/legacy/assets/20260219113709840_b4e05997-39c8-4407-9e17-06e779d9818f.png",
  "/legacy/assets/20260219113717309_1b986d9c-1744-4a54-ae9b-7ee0400b3172.webp",
]

const ITEMS_PER_SLIDE = 8
const AUTO_SLIDE_MS = 4500

function Brands() {
  const slides = useMemo(() => {
    const chunks: string[][] = []

    for (let i = 0; i < BRANDS_IMAGES.length; i += ITEMS_PER_SLIDE) {
      chunks.push(BRANDS_IMAGES.slice(i, i + ITEMS_PER_SLIDE))
    }

    return chunks
  }, [])

  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return

    const intervalId = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, AUTO_SLIDE_MS)

    return () => window.clearInterval(intervalId)
  }, [slides.length])

  return (
    <section id="BrandsWeRepair">
      <div className="container">
        <div className="top">
          <h2>Brands We Repair</h2>
        </div>

        <div className="bottom">
          <div className="swiper-container">
            <div className="swiper-brands">
              <div
                className="swiper-wrapper"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slides.map((slide, slideIndex) => (
                  <div className="brands-div swiper-slide" key={`brands-slide-${slideIndex}`}>
                    {slide.map((src) => (
                      <div className="brand-item" data-aos="zoom-in" key={src}>
                        <img alt="" src={src} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="empty" aria-hidden="true" />

              <div className="swiper-pagination" role="tablist" aria-label="Brands slider">
                {slides.map((_, index) => (
                  <button
                    key={`brand-dot-${index}`}
                    type="button"
                    className={index === activeSlide ? "is-active" : ""}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-selected={index === activeSlide}
                    role="tab"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Brands