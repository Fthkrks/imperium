import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import blogPosts from "@/data/blog.json";
import { type BlogPost } from "@/components/BlogCard";
import { BlogPostClient } from "./BlogPostClient";

const posts = blogPosts as BlogPost[];

type PageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = posts.find((entry) => entry.slug === slug);

	if (!post) {
		return {
			title: "Post Not Found - RAFIX Appliance Repair",
			description: "Requested blog article could not be found.",
		};
	}

	return {
		title: `${post.title} - RAFIX Appliance Repair`,
		description: post.excerpt,
	};
}

export default async function BlogDetailPage({ params }: PageProps) {
	const { slug } = await params;
	const post = posts.find((entry) => entry.slug === slug);

	if (!post) notFound();

	return (
		<SiteShell>
			<BlogPostClient post={post} />
		</SiteShell>
	);
}