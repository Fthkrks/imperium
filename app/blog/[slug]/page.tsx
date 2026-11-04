import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { getSiteData } from "@/lib/redis-fetch";
import { type BlogPost } from "@/components/BlogCard";
import { BlogPostClient } from "./BlogPostClient";
import { BlogPostSeo } from "@/components/SeoBlocks";
import { BLOG_SERVICE } from "@/lib/seo-content";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	const posts = (await getSiteData("blog.json")) as BlogPost[] || [];
	return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const posts = (await getSiteData("blog.json")) as BlogPost[] || [];
	const { slug } = await params;
	const post = posts.find((entry) => entry.slug === slug);

	if (!post) {
		return {
			title: "Post Not Found - Imperium Appliance Repair",
			description: "Requested blog article could not be found.",
		};
	}

	return {
		title: `${post.title} - Imperium Appliance Repair`,
		description: post.excerpt,
		alternates: { canonical: `/blog/${slug}` },
	};
}

export default async function BlogDetailPage({ params }: PageProps) {
	const posts = (await getSiteData("blog.json")) as BlogPost[] || [];
	const { slug } = await params;
	const post = posts.find((entry) => entry.slug === slug);

	if (!post) notFound();

	return (
		<SiteShell forceSolidHeader={true}>
			{post.json_ld.length > 0 && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(post.json_ld).replace(/</g, "\\u003c") }}
				/>
			)}
			<BlogPostClient post={post} />
			<BlogPostSeo
				title={post.title}
				description={post.excerpt}
				slug={post.slug}
				image={post.image}
				publishedAt={post.publishedAt}
				serviceKey={BLOG_SERVICE[post.slug]}
			/>
		</SiteShell>
	);
}
