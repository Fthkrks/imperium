import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAFIX Appliance Repair",
  description:
    "Professional appliance repair services. Same-day service, 90-day warranty, licensed technicians.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="/legacy/assets/css2" />
        <link rel="stylesheet" href="/legacy/assets/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/legacy/assets/aos.css" />
        <link rel="stylesheet" href="/legacy/assets/styles.css" />
        <link rel="stylesheet" href="/legacy/assets/refrigerator.css" />
        <link rel="stylesheet" href="/legacy/assets/brand.css" />
      </head>
      <body>
        {children}
        <Script src="/legacy/assets/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/legacy/assets/aos.js" strategy="afterInteractive" />
        <Script src="/legacy/assets/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
