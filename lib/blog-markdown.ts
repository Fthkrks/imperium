import { Marked } from "marked";
import { SITE_URL } from "./business";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function isSafeUrl(href: string, image = false): boolean {
  try {
    const protocol = new URL(href, SITE_URL).protocol;
    return (image ? ["https:", "http:"] : ["https:", "http:", "mailto:", "tel:"]).includes(protocol);
  } catch {
    return false;
  }
}

const markdown = new Marked({
  gfm: true,
  renderer: {
    html({ text }) {
      return escapeHtml(text);
    },
    paragraph({ text, tokens }) {
      // Preserve the existing standalone, double-quoted callouts as plain text.
      const block = text.trim();
      if (block.startsWith('"') && block.endsWith('"')) {
        return `<blockquote>${escapeHtml(block.slice(1, -1))}</blockquote>\n`;
      }
      return `<p>${this.parser.parseInline(tokens)}</p>\n`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      if (!isSafeUrl(href)) return text;
      return `<a href="${escapeHtml(href)}"${title ? ` title="${escapeHtml(title)}"` : ""}>${text}</a>`;
    },
    image({ href, title, text }) {
      if (!isSafeUrl(href, true)) return escapeHtml(text);
      return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}"${title ? ` title="${escapeHtml(title)}"` : ""}>`;
    },
  },
});

export function renderBlogMarkdown(content: string): string {
  return markdown.parse(content, { async: false });
}
