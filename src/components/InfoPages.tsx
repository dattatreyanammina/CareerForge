/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Info, Mail, ShieldAlert, FileText, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

export const InfoPages: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'seo'>('seo');
  const [seoTab, setSeoTab] = useState<'blueprint' | 'blog' | 'adsense' | 'technical'>('blueprint');
  const [copiedSchemaId, setCopiedSchemaId] = useState<string | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("✨ Thank you! your inquiry has been successfully dispatched to the CareerForge academic desk.");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
    setTimeout(() => setFeedback(null), 5000);
  };

  return (
    <div className="bg-white border rounded-3xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 shadow-sm" id="legal-compliance-deck">
      {/* Document Sidebar Selector */}
      <div className="lg:w-64 space-y-2 shrink-0">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-3 mb-4">SEO & Monetization</h3>

        <button
          onClick={() => setActiveDoc('seo')}
          className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
            activeDoc === 'seo' ? 'bg-indigo-650 text-indigo-700 bg-indigo-50/80 font-black' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <TrendingUp size={16} className="text-emerald-500 animate-[bounce_2s_infinite]" />
          <span>SEO & Content Hub</span>
        </button>
        
        <button
          onClick={() => setActiveDoc('about')}
          className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
            activeDoc === 'about' ? 'bg-indigo-650 text-indigo-700 bg-indigo-50/80 font-black' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Info size={16} />
          About Center
        </button>
        <button
          onClick={() => setActiveDoc('contact')}
          className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
            activeDoc === 'contact' ? 'bg-indigo-650 text-indigo-700 bg-indigo-50/80 font-black' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Mail size={16} />
          Contact Support Desk
        </button>
        <button
          onClick={() => setActiveDoc('privacy')}
          className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
            activeDoc === 'privacy' ? 'bg-indigo-650 text-indigo-700 bg-indigo-50/80 font-black' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FileText size={16} />
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveDoc('terms')}
          className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
            activeDoc === 'terms' ? 'bg-indigo-650 text-indigo-700 bg-indigo-50/80 font-black' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FileText size={16} />
          Terms & Conditions
        </button>
        <button
          onClick={() => setActiveDoc('disclaimer')}
          className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
            activeDoc === 'disclaimer' ? 'bg-indigo-650 text-indigo-700 bg-indigo-50/80 font-black' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ShieldAlert size={16} />
          Academic Disclaimer
        </button>
      </div>

      {/* Main Legal Content Display */}
      <div className="flex-1 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8 min-h-[380px]" id="doc-active-view">
        {activeDoc === 'seo' && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
            {/* Header Banner and Introduction */}
            <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-5 relative overflow-hidden border border-emerald-950">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10 space-y-1.5">
                <span className="bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 py-0.5 px-2.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1">
                  <Sparkles size={11} className="text-emerald-300" /> Professional SEO Playbook
                </span>
                <h3 className="text-lg lg:text-xl font-extrabold tracking-tight">CareerForge Organic Growth Center</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed max-w-xl">
                  Strategic roadmap built explicitly for India's B.Tech placement aspirants, engineering freshers, and government examination seekers. Structured to maximize traffic, boost AdSense clicks, and secure high Google SERP visibility.
                </p>
              </div>
            </div>

            {/* Inner Sub-navigation Controls */}
            <div className="flex flex-wrap gap-1.5 bg-slate-50 border p-1 rounded-xl">
              <button
                onClick={() => setSeoTab('blueprint')}
                className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition ${
                  seoTab === 'blueprint' ? 'bg-white text-indigo-700 shadow-xs border border-slate-205/60' : 'text-slate-550 hover:text-slate-800'
                }`}
              >
                📝 Page Blueprints
              </button>
              <button
                onClick={() => setSeoTab('blog')}
                className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition ${
                  seoTab === 'blog' ? 'bg-white text-indigo-700 shadow-xs border border-slate-205/60' : 'text-slate-550 hover:text-slate-800'
                }`}
              >
                ✍️ Blog & Content
              </button>
              <button
                onClick={() => setSeoTab('adsense')}
                className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition ${
                  seoTab === 'adsense' ? 'bg-white text-indigo-700 shadow-xs border border-slate-205/60' : 'text-slate-550 hover:text-slate-800'
                }`}
              >
                💰 CPC & AdSense
              </button>
              <button
                onClick={() => setSeoTab('technical')}
                className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition ${
                  seoTab === 'technical' ? 'bg-white text-indigo-700 shadow-xs border border-slate-205/60' : 'text-slate-550 hover:text-slate-800'
                }`}
              >
                ⚙️ Technical & Schema
              </button>
            </div>

            {/* SUB-TAB 1: BLUEPRINT CAMPAIGN PLANNER */}
            {seoTab === 'blueprint' && (
              <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
                
                {/* Visual Google Snippet Simulator */}
                <div className="bg-slate-50 border rounded-xl p-4 space-y-2.5">
                  <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                    Google Search Result Simulator
                  </h4>
                  <div className="bg-white border rounded-lg p-3.5 shadow-3xs max-w-xl font-sans">
                    <span className="text-[11px] text-slate-500 font-normal">https://careerforge.sh/placement/job-alerts</span>
                    <h3 className="text-indigo-800 hover:underline text-sm font-semibold tracking-tight leading-snug cursor-pointer pt-0.5">
                      ISRO Scientist & B.Tech Job Alerts 2026 | Direct Off-Campus Apply
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-normal pt-1">
                      Verified government PSU, research vacancies, and entry-level B.Tech fresher jobs. Get direct HR mailing details, eligibility criteria, and immediate call routines.
                    </p>
                    <div className="flex gap-4 text-[10px] text-slate-400 font-mono mt-2 pt-1 border-t border-slate-50">
                      <span>Rating: 4.9 ★★★★★</span>
                      <span>Votes: 142</span>
                      <span>Free App</span>
                    </div>
                  </div>
                </div>

                {/* Primary Pillars Information Mapping */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-xl p-4 bg-white space-y-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">1</span>
                      <h4 className="font-extrabold text-slate-800 text-xs">Pillar A: Job Alerts Directory</h4>
                    </div>
                    <ul className="space-y-2 text-[11px] text-slate-600 list-none pl-0">
                      <li>• <strong>Focus Keyword:</strong> B.Tech job notifications 2026</li>
                      <li>• <strong>SEO Title:</strong> Verified Government & B.Tech Job Alerts 2026 | Direct Apply</li>
                      <li>• <strong>Meta Description:</strong> Track ISRO SC, DRDO Scientists vacancy posts, and entry-level B.Tech circuit engineer recruitments in real-time.</li>
                      <li>• <strong>URL Slug:</strong> <code className="text-indigo-600">/job-alerts-btech-freshers</code></li>
                      <li>• <strong>Alt Suggestion:</strong> "Accenture entry-level trainee recruitment direct application page"</li>
                      <li>• <strong>Call to Action:</strong> "Join Roster for Free Job Bulletins"</li>
                    </ul>
                  </div>

                  <div className="border rounded-xl p-4 bg-white space-y-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">2</span>
                      <h4 className="font-extrabold text-slate-800 text-xs">Pillar B: Aptitude & Mock Exams</h4>
                    </div>
                    <ul className="space-y-2 text-[11px] text-slate-600 list-none pl-0">
                      <li>• <strong>Focus Keyword:</strong> SSC CGL quantitative aptitude test</li>
                      <li>• <strong>SEO Title:</strong> Free Sectional SSC CGL & Placement Aptitude Tests | Solutions</li>
                      <li>• <strong>Meta Description:</strong> Solve free timed mock papers in Quantitative Aptitude, Logical Reasoning, and English Grammar with solutions.</li>
                      <li>• <strong>URL Slug:</strong> <code className="text-indigo-600">/free-sectional-mocks-aptitude</code></li>
                      <li>• <strong>Alt Suggestion:</strong> "Algebra formula and quantitative questions portal on CareerForge"</li>
                      <li>• <strong>Call to Action:</strong> "Begin Timed Quantitative Exam"</li>
                    </ul>
                  </div>
                </div>

                {/* Sourcing Structure Checklist */}
                <div className="border rounded-xl p-4 space-y-3.5">
                  <h4 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5">
                    🎯 Semantic Keywords & Headings Mapping Structure
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] text-slate-600 bg-slate-50/55 p-3 rounded-xl">
                    <div className="space-y-1">
                      <span className="block font-black text-indigo-700 text-[10px] uppercase">H1 Display heading</span>
                      <p className="font-semibold text-slate-700">"Verified Career Placement & Government Job Notifications Hub"</p>
                    </div>
                    <div className="space-y-1">
                      <span className="block font-black text-indigo-700 text-[10px] uppercase">H2 Sectional subheaders</span>
                      <p className="text-slate-550">"1. Central Government Research Recruitments"<br />"2. Private Sector Off-Campus Drives for B.Tech"</p>
                    </div>
                    <div className="space-y-1">
                      <span className="block font-black text-indigo-700 text-[10px] uppercase">H3 Topic subheaders</span>
                      <p className="text-slate-550">"Eligibility & CGPA Criteria"<br />"How to Draft a Responding Application to HR"</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* SUB-TAB 2: BLOG & CONTENT STRATEGY */}
            {seoTab === 'blog' && (
              <div className="space-y-4 animate-[fadeIn_0.2s_ease]">
                
                {/* 1. Low competition Blog Topic Planner */}
                <div className="border rounded-xl p-4 bg-white space-y-3">
                  <h4 className="font-extrabold text-slate-800 text-xs">
                    📅 High-Traffic, Low-Competition Editorial Topics
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-600">
                    <div className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg space-y-1 border">
                      <span className="font-bold text-slate-800 text-xs">Topic 1: ISRO SC Scientist recruitment guide</span>
                      <p className="text-[10px] text-slate-500">GATE score minimum cutoffs, level-10 basic payroll details, research panel interview formats.</p>
                      <span className="text-[9px] font-mono font-bold text-indigo-600">Keyword: "isro scientist eligibility direct entry"</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg space-y-1 border">
                      <span className="font-bold text-slate-800 text-xs">Topic 2: TCS Digital vs Ninja placement syllabus</span>
                      <p className="text-[10px] text-slate-500">Direct comparison criteria, logical debugging question patterns, and actual salary breakdowns.</p>
                      <span className="text-[9px] font-mono font-bold text-indigo-600">Keyword: "tcs digital programming interview questions"</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg space-y-1 border">
                      <span className="font-bold text-slate-800 text-xs">Topic 3: Free aptitude shortcut formulas</span>
                      <p className="text-[10px] text-slate-500">Fast solve rules for Algebra, profit percent loss ratios, and circular seating tracks.</p>
                      <span className="text-[9px] font-mono font-bold text-indigo-600">Keyword: "algebra shortcut tricks for placement exam"</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg space-y-1 border">
                      <span className="font-bold text-slate-800 text-xs">Topic 4: HR cold mailing drafts 2026</span>
                      <p className="text-[10px] text-slate-500">High response templates, portfolio highlight setups, and following up schedules.</p>
                      <span className="text-[9px] font-mono font-bold text-indigo-600">Keyword: "cold email template for internship freshers"</span>
                    </div>
                  </div>
                </div>

                {/* 2. Natural human-written content sample with EEAT guidelines */}
                <div className="border rounded-xl p-4 bg-emerald-50/20 border-emerald-100 space-y-3.5">
                  <div className="flex justify-between items-center">
                    <h4 className="font-extrabold text-slate-800 text-xs">
                      🌿 Human-Written Content Blueprint (EEAT Guidelines)
                    </h4>
                    <span className="bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      Authoritative Copy
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed italic">
                    "When applying for the **ISRO Scientist 'SC' (electronics/computer science)** post, aspirants often get lost in confusing forum rumors. As engineering advisors who have analyzed official recruitment notifications over the last five seasons, we recommend focusing strictly on GATE Core syllabus frameworks. Candidates from SRM and top technology institutes must present clean, verifiable academic project portfolios at the interview panels..."
                  </p>
                  
                  <div className="bg-white/80 p-3 rounded-lg border text-[11px] text-slate-500 space-y-2">
                    <span className="font-bold block text-[10px] text-slate-700 uppercase">💡 Internal Link Strategy Recommendations:</span>
                    <ul className="list-disc pl-4 space-y-1 text-[10.5px]">
                      <li>Link from <strong>ISRO Scientist Guide</strong> post directly to our <strong>Sectional Mock Exams</strong> page to complete practice iterations.</li>
                      <li>Link from <strong>TCS off-campus blogs</strong> to our <strong>AIPowered Resume Generator</strong> to help candidates draft professional profiles.</li>
                    </ul>
                  </div>
                </div>

              </div>
            )}

            {/* SUB-TAB 3: CPC & ADSENSE STRATEGIES */}
            {seoTab === 'adsense' && (
              <div className="space-y-4 animate-[fadeIn_0.2s_ease]">
                
                {/* Visual Ad Placement Architecture Strategy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-xl p-4 bg-white space-y-3">
                    <h4 className="font-extrabold text-indigo-950 text-xs">
                      🔥 High-Value CPC Keywords List
                    </h4>
                    <p className="text-slate-500 text-[11px]">
                      Inject these commercial intent keywords naturally in your guides to attract premium Google AdSense ads:
                    </p>
                    <div className="space-y-1.5 font-mono text-[10.5px]">
                      <div className="flex justify-between border-b pb-1 text-slate-600">
                        <span>"B.Tech career certification online"</span>
                        <span className="text-emerald-700 font-bold">High CPC</span>
                      </div>
                      <div className="flex justify-between border-b pb-1 text-slate-600">
                        <span>"DRDO Scientist vacancy timeline 2026"</span>
                        <span className="text-emerald-700 font-bold">Medium CPC</span>
                      </div>
                      <div className="flex justify-between border-b pb-1 text-slate-600">
                        <span>"placement resume builder tools free"</span>
                        <span className="text-emerald-700 font-bold">High CPC</span>
                      </div>
                      <div className="flex justify-between pb-1 text-slate-600">
                        <span>"quantitative aptitude test online course"</span>
                        <span className="text-emerald-700 font-bold">High CPC</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-xl p-4 bg-indigo-50/30 border-indigo-100 space-y-3">
                    <h4 className="font-extrabold text-indigo-950 text-xs">
                      📱 AdSense Layout Optimization Rules
                    </h4>
                    <ul className="text-[11px] text-indigo-900 space-y-2 list-disc pl-4">
                      <li>
                        <strong>In-Article Banner Placements:</strong> Mount banner units right between Mock Exam section grids and resume template fields to secure high clickability indices.
                      </li>
                      <li>
                        <strong>Sidebar Ad Units:</strong> Mount large sky-scrapers in long-read interview guides to utilize dead negative margins on tablets and widescreen panels.
                      </li>
                      <li>
                        <strong>Anchor Screen Ads:</strong> Ensure anchor mobile banners exist safely without blocking core Touch inputs.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Backlink Strategy Planning */}
                <div className="border rounded-xl p-4 bg-slate-50 space-y-2.5">
                  <h4 className="font-extrabold text-slate-805 text-xs">
                    🔗 Strategic Backlink Architecture
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Gain authority fast in the competitive "Government jobs" niche by executing these 3 methods:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1.5 text-[11px] text-indigo-950 font-medium">
                    <li><strong>Alumni Network Distribution:</strong> Share student placement feedback posts across SRM academic directories, building real .edu citation anchors.</li>
                    <li><strong>Recruiter Directory Registrations:</strong> Submit direct HR emails to developer aggregate sites, boosting anchor index authority.</li>
                    <li><strong>GitHub Repository Cite:</strong> Link the applet source code explicitly as an open-source tool, obtaining strong developer backlink signals.</li>
                  </ol>
                </div>

              </div>
            )}

            {/* SUB-TAB 4: TECHNICAL SEO & JSON-LD SCHEMAS */}
            {seoTab === 'technical' && (
              <div className="space-y-4 animate-[fadeIn_0.2s_ease]">
                
                {/* 1. Schema Generation console */}
                <div className="border rounded-xl p-4 bg-white space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-extrabold text-slate-800 text-xs">
                      📂 Dynamic Schema Markup (JSON-LD)
                    </h4>
                    <button
                      onClick={() => {
                        const codeString = `{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [\n    {\n      "@type": "Question",\n      "name": "How to apply for entry-level B.Tech job notifications of 2026?",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "Graduates can utilize CareerForge to browse verified job notifications directly scraped from Naukri, LinkedIn, and PSU news, featuring verified HR recruitment emails and official portal links."\n      } \n    }\n  ]\n}`;
                        navigator.clipboard.writeText(codeString);
                        setCopiedSchemaId('faq');
                        setTimeout(() => setCopiedSchemaId(null), 2005);
                      }}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-205 text-[10px] font-bold rounded-lg transition text-slate-600"
                    >
                      {copiedSchemaId === 'faq' ? "Copied Schema JSON!" : "Copy JSON-LD"}
                    </button>
                  </div>

                  <pre className="text-[9.5px] font-mono text-indigo-700 bg-indigo-50/50 p-3 rounded-lg overflow-x-auto select-all max-h-[160px] leading-relaxed">
{`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to apply for entry-level B.Tech job notifications of 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Graduates can browse verified job notifications directly curated from Naukri, LinkedIn, and government PSU news, containing direct apply paths."
      }
    }
  ]
}`}
                  </pre>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    💡 **Schema Tips:** Inject this block within the <code className="bg-slate-50 px-1 py-0.5 rounded">&lt;head&gt;</code> element of your page to generate Google Rich Snippets (visual search FAQ drops).
                  </p>
                </div>

                {/* FAQ section and Mobile checklist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Frequently Asked Questions */}
                  <div className="border rounded-xl p-4 bg-white space-y-3">
                    <h4 className="font-extrabold text-slate-800 text-xs">
                      💬 Native Human-Centered FAQ Section
                    </h4>
                    <div className="space-y-2 text-[11px] text-slate-600">
                      <div>
                        <span className="font-extrabold text-slate-800 block">Q: Does CareerForge charge for job vacancy lists?</span>
                        <p className="text-slate-500 text-[10.5px]">A: No, all B.Tech fresco postings and state commission exam notifications are absolutely free.</p>
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-800 block">Q: How frequently are Mock exams updated?</span>
                        <p className="text-slate-500 text-[10.5px]">A: Our team reviews published SSC exam structures weekly to keep algebraic quizzes fully optimized.</p>
                      </div>
                    </div>
                  </div>

                  {/* Core Web Vitals & Technical rules */}
                  <div className="border rounded-xl p-4 bg-white space-y-2">
                    <h4 className="font-extrabold text-slate-800 text-xs">
                      🚀 Core Web Vitals & Page Speed optimization
                    </h4>
                    <div className="text-[11.5px] space-y-1.5 text-slate-600">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <span className="text-emerald-500">✓</span> <span><strong>Mobile UX:</strong> Maintain 44px Minimum touch sizes (achieved in CareerForge selectors!).</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <span className="text-emerald-500">✓</span> <span><strong>Lazy Loading:</strong> Implement browser native <code className="text-indigo-650 bg-slate-50 px-1 rounded">loading="lazy"</code> on placement images.</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <span className="text-emerald-500">✓</span> <span><strong>LCP Optimization:</strong> Store local states in optimized React memo blocks to prevent reflows.</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {activeDoc === 'about' && (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-slate-800">About CareerForge</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              At <strong>CareerForge</strong>, our core, strategic objective is to democratize elite career consulting, engineering guidance, resource roadmaps, and competitive examinations training for students and career changers worldwide.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our unique platform merges client-side computation engines (like CGPA tracking worksheets and salary structures) with Gemini system intelligence, preparing the modern graduate for high-velocity global recruiters.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="font-bold text-xs text-slate-800">100% Free Resources</span>
                <p className="text-[11px] text-slate-500 mt-1">Accelerate exam strategies without paying subscription gates.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="font-bold text-xs text-slate-800">AdSense Verified Layout</span>
                <p className="text-[11px] text-slate-500 mt-1">High readability scores with dedicated spaces mapping Google ad segments.</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        {activeDoc === 'contact' && (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-slate-800">Contact Support Desk</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Have any suggestions regarding quantitative aptitude tricks, SSC quizzes, or Gemini model improvements? Send us an inquiry!
            </p>

            {feedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs rounded-xl flex items-center gap-1.5">
                <CheckCircle2 size={14} /> {feedback}
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4 max-w-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">Inquiry Statement / Suggestion</label>
                <textarea
                  rows={4}
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-800 resize-none"
                  placeholder="Tell us what you want added to CareerForge..."
                />
              </div>

              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-xs transition"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        )}

        {/* Privacy Policy */}
        {activeDoc === 'privacy' && (
          <div className="space-y-4 pr-2 max-h-[380px] overflow-y-auto">
            <h3 className="text-xl font-extrabold text-slate-800">Privacy & Policy</h3>
            <p className="text-xs text-slate-500 text-right">Last modified: May 20, 2026</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              We respect your right to private, unmonitored education. <strong>CareerForge Hub</strong> does not track behavioral identity parameters or store actual passwords. All mock resume, planner, and user settings are persisted in-memory or securely backed up inside your local browser.
            </p>
            <h4 className="font-bold text-xs text-slate-800 pt-2">DoubleClick AdSense Cookies</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Google, as a third-party vendor, uses cookies to serve ads on CareerForge. Google's use of the DART cookie enables it to serve ads based on visits to modern educational apps on the internet.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students can choose to opt-out of personalized advertising by visiting external Google Ad settings.
            </p>
          </div>
        )}

        {/* Terms and conditions */}
        {activeDoc === 'terms' && (
          <div className="space-y-4 pr-2 max-h-[380px] overflow-y-auto">
            <h3 className="text-xl font-extrabold text-slate-800">Terms & Conditions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              By accessing the calculations or generative outputs provided by CareerForge AI, you agree to comply with standard academic integrity codes, respecting open-source guidelines.
            </p>
            <h4 className="font-bold text-xs text-slate-800 pt-2">Acceptable Platform Utilization</h4>
            <ul className="list-disc pl-5 text-xs text-slate-600 space-y-2 leading-relaxed">
              <li>Do not run automation scrapers on our blogs to prevent heavy API costs.</li>
              <li>Calculated CGPA metrics represent approximate scores aligning with standard 9.5 factor multiplication rates. Double-check results against your university handbook.</li>
            </ul>
          </div>
        )}

        {/* Disclaimer */}
        {activeDoc === 'disclaimer' && (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-slate-800">Academic Disclaimer</h3>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
              <p className="text-xs text-amber-900 leading-relaxed">
                🚨 <strong>Guidance Disclaimer:</strong> All career roadmaps, resume resume summaries, study planners, mock interview questions, and quantitative answers generated by the Gemini AI models or mock calculations represents generic academic guidance.
              </p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              CareerForge does not guarantee job placement, recruiter interviews, or specific passing score points on government examinations (such as SSC CGL, UPSC, or Banking). Use these materials as reference resources alongside formal college syllabus benchmarks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
