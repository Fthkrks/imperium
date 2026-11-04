import assert from "node:assert/strict";
import test from "node:test";
import { SITE_URL } from "./business";
import { renderBlogMarkdown } from "./blog-markdown";
import {
  decidePublishStatus,
  getPublishJsonLdChanges,
  getPublishTarget,
  getReadTime,
  isValidPublishToken,
  SeoPublishError,
  validatePublishPage,
} from "./seo-publish";

const blog = getPublishTarget(`${SITE_URL}/blog/test-post`);
const create = { op: "create", status: "publish" } as const;
const update = { op: "update", status: "publish" } as const;
const fails = (status: number) => (error: unknown) => error instanceof SeoPublishError && error.status === status;

test("bearer comparison fails closed, including missing configuration and malformed tokens", () => {
  assert.equal(isValidPublishToken("Bearer test-token", "test-token"), true);
  for (const header of [null, "test-token", "Bearer wrong", "Bearer test-token extra", "Bearer test-token\n"]) {
    assert.equal(isValidPublishToken(header, "test-token"), false);
  }
  assert.equal(isValidPublishToken("Bearer test-token", undefined), false);
  assert.equal(isValidPublishToken("Bearer test-token", " "), false);
});

test("routing rejects unsupported paths, other hosts, credentials, queries, fragments, and encoded slugs with 400", () => {
  assert.deepEqual(blog, { kind: "blog", path: "/blog/test-post", slug: "test-post" });
  for (const url of ["/blog/test", "https://example.com/blog/test", `${SITE_URL}/services/refrigerator-repair`, `${SITE_URL}/blog`, `${SITE_URL}/blog/a/b`, `${SITE_URL}/blog/%3Cscript%3E`, `${SITE_URL}/blog/test?preview=1`, `${SITE_URL}/blog/test#part`, "https://user@www.imperiumappliance.com/blog/test"]) {
    assert.throws(() => getPublishTarget(url), fails(400));
  }
});

test("creates default to draft; only the exact live flag and publish request publish", () => {
  assert.equal(decidePublishStatus(create, blog, undefined), "draft");
  assert.equal(decidePublishStatus(create, blog, "true"), "draft");
  assert.equal(decidePublishStatus(create, blog, "1"), "publish");
  assert.equal(decidePublishStatus({ ...create, status: "draft" }, blog, "1"), "draft");
  assert.throws(() => decidePublishStatus(create, blog, "1", "draft"), fails(409));
  assert.throws(() => decidePublishStatus(create, blog, undefined, "publish"), fails(409));
});

test("updates return 404 for missing posts and 409 for unapproved changes to published posts", () => {
  assert.throws(() => decidePublishStatus(update, blog, "1"), fails(404));
  assert.throws(() => decidePublishStatus(update, blog, undefined, "publish"), fails(409));
  assert.throws(() => decidePublishStatus({ ...update, status: "draft" }, blog, "1", "publish"), fails(409));
  assert.equal(decidePublishStatus(update, blog, "1", "publish"), "publish");
  assert.equal(decidePublishStatus(update, blog, undefined, "draft"), "draft");
  assert.equal(decidePublishStatus(update, blog, "1", "draft"), "publish");
});

test("both llms files return 409 unless live publishing is explicitly allowed", () => {
  for (const path of ["/llms.txt", "/llms-full.txt"]) {
    const target = getPublishTarget(`${SITE_URL}${path}`);
    assert.throws(() => decidePublishStatus(create, target, undefined), fails(409));
    assert.throws(() => decidePublishStatus({ ...update, status: "draft" }, target, "1"), fails(409));
    assert.equal(decidePublishStatus(update, target, "1"), "publish");
  }
});

test("manual validation rejects invalid fields and accepts partial content updates", () => {
  const page = { ...create, url: `${SITE_URL}/blog/test-post`, title: "Test", content_md: "Text", json_ld: [], internal_links: [], unique_facts: [], sources: [] };
  assert.deepEqual(validatePublishPage({ page }), page);
  for (const bad of [null, {}, { page: [] }, { page: { ...page, status: "live" } }, { page: { ...page, title: " " } }, { page: { ...page, content_md: 12 } }, { page: { ...page, json_ld: [null] } }, { page: { ...page, internal_links: [{ url: "https://elsewhere.com", anchor: "Elsewhere" }] } }, { page: { ...page, sources: ["javascript:alert(1)"] } }, { page: { ...page, author: { name: "Name", bio_url: "bad" } } }]) {
    assert.throws(() => validatePublishPage(bad), fails(400));
  }
  const partial = validatePublishPage({ page: { ...page, op: "update", title: undefined, content_md: undefined } });
  assert.equal(partial.content_md, undefined);
  assert.equal(partial.title, undefined);
});

