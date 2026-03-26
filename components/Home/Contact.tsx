"use client";

import React from 'react'
import { useSiteData } from '../SiteDataContext';

function Contact() {
  const { contact: contactData } = useSiteData();
  return (
    <>
      <section className="contact" id="contact">
        <div className="bg-split">
          <div className="bg-blue" />
          <div className="bg-orange" />
        </div>
        <div className="container contact-container">
          <div className="contact-card">
            <div className="contact-info">
              <h2>Ready to Get Your Appliance Fixed?</h2>
              <p>Schedule online or give us a call. We offer flexible appointment windows and same-day service availability.</p>
              <div className="contact-checks">
                <div className="check-item">
                  <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Free Service Call with Repair</span>
                </div>
                <div className="check-item">
                  <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Licensed &amp; Insured Technicians</span>
                </div>
                <div className="check-item">
                  <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>100% Satisfaction Guarantee</span>
                </div>
              </div>
              <a className="call-btn" href={`tel:${contactData?.phoneHref}`}>
                <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
                Call: {contactData?.phone}
              </a>
            </div>
            <div className="contact-form-container">
              <div className="offer-banner">
                <div className="offer-content">
                  <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><path d="M12 3l1.912 5.813a2 2 0 001.276 1.276L21 12l-5.813 1.912a2 2 0 00-1.276 1.276L12 21l-1.912-5.813a2 2 0 00-1.276-1.276L3 12l5.813-1.912a2 2 0 001.276-1.276L12 3z" /></svg>
                  <span className="offer-amount">$25 OFF</span>
                  <span className="offer-text">First Repair!</span>
                </div>
              </div>
              <div className="contact-form">
                <form>
                  <div className="form-header">
                    <h3>Request Service</h3>
                    <div className="discount-tag">
                      <svg fill="none" height={16} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /><path d="M7 7h.01" /></svg>
                      <span>$25 OFF Applied</span>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name</label>
                      <input name="Name" placeholder="John Doe" required type="text" />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input name="Phone" placeholder="(555) 123-4567" required type="tel" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input name="Email" placeholder="john@example.com" required type="email" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Address</label>
                      <input name="Address" placeholder="123 Main Street" required type="text" />
                    </div>
                    <div className="form-group">
                      <label>Zip Code</label>
                      <input maxLength={10} name="ZipCode" placeholder="97204" type="text" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Appliance</label>
                      <select name="ServiceId">
                        <option disabled value="">Select Appliance</option>
                        <option value={1}>Refrigerator</option>
                        <option value={3}>Washer</option>
                        <option value={4}>Ice Machine</option>
                        <option value={5}>Dryer</option>
                        <option value={6}>Dishwasher</option>
                        <option value={7}>Oven</option>
                        <option value={8}>Cooktop</option>
                        <option value={9}>Microwave</option>
                        <option value={10}>Wine Cooler</option>
                        <option value={11}>Freezer</option>
                        <option value={12}>Garbage Disposal</option>
                        <option value={13}>Stove</option>
                        <option value={14}>Range</option>
                        <option value={26}>Vent Hood</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Brand</label>
                      <select name="BrandId">
                        <option disabled value="">Select Brand</option>
                        <option value={1}>Bosch</option>
                        <option value={2}>Whirlpool</option>
                        <option value={3}>Kenmore</option>
                        <option value={4}>Maytag</option>
                        <option value={5}>Frigidaire</option>
                        <option value={6}>Electrolux</option>
                        <option value={7}>Miele</option>
                        <option value={8}>Samsung</option>
                        <option value={9}>Viking</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>How Can We Help You?</label>
                    <textarea name="Description" placeholder="Please describe the issue with your appliance..." rows={3} defaultValue={""} />
                  </div>
                  <button className="submit-btn" type="submit">
                    Claim $25 Off &amp; Schedule
                    <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><line x1={5} x2={19} y1={12} y2={12} /><polyline points="12 5 19 12 12 19" /></svg>
                  </button>
                  <p className="form-note">No payment required until job is done. Discount applied at checkout.</p>
                  </form>
                <div className="form-success">
                  <div className="success-icon">
                    <svg fill="none" height={32} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={32} xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3>Request Received!</h3>
                  <p>We'll call you shortly to confirm your appointment time.</p>
                  <div className="discount-applied">
                    <svg fill="none" height={16} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /><path d="M7 7h.01" /></svg>
                    Your $25 discount will be applied!
                  </div>
                  <button className="book-another">Book another repair</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact