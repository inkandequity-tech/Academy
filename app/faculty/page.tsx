import type { Metadata } from "next";
import { FACULTY, GUESTS } from "@/content/faculty";
import { MODULES } from "@/content/outline";
import { ACADEMY } from "@/lib/config";

export const metadata: Metadata = {
  title: "Faculty",
  description: `The advocates of ${ACADEMY.firm}, Lucknow, who lead the modules of the Courtroom Practice Course.`,
};

export default function Faculty() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Faculty</span></nav>
          <h1>Faculty</h1>
          <p className="lede">The course is taught by the advocates of {ACADEMY.firm}, a practice at {ACADEMY.street}, Lucknow. Each leads the modules closest to their own work. Guest advocates join for selected lessons.</p>
        </div>
      </section>
      <section className="wrap" style={{ paddingBottom: "4rem" }}>
        <div className="faculty-grid">
          {FACULTY.map((f) => {
            const leads = MODULES.filter((m) => m.leads.includes(f.id));
            return (
              <article key={f.id} className="faculty-card">
                <figure>
                  <div className="arch"><img src={f.photo} alt={`Portrait of ${f.name}`} width={480} height={600} loading="lazy" /></div>
                  <h2 style={{ fontSize: "1.3rem", margin: ".9rem 0 .2rem" }}>{f.name}</h2>
                  <p>{f.role}</p>
                  <p style={{ marginTop: ".4rem" }}>{f.focus}</p>
                  {leads.length > 0 && <p className="teaches">Leads {leads.map((m, i) => <span key={m.slug}>{i ? ", " : ""}<a className="link" href={`/course/${m.slug}`}>item {m.number}</a></span>)}</p>}
                </figure>
              </article>
            );
          })}
        </div>
        <div className="section tight">
          <h2 style={{ fontSize: "1.7rem" }}>Guest advocates</h2>
          {GUESTS.length === 0
            ? <p className="muted">Guest lessons by senior advocates of the Allahabad High Court and the district courts will be announced here.</p>
            : <ul className="checks">{GUESTS.map((g) => <li key={g.name}><b>{g.name}</b>, {g.note}</li>)}</ul>}
        </div>
      </section>
    </>
  );
}
