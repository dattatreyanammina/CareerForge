/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Dual CJS / ESM directory support for standard bundling
let myFilename = "";
let myDirname = "";
try {
  myFilename = fileURLToPath(import.meta.url);
  myDirname = path.dirname(myFilename);
} catch (e) {
  myFilename = __filename;
  myDirname = __dirname;
}

// Initialize Express App
const app = express();
app.use(express.json());

// PORT is hardcoded by infrastructure to 3000
const PORT = 3000;

// Lazy initialization of Gemini SDK
let aiInstance: any = null;
let lastUsedApiKey: string | null = null;
function getAI() {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
     throw new Error("GEMINI_API_KEY_MISSING");
  }
  // Re-build instance if key changes dynamically
  if (!aiInstance || lastUsedApiKey !== key) {
    lastUsedApiKey = key;
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// In-Memory Database for Blogs, Quizzes, Users & Bookmarks
let BLOGS = [
  {
    id: "blog-1",
    title: "Mastering Quantitative Aptitude: Vedic Maths Shortcuts & Tricks",
    summary: "Boost your speed in competitive exams with essential calculation tricks and speed math hacks.",
    content: `# Mastering Quantitative Aptitude: Vedic Maths Shortcuts

In competitive exams like **SSC CGL, Banking, and Placement Papers**, speed is just as important as accuracy. If you can perform calculations in 5 seconds instead of 50 seconds, you gain a massive competitive edge. 

Vedic Mathematics offers elegant, one-line mental calculation shortcuts developed in ancient times. In this guide, we break down five essential calculation hacks.

---

## 1. Squaring Numbers Ending with 5
To square any two-digit number ending with \`5\` (e.g., \`65\`):
1. Multiply the first digit by the next consecutive integer.
2. Append \`25\` to the result.

### Example: Square of 65
- First digit = 6. Consecutive digit = 7.
- Multiply them: $$6 \\times 7 = 42$$
- Append 25: **4225**

---

## 2. Multiplying Any Number by 11
Multiplying any two-digit number by \`11\` is a simple add-and-insert operation.
- Let's multiply \`45\` by \`11\`.
- Add the two digits together: $$4 + 5 = 9$$
- Place that sum in the middle of the original digits: **495**

*Note: If the sum is a double digit (e.g., $$85 \\times 11$$ where $$8 + 5 = 13$$), add the carry to the first digit: $$8 + 1 = 9$$, middle = 3, ending = 5. Result = **935**.*

---

## 3. Base Multiplication (Close to 100)
Multiplying numbers like \`97\` and \`96\` can be done instantly:
- Find the difference from 100:
  - $$97 \\rightarrow -3$$
  - $$96 \\rightarrow -4$$
- Subtract the cross difference: $$97 - 4 = 93$$ or $$96 - 3 = 93$$. This forms the first part.
- Multiply the differences: $$-3 \\times -4 = 12$$.
- Result: **9312**.

---

## Recommended Daily Practice
1. Spend **15 minutes** every morning practicing mental addition.
2. Solve 10 division problems using the approximation method.
3. Review these tricks weekly to build muscle memory.

*Good luck with your competitive preparation!*`,
    category: "Aptitude Tricks",
    author: "Pranesh K.",
    readTime: "4 min read",
    date: "May 18, 2026",
    likes: 124,
    bookmarks: 45,
    tags: ["Aptitude", "SSC Prep", "Speed Math", "Tips"],
    slug: "mastering-aptitude-vedic-maths"
  },
  {
    id: "blog-2",
    title: "10 Most Explored DSA Patterns for Top Tech Companies",
    summary: "A structured study guide outlining sliding window, two pointers, and bread-and-butter patterns to ace top placement coding rounds.",
    content: `# Ace Placements: 10 Essential Data Structure & Algorithm Patterns

Most coding rounds do not test whether you memorized a standard solution. They test your capability to identify underlying patterns. If you solve 500 problems randomly, you might still struggle. If you master these 10 patterns, you can solve thousands of problems.

Let's dissect two of the most critical patterns that top tier companies frequently require.

---

## 1. Sliding Window (Dynamic & Fixed)
Used for problems involving subarrays or substrings where you need to check a specific condition over contiguous elements.

### Typical Problem:
- *\"Given an array, find the maximum sum of any contiguous subarray of size K.\"*
- Instead of calculating the sum using nested loops $$O(N \\times K)$$, keep a running sum of size K. Slide the window by adding the next element and subtracting the element dropped behind. Time complexity drops to $$O(N)$$.

\`\`\`typescript
function maxSubarraySum(arr: number[], k: number): number {
  if (arr.length < k) return 0;
  let maxSum = 0;
  let tempSum = 0;
  
  // First window
  for (let i = 0; i < k; i++) {
    tempSum += arr[i];
  }
  maxSum = tempSum;
  
  // Slide window
  for (let i = k; arr.length; i++) {
    tempSum = tempSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
\`\`\`

---

## 2. Two Pointers (Converging & Staggered)
Two pointer techniques search pairs in a sorted array efficiently.

### Typical Problem:
- *\"Given a sorted array, determine if there are two elements whose sum equals K.\"*
- Place an \`io\` pointer at start and a \`hi\` pointer at end. If sum is too high, move \`hi\` left. If too low, move \`io\` right. No nested search required!

\`\`\`typescript
function hasTargetSum(sortedArr: number[], target: number): boolean {
  let left = 0;
  let right = sortedArr.length - 1;
  while (left < right) {
    const currentSum = sortedArr[left] + sortedArr[right];
    if (currentSum === target) return true;
    else if (currentSum < target) left++;
    else right--;
  }
  return false;
}
\`\`\`

---

## Key Takeaway
Map every puzzle to its appropriate pattern before compiling any lines of code!`,
    category: "Placement Prep",
    author: "Anjali Gupta (AI Studio Alum)",
    readTime: "7 min read",
    date: "May 15, 2026",
    likes: 310,
    bookmarks: 142,
    tags: ["DSA", "Placements", "Coding", "Interviews"],
    slug: "dsa-patterns-tech-placements"
  },
  {
    id: "blog-3",
    title: "SSC CGL English Vocabulary & Grammar Prep Shortcuts",
    summary: "Clear rules and key mnemonic techniques to score 100% on English sections of competitive tests.",
    content: `# Ultimate SSC CGL English Grammar & Vocabulary Shortcuts

The English language section of the **SSC Selection Exams** can either be extremely time-consuming or your fastest point generator. If you memorize specific patterns, you can answer each grammar alignment in seconds.

Here are the highest yield rules on active test papers:

---

## 1. Subject-Verb Agreement with 'None' / 'Each'
- **Rule:** \"Each\", \"Every\", \"Everyone\", \"None\", \"No one\" are statistically treated as **singular subjects** and take a singular verb.
- ❌ **Incorrect:** *Each of the candidates have brought their resume.*
- ✅ **Correct:** *Each of the candidates **has** brought **his** (or her) resume.*

---

## 2. 'No Sooner' Followed by 'Than'
- When starting a sentence with \"No sooner\", always pair it with **\"than\"**—never with \"when\" or \"then\".
- ❌ **Incorrect:** *No sooner had I stepped outside when it began to rain.*
- ✅ **Correct:** *No sooner had I stepped outside **than** it began to rain.*

## 3. High-Yield Vocabulary Mnemonics
Memorize vocabulary using visual association rather than absolute repetition:
- **Abstain (Verb):** Restrain oneself from doing or enjoying something.
  - *Mnemonic:* \"Abs - stain\" -> If you want strong Abs, you must *abstain* from junk food!
- **Cacophony (Noun):** A harsh, discordant mixture of sounds.
  - *Mnemonic:* \"Caco\" (Bad) + \"Phony\" (Sound) -> Bad noisy sounds.

Review these rules daily to score flawlessly!`,
    category: "English Grammar",
    author: "Prof. S. R. Sharma",
    readTime: "5 min read",
    date: "May 10, 2026",
    likes: 189,
    bookmarks: 72,
    tags: ["English", "SSC Prep", "Grammar", "Government Exams"],
    slug: "ssc-cgl-english-shortcuts"
  }
];

// Default quizzes
const QUIZZES = [
  {
    id: "q-1",
    question: "If a boat travels 12 km/h upstream and 20 km/h downstream, find the speed of the current?",
    options: ["2.5 km/h", "4 km/h", "6 km/h", "8 km/h"],
    correctAnswer: 1, // 4 km/h
    explanation: "Speed of Current = (Downstream Speed - Upstream Speed) / 2 = (20 - 12) / 2 = 8 / 2 = 4 km/h.",
    category: "Aptitude"
  },
  {
    id: "q-2",
    question: "Which of the following sentences has correctly matched subject-verb agreement?",
    options: [
      "Neither the manager nor the employees were present in the conference.",
      "Neither the manager nor the employees was present in the conference.",
      "Either of the plans are suitable for the placement timeline.",
      "None of the students have completed the syllabus."
    ],
    correctAnswer: 0,
    explanation: "When two subjects are joined by 'neither... nor', the verb agrees with the subject closest to it. Here, 'employees' is plural, so 'were' is correct.",
    category: "English"
  },
  {
    id: "q-3",
    question: "Identify the antonym of the word 'Ebullient'?",
    options: ["Enthusiastic", "Depressed", "Generous", "Aggressive"],
    correctAnswer: 1, // Depressed
    explanation: "'Ebullient' means cheerful and full of energy. The opposite/antonym is therefore 'Depressed'.",
    category: "English"
  },
  {
    id: "q-4",
    question: "A training batch of 40 students has an average marks of 72. If top scorer is excluded, average marks drops to 71. Find top scorer markings?",
    options: ["102 marks", "111 marks", "98 marks", "124 marks"],
    correctAnswer: 1, // 111
    explanation: "Total initial sum = 40 * 72 = 2880. Sum of remaining 39 students = 39 * 71 = 2769. Score of top = 2880 - 2769 = 111 marks.",
    category: "Aptitude"
  },
  {
    id: "q-5",
    question: "Under which article of the Indian Constitution is the Union Budget (Annual Financial Statement) presented?",
    options: ["Article 110", "Article 112", "Article 115", "Article 120"],
    correctAnswer: 1, // Article 112
    explanation: "Article 112 describes the 'Annual Financial Statement', commonly referred to as the Union Budget.",
    category: "SSC"
  }
];

// Initial user accounts
let USERS = [
  {
    id: "user-default",
    name: "Aman Sen",
    email: "student@careerforge.com",
    role: "user",
    learningProgress: 45,
    savedBlogs: ["blog-1"],
    savedTools: ["salary-calc", "cgpa-calc"]
  },
  {
    id: "admin-default",
    name: "Dr. Alok Verma",
    email: "dattatreya_nammina@srmap.edu.in", // Prefilled to match metadata / logged in account
    role: "admin",
    learningProgress: 100,
    savedBlogs: ["blog-2"],
    savedTools: []
  }
];

// Tracking simulated API activations
let analyticsStats = {
  totalUsers: 840,
  totalBlogs: 3,
  totalApiRequests: 423,
  totalToolsUsed: 1948,
  requestsByDay: [
    { day: "Mon", count: 42 },
    { day: "Tue", count: 68 },
    { day: "Wed", count: 91 },
    { day: "Thu", count: 54 },
    { day: "Fri", count: 72 },
    { day: "Sat", count: 32 },
    { day: "Sun", count: 64 },
  ],
  popularTools: [
    { name: "GPA Calculator", count: 642 },
    { name: "Salary Estimator", count: 498 },
    { name: "AI Resume Pro", count: 356 },
    { name: "Interview Qs Gen", count: 210 },
    { name: "Roadmap Planner", count: 242 }
  ]
};

// --- AUTHENTICATION API MIDDLEWARE ---
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  // Simulate token parsing
  const foundUser = USERS.find(u => u.id === token || `dummy-token-${u.id}` === token);
  if (!foundUser) {
    return res.status(403).json({ error: "Session expired or invalid." });
  }
  
  req.user = foundUser;
  next();
}

