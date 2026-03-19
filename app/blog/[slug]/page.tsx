import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import blogPosts from "@/data/blog.json";
import { type BlogPost } from "@/components/BlogCard";

const posts = blogPosts as BlogPost[];

type PageProps = {
	params: Promise<{ slug: string }>;
};

function formatDate(input: string) {
	const date = new Date(input);
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date);
}

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
			<article className="w-full bg-white min-h-screen pt-24 pb-32 font-sans text-[#242424]">
				<div className="max-w-[680px] mx-auto px-5">
					<div className="flex items-center gap-2 mb-4">
						<span className="text-sm text-gray-500 font-medium tracking-wide">Published in</span>
						<span className="text-sm font-semibold bg-gray-100 px-2 py-0.5 rounded-full">{post.category}</span>
					</div>

					<h1 className="text-[40px] md:text-[46px] font-extrabold leading-[1.1] mb-4 text-black tracking-tight" style={{ wordBreak: 'break-word' }}>
						{post.title}
					</h1>

					<p className="text-xl md:text-[22px] text-[#6B6B6B] leading-tight mb-8 font-normal">
						{post.excerpt}
					</p>

					<div className="flex items-center gap-4 mb-8">
						<div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#1A8917] to-green-400 p-0.5 flex-shrink-0">
							<div className="w-full h-full rounded-full bg-white border-2 border-white overflow-hidden flex items-center justify-center">
								<span className="font-bold text-sm text-[#1A8917]">RA</span>
							</div>
						</div>

						<div className="flex flex-col">
							<div className="flex items-center gap-2">
								<span className="font-medium text-black">RAFIX Team</span>
								<span className="text-sm text-[#1A8917] font-medium cursor-pointer hover:underline">Follow</span>
							</div>
							<div className="flex items-center gap-2 text-[13px] text-[#6B6B6B]">
								<span>{post.readTime}</span>
								<span>·</span>
								<span>{formatDate(post.publishedAt)}</span>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between border-y border-gray-100 py-3 mb-10 px-1">
						<div className="flex items-center gap-6 text-[#6B6B6B]">
							<button className="flex items-center gap-1.5 hover:text-black transition-colors">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M12.5 4.5l-2.5 3h5l-2.5-3z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M15.5 8.5C14.5 9.5 13 9.5 12 9.5C11 9.5 9.5 9.5 8.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M12 9.5V13" stroke="currentColor" />
									<path d="M7 10L5 12C3.89543 13.1046 3.89543 14.8954 5 16C6.10457 17.1046 7.89543 17.1046 9 16L11 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M17 10L19 12C20.1046 13.1046 20.1046 14.8954 19 16C17.8954 17.1046 16.1046 17.1046 15 16L13 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								<span className="text-[13px]">1.2K</span>
							</button>
							<button className="flex items-center gap-1.5 hover:text-black transition-colors">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								<span className="text-[13px]">89</span>
							</button>
						</div>

						<div className="flex items-center gap-5 text-[#6B6B6B]">
							<button className="hover:text-black transition-colors">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>
							<button className="hover:text-black transition-colors">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
									<circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
									<circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
								</svg>
							</button>
						</div>
					</div>

					<figure className="mb-14 outline-none">
						<img
							alt={post.title}
							src={post.image}
							className="w-full h-auto aspect-[16/9] object-cover rounded-sm border border-gray-100"
						/>
					</figure>

					<div className="font-serif text-[20px] leading-[1.65] text-[#242424] space-y-8 tracking-[-0.003em]">
						<p className="first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:pr-2 first-letter:-mt-2 first-letter:text-black first-letter:font-serif">
							From maintaining the perfect cooling cycle in your refrigerator to ensuring your washer spins without a hitch, consistent appliance care can drastically prevent major breakdowns. When you identify the early warning signs of appliance wear and tear, you save both time and heavy repair costs down the line.
						</p>

						<h2 className="font-sans text-[26px] font-bold text-black mt-12 mb-4">Why Maintenance Matters</h2>

						<p>
							Neglecting minor glitches like a noisy motor, slow draining, or uneven temperatures can force appliance components to overwork themselves. A small part replacement today is significantly cheaper than a full compressor or motor replacement tomorrow.
						</p>

						<blockquote className="border-l-[3px] border-black pl-5 py-2 my-10 italic text-[24px] text-[#242424] font-serif leading-relaxed">
							"An ounce of prevention is worth a pound of cure, especially when it comes to the heart of your home."
						</blockquote>

						<p>
							Always refer to your appliance manual for specific care requirements. Regularly cleaning filters, coils, and checking door seals are simple but highly effective ways to extend appliance lifespan.
						</p>

						<h2 className="font-sans text-[26px] font-bold text-black mt-12 mb-4">When to Call a Professional</h2>

						<p>
							This article is part of RAFIX's practical maintenance guides. We believe in empowering homeowners with the right knowledge. While self-maintenance is encouraged, we advise leaving complex electrical and mechanical repairs to certified professionals to avoid voiding warranties or causing further damage.
						</p>
					</div>

					<div className="flex items-center justify-between border-y border-gray-100 py-3 mt-14 mb-16 px-1">
						<div className="flex items-center gap-6 text-[#6B6B6B]">
							<button className="flex items-center gap-1.5 hover:text-black transition-colors">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M12.5 4.5l-2.5 3h5l-2.5-3z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M15.5 8.5C14.5 9.5 13 9.5 12 9.5C11 9.5 9.5 9.5 8.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M12 9.5V13" stroke="currentColor" />
									<path d="M7 10L5 12C3.89543 13.1046 3.89543 14.8954 5 16C6.10457 17.1046 7.89543 17.1046 9 16L11 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M17 10L19 12C20.1046 13.1046 20.1046 14.8954 19 16C17.8954 17.1046 16.1046 17.1046 15 16L13 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								<span className="text-[13px]">1.2K</span>
							</button>
							<button className="flex items-center gap-1.5 hover:text-black transition-colors">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								<span className="text-[13px]">89</span>
							</button>
						</div>

						<div className="flex items-center gap-5 text-[#6B6B6B]">
							<button className="hover:text-black transition-colors">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M4 12V20C4 20.5523 4.44772 21 5 21H13C13.5523 21 14 20.5523 14 20V12C14 11.4477 13.5523 11 13 11H5C4.44772 11 4 11.4477 4 12Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M10 11V7C10 5.34315 11.3431 4 13 4H17C18.6569 4 20 5.34315 20 7V15C20 16.6569 18.6569 18 17 18H14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>
							<button className="hover:text-black transition-colors">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>
							<button className="hover:text-black transition-colors">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
									<circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
									<circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
								</svg>
							</button>
						</div>
					</div>

					<div className="bg-[#f9f9f9] p-8 mt-10 rounded-sm">
						<div className="flex flex-col md:flex-row gap-8 items-start justify-between">
							<div className="w-full md:w-1/2">
								<div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white font-bold text-xl mb-4">
									RA
								</div>
								<h3 className="text-2xl font-bold font-sans tracking-tight mb-2 text-black">Written by RAFIX Team</h3>
								<p className="text-gray-600 mb-4 font-sans text-sm pr-4">Professional appliance repair tips, maintenance guides, and expert advice for homeowners.</p>
								<div className="flex gap-3">
									<button className="bg-black text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors">Follow</button>
								</div>
							</div>

							<div className="w-full md:w-1/2 bg-white p-6 border border-gray-200">
								<h4 className="font-bold text-lg mb-2 text-black font-sans">Need immediate assistance?</h4>
								<p className="text-gray-600 text-sm mb-4 font-sans">Schedule a professional diagnosis with our certified technicians today.</p>
								<Link href="/#contact" className="inline-block border border-black text-black px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors text-center w-full">
									Book Service
								</Link>
							</div>
						</div>
					</div>
				</div>
			</article>
		</SiteShell>
	);
}