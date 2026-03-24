import { AllowedFile } from "@/lib/site-data-config";
import { getSupabaseAdminClient } from "@/lib/supabase-client";

function asArray<T = unknown>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

async function clearTable(table: string): Promise<void> {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from(table).delete().gte("id", 0);
  if (error) {
    throw new Error(`Failed to clear ${table}: ${error.message}`);
  }
}

export async function readSiteDataFromSupabase(file: AllowedFile): Promise<unknown | null> {
  const supabase = getSupabaseAdminClient();

  if (file === "faq.json") {
    const { data, error } = await supabase.from("faq").select("id,question,answer").order("id", { ascending: true });
    if (error) throw new Error(`Failed to read ${file} from Supabase: ${error.message}`);
    return (data ?? []).map((row) => ({ question: row.question, answer: row.answer }));
  }

  if (file === "blog.json") {
    const { data, error } = await supabase
      .from("blog")
      .select("id,slug,title,excerpt,category,readTime,publishedAt,image,content")
      .order("id", { ascending: true });
    if (error) throw new Error(`Failed to read ${file} from Supabase: ${error.message}`);
    return data ?? [];
  }

  if (file === "locations.json") {
    const { data, error } = await supabase
      .from("locations")
      .select("slug,name,region,description,mapEmbedUrl,subAreas")
      .order("name", { ascending: true });
    if (error) throw new Error(`Failed to read ${file} from Supabase: ${error.message}`);

    const out: Record<string, unknown> = {};
    for (const row of data ?? []) {
      out[row.slug] = {
        name: row.name ?? "",
        slug: row.slug,
        region: row.region ?? "",
        description: row.description ?? "",
        mapEmbedUrl: row.mapEmbedUrl ?? "",
        subAreas: Array.isArray(row.subAreas) ? row.subAreas : [],
      };
    }
    return out;
  }

  if (file === "brands.json") {
    const { data, error } = await supabase.from("brands").select("slug,title,description,image,premium").order("slug", { ascending: true });
    if (error) throw new Error(`Failed to read ${file} from Supabase: ${error.message}`);

    const out: Record<string, unknown> = {};
    for (const row of data ?? []) {
      out[row.slug] = {
        title: row.title ?? "",
        description: row.description ?? "",
        image: row.image ?? "",
        premium: Boolean(row.premium),
      };
    }
    return out;
  }

  if (file === "contact.json") {
    const { data, error } = await supabase
      .from("contact")
      .select("id,phone,phoneHref,email,location,socialMedia,reviews")
      .order("id", { ascending: false })
      .limit(1);
    if (error) throw new Error(`Failed to read ${file} from Supabase: ${error.message}`);

    const row = data?.[0];
    if (!row) return {};

    return {
      phone: row.phone ?? "",
      phoneHref: row.phoneHref ?? "",
      email: row.email ?? "",
      location: row.location ?? "",
      socialMedia: Array.isArray(row.socialMedia) ? row.socialMedia : [],
      reviews: row.reviews ?? {},
    };
  }

  if (file === "metadata.json") {
    const { data, error } = await supabase.from("metadata").select("id,title,description,keywords").order("id", { ascending: false }).limit(1);
    if (error) throw new Error(`Failed to read ${file} from Supabase: ${error.message}`);

    const row = data?.[0];
    if (!row) return {};
    return {
      title: row.title ?? "",
      description: row.description ?? "",
      keywords: row.keywords ?? "",
    };
  }

  if (file === "service-details.json") {
    const { data, error } = await supabase.from("service_details").select("slug,title,description,image").order("slug", { ascending: true });
    if (error) throw new Error(`Failed to read ${file} from Supabase: ${error.message}`);

    const out: Record<string, unknown> = {};
    for (const row of data ?? []) {
      out[row.slug] = {
        title: row.title ?? "",
        description: row.description ?? "",
        ...(row.image ? { image: row.image } : {}),
      };
    }
    return out;
  }

  if (file === "services-commercial.json") {
    const { data, error } = await supabase.from("services_commercial").select("id,title,description,href,icon").order("id", { ascending: true });
    if (error) throw new Error(`Failed to read ${file} from Supabase: ${error.message}`);
    return (data ?? []).map((row) => ({
      title: row.title ?? "",
      description: row.description ?? "",
      href: row.href ?? "",
      icon: row.icon ?? "",
    }));
  }

  if (file === "services-residential.json") {
    const { data, error } = await supabase.from("services_residential").select("id,title,description,href,icon").order("id", { ascending: true });
    if (error) throw new Error(`Failed to read ${file} from Supabase: ${error.message}`);
    return (data ?? []).map((row) => ({
      title: row.title ?? "",
      description: row.description ?? "",
      href: row.href ?? "",
      icon: row.icon ?? "",
    }));
  }

  if (file === "testimonials.json") {
    const { data, error } = await supabase.from("testimonials").select("id,initials,name,location,text,avatar").order("id", { ascending: true });
    if (error) throw new Error(`Failed to read ${file} from Supabase: ${error.message}`);
    return (data ?? []).map((row) => ({
      ...(row.initials ? { initials: row.initials } : {}),
      name: row.name ?? "",
      ...(row.location ? { location: row.location } : {}),
      text: row.text ?? "",
      ...(row.avatar ? { avatar: row.avatar } : {}),
    }));
  }

  if (file === "why.json") {
    const { data, error } = await supabase
      .from("why")
      .select("id,title,description,icon")
      .order("id", { ascending: true });
    if (error) throw new Error(`Failed to read ${file} from Supabase: ${error.message}`);

    const features = (data ?? []).map((row) => ({
      title: row.title ?? "",
      description: row.description ?? "",
      icon: row.icon ?? "",
    }));

    return { features, stats: [] };
  }

  if (file === "areas.json") {
    const { data, error } = await supabase
      .from("areas")
      .select("city,page_index,area_name,id")
      .order("city", { ascending: true })
      .order("page_index", { ascending: true })
      .order("id", { ascending: true });
    if (error) throw new Error(`Failed to read ${file} from Supabase: ${error.message}`);

    const out: Record<string, string[][]> = {};
    for (const row of data ?? []) {
      const city = String(row.city ?? "").trim();
      if (!city) continue;
      const pageIndex = Number(row.page_index ?? 0);
      const areaName = String(row.area_name ?? "").trim();
      if (!areaName) continue;

      if (!out[city]) out[city] = [];
      while (out[city].length <= pageIndex) out[city].push([]);
      out[city][pageIndex].push(areaName);
    }

    return out;
  }

  return null;
}

