/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { User } from "../types";
import { 
  Trophy, 
  Clock, 
  BarChart4, 
  CheckCircle, 
  XCircle, 
  Play, 
  ChevronRight, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle,
  TrendingUp,
  Award
} from "lucide-react";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

interface SectionalMocksProps {
  currentUser: User | null;
}

interface MockQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subtopic: string;
}

const EXAM_DATA: Record<string, Record<string, MockQuestion[]>> = {
  "ssc-cgl": {
    "quantitative-aptitude": [
      // ================= ALGEBRA =================
      {
        question: "If x + 1/x = 5, what is the value of x² + 1/x²?",
        options: ["23", "25", "27", "21"],
        correctAnswer: 0,
        explanation: "Square both sides of the identity: (x + 1/x)² = x² + 2 + 1/x² = 25. Therefore, x² + 1/x² = 25 - 2 = 23.",
        subtopic: "Algebra"
      },
      {
        question: "If a + b = 8 and ab = 15, find the value of a³ + b³.",
        options: ["152", "224", "180", "128"],
        correctAnswer: 0,
        explanation: "Using the algebraic formula: a³ + b³ = (a + b)(a² - ab + b²). Also note a² + b² = (a+b)² - 2ab = 64 - 30 = 34. Thus, a³ + b³ = 8 * (34 - 15) = 8 * 19 = 152.",
        subtopic: "Algebra"
      },
      {
        question: "If x⁴ + 1/x⁴ = 194, find the value of x³ + 1/x³ (for x > 0).",
        options: ["52", "18", "76", "110"],
        correctAnswer: 0,
        explanation: "Let x² + 1/x² = k. Then (x² + 1/x²)² - 2 = k² - 2 = 194 => k = 14. Now for (x + 1/x)² - 2 = 14 => (x + 1/x) = 4. Finally, x³ + 1/x³ = (x + 1/x)³ - 3(x + 1/x) = 4³ - 3(4) = 64 - 12 = 52.",
        subtopic: "Algebra"
      },
      {
        question: "If a - b = 4 and a² + b² = 40, find the value of ab.",
        options: ["12", "10", "8", "16"],
        correctAnswer: 0,
        explanation: "Expand the squared difference: (a - b)² = a² + b² - 2ab. Substituting the given values: 4² = 40 - 2ab => 16 = 40 - 2ab => 2ab = 24 => ab = 12.",
        subtopic: "Algebra"
      },
      {
        question: "If 2x + 3y = 12 and xy = 6, find the value of 8x³ + 27y³.",
        options: ["432", "1728", "-432", "864"],
        correctAnswer: 0,
        explanation: "Cube both sides of the linear sum: (2x + 3y)³ = 8x³ + 27y³ + 3(2x)(3y)(2x + 3y) => 12³ = 8x³ + 27y³ + 18(xy)(2x + 3y) => 1728 = 8x³ + 27y³ + 18(6)(12) => 1728 = 8x³ + 27y³ + 1296 => 8x³ + 27y³ = 1728 - 1296 = 432.",
        subtopic: "Algebra"
      },
      // ================= PROFIT & LOSS =================
      {
        question: "A shopkeeper marks his goods 20% above the cost price and allows a discount of 10%. Find his net gain percentage.",
        options: ["8%", "10%", "12%", "6%"],
        correctAnswer: 0,
        explanation: "Let cost price (CP) be 100. Marked price (MP) = 120. Selling Price (SP) = 120 - 10% of 120 = 108. Gain = 108 - 100 = 8%.",
        subtopic: "Profit & Loss"
      },
      {
        question: "By selling an article for ₹960, a man incurs a loss of 20%. At what price should he sell it to gain 15%?",
        options: ["₹1380", "₹1200", "₹1150", "₹1280"],
        correctAnswer: 0,
        explanation: "Selling Price (SP) of 960 represents 100% - 20% = 80% of Cost Price. Hence, CP = 960 / 0.8 = ₹1200. To earn 15% profit, new SP = 1200 * 1.15 = ₹1380.",
        subtopic: "Profit & Loss"
      },
      {
        question: "If the cost price of 15 articles is equal to the selling price of 12 articles, find the gain percentage.",
        options: ["25%", "20%", "16.67%", "33.33%"],
        correctAnswer: 0,
        explanation: "Given 15 * CP = 12 * SP => SP / CP = 15 / 12 = 5 / 4. Profit ratio = (5 - 4) / 4 = 1/4 = 0.25. Therefore, gain percentage is 25%.",
        subtopic: "Profit & Loss"
      },
      {
        question: "A dealer sells two machines for ₹12000 each. On one he gains 20% and on other he loses 20%. Find his overall gain/loss percentage.",
        options: ["4% loss", "4% gain", "No loss no gain", "2% loss"],
        correctAnswer: 0,
        explanation: "In transactions where two items are sold at the same price with equal percentages of gain and loss, there is ALWAYS a net loss given by: Loss% = (Common Gain/Loss % / 10)² = (20 / 10)² = 4% loss.",
        subtopic: "Profit & Loss"
      },
      {
        question: "A dishonest dealer professes to sell his goods at cost price but uses a weight of 900g instead of 1kg. Find his profit percentage.",
        options: ["11.11%", "10%", "12.5%", "9.09%"],
        correctAnswer: 0,
        explanation: "Profit% = (Error value / True value - Error value) * 100 = (100g / (1000g - 100g)) * 100 = (100 / 900) * 100 = 11.11%.",
        subtopic: "Profit & Loss"
      },
      // ================= TRIGONOMETRY =================
      {
        question: "Find the value of sec²(45°) - tan²(45°).",
        options: ["1", "0", "2", "-1"],
        correctAnswer: 0,
        explanation: "By standard trigonometric identity, sec²θ - tan²θ = 1. Therefore, sec²(45°) - tan²(45°) = 1 (since sec(45°)=√2 and tan(45°)=1, (√2)² - 1² = 2 - 1 = 1).",
        subtopic: "Trigonometry"
      },
      {
        question: "If sin θ + cos θ = 7/5, then what is the value of sin θ * cos θ?",
        options: ["12/25", "24/25", "6/25", "1/2"],
        correctAnswer: 0,
        explanation: "Square both sides: (sin θ + cos θ)² = sin²θ + cos²θ + 2*sinθ*cosθ. Since sin²θ + cos²θ = 1, we get: (7/5)² = 1 + 2*sinθ*cosθ => 49/25 - 1 = 2*sinθ*cosθ => 24/25 = 2*sinθ*cosθ => sinθ*cosθ = 12/25.",
        subtopic: "Trigonometry"
      },
      {
        question: "If tan θ = 4/3, find the value of (3 sin θ + 2 cos θ) / (3 sin θ - 2 cos θ).",
        options: ["3", "4", "2", "5"],
        correctAnswer: 0,
        explanation: "Divide both numerator and denominator by cos θ: (3*tanθ + 2) / (3*tanθ - 2). Substituting tanθ = 4/3: (3*(4/3) + 2) / (3*(4/3) - 2) = (4 + 2) / (4 - 2) = 6 / 2 = 3.",
        subtopic: "Trigonometry"
      },
      {
        question: "If sin(A + B) = 1 and cos(A - B) = √3/2, where A and B are acute angles, find A and B.",
        options: ["60° and 30°", "45° and 45°", "50° and 40°", "75° and 15°"],
        correctAnswer: 0,
        explanation: "We know sin(90°) = 1, hence A + B = 90°. Also cos(30°) = √3/2, hence A - B = 30°. Solving these simultaneous equations: 2A = 120° => A = 60° and B = 30°.",
        subtopic: "Trigonometry"
      },
      {
        question: "What is the value of (sin 30° * cos 60°) + (cos 30° * sin 60°)?",
        options: ["1", "1/2", "√3/2", "0"],
        correctAnswer: 0,
        explanation: "Apply the angle-add identity: sin(A)cos(B) + cos(A)sin(B) = sin(A + B). Here sin(30° + 60°) = sin(90°) = 1.",
        subtopic: "Trigonometry"
      },
      // ================= GEOMETRY =================
      {
        question: "The ratio of the angles of a triangle is 2:3:5. Find the measure of the largest angle in degrees.",
        options: ["90°", "75°", "100°", "60°"],
        correctAnswer: 0,
        explanation: "Sum of angles is 180°. Let parts be 2x, 3x, 5x. 10x = 180 => x = 18. Largest is 5 * 18 = 90°.",
        subtopic: "Geometry"
      },
      {
        question: "The lengths of two sides of a triangle are 6 cm and 8 cm. What is the range of the third side x in cm?",
        options: ["2 < x < 14", "2 ≤ x ≤ 14", "x > 8", "6 < x < 8"],
        correctAnswer: 0,
        explanation: "According to the Triangle Inequality Theorem, the sum of any two sides must be greater than the third side (6+8 > x => x < 14), and the difference must be less (8-6 < x => x > 2). Hence, 2 < x < 14.",
        subtopic: "Geometry"
      },
      {
        question: "In a circle of radius 10 cm, the distance of a chord from the center is 6 cm. Find the length of the chord.",
        options: ["16 cm", "12 cm", "8 cm", "20 cm"],
        correctAnswer: 0,
        explanation: "A perpendicular drop from center to a chord bisects the chord. This forms a right-angled triangle with radius as hypotenuse. (Half chord)² + 6² = 10² => (Half chord)² = 100 - 36 = 64 => Half chord = 8 cm. Total chord length = 8 * 2 = 16 cm.",
        subtopic: "Geometry"
      },
      {
        question: "The side of an equilateral triangle is 6 cm. Find its area in sq.cm.",
        options: ["9√3", "18√3", "6√3", "12√3"],
        correctAnswer: 0,
        explanation: "Area of an equilateral triangle = (√3 / 4) * side² = (√3 / 4) * 6² = (√3 / 4) * 36 = 9√3 sq.cm.",
        subtopic: "Geometry"
      },
      {
        question: "In triangle ABC, the bisectors of ∠B and ∠C intersect at point O inside the triangle. If ∠A = 40°, find ∠BOC.",
        options: ["110°", "100°", "120°", "130°"],
        correctAnswer: 0,
        explanation: "In any triangle, the angle BOC formed by internal angle bisectors at the incenter O is given by the formula: ∠BOC = 90° + ∠A/2 = 90° + 40/2 = 90° + 20° = 110°.",
        subtopic: "Geometry"
      },
      // ================= TIME & WORK =================
      {
        question: "A can do a piece of work in 12 days, and B can do it in 18 days. Working together, in how many days can they complete the work?",
        options: ["7.2 days", "6.0 days", "8.4 days", "10.0 days"],
        correctAnswer: 0,
        explanation: "Working together capacity per day = 1/12 + 1/18 = 5/36. Complete time = 36/5 = 7.2 days.",
        subtopic: "Time & Work"
      },
      {
        question: "12 men can complete a project in 9 days. In how many days can 18 men complete the same project?",
        options: ["6 days", "5 days", "8 days", "7 days"],
        correctAnswer: 0,
        explanation: "Equating Total Work in man-days: M₁ * D₁ = M₂ * D₂. Substituting values: 12 * 9 = 18 * x => 108 = 18x => x = 6 days.",
        subtopic: "Time & Work"
      },
      {
        question: "A is twice as efficient as B, and working together they finish a piece of work in 14 days. In how many days can A alone complete the work?",
        options: ["21 days", "28 days", "42 days", "35 days"],
        correctAnswer: 0,
        explanation: "Let efficiency of B be 1 unit/day, making A's efficiency 2 units/day. Total work is (2 + 1) * 14 = 42 units. Time for A alone = 42 / 2 units per day = 21 days.",
        subtopic: "Time & Work"
      },
      {
        question: "A can do a work in 10 days, B in 15 days. They work together for 3 days and then B leaves. In how many days will A alone complete the remaining work?",
        options: ["5 days", "4 days", "6 days", "8 days"],
        correctAnswer: 0,
        explanation: "A's daily work = 1/10, B's daily work = 1/15. Shared work rate = 1/10 + 1/15 = 1/6 per day. In 3 days, they finish 3 * (1/6) = 1/2 of work. Remaining work = 1/2. Time taken by A alone = (1/2) / (1/10) = 5 days.",
        subtopic: "Time & Work"
      },
      {
        question: "4 Men and 6 Women can complete a piece of work in 8 days, while 3 Men and 7 Women can do it in 10 days. Find the time taken by 10 Women alone to do it.",
        options: ["40 days", "30 days", "20 days", "50 days"],
        correctAnswer: 0,
        explanation: "Total work equated: 8 * (4M + 6W) = 10 * (3M + 7W) => 32M + 48W = 30M + 70W => 2M = 22W => 1M = 11W. Total work expressed in Women-days = 8 * (4*(11) + 6)W = 8 * 50W = 400 Women-days. Time for 10 Women = 400 / 10 = 40 days.",
        subtopic: "Time & Work"
      }
    ],
    "logical-reasoning": [
      {
        question: "Identify the missing term in the sequence: 3, 5, 9, 17, 33, ?",
        options: ["65", "54", "48", "60"],
        correctAnswer: 0,
        explanation: "The pattern is (Current * 2) - 1. So 3*2 - 1 = 5; 5*2 - 1 = 9... Then 33 * 2 - 1 = 65.",
        subtopic: "Number Series"
      },
      {
        question: "In a certain code, 'TEMPLE' is written as 'DKOLDS'. How is 'CHURCH' written in that same cipher?",
        options: ["BGTSBG", "CGTSBG", "BGUTBG", "DGUTCH"],
        correctAnswer: 0,
        explanation: "Each letter in 'TEMPLE' is shifted 1 alphabet backward (-1) to produce 'DKOLDS' in reverse alignment. CHURCH becomes BGTSBG.",
        subtopic: "Coding-Decoding"
      },
      {
        question: "A candidate walks 4 km North, then turns left and walks 3 km. Realistically, how far are they from the starting vertex?",
        options: ["5 km", "7 km", "6 km", "3.5 km"],
        correctAnswer: 0,
        explanation: "Applies the Pythagorean formula: Distance = √(4² + 3²) = √25 = 5 km.",
        subtopic: "Directions Sense"
      },
      {
        question: "Premises: All cats are mammals. No mammals are reptiles. Which logical deduction is absolute fact?",
        options: ["No cats are reptiles", "All reptiles are cats", "Some cats are reptiles", "No reptiles are mammals"],
        correctAnswer: 0,
        explanation: "Since all cats are mammals, and no mammals can be reptiles, cats are entirely disjoint from reptiles.",
        subtopic: "Syllogisms"
      },
      {
        question: "Introducing a gentleman, a woman said, 'His wife is the only daughter of my father'. How is the gentleman linked to that woman?",
        options: ["Husband", "Brother", "Father", "Uncle"],
        correctAnswer: 0,
        explanation: "The woman's father's only daughter is the woman herself. Her husband is the man since his wife is herself.",
        subtopic: "Blood Relations"
      }
    ],
    "general-awareness": [
      {
        question: "Which Indian scientist won the Nobel Prize in Physics for demonstrating the light scattering effect?",
        options: ["C.V. Raman", "Homi Bhabha", "Jagadish Chandra Bose", "A.P.J. Abdul Kalam"],
        correctAnswer: 0,
        explanation: "Sir Chandrasekhara Venkata Raman won the 1930 Nobel Prize in Physics for his discovery of the Raman Effect.",
        subtopic: "General Science"
      },
      {
        question: "The power of judicial review in the Indian Constitution was heavily inspired by which national document?",
        options: ["United States", "United Kingdom", "Canada", "Ireland"],
        correctAnswer: 0,
        explanation: "The concept of judicial review and independent judiciary was borrowed from the US Constitution.",
        subtopic: "Indian Polity"
      },
      {
        question: "Which deep water strait connects the Arabian Sea with the Bay of Bengal?",
        options: ["Palk Strait", "Malacca Strait", "Sundar Strait", "Gibraltar Strait"],
        correctAnswer: 0,
        explanation: "The Palk Strait runs between Tamil Nadu (India) and the Mannar district of Sri Lanka.",
        subtopic: "Indian Geography"
      },
      {
        question: "Which historical emperor was famously referred to as the 'Napoleon of India' by historians?",
        options: ["Samudragupta", "Chandragupta Maurya", "Ashoka", "Harshavardhana"],
        correctAnswer: 0,
        explanation: "Samudragupta of the Gupta Dynasty was termed the 'Napoleon of India' due to his expansive military triumphs.",
        subtopic: "Indian History"
      },
      {
        question: "The Comptroller and Auditor General (CAG) of India is appointed under which Article of the Constitution?",
        options: ["Article 148", "Article 110", "Article 76", "Article 324"],
        correctAnswer: 0,
        explanation: "Article 148 of the Constitution establishes the CAG's office, granting structural audit independence.",
        subtopic: "Constitutional Bodies"
      }
    ],
    "general-english": [
      {
        question: "Identify the correct synonym of the word 'PUNCTILIOUS'.",
        options: ["Careless", "Meticulous / Precise", "Overly Formal", "Brief"],
        correctAnswer: 1,
        explanation: "Punctilious means showing great attention to detail or correct behavior; meticulous is its most direct synonym.",
        subtopic: "Synonyms"
      },
      {
        question: "Choose the word with the correct spelling representation.",
        options: ["Accomodation", "Accommodation", "Acomodation", "Accomodasion"],
        correctAnswer: 1,
        explanation: "The correct spelling is 'Accommodation', featuring double 'c' and double 'm'.",
        subtopic: "Spelling Rules"
      },
      {
        question: "Complete the sentence: She ________ completed her post-graduation by next summer solstice.",
        options: ["will have", "would has", "will", "has"],
        correctAnswer: 0,
        explanation: "The action will be completed before a specified point in the future, requiring the future perfect tense: 'will have'.",
        subtopic: "Verb Tenses"
      },
      {
        question: "Select the most appropriate antonym of 'EPHEMERAL'.",
        options: ["Permanent", "Fleeting", "Short-lived", "Delicate"],
        correctAnswer: 0,
        explanation: "Ephemeral means lasting for a very short time. Complete opposite is 'Permanent'.",
        subtopic: "Antonyms"
      },
      {
        question: "Find the error: Neither of the two candidates (A) / were selected (B) / for the technical lead (C) / No error (D)",
        options: ["Part A", "Part B", "Part C", "Part D"],
        correctAnswer: 1,
        explanation: "'Neither' is a singular distributor, requiring a singular verb. 'were selected' should be corrected to 'was selected'.",
        subtopic: "Error Spotting"
      }
    ],
    "english-grammar": [
      {
        question: "Choose the grammatically correct sentence from the options below.",
        options: ["He is one of those men who never lies.", "He is one of those men who never lie.", "He is one of those man who never lie.", "He is one of those men who never has lied."],
        correctAnswer: 1,
        explanation: "'Those men who' is a relative pronoun clause referencing a plural antecedent ('men'), hence requiring the plural verb 'lie' rather than the singular 'lies'.",
        subtopic: "Sentence Syntax"
      },
      {
        question: "Fill in the blank: The meeting has been postponed ________ next Monday.",
        options: ["until", "to", "for", "against"],
        correctAnswer: 0,
        explanation: "'postponed until' is the correct idiomatic phrase indicating timeframe extension to a designated limit.",
        subtopic: "Prepositions"
      },
      {
        question: "Spot the part with the error: Scarcely had I self-started the car (A) / when the radiator (B) / burst into clouds of steam. (C) / No error (D)",
        options: ["Part A", "Part B", "Part C", "Part D"],
        correctAnswer: 3,
        explanation: "The sentence is grammatically correct. Scarcely is correctly coupled with 'when', and the past perfect inversion 'had I self-started' is perfect.",
        subtopic: "Conjunctions"
      },
      {
        question: "Find the correct passive voice: 'The mechanic repaired the car.'",
        options: ["The car is repaired by the mechanic.", "The car was repaired by the mechanic.", "The car was being repaired by the mechanic.", "The car has been repaired by the mechanic."],
        correctAnswer: 1,
        explanation: "For simple past active 'repaired', the passive format is 'was/were + past participle' which yields 'was repaired'.",
        subtopic: "Passive Voice"
      },
      {
        question: "Identify the correct preposition: Despite ________ his best efforts, he could not crack the qualifying paper.",
        options: ["of", "for", "with", "No preposition needed"],
        correctAnswer: 3,
        explanation: "'Despite' is a preposition itself and does not require another preposition like 'of'. ('In spite of' requires of, but 'Despite' is used directly).",
        subtopic: "Prepositional Usage"
      }
    ]
  },
  "fresher-qa": {
    "quantitative-aptitude": [
      {
        question: "The average weight of 8 men is increased by 2.5 kg when a new man replaces one who weighs 65 kg. Find weight of the newcomer.",
        options: ["85 kg", "75 kg", "80 kg", "90 kg"],
        correctAnswer: 0,
        explanation: "Total weight gain = 8 * 2.5 = 20 kg. Newcomer weight = 65 + 20 = 85 kg.",
        subtopic: "Averages"
      },
      {
        question: "Two trains of length 140m and 160m are running at speeds of 60 km/h and 40 km/h in opposite directions. How long do they take to cross each other?",
        options: ["10.8 seconds", "12 seconds", "9 seconds", "15 seconds"],
        correctAnswer: 0,
        explanation: "Total relative speed = 60 + 40 = 100 km/h = 100 * (5/18) = 27.78 m/s. Crossing distance = 300m. Time = 300 / 27.78 = 10.8s.",
        subtopic: "Time & Distance"
      },
      {
        question: "A sum of money doubles itself in 5 years on simple interest. What is the annual rate of interest?",
        options: ["20%", "10%", "15%", "25%"],
        correctAnswer: 0,
        explanation: "Interest earned equals Principal P in 5 years. P = (P * R * 5)/100 => 5R = 100 => R = 20%.",
        subtopic: "Simple Interest"
      },
      {
        question: "What is the probability of drawing either a King or a Heart from a standard 52-card deck?",
        options: ["16/52", "17/52", "13/52", "4/52"],
        correctAnswer: 0,
        explanation: "Total Hearts = 13. Total Kings = 4. Overlap (King of Hearts) = 1. Probability = (13 + 4 - 1)/52 = 16/52 = 4/13.",
        subtopic: "Probability"
      },
      {
        question: "A pipe can fill a pool in 6 hours, while an escape valve empties it in 10 hours. If both run, in how many hours is the pool filled?",
        options: ["15 hours", "12 hours", "18 hours", "8 hours"],
        correctAnswer: 0,
        explanation: "Net rate per hour = 1/6 - 1/10 = 4/60 = 1/15. Entire fill takes 15 hours.",
        subtopic: "Pipes & Cisterns"
      }
    ]
  }
};

