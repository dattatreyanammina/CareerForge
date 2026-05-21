/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { Blog, User } from "../types";
import { Search, Heart, Bookmark, Share2, ArrowLeft, Clock, User2, AlignLeft, Check, ListFilter, AlertCircle, RefreshCw } from "lucide-react";

interface BlogSystemProps {
  currentUser: User | null;
  onToggleBookmark: (blogId: string) => void;
}

export const BlogSystem: React.FC<BlogSystemProps> = ({ currentUser, onToggleBookmark }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  
  // Reading tracking
  const [scrollProgress, setScrollProgress] = useState(0);

  // Social sharing flags
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Monitor scrolling to calculate progress if an article is shown
  useEffect(() => {
    if (!selectedBlog) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = (window.scrollY / docHeight) * 100;
      setScrollProgress(Math.min(pct, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedBlog]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load blogs");
      setBlogs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const incrementLikes = async (blogId: string) => {
    try {
      const res = await fetch(`/api/blogs/${blogId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("careerforge_token") || "user-default"}`
        }
      });
      const updated = await res.json();
      if (res.ok) {
        setBlogs(blogs.map(b => b.id === blogId ? updated : b));
        if (selectedBlog && selectedBlog.id === blogId) {
          setSelectedBlog(updated);
        }
      }
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Filter Blogs
  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || b.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category)))];

  // Helper: Quickly Parse headers in Markdown content to build dynamic Table of Contents (ToC)
  const extractToC = (content: string) => {
    const headerRegex = /^(##|###)\s+(.*)$/gm;
    let match;
    const tocItems: { text: string; level: number }[] = [];
    while ((match = headerRegex.exec(content)) !== null) {
      tocItems.push({
        text: match[2].replace(/\**/g, "").trim(),
        level: match[1] === "##" ? 2 : 3
      });
    }
    return tocItems;
  };

  if (selectedBlog) {
    const toc = extractToC(selectedBlog.content);
    const isBookmarked = currentUser?.savedBlogs.includes(selectedBlog.id) || false;

    return (
      <div className="space-y-6" id="blog-reading-view">
        {/* Sticky reading progress bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-50">
          <div 
            className="h-full bg-indigo-600 transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* Back and Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-150">
          <button 
            onClick={() => setSelectedBlog(null)}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-bold tracking-wide"
          >
            <ArrowLeft size={16} /> Return to articles list
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(selectedBlog.id)}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs transition font-semibold ${
                isBookmarked 
                  ? 'bg-amber-100 border-amber-300 text-amber-800' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark size={14} fill={isBookmarked ? "#d97706" : "none"} />
              {isBookmarked ? "Saved to Profile" : "Bookmark"}
            </button>

            <button
              onClick={() => incrementLikes(selectedBlog.id)}
              className="p-2 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-xl text-xs text-rose-700 flex items-center gap-1.5 transition font-semibold"
            >
              <Heart size={14} fill="#e11d48" />
              Like ({selectedBlog.likes})
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 rounded-xl text-xs flex items-center gap-1.5 transition font-semibold"
            >
              {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
              {copiedLink ? "Link Copied" : "Share Guide"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Content */}
          <article className="lg:col-span-8 bg-white border border-slate-150 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
            <div className="space-y-3">
              <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">{selectedBlog.category}</span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{selectedBlog.title}</h1>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400 items-center border-y border-slate-100 py-3 mt-4">
                <span className="flex items-center gap-1"><User2 size={14} /> By {selectedBlog.author}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {selectedBlog.readTime}</span>
                <span>Published: {selectedBlog.date}</span>
              </div>
            </div>

            {/* Markdown rendered body */}
            <div className="markdown-body p-1 text-slate-700 text-sm leading-relaxed overflow-x-auto space-y-4 max-w-none prose prose-indigo">
              <Markdown>{selectedBlog.content}</Markdown>
            </div>

            {/* Tags Bottom Row */}
            <div className="border-t border-slate-100 pt-6 flex flex-wrap gap-2">
              {selectedBlog.tags.map(t => (
                <span key={t} className="bg-slate-50 border border-slate-200/80 text-slate-500 rounded-lg px-2.5 py-1 text-xs font-medium">#{t}</span>
              ))}
            </div>
          </article>

          {/* Right Sidebar: ToC and metadata */}
          <div className="lg:col-span-4 space-y-6">
            {toc.length > 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-200 pb-2">
                  <AlignLeft size={14} /> Under Exploration ToC
                </h4>
                <ul className="space-y-2">
                  {toc.map((item, idx) => (
                    <li 
                      key={idx} 
                      className={`text-xs text-slate-600 border-l-2 pl-3 hover:text-indigo-600 transition ${
                        item.level === 3 ? 'ml-3 text-slate-400 border-slate-200' : 'font-semibold border-slate-300'
                      }`}
                    >
                      <button 
                        onClick={() => {
                          const elements = Array.from(document.querySelectorAll('h2, h3'));
                          const target = elements.find(el => el.textContent?.trim() === item.text);
                          if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }}
                        className="text-left"
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm text-slate-100">Prepare Smarter in 2026</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unlock higher scoring brackets by completing interactive micro-quizzes aligned precisely with these competitive placement guide rules.
              </p>
              <div className="p-3.5 bg-slate-800 rounded-xl text-[10px] text-amber-300 leading-normal border border-amber-500/10">
                ⭐ <strong>Tip:</strong> Join our daily telegram and career planner emails to access solved ssc test structures.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="blog-listing">
      {/* Search and category filters */}
      <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between" id="articles-filter-shelf">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search keywords or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-xs text-slate-800 bg-white"
          />
        </div>

        {/* Category tags row */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto overflow-x-auto justify-start md:justify-end">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                selectedCategory === cat ? 'bg-slate-950 text-white' : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              <ListFilter size={12} />
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 font-medium flex items-center justify-center gap-2 text-xs">
          <RefreshCw className="animate-spin text-indigo-600" /> Downloading catalog guides...
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs">
          {error}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 border border-dashed rounded-3xl">
          <AlertCircle size={28} className="text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-500">No guides matching search "{searchQuery}" could be found. Select another keyword!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="blog-grid-system">
          {filteredBlogs.map(blog => {
            const isBookmarked = currentUser?.savedBlogs.includes(blog.id) || false;
            return (
              <div 
                key={blog.id} 
                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between transition-all duration-150 hover:-translate-y-1 hover:shadow-md cursor-pointer group"
                onClick={() => setSelectedBlog(blog)}
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <span className="bg-indigo-50 border border-indigo-100/50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">{blog.category}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleBookmark(blog.id); }}
                      className={`p-1.5 rounded-lg border transition ${
                        isBookmarked 
                          ? 'bg-amber-100 border-amber-300 text-amber-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                      title={isBookmarked ? "Saved" : "Save article"}
                    >
                      <Bookmark size={14} fill={isBookmarked ? "#d97706" : "none"} />
                    </button>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-indigo-600 transition mb-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed mb-4">
                    {blog.summary}
                  </p>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1"><Clock size={11} /> {blog.readTime}</div>
                  <span className="font-medium text-slate-500">Read Article &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
