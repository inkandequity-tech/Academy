import { ACADEMY } from "@/lib/config";

export function Policy({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <section className="page-head">
      <div className="narrow prose">
        <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>{title}</span></nav>
        <h1>{title}</h1>
        <p className="muted">Last updated {updated}. Questions: <a className="link" href={`mailto:${ACADEMY.email}`}>{ACADEMY.email}</a>.</p>
        {children}
      </div>
    </section>
  );
}
