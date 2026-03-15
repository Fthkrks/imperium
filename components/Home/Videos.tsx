import React from 'react'

function Videos() {
  return (
    <>
          <section className="videos-section">
        <div className="container">
          <div className="section-header">
            <span className="label">Our Work</span>
            <h2>See Our Technicians in Action</h2>
          </div>
          <div className="videos-grid">
            <div className="video-card">
              <video data-src="https://rafixappliancerepair.com/src/videos/IMG_2873.mp4" loop muted playsInline preload="none" />
            </div>
            <div className="video-card">
              <video data-src="https://rafixappliancerepair.com/src/videos/IMG_2874.mp4" loop muted playsInline preload="none" />
            </div>
            <div className="video-card">
              <video data-src="https://rafixappliancerepair.com/src/videos/IMG_2875.mp4" loop muted playsInline preload="none" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Videos