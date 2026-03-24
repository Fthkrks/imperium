import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import Home from "./home/page";

export default function HomePage() {

  return (
    <SiteShell>
      <Home/>
    </SiteShell>
  );
}
