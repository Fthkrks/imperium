import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { getSiteData } from "@/lib/redis-fetch";
import { type BlogPost } from "@/components/BlogCard";
import { BlogPostClient } from "./BlogPostClient";

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
			title: "Post Not Found - mperium Appliance",
			description: "Requested blog article could not be found.",
		};
	}

	return {
		title: `${post.title} - mperium Appliance`,
		description: post.excerpt,
	};
}

export default async function BlogDetailPage({ params }: PageProps) {
	const posts = (await getSiteData("blog.json")) as BlogPost[] || [];
	const { slug } = await params;
	const post = posts.find((entry) => entry.slug === slug);

	if (!post) notFound();

	return (
		<SiteShell forceSolidHeader={true}>
			<BlogPostClient post={post} />
		</SiteShell>
	);
}