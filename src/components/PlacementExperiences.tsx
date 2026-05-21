import React, { useState } from "react";
import { 
  PLACEMENT_EXPERIENCES, 
  CompanyExperience, 
  PlacementReview 
} from "../data/placementExperiences";
import { 
  Building2, 
  Search, 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  SlidersHorizontal, 
  Grid, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Sparkles,
  PlusCircle,
  Hash
} from "lucide-react";

export const PlacementExperiences: React.FC = () => {
  const [experiences, setExperiences] = useState<CompanyExperience[]>(PLACEMENT_EXPERIENCES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  // Form State for mock submission
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [newIndustry, setNewIndustry] = useState("Consumer Tech / Software");
  const [newLocation, setNewLocation] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDifficulty, setNewDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [newRating, setNewRating] = useState(4);
  const [newStatus, setNewStatus] = useState<"Selected" | "Rejected" | "Offered">("Selected");
  const [newRounds, setNewRounds] = useState("");
  const [newExperienceText, setNewExperienceText] = useState("");
  const [newTipsText, setNewTipsText] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Extract unique industries for filtering
  const industries = ["All", ...Array.from(new Set(experiences.map(e => e.industry)))];

  // Filters calculation
  const filteredCompanies = experiences.filter(comp => {
    const matchesSearch = 
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.reviews.some(r => r.role.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesIndustry = selectedIndustry === "All" || comp.industry === selectedIndustry;

    const matchesDifficulty = selectedDifficulty === "All" || comp.reviews.some(r => r.difficulty === selectedDifficulty);

    const matchesStatus = selectedStatus === "All" || comp.reviews.some(r => r.status === selectedStatus);

    return matchesSearch && matchesIndustry && matchesDifficulty && matchesStatus;
  });

  // Calculate total reviews
  const totalReviewsCount = filteredCompanies.reduce((acc, comp) => acc + comp.reviews.length, 0);

  const toggleExpand = (name: string) => {
    if (expandedCompany === name) {
      setExpandedCompany(null);
    } else {
      setExpandedCompany(name);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRole || !newExperienceText) {
      alert("Please populate the primary company, design role, and round experience inputs.");
      return;
    }

    const brandReview: PlacementReview = {
      role: newRole,
      difficulty: newDifficulty,
      rating: newRating,
      status: newStatus,
      roundsText: newRounds || "Multiple Rounds",
      experienceText: newExperienceText,
      tipsText: newTipsText || "Practice general mock algorithms, core OOPS, standard SQL, and speak out loud.",
      date: new Date().toISOString().slice(0, 7) // e.g. '2026-05'
    };

    // Check if company exists
    const existsIdx = experiences.findIndex(e => e.name.toLowerCase() === newCompany.toLowerCase());
    if (existsIdx !== -1) {
      const updated = [...experiences];
      updated[existsIdx].reviews = [brandReview, ...updated[existsIdx].reviews];
      setExperiences(updated);
    } else {
      const brandCompany: CompanyExperience = {
        name: newCompany,
        industry: newIndustry,
        location: newLocation || "India Office / Remote",
        logoColor: "from-indigo-500 to-indigo-700",
        reviews: [brandReview]
      };
      setExperiences([brandCompany, ...experiences]);
    }

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowAddForm(false);
      // Reset
      setNewCompany("");
      setNewLocation("");
      setNewRole("");
      setNewRounds("");
      setNewExperienceText("");
      setNewTipsText("");
    }, 2500);
  };

  return (
    <div className="space-y-6" id="placement-reviews-module">
      
      {/* HEADER CONTROLS CARD */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 lg:p-8 space-y-4 shadow-3xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Building2 className="text-indigo-600" />
              Crowdsourced Interview & Placement Experiences
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Browse <strong>100+ verified anonymous reviews</strong> across <strong>50+ premium companies</strong>. Learn syllabus targets, coding rounds structures, and actual tips.
            </p>
          </div>
          
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 hover:bg-slate-900 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 self-start md:self-auto cursor-pointer shadow-xs"
          >
            <PlusCircle size={14} />
            Share Your Experience
          </button>
        </div>

        {/* CROWDSOURCED FORM DRAWER */}
        {showAddForm && (
          <form onSubmit={handleFormSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 animate-fade-in">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={12} className="text-indigo-600" />
              Contribute Anonymous Review
            </h4>

            {formSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-black flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                Thank you! Your placement review has been logged anonymously and injected in real-time.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Netflix, Stripe, Zoho"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">Industry Category</label>
                  <select
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Consumer Tech / Software">Consumer Tech / Software</option>
                    <option value="Enterprise / Cloud Tech">Enterprise / Cloud Tech</option>
                    <option value="Fintech & Payments SDE">Fintech & Payments SDE</option>
                    <option value="IT Service Advisory">IT Service Advisory</option>
                    <option value="Consulting & Strategic Advisory">Consulting & Strategic Advisory</option>
                    <option value="Semiconductors & AI Tech">Semiconductors & AI Tech</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">Job Role Design *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Frontend SDE-1, Data Analyst"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">Location (Office/Remote)</label>
                  <input
                    type="text"
                    placeholder="e.g. Noida Office"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">Rounds Structure</label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Cognitive Test + 2 Technical"
                    value={newRounds}
                    onChange={(e) => setNewRounds(e.target.value)}
                    className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">Overall Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e: any) => setNewDifficulty(e.target.value)}
                    className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">Offer Status</label>
                  <select
                    value={newStatus}
                    onChange={(e: any) => setNewStatus(e.target.value)}
                    className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Selected">Selected</option>
                    <option value="Offered">Offered (Declined)</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">Rating (1 to 5 Stars)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newRating}
                    onChange={(e) => setNewRating(parseInt(e.target.value) || 4)}
                    className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">Describe Rounds Experience *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell other students about the questions, behavior, and complexity..."
                    value={newExperienceText}
                    onChange={(e) => setNewExperienceText(e.target.value)}
                    className="w-full bg-white border border-slate-200 p-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  ></textarea>
                </div>

                <div className="sm:col-span-3 space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">Syllabus Guidance or Tips</label>
                  <input
                    type="text"
                    placeholder="e.g., Learn SQL transactions and standard tree recursion."
                    value={newTipsText}
                    onChange={(e) => setNewTipsText(e.target.value)}
                    className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-xs px-5 py-2 rounded-xl transition cursor-pointer"
                  >
                    Publish Anonymously
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

        {/* CONTROLS SEARCH & SELECTION FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search Company, industry, role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-250/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
            <Search size={14} className="absolute left-3.5 top-3 text-slate-400" />
          </div>

          <div>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full bg-slate-50 border border-slate-250/80 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:bg-white"
            >
              <option value="All">All Industries</option>
              {industries.filter(ind => ind !== "All").map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-50 border border-slate-250/80 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:bg-white"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-250/80 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:bg-white"
            >
              <option value="All">All Results</option>
              <option value="Selected">Selected</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

        </div>

        {/* METRICS ROW */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-2 text-slate-450 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <Building2 size={14} className="text-slate-500" />
            <span>Companies: <span className="text-indigo-650 font-black">{filteredCompanies.length}</span></span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare size={14} className="text-slate-500" />
            <span>Anonymous Reviews: <span className="text-emerald-600 font-black">{totalReviewsCount}</span></span>
          </div>
          <div className="flex items-center gap-1">
            <Hash size={14} className="text-slate-500" />
            <span>Dataset Limit: <span className="text-slate-700">Unlocked 100%</span></span>
          </div>
        </div>

      </div>

      {/* FILTER RESULT COUNTS */}
      {filteredCompanies.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 text-xs">
          <SlidersHorizontal size={24} className="mx-auto text-slate-300 mb-2" />
          No companies found matching search metrics or filters. Clear selections above to reset the 100+ review catalog!
        </div>
      )}

      {/* DETAILED ACCORDION LIST */}
      <div className="space-y-3.5">
        {filteredCompanies.map((comp) => {
          const isExpanded = expandedCompany === comp.name;

          return (
            <div 
              key={comp.name} 
              className={`bg-white border rounded-3xl transition-all duration-300 overflow-hidden shadow-2xs ${
                isExpanded 
                  ? 'border-indigo-600/90 shadow-sm shadow-indigo-50/50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* PRIMARY ROW TRIGGER */}
              <button
                onClick={() => toggleExpand(comp.name)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${comp.logoColor || "from-slate-450 to-slate-600"} text-white flex items-center justify-center font-black uppercase text-sm shadow-2xs shrink-0`}>
                    {comp.name.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 leading-tight">
                      {comp.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[10px] text-indigo-700 bg-indigo-50 font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
                        {comp.industry}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold block">
                        📍 {comp.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex flex-col items-end text-right">
                    <span className="text-[10px] text-slate-400 font-bold">Anonymous Logs</span>
                    <strong className="text-slate-700 font-black text-xs">
                      {comp.reviews.length} Experiences
                    </strong>
                  </div>
                  <div className="p-1 px-1.5 bg-slate-100 rounded-lg hover:bg-indigo-100 transition-colors">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </button>

              {/* REVIEWS DISCLOSURE BLOCK */}
              {isExpanded && (
                <div className="bg-slate-50/75 border-t border-slate-100 p-5 space-y-5 animate-fade-in text-left">
                  <h5 className="text-[10px] font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-slate-200/50">
                    📂 Anonymous Candidate Log files ({comp.reviews.length})
                  </h5>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {comp.reviews.map((rev, revIdx) => {
                      // Status decoration
                      let statStyle = "bg-emerald-50 text-emerald-800 border-emerald-100";
                      if (rev.status === "Rejected") {
                        statStyle = "bg-rose-50 text-rose-800 border-rose-100";
                      } else if (rev.status === "Offered") {
                        statStyle = "bg-amber-50 text-amber-800 border-amber-100";
                      }

                      // Difficulty decoration
                      let diffStyle = "bg-emerald-100/70 text-emerald-800";
                      if (rev.difficulty === "Hard") {
                        diffStyle = "bg-rose-100/70 text-rose-800";
                      } else if (rev.difficulty === "Medium") {
                        diffStyle = "bg-amber-100/70 text-amber-800";
                      }

                      return (
                        <div 
                          key={revIdx} 
                          className="bg-white border border-slate-200/75 rounded-2xl p-4.5 space-y-3.5 hover:shadow-2xs transition-all flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            {/* Review Header attributes */}
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <h6 className="font-extrabold text-slate-800 text-xs">
                                  Role: {rev.role}
                                </h6>
                                <p className="text-[10px] text-slate-400 mt-0.5">Logged: {rev.date || "Anonymous"}</p>
                              </div>
                              <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${statStyle}`}>
                                {rev.status}
                              </span>
                            </div>

                            {/* Badge items */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${diffStyle}`}>
                                Difficulty: {rev.difficulty}
                              </span>
                              <span className="flex items-center gap-0.5 text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded-md">
                                <Star size={10} fill="orange" stroke="orange" />
                                {rev.rating}/5
                              </span>
                            </div>

                            {/* Rounds checklist summary */}
                            <div className="bg-slate-50 border border-slate-150 rounded-xl p-2.5 space-y-1">
                              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold uppercase tracking-wider px-1.5 py-0.2 rounded">Rounds Syllabus</span>
                              <p className="text-[10px] text-slate-650 leading-relaxed font-mono">
                                {rev.roundsText}
                              </p>
                            </div>

                            {/* Narrative experience */}
                            <div className="space-y-1">
                              <h6 className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Process Narrative</h6>
                              <p className="text-[11px] text-slate-650 leading-relaxed">
                                {rev.experienceText}
                              </p>
                            </div>
                          </div>

                          {/* Advice Tip */}
                          <div className="pt-2.5 border-t border-slate-100 mt-2">
                            <span className="text-[10px] text-emerald-700 font-black uppercase tracking-widest block mb-0.5">💡 Syllabus Prep Guidance</span>
                            <p className="text-[10px] text-emerald-950 font-bold bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/40 leading-relaxed">
                              {rev.tipsText}
                            </p>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
