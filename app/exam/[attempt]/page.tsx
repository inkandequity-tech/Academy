import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/learner";
import { supabaseServer } from "@/lib/supabase/server";
import { examById, publicQuestions, type Question } from "@/content/questions";
import { saveExamAnswers, submitExam } from "@/app/actions/exam";
import { ExamRunner } from "@/components/ExamRunner";
import { RULES } from "@/lib/config";

export const metadata: Metadata = { title: "Examination in progress", robots: { index: false } };

export default async function ExamAttempt({ params }: { params: Promise<{ attempt: string }> }) {
  const { attempt } = await params;
  const user = await requireUser(`/exam/${attempt}`);
  const sb = (await supabaseServer())!;
  const { data: a } = await sb.from("exam_attempts").select("id, user_id, question_ids, deadline, submitted_at, answers").eq("id", attempt).maybeSingle();
  if (!a || a.user_id !== user.id) notFound();
  if (a.submitted_at) redirect("/exam");
  if (Date.now() > new Date(a.deadline).getTime() + RULES.examGraceSeconds * 1000) redirect("/exam");

  const qs = (a.question_ids as string[]).map(examById).filter(Boolean) as Question[];
  return (
    <section className="page-head" style={{ paddingTop: "1.5rem" }}>
      <div className="narrow">
        <ExamRunner
          questions={publicQuestions(qs)}
          deadline={a.deadline}
          saved={(a.answers as Record<string, number>) ?? {}}
          save={saveExamAnswers.bind(null, a.id)}
          submit={submitExam.bind(null, a.id)}
          passMark={Math.ceil(qs.length * RULES.examPassRatio)}
        />
      </div>
    </section>
  );
}
