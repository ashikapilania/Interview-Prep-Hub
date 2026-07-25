// =========================================================
// INTERVIEW PREP HUB — main script
// All progress is persisted to localStorage under one key.
// =========================================================

const STORAGE_KEY = "prepHubData";

const PAGE_TITLES = {
  dashboard: ["Dashboard", "Your placement prep, at a glance."],
  coding: ["Daily Coding Challenge", "One problem a day keeps the rejection away."],
  aptitude: ["Aptitude Quiz", "Sharpen your quantitative and logical reasoning."],
  hr: ["HR Interview Questions", "Common behavioral questions and how to approach them."],
  technical: ["Technical Interview Questions", "Core CS fundamentals, grouped by topic."],
  resume: ["Resume Checklist", "Tick off each item before you hit submit."],
  notes: ["Notes", "Jot down formulas, tips, and reminders."]
};

// ---------------- STATE ----------------
let state = loadState();

function defaultState() {
  return {
    theme: "light",
    streak: 0,
    lastVisitDate: null,
    solvedCoding: [],       // titles of solved problems
    currentCodingIndex: 0,
    aptitudeBestScore: 0,
    checklist: {},          // { index: true/false }
    notes: []               // { id, text, date }
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed };
  } catch (e) {
    console.error("Failed to load state, resetting.", e);
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state.", e);
  }
}

// ---------------- STREAK LOGIC ----------------
function updateStreak() {
  const today = new Date().toDateString();
  if (state.lastVisitDate === today) {
    return; // already counted today
  }
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (state.lastVisitDate === yesterday.toDateString()) {
    state.streak += 1; // continued streak
  } else {
    state.streak = 1; // streak broken, restart
  }
  state.lastVisitDate = today;
  saveState();
}

// ---------------- THEME ----------------
function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  document.getElementById("themeIcon").textContent = state.theme === "dark" ? "☀" : "☾";
  document.getElementById("themeLabel").textContent = state.theme === "dark" ? "Light Mode" : "Dark Mode";
}

document.getElementById("themeToggle").addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  saveState();
  applyTheme();
});

// ---------------- NAVIGATION ----------------
function goToPage(pageName) {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === pageName);
  });
  document.querySelectorAll(".page").forEach(sec => sec.classList.remove("active"));
  document.getElementById("page-" + pageName).classList.add("active");

  const [title, subtitle] = PAGE_TITLES[pageName];
  document.getElementById("pageTitle").textContent = title;
  document.getElementById("pageSubtitle").textContent = subtitle;

  if (pageName === "dashboard") renderDashboard();
}

document.querySelectorAll(".nav-btn, .quick-link").forEach(btn => {
  btn.addEventListener("click", () => goToPage(btn.dataset.page));
});

// ---------------- DASHBOARD ----------------
function renderDashboard() {
  document.getElementById("streakCount").textContent = state.streak;
  document.getElementById("statCoding").textContent = state.solvedCoding.length;
  document.getElementById("statAptitude").textContent = state.aptitudeBestScore + "%";

  const checklistDone = Object.values(state.checklist).filter(Boolean).length;
  const resumePercent = Math.round((checklistDone / RESUME_CHECKLIST.length) * 100) || 0;
  document.getElementById("statResume").textContent = resumePercent + "%";
  document.getElementById("statNotes").textContent = state.notes.length;

  // Overall progress = average of coding %, aptitude %, resume %
  const codingPercent = Math.round((state.solvedCoding.length / CODING_PROBLEMS.length) * 100);
  const overall = Math.round((codingPercent + state.aptitudeBestScore + resumePercent) / 3);
  document.getElementById("overallPercent").textContent = overall + "%";

  const circumference = 377; // 2 * PI * 60
  const offset = circumference - (overall / 100) * circumference;
  document.getElementById("overallRing").style.strokeDashoffset = offset;
}

document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("This will erase all saved progress from this browser. Continue?")) {
    localStorage.removeItem(STORAGE_KEY);
    state = defaultState();
    updateStreak();
    initAll();
  }
});

