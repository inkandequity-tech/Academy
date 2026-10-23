// Builds a single self-contained HTML preview of the Academy for sharing as a link.
// Includes the public outline, faculty, fees, FAQ, a sample certificate, and Module 1 in full
// (notes and quiz). Paid lesson notes and the final exam bank are deliberately NOT included.
//   node --conditions=react-server --experimental-strip-types scripts/build-preview.ts <out.html>
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { MODULES, ALL_LESSONS, TOTAL_LESSONS, TOTAL_MINUTES, lessonKey } from "../content/outline.ts";
import { NOTES } from "../content/notes.ts";
import { QUIZZES } from "../content/questions.ts";
import { FACULTY } from "../content/faculty.ts";

const require = createRequire(import.meta.url);
const QRCode = require("qrcode");

const ROOT = new URL("..", import.meta.url).pathname;
const out = process.argv[2] || "preview.html";

const NAME = "Ink & Equity Academy";
const COURSE = "The Courtroom Practice Course";
const PRICE = "₹4,999";
const EMAIL = "ChamberLko@gmail.com";
const PHONE = "+91 9450 72 7289";
const RULES = { examQuestions: 30, examMinutes: 45, examPass: 21, attempts: 3 };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const photo = (id: string) => "data:image/webp;base64," + readFileSync(`${ROOT}public/faculty/${id}.webp`).toString("base64");
const fac = (id: string) => FACULTY.find((f) => f.id === id)!;
const leads = (m: (typeof MODULES)[number]) => m.leads.map((id) => fac(id).name).join(" and ");
const mins = (m: (typeof MODULES)[number]) => m.lessons.reduce((a, l) => a + l.minutes, 0);
const hours = (n: number) => { const h = Math.floor(n / 60), r = n % 60; return h ? `${h} h${r ? ` ${r} min` : ""}` : `${r} min`; };
const lid = (m: string, l: string) => `l-${m}--${l}`;
const LOGO = `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6 58 32 32 58 6 32Z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="4 5"/><path d="M32 17 47 32 32 47 17 32Z" fill="var(--accent)"/><circle cx="32" cy="32" r="4.2" fill="var(--warm)"/></svg>`;
const CERT_LOGO = `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6 58 32 32 58 6 32Z" fill="none" stroke="#0a0f2e" stroke-width="2.4" stroke-dasharray="4 5"/><path d="M32 17 47 32 32 47 17 32Z" fill="#2a3fd0"/><circle cx="32" cy="32" r="4.2" fill="#c7801f"/></svg>`;

function prose(text: string) {
  return text.split(/\n\s*\n/).map((b) => {
    const lines = b.trim().split("\n");
    const intro = lines.filter((l) => !l.startsWith("- "));
    const items = lines.filter((l) => l.startsWith("- ")).map((l) => `<li>${esc(l.slice(2))}</li>`);
    return (intro.length ? `<p>${esc(intro.join(" "))}</p>` : "") + (items.length ? `<ul>${items.join("")}</ul>` : "");
  }).join("");
}

function board(title: string) {
  const rows = MODULES.map((m) => `<li><a class="item" href="#m-${m.slug}">
<span class="item-no">${m.number}</span>
<span class="item-title">${esc(m.title)}<small>${esc(m.summary)}</small></span>
<span class="item-before">${esc(leads(m))}</span>
<span class="item-stage">${m.free ? `<span class="tag free">Free to all</span>` : hours(mins(m))}</span></a></li>`).join("");
  return `<section class="board" aria-label="Course cause list">
<div class="board-head"><h2>${esc(title)}</h2><p>${MODULES.length} items, ${TOTAL_LESSONS} lessons, about ${Math.round(TOTAL_MINUTES / 60)} hours of hearing</p></div>
<div class="board-cols" aria-hidden="true"><span>Item</span><span>Matter</span><span>Before</span><span class="r">Listed for</span></div>
<ol>${rows}</ol>
<div class="board-foot"><span>Final examination and certificate follow item ${MODULES.length}.</span><span>Taught by the advocates of Ink &amp; Equity, Lucknow</span></div></section>`;
}

