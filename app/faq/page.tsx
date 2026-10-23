import type { Metadata } from "next";
import { FAQ } from "@/content/faq";

export const metadata: Metadata = { title: "Questions", description: "Who the Courtroom Practice Course is for, what it covers, what it costs and how the certificate is earned." };

export default function FaqPage() {
  return (
    <section className="page-head">
      <div className="narrow">
        <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Questions</span></nav>
        <h1>Questions</h1>
        <div style={{ marginTop: "2rem" }}>
          {FAQ.map(([q, a]) => <details key={q} className="faq"><summary>{q}</summary><p>{a}</p></details>)}
        </div>
        <p className="muted" style={{ marginTop: "2rem" }}>Anything else? <a className="link" href="/contact">Write to the Academy</a>.</p>
      </div>
    </section>
  );
}
