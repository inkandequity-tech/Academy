import "server-only";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabaseServer } from "./supabase/server";
import { MODULES, TOTAL_LESSONS, lessonKey, type ModuleOutline } from "@/content/outline";
import { RULES } from "./config";

export type Profile = { id: string; full_name: string; phone: string | null; city: string | null; practice_stage: string | null };
export type Certificate = { code: string; full_name: string; issued_at: string; score: number; total: number; revoked_at: string | null };
export type ExamAttempt = { id: string; started_at: string; deadline: string; submitted_at: string | null; score: number | null; total: number | null; passed: boolean | null };

export type LearnerState = {
  user: User;
  profile: Profile | null;
  enrolled: boolean;
  completed: Set<string>;
  quizPassed: Set<string>; // module slugs
  attempts: ExamAttempt[];
  certificate: Certificate | null;
};

export async function currentUser(): Promise<User | null> {
  const sb = await supabaseServer();
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  return data.user ?? null;
}

/** Redirects to sign-in if there is no learner. */
export async function requireUser(next: string): Promise<User> {
  const user = await currentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  return user;
}

export async function learnerState(user: User): Promise<LearnerState> {
  const sb = (await supabaseServer())!;
  const [profile, enrol, progress, quizzes, attempts, cert] = await Promise.all([
    sb.from("profiles").select("id, full_name, phone, city, practice_stage").eq("id", user.id).maybeSingle(),
    sb.from("enrollments").select("user_id").eq("user_id", user.id).maybeSingle(),
    sb.from("lesson_progress").select("lesson_key").eq("user_id", user.id),
    sb.from("quiz_attempts").select("module_slug").eq("user_id", user.id).eq("passed", true),
    sb.from("exam_attempts").select("id, started_at, deadline, submitted_at, score, total, passed").eq("user_id", user.id).order("started_at", { ascending: false }),
    sb.from("certificates").select("code, full_name, issued_at, score, total, revoked_at").eq("user_id", user.id).maybeSingle(),
  ]);
  return {
    user,
    profile: (profile.data as Profile) ?? null,
    enrolled: Boolean(enrol.data),
    completed: new Set((progress.data ?? []).map((r) => r.lesson_key as string)),
    quizPassed: new Set((quizzes.data ?? []).map((r) => r.module_slug as string)),
    attempts: (attempts.data as ExamAttempt[]) ?? [],
    certificate: (cert.data as Certificate) ?? null,
  };
}

export function canOpen(module: ModuleOutline, enrolled: boolean) {
  return module.free || enrolled;
}

export function moduleProgress(state: Pick<LearnerState, "completed" | "quizPassed">, m: ModuleOutline) {
  const done = m.lessons.filter((l) => state.completed.has(lessonKey(m.slug, l.slug))).length;
  return { done, total: m.lessons.length, quiz: state.quizPassed.has(m.slug), complete: done === m.lessons.length && state.quizPassed.has(m.slug) };
}

export type Eligibility = { ok: boolean; reasons: { label: string; met: boolean }[]; attemptsLeft: number; openAttempt: ExamAttempt | null };

export function examEligibility(s: LearnerState): Eligibility {
  const lessonsDone = s.completed.size >= TOTAL_LESSONS && MODULES.every((m) => m.lessons.every((l) => s.completed.has(lessonKey(m.slug, l.slug))));
  const quizzesDone = MODULES.every((m) => s.quizPassed.has(m.slug));
  const used = s.attempts.filter((a) => a.submitted_at).length;
  const attemptsLeft = Math.max(0, RULES.examMaxAttempts - used);
  const open = s.attempts.find((a) => !a.submitted_at && new Date(a.deadline).getTime() + RULES.examGraceSeconds * 1000 > Date.now()) ?? null;
  const reasons = [
    { label: "Enrolled in the full course", met: s.enrolled },
    { label: `All ${TOTAL_LESSONS} lessons marked complete`, met: lessonsDone },
    { label: `All ${MODULES.length} module quizzes passed`, met: quizzesDone },
    { label: "Full name added to your profile, as it should appear on the certificate", met: Boolean(s.profile?.full_name?.trim()) },
    { label: `An attempt remaining (${attemptsLeft} of ${RULES.examMaxAttempts} left)`, met: attemptsLeft > 0 || Boolean(open) },
  ];
  return { ok: reasons.every((r) => r.met) && !s.certificate, reasons, attemptsLeft, openAttempt: open };
}

export function isAdmin(user: User | null) {
  if (!user?.email) return false;
  const list = (process.env.ADMIN_EMAILS || "").split(",").map((x) => x.trim().toLowerCase()).filter(Boolean);
  return list.includes(user.email.toLowerCase());
}

/** Learner state if someone is signed in, otherwise null. Never redirects. */
export async function optionalState(): Promise<LearnerState | null> {
  const user = await currentUser();
  return user ? learnerState(user) : null;
}
