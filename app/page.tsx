import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import Home from "@/components/Home/HomePage";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: { absolute: `Appliance Repair in Houston, TX | ${BUSINESS.name}` },
  description: `${BUSINESS.name} provides same-day and next-day appliance repair for homes and businesses across the greater Houston area. Call ${BUSINESS.phone}.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <SiteShell>
      <Home />
    </SiteShell>
  );
}
