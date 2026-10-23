// Structural checks on the course content. Run by check-content.mjs.
import { MODULES, ALL_LESSONS, lessonKey } from "../content/outline.ts";
import { NOTES } from "../content/notes.ts";
import { QUIZZES, EXAM_BANK, type Question } from "../content/questions.ts";
import { FACULTY } from "../content/faculty.ts";

const errs: string[] = [];
const ids = new Set<string>();
const faculty = new Set(FACULTY.map((f) => f.id));

function checkQ(q: Question, where: string) {
  if (ids.has(q.id)) errs.push(`duplicate question id ${q.id}`);
  ids.add(q.id);
  if (q.options.length !== 4) errs.push(`${where} ${q.id}: needs 4 options`);
  if (!(q.answer >= 0 && q.answer < q.options.length)) errs.push(`${where} ${q.id}: answer index out of range`);
  if (new Set(q.options).size !== q.options.length) errs.push(`${where} ${q.id}: duplicate options`);
  if (!q.explain) errs.push(`${where} ${q.id}: missing explanation`);
}

MODULES.forEach((m, i) => {
  if (m.number !== i + 1) errs.push(`module ${m.slug}: number ${m.number} out of sequence`);
  m.leads.forEach((l) => faculty.has(l) || errs.push(`module ${m.slug}: unknown lead ${l}`));
  const quiz = QUIZZES[m.slug];
  if (!quiz || quiz.length !== 4) errs.push(`module ${m.slug}: quiz must have 4 questions`);
  quiz?.forEach((q) => checkQ(q, `quiz ${m.slug}`));
});
for (const l of ALL_LESSONS) {
  const k = lessonKey(l.module.slug, l.slug);
  const n = NOTES[k];
  if (!n) errs.push(`lesson ${k}: no notes`);
  else if (n.body.length < 300 || !n.task) errs.push(`lesson ${k}: notes or task too short`);
}
for (const k of Object.keys(NOTES)) if (!ALL_LESSONS.some((l) => lessonKey(l.module.slug, l.slug) === k)) errs.push(`notes ${k}: no such lesson in the outline`);
EXAM_BANK.forEach((q) => checkQ(q, "exam"));
if (EXAM_BANK.length < 30) errs.push("exam bank needs at least 30 questions");
if (!MODULES.some((m) => m.free)) errs.push("at least one module must be free");

if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
console.log(`${MODULES.length} modules, ${ALL_LESSONS.length} lessons, ${Object.values(QUIZZES).flat().length} quiz and ${EXAM_BANK.length} exam questions`);