const facultyCards = (list: typeof FACULTY, withLeads: boolean) => `<div class="faculty-grid">${list.map((f) => {
  const led = MODULES.filter((m) => m.leads.includes(f.id));
  return `<article class="faculty-card"><div class="arch"><img src="${photo(f.id)}" alt="Portrait of ${esc(f.name)}" width="480" height="600" loading="lazy"></div>
<h3>${esc(f.name)}</h3><p class="muted">${esc(f.role)}</p>${withLeads ? `<p class="small">${esc(f.focus)}</p>${led.length ? `<p class="small">Leads ${led.map((m) => `<a class="link" href="#m-${m.slug}">item ${m.number}</a>`).join(", ")}</p>` : ""}` : ""}</article>`;
}).join("")}</div>`;

// ---------------------------------------------------------------- views
const views: Record<string, string> = {};

views.home = `<section class="hero"><div class="hero-grid">
<div><p class="kicker">${NAME}, Lucknow</p><h1 class="display">Learn practice the way the court hears it.</h1></div>
<div><p class="lede">A self-paced course for junior advocates in Uttar Pradesh. Thirteen modules of civil, criminal and writ practice, from the first vakalatnama to execution and appeal, taught by the advocates of Ink &amp; Equity.</p>
<div class="actions"><a class="btn solid" href="#m-${MODULES[0].slug}">Start the free module</a><a class="btn" href="#fees">Fees and enrolment</a></div></div>
</div></section>
${board(`Cause list: ${COURSE}`)}
<section class="section"><h2>How the course works</h2><ol class="steps">
<li><h3>Watch and read</h3><p>Each lesson is a short video with written notes and the provisions and cases it relies on.</p></li>
<li><h3>Do the task</h3><p>Every lesson ends with a drafting or research task taken from real chamber work.</p></li>
<li><h3>Pass the module quiz</h3><p>Four questions per module. Pass three to clear it, and retake as often as you need.</p></li>
<li><h3>Sit the final exam</h3><p>${RULES.examQuestions} questions in ${RULES.examMinutes} minutes. Score 70% to receive a certificate anyone can verify.</p></li>
</ol></section>
<section class="section rule two-wide"><div><h2>Who it is for</h2><p class="lede">Advocates in their first five years, and final-year law students who want to walk into a chamber ready to draft.</p></div>
<ul class="checks"><li>You know the bare acts but not yet the order of a working day in court.</li><li>You want to draft a plaint, a bail application or a writ petition that a senior corrects rather than rewrites.</li><li>You practise, or plan to practise, in the district courts of U.P. and at the Lucknow Bench of the Allahabad High Court.</li><li>You are learning the BNSS and the Bharatiya Sakshya Adhiniyam alongside the old codes.</li></ul></section>
<section class="section rule"><h2>Faculty</h2><p class="lede">Each module is led by an advocate of Ink &amp; Equity who works in that area. Guest advocates join for selected lessons.</p>${facultyCards(FACULTY.slice(0, 4), false)}<div class="actions"><a class="btn" href="#faculty">All faculty</a></div></section>
<section class="section rule two"><div><h2>One fee, the whole course</h2><p class="fee">${PRICE}</p><p class="muted">One payment, GST included. Module 1 is free and needs no payment. Pay by UPI, card or net banking through Razorpay.</p><div class="actions"><a class="btn warm" href="#fees">Enrol in the full course</a></div></div>
<div><h2>A certificate that can be checked</h2><p>Every certificate carries a unique number and a QR code. A senior, a chamber or an employer can confirm it on the <a class="link" href="#verify">verification page</a> in a few seconds.</p><p class="muted">The certificate records that you completed this course and passed its examination. It is not a degree or a Bar Council qualification.</p><a class="btn" href="#certificate">See a sample certificate</a></div></section>`;

