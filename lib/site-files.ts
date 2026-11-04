import { getSupabaseAdminClient } from "@/lib/supabase-client";

export async function serveSiteFile(path: "/llms.txt" | "/llms-full.txt"): Promise<Response> {
  const headers = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" };
  try {
    const { data, error } = await getSupabaseAdminClient().from("site_files")
      .select("content").eq("path", path).maybeSingle();
    // An installation without the migration has no site files yet.
    if (error?.code === "42P01" || error?.code === "PGRST205" || (!error && !data)) {
      return new Response("Not found\n", { status: 404, headers });
    }
    if (error || !data) throw new Error("Site file read failed.");
    return new Response(data.content, { headers });
  } catch {
    return new Response("Site file is temporarily unavailable.\n", { status: 503, headers });
  }
}
