import type { Metadata } from "next";
import { lookupCertificate } from "@/lib/supabase/public";
import { normaliseCode } from "@/lib/certificate";
import { ACADEMY } from "@/lib/config";

export const metadata: Metadata = { title: "Certificate check", robots: { index: false } };

export default async function VerifyResult({ params }: { params: Promise<{ code: string }> }) {
  const code = normaliseCode(decodeURIComponent((await params).code));
  const c = await lookupCertificate(code);
  return (
    <section className="page-head">
      <div className="narrow" style={{ maxWidth: 660 }}>
        <nav className="crumbs" aria-label="Breadcrumb"><a href="/verify">Verify</a><span aria-hidden="true">/</span><span>{code}</span></nav>
        {!c && (
          <div className="result fail">
            <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>No certificate has this number</h1>
            <p>Check the number for typing errors. Numbers look like {ACADEMY.certificatePrefix}-2026-7KQ4-M2XD. If it still does not match, the certificate was not issued by {ACADEMY.name}.</p>
            <div className="actions"><a className="btn" href="/verify">Try another number</a></div>
          </div>
        )}
        {c && c.revoked && (
          <div className="result fail">
            <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>This certificate has been withdrawn</h1>
            <p>Certificate {c.code}, issued to {c.full_name}, is no longer valid. Write to <a className="link" href={`mailto:${ACADEMY.email}`}>{ACADEMY.email}</a> for details.</p>
          </div>
        )}
        {c && !c.revoked && (
          <div className="result pass">
            <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>This certificate is genuine</h1>
            <table className="data" style={{ marginTop: ".5rem" }}>
              <tbody>
                <tr><th scope="row">Issued to</th><td>{c.full_name}</td></tr>
                <tr><th scope="row">Course</th><td>{ACADEMY.course}</td></tr>
                <tr><th scope="row">Issued on</th><td>{new Date(c.issued_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</td></tr>
                <tr><th scope="row">Number</th><td>{c.code}</td></tr>
                <tr><th scope="row">Issued by</th><td>{ACADEMY.name}, {ACADEMY.firm}, Lucknow</td></tr>
              </tbody>
            </table>
            <p className="muted" style={{ fontSize: ".93rem", marginTop: "1rem" }}>The holder completed every module and passed the final examination. This is a course certificate, not a degree or a Bar Council qualification.</p>
            <div className="actions"><a className="btn" href={`/certificate/${c.code}`}>View the certificate</a></div>
          </div>
        )}
      </div>
    </section>
  );
}
