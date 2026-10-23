"use server";
import { revalidatePath } from "next/cache";
import { getModule } from "@/content/outline";
import { quizFor } from "@/content/questions";
import { currentUser, learnerState, canOpen } from "@/lib/learner";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { RULES } from "@/lib/config";

export type Review = { id: string; chosen: number | null; answer: number; correct: boolean; explain: string };
export type QuizResult = { ok: true; score: number; total: number; passed: boolean; review: Review[] } | { ok: false; error: string };

export async function submitQuiz(moduleSlug: string, answers: Record<string, number>): Promise<QuizResult> {
  const m = getModule(moduleSlug);
  if (!m) return { ok: false, error: "That module does not exist." };
  const user = await currentUser();
  if (!user) return { ok: false, error: "Sign in again to submit the quiz." };
  const state = await learnerState(user);
  if (!canOpen(m, state.enrolled)) return { ok: false, error: "Enrol in the full course to take this quiz." };

  const qs = quizFor(m.slug);
  const review: Review[] = qs.map((q) => {
    const chosen = Number.isInteger(answers[q.id]) ? answers[q.id] : null;
    return { id: q.id, chosen, answer: q.answer, correct: chosen === q.answer, explain: q.explain };
  });
  const score = review.filter((r) => r.correct).length;
  const passed = score >= Math.ceil(qs.length * RULES.quizPassRatio);

  const { error } = await supabaseAdmin().from("quiz_attempts").insert({
    user_id: user.id, module_slug: m.slug, score, total: qs.length, passed, answers,
  });
  if (error) return { ok: false, error: "The quiz could not be saved. Try submitting again." };

  revalidatePath(`/course/${m.slug}`);
  revalidatePath("/dashboard");
  return { ok: true, score, total: qs.length, passed, review };
}