// ---------------- DAILY CODING CHALLENGE ----------------
function renderCoding() {
  const p = CODING_PROBLEMS[state.currentCodingIndex];
  document.getElementById("codingDifficulty").textContent = p.difficulty;
  document.getElementById("codingIndex").textContent = state.currentCodingIndex + 1;
  document.getElementById("codingTotal").textContent = CODING_PROBLEMS.length;
  document.getElementById("codingTitle").textContent = p.title;
  document.getElementById("codingDesc").textContent = p.desc;
  document.getElementById("codingExample").textContent = p.example;
  document.getElementById("codingHint").textContent = p.hint;
  document.getElementById("codingHint").classList.add("hidden");

  const solved = state.solvedCoding.includes(p.title);
  const doneBtn = document.getElementById("codingDoneBtn");
  doneBtn.textContent = solved ? "Solved ✓" : "Mark as Solved ✓";
  doneBtn.disabled = solved;
}

document.getElementById("codingHintBtn").addEventListener("click", () => {
  document.getElementById("codingHint").classList.toggle("hidden");
});

document.getElementById("codingNewBtn").addEventListener("click", () => {
  state.currentCodingIndex = (state.currentCodingIndex + 1) % CODING_PROBLEMS.length;
  saveState();
  renderCoding();
});

document.getElementById("codingDoneBtn").addEventListener("click", () => {
  const p = CODING_PROBLEMS[state.currentCodingIndex];
  if (!state.solvedCoding.includes(p.title)) {
    state.solvedCoding.push(p.title);
    saveState();
  }
  renderCoding();
});

// ---------------- APTITUDE QUIZ ----------------
let aptCurrentQ = 0;
let aptScore = 0;
let aptAnswered = false;

function startAptitudeQuiz() {
  aptCurrentQ = 0;
  aptScore = 0;
  aptAnswered = false;
  document.getElementById("aptitudeQuizArea").classList.remove("hidden");
  document.getElementById("aptResultArea").classList.add("hidden");
  document.getElementById("aptQTotal").textContent = APTITUDE_QUESTIONS.length;
  renderAptitudeQuestion();
}

function renderAptitudeQuestion() {
  aptAnswered = false;
  const q = APTITUDE_QUESTIONS[aptCurrentQ];
  document.getElementById("aptQNum").textContent = aptCurrentQ + 1;
  document.getElementById("aptQuestion").textContent = q.q;
  document.getElementById("aptitudeProgressFill").style.width =
    ((aptCurrentQ) / APTITUDE_QUESTIONS.length) * 100 + "%";

  const optionsDiv = document.getElementById("aptOptions");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectAptitudeAnswer(i, btn));
    optionsDiv.appendChild(btn);
  });

  document.getElementById("aptNextBtn").disabled = true;
}

function selectAptitudeAnswer(selectedIndex, btnEl) {
  if (aptAnswered) return;
  aptAnswered = true;
  const q = APTITUDE_QUESTIONS[aptCurrentQ];
  const allBtns = document.querySelectorAll("#aptOptions .option-btn");

  allBtns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.answer) b.classList.add("correct");
    else if (i === selectedIndex) b.classList.add("wrong");
  });

  if (selectedIndex === q.answer) aptScore++;
  document.getElementById("aptNextBtn").disabled = false;
}

document.getElementById("aptNextBtn").addEventListener("click", () => {
  aptCurrentQ++;
  if (aptCurrentQ < APTITUDE_QUESTIONS.length) {
    renderAptitudeQuestion();
  } else {
    finishAptitudeQuiz();
  }
});

function finishAptitudeQuiz() {
  document.getElementById("aptitudeProgressFill").style.width = "100%";
  const percent = Math.round((aptScore / APTITUDE_QUESTIONS.length) * 100);
  document.getElementById("aptitudeQuizArea").classList.add("hidden");
  document.getElementById("aptResultArea").classList.remove("hidden");
  document.getElementById("aptFinalScore").textContent =
    `${aptScore} / ${APTITUDE_QUESTIONS.length} correct (${percent}%)`;

  if (percent > state.aptitudeBestScore) {
    state.aptitudeBestScore = percent;
    saveState();
  }
}

