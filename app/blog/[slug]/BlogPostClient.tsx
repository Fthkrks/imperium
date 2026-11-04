"use client";

import { type BlogPost } from "@/components/BlogCard";
import { renderBlogMarkdown } from "@/lib/blog-markdown";

function formatDate(input: string) {
	const date = new Date(input);
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date);
}

export function BlogPostClient({ post }: { post: BlogPost }) {
	return (
		<article className="blog">
			<div className="container">


				{/* Title */}
				<h1 className="title">{post.title}</h1>

				{/* Subtitle */}
				<p className="subtitle">{post.excerpt}</p>

				{/* Author */}
				<div className="author">
					<div className="avatar"></div>
					<div>
						<div className="author-top">
							<span className="name">Imperium Appliance Repair Team</span>
						</div>
						<div className="meta">
							{post.readTime} · {formatDate(post.publishedAt)}
						</div>
					</div>
				</div>

				{/* Image */}
				<figure className="image">
					<img src={post.image} alt={post.title} />
				</figure>

				{/* Content */}
				<div className="content" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(post.content) }} />
			</div>

			<style jsx>{`
				.blog {
					background: white;
					min-height: 100vh;
					padding: 80px 0 120px;
					color: #242424;
				}

				.container {
					max-width: 680px;
					margin: 0 auto;
					padding: 0 20px;
				}

				/* Publication */
				.publication {
					display: flex;
					gap: 12px;
					align-items: center;
					margin-bottom: 20px;
				}

				.logo {
					width: 32px;
					height: 32px;
					background: #0f172a;
					color: white;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 12px;
					font-weight: bold;
				}

				.pub-title {
					font-size: 14px;
					font-weight: 500;
				}

				.pub-follow {
					font-size: 12px;
					color: #6b6b6b;
					cursor: pointer;
				}

				/* Badge */
				.badge {
					display: inline-block;
					font-size: 12px;
					background: #f2f2f2;
					padding: 6px 10px;
					border-radius: 20px;
					margin-bottom: 16px;
				}

				/* Title */
				.title {
					font-size: 48px;
					font-weight: 800;
					line-height: 1.1;
					margin-bottom: 16px;
				}

				/* Subtitle */
				.subtitle {
					font-size: 22px;
					color: #6b6b6b;
					margin-bottom: 32px;
				}

				/* Author */
				.author {
					display: flex;
					gap: 12px;
					align-items: center;
					margin-bottom: 20px;
				}

				.avatar {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					background: #ddd;
				}

				.author-top {
					display: flex;
					gap: 8px;
					align-items: center;
				}

				.name {
					font-size: 14px;
					font-weight: 500;
				}

				.follow {
					font-size: 14px;
					color: #1a8917;
					cursor: pointer;
				}

				.meta {
					font-size: 12px;
					color: #6b6b6b;
				}

				/* Actions */
				.actions {
					display: flex;
					justify-content: space-between;
					border-top: 1px solid #eee;
					border-bottom: 1px solid #eee;
					padding: 10px 0;
					margin-bottom: 40px;
					font-size: 14px;
					color: #6b6b6b;
				}

				.actions div {
					display: flex;
					gap: 20px;
				}

				/* Image */
				.image img {
					width: 100%;
					border-radius: 4px;
				}

				.image {
					margin-bottom: 40px;
				}

				/* Content */
				.content {
					font-family: Georgia, serif;
					font-size: 20px;
					line-height: 1.75;
				}

				.content :global(p) {
					margin-bottom: 24px;
				}

				.content :global(> p:first-child)::first-letter {
					font-size: 60px;
					font-weight: bold;
					float: left;
					margin-right: 8px;
					line-height: 1;
				}

				.content :global(blockquote) {
					border-left: 4px solid black;
					padding-left: 16px;
					font-size: 24px;
					font-style: italic;
					margin: 40px 0;
				}

				.content :global(h1), .content :global(h2), .content :global(h3),
				.content :global(h4), .content :global(h5), .content :global(h6) {
					font-weight: bold;
					line-height: 1.3;
					margin: 32px 0 16px;
				}

				.content :global(h1) { font-size: 32px; }
				.content :global(h2) {
					margin: 32px 0 12px;
					color: #0e3c66;
					font-size: 24px;
					font-weight: 700;
					line-height: 1.3;
				}
				.content :global(h3) { font-size: 24px; }
				.content :global(a) { color: #11528E; text-decoration: underline; }
				.content :global(ul), .content :global(ol) { padding-left: 28px; margin-bottom: 24px; }
				.content :global(ul) { list-style: disc; }
				.content :global(ol) { list-style: decimal; }
				.content :global(table) { display: block; overflow-x: auto; border-collapse: collapse; margin-bottom: 24px; }
				.content :global(th), .content :global(td) { border: 1px solid #ddd; padding: 8px 12px; }
				.content :global(pre) { overflow-x: auto; background: #f2f2f2; padding: 16px; margin-bottom: 24px; }
				.content :global(img) { max-width: 100%; }
			`}</style>
		</article>
	);
}