test("read time uses the existing min read format at 200 words per minute", () => {
  assert.equal(getReadTime(""), "1 min read");
  assert.equal(getReadTime("word ".repeat(200)), "1 min read");
  assert.equal(getReadTime("word ".repeat(201)), "2 min read");
});

test("title-only updates omit JSON-LD so existing structured data is preserved", () => {
  const page = { ...update, title: "Updated title", json_ld: [] };
  assert.deepEqual(getPublishJsonLdChanges(page), {});
});

test("body updates write empty JSON-LD, including when the body is empty", () => {
  for (const content_md of ["Replacement body", ""]) {
    assert.deepEqual(getPublishJsonLdChanges({ ...update, content_md, json_ld: [] }), { json_ld: [] });
  }
});

test("updates with nonempty JSON-LD write it without a body update", () => {
  const json_ld = [{ "@type": "Article", headline: "Updated title" }];
  assert.deepEqual(getPublishJsonLdChanges({ ...update, json_ld }), { json_ld });
});

test("creates always write JSON-LD", () => {
  for (const json_ld of [[], [{ "@type": "Article" }]]) {
    assert.deepEqual(getPublishJsonLdChanges({ ...create, json_ld }), { json_ld });
  }
});

test("markdown renders headings, links, tables, fenced blocks, and existing quote callouts", () => {
  const html = renderBlogMarkdown('## Heading\n\n[Service](/services)\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\n"Keep this quote."\n\n```text\nfirst\n\nlast\n```');
  for (const text of ["<h2>Heading</h2>", '<a href="/services">Service</a>', "<table>", "<blockquote>Keep this quote.</blockquote>", 'first\n\nlast']) assert.ok(html.includes(text));
});

test("markdown escapes raw HTML and rejects executable link/image schemes", () => {
  const html = renderBlogMarkdown('<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n[x](javascript:alert%281%29) ![x](data:image/svg+xml,test)\n\n[x](java&#x73;cript:alert%281%29)\n\n[x](https://example.com "x\\\" onmouseover=alert(1)")');
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(html.includes("&lt;img"));
  assert.ok(!html.includes("<script"));
  assert.ok(!html.includes("<img"));
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(!html.includes('href="java&#x73;cript:'));
  assert.ok(!html.includes('" onmouseover='));
});

test("pre-migration reads keep legacy posts public, hide drafts everywhere, and block admin deletion", async (t) => {
  const oldUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const oldKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  process.env.NEXT_PUBLIC_SUPABASE_URL = "http://127.0.0.1:9";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-only-key";
  t.after(() => {
    if (oldUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = oldUrl;
    if (oldKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = oldKey;
  });
  let rows: Record<string, unknown>[] = [{ id: 1, slug: "legacy", title: "Legacy", content: "Text" }];
  let reads = 0;
  t.mock.method(globalThis, "fetch", async (input: string | URL | Request, init?: RequestInit) => {
    // Every request is intercepted; this test never contacts a database.
    assert.equal(init?.method ?? "GET", "GET", "No destructive request may precede the schema check");
    const url = new URL(input instanceof Request ? input.url : input);
    assert.equal(url.origin, "http://127.0.0.1:9");
    reads += 1;
    let data: unknown = [];
    let status = 200;
    if (url.pathname.endsWith("/blog")) {
      if (url.searchParams.get("select") === "status,json_ld") {
        data = { code: "42703", message: "column blog.status does not exist" };
        status = 400;
      } else {
        assert.equal(url.searchParams.get("select"), "*");
        data = rows;
      }
    } else if (url.pathname.endsWith("/site_files")) {
      data = { code: "PGRST205", message: "Table not found" };
      status = 404;
    }
    return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
  });
  const { readSiteDataFromSupabase, writeSiteDataToSupabase } = await import("./site-data-store");
  const { getSiteData, getAllSiteData } = await import("./redis-fetch");
  const { serveSiteFile } = await import("./site-files");
  const { default: sitemap } = await import("../app/sitemap");
  const admin = await readSiteDataFromSupabase("blog.json") as Record<string, unknown>[];
  assert.equal(admin[0].status, "publish");
  assert.deepEqual(admin[0].json_ld, []);
  assert.equal((await getSiteData("blog.json") as unknown[]).length, 1);
  rows = [...rows, { id: 2, slug: "draft-secret", status: "draft", json_ld: [] }];
  assert.equal((await readSiteDataFromSupabase("blog.json") as unknown[]).length, 2);
  assert.equal((await getSiteData("blog.json") as unknown[]).length, 1);
  assert.equal(((await getAllSiteData()).blog as unknown[]).length, 1);
  assert.ok(!(await sitemap()).some(({ url }) => url.includes("draft-secret")));
  await assert.rejects(writeSiteDataToSupabase("blog.json", admin), /migration before saving/);
  assert.equal((await serveSiteFile("/llms.txt")).status, 404);
  assert.ok(reads > 0);
});