document.getElementById("aptRetakeBtn").addEventListener("click", startAptitudeQuiz);

// ---------------- HR QUESTIONS (accordion) ----------------
function renderHR() {
  const container = document.getElementById("hrAccordion");
  container.innerHTML = "";
  HR_QUESTIONS.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "accordion-item";
    div.innerHTML = `
      <button class="accordion-q">${item.q} <span>+</span></button>
      <div class="accordion-a"><p>${item.a}</p></div>
    `;
    div.querySelector(".accordion-q").addEventListener("click", () => {
      div.classList.toggle("open");
    });
    container.appendChild(div);
  });
}

// ---------------- TECHNICAL QUESTIONS (accordion + filter) ----------------
let activeTechFilter = "All";

function renderTechFilters() {
  const categories = ["All", ...new Set(TECHNICAL_QUESTIONS.map(q => q.category))];
  const container = document.getElementById("techFilters");
  container.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (cat === activeTechFilter ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      activeTechFilter = cat;
      renderTechFilters();
      renderTechnical();
    });
    container.appendChild(btn);
  });
}

function renderTechnical() {
  const container = document.getElementById("technicalAccordion");
  container.innerHTML = "";
  const list = activeTechFilter === "All"
    ? TECHNICAL_QUESTIONS
    : TECHNICAL_QUESTIONS.filter(q => q.category === activeTechFilter);

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "accordion-item";
    div.innerHTML = `
      <button class="accordion-q">
        <span>${item.q}</span>
        <span class="cat-tag">${item.category}</span>
      </button>
      <div class="accordion-a"><p>${item.a}</p></div>
    `;
    div.querySelector(".accordion-q").addEventListener("click", () => {
      div.classList.toggle("open");
    });
    container.appendChild(div);
  });
}

// ---------------- RESUME CHECKLIST ----------------
function renderResumeChecklist() {
  const container = document.getElementById("resumeChecklist");
  container.innerHTML = "";
  RESUME_CHECKLIST.forEach((item, i) => {
    const checked = !!state.checklist[i];
    const div = document.createElement("label");
    div.className = "check-item" + (checked ? " done" : "");
    div.innerHTML = `<input type="checkbox" ${checked ? "checked" : ""}> <span>${item}</span>`;
    div.querySelector("input").addEventListener("change", (e) => {
      state.checklist[i] = e.target.checked;
      saveState();
      renderResumeChecklist();
    });
    container.appendChild(div);
  });
  const done = Object.values(state.checklist).filter(Boolean).length;
  document.getElementById("resumeProgressText").textContent = `${done} / ${RESUME_CHECKLIST.length} done`;
}

// ---------------- NOTES ----------------
function renderNotes() {
  const grid = document.getElementById("notesGrid");
  grid.innerHTML = "";
  if (state.notes.length === 0) {
    grid.innerHTML = `<p class="muted">No notes yet. Add one above to get started.</p>`;
    return;
  }
  [...state.notes].reverse().forEach(note => {
    const div = document.createElement("div");
    div.className = "note-card";
    div.innerHTML = `
      <button class="note-delete" title="Delete note">✕</button>
      <p></p>
      <span class="note-date">${note.date}</span>
    `;
    div.querySelector("p").textContent = note.text;
    div.querySelector(".note-delete").addEventListener("click", () => {
      state.notes = state.notes.filter(n => n.id !== note.id);
      saveState();
      renderNotes();
    });
    grid.appendChild(div);
  });
}

document.getElementById("addNoteBtn").addEventListener("click", () => {
  const input = document.getElementById("noteInput");
  const text = input.value.trim();
  if (!text) return;
  state.notes.push({
    id: Date.now(),
    text,
    date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  });
  input.value = "";
  saveState();
  renderNotes();
});

// ---------------- INIT ----------------
function initAll() {
  applyTheme();
  updateStreak();
  renderDashboard();
  renderCoding();
  startAptitudeQuiz();
  renderHR();
  renderTechFilters();
  renderTechnical();
  renderResumeChecklist();
  renderNotes();
  goToPage("dashboard");
}

initAll();