"use client";
import { useState, useTransition } from "react";
import type { PublicQuestion } from "@/content/questions";
import type { QuizResult } from "@/app/actions/quiz";

export function QuizForm({ questions, submit, nextHref, nextLabel }: {
  questions: PublicQuestion[];
  submit: (answers: Record<string, number>) => Promise<QuizResult>;
  nextHref: string;
  nextLabel: string;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [pending, start] = useTransition();
  const answered = Object.keys(answers).length;
  const graded = result?.ok ? result : null;
  const byId = new Map(graded?.review.map((r) => [r.id, r]) ?? []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      const r = await submit(answers);
      setResult(r);
      if (r.ok) window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function retry() {
    setAnswers({});
    setResult(null);
  }

  return (
    <form onSubmit={onSubmit}>
      {graded && (
        <div className={`result ${graded.passed ? "pass" : "fail"}`} role="status">
          <h2>{graded.passed ? "Module cleared" : "Not cleared yet"}</h2>
          <p style={{ margin: 0 }}>
            You scored {graded.score} of {graded.total}. {graded.passed ? "This module is marked as passed." : `You need ${Math.ceil(graded.total * 0.75)} correct. Read the explanations below and try again.`}
          </p>
          <div className="actions">
            {graded.passed ? <a className="btn solid" href={nextHref}>{nextLabel}</a> : <button type="button" className="btn solid" onClick={retry}>Try the quiz again</button>}
          </div>
        </div>
      )}
      {result && !result.ok && <p className="form-msg bad" role="alert">{result.error}</p>}
      <ol className="qlist">
        {questions.map((q) => {
          const r = byId.get(q.id);
          return (
            <li key={q.id} className="qitem">
              <fieldset disabled={Boolean(graded)}>
                <legend>{q.prompt}</legend>
                {q.options.map((o) => {
                  const cls = r ? (o.value === r.answer ? " right" : o.value === r.chosen ? " wrong" : "") : "";
                  return (
                    <label key={o.value} className={`opt${cls}`}>
                      <input type="radio" name={q.id} value={o.value} checked={answers[q.id] === o.value} onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.value }))} required />
                      <span>{o.text}</span>
                    </label>
                  );
                })}
                {r && <p className="explain">{r.correct ? "Correct. " : "Not quite. "}{r.explain}</p>}
              </fieldset>
            </li>
          );
        })}
      </ol>
      {!graded && (
        <div className="actions">
          <button className="btn solid" disabled={pending || answered < questions.length}>{pending ? "Marking your answers" : "Submit answers"}</button>
          <span className="muted" style={{ alignSelf: "center", fontSize: ".95rem" }}>{answered} of {questions.length} answered</span>
        </div>
      )}
    </form>
  );
}
