import type { Metadata } from "next";
import { ALL_LESSONS, MODULES, TOTAL_LESSONS, lessonKey } from "@/content/outline";
import { CauseList } from "@/components/CauseList";
import { ProfileForm } from "@/components/ProfileForm";
import { SetupNotice } from "@/components/SetupNotice";
import { canOpen, examEligibility, isAdmin, learnerState, moduleProgress, requireUser } from "@/lib/learner";
import { signOut } from "@/app/actions/auth";
import { supabaseConfigured } from "@/lib/supabase/env";
import { coursePriceInr, formatInr } from "@/lib/config";

export const metadata: Metadata = { title: "My course", robots: { index: false } };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ enrolled?: string }> }) {
  if (!supabaseConfigured()) return <SetupNotice what="Learner dashboards" />;
  const user = await requireUser("/dashboard");
  const s = await learnerState(user);
  const sp = await searchParams;
  const el = examEligibility(s);
  const nextLesson = ALL_LESSONS.find((l) => canOpen(l.module, s.enrolled) && !s.completed.has(lessonKey(l.module.slug, l.slug)));
  const passedQuizzes = MODULES.filter((m) => s.quizPassed.has(m.slug)).length;
  const first = s.profile?.full_name?.split(" ")[0];

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{first ? `${first}, your course` : "Your course"}</h1>
          {sp.enrolled && <div className="note info"><p>Payment received. The full course is open to you.</p></div>}
          <div className="stat-row">
            <div><b>{s.completed.size} / {TOTAL_LESSONS}</b><span>lessons complete</span></div>
            <div><b>{passedQuizzes} / {MODULES.length}</b><span>module quizzes passed</span></div>
            <div><b>{s.certificate ? "Issued" : el.ok ? "Open" : "Locked"}</b><span>final examination</span></div>
          </div>
          <div className="meter" aria-hidden="true" style={{ maxWidth: 640 }}><span style={{ width: `${(s.completed.size / TOTAL_LESSONS) * 100}%` }} /></div>
          <div className="actions">
            {s.certificate
              ? <a className="btn warm" href={`/certificate/${s.certificate.code}`}>View your certificate</a>
              : nextLesson
                ? <a className="btn solid" href={`/course/${nextLesson.module.slug}/${nextLesson.slug}`}>Continue: {nextLesson.module.number}. {nextLesson.title}</a>
                : <a className="btn warm" href="/exam">Go to the final examination</a>}
            {!s.enrolled && <a className="btn" href="/fees">Enrol in the full course, {formatInr(coursePriceInr())}</a>}
          </div>
        </div>
      </section>

      <section className="wrap">
        <CauseList
          title="Your board"
          status={(m) => {
            const p = moduleProgress(s, m);
            if (!canOpen(m, s.enrolled)) return { label: "Enrol to open", kind: "lock" };
            if (p.complete) return { label: "Cleared", kind: "done" };
            return { label: `${p.done} of ${p.total} lessons${p.quiz ? ", quiz passed" : ""}`, kind: "plain" };
          }}
        />
      </section>

      <section className="section">
        <div className="wrap two">
          <div>
            <h2 style={{ fontSize: "1.7rem" }}>Final examination</h2>
            <ul className="checks">
              {el.reasons.map((r) => <li key={r.label} className={r.met ? "ok" : "no"}>{r.label}</li>)}
            </ul>
            {s.certificate
              ? <p>Certificate {s.certificate.code}, issued {new Date(s.certificate.issued_at).toLocaleDateString("en-IN", { dateStyle: "long" })}. <a className="link" href={`/verify/${s.certificate.code}`}>Verification page</a>.</p>
              : <a className="btn" href="/exam">Open the examination page</a>}
          </div>
          <div>
            <h2 style={{ fontSize: "1.7rem" }}>Profile</h2>
            <p className="muted" style={{ fontSize: ".95rem" }}>Signed in as {user.email}.</p>
            <ProfileForm profile={s.profile} locked={Boolean(s.certificate && !s.certificate.revoked_at)} />
            <form action={signOut} style={{ marginTop: "1.5rem" }}><button className="btn small">Sign out</button></form>
            {isAdmin(user) && <p style={{ marginTop: "1rem" }}><a className="link" href="/admin">Open the admin page</a></p>}
          </div>
        </div>
      </section>
    </>
  );
}
