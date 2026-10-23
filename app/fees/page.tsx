import type { Metadata } from "next";
import { EnrolButton } from "@/components/EnrolButton";
import { optionalState } from "@/lib/learner";
import { razorpayConfigured } from "@/lib/razorpay";
import { supabaseConfigured } from "@/lib/supabase/env";
import { ACADEMY, RULES, coursePriceInr, formatInr } from "@/lib/config";
import { MODULES, TOTAL_LESSONS } from "@/content/outline";

export const metadata: Metadata = {
  title: "Fees and enrolment",
  description: "One fee for the full Courtroom Practice Course: all modules, quizzes, the final examination and a verifiable certificate. Module 1 is free.",
};

export default async function Fees() {
  const price = coursePriceInr();
  const state = await optionalState();
  const ready = supabaseConfigured() && razorpayConfigured();

  let cta: React.ReactNode;
  if (!ready) cta = <p className="muted">Online enrolment opens shortly. Write to <a className="link" href={`mailto:${ACADEMY.email}`}>{ACADEMY.email}</a> to be told when it does.</p>;
  else if (!state) cta = <a className="btn warm" href="/login?next=/fees">Sign in to enrol</a>;
  else if (state.enrolled) cta = <><p><span className="tag done">You are enrolled</span></p><a className="btn solid" href="/dashboard">Go to my course</a></>;
  else cta = <EnrolButton label={`Pay ${formatInr(price)} and enrol`} />;

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Fees</span></nav>
          <h1>Fees and enrolment</h1>
          <p className="lede">One payment opens the whole course. There are no instalments, renewals or charges for the certificate.</p>
        </div>
      </section>
      <section className="wrap two" style={{ paddingBottom: "4rem" }}>
        <div className="panel">
          <h2 style={{ fontSize: "1.5rem" }}>{ACADEMY.course}</h2>
          <p className="fee">{formatInr(price)}</p>
          <p className="muted">GST included. Paid once through Razorpay by UPI, debit or credit card, or net banking.</p>
          <ul className="checks">
            <li>All {MODULES.length} modules and {TOTAL_LESSONS} lessons, with video and written notes</li>
            <li>A drafting or research task with every lesson</li>
            <li>{MODULES.length} module quizzes, with explanations</li>
            <li>The final examination: {RULES.examQuestions} questions, {RULES.examMinutes} minutes, up to {RULES.examMaxAttempts} attempts</li>
            <li>A certificate with a unique number and QR code, verifiable online</li>
            <li>Access for as long as the course is offered, including revised lessons</li>
          </ul>
          <div style={{ marginTop: "1.5rem" }}>{cta}</div>
        </div>
        <div>
          <h2 style={{ fontSize: "1.6rem" }}>Before you pay</h2>
          <p>Take <a className="link" href="/course/entering-the-profession">Module 1</a> first. It is free, it is the same format as the rest, and it will tell you whether the course suits you.</p>
          <h3>Refunds</h3>
          <p className="muted">You can ask for a full refund within 7 days of paying, if you have not started the final examination. After that, the fee is not refundable. The <a className="link" href="/refunds">refund policy</a> has the details.</p>
          <h3>Paying another way</h3>
          <p className="muted">If you cannot pay online, write to <a className="link" href={`mailto:${ACADEMY.email}`}>{ACADEMY.email}</a>. The Academy can enrol you by hand once a payment is received.</p>
          <h3>What the certificate is</h3>
          <p className="muted">It records that you completed this course and passed its examination. It is not a degree, a diploma recognised by a university, or a Bar Council qualification. <a className="link" href="/certificate/sample">See a sample</a>.</p>
        </div>
      </section>
    </>
  );
}
