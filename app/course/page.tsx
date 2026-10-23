import type { Metadata } from "next";
import { CauseList, hours } from "@/components/CauseList";
import { MODULES, TOTAL_LESSONS, TOTAL_MINUTES } from "@/content/outline";
import { RULES } from "@/lib/config";

export const metadata: Metadata = {
  title: "Syllabus",
  description: `Thirteen modules and ${TOTAL_LESSONS} lessons of civil, criminal and writ practice for junior advocates in Uttar Pradesh.`,
};

export default function Syllabus() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Syllabus</span></nav>
          <h1>The syllabus</h1>
          <p className="lede">
            {MODULES.length} modules, {TOTAL_LESSONS} lessons and about {hours(TOTAL_MINUTES)} of teaching, in the order a matter moves
            through the courts. Module 1 is free. The rest open on enrolment.
          </p>
        </div>
      </section>
      <section className="wrap"><CauseList /></section>
      <section className="section">
        <div className="wrap two">
          <div>
            <h2>The final examination</h2>
            <p>After the last module you sit one timed examination of {RULES.examQuestions} questions drawn from every module. You have {RULES.examMinutes} minutes and {RULES.examMaxAttempts} attempts. A score of {Math.round(RULES.examPassRatio * 100)}% or more issues your certificate at once.</p>
          </div>
          <div>
            <h2>What you need first</h2>
            <ul className="checks">
              <li>Every lesson marked complete</li>
              <li>Every module quiz passed (three of four correct)</li>
              <li>Your full name on your profile, as it should read on the certificate</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
