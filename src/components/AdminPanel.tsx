/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Blog, AnalyticsSummary } from "../types";
import { PlusCircle, Calendar, Trash2, Edit2, BarChart3, Settings, BookCopy, Users, UsersRound, Terminal, CheckCircle2, ChevronRight, Bookmark } from "lucide-react";

interface AdminPanelProps {
  token: string | null;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ token }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Blog form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Placement Prep");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("DSA, Interviews");
  const [author, setAuthor] = useState("Dr. Alok Verma");
  
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null); // Holds blogId if editing

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const headers = { "Authorization": `Bearer ${token}` };
      
      const [blogsRes, analyticsRes] = await Promise.all([
        fetch("/api/blogs"),
        fetch("/api/analytics", { headers })
      ]);
      
      const blogsData = await blogsRes.json();
      const analyticsData = await analyticsRes.json();
      
      setBlogs(blogsData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error("Error loading secure admin profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setTitle("");
    setCategory("Placement Prep");
    setSummary("");
    setContent("");
    setTags("DSA, Interviews");
    setIsEditing(null);
  };

  const handleCreateOrUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setStatusMessage("🚨 Title and content are mandatory.");
      return;
    }

    const payload = {
      title,
      category,
      summary,
      content,
      author,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      readTime: `${Math.max(3, Math.ceil(content.split(" ").length / 150))} min read`
    };

    try {
      const method = isEditing ? "PUT" : "POST";
      const endpoint = isEditing ? `/api/blogs/${isEditing}` : "/api/blogs";
      
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "System failed to publish article");

      setStatusMessage(isEditing ? "✨ Article metadata modified successfully." : "🚀 New Career article published to student feeds.");
      clearForm();
      loadAdminData();
      
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage(`🚨 Error: ${err.message}`);
    }
  };

  const handleEditInit = (blog: Blog) => {
    setIsEditing(blog.id);
    setTitle(blog.title);
    setCategory(blog.category);
    setSummary(blog.summary);
    setContent(blog.content);
    setTags(blog.tags.join(", "));
    setAuthor(blog.author);
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!window.confirm("Are you sure you want to remove this publication? This action represents extreme finality.")) return;
    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setStatusMessage("🗑️ Article removed cleanly.");
        loadAdminData();
        setTimeout(() => setStatusMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-slate-400 text-xs flex items-center justify-center gap-2">
        <div className="w-5 h-5 border-2 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div> Loading Admin Workspace...
      </div>
    );
  }

  return (
    <div className="space-y-8" id="admin-dashboard-container">
      
      {/* 1. KEY ANALYTICS BLOCKS (Section 8 requirements) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <UsersRound size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Total Users Registered</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{analytics?.totalUsers || 24}</h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <BookCopy size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Published Blog Guides</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{analytics?.totalBlogs || blogs.length}</h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Terminal size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Simulated AI API Hits</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{analytics?.totalApiRequests || 15}</h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-500 rounded-xl">
            <Settings size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Calculators Executed</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{analytics?.totalToolsUsed || 82}</h3>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-50 hover:bg-indigo-50 border border-emerald-200 hover:border-indigo-200 text-slate-800 text-xs font-semibold rounded-2xl shadow-xs transition duration-200">
          {statusMessage}
        </div>
      )}

      {/* 2. BAR CHART VISUAL D3/RECHARTS alternative (Inline highly polished High-Contrast SVG) */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 lg:p-8 space-y-6">
        <div>
          <h3 className="font-extrabold text-slate-900 border-b border-indigo-100 pb-3 flex items-center gap-2 text-base">
            <BarChart3 className="text-indigo-600" /> API Activity & Tool Traffic metrics
          </h3>
          <p className="text-[11px] text-slate-400 mt-1.5 w-full max-w-xl">
            Visualization of search and computation hits tracked across student portals. SVG indicators highlight popularity indexes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
          {/* SVG Bar Chart */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Compounded Tool usage metrics</h4>
            <div className="space-y-3">
              {analytics?.popularTools.map((tool, idx) => {
                const maxCount = Math.max(...(analytics?.popularTools.map(t => t.count) || [1]));
                const pct = (tool.count / maxCount) * 100;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-600 font-medium">
                      <span>{tool.name}</span>
                      <span className="font-bold text-indigo-600">{tool.count} hits</span>
                    </div>
                    <div className="w-full bg-slate-105 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SVG Weekly Traffic Lines */}
          <div className="space-y-4 bg-slate-50 border p-5 rounded-2xl">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Weekly API Traffic Index</h4>
            
            <div className="relative pt-4">
              <svg viewBox="0 0 400 150" className="w-full h-auto overflow-visible">
                {/* Horizontal grid lines */}
                <line x1="0" y1="130" x2="400" y2="130" stroke="#cbd5e1" strokeDasharray="4" />
                <line x1="0" y1="75" x2="400" y2="75" stroke="#e2e8f0" strokeDasharray="4" />
                <line x1="0" y1="20" x2="400" y2="20" stroke="#e2e8f0" strokeDasharray="4" />

                {/* Curved visual line charting requests */}
                <path
                  d="M 10 120 C 60 100, 110 40, 160 20 C 210 50, 260 30, 310 120 C 350 110, 380 90, 390 80"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Interactive Points circles along line path */}
                <circle cx="10" cy="120" r="5" fill="#4f46e5" />
                <circle cx="160" cy="20" r="5" fill="#10b981" />
                <circle cx="310" cy="120" r="5" fill="#4f46e5" />

                {/* Labels */}
                <text x="10" y="145" fill="#64748b" fontSize="10px">M</text>
                <text x="75" y="145" fill="#64748b" fontSize="10px">W</text>
                <text x="150" y="145" fill="#64748b" fontSize="10px">F</text>
                <text x="225" y="145" fill="#64748b" fontSize="10px">Su</text>
              </svg>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-medium">
              <span>*Peak: Wednesday Placement Launching</span>
              <span>Total API Calls: 423</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BLOG OPERATIONS AND CREATOR FORM (Section 8 requirements) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Creator Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 shadow-sm rounded-3xl p-6 lg:p-8">
          <h4 className="font-extrabold text-slate-900 border-b border-indigo-50 pb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
            <PlusCircle className="text-indigo-600" /> 
            {isEditing ? "Modify Published Article" : "Compose New Career Publication"}
          </h4>

          <form onSubmit={handleCreateOrUpdateBlog} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ace the CSS Interview"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Category Tag</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none rounded-xl px-4 py-2 text-xs text-slate-800 bg-white"
                >
                  <option value="Placement Prep">Placement Prep</option>
                  <option value="Aptitude Tricks">Aptitude Tricks</option>
                  <option value="English Grammar">English Grammar</option>
                  <option value="Government Exams">Government Exams</option>
                  <option value="Career Mapping">Career Mapping</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Short Abstract Summary</label>
              <input
                type="text"
                placeholder="A high-level summary of the article's context, displayed under card views..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800 bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Subject Keywords (Comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Placement, SSC, Study Plans"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800 bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Markdown Content Document</label>
              <textarea
                rows={12}
                required
                placeholder="# Introduction&#10;Write detailed paragraphs. Use standard Markdown headers, bullets, or codeblocks seamlessly."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-slate-800 font-mono bg-white resize-y"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              {isEditing && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-4 py-2 rounded-xl text-xs"
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="submit"
                className="bg-slate-900 hover:bg-indigo-650 text-white font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow-xs"
              >
                {isEditing ? "Update Guide Publication" : "Publish Career Guide to Portals"}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Publications List */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 text-white p-6 lg:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <h4 className="font-extrabold text-white pb-3 border-b border-slate-800 flex items-center gap-2 text-xs uppercase tracking-wider">
              <Calendar /> Published Catalog Feed
            </h4>

            <div className="space-y-3 pt-4 max-h-[460px] overflow-y-auto pr-2">
              {blogs.map(b => (
                <div key={b.id} className="p-3.5 bg-slate-800/60 border border-slate-800 rounded-xl flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-black uppercase">{b.category}</span>
                    <h5 className="text-xs font-bold text-slate-100 leading-snug line-clamp-2">{b.title}</h5>
                    <p className="text-[10px] text-slate-400">By {b.author}</p>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => handleEditInit(b)}
                      className="p-1.5 bg-slate-700/80 hover:bg-indigo-600 text-slate-350 hover:text-white rounded transition"
                      title="Edit Meta"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      className="p-1.5 bg-slate-700/80 hover:bg-rose-500 text-slate-350 hover:text-white rounded transition"
                      title="Decommission Article"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-[10px] text-slate-500 text-center leading-normal mt-6">
            Changes to the catalog are stored in memory for the active lifecycle session.
          </div>
        </div>

      </div>

    </div>
  );
};