// Ensure Admin privilege
function requireAdmin(req: any, res: any, next: any) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized. Admin rights required." });
  }
}

// --- BLOG APIS ---
app.get("/api/blogs", (req, res) => {
  res.json(BLOGS);
});

app.get("/api/blogs/:id", (req, res) => {
  const blog = BLOGS.find(b => b.id === req.params.id || b.slug === req.params.id);
  if (!blog) return res.status(404).json({ error: "Article not found." });
  res.json(blog);
});

app.post("/api/blogs", authenticateToken, requireAdmin, (req, res) => {
  const { title, summary, content, category, author, readTime, tags } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Title and content required." });
  
  const newBlog = {
    id: `blog-${Date.now()}`,
    title,
    summary: summary || title.slice(0, 100),
    content,
    category: category || "Career Guidance",
    author: author || (req as any).user.name,
    readTime: readTime || "5 min read",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    likes: 0,
    bookmarks: 0,
    tags: tags || ["Guidance"],
    slug: title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-")
  };
  
  BLOGS.unshift(newBlog);
  analyticsStats.totalBlogs = BLOGS.length;
  res.status(201).json(newBlog);
});

app.put("/api/blogs/:id", authenticateToken, requireAdmin, (req, res) => {
  const { title, summary, content, category, author, readTime, tags } = req.body;
  const index = BLOGS.findIndex(b => b.id === req.params.id);
  
  if (index === -1) return res.status(404).json({ error: "Article not found." });
  
  const updatedBlog = {
    ...BLOGS[index],
    title: title || BLOGS[index].title,
    summary: summary || BLOGS[index].summary,
    content: content || BLOGS[index].content,
    category: category || BLOGS[index].category,
    author: author || BLOGS[index].author,
    readTime: readTime || BLOGS[index].readTime,
    tags: tags || BLOGS[index].tags,
    slug: title ? title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-") : BLOGS[index].slug
  };
  
  BLOGS[index] = updatedBlog;
  res.json(updatedBlog);
});

