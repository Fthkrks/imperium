"use client";

import { useState, useMemo } from "react";
import { BlogCard, type BlogPost } from "@/components/BlogCard";

export function BlogContent({ posts }: { posts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(posts.map((post) => post.category));
    return ["All", ...Array.from(cats)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div>
      {/* Controls Container */}
      <div className="flex flex-col md:flex-row gap-4 m-10!">
        {/* Search Input */}
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium text-[#0E3C66] mb-2 pl-1">
            Keyword (only one)
          </label>
          <div className="flex items-center w-full border border-gray-200 rounded-xl bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#7BC7FF] focus-within:border-transparent transition-all duration-300 px-3">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="w-full pl-3 pr-4 py-3 bg-transparent outline-none text-[#0E3C66] placeholder-gray-400"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col w-full md:w-64">
          <label className="text-sm font-medium text-[#0E3C66] mb-2 pl-1">
            Filter
          </label>
          <div className="relative">
            <select
              className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-[#7BC7FF] focus:border-transparent transition-all duration-300 text-[#0E3C66] appearance-none cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All" ? "All Posts" : category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[2rem] shadow-sm border border-gray-100">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-[#7BC7FF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-extrabold text-[#0E3C66] mb-3">
            No articles found
          </h3>
          <p className="text-[#0E3C66]/70 max-w-md mx-auto mb-8 leading-relaxed">
            We couldn't find any articles matching your search or category filter. Try using different keywords, or clear the filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="px-8 py-3.5 bg-[#7BC7FF] text-white font-bold rounded-full hover:bg-[#11528E] hover:-translate-y-0.5 transition-all shadow-md"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