export async function writeSiteDataToSupabase(file: AllowedFile, value: unknown): Promise<void> {
  const supabase = getSupabaseAdminClient();

  if (file === "faq.json") {
    const rows = asArray<Record<string, unknown>>(value).map((item) => ({
      question: String(item.question ?? ""),
      answer: String(item.answer ?? ""),
    }));
    await clearTable("faq");
    if (!rows.length) return;
    const { error } = await supabase.from("faq").insert(rows);
    if (error) throw new Error(`Failed to write ${file} to Supabase: ${error.message}`);
    return;
  }

  if (file === "blog.json") {
    const rows = asArray<Record<string, unknown>>(value).map((item, index) => ({
      id: typeof item.id === "number" ? item.id : index + 1,
      slug: String(item.slug ?? `post-${index + 1}`),
      title: String(item.title ?? ""),
      excerpt: item.excerpt ?? null,
      category: item.category ?? null,
      readTime: item.readTime ?? null,
      publishedAt: item.publishedAt ?? null,
      image: item.image ?? null,
      content: item.content ?? null,
    }));
    await clearTable("blog");
    if (!rows.length) return;
    const { error } = await supabase.from("blog").insert(rows);
    if (error) throw new Error(`Failed to write ${file} to Supabase: ${error.message}`);
    return;
  }

  if (file === "locations.json") {
    const obj = asObject(value);
    const rows = Object.entries(obj).map(([slug, raw]) => {
      const item = asObject(raw);
      return {
        slug,
        name: String(item.name ?? ""),
        region: String(item.region ?? ""),
        description: String(item.description ?? ""),
        mapEmbedUrl: String(item.mapEmbedUrl ?? ""),
        subAreas: asArray(item.subAreas),
      };
    });

    const { error: delError } = await supabase.from("locations").delete().not("slug", "is", null);
    if (delError) throw new Error(`Failed to clear locations: ${delError.message}`);
    if (!rows.length) return;
    const { error } = await supabase.from("locations").insert(rows);
    if (error) throw new Error(`Failed to write ${file} to Supabase: ${error.message}`);
    return;
  }

  if (file === "brands.json") {
    const obj = asObject(value);
    const rows = Object.entries(obj).map(([slug, raw]) => {
      const item = asObject(raw);
      return {
        slug,
        title: String(item.title ?? ""),
        description: String(item.description ?? ""),
        image: String(item.image ?? ""),
        premium: Boolean(item.premium),
      };
    });

    const { error: delError } = await supabase.from("brands").delete().not("slug", "is", null);
    if (delError) throw new Error(`Failed to clear brands: ${delError.message}`);
    if (!rows.length) return;
    const { error } = await supabase.from("brands").insert(rows);
    if (error) throw new Error(`Failed to write ${file} to Supabase: ${error.message}`);
    return;
  }

  if (file === "contact.json") {
    const item = asObject(value);
    const row = {
      phone: String(item.phone ?? ""),
      phoneHref: String(item.phoneHref ?? ""),
      email: String(item.email ?? ""),
      location: String(item.location ?? ""),
      socialMedia: asArray(item.socialMedia),
      reviews: asObject(item.reviews),
    };
    await clearTable("contact");
    const { error } = await supabase.from("contact").insert([row]);
    if (error) throw new Error(`Failed to write ${file} to Supabase: ${error.message}`);
    return;
  }

  if (file === "metadata.json") {
    const item = asObject(value);
    const row = {
      title: String(item.title ?? ""),
      description: item.description ?? null,
      keywords: item.keywords ?? null,
    };
    await clearTable("metadata");
    const { error } = await supabase.from("metadata").insert([row]);
    if (error) throw new Error(`Failed to write ${file} to Supabase: ${error.message}`);
    return;
  }

  if (file === "service-details.json") {
    const obj = asObject(value);
    const rows = Object.entries(obj).map(([slug, raw]) => {
      const item = asObject(raw);
      return {
        slug,
        title: String(item.title ?? ""),
        description: String(item.description ?? ""),
        image: item.image ?? null,
      };
    });

    const { error: delError } = await supabase.from("service_details").delete().not("slug", "is", null);
    if (delError) throw new Error(`Failed to clear service_details: ${delError.message}`);
    if (!rows.length) return;
    const { error } = await supabase.from("service_details").insert(rows);
    if (error) throw new Error(`Failed to write ${file} to Supabase: ${error.message}`);
    return;
  }

  if (file === "services-commercial.json") {
    const rows = asArray<Record<string, unknown>>(value).map((item) => ({
      title: String(item.title ?? ""),
      description: String(item.description ?? ""),
      href: String(item.href ?? ""),
      icon: String(item.icon ?? ""),
    }));
    await clearTable("services_commercial");
    if (!rows.length) return;
    const { error } = await supabase.from("services_commercial").insert(rows);
    if (error) throw new Error(`Failed to write ${file} to Supabase: ${error.message}`);
    return;
  }

  if (file === "services-residential.json") {
    const rows = asArray<Record<string, unknown>>(value).map((item) => ({
      title: String(item.title ?? ""),
      description: String(item.description ?? ""),
      href: String(item.href ?? ""),
      icon: String(item.icon ?? ""),
    }));
    await clearTable("services_residential");
    if (!rows.length) return;
    const { error } = await supabase.from("services_residential").insert(rows);
    if (error) throw new Error(`Failed to write ${file} to Supabase: ${error.message}`);
    return;
  }

  if (file === "testimonials.json") {
    const rows = asArray<Record<string, unknown>>(value).map((item) => ({
      initials: item.initials ? String(item.initials) : null,
      name: String(item.name ?? ""),
      location: item.location ? String(item.location) : null,
      text: String(item.text ?? ""),
      avatar: item.avatar ? String(item.avatar) : null,
    }));
    await clearTable("testimonials");
    if (!rows.length) return;
    const { error } = await supabase.from("testimonials").insert(rows);
    if (error) throw new Error(`Failed to write ${file} to Supabase: ${error.message}`);
    return;
  }

  if (file === "why.json") {
    const item = asObject(value);
    const rows = asArray<Record<string, unknown>>(item.features).map((feature) => ({
      title: String(feature.title ?? ""),
      description: String(feature.description ?? ""),
      icon: String(feature.icon ?? ""),
    }));

    await clearTable("why");
    if (!rows.length) return;

    const { error } = await supabase.from("why").insert(rows);
    if (error) throw new Error(`Failed to write ${file} to Supabase: ${error.message}`);
    return;
  }

  if (file === "areas.json") {
    const obj = asObject(value);
    const rows = [] as Array<{ city: string; page_index: number; area_name: string }>;
    for (const [city, pages] of Object.entries(obj)) {
      if (!Array.isArray(pages)) continue;
      pages.forEach((page, pageIndex) => {
        if (!Array.isArray(page)) return;
        page.forEach((area) => {
          rows.push({ city, page_index: pageIndex, area_name: String(area) });
        });
      });
    }
    await clearTable("areas");
    if (!rows.length) return;
    const { error } = await supabase.from("areas").insert(rows);
    if (error) throw new Error(`Failed to write ${file} to Supabase: ${error.message}`);
  }
}
