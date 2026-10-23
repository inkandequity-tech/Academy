"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { EXAM_BANK, examById } from "@/content/questions";
import { currentUser, examEligibility, learnerState } from "@/lib/learner";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { newCertificateCode } from "@/lib/certificate";
import { RULES } from "@/lib/config";

function pick<T>(arr: T[], n: number) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

function grade(ids: string[], answers: Record<string, number>) {
  let score = 0;
  for (const id of ids) {
    const q = examById(id);
    if (q && answers[id] === q.answer) score++;
  }
  return score;
}

/** Closes attempts left open past their deadline (the browser was closed). They count as used. */
async function closeExpired(userId: string) {
  const db = supabaseAdmin();
  const cutoff = new Date(Date.now() - RULES.examGraceSeconds * 1000).toISOString();
  const { data } = await db.from("exam_attempts").select("id, question_ids, answers").eq("user_id", userId).is("submitted_at", null).lt("deadline", cutoff);
  for (const a of data ?? []) {
    const answers = (a.answers as Record<string, number>) ?? {};
    const score = grade(a.question_ids as string[], answers);
    await db.from("exam_attempts").update({ submitted_at: new Date().toISOString(), score, total: (a.question_ids as string[]).length, passed: false }).eq("id", a.id);
  }
}

export async function startExam() {
  const user = await currentUser();
  if (!user) redirect("/login?next=/exam");
  await closeExpired(user.id);
  const state = await learnerState(user);
  const el = examEligibility(state);
  if (el.openAttempt) redirect(`/exam/${el.openAttempt.id}`);
  if (!el.ok) redirect("/exam");

  const ids = pick(EXAM_BANK, RULES.examQuestions).map((q) => q.id);
  const deadline = new Date(Date.now() + RULES.examMinutes * 60 * 1000).toISOString();
  const { data, error } = await supabaseAdmin().from("exam_attempts").insert({ user_id: user.id, question_ids: ids, deadline }).select("id").single();
  if (error || !data) redirect("/exam?error=start");
  redirect(`/exam/${data.id}`);
}

/** Saves answers as the learner goes, so a dropped connection does not lose them. */
export async function saveExamAnswers(attemptId: string, answers: Record<string, number>) {
  const user = await currentUser();
  if (!user) return { ok: false };
  const db = supabaseAdmin();
  const { data: a } = await db.from("exam_attempts").select("user_id, deadline, submitted_at").eq("id", attemptId).maybeSingle();
  if (!a || a.user_id !== user.id || a.submitted_at) return { ok: false };
  if (Date.now() > new Date(a.deadline).getTime() + RULES.examGraceSeconds * 1000) return { ok: false };
  await db.from("exam_attempts").update({ answers }).eq("id", attemptId);
  return { ok: true };
}

export type ExamOutcome = { ok: true; score: number; total: number; passed: boolean; code: string | null } | { ok: false; error: string };

export async function submitExam(attemptId: string, answers: Record<string, number>): Promise<ExamOutcome> {
  const user = await currentUser();
  if (!user) return { ok: false, error: "Sign in again to submit. Your saved answers are kept until the time runs out." };
  const db = supabaseAdmin();
  const { data: a } = await db.from("exam_attempts").select("*").eq("id", attemptId).maybeSingle();
  if (!a || a.user_id !== user.id) return { ok: false, error: "This attempt belongs to another account." };
  if (a.submitted_at) return { ok: false, error: "This attempt has already been submitted." };

  const late = Date.now() > new Date(a.deadline).getTime() + RULES.examGraceSeconds * 1000;
  // A late submission is marked on the answers saved before the deadline, not the ones sent now.
  const final: Record<string, number> = late ? ((a.answers as Record<string, number>) ?? {}) : answers;
  const ids = a.question_ids as string[];
  const score = grade(ids, final);
  const total = ids.length;
  const passed = score >= Math.ceil(total * RULES.examPassRatio);

  await db.from("exam_attempts").update({ submitted_at: new Date().toISOString(), answers: final, score, total, passed }).eq("id", attemptId);

  let code: string | null = null;
  if (passed) {
    const { data: existing } = await db.from("certificates").select("code").eq("user_id", user.id).maybeSingle();
    if (existing) code = existing.code;
    else {
      const { data: profile } = await db.from("profiles").select("full_name").eq("id", user.id).single();
      for (let i = 0; i < 5 && !code; i++) {
        const c = newCertificateCode();
        const { error } = await db.from("certificates").insert({ code: c, user_id: user.id, full_name: profile!.full_name.trim(), exam_attempt_id: attemptId, score, total });
        if (!error) code = c;
      }
    }
  }
  revalidatePath("/dashboard");
  revalidatePath("/exam");
  return { ok: true, score, total, passed, code };
}
