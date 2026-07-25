/* ============================================================
   Interview Prep Hub — Data
   All static content: coding problems, aptitude questions,
   HR questions, technical questions, resume checklist items.
   ============================================================ */

const CODING_PROBLEMS = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Map"],
    prompt: "Given an array of integers and a target, return the indices of the two numbers that add up to the target.",
    hint: "A hash map lets you check for the complement of each number in O(1) as you scan once.",
  },
  {
    title: "Reverse a Linked List",
    difficulty: "Easy",
    tags: ["Linked List"],
    prompt: "Reverse a singly linked list in place and return the new head.",
    hint: "Keep three pointers: previous, current, next — rewire one link per step.",
  },
  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    prompt: "Given a string of brackets, determine if every opening bracket has a matching, correctly nested closing bracket.",
    hint: "Push openers onto a stack; on a closer, pop and check it matches.",
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["String", "Sliding Window"],
    prompt: "Find the length of the longest substring without repeating characters.",
    hint: "Slide a window with two pointers, shrinking from the left when a duplicate appears.",
  },
  {
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    tags: ["Tree", "BFS"],
    prompt: "Return the level-order traversal of a binary tree's node values (level by level).",
    hint: "A queue-based BFS naturally groups nodes by depth if you track level size.",
  },
  {
    title: "Merge Intervals",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    prompt: "Given a collection of intervals, merge all overlapping intervals.",
    hint: "Sort by start time first — then a single pass can merge any interval that overlaps the last one kept.",
  },
  {
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    tags: ["Heap", "Sorting"],
    prompt: "Find the kth largest element in an unsorted array.",
    hint: "A min-heap of size k avoids sorting the whole array.",
  },
  {
    title: "Course Schedule (Cycle Detection)",
    difficulty: "Hard",
    tags: ["Graph", "Topological Sort"],
    prompt: "Given prerequisites as directed edges, determine if it's possible to finish all courses (i.e. the graph is a DAG).",
    hint: "Run a topological sort (Kahn's algorithm or DFS with a recursion-stack check) and look for leftover unvisited nodes.",
  },
  {
    title: "Word Break",
    difficulty: "Hard",
    tags: ["DP", "String"],
    prompt: "Given a string and a dictionary of words, determine if the string can be segmented into a space-separated sequence of dictionary words.",
    hint: "dp[i] = true if some dp[j] is true and s[j:i] is in the dictionary.",
  },
  {
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tags: ["Binary Search", "Array"],
    prompt: "Find the median of two sorted arrays in O(log(min(m,n))) time.",
    hint: "Binary search on the partition point of the smaller array so both halves stay balanced.",
  },
];

const APTITUDE_QUESTIONS = [
  {
    q: "A train 120 m long is running at 60 km/h. How long does it take to pass a platform 180 m long?",
    options: ["12 s", "18 s", "20 s", "24 s"],
    answer: 2,
    explain: "Total distance = 300 m, speed = 60 km/h ≈ 16.67 m/s, time = 300 / 16.67 ≈ 18 s. (Closest option: 18 s)",
  },
  {
    q: "If the ratio of two numbers is 3:4 and their LCM is 84, what is their sum?",
    options: ["45", "49", "56", "63"],
    answer: 1,
    explain: "Numbers are 3x and 4x, LCM = 12x = 84 → x = 7. Numbers are 21 and 28, sum = 49.",
  },
  {
    q: "A shopkeeper marks an item 40% above cost price and gives a 25% discount. What is his profit percentage?",
    options: ["5%", "10%", "15%", "20%"],
    answer: 1,
    explain: "Marked price = 1.4 × CP. Selling price = 0.75 × 1.4 × CP = 1.05 × CP → 5% profit.",
  },
  {
    q: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "44"],
    answer: 2,
    explain: "Differences are 4, 6, 8, 10, 12 — each term is n(n+1). Next term is 6×7 = 42.",
  },
  {
    q: "A can complete a task in 10 days, B in 15 days. Working together, how many days will they take?",
    options: ["5 days", "6 days", "7 days", "8 days"],
    answer: 1,
    explain: "Combined rate = 1/10 + 1/15 = 1/6 of the task per day → 6 days.",
  },
  {
    q: "What is the probability of getting a sum of 9 with two fair dice?",
    options: ["1/9", "1/12", "1/6", "4/36"],
    answer: 3,
    explain: "Favorable pairs: (3,6),(4,5),(5,4),(6,3) → 4 out of 36 outcomes = 4/36.",
  },
  {
    q: "A sum of money doubles itself in 8 years at simple interest. In how many years will it triple?",
    options: ["12 years", "16 years", "20 years", "24 years"],
    answer: 1,
    explain: "Doubling in 8 years means SI/year = principal/8. To triple, you need 2 more units of principal → 16 years total.",
  },
  {
    q: "Which of the following is a valid syllogism conclusion? 'All cats are animals. All animals need food.'",
    options: ["No cats need food", "All cats need food", "Some animals are cats only", "Cannot be determined"],
    answer: 1,
    explain: "Both premises are universal affirmatives sharing the middle term 'animals', so the valid conclusion is 'All cats need food.'",
  },
];

