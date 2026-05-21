/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Markdown from "react-markdown";
import { Sparkles, FileText, UserSquare, Calendar, Compass, RefreshCw, Copy, Check, Download, AlertCircle, Plus, Trash2, Printer } from "lucide-react";

interface AIPoweredToolsProps {
  token: string | null;
}

export const AIPoweredTools: React.FC<AIPoweredToolsProps> = ({ token }) => {
  const [activeTool, setActiveTool] = useState<'resume' | 'interview' | 'roadmap'>('resume');
  const [loading, setLoading] = useState(false);
  const [responseMarkdown, setResponseMarkdown] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [demoError, setDemoError] = useState<string>("");

  // --- 1. AI RESUME HELP STATE ---
  const [resName, setResName] = useState("Rahul Sharma");
  const [resRole, setResRole] = useState("Full Stack Engineer");
  const [resExp, setResExp] = useState("Entry Level / fresher");
  const [resSkills, setResSkills] = useState("TypeScript, React, Node.js, Tailwind CSS");

  // Editable CV states for High-Fidelity Interactive Preview
  const [cvName, setCvName] = useState("Rahul Sharma");
  const [cvRole, setCvRole] = useState("Full Stack Engineer");
  const [cvSummary, setCvSummary] = useState("Highly motivated and performance-driven software engineer specializing in developing modern, secure, and scalable web applications. Proficient in TypeScript, React, Node.js, and Tailwind CSS with a strong commitment to writing clean code and implementing optimal user experiences.");
  const [cvSkillsList, setCvSkillsList] = useState(["TypeScript", "React", "Node.js", "Tailwind CSS", "Express", "Firebase", "SQL"]);
  const [cvBullets, setCvBullets] = useState([
    "Pioneered critical career preparation web platforms using React and Node, lowering final production compilation sizes by 35% and upgrading page responsiveness.",
    "Standardized parallel database fetching pipelines, reducing high-incidence page load indicators during core usage intervals.",
    "Designed and tested modern student diagnostic modules with actual timed counters and automated score summaries."
  ]);
  const [cvTab, setCvTab] = useState<'console' | 'a4'>('a4');
  const [newBullet, setNewBullet] = useState("");
  const [newSkill, setNewSkill] = useState("");


  // --- 2. INTERVIEW GENERATOR STATE ---
  const [intRole, setIntRole] = useState("Software Engineer");
  const [intCompany, setIntCompany] = useState("Stripe");
  const [intExp, setIntExp] = useState("Entry level fresher");
  const [intSkills, setIntSkills] = useState("Data Structures, JavaScript algorithms");

  // --- 3. CAREER ROADMAP STATE ---
  const [mapRole, setMapRole] = useState("Cloud DevOps Architect");
  const [mapCurrent, setMapCurrent] = useState("Junior Web Developer");
  const [mapPace, setMapPace] = useState("Fast-track 6 months");
  const [mapBudget, setMapBudget] = useState("Free and Open-Source Standard");

  const buildAICommand = async (type: 'resume' | 'interview' | 'roadmap') => {
    setLoading(true);
    setResponseMarkdown("");
    setIsCopied(false);
    setDemoError("");
    
    let parameters: any = {};
    if (type === 'resume') {
      parameters = { name: resName, role: resRole, experience: resExp, skills: resSkills };
    } else if (type === 'interview') {
      parameters = { role: intRole, company: intCompany, experience: intExp, skills: intSkills };
    } else {
      parameters = { role: mapRole, currentLevel: mapCurrent, pace: mapPace, budget: mapBudget };
    }

    try {
      const headers: any = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("/api/gemini/ai-command", {
        method: "POST",
        headers,
        body: JSON.stringify({ toolType: type, parameters })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "System error running Gemini model.");
      
      setResponseMarkdown(data.text || "No insights returned from AI model.");
      setIsDemo(!!data.isDemoMode);
      if (data.isDemoMode && data.errorDetails) {
        setDemoError(data.errorDetails);
      }
      
      if (type === 'resume') {
        setCvName(resName);
        setCvRole(resRole);
        if (resSkills) {
          setCvSkillsList(resSkills.split(",").map(s => s.trim()).filter(Boolean));
        }
        setCvTab('a4');
      }
    } catch (err: any) {
      setResponseMarkdown(`### ⚠️ Execution Notice: Missing Credentials\n\n${err.message}\n\nPlease verify that your server is launched with a valid \`GEMINI_API_KEY\` in your local secrets. Our platform has degraded safely; please review standard simulated reports below.`);
      if (type === 'resume') {
        setCvName(resName);
        setCvRole(resRole);
        if (resSkills) {
          setCvSkillsList(resSkills.split(",").map(s => s.trim()).filter(Boolean));
        }
        setCvTab('a4');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(responseMarkdown);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadTextFile = () => {
    const element = document.createElement("a");
    const file = new Blob([responseMarkdown], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `CareerForge-${activeTool}-planning.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="ai-generative-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Tool selectors and input form sidebar */}
      <div className="lg:col-span-5 bg-white border border-slate-200 shadow-xs rounded-3xl p-6 lg:p-8 space-y-6">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-indigo-600 animate-pulse" /> Career Prep Assistant
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI Placement Assistant</h2>
          <p className="text-xs text-slate-500 mt-1">
            Produce customized resume briefs, interview questions, or month-by-month career roadmaps instantly.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 border border-slate-200/60 rounded-2xl">
          <button
            onClick={() => { setActiveTool('resume'); setResponseMarkdown(""); }}
            className={`py-2 px-1 rounded-xl text-center flex flex-col items-center justify-center gap-1 text-[11px] font-bold transition ${
              activeTool === 'resume' ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText size={16} />
            Resume Help
          </button>
          <button
            onClick={() => { setActiveTool('interview'); setResponseMarkdown(""); }}
            className={`py-2 px-1 rounded-xl text-center flex flex-col items-center justify-center gap-1 text-[11px] font-bold transition ${
              activeTool === 'interview' ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserSquare size={16} />
            Interview Prep
          </button>
          <button
            onClick={() => { setActiveTool('roadmap'); setResponseMarkdown(""); }}
            className={`py-2 px-1 rounded-xl text-center flex flex-col items-center justify-center gap-1 text-[11px] font-bold transition ${
              activeTool === 'roadmap' ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass size={16} />
            Roadmaps
          </button>
        </div>

        {/* Input Forms depend on selected tool */}
        <div id="ai-tool-form-container" className="border-t border-slate-100 pt-6 space-y-4">
          {activeTool === 'resume' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={resName}
                  onChange={(e) => setResName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Target Job Role</label>
                <input
                  type="text"
                  value={resRole}
                  onChange={(e) => setResRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Experience Stage</label>
                  <select
                    value={resExp}
                    onChange={(e) => setResExp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Entry Level / fresher">Fresher / Intern</option>
                    <option value="Junior (1-3 yrs)">Junior (1-3 yrs)</option>
                    <option value="Senior Executive">Senior Executive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Key Core Skill</label>
                  <input
                    type="text"
                    value={resSkills}
                    onChange={(e) => setResSkills(e.target.value)}
                    placeholder="e.g. React, Node.js"
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTool === 'interview' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Target Role Profile</label>
                <input
                  type="text"
                  value={intRole}
                  onChange={(e) => setIntRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Target Placement Company</label>
                <input
                  type="text"
                  value={intCompany}
                  onChange={(e) => setIntCompany(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Aspirant Status</label>
                  <select
                    value={intExp}
                    onChange={(e) => setIntExp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Entry level fresher">Fresher Graduate</option>
                    <option value="Experienced Senior">Experienced Pro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Tech/Stack Focal</label>
                  <input
                    type="text"
                    value={intSkills}
                    onChange={(e) => setIntSkills(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTool === 'roadmap' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Destination Career Goal</label>
                <input
                  type="text"
                  value={mapRole}
                  onChange={(e) => setMapRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Current Background Tier</label>
                <input
                  type="text"
                  value={mapCurrent}
                  onChange={(e) => setMapCurrent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Preferred Pace</label>
                  <select
                    value={mapPace}
                    onChange={(e) => setMapPace(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Fast-track 6 months">Fast-track (6 mos)</option>
                    <option value="Extensive 1 year roadmap">Extensive (1 yr)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Acquisition Budget</label>
                  <input
                    type="text"
                    value={mapBudget}
                    onChange={(e) => setMapBudget(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => buildAICommand(activeTool)}
            disabled={loading}
            className="w-full bg-indigo-650 hover:bg-indigo-720 cursor-pointer text-white font-bold text-xs py-3 rounded-lg shadow-sm shadow-indigo-200 hover:shadow-md hover:bg-indigo-700 transition-all inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="animate-spin" size={14} />
                Synthesizing AI Results...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Generate planning Output
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Screen */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 shadow-xl rounded-3xl p-6 lg:p-8 flex flex-col justify-between text-slate-250 min-h-[500px]">
        <div>
          {/* Output Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between sm:items-center pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 block animate-pulse"></span>
              <h3 className="font-extrabold text-white text-xs uppercase tracking-wider">
                Architect Planning Console
              </h3>
            </div>

            {responseMarkdown && (
              <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 border border-slate-700/60 rounded-xl">
                {activeTool === "resume" && (
                  <>
                    <button
                      onClick={() => setCvTab("a4")}
                      className={`px-3 py-1.5 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
                        cvTab === "a4" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-100"
                      }`}
                    >
                      A4 CV Stylizer
                    </button>
                    <button
                      onClick={() => setCvTab("console")}
                      className={`px-3 py-1.5 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
                        cvTab === "console" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-100"
                      }`}
                    >
                      Raw markdown
                    </button>
                  </>
                )}
                
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 bg-slate-950/60 hover:bg-indigo-600 rounded-lg text-slate-400 hover:text-white transition text-xs"
                  title="Copy dynamic response text"
                >
                  {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
                <button
                  onClick={downloadTextFile}
                  className="p-1.5 bg-slate-950/60 hover:bg-indigo-600 rounded-lg text-slate-400 hover:text-white transition text-xs"
                  title="Export raw source file"
                >
                  <Download size={14} />
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-2 border-indigo-500/10 border-t-indigo-400 rounded-full animate-spin"></div>
              <p className="text-xs text-slate-400 animate-pulse font-medium text-center max-w-xs leading-normal">
                Drafting outline parameters, validating skill metrics, and structuring high-impact outcomes...
              </p>
              <div className="w-48 bg-slate-800/40 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full animate-[shimmer_1.5s_infinite]"></div>
              </div>
            </div>
          ) : responseMarkdown ? (
            <div className="space-y-4">
              {isDemo && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 rounded-xl leading-relaxed space-y-1">
                  <div className="flex items-center gap-2 font-bold select-none">
                    <AlertCircle size={14} className="shrink-0 text-amber-400" />
                    <span>Gemini API Fallback Mode Active</span>
                  </div>
                  <p className="text-slate-400 leading-normal">
                    {demoError ? (
                      <>
                        The API call was redirected because: <code className="text-amber-200 font-mono text-[9px] bg-amber-950/40 px-1 py-0.5 rounded">{demoError}</code>. 
                        You can configure an active, non-leaked <code className="text-indigo-300 font-mono font-bold">GEMINI_API_KEY</code> anytime in the Settings panel.
                      </>
                    ) : (
                      "Running in interactive showcase simulation mode due to missing key credentials."
                    )}
                  </p>
                </div>
              )}

              {activeTool === "resume" && cvTab === "a4" ? (
                /* High-Fidelity print-ready interactive A4 layout container */
                <div className="space-y-4 animate-[fadeIn_0.2s_ease]">
                  <div className="flex gap-2 justify-end mb-2">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-900 px-3 py-1.5 text-[10px] font-black uppercase text-white rounded-lg cursor-pointer transition"
                    >
                      <Printer size={12} /> Print or Save PDF
                    </button>
                  </div>

                  <div id="print-resume-sheet" className="bg-white border border-slate-200 rounded-2xl shadow-xl text-slate-850 p-6 sm:p-8 space-y-5 font-sans">
                    {/* Centered Name and Subtitle with seamless editing */}
                    <div className="text-center pb-4 border-b border-slate-100 space-y-1">
                      <input
                        type="text"
                        value={cvName}
                        onChange={(e) => setCvName(e.target.value)}
                        className="text-center font-bold text-slate-900 text-xl tracking-tight w-full hover:bg-slate-50 focus:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-2 py-0.5 border-none"
                        placeholder="Your Name"
                      />
                      <input
                        type="text"
                        value={cvRole}
                        onChange={(e) => setCvRole(e.target.value)}
                        className="text-center text-xs font-bold text-indigo-650 tracking-wider uppercase w-full hover:bg-slate-50 focus:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-2 py-0.5 border-none"
                        placeholder="Target Professional Role"
                      />
                      <div className="text-[10px] text-slate-500 font-mono flex items-center justify-center gap-2">
                        <span>New Delhi, India</span> • <span>candidate@example.com</span> • <span>github.com/candidate</span>
                      </div>
                    </div>

                    {/* Summary Segment */}
                    <div className="space-y-1.5 text-left">
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1">
                        Professional Summary
                      </h4>
                      <textarea
                        value={cvSummary}
                        onChange={(e) => setCvSummary(e.target.value)}
                        className="w-full text-slate-700 text-xs leading-relaxed bg-transparent hover:bg-slate-50 focus:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-2 py-1 border-none resize-none h-16"
                        placeholder="Provide a high-impact profile overview..."
                      />
                    </div>

                    {/* Core Skills Section */}
                    <div className="space-y-2 text-left">
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1">
                        Key Core Technologies & Skills
                      </h4>
                      
                      <div className="flex flex-wrap gap-1.5 px-2">
                        {cvSkillsList.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-750 text-[10px] font-bold px-2 py-0.5 rounded-md border border-indigo-100"
                          >
                            {skill}
                            <button
                              onClick={() => setCvSkillsList(cvSkillsList.filter((_, idx) => idx !== index))}
                              className="text-indigo-400 hover:text-rose-600 font-extrabold cursor-pointer text-[8px]"
                              title="Delete skill"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Add skill tag inline */}
                      <div className="flex gap-2 items-center px-2 pt-1">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && newSkill.trim()) {
                              setCvSkillsList([...cvSkillsList, newSkill.trim()]);
                              setNewSkill("");
                            }
                          }}
                          placeholder="Add new tech skill..."
                          className="bg-slate-50 border border-slate-200 text-[10px] rounded-lg px-2 py-1 w-40 focus:outline-none focus:border-indigo-500 text-slate-800"
                        />
                        <button
                          onClick={() => {
                            if (newSkill.trim()) {
                              setCvSkillsList([...cvSkillsList, newSkill.trim()]);
                              setNewSkill("");
                            }
                          }}
                          className="p-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 cursor-pointer"
                          title="Add skill tag"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>

                    {/* Work Achievements Bullets */}
                    <div className="space-y-3.5 text-left">
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1">
                        Professional Outcomes & Key Highlights
                      </h4>

                      <div className="space-y-2 px-1">
                        {cvBullets.map((bullet, bulletIdx) => (
                          <div key={bulletIdx} className="flex gap-2 items-start group">
                            <span className="text-indigo-600 text-xs select-none pt-1.5 font-bold">•</span>
                            <div className="flex-1">
                              <textarea
                                value={bullet}
                                onChange={(e) => {
                                  const updated = [...cvBullets];
                                  updated[bulletIdx] = e.target.value;
                                  setCvBullets(updated);
                                }}
                                className="w-full text-slate-700 text-xs bg-transparent hover:bg-slate-50 focus:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1.5 py-0.5 border-none resize-none h-12 leading-relaxed"
                              />
                            </div>
                            <button
                              onClick={() => setCvBullets(cvBullets.filter((_, i) => i !== bulletIdx))}
                              className="text-slate-300 hover:text-rose-600 transition p-1 cursor-pointer shrink-0 mt-1 opacity-100 sm:opacity-0 group-hover:opacity-100"
                              title="Delete point"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add outcome bullet */}
                      <div className="flex gap-2 items-start px-2 pt-1">
                        <textarea
                          value={newBullet}
                          onChange={(e) => setNewBullet(e.target.value)}
                          placeholder="Append a custom high-impact bullet describing project metrics (e.g., 'Improved database search efficiency by 15% using optimized SQL indexes...')"
                          className="flex-1 bg-slate-50 border border-slate-200 text-[10px] rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 text-slate-800 resize-none h-12 leading-relaxed"
                        />
                        <button
                          onClick={() => {
                            if (newBullet.trim()) {
                              setCvBullets([...cvBullets, newBullet.trim()]);
                              setNewBullet("");
                            }
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-2.5 py-2 hover:shadow transition flex items-center justify-center cursor-pointer shrink-0"
                          title="Add custom achievement bullet"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Raw Gemini planning report output */
                <div className="markdown-body text-xs text-slate-300 leading-relaxed max-h-[460px] overflow-y-auto pr-2 space-y-4 prose prose-invert prose-xs">
                  <Markdown>{responseMarkdown}</Markdown>
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center">
              <Sparkles size={36} className="text-slate-700 mx-auto mb-3 animate-pulse" />
              <p className="font-bold text-slate-400 text-sm">Planning Desk is empty.</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-2 leading-relaxed">
                Configure your student parameters in the left side widget and tap "Generate planning Output" to compile dynamic reports.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