views.course = `<section class="page-head"><h1>The syllabus</h1><p class="lede">${MODULES.length} modules, ${TOTAL_LESSONS} lessons and about ${hours(TOTAL_MINUTES)} of teaching, in the order a matter moves through the courts. Module 1 is free. The rest open on enrolment.</p></section>
${board(`Cause list: ${COURSE}`)}
<section class="section two"><div><h2>The final examination</h2><p>After the last module you sit one timed examination of ${RULES.examQuestions} questions drawn from every module. You have ${RULES.examMinutes} minutes and ${RULES.attempts} attempts. A score of ${RULES.examPass} or more issues your certificate at once.</p></div>
<div><h2>What you need first</h2><ul class="checks"><li>Every lesson marked complete</li><li>Every module quiz passed (three of four correct)</li><li>Your full name on your profile, as it should read on the certificate</li></ul></div></section>`;

for (const m of MODULES) {
  const next = MODULES.find((x) => x.number === m.number + 1);
  const rows = m.lessons.map((l, i) => `<li><a class="index-row" href="#${lid(m.slug, l.slug)}"><span class="index-no">${m.number}.${i + 1}</span><span class="index-title">${esc(l.title)}<small>${esc(l.summary)}</small></span><span class="index-meta" data-done="${lessonKey(m.slug, l.slug)}">${m.free ? `${l.minutes} min` : `<span class="tag lock">Enrol to open</span>`}</span></a></li>`).join("");
  const quizRow = `<li><a class="index-row" href="#${m.free ? `q-${m.slug}` : "fees"}"><span class="index-no">Q</span><span class="index-title">Module quiz<small>Four questions. Three correct clears the module.</small></span><span class="index-meta">${m.free ? "4 questions" : `<span class="tag lock">Enrol to open</span>`}</span></a></li>`;
  views[`m-${m.slug}`] = `<section class="page-head"><nav class="crumbs"><a href="#course">Syllabus</a><span aria-hidden="true">/</span><span>Item ${m.number}</span></nav>
<p class="kicker">Item ${m.number} of ${MODULES.length}${m.free ? ", free to all" : ""}</p><h1>${esc(m.title)}</h1><p class="lede">${esc(m.summary)}</p><p class="muted">Before ${esc(leads(m))}. ${m.lessons.length} lessons, ${hours(mins(m))}.</p></section>
<section class="two-wide"><div class="minw"><ol class="index">${rows}${quizRow}</ol></div>
<aside class="panel"><h2 class="h-sm">Module lead${m.leads.length > 1 ? "s" : ""}</h2>${m.leads.map((id) => { const f = fac(id); return `<div class="lead"><div class="arch mini"><img src="${photo(f.id)}" alt="" width="64" height="80"></div><div><b>${esc(f.name)}</b><br><span class="muted small">${esc(f.role)}</span></div></div>`; }).join("")}
${m.free ? "" : `<p class="muted small">This module opens when you enrol in the full course, ${PRICE} once.</p><a class="btn warm small" href="#fees">Enrol</a>`}
${next ? `<p class="small">Next on the board: <a class="link" href="#m-${next.slug}">${next.number}. ${esc(next.title)}</a></p>` : `<p class="small">Next: <a class="link" href="#course">the final examination</a></p>`}</aside></section>`;
}

