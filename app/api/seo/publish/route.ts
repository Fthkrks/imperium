import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { SITE_URL } from "@/lib/business";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { getSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase-client";
import {
  decidePublishStatus,
  getPublishJsonLdChanges,
  getPublishTarget,
  getReadTime,
  isValidPublishToken,
  SeoPublishError,
  validatePublishPage,
} from "@/lib/seo-publish";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_BODY_BYTES = 1024 * 1024;
const DEFAULT_IMAGE = "https://images.pexels.com/photos/31718639/pexels-photo-31718639.jpeg";

async function readBody(request: Request): Promise<unknown> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    throw new SeoPublishError(400, "Content-Type must be application/json.");
  }
  const reader = request.body?.getReader();
  if (!reader) throw new SeoPublishError(400, "A JSON body is required.");
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new SeoPublishError(413, "Request body must not exceed 1 MiB.");
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }
  try { return JSON.parse(text); }
  catch { throw new SeoPublishError(400, "Invalid JSON body."); }
}

export async function POST(request: Request) {
  if (!process.env.SEO_PUBLISH_TOKEN?.trim()) {
    return NextResponse.json({ error: "SEO publishing is not configured." }, { status: 503 });
  }
  if (isRateLimited(`seo-publish:${getClientIp(request)}`, 30, 60_000)) {
    return NextResponse.json({ error: "Too many publishing requests." }, { status: 429 });
  }
  if (!isValidPublishToken(request.headers.get("authorization"), process.env.SEO_PUBLISH_TOKEN)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const page = validatePublishPage(await readBody(request));
    const target = getPublishTarget(page.url);
    if (!isSupabaseConfigured()) throw new SeoPublishError(503, "Supabase is not configured.");
    const supabase = getSupabaseAdminClient();
    let status;

    if (target.kind === "file") {
      status = decidePublishStatus(page, target, process.env.SEO_ALLOW_LIVE_PUBLISH);
      const { error } = await supabase.from("site_files").upsert({
        path: target.path,
        content: page.content_md,
        updated_at: new Date().toISOString(),
      }, { onConflict: "path" });
      if (error) throw new SeoPublishError(503, "Failed to save site file; check the SEO migration and database availability.");
    } else {
      const { data: existing, error: readError } = await supabase.from("blog")
        .select("id,status,json_ld").eq("slug", target.slug).maybeSingle();
      if (readError) throw new SeoPublishError(503, "Blog SEO schema is unavailable; run the SEO migration and check database availability.");
      status = decidePublishStatus(page, target, process.env.SEO_ALLOW_LIVE_PUBLISH, existing?.status ?? null);
      const changes = {
        ...(page.title !== undefined ? { title: page.title } : {}),
        ...(page.meta_description !== undefined ? { excerpt: page.meta_description } : {}),
        ...(page.content_md !== undefined ? { content: page.content_md, readTime: getReadTime(page.content_md) } : {}),
        ...getPublishJsonLdChanges(page),
        status,
      };

      if (page.op === "create") {
        const { data: last, error: idError } = await supabase.from("blog")
          .select("id").order("id", { ascending: false }).limit(1);
        if (idError) throw new SeoPublishError(503, "Failed to allocate blog ID.");
        const id = Number(last?.[0]?.id ?? 0) + 1;
        if (!Number.isSafeInteger(id)) throw new SeoPublishError(409, "Blog ID exceeds the supported integer range.");
        const { error } = await supabase.from("blog").insert({
          id,
          slug: target.slug,
          excerpt: "",
          category: "Appliance Care",
          publishedAt: new Date().toISOString().slice(0, 10),
          image: DEFAULT_IMAGE,
          ...changes,
        });
        if (error?.code === "23505") throw new SeoPublishError(409, "Blog slug or ID was created concurrently; retry the request.");
        if (error) throw new SeoPublishError(503, "Failed to create blog post.");
      } else {
        // Compare the status too, so an admin approval racing this edit cannot expose unreviewed changes.
        const { data: updated, error } = await supabase.from("blog").update(changes)
          .eq("id", existing!.id).eq("slug", target.slug).eq("status", existing!.status).select("id");
        if (error) throw new SeoPublishError(503, "Failed to update blog post.");
        if (!updated?.length) throw new SeoPublishError(409, "Blog post changed concurrently; reload and retry.");
      }
      revalidatePath("/blog");
      revalidatePath("/", "layout");
    }

    revalidatePath(target.path);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ location: `${SITE_URL}${target.path}`, status });
  } catch (error) {
    if (error instanceof SeoPublishError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    // Do not log request bodies or credentials.
    console.error("SEO publishing failed.");
    return NextResponse.json({ error: "Failed to publish page." }, { status: 500 });
  }
}
