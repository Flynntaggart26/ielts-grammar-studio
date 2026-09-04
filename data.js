/* data.js - embedded mirror of data.json. Works on file:// where fetch() is blocked. To update: edit data.json then run: python3 gen_data_js.py */
window.IELTS_DATA = {
  "meta": {
    "topic": "Complex Sentences with Relative Clauses",
    "shortCode": "REL-CL",
    "targetBand": "7.0–8.0+",
    "module": "IELTS Academic Grammar Studio",
    "version": "1.0.0",
    "note": "Edit this file to retarget the whole system to a new grammar topic. app.js renders everything from here — no code changes needed."
  },
  "overview": {
    "intro": "Relative clauses let you pack precise academic information into one sentence — exactly what IELTS examiners reward under Grammatical Range & Accuracy. Instead of three short Band-6 sentences, one well-punctuated complex sentence shows control, cohesion and academic style.",
    "bandTable": [
      {
        "band": "Band 6.5",
        "typical": "Mostly simple + some compound sentences. Relative clauses attempted but repetitive or faulty.",
        "example": "The chart shows pollution. It is a big problem in cities. People who live there get sick.",
        "trait": "Repetition, comma errors, only 'who / which'."
      },
      {
        "band": "Band 7.5",
        "typical": "Frequent error-free complex sentences. Mix of defining + non-defining clauses with correct commas.",
        "example": "The chart compares pollution levels in cities, where respiratory illness, which affects children most, has risen sharply.",
        "trait": "Variety: who, which, where, whose, whom, preposition + which."
      },
      {
        "band": "Band 8.5",
        "typical": "Wide range used naturally and precisely. Reduced relatives and embedded clauses for concision.",
        "example": "The chart compares pollution in major cities, where respiratory illness affecting children — a trend driven by traffic, which accounts for 60% of emissions — has risen sharply.",
        "trait": "Reduced clauses, embedding, full punctuation control."
      }
    ],
    "formFunction": [
      {
        "form": "who / that + clause",
        "function": "Define people in Task 2 arguments",
        "accuracy": "No comma if defining. 'Students who work part-time perform better.'",
        "exampleTask": "Task 2: Teenagers who receive practical training adapt faster."
      },
      {
        "form": "which / that + clause",
        "function": "Define things / data in Task 1 overviews",
        "accuracy": "Defining: no commas. Non-defining: commas + WHICH only (never THAT).",
        "exampleTask": "Task 1: Consumption, which peaked in 2010, then fell by 20%."
      },
      {
        "form": ", where / when / whose ,",
        "function": "Add place / time / possession background",
        "accuracy": "Always non-defining → comma pair. Check antecedent.",
        "exampleTask": "Task 1: London, where cycling doubled, leads the trend."
      },
      {
        "form": "preposition + which / whom",
        "function": "Formal academic precision (Band 8 marker)",
        "accuracy": "Formal: 'the policy on which success depends'. Never strand in Task 1.",
        "exampleTask": "Task 2: The policy on which funding depends remains unclear."
      },
      {
        "form": "reduced relative (-ing / -ed)",
        "function": "Concise Task 1 trends, high-density description",
        "accuracy": "Active → -ing; passive → -ed. 'methods using AI' / 'data collected in 2020'.",
        "exampleTask": "Task 1: Energy produced from solar, shown in green, rose steadily."
      }
    ],
    "rules": [
      {
        "id": "R1",
        "color": "green",
        "title": "Defining = no commas (identifies which one)",
        "detail": "The programme which supports refugees received funding. → tells WHICH programme.",
        "taskExample": "Task 2: Policies that encourage recycling reduce landfill."
      },
      {
        "id": "R2",
        "color": "blue",
        "title": "Non-defining = comma pair + which (adds extra info)",
        "detail": "Solar power, which is now cheapest, dominates investment. → extra comment, commas required.",
        "taskExample": "Task 1: Coal, which accounted for 40% in 1990, fell to 12%."
      },
      {
        "id": "R3",
        "color": "amber",
        "title": "Never use THAT after a comma",
        "detail": "✘ The city, that is crowded, … → ✔ The city, which is crowded, …",
        "taskExample": "Common Task 1 error. Costs GRA band directly."
      },
      {
        "id": "R4",
        "color": "purple",
        "title": "whose = possession (people + things in Academic)",
        "detail": "A city whose transport is efficient attracts workers. Countries whose GDP relies on oil…",
        "taskExample": "Task 2: Societies whose elderly are supported are healthier."
      },
      {
        "id": "R5",
        "color": "red",
        "title": "where / when need a real place / time antecedent",
        "detail": "✘ A situation where pollution… (weak) → ✔ A city where pollution… / A year when sales…",
        "taskExample": "Task 1: 2015, when exports peaked, marks the turning point."
      }
    ]
  },
  "quiz": [
    {
      "id": "Q1",
      "type": "mcq",
      "prompt": "Choose the Band 7+ sentence (Task 1 overview).",
      "options": [
        "The graph shows sales. They went up. It was big.",
        "The graph shows sales, that went up a lot.",
        "The graph shows sales of EVs, which rose sharply after 2018, overtaking diesel."
      ],
      "answer": 2,
      "explanation": "Option 3 embeds a non-defining clause with correct commas + precise verb.",
      "bandNote": "Why higher: subordination + comma control = GRA 7.5. Option 2 uses THAT after comma → caps at 6.0."
    },
    {
      "id": "Q2",
      "type": "mcq",
      "prompt": "Choose the correct sentence.",
      "options": [
        "Students, that study abroad gain confidence.",
        "Students who study abroad gain confidence.",
        "Students, who study abroad gain confidence."
      ],
      "answer": 1,
      "explanation": "Defining clause identifying WHICH students → no commas, who/that both ok.",
      "bandNote": "Comma misuse signals Band 6. Examiners penalise non-defining commas on defining meaning."
    },
    {
      "id": "Q3",
      "type": "mcq",
      "prompt": "Formal Academic (Band 8): ___",
      "options": [
        "The policy which they depend on it is unclear.",
        "The policy on which they depend is unclear.",
        "The policy on that they depend is unclear."
      ],
      "answer": 1,
      "explanation": "Preposition + which is the formal academic structure. No resumptive 'it'.",
      "bandNote": "Preposition-fronting is a clear Band 8 range marker in Task 2."
    },
    {
      "id": "Q4",
      "type": "mcq",
      "prompt": "Punctuation: select correct.",
      "options": [
        "London where air quality improved, attracted cyclists.",
        "London, where air quality improved, attracted cyclists.",
        "London where, air quality improved attracted cyclists."
      ],
      "answer": 1,
      "explanation": "Non-defining where-clause needs a comma pair around it.",
      "bandNote": "Comma control around embedded clauses separates 6.5 from 7.5."
    },
    {
      "id": "Q5",
      "type": "gap",
      "prompt": "Fill the gap (Task 1): Coal, _____ accounted for 45% in 1990, fell to 10%.",
      "answer": "which",
      "alternatives": [
        "which"
      ],
      "explanation": "Non-defining + thing → which only. THAT after comma is always wrong.",
      "bandNote": "THAT-after-comma is the #1 GRA cap at Band 6."
    },
    {
      "id": "Q6",
      "type": "gap",
      "prompt": "Fill the gap: Tehran is a city _____ air pollution exceeds safe limits.",
      "answer": "where",
      "alternatives": [
        "where",
        "in which"
      ],
      "explanation": "'a city' is a place antecedent → where / in which.",
      "bandNote": "Precise antecedent + relativiser match shows Task 1 accuracy."
    },
    {
      "id": "Q7",
      "type": "gap",
      "prompt": "Fill the gap: Graduates _____ skills match market needs find work faster.",
      "answer": "whose",
      "alternatives": [
        "whose"
      ],
      "explanation": "Possession (graduates' skills) → whose. Reduced form also possible: 'Graduates with skills matching…'.",
      "bandNote": "whose with abstract nouns is a Band 7+ collocation."
    },
    {
      "id": "Q8",
      "type": "gap",
      "prompt": "Fill the gap (reduced relative): Energy _____ from solar rose steadily. (produce, passive)",
      "answer": "produced",
      "alternatives": [
        "produced"
      ],
      "explanation": "Passive reduction: 'which was produced' → 'produced'. Concise Task 1 style.",
      "bandNote": "Reduced relatives raise density — a Band 8 Task 1 feature."
    },
    {
      "id": "Q9",
      "type": "error",
      "prompt": "Find & correct the error: 'The diagram shows a factory, that emits CO2, which harms health.'",
      "answer": "which",
      "alternatives": [
        "which",
        "The diagram shows a factory, which emits CO2, which harms health."
      ],
      "explanation": "Replace THAT with WHICH after a comma. Better Band 8: '…factory emitting CO2, which harms health.'",
      "bandNote": "Double-which is okay but reduced first clause scores higher for range."
    },
    {
      "id": "Q10",
      "type": "error",
      "prompt": "Correct the error: 'People where live in rural areas have less access.'",
      "answer": "who",
      "alternatives": [
        "who",
        "People who live in rural areas have less access."
      ],
      "explanation": "'People' needs who/that, not where. WHERE needs a place antecedent.",
      "bandNote": "Relativiser–antecedent mismatch is a frequent Band 6 error in Task 2."
    },
    {
      "id": "Q11",
      "type": "error",
      "prompt": "Correct the error: 'The year when prices raised sharply was 2010.'",
      "answer": "rose",
      "alternatives": [
        "rose",
        "The year when prices rose sharply was 2010."
      ],
      "explanation": "Relative is fine; verb is wrong: prices RISE (intransitive), not 'raise'.",
      "bandNote": "Band 7+ needs lexical accuracy inside complex sentences — range without accuracy caps at 6.5."
    },
    {
      "id": "Q12",
      "type": "transform",
      "prompt": "Combine with a relative clause: 'The policy supports renewables. It was introduced in 2020.'",
      "answer": "which was introduced in 2020",
      "alternatives": [
        "which was introduced in 2020",
        "that was introduced in 2020",
        "introduced in 2020"
      ],
      "explanation": "Model: 'The policy, which was introduced in 2020, supports renewables.' Non-defining (one policy) → commas.",
      "bandNote": "Fronting the clause after the noun it defines improves cohesion (CC + GRA)."
    },
    {
      "id": "Q13",
      "type": "transform",
      "prompt": "Combine with WHOSE: 'The country invests in education. Its economy grows fast.'",
      "answer": "whose economy grows",
      "alternatives": [
        "whose economy grows",
        "Countries whose economy grows"
      ],
      "explanation": "Model: 'Countries whose economies grow fast invest heavily in education.'",
      "bandNote": "whose + abstract noun (economy/society) is high-frequency Band 7+ Task 2 language."
    },
    {
      "id": "Q14",
      "type": "transform",
      "prompt": "Reduce the clause: 'The data which was collected in 2020 shows growth.'",
      "answer": "collected in 2020",
      "alternatives": [
        "collected in 2020",
        "The data collected in 2020 shows growth"
      ],
      "explanation": "Delete 'which was' → past participle. Shorter = more academic Task 1 density.",
      "bandNote": "Reduction demonstrates flexibility — explicitly named in Band 8 descriptors."
    }
  ],
  "practice": {
    "level1": [
      {
        "id": "L1-1",
        "sentence": "Solar energy, ___ is now the cheapest source, attracts record investment.",
        "bank": [
          "which",
          "that",
          "where"
        ],
        "answer": "which",
        "hint": "Non-defining + thing → after comma use ___."
      },
      {
        "id": "L1-2",
        "sentence": "Students ___ work part-time develop time-management skills.",
        "bank": [
          "who",
          "where",
          "whose"
        ],
        "answer": "who",
        "hint": "People + defining (which students?) → ___."
      },
      {
        "id": "L1-3",
        "sentence": "Cities ___ cycling infrastructure improved saw fewer emissions.",
        "bank": [
          "where",
          "which",
          "whose"
        ],
        "answer": "where",
        "hint": "Place antecedent (cities) → ___."
      },
      {
        "id": "L1-4",
        "sentence": "Nations ___ elderly are supported report higher wellbeing.",
        "bank": [
          "whose",
          "who",
          "when"
        ],
        "answer": "whose",
        "hint": "Possession: nations' elderly → ___."
      },
      {
        "id": "L1-5",
        "sentence": "Plastic waste ___ in oceans threatens marine life. (which / collect → reduce it)",
        "bank": [
          "collected",
          "collecting",
          "collect"
        ],
        "answer": "collected",
        "hint": "Passive reduction: which was collected → ___."
      },
      {
        "id": "L1-6",
        "sentence": "2018, ___ exports peaked, marks the turning point.",
        "bank": [
          "when",
          "where",
          "which"
        ],
        "answer": "when",
        "hint": "Time antecedent (2018) → ___."
      }
    ],
    "level2": [
      {
        "id": "L2-1",
        "title": "Task 1 — Line graph (energy mix)",
        "brief": "Describe: coal fell 45%→10%, solar rose 5%→48% (1990–2024). Use 2 non-defining which-clauses + 1 reduced relative.",
        "starter": "The line graph compares electricity sources between 1990 and 2024. Coal, which accounted for ___ , ...",
        "targetWords": 150
      },
      {
        "id": "L2-2",
        "title": "Task 1 — Process (recycling)",
        "brief": "Describe paper recycling in 6 stages. Use where-clause for the plant + whose for the system + 1 reduced clause.",
        "starter": "The diagram illustrates how waste paper is recycled. Collection trucks deliver paper to a plant, where ___ ...",
        "targetWords": 150
      },
      {
        "id": "L2-3",
        "title": "Task 1 — Bar chart (transport)",
        "brief": "Compare commuting: cars 55%→38%, cycling 8%→27% (London, 2000–2020). Use where + when clauses.",
        "starter": "The bar chart compares commuting modes in London, where ___ ...",
        "targetWords": 150
      }
    ],
    "level3": {
      "title": "Task 2 — Free paragraph",
      "prompt": "Some believe governments should fund public transport, which reduces pollution, while others prioritise roads. Discuss both views (write ONE 90–110 word paragraph using ≥2 relative clauses, one with commas).",
      "checklistRef": "Use the Band 7+ self-editing checklist before counting words.",
      "targetWords": 100
    },
    "speaking": [
      {
        "id": "S1",
        "part": "Part 2",
        "prompt": "Describe a city you would like to live in.",
        "model": "I'd love to live in Copenhagen, where cycling is normal, which keeps air clean.",
        "upgrade": "Band 7+ upgrade: '…Copenhagen, where cycling infrastructure, which covers 400km, makes commuting fast, which is why locals, whose health ranks top, love it.'"
      },
      {
        "id": "S2",
        "part": "Part 2",
        "prompt": "Describe a teacher who influenced you.",
        "model": "My physics teacher, who made lessons practical, inspired me.",
        "upgrade": "Upgrade with whose + non-defining: '…teacher, whose methods, which mixed experiments with stories, built confidence.'"
      },
      {
        "id": "S3",
        "part": "Part 2",
        "prompt": "Describe a technology you use daily.",
        "model": "I use a translation app that saves me hours.",
        "upgrade": "Reduced relative: 'I rely on a translation app, updated weekly, which handles PDFs, on which my thesis depends.'"
      },
      {
        "id": "S4",
        "part": "Part 3",
        "prompt": "How do cities affect health?",
        "model": "Cities where traffic is heavy have worse air.",
        "upgrade": "Add embedding: 'Cities where traffic, which causes 70% of smog, is unchecked see illness, which burdens hospitals.'"
      },
      {
        "id": "S5",
        "part": "Part 3",
        "prompt": "Should governments fund rural areas?",
        "model": "Villages which lack hospitals need support.",
        "upgrade": "whose + formal: 'Villages whose clinics, which serve thousands, lack staff deserve funding on which equity depends.'"
      },
      {
        "id": "S6",
        "part": "Part 3",
        "prompt": "Is remote work good for society?",
        "model": "Workers who work from home save time.",
        "upgrade": "Reduced: 'Workers freed from commuting, who reinvest time in family, report wellbeing, which lifts productivity.'"
      },
      {
        "id": "S7",
        "part": "Part 3",
        "prompt": "How has education changed?",
        "model": "Online courses that are cheap help many.",
        "upgrade": "Non-defining pair: 'Online courses, which cost little, help learners whose schedules, which are tight, block campus study.'"
      },
      {
        "id": "S8",
        "part": "Part 2",
        "prompt": "Describe a historical period you find interesting.",
        "model": "The 1960s, when space travel began, fascinates me.",
        "upgrade": "Add where: 'The 1960s, when space labs, where engineers, whose maths was manual, worked, raced ahead.'"
      },
      {
        "id": "S9",
        "part": "Part 3",
        "prompt": "Will cities of the future be better?",
        "model": "Future districts which use green energy will thrive.",
        "upgrade": "Preposition + which: 'Districts powered by renewables, on which resilience depends, will thrive, which planners confirm.'"
      }
    ]
  },
  "exercises": {
    "transformation": [
      {
        "id": "T1",
        "simple": "The programme helps refugees. It started in 2019.",
        "model": "The programme, which started in 2019, helps refugees."
      },
      {
        "id": "T2",
        "simple": "Air pollution harms children. It comes from traffic.",
        "model": "Air pollution, which comes largely from traffic, harms children most."
      },
      {
        "id": "T3",
        "simple": "The researcher published a paper. Her findings changed policy.",
        "model": "The researcher, whose findings changed policy, published a landmark paper."
      },
      {
        "id": "T4",
        "simple": "The factory closed in 2020. 500 people worked there.",
        "model": "The factory, where 500 people worked, closed in 2020."
      },
      {
        "id": "T5",
        "simple": "The data was gathered in 2023. It shows rising costs.",
        "model": "The data gathered in 2023 shows rising costs. (reduced relative)"
      },
      {
        "id": "T6",
        "simple": "Tourism creates jobs. Many coastal towns depend on it.",
        "model": "Tourism, on which many coastal towns depend, creates vital jobs."
      },
      {
        "id": "T7",
        "simple": "Electric buses are popular. They emit no exhaust.",
        "model": "Electric buses, which emit no exhaust, are growing popular."
      },
      {
        "id": "T8",
        "simple": "The policy failed. The government introduced it last year.",
        "model": "The policy introduced last year failed. (reduced) / The policy, which the government introduced last year, failed."
      }
    ],
    "errorCorrection": [
      {
        "id": "E1",
        "task": "Task 1",
        "faulty": "The chart shows exports, that rose in 2020.",
        "fixed": "The chart shows exports, which rose in 2020.",
        "note": "THAT after comma → Band 6. Always WHICH. Band impact: −0.5 GRA."
      },
      {
        "id": "E2",
        "task": "Task 1",
        "faulty": "Beijing where pollution is high needs action.",
        "fixed": "Beijing, where pollution is high, needs action.",
        "note": "Non-defining needs comma pair. Missing commas = run-on feel, caps CC/GRA."
      },
      {
        "id": "E3",
        "task": "Task 2",
        "faulty": "People where work night shifts suffer fatigue.",
        "fixed": "People who work night shifts suffer fatigue.",
        "note": "WHERE needs place antecedent. People → WHO. Frequent Band-6 Task 2 error."
      },
      {
        "id": "E4",
        "task": "Task 2",
        "faulty": "Children which parents read to them learn faster.",
        "fixed": "Children whose parents read to them learn faster.",
        "note": "Possession → WHOSE. 'which parents' is a GRA 5.5–6.0 signal."
      },
      {
        "id": "E5",
        "task": "Task 1",
        "faulty": "The year which sales peaked was 2018.",
        "fixed": "The year when sales peaked was 2018. (or: in which)",
        "note": "Time antecedent prefers WHEN. WHICH is understandable but less precise — Band 7 lexical precision."
      },
      {
        "id": "E6",
        "task": "Task 2",
        "faulty": "The system on that success depends is fragile.",
        "fixed": "The system on which success depends is fragile.",
        "note": "Preposition + WHICH (never THAT). Formal structure = Band 8 range."
      },
      {
        "id": "E7",
        "task": "Task 1",
        "faulty": "Energy which produced from coal, fell sharply.",
        "fixed": "Energy produced from coal fell sharply.",
        "note": "Reduce: drop 'which' + be. Extra 'which' + comma = double error."
      },
      {
        "id": "E8",
        "task": "Task 2",
        "faulty": "Students, who study hard, they succeed.",
        "fixed": "Students who study hard succeed.",
        "note": "Two errors: comma on defining clause + resumptive 'they'. Delete both for Band 7+."
      }
    ]
  },
  "selfAssessment": {
    "confidenceRules": [
      {
        "id": "C1",
        "rule": "Defining vs non-defining commas",
        "bandMap": "1–2 ≈ Band 5.5–6.0 · 3 ≈ 6.5 · 4 ≈ 7.0–7.5 · 5 ≈ 8.0+"
      },
      {
        "id": "C2",
        "rule": "which vs that after comma",
        "bandMap": "1–2 ≈ Band 5.5–6.0 · 3 ≈ 6.5 · 4 ≈ 7.0–7.5 · 5 ≈ 8.0+"
      },
      {
        "id": "C3",
        "rule": "where / when / whose accuracy",
        "bandMap": "1–2 ≈ Band 5.5–6.0 · 3 ≈ 6.5 · 4 ≈ 7.0–7.5 · 5 ≈ 8.0+"
      },
      {
        "id": "C4",
        "rule": "Formal preposition + which/whom",
        "bandMap": "1–2 ≈ Band 6.0 · 3 ≈ 6.5–7.0 · 4–5 ≈ 7.5–8.5"
      },
      {
        "id": "C5",
        "rule": "Reduced relatives (-ing / -ed)",
        "bandMap": "1–2 ≈ Band 6.0–6.5 · 3–4 ≈ 7.0–7.5 · 5 ≈ 8.0+"
      }
    ],
    "checklist": [
      "Every comma + which pair checked (no THAT after comma)",
      "Each relative pronoun matches its antecedent (who/people, where/place, when/time)",
      "At least 2 complex sentences with correct comma pairs in Task 1 overview",
      "At least 3 varied relatives (which + whose/where/when) in Task 2",
      "One reduced relative used correctly (-ing active / -ed passive)",
      "No resumptive pronoun (the city where it… / students who they…)",
      "Punctuation read aloud — commas mark real pauses"
    ]
  },
  "reference": {
    "summary": [
      "Defining = identifies → NO commas (students who work…).",
      "Non-defining = extra comment → COMMA + WHICH (solar, which…).",
      "NEVER that after a comma. Preposition + which = formal Band 8.",
      "who→people · which→things · where→place · when→time · whose→possession.",
      "Reduce for density: which was collected → collected; which uses AI → using AI."
    ],
    "collocations": [
      "cities where pollution…",
      "countries whose economies…",
      "the year when sales peaked…",
      "the policy on which success depends…",
      "energy produced from…",
      "workers exposed to…",
      "methods using AI…",
      "communities affected by…",
      "a trend driven by…",
      "data collected in…"
    ],
    "pitfalls": [
      {
        "wrong": "Exports, that rose…",
        "right": "Exports, which rose…",
        "impact": "Instant GRA cap ~6.0. Examiners call this a 'basic punctuation error'."
      },
      {
        "wrong": "People where live…",
        "right": "People who live…",
        "impact": "Antecedent mismatch → both GRA + LR penalised."
      },
      {
        "wrong": "Students, who study hard, they pass.",
        "right": "Students who study hard pass.",
        "impact": "Comma + resumptive pronoun = double Band-6 signal."
      },
      {
        "wrong": "The system on that depends…",
        "right": "The system on which… depends",
        "impact": "Blocks Band 8 range credit for formal structures."
      },
      {
        "wrong": "Energy which produced…",
        "right": "Energy produced…",
        "impact": "Unreduced clutter lowers Task 1 concision / TA density."
      }
    ]
  }
};