ALL_LESSONS.forEach((l, flat) => {
  const m = l.module;
  const i = m.lessons.findIndex((x) => x.slug === l.slug);
  const prev = ALL_LESSONS[flat - 1], next = ALL_LESSONS[flat + 1];
  const key = lessonKey(m.slug, l.slug);
  const side = `<aside class="lesson-side"><h2 class="h-sm">${m.number}. ${esc(m.title)}</h2><ul class="side-list">${m.lessons.map((x, j) => `<li><a href="#${lid(m.slug, x.slug)}"${x.slug === l.slug ? ' aria-current="page"' : ""}><span class="dot" data-dot="${lessonKey(m.slug, x.slug)}"></span><span>${m.number}.${j + 1} ${esc(x.title)}</span></a></li>`).join("")}<li><a href="#${m.free ? `q-${m.slug}` : "fees"}"><span class="dot" data-dot="quiz:${m.slug}"></span><span>Module quiz</span></a></li></ul></aside>`;
  let body: string;
  if (m.free) {
    const n = NOTES[key];
    body = `<div class="video empty"><p>The video for this lesson is being recorded. The notes below cover the full lesson.</p></div>
<div class="note"><p>Draft notes, awaiting review by the module lead. Check every provision against the current bare act before you rely on it.</p></div>
<div class="prose">${prose(n.body)}</div><div class="task"><h2>In chambers</h2><p>${esc(n.task)}</p></div>
<div class="actions"><button type="button" class="btn solid" data-complete="${key}" id="done-${m.slug}-${l.slug}">Mark complete</button><span class="muted small" data-status="${key}"></span></div>`;
  } else {
    body = `<div class="panel lockpanel"><h2 class="h-md">This lesson opens on enrolment</h2><p>Module ${m.number} is part of the full course. One payment of ${PRICE} opens all ${TOTAL_LESSONS} lessons, the quizzes and the final examination.</p><div class="actions"><a class="btn warm" href="#fees">Enrol in the full course</a><a class="btn" href="#m-${MODULES[0].slug}">Try the free module</a></div></div>`;
  }
  const end = i === m.lessons.length - 1;
  views[lid(m.slug, l.slug)] = `<section class="page-head lesson-layout"><article class="minw"><nav class="crumbs"><a href="#course">Syllabus</a><span aria-hidden="true">/</span><a href="#m-${m.slug}">${m.number}. ${esc(m.title)}</a></nav>
<p class="kicker">Lesson ${m.number}.${i + 1}, ${l.minutes} minutes, before ${esc(leads(m))}</p><h1 class="h-lesson">${esc(l.title)}</h1><p class="lede">${esc(l.summary)}</p>${body}
<nav class="pager">${prev ? `<a href="#${lid(prev.module.slug, prev.slug)}"><small>Previous</small><span>${esc(prev.title)}</span></a>` : "<span></span>"}${end ? `<a class="r" href="#${m.free ? `q-${m.slug}` : "fees"}"><small>End of module</small><span>Take the module quiz</span></a>` : next ? `<a class="r" href="#${lid(next.module.slug, next.slug)}"><small>Next</small><span>${esc(next.title)}</span></a>` : "<span></span>"}</nav></article>${side}</section>`;
});

// Free module quiz (answers for Module 1 only; the exam bank is not in this page).
const freeQuiz: Record<string, { id: string; prompt: string; options: string[]; answer: number; explain: string }[]> = {};
for (const m of MODULES.filter((x) => x.free)) {
  freeQuiz[m.slug] = QUIZZES[m.slug];
  views[`q-${m.slug}`] = `<section class="page-head narrow"><nav class="crumbs"><a href="#course">Syllabus</a><span aria-hidden="true">/</span><a href="#m-${m.slug}">${m.number}. ${esc(m.title)}</a><span aria-hidden="true">/</span><span>Quiz</span></nav>
<h1 class="h-lesson">Quiz: ${esc(m.title)}</h1><p class="lede">Four questions. Three correct clears the module. You can retake it as often as you need; the answers are explained after you submit.</p>
<form class="quiz" data-quiz="${m.slug}" id="quiz-${m.slug}"></form></section>`;
}

views.faculty = `<section class="page-head"><h1>Faculty</h1><p class="lede">The course is taught by the advocates of Ink &amp; Equity, a practice at 1, Moti Mahal Marg, Hazratganj, Lucknow. Each leads the modules closest to their own work. Guest advocates join for selected lessons.</p></section>
${facultyCards(FACULTY, true)}<section class="section tight"><h2 class="h-md">Guest advocates</h2><p class="muted">Guest lessons by senior advocates of the Allahabad High Court and the district courts will be announced here.</p></section>`;

