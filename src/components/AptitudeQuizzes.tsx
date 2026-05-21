/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { QuizQuestion, User } from "../types";
import { CheckCircle, AlertOctagon, HelpCircle, FileText, ChevronRight, RefreshCw, Trophy, BookMarked } from "lucide-react";
import { SectionalMocks } from "./SectionalMocks";
import { PlacementExperiences } from "./PlacementExperiences";

export const AptitudeQuizzes: React.FC<{ currentUser: User | null }> = ({ currentUser }) => {
  const [subTab, setSubTab] = useState<'recalls' | 'sectional' | 'experiences'>('recalls');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active quiz state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResultCard, setShowResultCard] = useState(false);

  // Category filter
  const [filterCategory, setFilterCategory] = useState<'All' | 'Aptitude' | 'English' | 'SSC'>('All');

  // Load quizzes
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/quizzes");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch questions");
      setQuestions(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = questions.filter(
    q => filterCategory === 'All' || q.category === filterCategory
  );

  const handleOptionSelect = (optionIdx: number) => {
    if (hasSubmitted) return;
    setSelectedAnswer(optionIdx);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || hasSubmitted) return;
    setHasSubmitted(true);
    
    const currentQuestion = filteredQuestions[currentIdx];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setHasSubmitted(false);
    
    if (currentIdx + 1 < filteredQuestions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setShowResultCard(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setScore(0);
    setShowResultCard(false);
  };

  // Predefined downloadable resource lists
  const resourcesList = [
    { title: "SSC CGL 2025 Tier-1 General Awareness PDF Mock Solved", type: "Previous Paper", linkText: "View Paper Syllabus" },
    { title: "High-Priority Quantitative Aptitude Formulas Sheet", type: "Formula Cheat Sheet", linkText: "Download Cheat Sheet" },
    { title: "Vedic Calculation Speed Exercises & 100 Verbal Shortcuts", type: "Aptitude Tricks", linkText: "Access Online" },
    { title: "50 Direct and Speech Grammar Transformations Guide", type: "English Shortcut", linkText: "Read Article Guidelines" }
  ];

  return (
    <div className="space-y-8" id="exams-section-wrapper">
      {/* Dynamic Sub-tab Selector */}
      <div className="flex border-b border-slate-200/80 gap-6 pb-0 mb-2">
        <button
          onClick={() => setSubTab('recalls')}
          className={`pb-3 text-sm font-extrabold transition-all border-b-2 cursor-pointer ${
            subTab === 'recalls'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Daily Recall Quizzes
        </button>
        <button
          onClick={() => setSubTab('sectional')}
          className={`pb-3 text-sm font-extrabold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
            subTab === 'sectional'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Sectional Mock Exams
          <span className="text-[10px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded-full uppercase scale-90">
            Live
          </span>
        </button>
        <button
          onClick={() => setSubTab('experiences')}
          className={`pb-3 text-sm font-extrabold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
            subTab === 'experiences'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Placement Experiences 
          <span className="text-[10px] bg-emerald-500 text-white font-black px-1.5 py-0.5 rounded-full uppercase scale-90">
            50+ Corps
          </span>
        </button>
      </div>

      {subTab === 'sectional' ? (
        <SectionalMocks currentUser={currentUser} />
      ) : subTab === 'experiences' ? (
        <PlacementExperiences />
      ) : (
        /* Quiz Dashboard Row */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        
        {/* Core Quiz Client */}
        <div className="lg:col-span-2 bg-white border border-slate-200/85 shadow-sm rounded-3xl p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-5 border-b border-slate-100 mb-6">
              <div>
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <HelpCircle className="text-indigo-600" />
                  Daily Exam & Placement Prep Quiz
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Test your concepts and verify step-by-step solutions instantly</p>
              </div>

              <div className="flex gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl">
                {(['All', 'Aptitude', 'English', 'SSC'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setFilterCategory(cat); restartQuiz(); }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      filterCategory === cat ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'text-slate-600 hover:text-indigo-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-500 text-sm font-medium flex items-center justify-center gap-2">
                <RefreshCw className="animate-spin text-indigo-600" /> Loading interactive exam items...
              </div>
            ) : error ? (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-xl">
                Error loading quiz database: {error}
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                No active questions found in category "{filterCategory}". Select another prep topic above!
              </div>
            ) : showResultCard ? (
              <div className="text-center py-8 space-y-4" id="quiz-congratulation-card">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto border border-indigo-100">
                  <Trophy size={32} />
                </div>
                <h4 className="text-2xl font-black text-slate-800">Quiz Completed!</h4>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  You scored <span className="font-bold text-indigo-600">{score}</span> out of <span className="font-bold text-slate-700">{filteredQuestions.length}</span> correct answers. Excellent effort to sharpen your recall constraints!
                </p>
                <div className="pt-4">
                  <button 
                    onClick={restartQuiz}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white font-medium py-2.5 px-6 rounded-xl transition text-xs"
                  >
                    <RefreshCw size={14} /> Start Another Run
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Progress Indicators */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Question <span className="font-bold text-slate-700">{currentIdx + 1}</span> of {filteredQuestions.length}</span>
                  <span className="bg-indigo-50/80 text-indigo-700 font-semibold px-2 py-0.5 rounded-lg border border-indigo-100 text-[10px] uppercase tracking-wider">{filteredQuestions[currentIdx].category} PREP</span>
                </div>

                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full transition-all duration-350" 
                    style={{ width: `${((currentIdx + 1) / filteredQuestions.length) * 100}%` }}
                  ></div>
                </div>

                {/* Prompt Statement */}
                <h4 className="text-base font-bold text-slate-800 leading-relaxed">
                  {filteredQuestions[currentIdx].question}
                </h4>

                {/* Options List */}
                <div className="space-y-2">
                  {filteredQuestions[currentIdx].options.map((opt, oIdx) => {
                    let btnStyle = "border-slate-200 bg-white text-slate-700 hover:bg-slate-50/50";
                    
                    if (selectedAnswer === oIdx) {
                      btnStyle = "border-indigo-600 bg-indigo-50 text-indigo-800 font-medium";
                    }
                    
                    if (hasSubmitted) {
                      if (oIdx === filteredQuestions[currentIdx].correctAnswer) {
                        btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium";
                      } else if (selectedAnswer === oIdx) {
                        btnStyle = "border-rose-400 bg-rose-50 text-rose-800";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={hasSubmitted}
                        onClick={() => handleOptionSelect(oIdx)}
                        className={`w-full text-left p-3.5 border rounded-xl text-xs transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {hasSubmitted && oIdx === filteredQuestions[currentIdx].correctAnswer && (
                          <CheckCircle size={16} className="text-emerald-600 shrink-0 ml-2" />
                        )}
                        {hasSubmitted && selectedAnswer === oIdx && oIdx !== filteredQuestions[currentIdx].correctAnswer && (
                          <AlertOctagon size={16} className="text-rose-500 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Window */}
                {hasSubmitted && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      💡 Detailed Answer Key Explanation
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed font-mono">
                      {filteredQuestions[currentIdx].explanation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {!loading && filteredQuestions.length > 0 && !showResultCard && (
            <div className="pt-6 border-t border-slate-100 mt-6 flex justify-end gap-3">
              {!hasSubmitted ? (
                <button
                  disabled={selectedAnswer === null}
                  onClick={handleAnswerSubmit}
                  className="bg-slate-950 hover:bg-slate-800 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition"
                >
                  Verify Verification Checked
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  {currentIdx + 1 === filteredQuestions.length ? "Finish Exam Run" : "Next Topic Task"}
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Resources & Papers sidebar */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-indigo-500/15 text-indigo-400 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
              <FileText size={12} /> Prep Syllabus Resources
            </span>
            <h3 className="font-bold text-lg text-white mb-2">Previous Papers & Guidelines</h3>
            <p className="text-slate-400 text-xs mb-6">Gain immediate exposure to real exam constraints and mock paper topics.</p>

            <div className="space-y-4">
              {resourcesList.map((res, index) => (
                <div key={index} className="p-3 bg-slate-800/60 border border-slate-800 hover:border-slate-700 rounded-xl transition space-y-1.5">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-1.5 py-0.5 rounded uppercase">{res.type}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 leading-snug">{res.title}</h4>
                  <button className="text-[10px] font-mono text-indigo-400 hover:underline inline-flex items-center gap-1">
                    <BookMarked size={11} /> {res.linkText}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-[10px] text-slate-500 text-center leading-relaxed mt-6">
            Previous paper database is maintained by the CareerForge Academic Board. New questions uploaded weekly.
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
