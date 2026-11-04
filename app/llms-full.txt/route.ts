import { serveSiteFile } from "@/lib/site-files";

export const dynamic = "force-dynamic";

export async function GET() {
  return serveSiteFile("/llms-full.txt");
}