views.fees = `<section class="page-head"><h1>Fees and enrolment</h1><p class="lede">One payment opens the whole course. There are no instalments, renewals or charges for the certificate.</p></section>
<section class="two"><div class="panel"><h2 class="h-md">${COURSE}</h2><p class="fee">${PRICE}</p><p class="muted">GST included. Paid once through Razorpay by UPI, debit or credit card, or net banking.</p>
<ul class="checks"><li>All ${MODULES.length} modules and ${TOTAL_LESSONS} lessons, with video and written notes</li><li>A drafting or research task with every lesson</li><li>${MODULES.length} module quizzes, with explanations</li><li>The final examination: ${RULES.examQuestions} questions, ${RULES.examMinutes} minutes, up to ${RULES.attempts} attempts</li><li>A certificate with a unique number and QR code, verifiable online</li><li>Access for as long as the course is offered, including revised lessons</li></ul>
<button type="button" class="btn warm" disabled aria-disabled="true">Pay ${PRICE} and enrol</button><p class="muted small">Online payment opens when the Academy goes live. To be told when it does, write to <span class="copy">${EMAIL}</span>.</p></div>
<div class="minw"><h2 class="h-md">Before you pay</h2><p>Take <a class="link" href="#m-${MODULES[0].slug}">Module 1</a> first. It is free, it is the same format as the rest, and it will tell you whether the course suits you.</p>
<h3>Refunds</h3><p class="muted">You can ask for a full refund within 7 days of paying, if you have not started the final examination. After that, the fee is not refundable.</p>
<h3>Paying another way</h3><p class="muted">If you cannot pay online, write to ${EMAIL}. The Academy can enrol you by hand once a payment is received.</p>
<h3>What the certificate is</h3><p class="muted">It records that you completed this course and passed its examination. It is not a degree, a diploma recognised by a university, or a Bar Council qualification. <a class="link" href="#certificate">See a sample</a>.</p></div></section>`;

const FAQ: [string, string][] = [
  ["Who is the course for?", "Advocates in their first five years of practice and final-year law students. It assumes you have read the main statutes and teaches how they are used in court."],
  ["Is it only for Uttar Pradesh?", "The procedure under the CPC, BNSS and the Sakshya Adhiniyam applies across India. The examples, forums and state amendments are from Uttar Pradesh, and the High Court lessons follow practice at the Lucknow Bench."],
  ["Does it cover the new criminal laws?", "Yes. The criminal modules teach the Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita and Bharatiya Sakshya Adhiniyam, with the old CrPC and Evidence Act numbers alongside, because cases begun before 1 July 2024 still run under the old codes."],
  ["How long does it take?", "About twelve hours of lessons, plus the tasks. Most learners finish in four to eight weeks at a few hours a week. There is no deadline."],
  ["What does it cost?", `${PRICE} once, GST included. Module 1 is free.`],
  ["How is the certificate earned?", `Complete every lesson, pass each module quiz (three of four), then pass the final examination: ${RULES.examQuestions} questions in ${RULES.examMinutes} minutes, with a pass mark of 70%. You have ${RULES.attempts} attempts.`],
  ["What is the certificate worth?", "It shows that you completed this course and passed its examination, and anyone can check it online. It is not a degree, a university diploma or a Bar Council qualification, and it does not entitle anyone to practise."],
  ["Can I get help with my own case?", "No. The course teaches practice in general terms and the faculty cannot advise on individual matters through it."],
];
views.faq = `<section class="page-head narrow"><h1>Questions</h1><div class="faqs">${FAQ.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
<p class="muted">Anything else? Write to the Academy at <span class="copy">${EMAIL}</span> or call ${PHONE}.</p></section>`;

