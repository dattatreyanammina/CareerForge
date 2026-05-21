/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Blog, User } from "../types";
import { User as UserIcon, BookOpen, Clock, Settings, Save, CheckCircle2, Bookmark, Flame, Zap, Award, LogOut } from "lucide-react";

interface UserDashboardProps {
  currentUser: User | null;
  onUpdateUser: (updatedUser: User) => void;
  onSelectBlog: (blog: Blog) => void;
  onLogout: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentUser,
  onUpdateUser,
  onSelectBlog,
  onLogout
}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [profileName, setProfileName] = useState(currentUser?.name || "");
  const [progress, setProgress] = useState(currentUser?.learningProgress || 45);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetch("/api/blogs")
      .then(r => r.json())
      .then(data => setBlogs(data))
      .catch(err => console.error(err));
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("careerforge_token")}`
        },
        body: JSON.stringify({
          name: profileName,
          learningProgress: progress
        })
      });

      const updated = await response.json();
      if (response.ok) {
        onUpdateUser(updated);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    } catch (err) {
      console.error("Error updating profile stats:", err);
    }
  };

  if (!currentUser) {
    return (
      <div className="text-center py-12 bg-white border border-slate-200 shadow-sm rounded-3xl max-w-sm mx-auto">
        <UserIcon size={32} className="mx-auto text-slate-400 mb-3" />
        <h3 className="font-bold text-slate-800 text-sm">Dashboard is Locked</h3>
        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-2 px-6">
          Please register or sign in with your email details in the login area to view saved studies.
        </p>
      </div>
    );
  }

  // Find bookmarked blogs
  const savedArticles = blogs.filter(b => currentUser.savedBlogs.includes(b.id));

  return (
    <div className="space-y-8" id="dashboard-system-root">
      
      {/* 1. HERO LEARNING STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Progress Tracker Card - Styled matching Vibrant Palette Indigo design */}
        <div className="bg-indigo-600 text-white rounded-2xl p-6 flex flex-col justify-between border border-indigo-500/30 shadow-md shadow-indigo-200/50 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-indigo-500/30 rounded-full blur-2xl pointer-events-none"></div>
          <div className="space-y-4 relative z-10">
            <span className="bg-indigo-500/40 border border-white/20 text-white py-1 px-2.5 rounded-full text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1.5 backdrop-blur-xs">
              <Zap size={12} className="text-white animate-bounce" /> Academic Progress
            </span>
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-white">{currentUser.learningProgress}%</h2>
              <p className="text-indigo-150 text-xs mt-1">Overall curriculum preparation status completed.</p>
            </div>
          </div>
          
          <div className="space-y-2 mt-6 relative z-10">
            <div className="w-full bg-indigo-700/60 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-white h-full rounded-full transition-all duration-500" 
                style={{ width: `${currentUser.learningProgress}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-indigo-100 font-medium">Keep completing daily aptitude lessons!</span>
          </div>
        </div>

        {/* Lesson Streak Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <span className="bg-orange-500/10 text-orange-600 py-1 px-2.5 rounded-full text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1.5">
              <Flame size={12} /> Active Streaks
            </span>
            <div>
              <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">12 Days</h2>
              <p className="text-slate-400 text-xs mt-1">Consecutive log-on days testing aptitude tricks.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 text-[10px] text-slate-400 flex justify-between items-center mt-6">
            <span>Next milestone: 15 Days</span>
            <span className="text-amber-600 font-bold">New badge pending</span>
          </div>
        </div>

        {/* Career Badges Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <span className="bg-emerald-500/10 text-emerald-600 py-1 px-2.5 rounded-full text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1.5">
              <Award size={12} /> Earned Laurels
            </span>
            <div>
              <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">Level 2</h2>
              <p className="text-slate-400 text-xs mt-1">Current placement readiness score index.</p>
            </div>
          </div>

          <div className="flex gap-1.5 flex-wrap mt-6">
            <span className="bg-slate-50 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200/60 font-mono">Vedic Calc Alum</span>
            <span className="bg-slate-50 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200/60 font-mono">Resume Optimized</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Saved Study Guides Section */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-extrabold text-slate-900 border-b pb-2 flex items-center gap-2 text-base">
            <Bookmark className="text-indigo-600" /> Bookmarked resources & Study Guides
          </h3>

          {savedArticles.length > 0 ? (
            <div className="space-y-3 pt-2">
              {savedArticles.map(article => (
                <div 
                  key={article.id}
                  onClick={() => onSelectBlog(article)}
                  className="bg-white border border-slate-150 p-4 rounded-2xl flex justify-between items-center hover:border-indigo-300 transition duration-150 cursor-pointer shadow-xs group"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] bg-indigo-50 text-indigo-700 font-bold uppercase tracking-wider px-2 py-0.5 rounded">{article.category}</span>
                    <h4 className="font-bold text-xs text-slate-800 group-hover:text-indigo-600 transition leading-snug line-clamp-1">{article.title}</h4>
                    <p className="text-[10px] text-slate-400">By {article.author} &bull; {article.readTime}</p>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-600 shrink-0 ml-4 group-hover:translate-x-1 transition duration-150">Study Now &rarr;</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50/50 border border-dashed rounded-3xl">
              <Bookmark className="text-slate-350 mx-auto mb-2" size={24} />
              <p className="text-xs text-slate-500">Your bookmarked guides will highlight here.</p>
              <p className="text-[10px] text-slate-400 mt-1 max-w-[240px] mx-auto leading-normal">
                Visit the Blog & Gyan Hub and save any career preparation or aptitude shortcut sheet.
              </p>
            </div>
          )}
        </div>

        {/* Profile Settings (Section 6 requirements) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xs">
          <h3 className="font-extrabold text-slate-900 border-b pb-2 flex items-center gap-2 text-base">
            <Settings className="text-indigo-600" /> Student Profile Management
          </h3>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Registered Student Name</label>
              <input
                type="text"
                required
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">Self-Reported Progress Block</label>
                <span className="text-xs font-bold text-indigo-600">{progress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0% started</span>
                <span>100% placed</span>
              </div>
            </div>

            {isSaved && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Profile metrics saved successfully.
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 cursor-pointer text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-xs"
              >
                <Save size={14} />
                Commit Profile Changes
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="w-full bg-rose-50 hover:bg-rose-100 border border-rose-150 text-rose-700 font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-3xs"
              >
                <LogOut size={14} />
                Log Out Profile
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};
