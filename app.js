/* ============================================================
   app.js — IELTS Grammar Studio (vanilla JS, offline-first)
   Modules: Store → Data → Tabs/Theme → Overview → Quiz →
            Practice → Exercises → Tracker → Reference
   All content comes from data.json. Progress in localStorage.
   To retarget topic: edit data.json only.
   ============================================================ */
"use strict";

/* ---------- 1. Store (localStorage helpers) ---------- */
const Store = {
  get(k, fallback) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} }
};
const K = { theme:"ielts_rel_theme", teacher:"ielts_rel_teacher", quiz:"ielts_rel_quiz",
  conf:"ielts_rel_conf", check:"ielts_rel_check", errors:"ielts_rel_errors",
  notes:"ielts_rel_notes", drafts:"ielts_rel_drafts" };

/* ---------- 2. Data ---------- */
let DATA = null;
async function loadData() {
  // Offline-first: fetch local data.json (no network needed).
  // Run via double-click + any static server recommended for file:// fetch rules.
  const res = await fetch("data.json");
  if (!res.ok) throw new Error("data.json not found");
  DATA = await res.json();
  document.getElementById("app-subtitle").textContent =
    `${DATA.meta.topic} · Band ${DATA.meta.targetBand}`;
}

/* ---------- 3. Tabs / theme / teacher / progress ---------- */
function initChrome() {
  // Tabs (mouse + keyboard: buttons are natively focusable/activatable)
  const tabs = [...document.querySelectorAll(".tab")];
  tabs.forEach(t => t.addEventListener("click", () => activateTab(t.dataset.tab)));
  function activateTab(name) {
    tabs.forEach(t => { const on = t.dataset.tab === name;
      t.classList.toggle("active", on); t.setAttribute("aria-selected", on); });
    document.querySelectorAll(".panel").forEach(p => {
      const on = p.id === `panel-${name}`; p.classList.toggle("active", on);
      on ? p.removeAttribute("hidden") : p.setAttribute("hidden", "");
    });
    updateProgressStrip();
  }
  // Theme
  const btnT = document.getElementById("btn-theme");
  const applyTheme = d => { document.body.classList.toggle("dark", d);
    btnT.textContent = d ? "☀️ Light" : "🌙 Dark"; btnT.setAttribute("aria-pressed", d); };
  applyTheme(Store.get(K.theme, false));
  btnT.onclick = () => { const d = !document.body.classList.contains("dark");
    Store.set(K.theme, d); applyTheme(d); };
  // Teacher / projection mode
  const btnTeach = document.getElementById("btn-teacher");
  const applyTeach = on => { document.body.classList.toggle("teacher", on);
    btnTeach.setAttribute("aria-pressed", on);
    btnTeach.textContent = on ? "📽 Exit Teacher" : "📽 Teacher"; };
  applyTeach(Store.get(K.teacher, false));
  btnTeach.onclick = () => { const on = !document.body.classList.contains("teacher");
    Store.set(K.teacher, on); applyTeach(on); };
  document.getElementById("btn-print").onclick = () => window.print();
}
function updateProgressStrip() {
  // Simple engagement metric: % checklist + quiz answered
  const q = Store.get(K.quiz, {}); const c = Store.get(K.check, {});
  const qDone = Object.keys(q).length / Math.max(1, (DATA?.quiz.length || 14));
  const cDone = Object.values(c).filter(Boolean).length / 7;
  document.getElementById("progress-fill").style.width =
    Math.round(((qDone + cDone) / 2) * 100) + "%";
}

