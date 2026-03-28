import React from 'react'

function Discount() {
  return (
    <>
      <section id="Savemore">
        <div className="container">
          <div className="top">
            <h2>Save More with FixCenter</h2>
            <span>
              At FixCenter Appliance Repair, we're proud to serve our community with honesty and care. We offer
              exclusive discounts to show our appreciation for those who make a difference every day.
            </span>
          </div>
          <div className="bottom">
            <div className="save-grid">
              <div className="save-card">
                <div className="icon-div">
                  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M23.103 20.817a1 1 0 0 1 1.794 0l2.985 6.048a1 1 0 0 0 .753.548l6.675.97a1 1 0 0 1 .554 1.705l-4.83 4.708a1 1 0 0 0-.288.885l1.14 6.648a1 1 0 0 1-1.45 1.054l-5.97-3.138a1 1 0 0 0-.931 0l-5.97 3.138a1 1 0 0 1-1.452-1.054l1.14-6.648a1 1 0 0 0-.287-.885l-4.83-4.708a1 1 0 0 1 .554-1.706l6.675-.97a1 1 0 0 0 .753-.547l2.985-6.048ZM36 4H12v10l12 5l12-5V4Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                <span className="title">Army Members</span>
                <span className="description">
                  Thank you for your service - enjoy <strong>10% OFF</strong> your repair.
                </span>
                <a href="#" className="open-form-trigger">Book Repair Service Now</a>
              </div>

              <div className="save-card">
                <div className="icon-div">
                  <svg viewBox="0 0 1152 1792" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M642 0q-78 0-132.5 55T455 188t54.5 132.5T642 375q79 0 133.5-54.5T830 188T775.5 55T642 0zm-92 428q-24-52-88-56q-24-2-94-2q-159 5-286 205q-61 97-74.5 201T38 980l62 269l-75 406q-9 52 21.5 94t80.5 43q119 0 141-89l89-389q8-38 8-53t-9-56l-42-248l110-292q9 13 32.5 50t39.5 60t40 52.5t48.5 49.5t49.5 31q23 10 328 74q41 8 68.5-24t27.5-66q0-43-57-74l-288-82zm241 767q0-71 50.5-121t122.5-50q70 0 120.5 50t50.5 121l-2 554q0 18-12.5 30.5T1090 1792q-17 0-30-12.5t-13-30.5v-554q0-36-24-61t-59-25q-36 0-60.5 25t-24.5 61q0 18-13 30t-30 12q-18 0-31.5-12t-13.5-30z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="title">Senior Citizens</span>
                <span className="description">
                  We value your trust - receive <strong>10% OFF</strong> any appliance service.
                </span>
                <a href="#" className="open-form-trigger">Book Repair Service Now</a>
              </div>

              <div className="save-card">
                <div className="icon-div">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="m5.658 11.002l-1.47 3.308c-1.856 4.174-2.783 6.261-1.77 7.274s3.098.085 7.272-1.77L13 18.342c2.517-1.119 3.776-1.678 3.976-2.757s-.774-2.053-2.722-4l-1.838-1.839c-1.947-1.948-2.921-2.922-4-2.721c-1.079.2-1.638 1.459-2.757 3.976M6.5 10.5l7 7m-9-2l4 4M16 8l3-3m-4.803-3c.4.667.719 2.4-1.197 4m9 3.803c-.667-.4-2.4-.719-4 1.197m0-9v.02M22 6v.02M21 13v.02M11 3v.02"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
                <span className="title">First-Time Customers</span>
                <span className="description">
                  Welcome to FixCenter! Get <strong>15% OFF</strong> your first repair with us.
                </span>
                <a href="#" className="open-form-trigger">Book Repair Service Now</a>
              </div>
            </div>
          </div>
          <div className="savemore-note">
            <span>Please note: Discounts apply toward repair costs, not the initial service call fee.</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Discount