import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { promises as fs } from 'fs';
import path from 'path';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'metadata.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const metadataJson = JSON.parse(fileContents);
    return {
      title: metadataJson.title || "RAFIX Appliance Repair",
      description: metadataJson.description || "Professional appliance repair services.",
      keywords: metadataJson.keywords || "",
    };
  } catch (error) {
    return {
      title: "RAFIX Appliance Repair",
      description: "Professional appliance repair services.",
    };
  }
}

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
        <link rel="stylesheet" href="/legacy/assets/location.css" />
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
