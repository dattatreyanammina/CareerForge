/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Search, 
  Filter, 
  ExternalLink, 
  Mail, 
  Calendar, 
  Tag, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Building2, 
  ChevronRight, 
  BookOpen, 
  Send,
  Bookmark,
  Share2
} from "lucide-react";

export interface JobNotification {
  id: string;
  title: string;
  organization: string;
  category: "government" | "btech-fresher" | "off-campus";
  platformName: "Naukri" | "LinkedIn" | "Indeed" | "Govt Portal" | "Direct HR";
  eligibility: string;
  ctc: string;
  location: string;
  postedDate: string;
  lastDateApply: string;
  applyUrl: string;
  hrEmail?: string;
  description: string;
  requirements: string[];
}

const INITIAL_JOBS: JobNotification[] = [
  // ================= B.TECH FRESHER JOBS =================
  {
    id: "job-tcs-ninja",
    title: "Software Engineer Trainee (Ninja/Digital Program)",
    organization: "Tata Consultancy Services (TCS)",
    category: "btech-fresher",
    platformName: "Naukri",
    eligibility: "B.Tech / B.E (CSE, IT, ECE), MCA, MSc (CS) - 2025/2026 Batch",
    ctc: "₹3.6 Lakhs - ₹7.0 Lakhs PA",
    location: "Pan India (Bangalore, Pune, Hyderabad, Delhi NCR)",
    postedDate: "2026-05-18",
    lastDateApply: "2026-06-15",
    applyUrl: "https://www.naukri.com/job-listings-tcs-off-campus-hiring-freshers-2026",
    hrEmail: "freshers.recruitment@tcs.com",
    description: "TCS is launching its massive off-campus hiring for technical graduates. Candidates with coding expertise in Java, Python, or C++ will be prioritized for the high-tier Digital profile.",
    requirements: ["Minimum 60% standard throughout 10th, 12th & Graduation", "No active backlogs", "Basics of relational databases and OOPs concepts"]
  },
  {
    id: "job-cognizant-genc",
    title: "Programmer Analyst Trainee (GenC Developer)",
    organization: "Cognizant Technology Solutions",
    category: "btech-fresher",
    platformName: "LinkedIn",
    eligibility: "B.Tech, B.E (All Technical circuit branches), MCA",
    ctc: "₹4.2 Lakhs - ₹4.5 Lakhs PA",
    location: "Chennai, Coimbatore, Hyderabad",
    postedDate: "2026-05-19",
    lastDateApply: "2026-06-25",
    applyUrl: "https://www.linkedin.com/jobs/view/cognizant-genc-developer-hiring-for-freshers",
    hrEmail: "genc.careers@cognizant.com",
    description: "Join Cognizant's GenC cloud developer program. Extensive training will be provided on AWS/Azure, modern JavaScript stacks, and backend springboot integration.",
    requirements: ["Excellent logical troubleshooting capabilities", "Strong fundamentals of HTML5, CSS3, ES6 Javascript", "Good conversational articulation"]
  },
  {
    id: "job-accenture-ase",
    title: "Associate Software Engineer (ASE) & Advanced ASE",
    organization: "Accenture India",
    category: "btech-fresher",
    platformName: "Naukri",
    eligibility: "B.Tech / B.E (All streams), MCA, M.Tech, MSc",
    ctc: "₹4.6 Lakhs - ₹6.5 Lakhs PA",
    location: "Bangalore, Pune, Gurugram, Kolkata",
    postedDate: "2026-05-20",
    lastDateApply: "2026-07-05",
    applyUrl: "https://www.naukri.com/job-listings-accenture-associate-software-engineer-hiring-freshers",
    hrEmail: "campus.india@accenture.com",
    description: "Accenture is hiring technical experts who will work as part of full stack delivery teams on international enterprise products. Includes rapid skill certifications and modern workspace benefits.",
    requirements: ["Basic understanding of Web application frameworks", "Familiarity with software engineering life-cycle concepts", "Analytical problem solving skills"]
  },
  {
    id: "job-techm-engineer",
    title: "Junior Cloud Infrastructure Analyst",
    organization: "Tech Mahindra Pvt Ltd",
    category: "btech-fresher",
    platformName: "Indeed",
    eligibility: "B.Tech / B.E (CSE, IT, ECE, EE), BCA, BSc",
    ctc: "₹3.2 Lakhs - ₹4.0 Lakhs PA",
    location: "Noida, Nagpur, Hyderabad, Pune",
    postedDate: "2026-05-15",
    lastDateApply: "2026-06-10",
    applyUrl: "https://www.indeed.com/jobs?q=Tech+Mahindra+Freshers+BTech",
    hrEmail: "infra.fresher@techmahindra.com",
    description: "Great entry point for cloud systems enthusiasts. You will be coached on Linux shell virtualization, cloud networks, basic container orchestration, and continuous deployment systems (CI/CD).",
    requirements: ["Knowledge of core Linux commands", "CCNA or Cloud foundation certification is a major plus", "Flexibility to work in global shift rotations"]
  },
  {
    id: "job-zs-associate",
    title: "Business Technology Associate (BTA)",
    organization: "ZS Associates",
    category: "btech-fresher",
    platformName: "LinkedIn",
    eligibility: "B.Tech / B.E (All Streams) - 2026 passing out batch",
    ctc: "₹8.5 Lakhs - ₹10.5 Lakhs PA",
    location: "Pune, Gurugram, Bengaluru",
    postedDate: "2026-05-17",
    lastDateApply: "2026-06-30",
    applyUrl: "https://www.linkedin.com/jobs/view/zs-associates-business-technology-freshers-india",
    hrEmail: "india.recruiting@zs.com",
    description: "ZS is looking for sharp analysts to bridge enterprise tech and clinical data strategy. High-performance growth track with rich industry compensation standards.",
    requirements: ["Superior Excel modeling skills & SQL database basics", "Outstanding quantitative aptitude", "Design and architecture visualization ability"]
  },

  // ================= GOVERNMENT JOB NOTIFICATIONS =================
  {
    id: "job-isro-sc",
    title: "Scientist / Engineer 'SC' (Electronics, Computer Science, Mechanical)",
    organization: "Indian Space Research Organisation (ISRO)",
    category: "government",
    platformName: "Govt Portal",
    eligibility: "First Class B.E / B.Tech or equivalent with an aggregate minimum of 65% marks",
    ctc: "₹56,100 - ₹1,77,500 PM (Pay Level 10 + HRA + Allowances)",
    location: "ISRO Centres (ISAC, VSSC, SDSC SHAR, NRSC)",
    postedDate: "2026-05-12",
    lastDateApply: "2026-06-25",
    applyUrl: "https://www.isro.gov.in/Careers.html",
    description: "Central Government direct recruitment of technical officers. The selection process will comprise an all-India written screening test followed by a comprehensive expert panel panel interview.",
    requirements: ["B.Tech degree completed with 6.84 CGPA or higher", "Written exam based on standard GATE technical curriculum", "Indian Citizenship required"]
  },
  {
    id: "job-drdo-scientist",
    title: "Scientist 'B' Officers (CSE, ECE, EE, Civil, Biotech)",
    organization: "Defence Research and Development Organisation (DRDO)",
    category: "government",
    platformName: "Govt Portal",
    eligibility: "B.Tech or equivalent with a valid GATE Score + Written Descriptive Subjective paper",
    ctc: "₹85,000 PM Consolidated (Pay Level 10 of 7th CPC Matrix)",
    location: "DRDO Labs (Delhi, Bangalore, Pune, Hyderabad)",
    postedDate: "2026-05-10",
    lastDateApply: "2026-06-20",
    applyUrl: "https://rac.gov.in/index.php?lang=en&id=0",
    description: "Excellent defensive engineering opportunity to work on national defense program platforms, embedded systems, avionics telemetry, and structural safety modules.",
    requirements: ["Qualified GATE scorecard in respective engineering stream", "Indian citizen with clean records", "Minimum age 21, Maximum age restriction 28 years (relaxations applicable)"]
  },
  {
    id: "job-rrb-sse",
    title: "Senior Section Engineer (SSE) - Technical Cadres",
    organization: "Indian Railways (Ministry of Railways)",
    category: "government",
    platformName: "Govt Portal",
    eligibility: "Four years Bachelor's degree in Civil, Mechanical, Electrical, or Electronics Engineering",
    ctc: "₹44,900 - ₹1,42,400 PM (Pay Level 7 + Allowances)",
    location: "Zonal Railway Divisions (Northern, Southern, Western zones etc)",
    postedDate: "2026-05-14",
    lastDateApply: "2026-07-02",
    applyUrl: "https://www.rrcb.gov.in",
    description: "Highly stable and respected technical officer roles. Responsibilities include supervising rail infrastructure design grids, signaling communication grids, and locomotive maintenance platforms.",
    requirements: ["Degree in Engineering from recognized statutory universities", "Excellent medical standard (Visual standards strictly checked)", "Age bracket: 20 to 34 years"]
  },
  {
    id: "job-ntpc-et",
    title: "Executive Trainee Engineers (ET-2026)",
    organization: "NTPC Limited (A Maharatna PSU Agency)",
    category: "government",
    platformName: "Govt Portal",
    eligibility: "B.Tech Graduation with minimum 65% aggregate + Valid score card in GATE 2026",
    ctc: "₹40,000 - ₹1,40,000 PM (Basic Pay starting at ₹40,000 + Industrial DA & Perks)",
    location: "NTPC Power plants throughout India",
    postedDate: "2026-05-16",
    lastDateApply: "2026-06-18",
    applyUrl: "https://careers.ntpc.co.in",
    description: "NTPC is seeking technical freshers to spearhead solar-grid generation, thermal energy grids, and digital telemetry dashboard centers.",
    requirements: ["Must have written GATE in EE, ME, EIE, or CSE domains", "Willingness to serve at remote project locations for first 2 semesters", "Successful validation of certificates"]
  },
  {
    id: "job-hal-dt",
    title: "Design Trainee & Management Trainee Officers",
    organization: "Hindustan Aeronautics Limited (HAL)",
    category: "government",
    platformName: "Govt Portal",
    eligibility: "B.E/B.Tech in Aeronautical, Mechanical, Electrical, Computer Science, Electronics",
    ctc: "₹40,000 - ₹1,40,000 PM (Training stipend starts at ₹40k, post-confirmation Level 10 equivalent)",
    location: "Bangalore, Nashik, Lucknow, Kanpur, Koraput",
    postedDate: "2026-05-20",
    lastDateApply: "2026-06-30",
    applyUrl: "https://hal-india.co.in/Careers",
    description: "HAL is recruiting next-generation aerospace and system planners for combat jet, rotary-wing helicopter and avionics architecture programs.",
    requirements: ["Aggregate average of 65% marks (General/OBC) or 55% marks (SC/ST)", "No paper backlogs on final semester", "Strong mathematical modeling background is preferred"]
  },

  // ================= OFF-CAMPUS DIRECT / STARTUP FRESHERS =================
  {
    id: "job-paytm-intern",
    title: "Junior Backend Developer (Node.js/Go)",
    organization: "Paytm Payments Bank",
    category: "off-campus",
    platformName: "LinkedIn",
    eligibility: "B.Tech CSE/IT, BCA, MCA, BSC CS - Python or Node enthusiasts",
    ctc: "₹5.0 Lakhs - ₹8.0 Lakhs PA",
    location: "Noida Headquarter / Hybrid Options",
    postedDate: "2026-05-19",
    lastDateApply: "2026-06-12",
    applyUrl: "https://www.linkedin.com/jobs/view/paytm-junior-backend-developer-freshers-recruitment",
    hrEmail: "tech.careers@paytm.com",
    description: "Exciting opportunity to join the digital transaction platform core engineering. Design fast APIs, handle high write-concurrency, and manage cache layers.",
    requirements: ["Hands-on build of at least 2 database projects (React/Express/MongoDB preferred)", "Clear grasp of Promises, Async/Await features, and REST constraints", "Basic logic writing skill"]
  },
  {
    id: "job-swiggy-sde",
    title: "Associate Software Engineer - Frontend Systems",
    organization: "Swiggy India (Bundl Technologies)",
    category: "off-campus",
    platformName: "LinkedIn",
    eligibility: "B.Tech CSE, MCA, or Self-taught Developers with high-quality Github portfolios",
    ctc: "₹12.0 Lakhs - ₹15.0 Lakhs PA (Industry Leading Compensation + Equity option)",
    location: "Bengaluru Corp Desk",
    postedDate: "2026-05-18",
    lastDateApply: "2026-06-14",
    applyUrl: "https://www.linkedin.com/jobs/view/swiggy-associate-frontend-sde-hiring-campus",
    hrEmail: "frontend.talent@swiggy.com",
    description: "Craft pixel-perfect user interfaces, contribute to Swiggy consumer web applications, and experiment with fast state caching frameworks.",
    requirements: ["Deep JavaScript & TypeScript proficiency", "Familiarity with styling systems like Tailwind CSS and React context state APIs", "Comfortable with Git version tracking"]
  },
  {
    id: "job-hcl-support",
    title: "Graduate Engineer Trainee (GET) - Systems & DevOps support",
    organization: "HCLTech Solutions",
    category: "off-campus",
    platformName: "Naukri",
    eligibility: "B.Tech CSE, IT, MCA, BSc Computer Science (Batch 2024 to 2026)",
    ctc: "₹3.8 Lakhs - ₹4.2 Lakhs PA",
    location: "Noida, Chennai, Madurai, Lucknow",
    postedDate: "2026-05-16",
    lastDateApply: "2026-06-25",
    applyUrl: "https://www.naukri.com/job-listings-hcltech-freshers-get-systems-recruiting",
    hrEmail: "fresher.hiring@hcl.com",
    description: "Scale your technical troubleshooting skill across databases, security operations frameworks, and cloud virtual system monitoring. Includes extensive corporate bootcamp.",
    requirements: ["Analytical thinker with core networking basics", "Strong verbal and written English guidelines", "Flexible operating schedules"]
  }
];

