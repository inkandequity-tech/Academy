"use client";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import type { PublicQuestion } from "@/content/questions";
import type { ExamOutcome } from "@/app/actions/exam";

function mmss(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function ExamRunner({ questions, deadline, saved, save, submit, passMark }: {
  questions: PublicQuestion[];
  deadline: string;
  saved: Record<string, number>;
  save: (a: Record<string, number>) => Promise<{ ok: boolean }>;
  submit: (a: Record<string, number>) => Promise<ExamOutcome>;
  passMark: number;
}) {
  const end = new Date(deadline).getTime();
  const [answers, setAnswers] = useState<Record<string, number>>(saved);
  const [left, setLeft] = useState(end - Date.now());
  const [outcome, setOutcome] = useState<ExamOutcome | null>(null);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "failed">("idle");
  const [pending, start] = useTransition();
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const submitted = useRef(false);

  const doSubmit = useCallback(() => {
    if (submitted.current) return;
    submitted.current = true;
    start(async () => {
      const r = await submit(answersRef.current);
      setOutcome(r);
      if (!r.ok) submitted.current = false;
      window.scrollTo({ top: 0 });
    });
  }, [submit]);

  useEffect(() => {
    const t = setInterval(() => {
      const ms = end - Date.now();
      setLeft(ms);
      if (ms <= 0) { clearInterval(t); doSubmit(); }
    }, 1000);
    return () => clearInterval(t);
  }, [end, doSubmit]);

  useEffect(() => {
    if (answers === saved) return;
    setSaving("saving");
    const id = setTimeout(async () => setSaving((await save(answers)).ok ? "saved" : "failed"), 600);
    return () => clearTimeout(id);
  }, [answers, save, saved]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (!submitted.current) e.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  if (outcome?.ok) {
    return (
      <div className={`result ${outcome.passed ? "pass" : "fail"}`} role="status">
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>{outcome.passed ? "You have passed" : "Not passed this time"}</h1>
        <p>You scored {outcome.score} of {outcome.total}. The pass mark is {passMark}.</p>
        {outcome.passed && outcome.code
          ? <><p>Your certificate number is <b>{outcome.code}</b>.</p><div className="actions"><a className="btn warm" href={`/certificate/${outcome.code}`}>View your certificate</a><a className="btn" href="/dashboard">Back to my course</a></div></>
          : <><p className="muted">Revise the modules where you were unsure and try again when ready. Your attempts are listed on the examination page.</p><div className="actions"><a className="btn solid" href="/exam">Back to the examination page</a></div></>}
      </div>
    );
  }

  const answered = Object.keys(answers).length;
  return (
    <>
      <div className={`timer${left < 5 * 60 * 1000 ? " low" : ""}`}>
        <div><strong aria-live="off">{mmss(left)}</strong> <span className="muted">left</span></div>
        <div className="muted" style={{ fontSize: ".93rem", textAlign: "right" }}>
          {answered} of {questions.length} answered
          <br />{saving === "saving" ? "Saving" : saving === "saved" ? "Answers saved" : saving === "failed" ? "Not saved, check your connection" : " "}
        </div>
      </div>
      <h1 className="visually-hidden">Final examination</h1>
      {outcome && !outcome.ok && <p className="form-msg bad" role="alert">{outcome.error}</p>}
      <form onSubmit={(e) => { e.preventDefault(); if (answered < questions.length && !confirm(`${questions.length - answered} questions are unanswered. Submit anyway?`)) return; doSubmit(); }}>
        <ol className="qlist">
          {questions.map((q) => (
            <li key={q.id} className="qitem">
              <fieldset>
                <legend>{q.prompt}</legend>
                {q.options.map((o) => (
                  <label key={o.value} className="opt">
                    <input type="radio" name={q.id} value={o.value} checked={answers[q.id] === o.value} onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.value }))} />
                    <span>{o.text}</span>
                  </label>
                ))}
              </fieldset>
            </li>
          ))}
        </ol>
        <div className="actions"><button className="btn warm" disabled={pending}>{pending ? "Submitting" : "Submit the examination"}</button></div>
      </form>
    </>
  );
}