app.delete("/api/blogs/:id", authenticateToken, requireAdmin, (req, res) => {
  const index = BLOGS.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Article not found." });
  
  BLOGS.splice(index, 1);
  analyticsStats.totalBlogs = BLOGS.length;
  res.json({ message: "Article removed successfully." });
});

app.post("/api/blogs/:id/like", authenticateToken, (req, res) => {
  const blog = BLOGS.find(b => b.id === req.params.id);
  if (!blog) return res.status(404).json({ error: "Article not found" });
  blog.likes += 1;
  res.json(blog);
});

// --- AUTHENTICATION FLOWS ---
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Full Name and email address are required." });
  
  const existing = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: "An account already exists with this email address." });
  }

  // Auto assign Admin privileges to user preloaded with userEmail
  const isUserEmailAdmin = email.toLowerCase() === "dattatreya_nammina@srmap.edu.in";
  
  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    role: isUserEmailAdmin ? ("admin" as const) : ("user" as const),
    learningProgress: 0,
    savedBlogs: [],
    savedTools: []
  };
  
  USERS.push(newUser);
  res.json({
    user: newUser,
    token: `dummy-token-${newUser.id}`
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: "Email address is required." });
  
  let user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    // For seamless testing, automatically simulate instant registration of the email!
    const isUserEmailAdmin = email.toLowerCase() === "dattatreya_nammina@srmap.edu.in";
    user = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0].toUpperCase(),
      email,
      role: isUserEmailAdmin ? "admin" : "user",
      learningProgress: 15,
      savedBlogs: [],
      savedTools: []
    };
    USERS.push(user);
  }

  res.json({
    user,
    token: `dummy-token-${user.id}`
  });
});

app.post("/api/auth/google", (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ error: "Google account details invalid." });
  
  let user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    const isUserEmailAdmin = email.toLowerCase() === "dattatreya_nammina@srmap.edu.in";
    user = {
      id: `user-${Date.now()}`,
      name: name || email.split("@")[0].toUpperCase(),
      email,
      role: isUserEmailAdmin ? "admin" : "user",
      learningProgress: 20,
      savedBlogs: [],
      savedTools: []
    };
    USERS.push(user);
  }
  
  res.json({
    user,
    token: `dummy-token-${user.id}`
  });
});

app.get("/api/auth/me", authenticateToken, (req: any, res) => {
  res.json(req.user);
});

// Save resource to user bookmark
app.post("/api/user/saved", authenticateToken, (req: any, res) => {
  const { resourceId, type } = req.body; // type: 'blog' | 'tool'
  const user = USERS.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User profile not found" });

  if (type === "blog") {
    const hasIdx = user.savedBlogs.indexOf(resourceId);
    if (hasIdx > -1) {
      user.savedBlogs.splice(hasIdx, 1);
    } else {
      user.savedBlogs.push(resourceId);
    }
  } else {
    const hasIdx = user.savedTools.indexOf(resourceId);
    if (hasIdx > -1) {
      user.savedTools.splice(hasIdx, 1);
    } else {
      user.savedTools.push(resourceId);
    }
  }
  res.json(user);
});

// Update profile
app.put("/api/user/profile", authenticateToken, (req: any, res) => {
  const { name, learningProgress } = req.body;
  const user = USERS.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User profile not found" });

  if (name) user.name = name;
  if (typeof learningProgress === "number") user.learningProgress = Math.min(Math.max(learningProgress, 0), 100);

  res.json(user);
});

// --- QUIZZES ---
app.get("/api/quizzes", (req, res) => {
  res.json(QUIZZES);
});

// --- ADMIN ANALYTICS ---
app.get("/api/analytics", authenticateToken, requireAdmin, (req, res) => {
  res.json(analyticsStats);
});


// --- AI TOOLS GENERATIVE APIS (PROXY TO GEMINI OR FALLBACK SECURELY) ---
app.post("/api/gemini/ai-command", async (req, res) => {
  const { toolType, parameters } = req.body; // e.g. toolType: 'resume', parameters: { name, experience... }
  
  // Track tool utilization
  analyticsStats.totalApiRequests += 1;
  analyticsStats.totalToolsUsed += 1;

  // Build targeted system instruction & prompt based on tool requested
  let systemInstruction = "";
  let prompt = "";

  switch (toolType) {
    case "resume":
      systemInstruction = "You are a professional Executive Resume Consultant & Career Coach. Provide highly bulleted resume headlines, professional summaries, and structural improvement suggestions based on the user's role and experiences. Keep it cleanly structured in Markdown.";
      prompt = `Create a resume rewrite and optimization guide for. 
Name: ${parameters.name || "Candidate"}
Target Role: ${parameters.role || "Software Engineer"}
Industry Experience levels: ${parameters.experience || "Entry Level / fresher"}
Selected Skills: ${parameters.skills || "TypeScript, React, Node.js"}
Provide: 
1. Three high impact resume headlines
2. An industry standard professional summary
3. Custom bullets detailing their skills using the Google CAR (Context-Action-Result) layout or STAR methodology
4. Resume suggestions to boost job discovery.`;
      break;

    case "interview":
      systemInstruction = "You are a Chief Recruitment Officer at a major tech company. Generate realistic job interview questions, ideal responses categorized into behavioral, technical, and situational types, and critical prep advice. Structure the response beautifully in Markdown.";
      prompt = `Generate customized interview questions and master answers for a candidate with:
Target Role: ${parameters.role || "Data Scientist"}
Target Company: ${parameters.company || "Google / Stripe"}
Experience Stage: ${parameters.experience || "Entry level"}
Tech/Key Skills: ${parameters.skills || "Python, SQL, Analytics"}
Deliver exactly:
- 3 core Technical Questions with structured answers (formatted inside markdown codeblocks where helpful).
- 2 Behavioral/STAR Questions (Situation, Task, Action, Result) with suggested answer strategy.
- Executive Interview tips to secure this job.`;
      break;

    case "study-planner":
      systemInstruction = "You are an elite Academic Dean & Productivity Planner. Generate a clear daily study layout, topics sequence, break intervals, and confidence building notes. Present the output beautifully in Markdown.";
      prompt = `Generate a dedicated customized study plan for:
Target Goal / Exam: ${parameters.target || "SSC CGL / Amazon Placements"}
Prep Time Remaining: ${parameters.duration || "30 Days"}
Daily Practice Allowance: ${parameters.hours || "4 hours a day"}
Prior Knowledge Level: ${parameters.level || "Intermediate/Started"}
Produce:
1. A weekly/daily block timeline representation.
2. Structured syllabus mapping and prioritizing sections.
3. Suggested active recall questions and spaced-repetition schedules.`;
      break;

    case "roadmap":
      systemInstruction = "You are a Senior Strategic Career Architect. Deliver an interactive, step-by-step career path roadmap with month-by-month objectives, certifications, and recommended learning sites. Keep formatting high-contrast, beautiful, and in Markdown.";
      prompt = `Deliver a complete strategic career progression roadmap to become a:
Desired Role: ${parameters.role || "Full Stack developer"}
Current Level: ${parameters.currentLevel || "Non-technical background"}
Preferred Pace: ${parameters.pace || "Fast-track 6 months"}
Budget limits: ${parameters.budget || "Free certification courses"}
Provide exactly:
- Phase 1, Phase 2, Phase 3 timeline step segments.
- Recommended books, online bootcamps, and certification standards.
- Real-world portfolio projects to display on resumes for maximum visual impact.`;
      break;

    case "coding":
      systemInstruction = "You are an Elite Principal Code Compiler & Educator. Receive code or prompt queries, suggest extreme structure and performance improvements, highlight anti-patterns, and provide visual code comparisons.";
      prompt = `Provide programming optimizations and educational overview for:
Subject Language: ${parameters.language || "TypeScript"}
Topic/Code Issue: ${parameters.problem || "Explaining how async/await works and optimizing database parallel fetching."}
Provide:
1. Clean code snippets using standard syntax highlighting blocks.
2. Step-by-step breakdown of how the logic flows mentally.
3. Performance tips and security considerations.`;
      break;

    default:
      systemInstruction = "You are a career development expert guiding students.";
      prompt = "Provide 3 pieces of quick advice for a fresher entering the global 2026 tech job market.";
  }

  try {
    const aiInstance = getAI();
    const response = await aiInstance.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ success: true, text: response.text });
  } catch (error: any) {
    console.warn("Gemini execution trigger shifted to fallbacks. Reason:", error.message);
    
    // DELIVER HIGHLY CUSTOMIZED, AUTHENTIC, STRUCTURALLY RICH MOCK DATA IN PLACE OF KEY DISCREPANCIES
    let fallbackText = "";
    if (toolType === "resume") {
      fallbackText = `## 📝 AI Resume Assist Report for: **${parameters.name || "Aman Sen"}**
### Target Role: \`${parameters.role || "Software Engineer / Web Developer"}\`
*Note: This is a fully structured AI preview constructed from CareerForge standards.*

---

### Phase 1: High-Impact Resume Headlines
1. **${parameters.role || "Software Engineer"}** | Specializing in ${parameters.skills || "TypeScript, React & Express"} | Accelerating Scalable Web Deliveries
2. **Innovative Frontend Architect** | Devoted to High-Growth SaaS Platforms | Powered by ${parameters.skills || "Modern Web Architecture"}
3. **Problem Solver & Placement Aspirant** | Decisive Code Architect with ${parameters.experience || "Fresher"} Foundation

---

### Phase 2: Professional Profile Core Summary
> \"Highly motivated and structurally sound professional, specializing in developing modern, search-optimized scalable web client systems. Proficient in \`${parameters.skills || "TypeScript, React, CSS, Node.js"}\` with a strong background in programmatic speed and clean algorithm designs. Proven champion of collaborative environments, seeking to drive engineering performance and developer experience as a **${parameters.role || "Software Engineer"}** in high-velocity teams.\"

---

### Phase 3: Star Methodology CAR Resume Bullet Points
- **System Modernization (React & State Integration):**
  - Designed and deployed an interactive career resources platform utilizing **${parameters.skills || "React, Tailwind, and Node"}**, lowering client bundle sizing by **35%** and enhancing page accessibility scores to **98/100**.
- **Data Engineering & Performance Optimization:**
  - Standardized backend pagination pipelines, dropping API transaction latency from **450ms down to 110ms** across intensive resource indices.

---

### Phase 4: Proactive Action Items
- Add high-contrast Git icons to your contact grid.
- Clean up any descriptive bullet points containing generic qualifiers like *\"responsible for making\"*—replace them with strong action verbs like *\"Engineered\"*, *\"Refactored\"*, *\"Pioneered\"*.`;
    } 
    
    else if (toolType === "interview") {
      fallbackText = `## 🤝 Custom Interview prep Board for: \`${parameters.role || "Product Associate"}\`
### Target Company Placement: **${parameters.company || "Top Tier Tech"}**

---

### Part 1: High-Yield Technical Evaluation
#### Q1: Can you describe the difference between Client-Side Rendering (CSR) and Server-Side Rendering (SSR) in modern web development?
- **Ideal Response Formula:** Highlight startup speed vs. search optimization. 
  - *Response:* \"In CSR, the customer loads a minimal HTML template, and JS renders the components dynamically; this allows smooth interactive apps but has slower first-load indicators. In SSR, the server prepares complete markup before delivery, boosting SEO relevance and initial visual speeds.\"

#### Q2: How can you optimize state management in a massive scaling React environment?
- **Ideal Response Formula:** Talk about memoization, avoiding unnecessary prop drilling, and context segmenting.

---

### Part 2: Behavioral / STAR Pattern Questions
#### Q3: Describe a time when you received tough feedback during a project presentation.
- **S (Situation):** During our college major software submission, users reported critical UI stuttering.
- **T (Task):** I was tasked with refactoring performance optimization markers in under 48 hours.
- **A (Action):** I profiled component rendering triggers, refactored raw arrays, and resolved infinite loops.
- **R (Result):** Smooth frame rates restored, grading score aced at 10/10.

---

### Part 3: Executive Interview Strategy advice
1. **Research recent features:** Read the latest press releases of **${parameters.company || "the company"}** regarding open-source tools or AI.
2. **Think out loud:** Recruiters want to witness your decision pathways!`;
    } 
    
    else if (toolType === "study-planner") {
      fallbackText = `# 📅 Personalized syllabus study Planner: **${parameters.target || "SSC CGL Exam / App Placement"}**
### Preparation Strategy: **${parameters.duration || "30-Day Boot Camp"}** | Capacity: **${parameters.hours || "4 Hours Daily"}**

---

## Weekly Block Architecture

\`\`\`
[ Week 1 ]  ====> Core Fundamentals & Theory Alignment (2 Hrs Review, 2 Hrs Practice)
[ Week 2 ]  ====> Deep-Dive Drills & Question Solvers (1 Hr Review, 3 Hrs Practice)
[ Week 3 ]  ====> Segment Testing & Speed Maths Optimization 
[ Week 4 ]  ====> Parallel Full Mocks, Quizzes, and Speed Calibration
\`\`\`

---

## Hour-by-Hour Daily Allocation Plan
- **Hour 1: Core Concepts & Formulas**
  - Study English Grammar rules or DSA theory (Sliding Window, Pointers).
- **Hour 2: Active Problem Solving**
  - Tackle 15 problems. Do not peek at solutions until completion!
- **Hour 3: Aptitude Speed Drills & Quizzes**
  - Dedicate to Vedic Mathematics multiplication and daily mental calculation.
- **Hour 4: Review incorrect items & Log Progress**
  - Document weak areas in a private study log to review later.

---

## 💡 Academic Advice for High Marks
- Use the **Pomodoro technique** (25 minutes focus, 5 minutes decompression) to stay energetic.
- Solve **Daily Quizzes** on CareerForge to calibrate speed constraints!`;
    } 
    
    else if (toolType === "roadmap") {
      fallbackText = `# 🗺️ Strategic career Architect Roadmap: **${parameters.role || "Full Stack Software Engineer"}**
### Level: \`${parameters.currentLevel || "Beginner to Pro"}\` | Pace: \`${parameters.pace || "6-Month Fast Track"}\`

---

## Step 1: The Foundation (Months 1-2)
- **Primary Goal:** Learn high-contrast, clean visual design and logical execution.
- **Skills to Acquire:**
  - Modern HTML5 semantic structures
  - CSS Flexbox, Grid, and Tailwind CSS layouts
  - JavaScript variables, arrays, and standard functions
- **Recommended Free Sites:** freeCodeCamp, MDN Web Docs, CareerForge Blog

---

## Step 2: High Interaction Models (Months 3-4)
- **Primary Goal:** React system models and programmatic integrations.
- **Skills to Acquire:**
  - React syntax, hooks (\`useState\`, \`useEffect\`, \`useMemo\`)
  - Client-side routing layouts and dynamic pages
  - Fetching APIs, parsing JSON datasets, and state tracking
- **Portfolio Project Ideas:**
  - Build a CGPA tracker using local state backups.

---

## Step 3: Backend & Database Foundations (Months 5-6)
- **Primary Goal:** Server operations and system persistence.
- **Skills to Acquire:**
  - Express servers, HTTP endpoints, static page serving
  - Databases (Supabase/PostgreSQL or MongoDB integrations)
  - Deployment basics (Render / Vercel compatibility)
- **Certification Recommendations:**
  - Google IT Automation with Python Certificate
  - AWS Certified Cloud Practitioner

*\"Success is the sum of small, compound efforts compiled daily. Keep coding!\"*`;
    } 
    
    else {
      // coding assistant fallback text
      fallbackText = `# 💻 Coding optimization Hub: \`${parameters.language || "TypeScript / JavaScript"}\`
### Topic: \`${parameters.problem || "Asynchronous Fetching & Speed"}\`

---

### Better Pattern Proposal:
Instead of resolving queries sequentially, wrap asynchronous network queries in \`Promise.all\` to download datasets simultaneously. This drops execution latency by up to **50%**.

#### ❌ Sub-optimal Pattern (Sequential/Blocking):
\`\`\`typescript
const profile = await fetchProfile(); // Wait for completion
const courses = await fetchCourses(); // Then starts and waits
\`\`\`

#### ✅ Elite Optimized Pattern (Concurrent/Non-Blocking):
\`\`\`typescript
const [profile, courses] = await Promise.all([
  fetchProfile(),
  fetchCourses()
]); // Runs parallelly!
\`\`\`

---

### Critical Security Consideration:
Always sanitize input coordinates before running SQL queries. Prevent SQL injection and protect customer records by executing parametrized statements.`;
    }

    // Clear dynamic client instance on error so next call attempts a rebuild with potentially refreshed config
    aiInstance = null;

    let cleanErrorMessage = error.message || String(error);
    try {
      if (cleanErrorMessage.startsWith("{") || cleanErrorMessage.includes('"error"')) {
        const parsed = JSON.parse(cleanErrorMessage);
        if (parsed?.error?.message) {
          cleanErrorMessage = parsed.error.message;
        }
      }
    } catch (_) {
      // Keep original message if parsing fails
    }

    res.json({ 
      success: true, 
      text: fallbackText, 
      isDemoMode: true,
      apiKeyMissing: error.message === "GEMINI_API_KEY_MISSING",
      errorDetails: cleanErrorMessage
    });
  }
});

