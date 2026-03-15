import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import Home from "./home/page";

export function generateMetadata(): Metadata {
  return {
    title: "RAFIX Appliance Repair - Fast, Reliable, Affordable Service",
    description:
      "RAFIX Appliance Repair offers fast, reliable, and affordable appliance repair services for all major brands. Book your appointment today!",
  };
}

export default function HomePage() {

  return (
    <SiteShell>
      <Home/>
    </SiteShell>
  );
}
