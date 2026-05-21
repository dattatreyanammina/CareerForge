export interface PlacementReview {
  role: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number; // 1-5
  status: "Selected" | "Rejected" | "Offered";
  roundsText: string;
  experienceText: string;
  tipsText: string;
  date: string;
}

export interface CompanyExperience {
  name: string;
  industry: string;
  location: string;
  logoColor: string;
  reviews: PlacementReview[];
}

export const PLACEMENT_EXPERIENCES: CompanyExperience[] = [
  {
    name: "Google",
    industry: "Consumer Tech / Software",
    location: "Bengaluru / Hyderabad, India",
    logoColor: "from-blue-500 to-green-500",
    reviews: [
      {
        role: "Software Engineering Intern (L3)",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Resume Screening, 2 Technical Coding (DSA) Rounds",
        experienceText: "Coding rounds were extremely intensive. First round focused on dynamic programming on trees and greedy algorithms. The interviewer was extremely helpful and pushed me to optimize from O(N^2) to O(N). Second round was about graph traversals (BFS/DFS hybrid) with pathfinding limitations. Very clean code and speaking out loud is paramount.",
        tipsText: "Solve LeetCode Medium/Hard consistently. Understand time and space complexity deeply and practice talking whilst solving problems.",
        date: "2026-02"
      },
      {
        role: "Associate Product Manager (APM)",
        difficulty: "Hard",
        rating: 4,
        status: "Offered",
        roundsText: "1 Product Sense, 1 Estimation, 1 Analytical, 1 Googliness & Leadership",
        experienceText: "Very rigorous product assessment. I was asked to design an inclusive smart-home thermostat for seniors. The estimation round required guessing the total mobile screen repair revenue in Delhi. Focus is on structured frameworks like CIRCLES rather than throwing random feature ideas.",
        tipsText: "Read 'Decode and Conquer' and 'Cracking the PM Interview'. Practice guesstimates with logical structural dividers.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Microsoft",
    industry: "Enterprise / Cloud Tech",
    location: "Hyderabad / Noida, India",
    logoColor: "from-blue-600 to-sky-400",
    reviews: [
      {
        role: "Software Engineer (SDE-1)",
        difficulty: "Medium",
        rating: 5,
        status: "Selected",
        roundsText: "1 Online Assembly Test, 3 Technical Rounds",
        experienceText: "Online test had 3 coding questions on arrays and custom data structure structures. F2F rounds evaluated systems concepts, system thread concurrency, and trie structures. The final round was with the Engineering Manager who focused on system design patterns (Singleton, Factory) and resume review.",
        tipsText: "Core CSE fundamentals like Operating Systems (Semaphores, Paging) and DBMS are tested alongside standard DSA.",
        date: "2026-03"
      },
      {
        role: "Data & AI Consultant",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Aptitude + SQL Screen, 2 Tech Interviews on Azure Concepts",
        experienceText: "First SQL round evaluated complex analytical window queries (PARTITION BY, DENSE_RANK). Second round evaluated distributed computing fundamentals and machine learning regression algorithms. The panel expects high client-facing verbal clarity.",
        tipsText: "Prepare relational database schema designs and basic cloud (SaaS/PaaS) deployment pipelines.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "Amazon",
    industry: "E-commerce & AWS Cloud",
    location: "Bengaluru, India",
    logoColor: "from-orange-500 to-amber-600",
    reviews: [
      {
        role: "Software Development Engineer (SDE-1)",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 Online OA (2 coding + Workstyle Simulation), 3 F2F Tech Rounds",
        experienceText: "The OA is quite standard but strict. F2F rounds focused intensely on the 16 Leadership Principles (LPs). Every technical question had a subsequent system scalability discussion. Questions on LRU Cache, Sliding Window maximum, and Dijkstra algorithm with binary heaps.",
        tipsText: "Do not underestimate Amazon's Leadership Principles. Draft at least 2 stories for each LP using the STAR format (Situation, Task, Action, Result).",
        date: "2026-01"
      },
      {
        role: "Cloud Support Associate (AWS)",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Technical Screening, 2 Virtual Panels",
        experienceText: "Questions centered around Web Networking (DNS resolution, three-way TCP handshake, HTTP status codes) and Linux operating system internals. The interviewers are looking for systematic logic troubleshooting steps when a website is down.",
        tipsText: "Master networking fundamentals (Subnetting, TCP/IP stack) and basic Linux shell commands.",
        date: "2025-10"
      }
    ]
  },
  {
    name: "Goldman Sachs",
    industry: "Investment Banking",
    location: "Bengaluru, India",
    logoColor: "from-yellow-600 to-amber-500",
    reviews: [
      {
        role: "Technology Analyst (Full Time)",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 Online HackerRank, 1 CoderPad Round, 2 Technical + 1 HR",
        experienceText: "Extremely math-heavy and logical. HackerRank questions involved combinatorial math, matrix manipulation, and graph traversal. In CoderPad, I was asked to write a production-ready system tracking stock transaction buy/sell logs using trees and heaps. High standards for OOP coding rules.",
        tipsText: "Strong grasp on discrete mathematics, probability, hashing collisions, and Java collection framework internals is mandatory.",
        date: "2026-04"
      },
      {
        role: "Summer Analyst (Data Analyst)",
        difficulty: "Medium",
        rating: 5,
        status: "Offered",
        roundsText: "1 Aptitude Screen, 2 Technical SQL & Logic Panels",
        experienceText: "Logical reasoning and quantitative math were heavily featured in the first screen. Later rounds tested probability (Bayes' Theorem), puzzle-solving (standard green/red balls, weighing scale exercises), and statistical modeling.",
        tipsText: "Solve the '50 Challenging Problems in Probability' and practice SQL subqueries and index tuning.",
        date: "2025-08"
      }
    ]
  },
  {
    name: "TCS (Tata Consultancy Services)",
    industry: "IT Service Advisory",
    location: "Multiple Locations, India",
    logoColor: "from-blue-700 to-indigo-900",
    reviews: [
      {
        role: "TCS Digital SDE",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 TCS iON Prep Test (Aptitude, Verbal, Coding), 1 Consolidated Interview Round",
        experienceText: "TCS iON online paper is of good standard. Quantitative Aptitude had questions on Time & Work, Profit/Loss, and Geometry. The Interview round asked Python programming, basic REST API integrations, and simple sorting implementations. They evaluate project work extensively.",
        tipsText: "Prepare your final year project inside out. Be comfortable with fundamental coding (Prime numbers, Fibonacci, Palindrome checking) in C++ or Java.",
        date: "2026-03"
      },
      {
        role: "TCS Ninja Systems Engineer",
        difficulty: "Easy",
        rating: 3,
        status: "Selected",
        roundsText: "1 Online Cognitive Screen, 1 Technical Round, 1 MR/HR Round",
        experienceText: "Main focus was on basic programming, database normalization steps (1NF, 2NF, 3NF), and SDLC paradigms. The HR round was friendly and focused on relocating willingness and communication skills.",
        tipsText: "Maintain confident body language and a basic understanding of SDLC (Waterfalls vs Agile) and relational DBMS.",
        date: "2025-09"
      }
    ]
  },
  {
    name: "Adobe",
    industry: "Creative Software Solutions",
    location: "Noida / Bengaluru, India",
    logoColor: "from-red-600 to-rose-500",
    reviews: [
      {
        role: "Member of Technical Staff-1 (MTS)",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Coding Screen, 3 Technical Rounds, 1 Director Round",
        experienceText: "Heavily DSA-oriented. I was asked to implement a custom memory allocator and solve a complex string pattern matching problem (KMP algorithm style). They emphasize low-level memory layout, pointer arithmetic, and cache utilization in C++ systems.",
        tipsText: "Master C++, object-oriented design patterns, memory profiling pointers, and bit manipulation tricks.",
        date: "2026-02"
      },
      {
        role: "QA Automation Engineer",
        difficulty: "Medium",
        rating: 4,
        status: "Offered",
        roundsText: "1 Tech Screening, 2 Automation Framework & Scripting Panels",
        experienceText: "Evaluated Selenium page object design patterns, Core Java OOP concepts, and SQL data queries. The interviewer gave dummy web pages and asked to write XPath selectors for elements containing dynamic IDs.",
        tipsText: "Be thorough with API testing tools (Postman, RestAssured), XPath selectors, and multi-threading execution in TestNG.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "Infosys",
    industry: "IT Systems Advisory",
    location: "Bengaluru / Pune, India",
    logoColor: "from-sky-700 to-blue-500",
    reviews: [
      {
        role: "Specialist Programmer (Power Programmer)",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 HackWithInfy Hackathon, 1 Tech + HR Interview",
        experienceText: "HackWithInfy questions were of extremely dynamic standards, checking DP, Trie, and Segment Tree techniques. The final round asked me to write code on a shared editor for a sliding window problem and queried me on microservices, Docker, and Kubernetes deployment.",
        tipsText: "Take high-difficulty coding contests seriously. Optimize code with respect to strict memory boundaries.",
        date: "2025-10"
      },
      {
        role: "Systems Engineer Specialist (SES)",
        difficulty: "Medium",
        rating: 3,
        status: "Selected",
        roundsText: "1 Online InfyTQ Screen, 1 Technical & HR Mock Panel",
        experienceText: "Evaluated core Java, SQL queries (Joins, aggregations), and standard data structures (LinkedLists, Stack). The interviewers also validated communication skills and confidence levels.",
        tipsText: "Focus heavily on Java OOPs, exception handling, and database transactions.",
        date: "2025-07"
      }
    ]
  },
  {
    name: "Accenture",
    industry: "Strategic Consulting & IT",
    location: "Multiple Locations, India",
    logoColor: "from-purple-600 to-indigo-500",
    reviews: [
      {
        role: "Application Development Associate (ASE)",
        difficulty: "Easy",
        rating: 4,
        status: "Selected",
        roundsText: "1 Cognitive & Technical Test, 1 Coding, 1 Virtual HR Panel",
        experienceText: "Vastly structured. The cognitive test evaluated verbal reasoning, quantitative aptitude, and basic pseudo-codes. The coding round had 2 simple array/string problems. The HR round focused on behavioral traits, learning adaptability, and project coordination.",
        tipsText: "Practice mock pseudo-codes (visual loops, bitwise checks). Excellent communication in the final panel guarantees success.",
        date: "2026-01"
      },
      {
        role: "Advanced ASE (Full Stack Analyst)",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Cognitive/Tech Screen, 1 Coding Round, 2 Technical Interviews",
        experienceText: "F2F technical round focused on React, Node.js, and database hosting. They asked me to write dynamic state hooks, state updates, and explain SQL transactions. High emphasis on full-stack architecture.",
        tipsText: "Brush up on modern front-end concepts (Hooks, state management) and database relationship diagrams.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Goldman Sachs Banking",
    industry: "Strategic Advisory & Wealth",
    location: "Mumbai, India",
    logoColor: "from-yellow-750 to-amber-700",
    reviews: [
      {
        role: "Investment Banking Analyst",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 PPT Resume Shortlisting, 2 Financial Case Study Rounds, 1 MD Panel",
        experienceText: "Rigorous corporate finance testing. Given a case study to value a hypothetical retail company using DCF (Discounted Cash Flow) andComparable Company Analysis (CCA). The MD round probed me on current global macros, central bank rates, and sovereign bond yields.",
        tipsText: "Master basic financial models (DCF, LBO), valuation multiples, and keep track of current financial news.",
        date: "2026-03"
      },
      {
        role: "Risk Management Analyst",
        difficulty: "Medium",
        rating: 4,
        status: "Offered",
        roundsText: "1 Aptitude + Quant Screen, 2 Technical Interviews on Derivatives",
        experienceText: "Tested complex mathematics, Monte Carlo simulations, Option Pricing (Black-Scholes principles conceptually), and risk indicators (Value at Risk - VaR). Clear explanation of mathematical steps was highly valued.",
        tipsText: "Focus on Probability and Statistics, Financial Derivatives, and Python pandas libraries.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "Wipro",
    industry: "IT & Digital Services",
    location: "Bengaluru, India",
    logoColor: "from-blue-500 to-indigo-700",
    reviews: [
      {
        role: "Wipro Turbo SDE",
        difficulty: "Medium",
        rating: 3,
        status: "Selected",
        roundsText: "1 Online Prep Test, 1 Technical Round, 1 HR Round",
        experienceText: "Online test had aptitude questions and 2 basic programming questions (matrix transpose, anagram checking). The technical round focused on computer networks, database constraints, and cloud deployment steps.",
        tipsText: "Revise OOP classes, standard algorithms (Binary Search, Bubble Sort), and database Joins.",
        date: "2026-02"
      },
      {
        role: "Wipro Elite National Talent Hunt SDE",
        difficulty: "Easy",
        rating: 4,
        status: "Selected",
        roundsText: "1 Online Aptitude & Essay Screen, 1 Technical Interview, 1 HR Panel",
        experienceText: "Aptitude questions were fairly simple (Time & Work, logical deductions). The technical round asked basic SQL queries and conceptual questions on inheritance. The HR round was straightforward.",
        tipsText: "Aptitude speed is important. Be confident during communication.",
        date: "2025-09"
      }
    ]
  },
  {
    name: "JPMorgan Chase",
    industry: "Financial & Advisory",
    location: "Mumbai / Bengaluru, India",
    logoColor: "from-amber-800 to-yellow-900",
    reviews: [
      {
        role: "Software Engineering Program (SEP)",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Standard Coding Screen, 1 12-Hour Hackathon (Code for Good)",
        experienceText: "The 'Code for Good' hackathon defines the placement. You work in teams of 8 to build a web/mobile solution for a real NGO within 12 hours. Mentors assess your teamwork, Git collaboration, agile thinking, and code performance.",
        tipsText: "Be proactive, avoid hogging tasks, cooperate cleanly with teammates, and be prepared to explain features to non-tech judges.",
        date: "2025-10"
      },
      {
        role: "Data Scientist (Advisory Risk)",
        difficulty: "Hard",
        rating: 5,
        status: "Offered",
        roundsText: "1 Technical Screening, 2 Quantitative Analytical Panels, 1 HR",
        experienceText: "The quant rounds were highly mathematical. I had to write machine learning model steps on a white board, explain gradient descent optimization, and discuss data skewness and feature engineering strategies.",
        tipsText: "Master statistics (Hypothesis testing, distributions), Pandas, Scikit-learn, and SQL performance indexing.",
        date: "2025-08"
      }
    ]
  },
  {
    name: "Walmart Global Tech",
    industry: "Retail & Supply Tech",
    location: "Bengaluru, India",
    logoColor: "from-blue-600 to-amber-400",
    reviews: [
      {
        role: "SDE-1 (Technology)",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 First OA, 2 Technical F2F, 1 Managerial Round",
        experienceText: "Walmart is highly selective. OA coding questions were LeetCode Hard level (array partitions, trie structures). Technical interviews centered around high-scale system designs, distributed queues (Kafka), and database locks.",
        tipsText: "Practice complex tree/graph algorithms and have a strong understanding of microservices architecture.",
        date: "2026-03"
      },
      {
        role: "Tech Analyst Intern",
        difficulty: "Medium",
        rating: 5,
        status: "Selected",
        roundsText: "1 Coding Screen, 1 Tech Panel, 1 HR",
        experienceText: "The interviewer asked to solve a dynamic programming problem (coin change variant) and explain the system design of a parking lot. Clean code structure is heavily appreciated.",
        tipsText: "Understand structural OOP concepts, abstract classes, encapsulation, and common database relationships.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Cognizant",
    industry: "Consulting & IT Advisory",
    location: "Multiple Locations, India",
    logoColor: "from-blue-900 to-cyan-700",
    reviews: [
      {
        role: "Programmer Analyst Trainee (GenC Next)",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Online Tech assessment, 1 Advanced coding round, 1 SME Interview",
        experienceText: "The GenC Next profile demands high technical capability. Code questions evaluated database APIs, custom JSON responses, and algorithm logic. F2F interview analyzed DBMS schemas, basic OS concepts, and React fundamentals.",
        tipsText: "Review REST APIs, JSON parsing, Web technology basics, and secure database indexing.",
        date: "2026-01"
      },
      {
        role: "Cognizant GenC Developer",
        difficulty: "Easy",
        rating: 3,
        status: "Selected",
        roundsText: "1 Cognitive Test, 1 Technical Round, 1 Behavioral Panel",
        experienceText: "Cognitive assessment covered standard aptitude questions. The technical interview asked simple SQL Joins and concepts on polymorphism and abstract classes. Highly cooperative panel.",
        tipsText: "Ensure good grip on basic database schemas, normalized schemas, and standard algorithm complexities.",
        date: "2025-08"
      }
    ]
  },
  {
    name: "HCLtech",
    industry: "Global Technology Services",
    location: "Noida, India",
    logoColor: "from-blue-800 to-indigo-600",
    reviews: [
      {
        role: "Graduate Engineer Trainee (GET)",
        difficulty: "Easy",
        rating: 4,
        status: "Selected",
        roundsText: "1 Online Entrance Test, 1 Technical Interview, 1 MR/HR Panel",
        experienceText: "Very structured process. Technical review parameters were basic C++/Java coding questions, inheritance classifications, and basic network terminologies (TCP/UDP difference, static routing). MR round verified past college project participations.",
        tipsText: "Revise simple algorithms like prime checking, matrix sums, and primary network layers (OSI model).",
        date: "2026-01"
      },
      {
        role: "Network Engineer Associate",
        difficulty: "Medium",
        rating: 3,
        status: "Offered",
        roundsText: "1 Aptitude Screen, 2 Hard Networking Panels",
        experienceText: "Extensively probed on CCNA concepts, subnets, IP layouts, routing protocols (OSPF, RIP, BGP) and firewall management. Handed IP ranges and asked to divide them among subnets logic-wise.",
        tipsText: "Master CCNA topics, routing equations, sub-net masking, and networking commands.",
        date: "2025-09"
      }
    ]
  },
  {
    name: "Capgemini",
    industry: "Consulting & Technology",
    location: "Pune / Mumbai, India",
    logoColor: "from-blue-600 to-cyan-500",
    reviews: [
      {
        role: "Analyst (A4 Band)",
        difficulty: "Easy",
        rating: 4,
        status: "Selected",
        roundsText: "1 Online Cognitive + Pseudo Code Test, 1 English Assessment, 1 Consolidated Tech/HR Interview",
        experienceText: "The pseudo-code round is the filter. Involves tracing loops and bitwise logical structures. The final interview was a mix of technical basic queries (arrays, loops, database tables) and HR background verification.",
        tipsText: "Solve mock pseudo-codes online. Maintain outstanding grammar on the automated English screen.",
        date: "2026-03"
      },
      {
        role: "Senior Consultant (Full Stack SDE)",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Screening Assessment, 2 Live System Design Panels, 1 HR",
        experienceText: "System design was the principal focus. Had to model a scalable online ticketing system, handling high concurrency, redis caching, and relational database sharding.",
        tipsText: "Prepare solid system microservice modularity, redis structures, and horizontal container scaling.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Deloitte",
    industry: "Consulting & Strategic Advisory",
    location: "Bengaluru / Hyderabad, India",
    logoColor: "from-green-600 to-emerald-500",
    reviews: [
      {
        role: "Consulting Analyst (USI Technology)",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Online Cognitive & Aptitude Test, 1 Group Discussion / Case Study, 1 Tech/HR Panel",
        experienceText: "First screen tests logical thinking. The Group Case Study round requested pitching digital conversion services for an legacy paper retail company. Panelists assess communication structure, logical layout, teamwork and presentation confidence.",
        tipsText: "Do not dominate the group discussion; provide structured logical points (e.g., 'We can split solutions into Phase 1, Phase 2...'). Prep basic cloud migration steps.",
        date: "2026-02"
      },
      {
        role: "Enterprise Tech Consultant (SAP Associate)",
        difficulty: "Medium",
        rating: 4,
        status: "Offered",
        roundsText: "1 Resume Sort, 2 Technical Interviews on ERP, 1 Partner Round",
        experienceText: "Questions focused on database relationships, enterprise resources integration, and business supply chains. Partner round evaluated personal values, presentation style, and client engagement readiness.",
        tipsText: "Understand ERP basics, business workflows, and practice confident English communications.",
        date: "2025-10"
      }
    ]
  },
  {
    name: "PwC (PricewaterhouseCoopers)",
    industry: "Consulting & IT Audit",
    location: "Kolkata / Bengaluru, India",
    logoColor: "from-orange-600 to-red-700",
    reviews: [
      {
        role: "Technology Consultant (Cyber Security)",
        difficulty: "Medium",
        rating: 5,
        status: "Selected",
        roundsText: "1 Quantitative Aptitude Test, 2 Technical Rounds, 1 Director round",
        experienceText: "Technical questions prioritized information safety, JWT validations, CORS, SSL handshake steps, and database encryption. The Director round was behavioral, analyzing professional ethical frameworks and team coordination.",
        tipsText: "Understand cyber security concepts (OWASP top 10, symmetric vs asymmetric encryption, SQL injections) inside-out.",
        date: "2026-02"
      },
      {
        role: "Risk Assurance Analyst",
        difficulty: "Easy",
        rating: 4,
        status: "Selected",
        roundsText: "1 Online Screen, 1 Tech Audit Interview, 1 HR Manager Panel",
        experienceText: "Evaluated conceptual auditing framework parameters, system control processes, database log trackers, and system integrity safeguards. High standards of documentation clarity.",
        tipsText: "Revise general administrative controls, IT security principles, and SQL database transaction locks.",
        date: "2025-08"
      }
    ]
  },
  {
    name: "EY (Ernst & Young)",
    industry: "Advisory & Advisory Digital",
    location: "Noida / Gurugram, India",
    logoColor: "from-yellow-500 to-amber-600",
    reviews: [
      {
        role: "Digital Advisory Consultant (Data Analytics)",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Cognitive Quiz, 2 Tech interviews on PowerBI/SQL, 1 Partner panel",
        experienceText: "Heavy prioritization of business intelligence layout. I was given a dummy spreadsheet of sales and asked to draft a data warehouse structure and write complex SQL Joins. Partner round centered around industry scalability paradigms.",
        tipsText: "Practice SQL aggregate operations (GROUP BY, HAVING), database keys (Primary, Foreign, Composite), and business metrics.",
        date: "2026-04"
      },
      {
        role: "Associate AWS Cloud Engineer",
        difficulty: "Medium",
        rating: 4,
        status: "Offered",
        roundsText: "1 Technical Screening, 2 Cloud Deployment Mock Tasks",
        experienceText: "Testing centered around Cloudformation/Terraform parameters, VPC, IAM policies, and serverless compute frameworks (AWS Lambda). Showcased practical terminal tasks for configuring an S3 bucket.",
        tipsText: "A solid grasp of AWS infrastructure, Linux administration, and network routing tables is crucial.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "KPMG",
    industry: "IT Advisory & Assurance",
    location: "Bengaluru / Gurugram, India",
    logoColor: "from-blue-800 to-sky-700",
    reviews: [
      {
        role: "Digital Consultant (Enterprise SDE)",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Cognitive Assessment, 1 PPT Presentational Round, 1 Interview Panel",
        experienceText: "Highly professional panel. The presentation round required me to pitch a transition roadmap for a banking client migrating away from mainframe servers. Tested microservices and service modularization.",
        tipsText: "Build elegant, scannable slides with high-level conceptual architectures. Focus on modernizing tech stacks safely.",
        date: "2026-02"
      },
      {
        role: "IT Security Auditor Specialist",
        difficulty: "Easy",
        rating: 4,
        status: "Selected",
        roundsText: "1 Cognitive Test, 1 Technical Audit Round, 1 Partner Round",
        experienceText: "Discussed risk identification schemas, SOX compliance controls, enterprise access management protocols, and database history logs tracking. Checked theoretical concepts thoroughly.",
        tipsText: "Strongly verify internal IT audit structures and access management principles.",
        date: "2025-09"
      }
    ]
  },
  {
    name: "Flipkart",
    industry: "E-Commerce",
    location: "Bengaluru, India",
    logoColor: "from-blue-500 to-yellow-400",
    reviews: [
      {
        role: "Software Development Engineer (SDE-1)",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Machine Coding Round, 2 DSA Tech Rounds, 1 Managerial (HM) Round",
        experienceText: "Machine coding standard is the filter. I was given 120 minutes to code a fully working 'Movie Ticket Booking System' on my local machine. High emphasis on clean design patterns, modularity, concurrency handling, and working code. Subsequent rounds asked LeetCode Hard trees and dynamic programming.",
        tipsText: "Practice solid object-oriented design and writing clean, running, modular multi-threaded Java systems in standard IDEs.",
        date: "2026-03"
      },
      {
        role: "Product Operations Analyst",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Data Interpretation Test, 2 Business Analytics Case Interviews",
        experienceText: "Case studies centered around catalog drop diagnostics and cart completion optimizations. Probed heavily on data visualization metrics, active click rates, and SQL aggregations.",
        tipsText: "Brush up on key product metrics (CTR, Conversions, Bounce Rate) and practice SQL analysis queries.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Paytm",
    industry: "Fintech & Payments",
    location: "Noida, India",
    logoColor: "from-blue-600 to-sky-500",
    reviews: [
      {
        role: "Backend Engineer (Java Developer)",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 HackerRank Test, 2 Live System Design rounds, 1 HM Round",
        experienceText: "Deep evaluation of Spring Boot, Redis cache layers, concurrency (Java executors), and message brokers (Kafka). System design focused on building a scalable payment ledger that guarantees ACID transactions even under database partitioning.",
        tipsText: "Master intermediate Java multi-threading, Spring Boot lifecycle hooks, database locking, and basic system scalability.",
        date: "2026-01"
      },
      {
        role: "QA Automation Engineer Specialist",
        difficulty: "Medium",
        rating: 4,
        status: "Offered",
        roundsText: "1 Coding Screening, 2 F2F Automation Case Panels",
        experienceText: "Focus was on building testing suites using Selenium Grid, writing API validation scripts, and diagnosing transient database latency bugs in API responses.",
        tipsText: "Master Java collection APIs, REST API testing libraries, and dynamic XML parsing.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "PhonePe",
    industry: "Fintech & Payments",
    location: "Bengaluru, India",
    logoColor: "from-purple-700 to-indigo-800",
    reviews: [
      {
        role: "Software Engineer (SDE-1)",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Machine Coding Round, 2 DSA Rounds, 1 HR Panel",
        experienceText: "Like Flipkart, PhonePe enforces standard machine coding. Build a 'Leaderboard Management System' with concurrency handling, in-memory indexing, and custom queries. Followed by a deep algorithmic round evaluating Segment Trees and bipartite graph coloring.",
        tipsText: "Excel in object-oriented modularity, decoupling components, and solid tree algorithms.",
        date: "2026-04"
      },
      {
        role: "Risk & Fraud Analyst",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Data Interpret Test, 2 Case Study Analysis Sessions",
        experienceText: "Case studies evaluated pattern spotting in suspicious fraudulent peer-to-peer transfers. Evaluated basic probability models, Bayesian analysis under skew patterns, and SQL querying operations.",
        tipsText: "Master SQL aggregations, descriptive statistic parameters, and risk logic systems.",
        date: "2025-10"
      }
    ]
  },
  {
    name: "Razorpay",
    industry: "Fintech API Platforms",
    location: "Bengaluru, India",
    logoColor: "from-blue-500 to-indigo-600",
    reviews: [
      {
        role: "Associate Frontend SDE",
        difficulty: "Medium",
        rating: 5,
        status: "Selected",
        roundsText: "1 Online coding screen, 2 Frontend Tech Interview rounds, 1 HM",
        experienceText: "Pure web tech evaluation. I had to build a React state-managed application under live observation, handle API debounce inputs, and implement custom layout caching utilities. Highlighted Webpack, bundle optimization and loading latency checks.",
        tipsText: "Understand JavaScript Event Loops, Prototype inheritance, React performance (memo, callbacks), and CORS mechanism in detail.",
        date: "2026-02"
      },
      {
        role: "Merchant Integration Engineer",
        difficulty: "Medium",
        rating: 4,
        status: "Offered",
        roundsText: "1 Resume screen, 2 Integration API Simulation Panels",
        experienceText: "Analyzed API call patterns, security tokens, webhook setups, SSL certificate validations, and dynamic payloads. Challenged me to diagnose failure reasons for an API webhook timeout.",
        tipsText: "Understand HTTP protocols, basic Node.js backend logic, headers, and payload debugging steps.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "CRED",
    industry: "Consumer Credit Fintech",
    location: "Bengaluru, India",
    logoColor: "from-slate-800 to-slate-950",
    reviews: [
      {
        role: "Backend Architect Trainee",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Online OA, 2 Tech architectural rounds, 1 HM cultural match",
        experienceText: "Intense system design focus. I was asked to design credit score update mechanisms for millions of active users. Evaluated horizontal scaling, database shard mappings, and distributed pub-sub locks.",
        tipsText: "Practice explaining trade-offs. (e.g., 'If we choose DynamoDB here, we trade ACID consistency for fast writes, but here's how we reconcile it...').",
        date: "2026-04"
      },
      {
        role: "Product Experience Designer Specialist",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Portfolio showcase, 1 Live UI redesign task page, 1 HR",
        experienceText: "Focused on dark-mode visual principles, micro-animations, component accessibility, and high contrast. Had to redesign a credit-card statements list UI.",
        tipsText: "Master Figma prototyping, typography hierarchies, and dark mode interface rules.",
        date: "2025-10"
      }
    ]
  },
  {
    name: "Uber",
    industry: "Ride Hail & Mobility",
    location: "Bengaluru / Hyderabad, India",
    logoColor: "from-slate-900 to-slate-950",
    reviews: [
      {
        role: "SDE-1 (Mobility Technology)",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Online HackerRank, 3 Tech Panels F2F",
        experienceText: "Algorithmic standard was incredible. One round on advanced graph modeling (Kruskal's MST, spatial grid queries like QuadTree or Geohash concepts). Another round was on concurrent in-memory system design (modeling ride matching logic concurrency).",
        tipsText: "Be comfortable with complex graph pathfinding algorithms and spatial databases conceptually.",
        date: "2026-01"
      },
      {
        role: "Data Scientist (Dispatch Operations)",
        difficulty: "Hard",
        rating: 4,
        status: "Offered",
        roundsText: "1 Quant DSA screen, 2 Machine Learning operations panels, 1 HM",
        experienceText: "Evaluating dispatcher logistics, surge pricing logic simulations, queueing models, and probability matrices. Solved complex calculus equations on a whiteboard.",
        tipsText: "Understand multivariable regressions, statistics distribution shapes, and linear optimization.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Swiggy",
    industry: "Instant Delivery & Commerce",
    location: "Bengaluru, India",
    logoColor: "from-orange-600 to-amber-500",
    reviews: [
      {
        role: "Associate SDE-1",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 OA, 2 Deep SDE Panels, 1 Managerial (Behavioral)",
        experienceText: "The technical panels demanded elegant code structure. First question was on topological sort for package dependency order. Second question was on dynamic programming (a matrix pathfinding traversal with customized energy limitations).",
        tipsText: "Study standard graph representations (adjacency lists, dynamic memory layout) and complex tree recursion patterns.",
        date: "2026-04"
      },
      {
        role: "Business Analyst (Instamart Growth)",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Aptitude Screen, 2 SQL-heavy Case Studies, 1 Operations Manager round",
        experienceText: "Centered on optimization queries for delivery dispatcher assignments. The panel expects high clarity for database querying and visualization metrics implementation.",
        tipsText: "Master window functions, common table expressions (CTEs), and key inventory management equations.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Zomato",
    industry: "Food Delivery & Leisure",
    location: "Gurugram, India",
    logoColor: "from-red-650 to-rose-700",
    reviews: [
      {
        role: "SDE-1 Front-End Developer",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Screen Code, 2 Frontend Architecture Panels, 1 HR",
        experienceText: "Intense testing on DOM manipulations, rendering speeds, lazy loading, and code bundling (Vite, Rollup). I was asked to build a responsive virtual grid scroll system that only renders active window items under live observation.",
        tipsText: "Review performance optimizations, custom rendering hook states, dynamic hydration, and caching mechanics.",
        date: "2026-03"
      },
      {
        role: "Operations Business Analyst",
        difficulty: "Medium",
        rating: 4,
        status: "Offered",
        roundsText: "1 Numerical logic screen, 2 Case interviews on logistics optimization",
        experienceText: "Evaluated logistics modeling, driver wait-time computations, and demand prediction metrics. Clean, structured logic with tabular data steps is critical.",
        tipsText: "Understand Poisson processes, queuing theory, performance parameters, and intermediate SQL aggregations.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "Salesforce",
    industry: "Cloud ERP & CRM Enterprise",
    location: "Bengaluru / Hyderabad, India",
    logoColor: "from-sky-500 to-blue-600",
    reviews: [
      {
        role: "Base Associate SDE",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 OA (3 Questions), 3 Custom SDE Interviews, 1 HR Panel",
        experienceText: " Walmart/Salesforce level SDE standards. OA questions were fairly advanced (Segment Trees + Stack operations). Rounds asked me to explain database transactions, B-Tree indexes, REST frameworks, and low-latency API proxy maps.",
        tipsText: "Excellent command over Java collections, JVM memory models, thread pools, and advanced DSA is highly expected.",
        date: "2026-02"
      },
      {
        role: "Success Engineer Specialist",
        difficulty: "Medium",
        rating: 4,
        status: "Offered",
        roundsText: "1 Technical Assessment, 2 CRM Architecture Mock Discussions",
        experienceText: "Evaluating client-facing technical solutions. I was given complex data schema relationship challenges and asked to normalize structures and draft dynamic integration flows.",
        tipsText: "Prepare relational schema normalization (3NF), CRM concepts, and maintain confident, structured customer management language.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "Ola",
    industry: "Mobility & EV Technology",
    location: "Bengaluru, India",
    logoColor: "from-lime-500 to-emerald-600",
    reviews: [
      {
        role: "GET SDE (Ola Electric)",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Online test, 2 Embedded systems and IoT software panels, 1 HR",
        experienceText: "Questions evaluated low-level programming (C languages), pointer math, processor thread structures, priority scheduling, and embedded systems caching. Solved 1 standard DSA dynamic programming question.",
        tipsText: "Deeply study basic C, operating system concurrency mechanisms, memory mapping buffers, and basic bitwise algorithms.",
        date: "2026-01"
      },
      {
        role: "Ola Fleet Analyst",
        difficulty: "Medium",
        rating: 3,
        status: "Selected",
        roundsText: "1 Data Interpretation round, 1 Fleet Management optimization case, 1 HR",
        experienceText: "The case study analyzed driver churn data, geographical dispatch bottlenecks, and booking cancellations solutions. Structured metrics tracking was extremely parsed.",
        tipsText: "Master SQL tables, Python pandas logic, and visual presentations representing complex supply gaps.",
        date: "2025-10"
      }
    ]
  },
  {
    name: "Zoho",
    industry: "Enterprise SaaS Suite",
    location: "Chennai / Tenkasi, India",
    logoColor: "from-blue-600 to-red-600",
    reviews: [
      {
        role: "Product Developer (Java)",
        difficulty: "Medium",
        rating: 5,
        status: "Selected",
        roundsText: "1 Pen-and-Paper Coding Round, 2 Technical Whiteboard rounds, 1 F2F Code, 1 HR",
        experienceText: "Unique process. They do not allow standard libraries in initial rounds; write everything from scratch (e.g. implementing custom sorting algorithms, custom String splitter without split() helper). Whiteboard round tested core Java multi-threading principles and dynamic scheduling APIs.",
        tipsText: "Avoid reliance on standard utility methods. Master pure logic, pointer structures, custom character arrays, and multi-threading execution details.",
        date: "2026-03"
      },
      {
        role: "Technical Content Developer",
        difficulty: "Easy",
        rating: 4,
        status: "Offered",
        roundsText: "1 Creative and English Test, 2 Writing Portfolio Reviews, 1 HR",
        experienceText: "The test checks copywriting skills, technical documentation precision, and editing capabilities. Later interviews evaluated presentation structure for complicated architectures (like cloud microservices) simply.",
        tipsText: "Submit clear technical writing drafts, explain complex terms simply, and be thorough with punctuation.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Freshworks",
    industry: "Customer Success SaaS",
    location: "Chennai, India",
    logoColor: "from-orange-500 to-rose-600",
    reviews: [
      {
        role: "Associate SDE (Ruby / JS)",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 HackerRank Test, 2 Technical Rounds (Front-End & OOP), 1 HR",
        experienceText: "First interview evaluated Javascript closures, DOM tree manipulations, prototype variables, and OOP patterns (Singleton, Observer). Second round focused on design tasks: modeling a scalable collaborative dashboard.",
        tipsText: "Prepare functional Javascript features, basic system designs, API patterns, and MVC architectures.",
        date: "2026-02"
      },
      {
        role: "Product Support Engineer",
        difficulty: "Easy",
        rating: 4,
        status: "Selected",
        roundsText: "1 Written Aptitude, 1 Scenario Simulation Call, 1 Technical HR Manager Round",
        experienceText: "Highly interactive simulation round. I had to respond to an angry mock customer complaining about API latency, diagnose raw server response logs, and outline direct corrective measures.",
        tipsText: "Strong customer orientation, troubleshooting, communication, and REST API basics.",
        date: "2025-10"
      }
    ]
  },
  {
    name: "Cisco",
    industry: "Enterprise Networking",
    location: "Bengaluru, India",
    logoColor: "from-sky-500 to-blue-800",
    reviews: [
      {
        role: "Software Engineer Specialist",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 OA, 2 Technical (DSA + Networking) Panels, 1 HM Panel",
        experienceText: "Cisco panels ask both algorithms and hardware. Algorithmic questions covered circular queues, doubly linked list operations, and memory footprint bounds. Networking questions probed TCP Congestion algorithms, sliding window concepts, routing layouts, and UDP protocols.",
        tipsText: "Revise computer architecture, assembly operations, network stack models, and systems algorithms thoroughly.",
        date: "2026-02"
      },
      {
        role: "Technical Consulting Engineer",
        difficulty: "Medium",
        rating: 4,
        status: "Offered",
        roundsText: "1 Network diagnostic OA, 2 Tech troubleshooting rounds, 1 HR",
        experienceText: "Heavily focused on IP troubleshooting. Handed router terminal logs and routing maps and asked to identify loop nodes, misconfigured network subnet masks, and fix BGP routing issues.",
        tipsText: "Master CCNA topics, router topologies, routing equations, and packet analyzers (Wireshark concepts).",
        date: "2025-12"
      }
    ]
  },
  {
    name: "Oracle",
    industry: "Database & Cloud SaaS",
    location: "Bengaluru / Hyderabad, India",
    logoColor: "from-red-650 to-orange-700",
    reviews: [
      {
        role: "Associate SDE (Oracle Database Technology)",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 Standard Aptitude + Tech Entrance, 3 Rounds F2F",
        experienceText: "They probe into database core mechanisms. Explain indexing formats (B-Trees vs B+ Trees database differences), write complicated recursive SQL operations, and explain compiler parser architectures. Evaluated trees algorithms and binary search heuristics.",
        tipsText: "Complete knowledge of database storage mechanics, buffer managers, indexing, concurrency controls, and Java database drivers.",
        date: "2026-01"
      },
      {
        role: "Cloud Infrastructure Engineer SDE",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 Entrance Test, 2 Scalability System Design sessions, 1 HM",
        experienceText: "Evaluating distributed key-val data storage architecture, multi-node replication rules, distributed consensus databases (Paxos / Raft concepts), and container load balancing patterns.",
        tipsText: "Prepare solid distributed system logic, container virtualization rules, and cloud database indexing.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "NVIDIA",
    industry: "Semiconductors & AI Tech",
    location: "Bengaluru / Pune, India",
    logoColor: "from-green-600 to-emerald-700",
    reviews: [
      {
        role: "Embedded Software Engineer SDE",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Hard OA, 3 Technical hardware-heavy rounds, 1 Director round",
        experienceText: "Extremely selective hardware engineering questions. Probed on CUDA memory constructs, GPU core memory thread execution modeling, hardware latency variables, cache coherence protocols, and C dynamic registers allocation variables.",
        tipsText: "Master CUDA programming rules, low-level architecture, thread safety structures, locks execution, and bitwise manipulation protocols.",
        date: "2026-03"
      },
      {
        role: "AI Developer Associate",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 AI Math Concept Screen, 2 Deep Learning Architecture Panels, 1 HR",
        experienceText: "Evaluating deep mathematical neural network concepts, backpropagation gradient calculations, spatial convolutions metrics, tensor operations optimizations, and PyTorch model setups.",
        tipsText: "Master Linear Algebra, Vector calculus, PyTorch, GPU architecture mapping, and deep learning neural algorithms.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "Qualcomm",
    industry: "Microchips & Cellular Tech",
    location: "Hyderabad / Bengaluru, India",
    logoColor: "from-blue-700 to-indigo-800",
    reviews: [
      {
        role: "Hardware SDE (LTE / 5G modem)",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 Entrance Test (Very tough), 3 Tech interviews, 1 Managerial Round",
        experienceText: "Evaluated DSP algorithms, Fourier transform equations, microchip cache design schemas, register allocations, logic circuits, and low-level cellular OSI stack layer modifications.",
        tipsText: "Strong grasp on embedded C programming, digital logic design, processing pipelines, and signal analysis.",
        date: "2026-02"
      },
      {
        role: "Embedded Systems SDE Assistant",
        difficulty: "Medium",
        rating: 5,
        status: "Offered",
        roundsText: "1 Technical Screening, 2 Embedded Logic Whiteboard rounds",
        experienceText: "Whiteboard interviews focused on custom memory stack tracking, register optimizations, context switching, and RTOS process micro-schedulers design.",
        tipsText: "Prepare RTOS concepts, task prioritization, mutex vs semaphore, and interrupt handlers.",
        date: "2025-10"
      }
    ]
  },
  {
    name: "Applied Materials",
    industry: "Semiconductor Production Tech",
    location: "Bengaluru, India",
    logoColor: "from-blue-500 to-teal-600",
    reviews: [
      {
        role: "Automation SDE - GET",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Online cognitive test, 2 F2F tech interviews on automation loops, 1 HR",
        experienceText: "Evaluating sensor loops coding controls, hardware simulation packages, multi-threaded task engines, concurrent signal captures, and basic Java OOP designs.",
        tipsText: "Focus on control systems logic, threads execution, C++ standard templates, and industrial automation basics.",
        date: "2026-01"
      },
      {
        role: "Mechanical Design Graduate",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Written Engineering aptitude, 1 CAD Case demonstration, 1 VP panel",
        experienceText: "Focused on CAD modelling guidelines (Solidworks), material thermal stress computations, and structural design factors of safety under high automation conditions.",
        tipsText: "Master SOLIDWORKS tools, stress-strain curves, structural optimization parameters, and thermodynamic properties.",
        date: "2025-08"
      }
    ]
  },
  {
    name: "Atlassian",
    industry: "Enterprise Product SaaS",
    location: "Bengaluru, India",
    logoColor: "from-sky-700 to-blue-600",
    reviews: [
      {
        role: "SDE-1 (Technology Systems)",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 First OA, 3 Rounds F2F (System Design, Coding, Cultural)",
        experienceText: "Very rigorous process. The coding round requested writing highly optimize custom heap classes. The system design round focused on scale architecture parameters of collaborative documents (like Confluence page locks). The 'Values' round is heavily filtered.",
        tipsText: "Ensure outstanding clarity in explanation. Prepare stories aligning with Atlassian's core open values and team playbooks.",
        date: "2026-03"
      },
      {
        role: "Product Success Analyst Specialist",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Logical data test, 2 Scenario solution presentation rounds, 1 Values Match",
        experienceText: "Analyzed API integrations, workflow errors, single sign-on security failures, and customer service metrics.",
        tipsText: "Practice technical debugging, communication patterns, and SaaS client management concepts.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Sprinklr",
    industry: "Customer CX SaaS",
    location: "Bengaluru / Gurugram, India",
    logoColor: "from-orange-500 to-red-600",
    reviews: [
      {
        role: "Product Developer (Full Stack SDE)",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 Entrance Code OA, 3 F2F Tech panels, 1 HR Director",
        experienceText: "The initial OA is exceptionally hard. F2F rounds evaluated live dynamic programming, graph cycle detections, database indexing algorithms, horizontal storage sharding, and real-time thread pool monitors.",
        tipsText: "Solving LeetCode Hard DSA and thoroughly studying production scale backend pipelines is crucial.",
        date: "2026-04"
      },
      {
        role: "Data Science Analyst Specialist",
        difficulty: "Hard",
        rating: 5,
        status: "Offered",
        roundsText: "1 Cognitive Quant Screen, 2 Statistical NLP modeling rounds",
        experienceText: "Focused on semantic text classification, transformer blocks, regex scripts, tokenizers, SQL database aggregation, and statistical regressions modeling.",
        tipsText: "Understand NLP NLP mechanics, transformer blocks, text vectorizers, and statistical regression.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "Zscaler",
    industry: "Cloud Cyber Security",
    location: "Bengaluru / Pune, India",
    logoColor: "from-sky-650 to-blue-800",
    reviews: [
      {
        role: "Associate SDE (Security Proxy Platform)",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Entrance Test, 3 Technical networking + code whiteboards, 1 HR",
        experienceText: "Highly specialized. Write custom memory caches and optimize system proxy throughput. Extensive testing on TCP flow control, socket programming in Go, system concurrency, and mutex locking pipelines.",
        tipsText: "Review Linux memory spaces, proxy proxies, SSL validations, IP subnetting, socket programming, and concurrent threads compilation.",
        date: "2026-03"
      },
      {
        role: "Cloud Security Specialist Advisor",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Security Assessment, 2 Cloud Infrastructure auditing simulations",
        experienceText: "Focus was on analyzing network routing configs, VPC configurations, SSL intercept parameters, and firewall rulesets. Diagnosed loop vulnerabilities inside cloud networks.",
        tipsText: "Master firewalls, VPC peering policies, IP subnets planning, routing tables, and SSL/TLS validation keys.",
        date: "2025-10"
      }
    ]
  },
  {
    name: "Stripe",
    industry: "Fintech & Payments SDE",
    location: "Remote / Bengaluru, India",
    logoColor: "from-indigo-600 to-purple-650",
    reviews: [
      {
        role: "Software Engineer SDE-1",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 OA, 3 Technical Rounds (Integration, Debugging, Architecture), 1 HR",
        experienceText: "Very clean coding standards. Stripe's debugging round requires you to take a large open-source project, write tests, locate a deeply hidden concurrency logic bug, and fix it under live peer monitoring. Integration round tested coding with high HTTP API schemas.",
        tipsText: "Prepare code debugging skills, and learn to write robust assertions and unit tests. Excel in building scalable Webhooks.",
        date: "2026-04"
      },
      {
        role: "Integration Engineer SDE Partner",
        difficulty: "Medium",
        rating: 5,
        status: "Offered",
        roundsText: "1 API parsing OA, 2 Integration simulated panels, 1 HR",
        experienceText: "Simulated client integration issues: SSL failures, transaction validation timeout, payload mismatches. Expectations were clear on writing clean API integration steps.",
        tipsText: "Master HTTP error handling, REST conventions, SSL validations, JSON validation, and debugging command consoles.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "Uber India Technology",
    industry: "Mobility Logistics Tech",
    location: "Bengaluru, India",
    logoColor: "from-slate-800 to-zinc-950",
    reviews: [
      {
        role: "SDE-1 Driver Growth Platform",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Hard OA, 3 Technical DSA + Scale F2F rounds",
        experienceText: "Extremely algorithmic questions on heaps, path traversals, priority queues, and concurrent databases thread states. Had to design database transactions that update dispatcher balances securely.",
        tipsText: "Solve graph networks, shortest-paths (Dijkstra, A*), and understand relational transaction locks.",
        date: "2026-02"
      },
      {
        role: "Full Stack SDE Associate",
        difficulty: "Hard",
        rating: 4,
        status: "Offered",
        roundsText: "1 Front Screen, 2 Full stack engineering whiteboard sessions",
        experienceText: "Evaluated high-performance React states, state hook caching, node.js middleware optimizations, horizontal scaling, database shard index maps, and REST proxy pipelines.",
        tipsText: "Excellent knowledge of JavaScript Event Loop, asynchronous states, horizontal database index mapping, and REST scaling tools.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Reliance Jio Infocomm",
    industry: "Telecom & Cloud SDE",
    location: "Navi Mumbai, India",
    logoColor: "from-blue-700 to-indigo-800",
    reviews: [
      {
        role: "Graduate Engineer Trainee (GET SDE)",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Online cognitive test, 2 Tech panels (Java/Python), 1 Managerial MR",
        experienceText: "Evaluating database transaction rules, REST endpoints configuration, exceptions handling filters, basic socket streams, and basic lists sorting custom logic.",
        tipsText: "Prepare java collections core concepts, database schema, normalization steps, and simple sorting complexity parameters.",
        date: "2026-02"
      },
      {
        role: "Associate Network Specialist",
        difficulty: "Easy",
        rating: 4,
        status: "Selected",
        roundsText: "1 Entrance test, 1 Telecom routing tech round, 1 HR panel",
        experienceText: "F2F round centered around LTE/5G networking layouts, router setups, CCNA basics, fiber optic routing layers, and signal spectrum division logic.",
        tipsText: "Revise telecom networking, basic OSI model, TCP protocols, and cellular channel frequencies.",
        date: "2025-08"
      }
    ]
  },
  {
    name: "Bharti Airtel",
    industry: "Telecom Digital Digital",
    location: "Gurugram, India",
    logoColor: "from-red-650 to-orange-600",
    reviews: [
      {
        role: "Software Graduate Engineer Trainee",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Entrance Test, 2 Technical Rounds, 1 Consolidated HR",
        experienceText: "Tested software programming (Java/C++), SQL queries, data serialization schemas, API design patterns, and routing topologies. Solved 1 standard coding question in trees.",
        tipsText: "Learn Java exceptions, database Joins, and OSI network layers. Practice explaining project architectures.",
        date: "2026-01"
      },
      {
        role: "Digital Products BA",
        difficulty: "Medium",
        rating: 3,
        status: "Offered",
        roundsText: "1 Analytical logic screen, 2 Analytics case panels, 1 Partner panel",
        experienceText: "Analyzing subscriber statistics, churn matrices, payment options drop calculations, and advertising CTR performance metrics. Expect SQL query writing.",
        tipsText: "Solve customer analytics casing, database transaction queries, and Excel modeling hacks.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Samsung Research India",
    industry: "Mobile Hardware & IoT",
    location: "Noida / Bengaluru, India",
    logoColor: "from-blue-600 to-indigo-800",
    reviews: [
      {
        role: "Research Engineer Trainee (SDE)",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 Standard Coding Assessment (3 questions), 2 Technical F2F, 1 HR Panel",
        experienceText: "Samsung's coding test is highly standardized. Questions checked DP, DFS, and path traversal with multi-variable constraints. Technical rounds probed OS memory spaces (virtual memory, page tables), IPC loops, socket streams, and multi-thread pools.",
        tipsText: "Master embedded C++, standard Operating Systems concepts, memory mapping, locks, and practice DFS/BFS exhaustively.",
        date: "2026-03"
      },
      {
        role: "Android Framework SDE Specialist",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Android conceptual test, 2 OS architecture panels, 1 Managerial",
        experienceText: "Focus on Android binder mechanisms, process lifecycles, JVM garbage collection, garbage configurations, layout rendering speeds, and local database synchronizations.",
        tipsText: "Excellent command over Android memory management, multi-thread handlers, loops, and SQL database transactions.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "Qualcomm Snapdragon SDE",
    industry: "Microelectronics & Chips",
    location: "Bengaluru, India",
    logoColor: "from-blue-800 to-sky-700",
    reviews: [
      {
        role: "Technology SDE-1 Modem Software",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Hardware OA, 3 Technical Embedded sessions, 1 HM",
        experienceText: "Rigorous testing on CPU registries, stack architectures, compile buffers, pointer logic (C), priority scheduling, and RTOS threads. Analyzed data packet serialization models.",
        tipsText: "Master C compilation, OS scheduler optimizations, system locks, bit manipulations, and RTOS processes.",
        date: "2026-02"
      },
      {
        role: "FPGA Design Engineer Specialist",
        difficulty: "Hard",
        rating: 4,
        status: "Offered",
        roundsText: "1 Digital assessment, 2 FPGA compilation whiteboard rounds",
        experienceText: "Probed on Verilog/VHDL code compilations, structural clocks setup, logic circuits optimizations, and timing synthesis checks. Proved digital logic structures systematically.",
        tipsText: "Excellent understanding of Verilog/VHDL, digital timing constraints, logic gates, and microchip pipelines.",
        date: "2025-10"
      }
    ]
  },
  {
    name: "AMD (Advanced Micro Devices)",
    industry: "Semiconductors & Processor SDE",
    location: "Bengaluru / Hyderabad, India",
    logoColor: "from-slate-800 to-slate-900",
    reviews: [
      {
        role: "Firmware Developer Graduate (GET)",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 Embedded OA, 3 Technical hardware-heavy whiteboard sessions, 1 HR",
        experienceText: "Evaluated low-level processor interactions, custom instruction sets, virtual memory cache rules, hardware registers, and bit manipulation tricks in C++ systems.",
        tipsText: "Prepare microchip designs, assembly instructions, bit operations, OS page tables, and cache lines mapping.",
        date: "2026-01"
      },
      {
        role: "Silicon Verification Engineer Specialist",
        difficulty: "Medium",
        rating: 5,
        status: "Selected",
        roundsText: "1 Hardware test, 2 Verification simulated panels, 1 Director",
        experienceText: "Evaluating digital logic circuits, timing parameters checks, boundary diagnostic protocols, and memory storage logic validations.",
        tipsText: "Deeply study SystemVerilog, UVM constructs, logic circuits, and micro-schemes verification logic.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Swiggy Delivery Commerce",
    industry: "Logistics Delivery Platforms",
    location: "Bengaluru, India",
    logoColor: "from-orange-550 to-amber-650",
    reviews: [
      {
        role: "SDE-1 Spatial Logistics Engines",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Hard OA, 2 Technical graph panels, 1 MR Panel",
        experienceText: "Rigorous spatial mapping algorithms. Solved optimization algorithms for mapping delivery executives to multi-delivery orders under time limits. Evaluated path cycles and heap sorting.",
        tipsText: "Master shortest-path graphs, spatial trees (KD-Trees, QuadTree conceptually), sorting indexes, and thread coordination.",
        date: "2026-03"
      },
      {
        role: "Product Analytics Graduate",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Analytical test, 2 SQL-heavy metric casing sessions, 1 HR",
        experienceText: "Diagnostics of order drops under bad weather periods, customer transaction flows, and delivery executive payout formulas. SQL windowing commands featured heavily.",
        tipsText: "Solve customer journey analytics casing, database transaction queries, and Excel data matrices.",
        date: "2025-10"
      }
    ]
  },
  {
    name: "Zomato Blinkit Logistics",
    industry: "Quick Commerce SDE",
    location: "Gurugram, India",
    logoColor: "from-yellow-450 to-emerald-600",
    reviews: [
      {
        role: "SDE-1 Dark Store Inventory Core",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 Entrance Code, 2 Machine coding inventory platforms, 1 Panel",
        experienceText: "Build a modular dark-store fast inventory updater, supporting multi-thread inputs, in-memory updates, and latency limits. Subsequent rounds asked LeetCode trees.",
        tipsText: "Practice clean object-oriented decoupling, concurrent locking collections, and memory data caching.",
        date: "2026-03"
      },
      {
        role: "Operations Strategy Associate",
        difficulty: "Medium",
        rating: 4,
        status: "Offered",
        roundsText: "1 Logic assessment, 2 Supply chain case study panels, 1 Partner panel",
        experienceText: "Fleshed out expansion maps for quick-commerce dark stores. Evaluated spatial delivery times, inventory storage layouts under limits, and driver dispatch loops.",
        tipsText: "Master inventory formulas, forecasting statistics, horizontal scaling parameters, and SQL data queries.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "Nykaa Tech Digital",
    industry: "E-Commerce Luxury Tech",
    location: "Mumbai, India",
    logoColor: "from-pink-600 to-rose-500",
    reviews: [
      {
        role: "SDE-1 Associate Frontend",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Entrance Code, 2 Technical JS/React F2F rounds, 1 HR",
        experienceText: "Evaluating frontend state validations, dynamic listing search debouncing, image loading filters, Webpack optimization tools, and local storage state persistence.",
        tipsText: "Master Javascript array functions, React state hooks caching, and CSS/Tailwind layouts controls under sizing limits.",
        date: "2026-02"
      },
      {
        role: "Nykaa Digital Campaign Analyst",
        difficulty: "Easy",
        rating: 4,
        status: "Selected",
        roundsText: "1 Cognitive test, 1 Ad Performance case simulation, 1 MR",
        experienceText: "Analyzed advertising metrics, campaign CTR drops, transaction funnels, social media user targets data, and database SQL aggregations.",
        tipsText: "Understand search optimizations, campaign metrics, customer acquisition cost logic, and simple SQL filters.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Myntra Tech Logistics",
    industry: "E-Commerce Fashion",
    location: "Bengaluru, India",
    logoColor: "from-rose-500 to-orange-500",
    reviews: [
      {
        role: "SDE-1 Catalog Recommendation Engine",
        difficulty: "Hard",
        rating: 4,
        status: "Selected",
        roundsText: "1 Hard OA, 2 Tech recommendations system designs, 1 HM",
        experienceText: "Evaluating recommendation database schemas, multi-layer classifications, matrix transformations, heap sorting, string matches, and distributed key-val caching.",
        tipsText: "Master priority heaps, graph maps, tree dynamic layouts, local data caches, and database transactional hooks.",
        date: "2026-03"
      },
      {
        role: "Associate SDE Quality Assurance",
        difficulty: "Medium",
        rating: 4,
        status: "Offered",
        roundsText: "1 Written code, 2 Automation testing scripts simulators",
        experienceText: "Evaluated testing suites configurations, writing REST API check cases, diagnosing response timeout variables, and database index performance checks.",
        tipsText: "Revise OOP classes programming, REST API methods definitions, testing frameworks triggers, and XML parameters.",
        date: "2025-10"
      }
    ]
  },
  {
    name: "PhonePe PG Platforms",
    industry: "Fintech Gateway Systems",
    location: "Bengaluru, India",
    logoColor: "from-purple-650 to-indigo-805",
    reviews: [
      {
        role: "SDE-1 High-Performance Ledger Core",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Machine code ledger, 2 Tech transaction locks whiteboards, 1 Panel",
        experienceText: "Build a highly scalable in-memory transactional ledger with rollback options and concurrency thread safeguards. F2F rounds evaluated b-trees and dynamic partitions.",
        tipsText: "Excellent command over Java multithreading, system design decouplings, thread safety structures, and binary heap sorting.",
        date: "2026-04"
      },
      {
        role: "Tech Support Engineer Specialist",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Custom troubleshooting test, 2 PG latency case mock discussions",
        experienceText: "Diagnosed gateway timeout issues, bank transaction status discrepancies, API payload structures, encryption keys validations, and database locks.",
        tipsText: "Focus on network routing CCNA topics, SSL encryption keys basics, PG response codes, and database SQL query tools.",
        date: "2025-12"
      }
    ]
  },
  {
    name: "CRED Premium Club Core",
    industry: "Premium Club Fintech",
    location: "Bengaluru, India",
    logoColor: "from-neutral-800 to-neutral-950",
    reviews: [
      {
        role: "Frontend Developer Assistant (SDE-1)",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Custom UI OA, 2 Frontend core whiteboard simulations, 1 VP values",
        experienceText: "Tested complex React states optimizations, bundle file size compressions, custom scroll effects, dynamic web socket streams, and CSS/Tailwind layout grids under heavy animations.",
        tipsText: "Understand DOM tree adjustments, web bundle sizes optimizations, asynchronous stream managers, and typography controls.",
        date: "2026-03"
      },
      {
        role: "Digital Marketing Analyst",
        difficulty: "Easy",
        rating: 4,
        status: "Selected",
        roundsText: "1 Cognitive test, 1 Premium user outreach casing, 1 HR Panel",
        experienceText: "Evaluated customer click conversion metrics, premium user segmentation data, digital campaigns outreach ratios, and SQL aggregate statements.",
        tipsText: "Prepare corporate client management basics, data presentation styles, and SQL data queries.",
        date: "2025-09"
      }
    ]
  },
  {
    name: "Flipkart Supply Chain Digital",
    industry: "Warehouse Logistics Tech",
    location: "Bengaluru, India",
    logoColor: "from-blue-600 to-sky-400",
    reviews: [
      {
        role: "SDE-1 Package Dispatch Router",
        difficulty: "Hard",
        rating: 5,
        status: "Selected",
        roundsText: "1 Entrance OA, 2 Technical graphs path optimization sessions, 1 HM",
        experienceText: "Solve high-performance grid node traversal tasks matching hundreds of delivery executives to shipments route-wise. Tested standard graphs pathfinders and heaps sorting.",
        tipsText: "Master Dijkstra shortest paths, heaps prioritization, circular graph checks, and dynamic programming.",
        date: "2026-02"
      },
      {
        role: "Flipkart Systems Operations BA",
        difficulty: "Medium",
        rating: 4,
        status: "Offered",
        roundsText: "1 Operations numerical test, 2 Data metrics analysis cases, 1 MR Panel",
        experienceText: "Analyzing dispatch turnaround latencies, warehouse storage volumes, shipping delays, carrier performance matrices, and SQL table queries.",
        tipsText: "Master inventory management calculations, database windowing queries, and Excel analytical models.",
        date: "2025-11"
      }
    ]
  },
  {
    name: "Cognizant GenC Elevate SDE",
    industry: "Advisory Enterprise Software",
    location: "Chennai, India",
    logoColor: "from-blue-950 to-indigo-900",
    reviews: [
      {
        role: "GenC Elevate Cloud SDE",
        difficulty: "Medium",
        rating: 4,
        status: "Selected",
        roundsText: "1 Entrance tech test, 1 Advanced coding round, 1 Consolidated SME panel",
        experienceText: "Evaluating java exceptions handling, serverless controllers deployment, SQL database normalization rules, and standard array/list manipulation algorithms.",
        tipsText: "Revise basic java programming, database normalizations, SQL Joins, and cloud microservice deployment structures.",
        date: "2026-03"
      },
      {
        role: "Business Systems Analyst Associate",
        difficulty: "Easy",
        rating: 4,
        status: "Selected",
        roundsText: "1 Cognitive test, 1 Case requirement gathering mock, 1 HR panel",
        experienceText: "Simulating corporate requirements documentation. Had to fetch enterprise client parameters, draft clean feature roadmaps, and model simple database tables relationships.",
        tipsText: "Strong communication, presentation structures, requirement sheets drafting, and database schemas basics.",
        date: "2025-10"
      }
    ]
  },
  {
    name: "Tech Mahindra",
    industry: "Telecom IT & Systems SDE",
    location: "Pune, India",
    logoColor: "from-red-600 to-indigo-900",
    reviews: [
      {
        role: "Associate Software Engineer SDE",
        difficulty: "Easy",
        rating: 3,
        status: "Selected",
        roundsText: "1 Online cognitive test, 1 Tech interview round, 1 HR",
        experienceText: "Standard campus recruitment. Technical panel focused on basic oops features (encapsulation vs inheritance), prime number checks, database key types, and standard network layers.",
        tipsText: "Focus on confident communication, standard C++/Java exceptions, database keys, and list sorting basics.",
        date: "2026-02"
      },
      {
        role: "Telecom Systems Support GET",
        difficulty: "Medium",
        rating: 3,
        status: "Offered",
        roundsText: "1 Entrance test, 2 Telecom diagnostics panels, 1 HR panel",
        experienceText: "Evaluated cellular routing layers conceptually, network configurations, fiber router diagnostics, CCNA basic subnets, and signal processing protocols.",
        tipsText: "Revise telecommunication concepts, CCNA basic router configurations, subnets masking, and network diagnostic commands.",
        date: "2025-08"
      }
    ]
  }
];
