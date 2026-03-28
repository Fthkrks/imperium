"use client";

import React from 'react'
import { useSiteData } from '../SiteDataContext';

function Contact() {
  const { contact: contactData } = useSiteData();
  const mapQuery = encodeURIComponent(contactData?.location || "Austin TX");
  return (
    <>
      <section className="contact" id="contact">
        <div className="container contact-container">
          <div className="contact-heading">
            <span className="label">APPLIANCE REPAIR</span>
            <h2>Contact Us</h2>
            <p>Fill out the form below or give us a call. We're here to help!</p>
          </div>

          <div className="contact-layout">
            <div className="contact-form-panel contact-form-container">
              <div className="contact-form">
                <form>
                  <div className="form-header">
                    <h3>Request an Appointment</h3>
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
                    Submit
                  </button>
                </form>
                <div className="form-success">
                  <div className="success-icon">
                    <svg fill="none" height={32} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={32} xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3>Request Received!</h3>
                  <p>We'll call you shortly to confirm your appointment time.</p>
                  <button className="book-another">Book another repair</button>
                </div>
              </div>
            </div>

            <aside className="contact-side-panel">
              <div className="contact-side-card">
                <div className="contact-info-item">
                  <div className="item-icon">
                    <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <a href={`tel:${contactData?.phoneHref}`}>{contactData?.phone}</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="item-icon">
                    <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16v16H4z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href={`mailto:${contactData?.email}`}>{contactData?.email}</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="item-icon">
                    <svg fill="none" height={20} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg"><circle cx={12} cy={12} r={10} /><polyline points="12 6 12 12 16 14" /></svg>
                  </div>
                  <div>
                    <h4>Business Hours</h4>
                    <p>Mon-Fri: 8AM - 8PM</p>
                    <p>Saturday: 8AM - 5PM</p>
                  </div>
                </div>
              </div>

              <div className="contact-map-card">
                <iframe
                  aria-label="Service area map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  title="Service area map"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact