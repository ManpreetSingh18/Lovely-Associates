import React, { useState, useEffect } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "./BlogCard";

const BlogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch blog posts with retry logic
  useEffect(() => {
    const fetchWithRetry = async (retries = 4, delay = 1000) => {
      setLoading(true);
      setError(false);
      for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch(`${API_URL}/api/blogs`);
          if (!res.ok) throw new Error("Fetch failed");
          const data = await res.json();
          setBlogPosts(data.blogs || []);
          return;
        } catch (err) {
          console.error(`Attempt ${i + 1} failed:`, err);
          if (i < retries - 1) await new Promise((r) => setTimeout(r, delay));
        }
      }
      setError(true);
    };

    fetchWithRetry().finally(() => setLoading(false));
  }, [API_URL]);

  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam) {
      setSelectedTag(tagParam);
    }
  }, [searchParams]);

  const allTags = [
    "All",
    ...Array.from(new Set(blogPosts.flatMap((post) => post.tags))),
  ];

  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag =
        selectedTag === "All" || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    if (tag === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ tag });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property Insights & Market Updates
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest trends, investment opportunities, and
            expert advice from Delhi's trusted real estate professionals.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Tags */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedTag}
                onChange={(e) => handleTagChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-white shadow-sm" : ""
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-white shadow-sm" : ""
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-800 border-opacity-60"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">
            Failed to load blog posts. Please try again later.
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  handleTagChange("All");
                }}
                className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Showing {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
              {selectedTag !== "All" && ` in "${selectedTag}"`}
            </p>

            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-8"
              }`}
            >
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="bg-white text-blue-800 border-2 border-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 hover:text-white transition-all duration-300">
                Load More Articles
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