const qr = await QRCode.toString("https://academy.ieqlaw.com/verify", { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#0a0f2e", light: "#ffffff" } });
views.certificate = `<section class="page-head"><h1 class="h-lesson">Sample certificate</h1><p class="lede">Type a name to see how it prints. Real certificates carry a unique number and a QR code that opens the verification page.</p>
<label class="field" for="cert-name"><span>Name on the certificate</span><input class="input" id="cert-name" value="Your name here" maxlength="60" autocomplete="off"></label></section>
<div class="cert-wrap"><div class="certificate" role="img" aria-label="Sample certificate of completion">
<div class="cert-lattice" aria-hidden="true"></div><div class="cert-stamp" aria-hidden="true">Sample</div>
<div class="cert-inner"><div class="cert-top">${CERT_LOGO}<div class="cert-academy">${NAME}</div><p class="cert-sub">Ink &amp; Equity, 1, Moti Mahal Marg, Hazratganj, Lucknow</p></div>
<div><div class="cert-title">Certificate of completion</div><p class="cert-certifies">This certifies that</p><div class="cert-name" id="cert-name-out">Your name here</div>
<p class="cert-body">completed all ${MODULES.length} modules and ${TOTAL_LESSONS} lessons of ${COURSE}, in civil, criminal and writ practice before the courts of Uttar Pradesh, and passed its final examination.</p></div>
<div class="cert-foot"><div class="sig"><b>Rishabh Raj</b>Founding partner, Ink &amp; Equity</div><div class="cert-seal">Issued<br>24 October 2026</div><div class="sig r"><b>Vedant Bhargav</b>Managing partner, Ink &amp; Equity</div></div>
<div class="cert-base"><p class="cert-code">Certificate IEQA-2026-SAMP-LE00. Check it at academy.ieqlaw.com/verify.<br>A course certificate; not a degree or a Bar Council qualification.</p><div class="cert-qr">${qr}</div></div></div></div></div>`;

views.verify = `<section class="page-head narrow"><h1>Verify a certificate</h1><p class="lede">Enter the number printed at the foot of the certificate, or scan its QR code. You will see the name it was issued to and the date.</p>
<form id="verify-form"><label class="field" for="verify-code"><span>Certificate number</span><input class="input" id="verify-code" placeholder="IEQA-2026-XXXX-XXXX" autocapitalize="characters" spellcheck="false" required></label><button class="btn solid">Check this number</button></form>
<div id="verify-out" class="result" hidden></div></section>`;

// ---------------------------------------------------------------- page
const nav = [["home", "Home"], ["course", "Syllabus"], ["faculty", "Faculty"], ["fees", "Fees"], ["verify", "Verify"], ["faq", "Questions"]];
const html = `<title>Ink &amp; Equity Academy</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..700,0..100,0..1&family=Instrument+Sans:wght@400..700&display=swap">
<style>${readFileSync(new URL("./preview.css", import.meta.url), "utf8")}</style>
<header class="site-header"><div class="bar">
<a class="logo" href="#home" aria-label="${NAME}, home">${LOGO}<span><b>${NAME}</b><small>Courtroom practice for junior advocates</small></span></a>
<button class="icon-btn menu-btn" type="button" id="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg></button>
<nav class="nav" id="nav" aria-label="Main">${nav.map(([k, t]) => `<a href="#${k}" data-nav="${k}">${t}</a>`).join("")}</nav>
</div></header>
<div class="preview-bar"><p>Preview. You can read the syllabus, all of Module 1 and take its quiz. Sign-in, payment and the final examination go live on the Academy's own site.</p></div>
<main id="main">${Object.entries(views).map(([k, v]) => `<div class="view" id="v-${k}" data-view="${k}"${k === "home" ? "" : " hidden"}>${v}</div>`).join("\n")}</main>
<footer class="site-footer"><div class="foot">
<div><h2>${NAME}</h2><p class="muted small">Taught by the advocates of Ink &amp; Equity, Lucknow.</p><p class="muted small">1, Moti Mahal Marg, Hazratganj<br>Lucknow, Uttar Pradesh 226001<br><span class="copy">${PHONE}</span><br><span class="copy">${EMAIL}</span></p></div>
<div><h2>The course</h2><ul><li><a href="#course">Syllabus</a></li><li><a href="#m-${MODULES[0].slug}">Free first module</a></li><li><a href="#faculty">Faculty</a></li><li><a href="#fees">Fees</a></li><li><a href="#faq">Questions</a></li><li><a href="#verify">Verify a certificate</a></li><li><a href="#certificate">Sample certificate</a></li></ul></div>
<div><h2>The practice</h2><ul><li><a href="https://ieqlaw.com" target="_blank" rel="noopener">ieqlaw.com</a></li></ul></div></div>
<p class="legal">The course teaches procedure and practice for general learning. It is not legal advice and it does not offer or invite legal services. The certificate records completion of this course; it is not a degree, a Bar Council qualification or a licence to practise. &copy; 2026 Ink &amp; Equity.</p></footer>
<script>const QUIZ=${JSON.stringify(freeQuiz)};
${readFileSync(new URL("./preview.js", import.meta.url), "utf8")}</script>`;

writeFileSync(out, html);
console.log(`wrote ${out}: ${(html.length / 1024).toFixed(0)} KB, ${Object.keys(views).length} views`);
