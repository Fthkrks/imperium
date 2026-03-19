import Link from "next/link";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  image: string;
  content: string;
};

function formatDate(input: string) {
  const date = new Date(input);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group bg-white rounded-3xl border border-gray-100/80 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(26,58,102,0.12)] hover:-translate-y-2 transition-all duration-400 flex flex-col h-full">
      <Link href={`/blog/${post.slug}`} className="block relative h-60 overflow-hidden shrink-0">
        <img
          alt={post.title}
          src={post.image}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="absolute top-6 left-6 bg-[#0e3c66] text-white font-bold text-xs tracking-wider p-1! rounded-full shadow-sm z-10">
          {post.category}
        </span>
      </Link>

      <div className="p-8! md:p-10 flex flex-col grow">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 font-medium">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="w-1.5 h-1.5 rounded-full "></span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readTime}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`} className="block group-hover:text-blue-600 transition-colors duration-300">
          <h3 className="text-[#0e3c66] text-xl font-extrabold leading-snug mb-3 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 text-sm flex-grow">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-[#11528E] font-bold text-sm tracking-wide mt-auto group/link"
        >
          Read Article
          <span className="ml-2 bg-[#11528E]! text-white p-1.5 rounded-full group-hover/link:bg-blue-600 group-hover/link:text-white transition-all duration-300 transform group-hover/link:translate-x-1">
            <svg
              className="w-4 h-4"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>
    </article>
  );
}