const HR_QUESTIONS = [
  {
    q: "Tell me about yourself.",
    tip: "Keep it to 60–90 seconds: present role/degree, 1–2 relevant achievements, then why you're excited about this opportunity. Don't recite your resume line by line.",
  },
  {
    q: "Why should we hire you?",
    tip: "Match 2–3 of your strongest, most relevant skills directly to the job description, and back each with a concrete example or result.",
  },
  {
    q: "What are your strengths and weaknesses?",
    tip: "For weaknesses, pick something real but not core to the role, and show the specific step you're taking to improve it — avoid disguised humble-brags like 'I work too hard.'",
  },
  {
    q: "Where do you see yourself in 5 years?",
    tip: "Show ambition that stays plausible and aligned with the company's growth path, not a plan that clearly walks out the door in year two.",
  },
  {
    q: "Describe a time you faced conflict in a team.",
    tip: "Use the STAR method (Situation, Task, Action, Result). Focus most of your answer on your own action and the resolution, not on blaming teammates.",
  },
  {
    q: "Why do you want to work at this company?",
    tip: "Reference something specific — a product, engineering value, or recent milestone — that shows you've actually researched them, not a generic answer that fits any company.",
  },
  {
    q: "How do you handle pressure or tight deadlines?",
    tip: "Give a real example of prioritization (what you dropped, delegated, or automated) rather than just claiming you 'stay calm.'",
  },
  {
    q: "Do you have any questions for us?",
    tip: "Always have 2–3 ready: about the team's current challenges, how success is measured in the role, or what growth paths look like. Never say 'no.'",
  },
];

const TECHNICAL_QUESTIONS = {
  "Data Structures & Algorithms": [
    { q: "What is the difference between an array and a linked list?", a: "Arrays give O(1) random access but O(n) insertion/deletion and a fixed contiguous size; linked lists give O(1) insertion/deletion at a known node but O(n) access and extra pointer memory." },
    { q: "Explain time complexity of quicksort in best, average, and worst case.", a: "Best/average: O(n log n) with a balanced pivot split. Worst case O(n²) when the pivot repeatedly splits very unevenly, e.g. an already sorted array with a naive pivot choice." },
    { q: "What is a hash collision and how is it resolved?", a: "A collision is when two keys map to the same bucket. Common resolutions: chaining (linked list per bucket) or open addressing (probe for the next free slot)." },
  ],
  "OOP Concepts": [
    { q: "What are the four pillars of OOP?", a: "Encapsulation, abstraction, inheritance, and polymorphism." },
    { q: "Difference between method overloading and overriding?", a: "Overloading: same method name, different parameters, resolved at compile time. Overriding: subclass redefines a parent method with the same signature, resolved at runtime." },
    { q: "What is the difference between an abstract class and an interface?", a: "An abstract class can hold shared state and partial implementation and supports single inheritance; an interface defines a contract with (traditionally) no state and supports multiple inheritance." },
  ],
  "DBMS": [
    { q: "What is normalization? Name the first three normal forms.", a: "Normalization reduces data redundancy. 1NF: atomic column values. 2NF: 1NF + no partial dependency on a composite key. 3NF: 2NF + no transitive dependency on non-key attributes." },
    { q: "Difference between DELETE, TRUNCATE, and DROP?", a: "DELETE removes rows (can be rolled back, fires triggers, keeps the table). TRUNCATE removes all rows fast, resets identity, minimal logging. DROP removes the entire table structure." },
    { q: "What is an index and when might it hurt performance?", a: "An index speeds up reads by avoiding full table scans, but it slows down writes (insert/update/delete) since every index must also be updated." },
  ],
  "Operating Systems": [
    { q: "What is a deadlock and what are its four necessary conditions?", a: "A deadlock is a cycle of processes each waiting on a resource held by another. Conditions: mutual exclusion, hold-and-wait, no preemption, circular wait." },
    { q: "Difference between a process and a thread?", a: "A process has its own isolated memory space; threads within the same process share memory but have their own stack and register state, making context switches cheaper." },
    { q: "What is virtual memory?", a: "An abstraction that gives each process its own address space, backed by RAM and disk (paging), allowing programs to use more memory than is physically installed." },
  ],
  "Computer Networks": [
    { q: "Explain the difference between TCP and UDP.", a: "TCP is connection-oriented, reliable, ordered, with flow/congestion control. UDP is connectionless, best-effort, with lower overhead — better for latency-sensitive traffic like video/gaming." },
    { q: "What happens when you type a URL into a browser?", a: "DNS resolves the domain to an IP, a TCP (and TLS, if HTTPS) connection is established, the browser sends an HTTP request, the server responds, and the browser parses and renders the page." },
    { q: "What is the difference between HTTP and HTTPS?", a: "HTTPS is HTTP layered over TLS, which encrypts traffic and authenticates the server via certificates, preventing eavesdropping and tampering." },
  ],
};

const RESUME_CHECKLIST = [
  "Contact info (email, phone, LinkedIn, GitHub) is current and professional",
  "Resume fits on one page (unless 8+ years experience)",
  "Strong action verbs used ('built', 'optimized', 'led') instead of passive phrasing",
  "Each bullet quantifies impact where possible (%, time saved, scale, users)",
  "Most relevant / recent experience appears first",
  "Skills section matches keywords in the job description",
  "Projects section includes links to live demos or repos",
  "No spelling or grammar errors — proofread by someone else",
  "Consistent formatting: fonts, spacing, bullet style throughout",
  "Saved and shared as a PDF with a clear filename (Name_Resume.pdf)",
  "Tailored version prepared for each specific role/company",
  "No unexplained employment or education gaps left unaddressed",
];