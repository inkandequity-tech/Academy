import type { Metadata } from "next";
import { ACADEMY } from "@/lib/config";

export const metadata: Metadata = { title: "Contact", description: `How to reach ${ACADEMY.name} about enrolment, payments and certificates.` };

export default function Contact() {
  return (
    <section className="page-head">
      <div className="narrow">
        <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Contact</span></nav>
        <h1>Contact</h1>
        <p className="lede">For enrolment, payments, certificates and corrections to your name. The Academy cannot give advice on individual legal matters.</p>
        <table className="data" style={{ maxWidth: 560 }}>
          <tbody>
            <tr><th scope="row">Email</th><td><a className="link" href={`mailto:${ACADEMY.email}?subject=Academy`}>{ACADEMY.email}</a></td></tr>
            <tr><th scope="row">Telephone</th><td><a className="link" href={`tel:${ACADEMY.phoneTel}`}>{ACADEMY.phone}</a></td></tr>
            <tr><th scope="row">Address</th><td>{ACADEMY.name}, {ACADEMY.firm}<br />{ACADEMY.street}<br />{ACADEMY.city}</td></tr>
          </tbody>
        </table>
        <p className="muted" style={{ marginTop: "1.5rem" }}>Put "Academy" in the subject line. For a payment question, include the Razorpay payment id from your receipt.</p>
      </div>
    </section>
  );
}
