import React from 'react'

function Gallery() {
  return (
    <>
          <section className="gallery">
        <div className="container">
          <div className="section-header">
            <span className="label">Gallery</span>
            <h2>Our Work in Action</h2>
            <p>A look at the repairs and results we deliver every day</p>
          </div>
          <div className="swiper gallery-swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide gallery-slide">
                <img alt="Range" decoding="async" height={500} loading="lazy" src="/legacy/assets/20260218190310831_4806930c-31b5-4368-a8ff-4a78d1a73e89.jpg" width={800} />
                <div className="gallery-caption">Range</div>
              </div>
              <div className="swiper-slide gallery-slide">
                <img alt="Microwave" decoding="async" height={500} loading="lazy" src="/legacy/assets/20260218190321509_adf48292-327f-4780-8cdc-5b4525c5d015.jpg" width={800} />
                <div className="gallery-caption">Microwave</div>
              </div>
              <div className="swiper-slide gallery-slide">
                <img alt="Refrigerator/freezer" decoding="async" height={500} loading="lazy" src="/legacy/assets/20260222082518924_3333ed42-b5f5-40ed-a7c3-4b303c645b5b.jpeg" width={800} />
                <div className="gallery-caption">Refrigerator/freezer</div>
              </div>
              <div className="swiper-slide gallery-slide">
                <img alt="Refrigerator/evaporator" decoding="async" height={500} loading="lazy" src="/legacy/assets/20260222083610580_fd00b780-fe4d-48ab-a36e-846ff4d7e765.jpeg" width={800} />
                <div className="gallery-caption">Refrigerator/evaporator</div>
              </div>
              <div className="swiper-slide gallery-slide">
                <img alt="Control board repair" decoding="async" height={500} loading="lazy" src="/legacy/assets/20260218190345460_6beb2396-a1db-42e0-bd46-74254f795ab8.jpg" width={800} />
                <div className="gallery-caption">Control board repair</div>
              </div>
              <div className="swiper-slide gallery-slide">
                <img alt="Washer/Dryer " decoding="async" height={500} loading="lazy" src="/legacy/assets/20260218190355140_81ec6f7a-3679-4470-b31b-ef75a1bc678d.jpg" width={800} />
                <div className="gallery-caption">Washer/Dryer </div>
              </div>
              <div className="swiper-slide gallery-slide">
                <img alt="Cooktop" decoding="async" height={500} loading="lazy" src="/legacy/assets/20260218190404046_0235ccfb-4f4e-4bf8-bd26-4d13ed84d5f1.jpg" width={800} />
                <div className="gallery-caption">Cooktop</div>
              </div>
              <div className="swiper-slide gallery-slide">
                <img alt="Dishwasher" decoding="async" height={500} loading="lazy" src="/legacy/assets/20260218190412615_b0965883-4770-4d95-8767-fa6dc0dbbea9.jpeg" width={800} />
                <div className="gallery-caption">Dishwasher</div>
              </div>
              <div className="swiper-slide gallery-slide">
                <img alt="Dryer maintenance" decoding="async" height={500} loading="lazy" src="/legacy/assets/20260218190421234_0ace2fe5-4350-4e30-a258-abf6a6dd0f2c.jpeg" width={800} />
                <div className="gallery-caption">Dryer maintenance</div>
              </div>
              <div className="swiper-slide gallery-slide">
                <img alt="Microwave " decoding="async" height={500} loading="lazy" src="/legacy/assets/20260222081756287_a409a912-648c-46c6-865c-d17bd16f5e92.jpeg" width={800} />
                <div className="gallery-caption">Microwave </div>
              </div>
            </div>
          </div>
          <div className="gallery-controls">
            <button aria-label="Previous image" className="gallery-nav gallery-prev">
              <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <div className="gallery-counter"><span className="gallery-current">1</span> / <span className="gallery-total">10</span></div>
            <button aria-label="Next image" className="gallery-nav gallery-next">
              <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Gallery