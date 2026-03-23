"use client";

import Link from "next/link";
import { useSiteData } from "@/components/SiteDataContext";
import { BlogCard, type BlogPost } from "@/components/BlogCard";

export default function Blog() {
  const { blog: blogPosts } = useSiteData();
  const homepagePosts = ((blogPosts || []) as BlogPost[]).slice(0, 3);
  return (
    <section className="py-24 bg-gradient-to-b from-[#ffffff] to-[#f2f8ff] relative overflow-hidden" id="blog">
      {/* Abstract Design Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-70 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="container relative z-10">
        <div className="section-header text-center max-w-2xl mx-auto mb-16">
          <span className="label">Our Insights</span>
          <h2 className="mb-4">Latest Repair Tips & Guides</h2>
          <p className="text-gray-600">
            Explore quick guides from our technicians to diagnose common issues,
            prevent costly damage, and keep your appliances running beautifully.
          </p>
        </div>

        {/* CSS Grid is already doing the layout with gap-8, no need for inner margins */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-0">
          {homepagePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="flex justify-center mt-12 mb-8">
          <Link
            className="group flex items-center justify-center text-[#11528E]! hover:text-[#0e3c66]!  text-white font-bold px-8 py-3.5 rounded-full my-10! transition-all duration-300"
            href="/blog"
          >
            Explore All Articles
            <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}