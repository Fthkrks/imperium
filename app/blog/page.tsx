import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { getSiteData } from "@/lib/redis-fetch";
import { BlogCard, type BlogPost } from "@/components/BlogCard";
import { BlogContent } from "@/components/blog/BlogContent";

export const metadata: Metadata = {
  title: "Blog - mperium Appliance",
  description:
    "Read practical maintenance tips and appliance repair insights from mperium Appliance technicians.",
};

export default async function BlogPage() {
  const posts = (await getSiteData("blog.json")) as BlogPost[] || [];
  return (
    <SiteShell forceSolidHeader>
      {/* Hero Section */}
      <section className="relative w-full  py-24 lg:py-32 flex flex-col items-center justify-center overflow-hidden">

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[#7BC7FF]/30 bg-[#7BC7FF]/10 text-[#7BC7FF] text-xs md:text-sm font-bold uppercase tracking-widest backdrop-blur-sm mb-6 shadow-sm">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path></svg>
            Our Blog
          </div>

          <h1 className="text-4xl text-[#0E3C66] md:text-5xl lg:text-6xl font-extrabold tracking-tight  mb-6 m-0 p-0 leading-[1.1]">
            Appliance Repair Insights
          </h1>

          <p className="text-lg md:text-xl text-[#0E3C66]  font-light leading-relaxed m-0 p-0 max-w-2xl">
            Helpful guides from our certified technicians to troubleshoot common issues,
            maintain efficiency, and extend the lifespan of your home appliances.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 my-10! bg-[#f8fafc]">
        <div className="container">
          <BlogContent posts={posts} />
        </div>
      </section>
    </SiteShell>
  );
}
