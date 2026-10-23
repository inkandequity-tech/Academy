import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_LESSONS, getLesson, lessonKey } from "@/content/outline";
import { NOTES } from "@/content/notes";
import { Prose } from "@/components/Prose";
import { leadNames } from "@/components/CauseList";
import { canOpen, optionalState } from "@/lib/learner";
import { supabaseConfigured } from "@/lib/supabase/env";
import { setLessonComplete } from "@/app/actions/progress";
import { coursePriceInr, formatInr } from "@/lib/config";

type Props = { params: Promise<{ module: string; lesson: string }> };

export function generateStaticParams() {
  return ALL_LESSONS.map((l) => ({ module: l.module.slug, lesson: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const f = getLesson(p.module, p.lesson);
  if (!f) return {};
  return { title: `${f.lesson.title}, ${f.module.title}`, description: f.lesson.summary, robots: f.module.free ? undefined : { index: false } };
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function LessonPage({ params }: Props) {
  const p = await params;
  const f = getLesson(p.module, p.lesson);
  if (!f) notFound();
  const { module: m, lesson: l, index } = f;
  const state = await optionalState();
  const open = canOpen(m, Boolean(state?.enrolled));
  const note = open ? NOTES[lessonKey(m.slug, l.slug)] : null;
  const done = Boolean(state?.completed.has(lessonKey(m.slug, l.slug)));
  const ref = `${m.number}.${index + 1}`;

  return (
    <section className="page-head">
      <div className="wrap lesson-layout">
        <article>
          <nav className="crumbs" aria-label="Breadcrumb"><a href="/course">Syllabus</a><span aria-hidden="true">/</span><a href={`/course/${m.slug}`}>{m.number}. {m.title}</a></nav>
          <p className="kicker">Lesson {ref}, {l.minutes} minutes, before {leadNames(m)}</p>
          <h1 style={{ fontSize: "clamp(2rem,4.6vw,3.4rem)" }}>{l.title}</h1>
          <p className="lede">{l.summary}</p>

          {!open && (
            <div className="panel" style={{ marginTop: "2rem" }}>
              <h2 style={{ fontSize: "1.4rem" }}>This lesson opens on enrolment</h2>
              <p>Module {m.number} is part of the full course. One payment of {formatInr(coursePriceInr())} opens all {ALL_LESSONS.length} lessons, the quizzes and the final examination.</p>
              <div className="actions"><a className="btn warm" href="/fees">Enrol in the full course</a><a className="btn" href="/course/entering-the-profession">Try the free module</a></div>
              {!state && <p className="muted" style={{ marginTop: "1rem", fontSize: ".95rem" }}>Already enrolled? <a className="link" href={`/login?next=/course/${m.slug}/${l.slug}`}>Sign in</a>.</p>}
            </div>
          )}

          {note && (
            <>
              <div style={{ marginTop: "2rem" }}>
                {note.video ? (
                  <div className="video"><iframe src={note.video} title={`Video: ${l.title}`} allow="fullscreen; picture-in-picture" loading="lazy" /></div>
                ) : (
                  <div className="video empty"><p style={{ margin: 0 }}>The video for this lesson is being recorded. The notes below cover the full lesson.</p></div>
                )}
              </div>
              {!note.reviewed && <div className="note"><p>Draft notes, awaiting review by the module lead. Check every provision against the current bare act before you rely on it.</p></div>}
              {note.reviewed && <p className="muted" style={{ fontSize: ".93rem" }}>Reviewed by the module lead on {fmtDate(note.reviewed)}.</p>}
              <Prose text={note.body} />
              <div className="task"><h2>In chambers</h2><p>{note.task}</p></div>

              {supabaseConfigured() && (
                <form action={setLessonComplete} className="actions">
                  <input type="hidden" name="module" value={m.slug} />
                  <input type="hidden" name="lesson" value={l.slug} />
                  {done ? (
                    <>
                      <span className="tag done" style={{ alignSelf: "center" }}>Marked complete</span>
                      <button className="btn small" name="done" value="0">Mark as not done</button>
                    </>
                  ) : state ? (
                    <>
                      <input type="hidden" name="done" value="1" />
                      <button className="btn solid" name="advance" value="1">Mark complete and continue</button>
                      <button className="btn" name="advance" value="0">Mark complete</button>
                    </>
                  ) : (
                    <a className="btn solid" href={`/login?next=/course/${m.slug}/${l.slug}`}>Sign in to track your progress</a>
                  )}
                </form>
              )}
            </>
          )}

          <nav className="pager" aria-label="Lessons">
            {f.prev ? <a href={`/course/${f.prev.module.slug}/${f.prev.slug}`}><small>Previous</small><span>{f.prev.title}</span></a> : <span />}
            {index === m.lessons.length - 1
              ? <a href={`/course/${m.slug}/quiz`} style={{ textAlign: "right" }}><small>End of module</small><span>Take the module quiz</span></a>
              : f.next ? <a href={`/course/${f.next.module.slug}/${f.next.slug}`} style={{ textAlign: "right" }}><small>Next</small><span>{f.next.title}</span></a> : <span />}
          </nav>
        </article>

        <aside className="lesson-side">
          <h2 style={{ fontSize: "1.15rem" }}>{m.number}. {m.title}</h2>
          <ul className="side-list">
            {m.lessons.map((x, i) => (
              <li key={x.slug}>
                <a href={`/course/${m.slug}/${x.slug}`} aria-current={x.slug === l.slug ? "page" : undefined}>
                  <span className={`dot${state?.completed.has(lessonKey(m.slug, x.slug)) ? " done" : ""}`} aria-hidden="true" />
                  <span>{m.number}.{i + 1} {x.title}</span>
                </a>
              </li>
            ))}
            <li><a href={`/course/${m.slug}/quiz`}><span className={`dot${state?.quizPassed.has(m.slug) ? " done" : ""}`} aria-hidden="true" /><span>Module quiz</span></a></li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
