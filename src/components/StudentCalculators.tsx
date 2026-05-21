/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Calculator, Award, Coins, BookOpen, UserCheck, Plus, Trash2, RotateCcw } from "lucide-react";

interface SubjectRow {
  name: string;
  credits: number;
  gradePoints: number; // e.g. O = 10, A+ = 9, A = 8
}

export const StudentCalculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cgpa' | 'pct' | 'salary' | 'headline' | 'hourly'>('cgpa');

  // --- 1. CGPA CALCULATOR STATE ---
  const [cgpaSubjects, setCgpaSubjects] = useState<SubjectRow[]>([
    { name: "Mathematics", credits: 4, gradePoints: 10 },
    { name: "Computer Networks", credits: 3, gradePoints: 9 },
    { name: "Database Engineering", credits: 3, gradePoints: 8 },
    { name: "Web Technologies", credits: 4, gradePoints: 9 }
  ]);

  const addCgpaRow = () => {
    setCgpaSubjects([...cgpaSubjects, { name: `Subject ${cgpaSubjects.length + 1}`, credits: 3, gradePoints: 8 }]);
  };

  const removeCgpaRow = (index: number) => {
    if (cgpaSubjects.length === 1) return;
    setCgpaSubjects(cgpaSubjects.filter((_, i) => i !== index));
  };

  const updateCgpaRow = (index: number, key: keyof SubjectRow, value: any) => {
    const updated = [...cgpaSubjects];
    updated[index] = { ...updated[index], [key]: value };
    setCgpaSubjects(updated);
  };

  const calculateCgpa = () => {
    let totalCredits = 0;
    let weightedPoints = 0;
    cgpaSubjects.forEach(sub => {
      totalCredits += Number(sub.credits) || 0;
      weightedPoints += (Number(sub.credits) || 0) * (Number(sub.gradePoints) || 0);
    });
    return totalCredits ? (weightedPoints / totalCredits).toFixed(2) : "0.00";
  };

  // --- 2. PERCENTAGE CONVERTER ---
  const [pctScale, setPctScale] = useState<'multiply' | 'cbse'>('multiply');
  const [cgpaInput, setCgpaInput] = useState("8.5");
  const [percentOutput, setPercentOutput] = useState("");

  const handlePctConvert = (e: React.FormEvent) => {
    e.preventDefault();
    const cg = parseFloat(cgpaInput);
    if (isNaN(cg) || cg < 0 || cg > 10) {
      setPercentOutput("Invalid CGPA (Enter 0 - 10)");
      return;
    }
    const factor = pctScale === 'cbse' ? 9.5 : 9.5; // Custom scaling factor (standard is 9.5)
    setPercentOutput(`${(cg * factor).toFixed(1)}%`);
  };

  // --- 3. SALARY IN-HAND ESTIMATOR ---
  const [ctc, setCtc] = useState(850000); // 8.5 LPA
  const [pfContribution, setPfContribution] = useState(12); // 12% basic
  const [regime, setRegime] = useState<'new' | 'old'>('new');

  const calculateSalary = () => {
    const monthlyCtc = ctc / 12;
    // Basic component is roughly 40% of CTC
    const basic = monthlyCtc * 0.4;
    // PF is 12% of basic index or standard cap
    const pf = basic * (pfContribution / 100);
    // Professional Tax average
    const pt = 200;
    
    // Quick Tax approximation (Simplified Old vs New regime slider)
    const annualCtcInLacs = ctc / 100000;
    let taxAnnual = 0;
    if (regime === 'new') {
      if (annualCtcInLacs > 15) taxAnnual = (ctc - 1500000) * 0.3 + 150000;
      else if (annualCtcInLacs > 12) taxAnnual = (ctc - 1200000) * 0.2 + 90000;
      else if (annualCtcInLacs > 9) taxAnnual = (ctc - 900000) * 0.15 + 45000;
      else if (annualCtcInLacs > 7) taxAnnual = (ctc - 700000) * 0.1 + 25000;
      else if (annualCtcInLacs > 4) taxAnnual = (ctc - 400000) * 0.05;
    } else {
      // Old regime standard general estimate
      if (annualCtcInLacs > 10) taxAnnual = (ctc - 1000000) * 0.3 + 112500;
      else if (annualCtcInLacs > 5) taxAnnual = (ctc - 500000) * 0.2 + 12500;
      else if (annualCtcInLacs > 2.5) taxAnnual = (ctc - 250000) * 0.05;
    }
    
    // Deduct standard exemptions
    if (regime === 'new' && ctc <= 700000) taxAnnual = 0; // Tax rebate below 7 LPA
    if (regime === 'old' && ctc <= 500000) taxAnnual = 0;

    const monthlyTax = taxAnnual / 12;
    const inHand = monthlyCtc - pf - pt - monthlyTax;

    return {
      monthlyCtc: monthlyCtc.toFixed(0),
      pf: pf.toFixed(0),
      tax: monthlyTax.toFixed(0),
      inHand: Math.max(0, inHand).toFixed(0)
    };
  };

  const salaryDetails = calculateSalary();

  // --- 4. RESUME HEADLINE GENERATOR ---
  const [headlineSkill, setHeadlineSkill] = useState("Full Stack Developer");
  const [headlineFocus, setHeadlineFocus] = useState("SaaS Scalability & UI/UX");
  const [generatedHeadlines, setGeneratedHeadlines] = useState<string[]>([]);

  const makeHeadlines = () => {
    const fresh = [
      `${headlineSkill} | Passionate Coding Architect Specializing in ${headlineFocus}`,
      `Results-Driven ${headlineSkill} | Expert in ${headlineFocus} & Interactive Frontend Paradigms`,
      `Aspirant ${headlineSkill} with Proven Projects in ${headlineFocus} & Clean Microservices`,
      `${headlineSkill} | Transforming Complicated Ideas into High-Contrast, Accessible Systems`
    ];
    setGeneratedHeadlines(fresh);
  };

  // --- 5. STUDY TIME ALLOCATOR ---
  const [dailyStudyHours, setDailyStudyHours] = useState(6);
  const [studyBreakStyle, setStudyBreakStyle] = useState<'pomodoro' | 'marathon'>('pomodoro');

  const getHourlySchedules = () => {
    const totalMinutes = dailyStudyHours * 60;
    let chunksCount = 0;
    let blockLength = 0;
    let breakLength = 0;

    if (studyBreakStyle === 'pomodoro') {
      blockLength = 25;
      breakLength = 5;
    } else {
      blockLength = 50;
      breakLength = 10;
    }

    chunksCount = Math.floor(totalMinutes / (blockLength + breakLength));
    
    return {
      totalTime: totalMinutes,
      chunks: chunksCount || 1,
      blockLength,
      breakLength,
      sessions: [
        { name: "Technical Drill (DSA & Logic Coding)", pct: 40 },
        { name: "Quant & Aptitude Speed Shortcuts", pct: 30 },
        { name: "English grammar shortcuts or MCQs", pct: 20 },
        { name: "Daily Revision & Analytics Review", pct: 10 }
      ]
    };
  };

  const hourlySetup = getHourlySchedules();


  return (
    <div id="student-utility-tools" className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2.5">
            <Calculator className="text-indigo-600" />
            Free Student Utility Tools
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Accelerate your academic decisions and calculate key metrics instantly—no database synchronization required.
          </p>
        </div>

        {/* Tab Controls */}
        <div id="calc-tab-selectors" className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('cgpa')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'cgpa' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            SGPA/CGPA
          </button>
          <button
            onClick={() => setActiveTab('pct')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pct' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            Percentage %
          </button>
          <button
            onClick={() => setActiveTab('salary')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'salary' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            Take Home Pay
          </button>
          <button
            onClick={() => setActiveTab('headline')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'headline' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            Resume Headline
          </button>
          <button
            onClick={() => setActiveTab('hourly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'hourly' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            Study Planner
          </button>
        </div>
      </div>

      <div className="border border-slate-100 rounded-2xl bg-slate-50/50 p-6">
        {/* --- 1. CGPA CALCULATOR VIEW --- */}
        {activeTab === 'cgpa' && (
          <div id="view-cgpa-calculator">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800 text-sm tracking-wider uppercase">Active Semester Subjects</h3>
                  <button 
                    onClick={addCgpaRow}
                    className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
                  >
                    <Plus size={16} />
                    Add Subject
                  </button>
                </div>

                <div className="space-y-3">
                  {cgpaSubjects.map((subject, idx) => (
                    <div key={idx} className="flex flex-wrap md:flex-nowrap items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                      <input 
                        type="text" 
                        value={subject.name}
                        onChange={(e) => updateCgpaRow(idx, 'name', e.target.value)}
                        placeholder="Subject Name"
                        className="flex-1 min-w-[120px] text-sm text-slate-800 focus:outline-none font-medium px-2 py-1 focus:bg-slate-50 rounded"
                      />
                      
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] uppercase font-bold text-slate-600">Credits</label>
                        <select 
                          value={subject.credits} 
                          onChange={(e) => updateCgpaRow(idx, 'credits', parseInt(e.target.value))}
                          className="bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded px-1.5 py-1"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-[10px] uppercase font-bold text-slate-600">Grade</label>
                        <select 
                          value={subject.gradePoints} 
                          onChange={(e) => updateCgpaRow(idx, 'gradePoints', parseInt(e.target.value))}
                          className="bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded px-1.5 py-1 font-semibold"
                        >
                          <option value="10">O (Outstanding - 10)</option>
                          <option value="9">A+ (Excellent - 9)</option>
                          <option value="8">A (Very Good - 8)</option>
                          <option value="7">B+ (Good - 7)</option>
                          <option value="6">B (Above Average - 6)</option>
                          <option value="5">C (Pass - 5)</option>
                        </select>
                      </div>

                      <button 
                        onClick={() => removeCgpaRow(idx)}
                        disabled={cgpaSubjects.length === 1}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-80 bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-indigo-100/60 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-semibold mb-4">
                    <Award size={14} /> Cumulative CGPA / SGPA
                  </span>
                  <div className="mb-2">
                    <h1 className="text-5xl font-black text-indigo-900 tracking-tight">{calculateCgpa()}</h1>
                    <p className="text-xs font-semibold text-indigo-600 tracking-wider uppercase mt-1">Excellent Performance</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                    Weighted Grade Point Average is calculated by dividing total quality points earned by total credentials. Keep it above 8.5 to easily qualify for cream Tier-1 placements!
                  </p>
                </div>
                <div className="border-t border-indigo-200/50 pt-4 mt-6">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Total Semester Credits:</span>
                    <span className="font-bold">{cgpaSubjects.reduce((acc, c) => acc + c.credits, 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 2. PERCENTAGE CONVERTER VIEW --- */}
        {activeTab === 'pct' && (
          <div id="view-percentage-calculator" className="max-w-xl mx-auto py-4">
            <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider mb-4">CGPA to Percentage Converter</h4>
            <form onSubmit={handlePctConvert} className="space-y-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setPctScale('multiply')}
                  className={`flex-1 p-3 rounded-xl border text-xs font-semibold text-center transition ${
                    pctScale === 'multiply' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-250 bg-white text-slate-600'
                  }`}
                >
                  Standard Indian Universities (x9.5)
                </button>
                <button
                  type="button"
                  onClick={() => setPctScale('cbse')}
                  className={`flex-1 p-3 rounded-xl border text-xs font-semibold text-center transition ${
                    pctScale === 'cbse' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-600'
                  }`}
                >
                  CBSE Scale Guidance
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Enter CGPA (10-Point scale)</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="e.g. 9.12"
                    value={cgpaInput}
                    onChange={(e) => setCgpaInput(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <button 
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl px-6 py-2.5 transition"
                  >
                    Convert Metric
                  </button>
                </div>
              </div>
            </form>

            {percentOutput && (
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-emerald-700 tracking-wider">Equivalent Percentage</p>
                  <p className="text-3xl font-black text-emerald-800 mt-1">{percentOutput}</p>
                </div>
                <div className="text-[10px] text-emerald-700 max-w-[200px] text-right">
                  Formula applied: CGPA × 9.5
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- 3. SALARY CALCULATOR VIEW --- */}
        {activeTab === 'salary' && (
          <div id="view-salary-calculator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Annual CTC Package</label>
                    <span className="text-xs font-bold text-indigo-600">₹{(ctc/100000).toFixed(1)} LPA</span>
                  </div>
                  <input
                    type="range"
                    min="200000"
                    max="3000000"
                    step="50000"
                    value={ctc}
                    onChange={(e) => setCtc(Number(e.target.value))}
                    className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>₹2 LPA</span>
                    <span>₹15 LPA</span>
                    <span>₹30 LPA</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">PF contribution</label>
                    <select
                      value={pfContribution}
                      onChange={(e) => setPfContribution(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                    >
                      <option value="12">12% standard</option>
                      <option value="10">10% reduced</option>
                      <option value="0">0% opt-out</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Tax Regime</label>
                    <select
                      value={regime}
                      onChange={(e) => setRegime(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                    >
                      <option value="new">New regime (Low rates)</option>
                      <option value="old">Old regime (Exemptions)</option>
                    </select>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 leading-relaxed italic">
                  *Disclaimer: These are simplified estimates for salary structures with a base component of 40%. Actual EPF and professional tax rates vary by state and company policy.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
                    <Coins size={12} /> Estimated Take-Home Pay
                  </span>
                  <div>
                    <h2 className="text-4xl font-extrabold text-emerald-400 tracking-tight">₹{Number(salaryDetails.inHand).toLocaleString("en-IN")}<span className="text-sm text-slate-400 font-normal"> /mo</span></h2>
                    <p className="text-[11px] text-slate-400 mt-1">Cash in-hand net of standard PF, taxes, and PT deductions.</p>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-4 mt-6 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Base Monthly Gross:</span>
                    <span className="font-semibold text-slate-200">₹{Number(salaryDetails.monthlyCtc).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Provident Fund (EPF):</span>
                    <span className="font-semibold text-rose-400">-₹{Number(salaryDetails.pf).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Estimated Income Tax:</span>
                    <span className="font-semibold text-rose-400">-₹{Number(salaryDetails.tax).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 4. RESUME HEADLINE GENERATOR VIEW --- */}
        {activeTab === 'headline' && (
          <div id="view-resume-headline-generator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Primary Competence</label>
                  <input
                    type="text"
                    value={headlineSkill}
                    onChange={(e) => setHeadlineSkill(e.target.value)}
                    placeholder="e.g. Full Stack Developer, Data Analyst"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Core Focus & Specialties</label>
                  <input
                    type="text"
                    value={headlineFocus}
                    onChange={(e) => setHeadlineFocus(e.target.value)}
                    placeholder="e.g. AWS Cloud, high-traffic APIs, SaaS visual optimization"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={makeHeadlines}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-sm"
                >
                  Optimize Headlines Client-Side
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <span className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-3">
                  <UserCheck size={12} /> High-Octane Output Results
                </span>
                
                {generatedHeadlines.length > 0 ? (
                  <div className="space-y-3 mt-2">
                    {generatedHeadlines.map((heading, hidx) => (
                      <div key={hidx} className="p-3 bg-white border border-slate-200 rounded-xl relative group">
                        <p className="text-xs text-slate-800 font-medium leading-relaxed pr-6 select-all">{heading}</p>
                        <button 
                          onClick={() => navigator.clipboard.writeText(heading)}
                          className="absolute right-2 top-2 text-[10px] bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white px-1.5 py-0.5 rounded transition text-slate-500 font-bold"
                        >
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    Please submit your primary competence parameters on the left to structure your high-impact resume pitches instantly.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- 5. STUDY TIMELINE ALLOCATOR VIEW --- */}
        {activeTab === 'hourly' && (
          <div id="view-study-time-allocator">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Total Commited Daily Study Hours</label>
                    <span className="text-xs font-bold text-indigo-600">{dailyStudyHours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="1"
                    value={dailyStudyHours}
                    onChange={(e) => setDailyStudyHours(Number(e.target.value))}
                    className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>2 Hours</span>
                    <span>7 Hours</span>
                    <span>12 Hours</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Study & Rest Interval Pattern</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStudyBreakStyle('pomodoro')}
                      className={`flex-1 p-3 rounded-xl border text-xs font-semibold flex flex-col items-center transition ${
                        studyBreakStyle === 'pomodoro' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-500'
                      }`}
                    >
                      <span className="font-bold">Pomodoro Standard</span>
                      <span className="text-[10px] opacity-80 mt-0.5">25m Study / 5m Recovery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudyBreakStyle('marathon')}
                      className={`flex-1 p-3 rounded-xl border text-xs font-semibold flex flex-col items-center transition ${
                        studyBreakStyle === 'marathon' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-500'
                      }`}
                    >
                      <span className="font-bold">Ultradian Flow</span>
                      <span className="text-[10px] opacity-80 mt-0.5">50m Focus / 10m Recovery</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                  <BookOpen size={12} /> Proposed Focus Allocations
                </span>

                <div className="space-y-3">
                  {hourlySetup.sessions.map((session, sidx) => {
                    const allocatedMinutes = Math.round((hourlySetup.totalTime * session.pct) / 100);
                    return (
                      <div key={sidx} className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-semibold text-slate-800">{session.name}</span>
                          <span className="font-bold text-indigo-600">{allocatedMinutes} mins ({session.pct}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-indigo-600 h-full rounded-full" 
                            style={{ width: `${session.pct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-900 rounded-xl p-3 text-xs leading-relaxed">
                  💡 <strong>Cycle Summary:</strong> In a {dailyStudyHours}-hour day with {studyBreakStyle === 'pomodoro' ? 'Pomodoros' : 'Ultradian drills'}, you will complete approximately <strong>{hourlySetup.chunks} high-focus blocks</strong> alternating with rest intervals. Remember to stay hydrated!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
