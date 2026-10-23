import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MODULES, getModule, lessonKey } from "@/content/outline";
import { facultyById } from "@/content/faculty";
import { hours, leadNames } from "@/components/CauseList";
import { canOpen, moduleProgress, optionalState } from "@/lib/learner";
import { coursePriceInr, formatInr } from "@/lib/config";

type Props = { params: Promise<{ module: string }> };

export function generateStaticParams() {
  return MODULES.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getModule((await params).module);
  return m ? { title: `${m.number}. ${m.title}`, description: m.summary } : {};
}

export default async function ModulePage({ params }: Props) {
  const m = getModule((await params).module);
  if (!m) notFound();
  const state = await optionalState();
  const open = canOpen(m, Boolean(state?.enrolled));
  const prog = state ? moduleProgress(state, m) : null;
  const minutes = m.lessons.reduce((a, l) => a + l.minutes, 0);
  const next = MODULES.find((x) => x.number === m.number + 1);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/course">Syllabus</a><span aria-hidden="true">/</span><span>Item {m.number}</span></nav>
          <p className="kicker">Item {m.number} of {MODULES.length}{m.free ? ", free to all" : ""}</p>
          <h1>{m.title}</h1>
          <p className="lede">{m.summary}</p>
          <p className="muted">Before {leadNames(m)}. {m.lessons.length} lessons, {hours(minutes)}.</p>
          {prog && <div style={{ maxWidth: 420 }}><div className="meter" aria-hidden="true"><span style={{ width: `${(prog.done / prog.total) * 100}%` }} /></div><p className="muted" style={{ fontSize: ".93rem", marginTop: ".4rem" }}>{prog.done} of {prog.total} lessons complete{prog.quiz ? ", quiz passed" : ""}</p></div>}
        </div>
      </section>

      <section className="wrap two-wide" style={{ paddingBottom: "3rem" }}>
        <div>
          <ol className="index">
            {m.lessons.map((l, i) => {
              const done = state?.completed.has(lessonKey(m.slug, l.slug));
              return (
                <li key={l.slug}>
                  <a className="index-row" href={`/course/${m.slug}/${l.slug}`}>
                    <span className="index-no">{m.number}.{i + 1}</span>
                    <span className="index-title">{l.title}<small>{l.summary}</small></span>
                    <span className="index-meta">{done ? <span className="tag done">Done</span> : open ? `${l.minutes} min` : <span className="tag lock">Enrol to open</span>}</span>
                  </a>
                </li>
              );
            })}
            <li>
              <a className="index-row" href={`/course/${m.slug}/quiz`}>
                <span className="index-no">Q</span>
                <span className="index-title">Module quiz<small>Four questions. Three correct clears the module.</small></span>
                <span className="index-meta">{prog?.quiz ? <span className="tag done">Passed</span> : open ? "4 questions" : <span className="tag lock">Enrol to open</span>}</span>
              </a>
            </li>
          </ol>
        </div>
        <aside>
          <div className="panel">
            <h2 style={{ fontSize: "1.3rem" }}>Module lead{m.leads.length > 1 ? "s" : ""}</h2>
            {m.leads.map((id) => {
              const f = facultyById(id);
              return (
                <div key={id} style={{ display: "flex", gap: "1rem", alignItems: "center", margin: "1rem 0" }}>
                  <div className="arch" style={{ width: 64, flex: "none" }}><img src={f.photo} alt="" width={64} height={80} /></div>
                  <div><b>{f.name}</b><br /><span className="muted" style={{ fontSize: ".93rem" }}>{f.role}</span></div>
                </div>
              );
            })}
            {!open && (
              <>
                <p className="muted" style={{ fontSize: ".97rem" }}>This module opens when you enrol in the full course, {formatInr(coursePriceInr())} once.</p>
                <a className="btn warm small" href="/fees">Enrol</a>
              </>
            )}
            {next && <p style={{ margin: "1.2rem 0 0", fontSize: ".97rem" }}>Next on the board: <a className="link" href={`/course/${next.slug}`}>{next.number}. {next.title}</a></p>}
          </div>
        </aside>
      </section>
    </>
  );
}
