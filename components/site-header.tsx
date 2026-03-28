"use client";

import Image from "next/image";
import { useSiteData } from "@/components/SiteDataContext";
import { useEffect, useState } from "react";

const scopeAttr = { "b-1dp2rcxk9n": "" } as const;

const navigationItems = [
  { href: "/#residential", label: "Residential" },
  { href: "/#commercial", label: "Commercial" },
  { href: "/#brands", label: "Brands" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#blog", label: "Blog" },
] as const;

export function SiteHeader({ forceSolid = false }: { forceSolid?: boolean }) {
  const { contact: contactData } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const effectiveScrolled = forceSolid || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
<div {...scopeAttr} className="sticky-top">
        <div {...scopeAttr} className="discount-banner" data-scrolled={effectiveScrolled}>
          <div {...scopeAttr} className="container">
            <div {...scopeAttr} className="banner-content">
              <svg
                {...scopeAttr}
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  {...scopeAttr}
                  d="M12 3l1.912 5.813a2 2 0 001.276 1.276L21 12l-5.813 1.912a2 2 0 00-1.276 1.276L12 21l-1.912-5.813a2 2 0 00-1.276-1.276L3 12l5.813-1.912a2 2 0 001.276-1.276L12 3z"
                />
              </svg>
              <span {...scopeAttr} className="bold text-[#70B5ED]! ">
                LIMITED OFFER:
              </span>
              <span {...scopeAttr}>Get $25 OFF your first repair!</span>
              <a {...scopeAttr} className="underline open-form-trigger text-[#70B5ED]!" href="#">
                Book Now →
              </a>
            </div>
          </div>
        </div>
        <header
          {...scopeAttr}
          className={`header${forceSolid ? " header-solid" : ""}`}
          data-scrolled={effectiveScrolled}
        >
          <div {...scopeAttr} className="container header-container">
            <a className="" href="/">
              <Image width={90} height={90} alt="mperium Appliance" src="/logo.png" />
            </a>
            <nav {...scopeAttr} className="nav-desktop ">
              {navigationItems.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
              <a href="/#service-areas">
                <svg
                  {...scopeAttr}
                  fill="none"
                  height="14"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path {...scopeAttr} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle {...scopeAttr} cx="12" cy="10" r="3" />
                </svg>
                Service Areas
              </a>
            </nav>
            <div {...scopeAttr} className="header-cta">
              <a {...scopeAttr} href={contactData.phoneHref}>
                <svg
                  {...scopeAttr}
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    {...scopeAttr}
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                  />
                </svg>
                <span {...scopeAttr}>{contactData.phone}</span>
              </a>
            </div>
            <button aria-label="Toggle menu" {...scopeAttr} className="mobile-menu-btn">
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
                <line {...scopeAttr} x1="3" x2="21" y1="12" y2="12" />
                <line {...scopeAttr} x1="3" x2="21" y1="6" y2="6" />
                <line {...scopeAttr} x1="3" x2="21" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </header>
      </div>
      <div {...scopeAttr} className="mobile-menu-overlay" />
      <div {...scopeAttr} className="mobile-menu">
        <div {...scopeAttr} className="mobile-menu-logo">
          <a href="/">
            <Image width={90} height={90} alt="mperium Appliance" src="/logo.png" />
          </a>
        </div>
        <div {...scopeAttr} className="mobile-menu-content">
          {navigationItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="/#service-areas">Service Areas</a>
          <a {...scopeAttr} className="mobile-cta" href={contactData.phoneHref}>
            <svg
              {...scopeAttr}
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                {...scopeAttr}
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
              />
            </svg>
            Call Now
          </a>
        </div>
      </div>
    </>
  );
}