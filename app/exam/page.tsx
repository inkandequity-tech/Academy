import type { Metadata } from "next";
import { examEligibility, learnerState, requireUser } from "@/lib/learner";
import { startExam } from "@/app/actions/exam";
import { SetupNotice } from "@/components/SetupNotice";
import { supabaseConfigured } from "@/lib/supabase/env";
import { RULES } from "@/lib/config";

export const metadata: Metadata = { title: "Final examination", robots: { index: false } };

export default async function ExamLobby({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!supabaseConfigured()) return <SetupNotice what="The final examination" />;
  const user = await requireUser("/exam");
  const state = await learnerState(user);
  const el = examEligibility(state);
  const sp = await searchParams;
  const past = state.attempts.filter((a) => a.submitted_at);

  return (
    <section className="page-head">
      <div className="narrow">
        <nav className="crumbs" aria-label="Breadcrumb"><a href="/dashboard">My course</a><span aria-hidden="true">/</span><span>Final examination</span></nav>
        <h1>The final examination</h1>
        <p className="lede">{RULES.examQuestions} questions drawn at random from all thirteen modules. {RULES.examMinutes} minutes. A score of {Math.ceil(RULES.examQuestions * RULES.examPassRatio)} or more issues your certificate immediately.</p>

        {state.certificate ? (
          <div className="result pass">
            <h2>You have passed</h2>
            <p>Certificate number {state.certificate.code}.</p>
            <div className="actions"><a className="btn solid" href={`/certificate/${state.certificate.code}`}>View your certificate</a></div>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>Before you begin</h2>
            <ul className="checks">
              {el.reasons.map((r) => <li key={r.label} className={r.met ? "ok" : "no"}>{r.label}{r.met ? "" : " (not yet)"}</li>)}
            </ul>
            <div className="note info">
              <p>Once you start, the clock runs even if you close the page. Answers save as you go. When time is up the examination is submitted with the answers saved by then. Use one device and a steady connection.</p>
            </div>
            {sp.error && <p className="form-msg bad" role="alert">The examination could not be started. Try again.</p>}
            {el.openAttempt ? (
              <a className="btn solid" href={`/exam/${el.openAttempt.id}`}>Return to your examination in progress</a>
            ) : (
              <form action={startExam}><button className="btn warm" disabled={!el.ok}>Start the examination now</button></form>
            )}
            {!el.ok && !el.openAttempt && <p className="muted" style={{ marginTop: "1rem" }}>Complete the items marked "not yet", then return here. Your <a className="link" href="/dashboard">dashboard</a> shows what is left.</p>}
          </>
        )}

        {past.length > 0 && (
          <>
            <h2 style={{ fontSize: "1.3rem", marginTop: "2.5rem" }}>Your attempts</h2>
            <div className="table-scroll"><table className="data">
              <thead><tr><th>Date</th><th>Score</th><th>Result</th></tr></thead>
              <tbody>{past.map((a) => <tr key={a.id}><td>{new Date(a.started_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td><td>{a.score} of {a.total}</td><td>{a.passed ? "Passed" : "Not passed"}</td></tr>)}</tbody>
            </table></div>
          </>
        )}
      </div>
    </section>
  );
}