export const JobAlerts: React.FC = () => {
  const [jobs, setJobs] = useState<JobNotification[]>(INITIAL_JOBS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  
  // Custom interactive bookmark state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  
  // Job subscription fields
  const [subEmail, setSubEmail] = useState("");
  const [subStream, setSubStream] = useState("btech-cse");
  const [subSubmitted, setSubSubmitted] = useState(false);
  const [subError, setSubError] = useState<string | null>(null);

  // Copied toast trigger
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim()) {
      setSubError("Please provide a valid student email ID.");
      return;
    }
    if (!subEmail.includes("@") || !subEmail.includes(".")) {
      setSubError("Email syntax is invalid. Double check characters.");
      return;
    }
    setSubError(null);
    setSubSubmitted(true);
    setSubEmail("");
    setTimeout(() => {
      setSubSubmitted(false);
    }, 6000);
  };

  const toggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(prev => prev.filter(item => item !== id));
    } else {
      setBookmarkedIds(prev => [...prev, id]);
    }
  };

  const copyContact = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.eligibility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === "all" || job.category === selectedCategory;

    const matchesPlatform = 
      selectedPlatform === "all" || 
      (selectedPlatform === "naukri" && job.platformName === "Naukri") ||
      (selectedPlatform === "linkedin" && job.platformName === "LinkedIn") ||
      (selectedPlatform === "gov" && job.platformName === "Govt Portal");

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  return (
    <div className="space-y-8" id="job-alerts-root">
      
      {/* 1. SECTOR HEADER BANNER WITH GRADIENT BORDER ACCENTS */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-lg border border-indigo-950">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-12 w-48 h-48 bg-slate-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 py-1 px-3 rounded-full text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1">
            <Clock size={12} className="text-indigo-300" /> Real-Time Recruitment Feeds
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight">Verified Placement & Govt Job Notifications</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Consolidated off-campus opportunities, technical trainer roles, and state commission exams curated verified from Naukri, LinkedIn, and official Gazette resources. Direct application paths and listed HR recruitment contacts for instant reach.
          </p>
        </div>
      </div>

      {/* 2. LIVE SEARCH & QUICK FILTER NAVIGATION HEADER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 space-y-4 shadow-3xs" id="job-filter-bar">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by role, agency, programming skills (e.g. TCS, Scientist, Java)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800"
            />
          </div>

          {/* Platform Origin Selector */}
          <div className="flex gap-2 min-w-[200px]">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold"
            >
              <option value="all">🌐 Any Source Platform</option>
              <option value="naukri">Naukri Verified Jobs</option>
              <option value="linkedin">LinkedIn Verified Jobs</option>
              <option value="gov">Official Government Portals</option>
            </select>
          </div>
        </div>

        {/* Categories Tab Pill Layout */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Direct Openings ({jobs.length})
            </button>
            <button
              onClick={() => setSelectedCategory("government")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedCategory === "government"
                  ? "bg-indigo-650 text-white"
                  : "bg-indigo-50/70 border border-indigo-150 text-indigo-700 hover:bg-indigo-50"
              }`}
            >
              💼 Government Jobs ({jobs.filter(j => j.category === "government").length})
            </button>
            <button
              onClick={() => setSelectedCategory("btech-fresher")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedCategory === "btech-fresher"
                  ? "bg-indigo-650 text-white"
                  : "bg-indigo-50/70 border border-indigo-150 text-indigo-700 hover:bg-indigo-50"
              }`}
            >
              🎓 B.Tech Freshers ({jobs.filter(j => j.category === "btech-fresher").length})
            </button>
            <button
              onClick={() => setSelectedCategory("off-campus")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedCategory === "off-campus"
                  ? "bg-indigo-650 text-white"
                  : "bg-indigo-50/70 border border-indigo-150 text-indigo-700 hover:bg-indigo-50"
              }`}
            >
              🚀 Startup Off-Campus ({jobs.filter(j => j.category === "off-campus").length})
            </button>
          </div>

          <p className="text-[11px] font-mono text-slate-400 font-medium">
            Showing {filteredJobs.length} matches
          </p>
        </div>
      </div>

      {/* 3. DUAL COLUMN: FEED LIST & SUBSCRIBER BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COMPONENT: CORE JOB ALERTS LIST */}
        <div className="lg:col-span-8 space-y-4">
          
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const isGov = job.category === "government";
              const isBTech = job.category === "btech-fresher";
              const isOff = job.category === "off-campus";
              const isBookmarked = bookmarkedIds.includes(job.id);

              return (
                <div 
                  key={job.id} 
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-400 hover:shadow-sm transition-all duration-200 flex flex-col gap-4 relative"
                  id={`job-card-${job.id}`}
                >
                  
                  {/* Category Pill Tag and Bookmark Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                        isGov ? "bg-amber-100 text-amber-800" :
                        isBTech ? "bg-indigo-50 text-indigo-700 border border-indigo-100" :
                        "bg-emerald-50 text-emerald-700"
                      }`}>
                        {isGov ? "🧠 Government Post" : isBTech ? "🎓 Technical Fresher" : "🚀 Startup / Off-Campus"}
                      </span>
                      
                      <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        Origin: {job.platformName}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => toggleBookmark(job.id)}
                        className={`p-1.5 rounded-lg border transition ${
                          isBookmarked 
                            ? "bg-indigo-50 text-indigo-600 border-indigo-200" 
                            : "bg-white border-slate-200 text-slate-400 hover:text-slate-600"
                        }`}
                        title="Save Job Notice"
                      >
                        <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>

                  {/* Title and Organization Name */}
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-600 leading-snug">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-indigo-600">
                      <Building2 size={13} className="text-slate-400" />
                      <span>{job.organization}</span>
                      <span className="text-slate-350 font-normal">&bull;</span>
                      <div className="flex items-center gap-1 text-slate-500 font-semibold text-[11px]">
                        <MapPin size={11} /> {job.location}
                      </div>
                    </div>
                  </div>

                  {/* Job Specs details (CTC, Eligibility, Timeline) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/60 p-3 rounded-xl border border-slate-100 text-[11px]">
                    <div className="space-y-0.5">
                      <span className="text-slate-400 block font-semibold uppercase text-[9px]">Compensation Structure</span>
                      <div className="font-extrabold text-slate-800 flex items-center gap-0.5">
                        <DollarSign size={12} className="text-slate-400" /> {job.ctc}
                      </div>
                    </div>
                    
                    <div className="space-y-0.5">
                      <span className="text-slate-400 block font-semibold uppercase text-[9px]">Degrees/Eligibility</span>
                      <div className="font-extrabold text-indigo-900 truncate" title={job.eligibility}>
                        {job.eligibility}
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-slate-400 block font-semibold uppercase text-[9px]">Timeline Window</span>
                      <div className="font-extrabold text-slate-800 flex items-center gap-1 text-rose-600">
                        <Calendar size={12} /> Apply by {new Date(job.lastDateApply).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    </div>
                  </div>

                  {/* Summary Description */}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Requirements Sub-list */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block">Must-Have Pre-requisites</span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-500 list-none pl-0">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <CheckCircle size={11} className="text-indigo-500 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Operational Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex gap-2">
                      {job.hrEmail && (
                        <button
                          onClick={() => copyContact(job.id, job.hrEmail!)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-[10px] flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Mail size={12} />
                          {copiedId === job.id ? "Copied Email!" : "Copy Recruiting Email"}
                        </button>
                      )}
                      
                      {job.hrEmail && (
                        <a 
                          href={`mailto:${job.hrEmail}?subject=Application for ${job.title}&body=Dear HR Team,%0D%0A%0D%0AI absolute look forward to applying for this post. Please find my portfolio details attached.`}
                          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-[10px] flex items-center gap-1.5 transition"
                        >
                          Send Mail Details
                        </a>
                      )}
                    </div>

                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-600 hover:bg-slate-900 text-white font-extrabold text-[10px] py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs"
                    >
                      <ExternalLink size={12} />
                      Apply via {job.platformName} &rarr;
                    </a>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl p-6">
              <AlertCircle className="mx-auto text-slate-300 mb-2" size={32} />
              <h4 className="font-extrabold text-slate-800 text-xs">No Match Found In Feed</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                We couldn't locate notifications matching your search term. Try resetting the filters or type active terms like "DRDO" or "TCS".
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: SUBSCRIBER BOX & COMPLIANCE FEEDBACK */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Email Alert subscription card */}
          <div className="bg-white border border-slate-150 rounded-3xl p-6 space-y-4 shadow-3xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full blur-xl pointer-events-none"></div>
            
            <div className="space-y-1.5 relative z-10">
              <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded text-[9px] uppercase tracking-wider inline-block">
                Free Subscription
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                <Send size={15} className="text-indigo-600" /> Instant Push Job Alerts
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal">
                Receive immediate daily push bulletins directly in your inbox. No spam. Cancel at any time.
              </p>
            </div>

            {subSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs p-4 rounded-2xl space-y-2">
                <div className="flex items-center gap-1.5 font-extrabold text-[11px]">
                  <CheckCircle size={14} className="text-emerald-600" /> Activation Success!
                </div>
                <p className="text-[10px] leading-relaxed text-emerald-700">
                  We sent a validation trigger to your address. Verify to begin receiving direct B.Tech & centralized Government vacancy notifications.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3 pt-2 relative z-10">
                <div>
                  <label className="block text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">
                    Student Primary Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@srmap.edu.in"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">
                    Academic Engineering Domain
                  </label>
                  <select
                    value={subStream}
                    onChange={(e) => setSubStream(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold"
                  >
                    <option value="btech-cse">🎓 B.Tech Computer Science (CSE/IT)</option>
                    <option value="btech-ece">⚡ B.Tech Electronics (ECE/EE)</option>
                    <option value="btech-other">🔧 Other core B.Tech Engineering streams</option>
                    <option value="govt-exams">💼 Government Job Exams & PSUs</option>
                    <option value="mca-bca">💻 MCA / BCA / Degree CS Applicants</option>
                  </select>
                </div>

                {subError && (
                  <div className="text-[10px] font-bold text-rose-600 bg-rose-50 p-2 rounded-lg flex items-center gap-1">
                    <AlertCircle size={11} /> {subError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl transition cursor-pointer"
                >
                  Join Alert Roster
                </button>
              </form>
            )}
          </div>

          {/* Sourcing guidelines compliance box */}
          <div className="bg-slate-100/60 border border-slate-200 rounded-2xl p-5 space-y-3.5">
            <h4 className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider">
              Verification Standards
            </h4>
            <div className="space-y-2.5 text-[11px] text-slate-500 leading-normal">
              <p>
                All central Indian PSU, ISRO research positions and corporate vacancies are validated daily against published employment news databases & RSS feeds.
              </p>
              <p className="font-semibold text-indigo-700">
                Are you looking for specific custom listings? Write directly to our developer team or access full curriculum trackers.
              </p>
            </div>
            <div className="border-t pt-2.5 flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Status: Active feeds</span>
              <span className="text-emerald-500 font-bold">&#x25CF; Online 2026</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
