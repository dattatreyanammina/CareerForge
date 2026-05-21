/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { User, Blog } from "./types";
import { AuthLayout } from "./components/AuthLayout";
import { StudentCalculators } from "./components/StudentCalculators";
import { AptitudeQuizzes } from "./components/AptitudeQuizzes";
import { AIPoweredTools } from "./components/AIPoweredTools";
import { BlogSystem } from "./components/BlogSystem";
import { AdminPanel } from "./components/AdminPanel";
import { UserDashboard } from "./components/UserDashboard";
import { InfoPages } from "./components/InfoPages";
import { JobAlerts } from "./components/JobAlerts";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db, handleFirestoreError, OperationType } from "./firebase";


import { 
  Sparkles, 
  BookOpen, 
  Calculator, 
  HelpCircle, 
  Bookmark, 
  LayoutDashboard, 
  ShieldAlert, 
  Briefcase, 
  Menu, 
  X, 
  LogIn, 
  CheckCircle, 
  Send, 
  User as UserIcon,
  ExternalLink,
  Cookie,
  Bell
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab ] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Authentication status
  const [token, setToken] = useState<string | null>(localStorage.getItem("careerforge_token"));
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Bookmarked blog click shortcut
  const [shortcutBlog, setShortcutBlog] = useState<Blog | null>(null);

  // Cookie Notice dismissal state
  const [cookieDismissed, setCookieDismissed] = useState<boolean>(() => {
    return localStorage.getItem("careerforge_cookies_accepted") === "true";
  });

  // Newsletter action state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Action toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Real-time Firebase Authentication listener & Firestore Subscription
  useEffect(() => {
    let unsubDoc: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      // Unsubscribe from any previous document listeners
      if (unsubDoc) {
        unsubDoc();
        unsubDoc = null;
      }

      if (fbUser) {
        const idToken = await fbUser.getIdToken();
        setToken(idToken);
        localStorage.setItem("careerforge_token", idToken);

        // Subscribe to real-time updates for user profile document
        const userDocRef = doc(db, "users", fbUser.uid);
        unsubDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data() as User);
          }
        }, (err) => {
          if (err.code === "permission-denied") {
            // Quietly ignore permissions failure that occurs during logging out transition
            console.log("Firestore sync session closed.");
          } else {
            console.error("Firestore user Sync Error:", err);
            handleFirestoreError(err, OperationType.GET, `users/${fbUser.uid}`);
          }
        });
      } else {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem("careerforge_token");
      }
    });

    return () => {
      unsubscribe();
      if (unsubDoc) {
        unsubDoc();
      }
    };
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAuthSuccess = (user: User, userToken: string) => {
    localStorage.setItem("careerforge_token", userToken);
    setToken(userToken);
    setCurrentUser(user);
    setActiveTab('home');
    triggerToast(`Sign In Success! Role assigned: ${user.role.toUpperCase()}`);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.error("Signout error:", e);
    }
    localStorage.removeItem("careerforge_token");
    setToken(null);
    setCurrentUser(null);
    setActiveTab('home');
    triggerToast("Sign out completed cleanly. See you soon!");
  };

  const handleToggleBookmark = async (blogId: string) => {
    if (!currentUser) {
      setActiveTab('login');
      triggerToast("🔒 Save progress by logging in first!");
      return;
    }

    try {
      const userRef = doc(db, "users", currentUser.id);
      const isSaved = currentUser.savedBlogs.includes(blogId);
      
      await updateDoc(userRef, {
        savedBlogs: isSaved ? arrayRemove(blogId) : arrayUnion(blogId)
      });
      
      triggerToast(!isSaved ? "⭐ Saved guide to learning dashboard!" : "Removed guide from bookmarked studies.");
    } catch (err) {
      console.error("Error updating saved status in Firestore:", err);
      triggerToast("Failed to save progress. Try checking your internet connection.");
      handleFirestoreError(err, OperationType.UPDATE, `users/${currentUser.id}`);
    }
  };

  const handleDismissCookies = () => {
    localStorage.setItem("careerforge_cookies_accepted", "true");
    setCookieDismissed(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
    triggerToast("📧 Success! You joined the CareerForge Daily Prep roster.");
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800" id="careerforge-web-root">
      
      {/* 1. GLOBAL FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div id="global-action-toast" className="fixed top-6 right-6 bg-slate-900 border border-slate-800 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400 block animate-ping"></span>
          {toastMessage}
        </div>
      )}

      {/* 2. NAVIGATION BAR (SEO and SaaS structure ready and styled under Vibrant Palette) */}
      <header className="sticky top-0 bg-white border-b border-slate-200 z-40 shadow-sm" id="app-navbar-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Distinctive Logo matching Pathfinder.ai style */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-8.5 h-8.5 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-sm shadow-indigo-200">C</div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">CareerForge<span className="text-indigo-600 font-semibold">.ai</span></span>
          </div>

          {/* Desktop Toolbar */}
          <nav className="hidden lg:flex items-center gap-4 text-sm font-semibold text-slate-600">
            <button 
              onClick={() => setActiveTab('home')}
              className={`py-1 hover:text-indigo-600 transition-colors focus:outline-none ${
                activeTab === 'home' ? 'text-indigo-600 underline underline-offset-4 decoration-2' : ''
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('ai-tools')}
              className={`py-1 hover:text-indigo-600 transition-colors flex items-center gap-1.5 focus:outline-none ${
                activeTab === 'ai-tools' ? 'text-indigo-600 underline underline-offset-4 decoration-2' : ''
              }`}
            >
              <Sparkles size={14} className="text-indigo-600" />
              AI Console
            </button>
            <button 
              onClick={() => setActiveTab('calculators')}
              className={`py-1 hover:text-indigo-600 transition-colors flex items-center gap-1.5 focus:outline-none ${
                activeTab === 'calculators' ? 'text-indigo-600 underline underline-offset-4 decoration-2' : ''
              }`}
            >
              <Calculator size={14} />
              Calculators
            </button>
            <button 
              onClick={() => setActiveTab('quizzes')}
              className={`py-1 hover:text-indigo-600 transition-colors flex items-center gap-1.5 focus:outline-none ${
                activeTab === 'quizzes' ? 'text-indigo-600 underline underline-offset-4 decoration-2' : ''
              }`}
            >
              <HelpCircle size={14} />
              Quizzes
            </button>
            <button 
              onClick={() => setActiveTab('blogs')}
              className={`py-1 hover:text-indigo-600 transition-colors flex items-center gap-1.5 focus:outline-none ${
                activeTab === 'blogs' ? 'text-indigo-600 underline underline-offset-4 decoration-2' : ''
              }`}
            >
              <BookOpen size={14} />
              Placement Prep
            </button>
            <button 
              onClick={() => setActiveTab('job-alerts')}
              className={`py-1 hover:text-indigo-600 transition-colors flex items-center gap-1.5 focus:outline-none ${
                activeTab === 'job-alerts' ? 'text-indigo-600 underline underline-offset-4 decoration-2 font-bold' : ''
              }`}
            >
              <Bell size={14} className="text-rose-500 animate-pulse" />
              <span className="relative">
                Job Alerts
                <span className="absolute -top-1.5 -right-2.5 w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('info')}
              className={`py-1 hover:text-indigo-600 transition-colors focus:outline-none ${
                activeTab === 'info' ? 'text-indigo-600 underline underline-offset-4 decoration-2' : ''
              }`}
            >
              Resources
            </button>

            {currentUser && (
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`py-1 hover:text-indigo-600 transition-colors flex items-center gap-1.5 focus:outline-none ${
                  activeTab === 'dashboard' ? 'text-indigo-600 underline underline-offset-4 decoration-2' : ''
                }`}
              >
                <LayoutDashboard size={14} className="text-emerald-500" />
                My Progress
              </button>
            )}

            {currentUser?.role === 'admin' && (
              <button 
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-1 rounded-lg hover:text-indigo-600 transition-colors flex items-center gap-1 focus:outline-none ${
                  activeTab === 'admin' ? 'bg-amber-100 text-amber-900 font-extrabold' : 'text-amber-700'
                }`}
              >
                <ShieldAlert size={14} />
                Admin
              </button>
            )}
          </nav>

          {/* User Sign In Trigger with Pathfinder button look */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <button
                onClick={() => setActiveTab('dashboard')}
                className="inline-flex items-center gap-2 group cursor-pointer focus:outline-none"
              >
                <div className="w-8.5 h-8.5 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-indigo-250">
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-800 leading-none group-hover:text-indigo-600">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">My Profile</p>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('login')}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer focus:outline-none"
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab('login')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-all cursor-pointer focus:outline-none"
                >
                  Get Started Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile responsive toggler */}
          <button 
            id="mobile-navbar-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-650 bg-slate-100 rounded-xl"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white border-slate-200 p-4 space-y-1" id="mobile-navigation-drawer">
            <button 
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl block"
            >
              Overview Map
            </button>
            <button 
              onClick={() => { setActiveTab('ai-tools'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl block"
            >
              Gemini AI Tools
            </button>
            <button 
              onClick={() => { setActiveTab('calculators'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl block"
            >
              Free Calculators
            </button>
            <button 
              onClick={() => { setActiveTab('quizzes'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl block"
            >
              Government Quiz Prep
            </button>
            <button 
              onClick={() => { setActiveTab('blogs'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl block"
            >
              Gyan Hub
            </button>
            <button 
              onClick={() => { setActiveTab('job-alerts'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2.5 text-xs font-bold text-slate-705 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 rounded-xl block flex items-center justify-between"
            >
              <span>🚨 Live Job Alerts</span>
              <span className="bg-rose-500 w-1.5 h-1.5 rounded-full"></span>
            </button>
            <button 
              onClick={() => { setActiveTab('info'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl block"
            >
              Sitemap & Legal
            </button>

            {currentUser && (
              <button 
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-left p-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl block border-t pt-2"
              >
                My Learning Desk (Streak!)
              </button>
            )}

            {currentUser?.role === 'admin' && (
              <button 
                onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
                className="w-full text-left p-2.5 text-xs font-bold text-amber-800 bg-amber-50 rounded-xl block border border-amber-200"
              >
                Secure Admin Access
              </button>
            )}

            <div className="pt-4 border-t mt-4">
              {currentUser ? (
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="w-full text-center bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-bold py-2.5 px-4 rounded-xl text-xs"
                >
                  Log Out Profile
                </button>
              ) : (
                <button
                  onClick={() => { setActiveTab('login'); setMobileMenuOpen(false); }}
                  className="w-full text-center bg-slate-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs"
                >
                  Sign In / Create Account
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 3. MAIN ROUTER CONTENT CONTAINER */}
      <main className="flex-1 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

          {/* TAB 1: LANDING OVERVIEW PAGE */}
          {activeTab === 'home' && (
            <div className="space-y-12 animate-fade-in">
              
              {/* Premium Hero Banner (Vibrant Palette Theme Setup) */}
              <section id="hero-marketing-grid" className="bg-indigo-600 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 shadow-md">
                
                <div className="relative z-10 flex-1 space-y-5 text-left">
                  <div className="inline-flex items-center gap-2 bg-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-2 backdrop-blur-sm border border-white/10">
                    <span className="w-2 h-2 bg-indigo-200 rounded-full"></span>
                    Placement Preparation Assistant
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
                    Master Your Career with AI Precision.
                  </h2>

                  <p className="text-indigo-100 max-w-xl text-sm leading-relaxed">
                    Generate optimized resumes, simulate core technical interviews, and build diagnostic learning roadmaps in seconds with our specialized student co-pilot.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button 
                      onClick={() => setActiveTab('ai-tools')}
                      className="bg-white text-indigo-600 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      Launch Career Bot
                    </button>
                    <button 
                      onClick={() => setActiveTab('calculators')}
                      className="bg-indigo-500/40 border border-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-500/60 transition-all cursor-pointer"
                    >
                      Explore Utilities
                    </button>
                  </div>
                </div>

                {/* Right Hero Decorative Feature Board (Vibrant Palette Sidebar Card look) */}
                <div className="relative z-10 w-full lg:w-80 bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/15 space-y-3.5">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-[10px] text-indigo-100 font-bold uppercase tracking-widest">Aspirant Desk</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  
                  <div className="space-y-2.5 text-xs text-indigo-50">
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                      <span>CGPA Multiplier Factor</span>
                      <strong className="text-white font-semibold">Active (9.5 Factor)</strong>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                      <span>Daily English Mock Drill</span>
                      <strong className="text-white font-semibold">3 Solved</strong>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                      <span>AI ATS Resume Optimizer</span>
                      <strong className="text-white font-semibold font-mono">STAR Mode</strong>
                    </div>
                  </div>
                </div>

                {/* Decorative radial circles matching design requirements */}
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-400/25 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute right-8 bottom-0 w-32 h-32 bg-indigo-400/15 rounded-full blur-xl pointer-events-none"></div>
              </section>

              {/* Six Core Highlights Grid (AI, Placement, Resume, Exams, etc) */}
              <section className="space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Structured Student Pathway Portal</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Access premium study modules designed for placement screening, government job standards, and strategic growth.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="features-highlights-shelf">
                  
                  {/* Card 1 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Expandable AI Planning Console</h4>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                        Synthesize optimized resume bullet points, custom roadmap outlines, and expected interview sheets using generative frameworks.
                      </p>
                    </div>
                    <button onClick={() => setActiveTab('ai-tools')} className="text-xs text-indigo-600 hover:underline font-bold mt-2">Open AI Console &rarr;</button>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <Calculator size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Instant Calculation Trackers</h4>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                        Calculate average semester SGPA weights, convert grade metrics, and estimate in-hand salaries after PF and income tax deductions.
                      </p>
                    </div>
                    <button onClick={() => setActiveTab('calculators')} className="text-xs text-indigo-600 hover:underline font-bold mt-2">Open Free Calculators &rarr;</button>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <HelpCircle size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Government Exam Daily Quizzes</h4>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                        Practice active quizzes mapping SSC CGL aptitude drills, English grammar shortcuts, and General awareness tests with answers key.
                      </p>
                    </div>
                    <button onClick={() => setActiveTab('quizzes')} className="text-xs text-indigo-600 hover:underline font-bold mt-2">Launch Exam Sandbox &rarr;</button>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Gyan Hub blog catalog</h4>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                        Study curated guides covering quantitative calculations, sliding window DSA patterns, active recall, and high-yielding rules.
                      </p>
                    </div>
                    <button onClick={() => setActiveTab('blogs')} className="text-xs text-indigo-600 hover:underline font-bold mt-2">Read Gyan Guides &rarr;</button>
                  </div>

                  {/* Card 5 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                      <LayoutDashboard size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Student Performance Dashboard</h4>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                        Save articles, monitor self-reported learning progress metrics, and view active streaks to retain placement prep schedules.
                      </p>
                    </div>
                    <button onClick={() => { if(currentUser) { setActiveTab('dashboard'); } else { setActiveTab('login'); } }} className="text-xs text-indigo-600 hover:underline font-bold mt-2">Open My Desk &rarr;</button>
                  </div>

                  {/* Card 6 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center font-bold">
                      <ShieldAlert size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">AdSense Compliant Structure</h4>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                        Equipped with DoubleClick guidelines, privacy frameworks, disclaimer statements, terms, cookies consent, and sitemaps.
                      </p>
                    </div>
                    <button onClick={() => setActiveTab('info')} className="text-xs text-indigo-600 hover:underline font-bold mt-2">View Compliant Docs &rarr;</button>
                  </div>

                </div>
              </section>

              {/* Trending Gyan Guides row */}
              <section className="space-y-6">
                <div className="flex justify-between items-end border-b pb-4 border-slate-200">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Trending Guidance Guides</h3>
                    <p className="text-xs text-slate-400 mt-1">Sharpen calculations and placement strategy using written materials.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('blogs')} 
                    className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1 shrink-0"
                  >
                    View All Guides &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Trending Item 1 */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between shadow-xs">
                    <div className="space-y-2">
                      <span className="text-[9px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded uppercase">Aptitude Tricks</span>
                      <h4 className="font-bold text-slate-800 text-xs leading-snug">Vedic Mathematics Speed calculations & Squaring Tricks</h4>
                      <p className="text-slate-400 text-[11px] line-clamp-2">Learn instant calculations for competitive exams like SSC, Banking, and tier-1 IT placements.</p>
                    </div>
                    <button 
                      onClick={() => { setActiveTab('blogs'); }} 
                      className="text-xs font-bold text-indigo-600 hover:underline mt-4 text-left"
                    >
                      Read Guide &bull; 4 min
                    </button>
                  </div>

                  {/* Trending Item 2 */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between shadow-xs">
                    <div className="space-y-2">
                      <span className="text-[9px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded uppercase">Placement Prep</span>
                      <h4 className="font-bold text-slate-800 text-xs leading-snug">Sliding Window & Converging Two Pointers DSA Patterns</h4>
                      <p className="text-slate-400 text-[11px] line-clamp-2">Study structural implementations of optimized subarray loops frequently asked in tech screens.</p>
                    </div>
                    <button 
                      onClick={() => { setActiveTab('blogs'); }} 
                      className="text-xs font-bold text-indigo-600 hover:underline mt-4 text-left"
                    >
                      Read Guide &bull; 7 min
                    </button>
                  </div>

                  {/* Trending Item 3 */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between shadow-xs">
                    <div className="space-y-2">
                      <span className="text-[9px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded uppercase">English Grammar</span>
                      <h4 className="font-bold text-slate-800 text-xs leading-snug">SSC CGL High-Yielding Grammar Rules Vocab Mnemonics</h4>
                      <p className="text-slate-400 text-[11px] line-clamp-2">Avoid common subject-verb traps and memorize vocabulary keywords using logical visual links.</p>
                    </div>
                    <button 
                      onClick={() => { setActiveTab('blogs'); }} 
                      className="text-xs font-bold text-indigo-600 hover:underline mt-4 text-left"
                    >
                      Read Guide &bull; 5 min
                    </button>
                  </div>

                </div>
              </section>

              {/* Newsletter subscription form (Section 1 setup) */}
              <section id="newsletter-form-section" className="bg-slate-50 border border-slate-200 rounded-3xl p-6 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Stay Placed. Join CareerForge Daily</h3>
                  <p className="text-xs text-slate-400">Receive Vedic calculation charts, active recall questions, and certification releases.</p>
                </div>

                {newsletterSubscribed ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 font-semibold text-xs px-5 py-3 rounded-2xl flex items-center gap-1.5">
                    <CheckCircle size={16} className="text-emerald-600" /> Excellent! You are on the VIP daily guidance list.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto max-w-sm">
                    <input
                      type="email"
                      required
                      placeholder="Enter student email ID..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-5 rounded-xl transition inline-flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Send size={12} />
                      Subscribe
                    </button>
                  </form>
                )}
              </section>

            </div>
          )}

          {/* TAB 2: AI GENERATIVE PLANNER CONSOLE */}
          {activeTab === 'ai-tools' && (
            <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
              <AIPoweredTools token={token} />
            </div>
          )}

          {/* TAB 3: STUDENT UTILITY STATS CALCULATORS */}
          {activeTab === 'calculators' && (
            <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
              <StudentCalculators />
            </div>
          )}

          {/* TAB 4: MOCK EXAMS AND QUIZZES PREP */}
          {activeTab === 'quizzes' && (
            <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
              <AptitudeQuizzes currentUser={currentUser} />
            </div>
          )}

          {/* TAB 5: BLOG HUB & CURATED GYAN GUIDES */}
          {activeTab === 'blogs' && (
            <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
              <BlogSystem 
                currentUser={currentUser} 
                onToggleBookmark={handleToggleBookmark} 
              />
            </div>
          )}

          {/* TAB 6: ADSENSE LEGAL INFO DIRECTORY */}
          {activeTab === 'info' && (
            <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
              <InfoPages />
            </div>
          )}

          {/* TAB 7: SIGN IN GATE AND GOOGLE FLOWS */}
          {activeTab === 'login' && (
            <div className="py-12 animate-[fadeIn_0.2s_ease]">
              <AuthLayout 
                currentUser={currentUser} 
                onAuthSuccess={handleAuthSuccess} 
                onLogout={handleLogout} 
              />
            </div>
          )}

          {/* TAB 8: USER PROFILE DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
              <UserDashboard 
                currentUser={currentUser} 
                onUpdateUser={(updated) => setCurrentUser(updated)}
                onLogout={handleLogout}
                onSelectBlog={(article) => {
                  setActiveTab('blogs');
                  // Setting selected blog takes place in the blog system, 
                  // but we jump to list and they can select standard list guidance perfectly.
                }}
              />
            </div>
          )}

          {/* TAB 8.5: VERIFIED JOB NOTIFICATIONS AND GOVERNMENT BULLETIN */}
          {activeTab === 'job-alerts' && (
            <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
              <JobAlerts />
            </div>
          )}

          {/* TAB 9: SECURE ADMIN CONSOLE */}
          {activeTab === 'admin' && currentUser?.role === 'admin' && (
            <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
              <AdminPanel token={token} />
            </div>
          )}

        </div>
      </main>

      {/* 4. FOOTER WITH ADSENSE INTEGRATED ACCESSIBILITY CHANNELS */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 text-xs" id="app-footer-copyright">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-black text-sm">CF</div>
                <h4 className="font-extrabold text-white text-base">CareerForge</h4>
              </div>
              <p className="text-slate-400 leading-relaxed pr-4">
                Democratizing executive career consulting, roadmap planning, and SSC curriculum evaluations for global youth.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3">Academic Channels</h5>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('ai-tools')} className="hover:text-indigo-400">AI Resume Optimizer</button></li>
                <li><button onClick={() => setActiveTab('ai-tools')} className="hover:text-indigo-400">Targeted Mock Interviews</button></li>
                <li><button onClick={() => setActiveTab('ai-tools')} className="hover:text-indigo-400">Strategic Roadmaps</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3">Quick Calculators</h5>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('calculators')} className="hover:text-indigo-400">SGPA Weighted tracker</button></li>
                <li><button onClick={() => setActiveTab('calculators')} className="hover:text-indigo-400">In-hand Pay Estimator</button></li>
                <li><button onClick={() => setActiveTab('calculators')} className="hover:text-indigo-400">Task Hour Planner</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3">AdSense Compliance</h5>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('info')} className="hover:text-indigo-400">Privacy Policy</button></li>
                <li><button onClick={() => setActiveTab('info')} className="hover:text-indigo-400">Disclaimer guidelines</button></li>
                <li><button onClick={() => setActiveTab('info')} className="hover:text-indigo-400">Contactsupport desk</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500" id="footer-bottom-row">
            <p>&copy; 2026-2027 CareerForge Inc. All computational rights and materials reserved.</p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1 text-emerald-500"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-ping"></span> Live status ok</span>
              <span>Built for high performance</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. COOKIE Notice BANNER (Section 10 requirements, dismissable) */}
      {!cookieDismissed && (
        <div 
          id="cookie-consent-bar" 
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-5 z-50 flex flex-col gap-3.5 animate-[slideUp_0.4s_ease]"
        >
          <div className="flex gap-3 items-start">
            <div className="p-2 bg-indigo-50 text-indigo-650 rounded-xl shrink-0 mt-0.5">
              <Cookie size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-xs text-slate-900">Cookie Consent Notice</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                CareerForge Hub uses cookies and browser caching metrics to optimize calculator inputs, save bookmarks, and map high-relevance ads for Google AdSense.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 text-[10px] pt-1">
            <button 
              onClick={() => setActiveTab('info')}
              className="px-3.5 py-1.5 font-bold hover:underline text-slate-500"
            >
              Examine Policies
            </button>
            <button 
              onClick={handleDismissCookies}
              className="bg-slate-900 hover:bg-indigo-650 px-4 py-1.5 rounded-xl font-bold text-white shadow-xs transition cursor-pointer"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
