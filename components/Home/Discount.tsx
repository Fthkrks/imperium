import React from 'react'

function Discount() {
  return (
    <>
          <section className="discounts">
        <div className="container">
          <div className="section-header">
            <span className="label">Special Offers</span>
            <h2>Save More with RAFIX</h2>
            <p>We're proud to serve our community with honesty and care. We offer exclusive discounts to show our appreciation for those who make a difference every day.</p>
          </div>
          <div className="discounts-grid">
            <div className="discount-card">
              <div className="discount-icon">
                <img alt="Military" height={32} src="/legacy/assets/discount-military.svg" width={32} />
              </div>
              <h3>Military Members</h3>
              <p>Thank you for your service — enjoy <strong>$25 OFF</strong> your repair.</p>
              <a className="discount-btn open-form-trigger hover:bg-[#11528E]!" href="#">Book Repair Service Now</a>
            </div>
            <div className="discount-card">
              <div className="discount-icon">
                <img alt="Senior" height={32} src="/legacy/assets/discount-senior.svg" width={32} />
              </div>
              <h3>Senior Citizens</h3>
              <p>We value your trust — receive <strong>$25 OFF</strong> any appliance service.</p>
              <a className="discount-btn open-form-trigger hover:bg-[#11528E]!" href="#">Book Repair Service Now</a>
            </div>
            <div className="discount-card">
              <div className="discount-icon">
                <img alt="First-Time" height={32} src="/legacy/assets/discount-firsttime.svg" width={32} />
              </div>
              <h3>First-Time Customers</h3>
              <p>Welcome to RAFIX! Get <strong>$25 OFF</strong> your first repair with us.</p>
              <a className="discount-btn open-form-trigger hover:bg-[#11528E]!" href="#">Book Repair Service Now</a>
            </div>
          </div>
          <p className="discounts-note">Please note: Discounts apply toward repair costs, not the initial service call fee.</p>
        </div>
      </section>
    </>
  )
}

export default Discount