const TOPIC_LABELS: Record<string, string> = {
  "ssc-cgl": "SSC CGL (Combined Graduate Level)",
  "fresher-qa": "Tech Fresher Placements"
};

const SECTION_LABELS: Record<string, string> = {
  "quantitative-aptitude": "Quantitative Aptitude",
  "logical-reasoning": "Logical Reasoning",
  "general-awareness": "General Awareness",
  "general-english": "General English",
  "english-grammar": "English Grammar"
};

export const SectionalMocks: React.FC<SectionalMocksProps> = ({ currentUser }) => {
  const [selectedExam, setSelectedExam] = useState<"ssc-cgl" | "fresher-qa">("ssc-cgl");
  const [selectedSection, setSelectedSection] = useState<string>("quantitative-aptitude");
  const [examMode, setExamMode] = useState<"sectional" | "full">("full");
  
  // Test Taking State
  const [isTesting, setIsTesting] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(1500); // 25 Mins (1500s) default
  const [savingResult, setSavingResult] = useState(false);
  
  // Completed test diagnostic structures
  const [latestResult, setLatestResult] = useState<{
    score: number;
    total: number;
    accuracy: number;
    timeSpent: number;
    breakdown: Record<string, { correct: number; total: number }>;
  } | null>(null);

  // Historic list from Firestore
  const [attemptsHistory, setAttemptsHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Sync historical reports from Firestore
  useEffect(() => {
    if (!currentUser) return;
    setHistoryLoading(true);
    
    // query mock attempts for current user
    const collRef = collection(db, "users", currentUser.id, "mockAttempts");
    const q = query(collRef, orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const historyList: any[] = [];
      snapshot.forEach((doc) => {
        historyList.push({ id: doc.id, ...doc.data() });
      });
      setAttemptsHistory(historyList);
      setHistoryLoading(false);
    }, (err) => {
      console.error("Firestore history retrieval error: ", err);
      setHistoryLoading(false);
      handleFirestoreError(err, OperationType.LIST, `users/${currentUser.id}/mockAttempts`);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const getActiveQuestions = (): MockQuestion[] => {
    if (selectedExam === "ssc-cgl" && examMode === "full") {
      const all: MockQuestion[] = [];
      const sections = ["quantitative-aptitude", "logical-reasoning", "general-awareness", "general-english", "english-grammar"];
      sections.forEach(sec => {
        const list = EXAM_DATA["ssc-cgl"]?.[sec];
        if (list) {
          all.push(...list.slice(0, 5));
        }
      });
      return all;
    }
    return EXAM_DATA[selectedExam]?.[selectedSection] || [];
  };

  const questions = getActiveQuestions();

  // Timed Engine
  useEffect(() => {
    if (!isTesting) return;
    if (secondsRemaining <= 0) {
      handleSubmitMock();
      return;
    }
    const timer = setTimeout(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isTesting, secondsRemaining]);

  const handleStartExam = () => {
    setAnswers({});
    setCurrentQuestionIdx(0);
    const questionsList = getActiveQuestions();
    setSecondsRemaining(questionsList.length * 60); // 1 Minute per question loaded (1500 seconds for 25 questions)
    setLatestResult(null);
    setIsTesting(true);
  };

  const handleSelectOption = (index: number) => {
    // Only set if not already answered
    if (answers[currentQuestionIdx] === undefined) {
      setAnswers(prev => ({ ...prev, [currentQuestionIdx]: index }));
    }
  };

  const calculateLiveScore = () => {
    let score = 0;
    Object.entries(answers).forEach(([qIdx, ansIdx]) => {
      const idx = parseInt(qIdx, 10);
      if (questions[idx] && ansIdx === questions[idx].correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmitMock = async () => {
    setIsTesting(false);
    const questionsList = getActiveQuestions();
    
    let correctCount = 0;
    const categoryDiagnostics: Record<string, { correct: number; total: number }> = {};

    questionsList.forEach((q, idx) => {
      const topic = q.subtopic;
      if (!categoryDiagnostics[topic]) {
        categoryDiagnostics[topic] = { correct: 0, total: 0 };
      }
      categoryDiagnostics[topic].total += 1;
      
      const chosen = answers[idx];
      if (chosen === q.correctAnswer) {
        correctCount += 1;
        categoryDiagnostics[topic].correct += 1;
      }
    });

    const maxSeconds = examMode === "full" && selectedExam === "ssc-cgl" ? 1500 : 300;
    const timeSpent = maxSeconds - secondsRemaining;
    const accuracy = questionsList.length > 0 ? Math.round((correctCount / questionsList.length) * 100) : 0;

    const resultSummary = {
      score: correctCount,
      total: questionsList.length,
      accuracy,
      timeSpent,
      breakdown: categoryDiagnostics
    };

    setLatestResult(resultSummary);

    // Save to Firestore in real-time
    if (currentUser) {
      setSavingResult(true);
      try {
        const docRef = collection(db, "users", currentUser.id, "mockAttempts");
        await addDoc(docRef, {
          id: `attempt-${Date.now()}`,
          userId: currentUser.id,
          examType: selectedExam,
          section: examMode === "full" ? "full-length-mock" : selectedSection,
          score: correctCount,
          totalQuestions: questionsList.length,
          accuracy,
          timeSpent,
          createdAt: new Date(), // rule checks for timestamp
          categoryPerformance: categoryDiagnostics
        });
      } catch (err) {
        console.error("Failed to commit mock attempt: ", err);
        handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.id}/mockAttempts`);
      } finally {
        setSavingResult(false);
      }
    }
  };

  // Questions are dynamically managed by getActiveQuestions() instead of hardcoded shadowing

  if (!currentUser) {
    return (
      <div id="mocks-not-logged-in-panel" className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 text-center max-w-lg mx-auto space-y-5 my-8">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center border border-amber-200 text-amber-600 mx-auto">
          <Clock size={30} />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-800">Locked Client Exam Sandbox</h3>
          <p className="text-slate-500 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
            Standard SSC CGL diagnostics and custom fresher aptitude speed mocks require real-time authentication to register historical reports.
          </p>
        </div>
        <div className="pt-2">
          <p className="text-xs text-indigo-600 font-bold bg-indigo-50/50 py-2.5 px-4 rounded-xl border border-indigo-100/50 inline-block">
            🔑 Sign in to access sectional mocks with progress analytics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" id="sectional-mock-board">
      
      {/* EXAM & CONFIG SELECTOR SECTION */}
      {!isTesting && !latestResult && (
        <div className="bg-white border border-slate-200/85 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-slate-900 text-xl flex items-center gap-2">
              <Award className="text-amber-500" />
              Interactive Exam Sectional Mocks
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Simulate true negative marking boundaries. Save speed records directly in your student cloud profile.
            </p>
          </div>

          {/* New SSC CGL 25 Qs / 25 Mins Format Selector */}
          {selectedExam === "ssc-cgl" && (
            <div className="bg-gradient-to-r from-indigo-50/50 to-indigo-100/30 border border-indigo-100/85 rounded-2xl p-5 space-y-3.5">
              <span className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                Exam format option
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setExamMode("full")}
                  className={`p-4 rounded-xl text-left transition relative cursor-pointer group ${
                    examMode === "full"
                      ? "bg-white border-2 border-indigo-600 text-indigo-950 shadow-xs animate-fade-in"
                      : "bg-white/40 border border-slate-200 text-slate-650 hover:bg-white"
                  }`}
                >
                  <div className="font-black text-xs">🏆 SSC CGL Full Syllabus Mock Test</div>
                  <div className="text-[10.5px] text-slate-500 mt-1 font-medium leading-relaxed">
                    25 Questions • 25 Minutes (1500s) containing 5 questions each from Quantitative, LR, GA, English, and English Grammar.
                  </div>
                  {examMode === "full" && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-indigo-600"></span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setExamMode("sectional")}
                  className={`p-4 rounded-xl text-left transition relative cursor-pointer group ${
                    examMode === "sectional"
                      ? "bg-white border-2 border-indigo-600 text-indigo-950 shadow-xs animate-fade-in"
                      : "bg-white/40 border border-slate-200 text-slate-650 hover:bg-white"
                  }`}
                >
                  <div className="font-black text-xs">⚡ Subject-Specific Sectional practice</div>
                  <div className="text-[10.5px] text-slate-500 mt-1 font-medium leading-relaxed">
                    5 Questions • 5 Minutes (300s) to focus exclusively on solidifying a single designated syllabus area.
                  </div>
                  {examMode === "sectional" && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-indigo-600"></span>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exam Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">1. Target Objective Exam</label>
              <div className="grid grid-cols-1 gap-2">
                {(Object.keys(EXAM_DATA) as ("ssc-cgl" | "fresher-qa")[]).map(exam => (
                  <button
                    key={exam}
                    onClick={() => {
                      setSelectedExam(exam);
                      // default first available section
                      const sections = Object.keys(EXAM_DATA[exam] || {});
                      if (sections.length > 0) setSelectedSection(sections[0]);
                    }}
                    className={`p-4 rounded-2xl text-left border text-sm transition transition-all cursor-pointer flex justify-between items-center ${
                      selectedExam === exam 
                        ? 'bg-amber-50/60 text-amber-900 border-amber-500 font-bold shadow-xs' 
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{TOPIC_LABELS[exam] || exam.toUpperCase()}</span>
                    {selectedExam === exam && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Section selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">2. Subject Core Section</label>
              <div className="grid grid-cols-1 gap-2">
                {selectedExam === "ssc-cgl" && examMode === "full" ? (
                  <div className="p-5 border border-dashed border-indigo-200 bg-indigo-50/30 rounded-2xl text-center flex flex-col justify-center items-center h-full min-h-[140px]">
                    <span className="text-xl">🎓</span>
                    <strong className="text-xs text-indigo-900 font-extrabold mt-1">Multi-Section Mode Engaged</strong>
                    <p className="text-[10px] text-slate-500 mt-1 max-w-xs leading-relaxed">
                      Questions from Quantitative Aptitude, Logical Reasoning, General Awareness, General English, and English Grammar are all compiled.
                    </p>
                  </div>
                ) : (
                  Object.keys(EXAM_DATA[selectedExam] || {}).map(section => (
                    <button
                      key={section}
                      onClick={() => setSelectedSection(section)}
                      className={`p-4 rounded-2xl text-left border text-sm transition cursor-pointer flex justify-between items-center ${
                        selectedSection === section 
                          ? 'bg-indigo-50/60 text-indigo-900 border-indigo-500 font-bold' 
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{SECTION_LABELS[section] || section}</span>
                      <ChevronRight size={14} className="text-slate-400" />
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Prompt Start */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-3 items-start">
              <Clock className="text-indigo-600 shrink-0 mt-0.5 animate-pulse" size={18} />
              <div>
                <h5 className="text-xs font-extrabold text-slate-800">Standard Test Protocol:</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                  {selectedExam === "ssc-cgl" && examMode === "full" 
                    ? "25 high-yield comprehensive syllabus questions. Timer limit is 25 minutes (1500s). Live review options will be displayed during the test."
                    : "5 customized subject questions. Timer limit is 5 minutes (300s). Results are saved immediately."
                  }
                </p>
              </div>
            </div>
            <button
              onClick={handleStartExam}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-2 transition cursor-pointer shrink-0"
            >
              <Play size={12} fill="currentColor" />
              Initialize Timer & Start
            </button>
          </div>
        </div>
      )}

      {/* ONLINE TEST IN PROGRESS */}
      {isTesting && (
        <div className="bg-white border border-slate-200/95 shadow-sm rounded-3xl p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                {selectedExam === "ssc-cgl" ? "SSC CGL Exam Prep" : "Placement Prep"}
              </span>
              <h4 className="text-base font-extrabold text-slate-800 mt-1">
                {selectedExam === "ssc-cgl" && examMode === "full" 
                  ? "SSC CGL Full-Length Combined Mock" 
                  : `${SECTION_LABELS[selectedSection]} Sectional Mock`
                }
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-indigo-50 border border-indigo-100 px-3.5 py-2 rounded-xl text-indigo-700 text-xs font-black shrink-0 flex items-center gap-1.5 shadow-2xs">
                <span>🎯 Live Score:</span>
                <span className="bg-indigo-600 text-white font-extrabold px-1.5 py-0.5 rounded-md">
                  {calculateLiveScore()} / {questions.length} Correct
                </span>
              </div>
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 px-4 py-2 rounded-xl text-rose-700 font-mono text-sm font-black shadow-2xs">
                <Clock size={16} className="animate-spin text-rose-500" />
                {Math.floor(secondsRemaining / 60)}:{(secondsRemaining % 60).toString().padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="flex gap-1.5 overflow-x-auto pb-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentQuestionIdx(idx)}
                className={`w-9 h-9 rounded-xl text-xs font-bold shrink-0 transition ${
                  currentQuestionIdx === idx
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 ring-offset-1'
                    : answers[idx] !== undefined
                    ? (answers[idx] === questions[idx].correctAnswer 
                        ? 'bg-emerald-100 border border-emerald-300 text-emerald-800' 
                        : 'bg-rose-105 border border-rose-300 text-rose-800')
                    : 'bg-slate-55 border border-slate-150 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Question Text & Subtopic header */}
          <div className="space-y-5 py-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                Subtopic: {questions[currentQuestionIdx].subtopic}
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900 leading-relaxed">
              Q{currentQuestionIdx + 1}: {questions[currentQuestionIdx].question}
            </h4>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {questions[currentQuestionIdx].options.map((opt, oIdx) => {
                const isAnswered = answers[currentQuestionIdx] !== undefined;
                const isSelf = answers[currentQuestionIdx] === oIdx;
                const isCorrect = oIdx === questions[currentQuestionIdx].correctAnswer;
                
                let btnStyle = "border-slate-200 hover:bg-slate-55/80 text-slate-700";
                if (isAnswered) {
                  if (isCorrect) {
                     btnStyle = "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-black ring-1 ring-emerald-500";
                  } else if (isSelf) {
                     btnStyle = "border-rose-500 bg-rose-50/70 text-rose-950 font-black ring-1 ring-rose-500";
                  } else {
                     btnStyle = "border-slate-100 opacity-55 text-slate-400";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left p-4 border rounded-2xl text-xs transition cursor-pointer flex justify-between items-center ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelf ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                    }`}>
                      {isSelf && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Real-Time Explanation Block */}
            {answers[currentQuestionIdx] !== undefined && (
              <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4.5 space-y-3 animate-fade-in mt-4 leading-relaxed">
                <div className="flex items-center gap-2">
                  {answers[currentQuestionIdx] === questions[currentQuestionIdx].correctAnswer ? (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      ✅ CORRECT ANSWER
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 border border-rose-200 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      ❌ INCORRECT RESPONSE
                    </span>
                  )}
                </div>

                <div className="text-xs space-y-1.5 leading-relaxed text-slate-700">
                  <p className="text-emerald-900 font-extrabold">
                     Correct Answer: {questions[currentQuestionIdx].options[questions[currentQuestionIdx].correctAnswer]}
                  </p>
                  <div className="pt-2.5 border-t border-slate-200/80 mt-2 space-y-1 text-slate-500">
                    <p className="text-[11px] italic bg-white p-3.5 rounded-xl border border-slate-200 shadow-3xs leading-relaxed">
                      💡 <strong>Explanation & Syllabus Context:</strong> {questions[currentQuestionIdx].explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              disabled={currentQuestionIdx === 0}
              onClick={() => setCurrentQuestionIdx(p => p - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-250 text-slate-600 text-xs font-semibold hover:bg-slate-50 disabled:opacity-45 cursor-pointer"
            >
              Previous Question
            </button>

            {currentQuestionIdx + 1 < questions.length ? (
              <button
                onClick={() => setCurrentQuestionIdx(p => p + 1)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
              >
                Next &rarr;
              </button>
            ) : (
              <button
                onClick={handleSubmitMock}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black transition shadow-xs cursor-pointer"
              >
                Submit Mock Answers
              </button>
            )}
          </div>
        </div>
      )}

      {/* QUICK RESULTS & CATEGORY DIAGNOSTIC ANALYSIS */}
      {latestResult && (
        <div className="space-y-6" id="mock-result-analysis-report">
          <div className="bg-white border border-slate-200/95 shadow-md rounded-3xl p-6 lg:p-8 space-y-6">
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto border border-indigo-100 mb-3">
                <Trophy size={28} />
              </div>
              <h4 className="text-xl font-black text-slate-900">Evaluation Report Cards Generated!</h4>
              <p className="text-xs text-slate-400 mt-1">Section: {SECTION_LABELS[selectedSection]}</p>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Raw Score</span>
                <span className="text-2xl font-black text-slate-800 mt-1 block">{latestResult.score} / {latestResult.total}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Accuracy Rate</span>
                <span className={`text-2xl font-black mt-1 block ${latestResult.accuracy >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {latestResult.accuracy}%
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Time Invested</span>
                <span className="text-2xl font-black text-slate-800 mt-1 block">{latestResult.timeSpent}s</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Feedback Badge</span>
                <span className="text-2xl font-black text-indigo-600 mt-1 block">
                  {latestResult.accuracy >= 80 ? "Mastery" : latestResult.accuracy >= 50 ? "Proficient" : "Needs Review"}
                </span>
              </div>
            </div>

            {/* SUBTOPIC DIAGNOSTIC ANALYSIS SUMMARY */}
            <div className="bg-gradient-to-br from-indigo-50/25 to-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
              <h5 className="font-extrabold text-indigo-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                📊 Diagnostic Performance by Subtopic
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(latestResult.breakdown).map(([subtopic, stat]) => {
                  const pct = Math.round((stat.correct / stat.total) * 100);
                  let colorClass = "bg-rose-500";
                  let bgText = "text-rose-700 bg-rose-50 border-rose-100";
                  if (pct >= 80) {
                    colorClass = "bg-emerald-500";
                    bgText = "text-emerald-700 bg-emerald-50 border-emerald-100";
                  } else if (pct >= 50) {
                    colorClass = "bg-amber-500";
                    bgText = "text-amber-700 bg-amber-50 border-amber-100";
                  }

                  return (
                    <div key={subtopic} className="p-3.5 rounded-xl border border-slate-150 bg-white flex flex-col justify-between space-y-2.5 shadow-3xs">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-extrabold text-[11px] text-slate-800 leading-tight block truncate uppercase">
                          {subtopic}
                        </span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${bgText}`}>
                          {stat.correct} / {stat.total}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className={`h-full ${colorClass}`} style={{ width: `${pct}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                          <span>Accuracy</span>
                          <span>{pct}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Question Reviews */}
            <div className="space-y-4 pt-4">
              <h5 className="font-extrabold text-slate-800 text-sm flex items-center gap-1">
                <BarChart4 size={16} className="text-indigo-600" />
                Step-by-Step Solutions Review
              </h5>

              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const wasCorrect = answers[idx] === q.correctAnswer;
                  return (
                    <div key={idx} className="border border-slate-100 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-xs font-bold text-slate-550 leading-relaxed">
                          Q{idx+1}: {q.question}
                        </span>
                        {wasCorrect ? (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[10px] inline-flex items-center gap-1 tracking-wider shrink-0 uppercase">
                            <CheckCircle size={10} /> Correct
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 font-semibold text-[10px] inline-flex items-center gap-1 tracking-wider shrink-0 uppercase">
                            <XCircle size={10} /> Incorrect
                          </span>
                        )}
                      </div>

                      <div className="text-xs space-y-1">
                        <p className="text-slate-500">
                          <span className="font-semibold text-slate-700">Your Selection:</span>{" "}
                          {answers[idx] !== undefined ? q.options[answers[idx]] : "Skipped"}
                        </p>
                        <p className="text-emerald-700 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/40">
                          <span className="font-bold">Correct Solution:</span> {q.options[q.correctAnswer]}
                        </p>
                      </div>

                      <p className="text-[11px] text-slate-450 italic bg-amber-50/40 rounded-lg p-2.5 border border-amber-100/30">
                        💡 <span className="font-semibold text-slate-700">Explanation:</span> {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions for restarting */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setLatestResult(null)}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 font-bold text-xs text-white transition cursor-pointer inline-flex items-center gap-2"
              >
                <RefreshCw size={12} /> Take Another Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT PROGRESS METRIC GRAPH & REPORTS LIST (Firestore snapshot) */}
      <div className="bg-white border border-slate-200/85 shadow-sm rounded-3xl p-6 lg:p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
              <TrendingUp className="text-indigo-600" />
              Mock Exam Progress & Performance
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Track and analyze your score trends across sectional mock attempts.
            </p>
          </div>
        </div>

        {historyLoading ? (
          <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
            <RefreshCw className="animate-spin text-indigo-600" size={14} /> Syncing past attempts history...
          </div>
        ) : attemptsHistory.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
            <AlertCircle className="text-slate-400 mx-auto mb-2" size={24} />
            <p className="text-xs text-slate-400 font-medium">No previous sectional mock histories found.</p>
            <p className="text-[10px] text-slate-400 mt-1">Complete your very first test segment above to begin logging report cards!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Simple Dynamic SVG Meter to show progress over time */}
            <div className="border border-slate-150 rounded-2xl p-5 bg-gradient-to-r from-indigo-50/20 via-white to-amber-50/10">
              <h5 className="text-xs font-bold text-slate-700 mb-3">Diagnostic Grade Trend (Direct Stream)</h5>
              <div className="flex flex-wrap gap-2 items-end justify-between min-h-24 pt-4 px-2 border-b border-slate-200">
                {attemptsHistory.slice(0, 10).reverse().map((attempt, index) => {
                  const barHeight = Math.max(12, attempt.accuracy);
                  return (
                    <div key={attempt.id || index} className="flex flex-col items-center flex-1 max-w-12 group">
                      <div className="opacity-0 group-hover:opacity-100 transition duration-150 bg-slate-800 text-white text-[9px] font-bold rounded px-1.5 py-0.5 absolute -mt-7 shadow-sm">
                        {attempt.accuracy}%
                      </div>
                      <div 
                        className={`w-full rounded-t-md transition-all duration-350 ${
                          attempt.accuracy >= 80 
                            ? 'bg-emerald-500 group-hover:bg-emerald-400' 
                            : attempt.accuracy >= 50 
                            ? 'bg-amber-500 group-hover:bg-amber-400' 
                            : 'bg-indigo-500 group-hover:bg-indigo-400'
                        }`}
                        style={{ height: `${barHeight}px` }}
                      ></div>
                      <span className="text-[9px] font-mono text-slate-400 mt-1 uppercase scale-90">
                        T{attemptsHistory.slice(0, 10).reverse().length - index}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 justify-center text-[10px] mt-3">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span> Excellent (&ge;80%)
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block"></span> Steady (50-79%)
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 block"></span> review (&lt;50%)
                </span>
              </div>
            </div>

            {/* Attempt cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
              {attemptsHistory.map((attempt) => {
                const dateLabel = attempt.createdAt ? new Date(attempt.createdAt.seconds * 1000 || attempt.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                }) : "Just now";

                return (
                  <div key={attempt.id} className="border border-slate-100 rounded-2xl p-4 hover:border-indigo-100 bg-white transition flex flex-col justify-between gap-2 shadow-xs">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h6 className="text-xs font-extrabold text-slate-800 uppercase tracking-tight">
                          {TOPIC_LABELS[attempt.examType] || attempt.examType}
                        </h6>
                        <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mt-0.5 block">
                          {SECTION_LABELS[attempt.section] || attempt.section}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-base font-black ${attempt.score >= 4 ? 'text-emerald-600': attempt.score >= 3 ? 'text-amber-600': 'text-indigo-600'}`}>
                          {attempt.score} / {attempt.totalQuestions}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 block mt-0.5">{dateLabel}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Accuracy: <strong className="text-slate-700">{attempt.accuracy}%</strong></span>
                      <span>Time: <strong className="text-slate-700">{attempt.timeSpent}s</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
