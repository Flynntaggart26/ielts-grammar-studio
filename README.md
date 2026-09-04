# IELTS Academic Grammar Studio

> **Offline-first grammar system for Band 7.0–8.0+ · Topic: Complex Sentences with Relative Clauses**

A single-folder, zero-dependency study app for IELTS Academic candidates. Diagnostic quiz, scaffolded writing practice, interactive exercises, band tracker, and printable reference — all running 100% offline in the browser.

![static](https://img.shields.io/badge/offline-100%25-success)
![stack](https://img.shields.io/badge/stack-vanilla%20HTML%2FCSS%2FJS-blue)
![ielts](https://img.shields.io/badge/IELTS-Academic%20%E2%80%A2%20Band%207%E2%80%938-red)

---

## ✨ Features

| Area | What you get |
|---|---|
| 📊 **Grammar Overview** | Band 6.5 vs 7.5 vs 8.5 comparison, form → function → accuracy map, color-coded rules with Task 1 & 2 examples |
| 📝 **Diagnostic Quiz (14 items)** | MCQ · gap-fill · error correction · transformation, with immediate band-level feedback + "why this scores higher" notes |
| 🪜 **Scaffolded Practice** | L1 guided gap-fill (word bank + hints) → L2 controlled Task 1 writing → L3 free Task 2 paragraph + self-editing checklist |
| 🎙 **Speaking Practice** | 9× Part 2 & 3 prompts with models + Band-7+ grammar upgrades |
| 🔁 **Interactive Exercises** | Sentence transformation, error detection in Task 1/2 samples, freer production with live word-count |
| 📈 **Band Tracker** | 1–5 confidence ratings mapped to bands, auto-populated error log, persistent Band 7+ checklist, estimated GRA band dashboard |
| 🖨 **Reference Tools** | Print-optimised one-page summary, collapsible collocation card, pitfalls with band consequences |
| 🎛 **UX** | Dark/light mode, teacher/projection mode (large text), responsive, keyboard accessible, `localStorage` persistence |

## 🚀 Quick start (offline)

No build step. No install. No internet needed after download.

**Option A — double-click:**
1. Download / clone this repo.
2. Open `index.html` in any modern browser.

**Option B — local server (recommended, avoids `file://` fetch limits):**

```bash
# Python
python -m http.server 8000
# then open http://localhost:8000

# VS Code: install "Live Server" → Right-click index.html → Open with Live Server
```

## 📁 Project structure

```text
ielts-grammar-studio/
├── index.html   # main learner interface (6 tabbed sections)
├── styles.css   # exam-style theme: light/dark, responsive, teacher mode, print
├── app.js       # modular vanilla JS — renders everything from data.json
├── data.json    # ALL content: bands, quiz, practice, exercises, reference
└── README.md
```

## 🔧 Retarget to a new grammar topic

Edit **only `data.json`** — no code changes needed:

1. Update `meta.topic` and `overview` (band table, form→function rows, rules).
2. Replace `quiz`, `practice`, `exercises`, `selfAssessment`, `reference` arrays.
3. Reload the page. That's it.

Duplicate the folder per topic (`ielts-nominalisation/`, `ielts-conditionals/`, …) for a full grammar library.

## 👩‍🏫 Teacher guide

- **Diagnose first:** learners take the quiz; mistakes auto-fill the Personal Error Log — start class from that table.
- **Project it:** press `📽 Teacher` for large-text classroom view; expand one Speaking card at a time and elicit upgrades orally.
- **Write → self-edit:** L2 (Task 1) → L3 (Task 2 paragraph) with word + clause counters, then enforce the Band 7+ Checklist before peer review.
- **Homework:** print the one-page summary (`🖨 Print summary` prints only the revision card).

## 🗺 Roadmap

- [ ] Nominalisation pack (Task 1/2 density)
- [ ] Conditionals + hedging pack (Task 2 opinions)
- [ ] Articles + plural precision pack (Task 1 data accuracy)
- [ ] Export progress report (copy-paste for tutors)

## 📄 License

MIT — free for learners, teachers, and schools.