// --- GOOGLE SITEMAP ENDPOINT ---
app.get("/sitemap.xml", (req, res) => {
  res.header("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://career-forge-ruby.vercel.app/</loc>
    <lastmod>2026-05-21</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://career-forge-ruby.vercel.app/job-alerts-btech-freshers</loc>
    <lastmod>2026-05-21</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://career-forge-ruby.vercel.app/free-sectional-mocks-aptitude</loc>
    <lastmod>2026-05-21</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://career-forge-ruby.vercel.app/mastering-aptitude-vedic-maths</loc>
    <lastmod>2026-05-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://career-forge-ruby.vercel.app/dsa-patterns-tech-placements</loc>
    <lastmod>2026-05-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://career-forge-ruby.vercel.app/ssc-cgl-english-shortcuts</loc>
    <lastmod>2026-05-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://career-forge-ruby.vercel.app/calculators</loc>
    <lastmod>2026-05-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`);
});

// --- ROBOTS.TXT ENDPOINT ---
app.get("/robots.txt", (req, res) => {
  res.header("Content-Type", "text/plain");
  res.send(`User-agent: *
Allow: /

Sitemap: https://career-forge-ruby.vercel.app/sitemap.xml`);
});

// --- VITE MIDDLEWARE CONFIGURATION FOR DEV VS PRODUCTION ---
async function bootCampaignHub() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Start Server
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CareerForge Host] Full-stack Server running at http://0.0.0.0:${PORT}`);
  });
}

bootCampaignHub().catch(err => {
  console.error("Critical: Failed to boot placement campaign hub:", err);
});
