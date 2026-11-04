import { createHash, timingSafeEqual } from "node:crypto";
import { SITE_URL } from "./business";

export type PublishStatus = "draft" | "publish";
export type PublishTarget =
  | { kind: "blog"; path: string; slug: string }
  | { kind: "file"; path: "/llms.txt" | "/llms-full.txt" };

export type SeoPage = {
  op: "create" | "update";
  url: string;
  title?: string;
  meta_description?: string;
  content_md?: string;
  json_ld: Record<string, unknown>[];
  internal_links: { url: string; anchor: string }[];
  unique_facts: string[];
  author?: { name: string; bio_url: string };
  sources: string[];
  reason?: string;
  status: PublishStatus;
};

export class SeoPublishError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function isValidPublishToken(authorization: string | null, expected: string | undefined): boolean {
  if (!expected?.trim()) return false;
  const candidate = authorization?.match(/^Bearer ([^\s]+)$/i)?.[1];
  if (!candidate) return false;
  // Fixed-length digests avoid leaking token length through the comparison.
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(candidate), digest(expected));
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isText(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.length <= maxLength && !value.includes("\0");
}

function isWebUrl(value: unknown): value is string {
  if (!isText(value, 2048)) return false;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function getPublishTarget(value: string): PublishTarget {
  if (!isWebUrl(value)) throw new SeoPublishError(400, "page.url must be an absolute HTTP(S) URL.");
  const url = new URL(value);
  const site = new URL(SITE_URL);
  if (url.host !== site.host || url.protocol !== site.protocol || url.search || url.hash) {
    throw new SeoPublishError(400, `page.url must use ${SITE_URL} without a query or fragment.`);
  }
  if (url.pathname === "/llms.txt" || url.pathname === "/llms-full.txt") {
    return { kind: "file", path: url.pathname };
  }
  const slug = url.pathname.match(/^\/blog\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/)?.[1];
  if (slug && slug.length <= 200) return { kind: "blog", path: `/blog/${slug}`, slug };
  // shortcut: services/brands/locations have a different data shape; extend when needed.
  throw new SeoPublishError(400, "Unsupported path. Only /blog/<slug>, /llms.txt, and /llms-full.txt are supported.");
}

export function validatePublishPage(body: unknown): SeoPage {
  if (!isObject(body) || !isObject(body.page)) throw new SeoPublishError(400, "Expected a JSON object containing page.");
  const page = body.page;
  const invalid = (message: string): never => { throw new SeoPublishError(400, message); };
  if (page.op !== "create" && page.op !== "update") invalid('page.op must be "create" or "update".');
  if (page.status !== "draft" && page.status !== "publish") invalid('page.status must be "draft" or "publish".');
  if (!isText(page.url, 2048)) invalid("page.url must be a URL string.");
  const target = getPublishTarget(page.url as string);
  for (const [field, maxLength] of [["title", 500], ["meta_description", 5000], ["content_md", 500000], ["reason", 5000]] as const) {
    if (page[field] !== undefined && !isText(page[field], maxLength)) invalid(`page.${field} must be a string of at most ${maxLength} characters.`);
  }
  if (page.title !== undefined && !(page.title as string).trim()) invalid("page.title cannot be blank.");
  if (target.kind === "blog" && page.op === "create" && (!page.title || !(page.content_md as string | undefined)?.trim())) {
    invalid("Creating a blog post requires title and nonempty content_md.");
  }
  if (target.kind === "file" && !(page.content_md as string | undefined)?.trim()) invalid("Writing a site file requires nonempty content_md.");
  if (!Array.isArray(page.json_ld) || page.json_ld.length > 50 || !page.json_ld.every(isObject)) invalid("page.json_ld must be an array of up to 50 objects.");
  if (!Array.isArray(page.internal_links) || page.internal_links.length > 200 || !page.internal_links.every((link) => {
    if (!isObject(link) || !isText(link.url, 2048) || !isText(link.anchor, 500) || !link.anchor.trim()) return false;
    try {
      const url = new URL(link.url, SITE_URL);
      return url.origin === new URL(SITE_URL).origin && !url.username && !url.password;
    } catch { return false; }
  })) invalid("page.internal_links must contain internal URLs and nonempty anchors (up to 200).");
  if (!Array.isArray(page.unique_facts) || page.unique_facts.length > 200 || !page.unique_facts.every((fact) => isText(fact, 5000) && fact.trim())) {
    invalid("page.unique_facts must be an array of up to 200 nonempty strings.");
  }
  if (!Array.isArray(page.sources) || page.sources.length > 200 || !page.sources.every(isWebUrl)) invalid("page.sources must be an array of up to 200 HTTP(S) URLs.");
  if (page.author !== undefined && (!isObject(page.author) || !isText(page.author.name, 200) || !page.author.name.trim() || !isWebUrl(page.author.bio_url))) {
    invalid("page.author must contain a nonempty name and HTTP(S) bio_url.");
  }
  return page as SeoPage;
}

export function getReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export function getPublishJsonLdChanges(
  page: Pick<SeoPage, "op" | "json_ld" | "content_md">,
): Pick<Partial<SeoPage>, "json_ld"> {
  // The client defaults omitted JSON-LD to []; preserve it for metadata-only updates.
  return page.op === "create" || page.json_ld.length > 0 || page.content_md !== undefined
    ? { json_ld: page.json_ld }
    : {};
}

export function decidePublishStatus(
  page: Pick<SeoPage, "op" | "status">,
  target: PublishTarget,
  allowLivePublish: string | undefined,
  existingStatus: PublishStatus | null = null,
): PublishStatus {
  const liveAllowed = page.status === "publish" && allowLivePublish === "1";
  if (target.kind === "file") {
    if (!liveAllowed) throw new SeoPublishError(409, "Site files have no draft state; live publishing must be explicitly enabled.");
    return "publish";
  }
  if (page.op === "create" && existingStatus !== null) throw new SeoPublishError(409, "A blog post with this slug already exists.");
  if (page.op === "update" && existingStatus === null) throw new SeoPublishError(404, "Blog post not found.");
  if (page.op === "update" && existingStatus === "publish" && !liveAllowed) {
    throw new SeoPublishError(409, "A published post can only be edited with live publishing explicitly enabled.");
  }
  return liveAllowed ? "publish" : "draft";
}