/* ---------- 4. Overview ---------- */
function renderOverview() {
  const o = DATA.overview;
  document.getElementById("overview-intro").textContent = o.intro;
  document.getElementById("band-table").innerHTML = o.bandTable.map(b => `
    <article class="band-card"><h3>${b.band}</h3><p>${b.typical}</p>
    <p class="ex">“${b.example}”</p><p class="muted small">${b.trait}</p></article>`).join("");
  document.querySelector("#form-table tbody").innerHTML = o.formFunction.map(r => `
    <tr><td><strong>${r.form}</strong></td><td>${r.function}</td><td>${r.accuracy}</td><td>${r.exampleTask}</td></tr>`).join("");
  document.getElementById("rules-list").innerHTML = o.rules.map(r => `
    <div class="rule ${r.color}"><strong>${r.id} · ${r.title}</strong><br>${r.detail}
    <br><span class="muted small">✎ ${r.taskExample}</span></div>`).join("");
}

/* ---------- 5. Quiz ---------- */
function norm(s){ return (s||"").trim().toLowerCase().replace(/[.,;!?'"“”]/g,""); }
function isCorrect(q, val){
  if (q.type === "mcq") return Number(val) === q.answer;
  const alts = [q.answer, ...(q.alternatives||[])].map(norm);
  return alts.some(a => norm(val) === a || norm(val).includes(a));
}
function bandFromPct(p){ return p>=85?"8.0+":p>=70?"7.5":p>=55?"7.0":p>=40?"6.5":"≤6.0"; }

function renderQuiz() {
  const list = document.getElementById("quiz-list");
  const saved = Store.get(K.quiz, {}); // {Qid:{val,ok}}
  document.getElementById("quiz-count").textContent = `${DATA.quiz.length} items`;
  list.innerHTML = "";
  DATA.quiz.forEach((q, i) => {
    const li = document.createElement("li");
    li.className = "quiz-item"; li.id = `quiz-${q.id}`;
    const label = {mcq:"Multiple choice", gap:"Gap-fill", error:"Error correction", transform:"Transformation"}[q.type];
    let body = `<strong>${i+1}. [${label}]</strong> ${q.prompt}`;
    if (q.type === "mcq") body += `<div class="opts" role="group" aria-label="${q.id}">` +
      q.options.map((op, oi) => `<button class="opt" data-v="${oi}"><span><strong>${"ABC"[oi]}.</strong> ${op}</span></button>`).join("") + `</div>`;
    else body += `<div class="row"><input type="text" id="in-${q.id}" placeholder="Type your answer…" aria-label="Answer for ${q.id}">
      <button class="btn btn-primary" data-check="${q.id}">Check</button></div>`;
    body += `<div class="feedback" id="fb-${q.id}" aria-live="polite"></div>`;
    li.innerHTML = body; list.appendChild(li);
    // MCQ handlers
    li.querySelectorAll(".opt").forEach(b => b.onclick = () => gradeQuiz(q, b.dataset.v, li));
    const btn = li.querySelector("[data-check]");
    if (btn) btn.onclick = () => gradeQuiz(q, document.getElementById(`in-${q.id}`).value, li);
    // restore
    if (saved[q.id]) showFeedback(q, saved[q.id].val, saved[q.id].ok, li, true);
  });
  refreshQuizScore();
  document.getElementById("btn-quiz-reset").onclick = () => {
    Store.del(K.quiz); Store.del(K.errors);
    document.querySelectorAll(".quiz-item").forEach(li => li.classList.remove("correct","wrong"));
    document.querySelectorAll(".feedback").forEach(f => { f.className="feedback"; f.innerHTML=""; });
    document.querySelectorAll(".opt").forEach(b => b.classList.remove("btn-correct","btn-wrong"));
    refreshQuizScore(); renderErrorLog(); updateProgressStrip();
  };
}
function gradeQuiz(q, val, li, silent=false) {
  const ok = isCorrect(q, val);
  const saved = Store.get(K.quiz, {}); saved[q.id] = { val: String(val), ok }; Store.set(K.quiz, saved);
  // Auto error-log
  const log = Store.get(K.errors, {});
  if (!ok) log[q.id] = { your: String(val), correct: Array.isArray(q.options)? q.options[q.answer] : q.answer, impact: q.bandNote };
  else delete log[q.id];
  Store.set(K.errors, log);
  showFeedback(q, val, ok, li); refreshQuizScore(); renderErrorLog(); updateProgressStrip();
}
function showFeedback(q, val, ok, li, restored=false) {
  li.classList.toggle("correct", ok); li.classList.toggle("wrong", !ok);
  const correctText = q.type==="mcq" ? q.options[q.answer] : q.answer;
  const fb = li.querySelector(".feedback");
  fb.className = `feedback show ${ok?"ok":"no"}`;
  fb.innerHTML = `${ok?"✅ <strong>Correct.</strong>":"❌ <strong>Not yet.</strong> Correct: <strong>${correctText}</strong>."}
    <br>${q.explanation}<p class="band-note">📊 ${q.bandNote}</p>`;
  li.querySelectorAll(".opt").forEach(b => {
    const v = Number(b.dataset.v);
    b.classList.toggle("btn-correct", v === q.answer);
    b.classList.toggle("btn-wrong", !ok && String(v) === String(val));
  });
}
function refreshQuizScore() {
  const saved = Store.get(K.quiz, {});
  const n = DATA.quiz.length, answered = Object.keys(saved).length;
  const right = Object.values(saved).filter(s => s.ok).length;
  const pct = answered ? Math.round(right / n * 100) : 0;
  document.getElementById("quiz-score").textContent = answered ? `Score: ${right}/${n} (${pct}%)` : "Score: —";
  document.getElementById("quiz-band").textContent = answered ? `Est. band: ${bandFromPct(pct)}` : "Est. band: —";
  document.getElementById("dash-quiz").textContent = answered ? `${right}/${n} → ${bandFromPct(pct)}` : "—";
  updateDashBand();
}

/* ---------- 6. Practice (L1/L2/L3 + speaking) ---------- */
function wordCount(t){ return (t.trim().match(/\S+/g) || []).length; }
function countRelatives(t){
  const m = t.match(/\b(who|which|that|whose|whom|where|when)\b/gi) || [];
  const red = t.match(/\b\w+(ed|ing)\b\s+(from|in|by|using|collected|produced|affecting)/gi) || [];
  return m.length + red.length;
}
function bindCounter(id, countId, extra=null){
  const ta = document.getElementById(id);
  ta.value = Store.get(K.drafts, {})[id] || "";
  const upd = () => {
    const n = wordCount(ta.value);
    const d = Store.get(K.drafts, {}); d[id] = ta.value; Store.set(K.drafts, d);
    if (extra) extra(n); else document.getElementById(countId).textContent = `${n} words`;
  };
  ta.addEventListener("input", upd); upd();
}
function renderPractice() {
  // L1 gap-fill
  document.getElementById("l1-list").innerHTML = "";
  DATA.practice.level1.forEach(g => {
    const d = document.createElement("div"); d.className = "quiz-item";
    d.innerHTML = `<p><strong>${g.id}</strong> · ${g.sentence.replace("___","<strong>___</strong>")}</p>
      <div class="row">${g.bank.map(w=>`<button class="opt" data-w="${w}">${w}</button>`).join("")}
      <button class="btn btn-ghost" data-hint>💡 Hint</button></div>
      <div class="feedback" aria-live="polite"></div><p class="muted small hint-text" style="display:none">💡 ${g.hint}</p>`;
    const fb = d.querySelector(".feedback");
    d.querySelectorAll("[data-w]").forEach(b => b.onclick = () => {
      const ok = norm(b.dataset.w) === norm(g.answer);
      d.classList.toggle("correct", ok); d.classList.toggle("wrong", !ok);
      fb.className = `feedback show ${ok?"ok":"no"}`;
      fb.textContent = ok ? `✅ Correct — “${g.answer}”.` : `❌ Try again. Hint available below.`;
    });
    d.querySelector("[data-hint]").onclick = e => {
      const h = d.querySelector(".hint-text"); h.style.display = h.style.display==="none"?"block":"none";
    };
    document.getElementById("l1-list").appendChild(d);
  });
  // L2 controlled writing
  const l2 = document.getElementById("l2-list"); l2.innerHTML = "";
  DATA.practice.level2.forEach(t => {
    const d = document.createElement("div"); d.className = "quiz-item";
    d.innerHTML = `<strong>${t.title}</strong><p class="muted">${t.brief}</p>
      <p class="small"><em>Starter: ${t.starter}</em></p>
      <textarea rows="5" id="ta-${t.id}" placeholder="Write ~${t.targetWords} words…"></textarea>
      <div class="row"><span class="pill" id="wc-${t.id}">0 words</span><span class="pill">target ~${t.targetWords}</span></div>`;
    l2.appendChild(d);
    bindCounter(`ta-${t.id}`, `wc-${t.id}`, n => {
      document.getElementById(`wc-${t.id}`).textContent = `${n} words · target ~${t.targetWords}`;
    });
  });
  // L3
  const L3 = DATA.practice.level3;
  document.getElementById("l3-box").innerHTML = `<p><strong>${L3.title}</strong><br>${L3.prompt}</p>`;
  document.getElementById("l3-checklist").innerHTML =
    DATA.selfAssessment.checklist.map(c=>`<li>${c}</li>`).join("");
  bindCounter("l3-text", "l3-count", n => {
    const c = countRelatives(document.getElementById("l3-text").value);
    document.getElementById("l3-count").textContent = `${n} words · target ~${L3.targetWords}`;
    document.getElementById("l3-clause-count").textContent = `${c} relative clauses detected`;
  });
  document.getElementById("l3-clear").onclick = () => { document.getElementById("l3-text").value=""; document.getElementById("l3-text").dispatchEvent(new Event("input")); };
  // Speaking
  const sp = document.getElementById("speaking-list"); sp.innerHTML = "";
  DATA.practice.speaking.forEach(s => {
    const d = document.createElement("article"); d.className = "speak-card"; d.tabIndex = 0;
    d.innerHTML = `<span class="pill">${s.part}</span> <strong>${s.prompt}</strong>
      <br><button class="btn btn-ghost" style="margin-top:.5rem">Show model + upgrade</button>
      <p class="model">🎙 <em>${s.model}</em></p><p class="upgrade">🚀 ${s.upgrade}</p>`;
    const toggle = () => d.classList.toggle("open");
    d.querySelector("button").onclick = toggle;
    d.addEventListener("keydown", e => { if (e.key==="Enter"||e.key===" "){ e.preventDefault(); toggle(); } });
    sp.appendChild(d);
  });
}

/* ---------- 7. Exercises ---------- */
function renderExercises() {
  // A: transformation
  const tl = document.getElementById("trans-list"); tl.innerHTML = "";
  DATA.exercises.transformation.forEach(t => {
    const d = document.createElement("div"); d.className = "quiz-item";
    d.innerHTML = `<p><strong>${t.id}</strong> · Simple: <em>${t.simple}</em></p>
      <div class="row"><input type="text" placeholder="Rewrite as one complex sentence…" aria-label="${t.id} answer">
      <button class="btn btn-primary">Check</button><button class="btn btn-ghost" data-model>Show model</button></div>
      <div class="feedback" aria-live="polite"></div>`;
    const inp = d.querySelector("input"), fb = d.querySelector(".feedback");
    d.querySelector(".btn-primary").onclick = () => {
      // accept if key content words overlap with model
      const key = t.model.toLowerCase().replace(/[^a-z ]/g,"").split(" ").filter(w=>w.length>3);
      const got = inp.value.toLowerCase();
      const hits = key.filter(w => got.includes(w)).length;
      const ok = hits >= Math.min(3, key.length - 1) && /who|which|that|whose|where|when|\b\w+(ed|ing)\b/.test(got);
      fb.className = `feedback show ${ok?"ok":"no"}`;
      fb.innerHTML = ok ? `✅ Good — contains the target clause. Compare: <em>${t.model}</em>`
                        : `❌ Not yet — aim for the key clause. <button class="btn btn-ghost" data-m>Reveal model</button>`;
      const r = fb.querySelector("[data-m]"); if (r) r.onclick = () => { fb.innerHTML = `Model: <em>${t.model}</em>`; };
    };
    d.querySelector("[data-model]").onclick = () => { fb.className="feedback show ok"; fb.innerHTML=`Model: <em>${t.model}</em>`; };
    tl.appendChild(d);
  });
  // B: error correction
  const el = document.getElementById("err-list"); el.innerHTML = "";
  DATA.exercises.errorCorrection.forEach(e => {
    const d = document.createElement("div"); d.className = "quiz-item";
    d.innerHTML = `<p><span class="pill">${e.task}</span> <strong>${e.id}</strong> · <em>${e.faulty}</em></p>
      <div class="row"><input type="text" placeholder="Type the corrected sentence…" aria-label="${e.id} fix">
      <button class="btn btn-primary">Check</button></div><div class="feedback" aria-live="polite"></div>`;
    const fb = d.querySelector(".feedback");
    d.querySelector(".btn-primary").onclick = () => {
      const ok = norm(d.querySelector("input").value).includes(norm(e.fixed).split(" ").slice(0,3).join(" ")) &&
                 !norm(d.querySelector("input").value).includes(norm(e.faulty).split(" ").find(w=>!norm(e.fixed).includes(w)) || "§§§");
      const pass = norm(d.querySelector("input").value).includes(norm(e.fixed).split(" ").slice(-2).join(" ")) || ok;
      fb.className = `feedback show ${pass?"ok":"no"}`;
      fb.innerHTML = `${pass?"✅":"❌"} Fixed: <strong>${e.fixed}</strong><p class="band-note">📊 ${e.note}</p>`;
    };
    el.appendChild(d);
  });
  // C: free production counter
  bindCounter("free-text", "free-count", n => {
    document.getElementById("free-count").textContent = `${n} words · target 80–120`;
  });
  document.getElementById("free-clear").onclick = () => { document.getElementById("free-text").value=""; document.getElementById("free-text").dispatchEvent(new Event("input")); };
}

/* ---------- 8. Tracker ---------- */
function renderTracker() {
  // Confidence sliders
  const conf = Store.get(K.conf, {});
  const cl = document.getElementById("conf-list"); cl.innerHTML = "";
  DATA.selfAssessment.confidenceRules.forEach(r => {
    const v = conf[r.id] ?? 3;
    const d = document.createElement("div"); d.className = "conf-row";
    d.innerHTML = `<label for="rg-${r.id}"><strong>${r.rule}</strong> — <span id="v-${r.id}">${v}/5</span></label>
      <input type="range" id="rg-${r.id}" min="1" max="5" step="1" value="${v}" aria-label="${r.rule} confidence">
      <p class="muted small">${r.bandMap}</p>`;
    d.querySelector("input").addEventListener("input", e => {
      const c = Store.get(K.conf, {}); c[r.id] = Number(e.target.value); Store.set(K.conf, c);
      document.getElementById(`v-${r.id}`).textContent = `${e.target.value}/5`;
      refreshDash(); updateProgressStrip();
    });
    cl.appendChild(d);
  });
  // Checklist
  const chk = Store.get(K.check, {});
  const bl = document.getElementById("band-checklist"); bl.innerHTML = "";
  DATA.selfAssessment.checklist.forEach((c, i) => {
    const id = `chk${i}`;
    const lab = document.createElement("label"); lab.className = "check-row";
    lab.innerHTML = `<input type="checkbox" ${chk[id]?"checked":""}> <span>${c}</span>`;
    lab.querySelector("input").addEventListener("change", e => {
      const s = Store.get(K.check, {}); s[id] = e.target.checked; Store.set(K.check, s);
      refreshDash(); updateProgressStrip();
    });
    bl.appendChild(lab);
  });
  // Notes
  const nt = document.getElementById("note-text");
  nt.value = Store.get(K.notes, "");
  nt.addEventListener("input", () => Store.set(K.notes, nt.value));
  document.getElementById("btn-wipe").onclick = () => {
    if (!confirm("Erase all saved progress on this device?")) return;
    Object.values(K).forEach(Store.del); location.reload();
  };
  renderErrorLog(); refreshDash();
}
function renderErrorLog() {
  const log = Store.get(K.errors, {});
  const tb = document.getElementById("errlog-body");
  const ids = Object.keys(log);
  document.getElementById("dash-err").textContent = ids.length;
  tb.innerHTML = ids.length ? ids.map(id => `<tr><td>${id}</td><td>${log[id].your || "—"}</td>
    <td>${log[id].correct}</td><td class="small">${log[id].impact}</td>
    <td><button class="btn btn-ghost" data-del="${id}">Resolve</button></td></tr>`).join("")
    : `<tr><td colspan="5" class="muted">No errors logged — great! Mistakes from the quiz appear here with band impact.</td></tr>`;
  tb.querySelectorAll("[data-del]").forEach(b => b.onclick = () => {
    const l = Store.get(K.errors, {}); delete l[b.dataset.del]; Store.set(K.errors, l);
    renderErrorLog(); refreshDash();
  });
}
function refreshDash() {
  const c = Object.values(Store.get(K.conf, {}));
  const avg = c.length ? (c.reduce((a,b)=>a+b,0)/c.length) : 0;
  document.getElementById("dash-conf").textContent = c.length ? `${avg.toFixed(1)}/5` : "—";
  const chk = Object.values(Store.get(K.check, {})).filter(Boolean).length;
  document.getElementById("dash-check").textContent = `${chk}/7`;
  updateDashBand();
}
function updateDashBand() {
  // Heuristic estimate: 60% quiz + 25% confidence + 15% checklist
  const saved = Store.get(K.quiz, {});
  const n = DATA?.quiz.length || 14, right = Object.values(saved).filter(s=>s.ok).length;
  const quizPts = (right / n) * 9;
  const c = Object.values(Store.get(K.conf, {}));
  const confPts = c.length ? (c.reduce((a,b)=>a+b,0)/c.length/5)*9 : 4.5;
  const chkPts = (Object.values(Store.get(K.check, {})).filter(Boolean).length/7)*9;
  const est = Object.keys(saved).length ? (quizPts*.6 + confPts*.25 + chkPts*.15) : 0;
  const el = document.getElementById("dash-band");
  el.textContent = Object.keys(saved).length ? est.toFixed(1) : "—";
}

/* ---------- 9. Reference ---------- */
function renderReference() {
  document.getElementById("summary-list").innerHTML =
    DATA.reference.summary.map(s=>`<li>${s}</li>`).join("");
  document.getElementById("colloc-body").innerHTML =
    DATA.reference.collocations.map(c=>`<span class="chip">${c}</span>`).join("");
  document.getElementById("pit-list").innerHTML = DATA.reference.pitfalls.map(p=>`
    <div class="quiz-item"><p>✘ <s>${p.wrong}</s><br>✔ <strong>${p.right}</strong></p>
    <p class="band-note">📊 Band consequence: ${p.impact}</p></div>`).join("");
  const t = document.getElementById("colloc-toggle"), b = document.getElementById("colloc-body");
  t.onclick = () => { const open = b.style.display !== "none";
    b.style.display = open ? "none" : "flex"; t.setAttribute("aria-expanded", !open);
    t.textContent = `${open?"▸":"▾"} Quick reference card — high-frequency academic collocations`; };
}

/* ---------- Boot ---------- */
(async function init(){
  try {
    initChrome();
    await loadData();
    renderOverview(); renderQuiz(); renderPractice(); renderExercises(); renderTracker(); renderReference();
    refreshQuizScore(); updateProgressStrip();
  } catch (e) {
    document.getElementById("overview-intro").textContent =
      "⚠ Could not load data.json. Open this folder via a local server (e.g. VS Code Live Server) or keep all 4 files together: " + e.message;
  }
})();
