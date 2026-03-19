import Image from "next/image";

const scopeAttr = { "b-1dp2rcxk9n": "" } as const;

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/rafixapplianceservice",
    icon: (
      <svg
        {...scopeAttr}
        fill="none"
        height="20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect {...scopeAttr} height="20" rx="5" ry="5" width="20" x="2" y="2" />
        <path {...scopeAttr} d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line {...scopeAttr} x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@RafixApplianceRepair",
    icon: (
      <svg
        {...scopeAttr}
        fill="none"
        height="20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path {...scopeAttr} d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon {...scopeAttr} points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
] as const;

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#residential", label: "Residential" },
  { href: "/#commercial", label: "Commercial" },
  { href: "/#brands", label: "Brands" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#service-areas", label: "Service Areas" },
] as const;

function RatingStars() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          {...scopeAttr}
          key={index}
          height="14"
          viewBox="0 0 24 24"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon {...scopeAttr} points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer {...scopeAttr} className="footer">
        <div {...scopeAttr} className="container">
          <div {...scopeAttr} className="footer-grid">
            <div {...scopeAttr} className="footer-brand flex flex-col">
              <a className="footer-logo " href="/">
                <img alt="RAFIX Appliance Repair" src="/logo.png" />
              </a>
              <p {...scopeAttr} className="p-0 m-0">
                Professional appliance repair services you can count on. Licensed, insured, and ready
                to help.
              </p>
              <div {...scopeAttr} className="social-links">
                {socialLinks.map((item) => (
                  <a
                    {...scopeAttr}
                    aria-label={item.label}
                    href={item.href}
                    key={item.label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
            <div {...scopeAttr} className="footer-links">
              <h3 {...scopeAttr}>Quick Links</h3>
              <ul {...scopeAttr}>
                {quickLinks.map((item) => (
                  <li {...scopeAttr} key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div {...scopeAttr} className="footer-links">
              <h3 {...scopeAttr}>Services</h3>
              <ul {...scopeAttr}>
                <li {...scopeAttr}>
                  <a href="/services">All Services</a>
                </li>
              </ul>
            </div>
            <div {...scopeAttr} className="footer-links">
              <h3 {...scopeAttr}>Blogs</h3>
              <ul {...scopeAttr}>
                <li {...scopeAttr}>
                  <a href="/blog">All Blogs</a>
                </li>
              </ul>
            </div>
            <div {...scopeAttr} className="footer-contact">
              <h3 {...scopeAttr}>Contact Us</h3>
              <ul {...scopeAttr}>
                <li {...scopeAttr}>
                  <svg
                    {...scopeAttr}
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      {...scopeAttr}
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                    />
                  </svg>
                  <div {...scopeAttr}>
                    <p {...scopeAttr} className="phone-number">
                      (347) 791-1731
                    </p>
                    <p {...scopeAttr} className="hours">
                      Mon-Fri: 8am - 8pm
                    </p>
                    <p {...scopeAttr} className="hours">
                      Sat-Sun: 8am - 8pm
                    </p>
                  </div>
                </li>
                <li {...scopeAttr}>
                  <svg
                    {...scopeAttr}
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path {...scopeAttr} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline {...scopeAttr} points="22,6 12,13 2,6" />
                  </svg>
                  <a {...scopeAttr} href="mailto:rafixappliancerepair@gmail.com">
                    rafixappliancerepair@gmail.com
                  </a>
                </li>
                <li {...scopeAttr}>
                  <svg
                    {...scopeAttr}
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path {...scopeAttr} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle {...scopeAttr} cx="12" cy="10" r="3" />
                  </svg>
                  <p {...scopeAttr}>Austin TX Houston TX</p>
                </li>
              </ul>
            </div>
          </div>
          <div {...scopeAttr} className="footer-bottom">
            <p {...scopeAttr}>© 2026 RAFIX Appliance Repair. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <div {...scopeAttr} className="form-modal-overlay" id="form-modal">
        <div {...scopeAttr} className="form-modal">
          <button aria-label="Close" {...scopeAttr} className="form-modal-close" id="close-form-modal">
            <svg
              {...scopeAttr}
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line {...scopeAttr} x1="18" x2="6" y1="6" y2="18" />
              <line {...scopeAttr} x1="6" x2="18" y1="6" y2="18" />
            </svg>
          </button>
          <div {...scopeAttr} className="form-modal-body" />
        </div>
      </div>
      <div {...scopeAttr} className="fixed-rating-card">
        <div {...scopeAttr} className="fixed-rating-icon">
          <img alt="Google" height="28" src="/legacy/assets/google-icon.png" width="28" />
        </div>
        <div {...scopeAttr} className="fixed-rating-info">
          <div {...scopeAttr} className="fixed-rating-stars">
            <RatingStars />
          </div>
          <p {...scopeAttr} className="fixed-rating-text">
            <span {...scopeAttr} className="fixed-rating-number">
              4.9
            </span>{" "}
            <span {...scopeAttr} className="fixed-rating-divider">
              |
            </span>{" "}
            <span {...scopeAttr} className="fixed-rating-reviews">
              217 reviews
            </span>
          </p>
        </div>
      </div>
      <a aria-label="Call Now" {...scopeAttr} className="mobile-fixed-call" href="tel:3468920910">
        <svg
          {...scopeAttr}
          fill="none"
          height="22"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            {...scopeAttr}
            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
          />
        </svg>
      </a>
    </>
  );
}