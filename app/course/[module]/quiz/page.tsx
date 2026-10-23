import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MODULES, getModule } from "@/content/outline";
import { publicQuestions, quizFor } from "@/content/questions";
import { canOpen, learnerState, requireUser } from "@/lib/learner";
import { submitQuiz } from "@/app/actions/quiz";
import { QuizForm } from "@/components/QuizForm";
import { SetupNotice } from "@/components/SetupNotice";
import { supabaseConfigured } from "@/lib/supabase/env";

type Props = { params: Promise<{ module: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getModule((await params).module);
  return m ? { title: `Quiz: ${m.title}`, robots: { index: false } } : {};
}

export default async function QuizPage({ params }: Props) {
  const m = getModule((await params).module);
  if (!m) notFound();
  if (!supabaseConfigured()) return <SetupNotice what="Quizzes" />;
  const user = await requireUser(`/course/${m.slug}/quiz`);
  const state = await learnerState(user);
  if (!canOpen(m, state.enrolled)) redirect("/fees");

  const next = MODULES.find((x) => x.number === m.number + 1);
  const passed = state.quizPassed.has(m.slug);
  const submit = submitQuiz.bind(null, m.slug);

  return (
    <section className="page-head">
      <div className="narrow">
        <nav className="crumbs" aria-label="Breadcrumb"><a href="/course">Syllabus</a><span aria-hidden="true">/</span><a href={`/course/${m.slug}`}>{m.number}. {m.title}</a><span aria-hidden="true">/</span><span>Quiz</span></nav>
        <h1 style={{ fontSize: "clamp(2rem,4.6vw,3.2rem)" }}>Quiz: {m.title}</h1>
        <p className="lede">Four questions. Three correct clears the module. You can retake it as often as you need; the answers are explained after you submit.</p>
        {passed && <p><span className="tag done">Already passed</span> <span className="muted">You can take it again for practice.</span></p>}
        <QuizForm
          questions={publicQuestions(quizFor(m.slug))}
          submit={submit}
          nextHref={next ? `/course/${next.slug}` : "/exam"}
          nextLabel={next ? `Go to item ${next.number}: ${next.title}` : "Go to the final examination"}
        />
      </div>
    </section>
  );
}
