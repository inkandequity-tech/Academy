import { ACADEMY, RULES, coursePriceInr, formatInr } from "@/lib/config";
import { CauseList } from "@/components/CauseList";
import { FACULTY } from "@/content/faculty";
import { MODULES } from "@/content/outline";

export default function Home() {
  const price = coursePriceInr();
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="kicker">{ACADEMY.name}, Lucknow</p>
            <h1 className="display">Learn practice the way the court hears it.</h1>
          </div>
          <div>
            <p className="lede">
              A self-paced course for junior advocates in Uttar Pradesh. Thirteen modules of civil, criminal and writ
              practice, from the first vakalatnama to execution and appeal, taught by the advocates of {ACADEMY.firm}.
            </p>
            <div className="actions">
              <a className="btn solid" href="/course/entering-the-profession">Start the free module</a>
              <a className="btn" href="/fees">Fees and enrolment</a>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" aria-labelledby="board-title">
        <h2 id="board-title" className="visually-hidden">Syllabus</h2>
        <CauseList />
      </section>

      <section className="section">
        <div className="wrap">
          <h2>How the course works</h2>
          <ol className="steps">
            <li><h3>Watch and read</h3><p>Each lesson is a short video with written notes and the provisions and cases it relies on.</p></li>
            <li><h3>Do the task</h3><p>Every lesson ends with a drafting or research task taken from real chamber work.</p></li>
            <li><h3>Pass the module quiz</h3><p>Four questions per module. Pass three to clear it, and retake as often as you need.</p></li>
            <li><h3>Sit the final exam</h3><p>{RULES.examQuestions} questions in {RULES.examMinutes} minutes. Score {Math.round(RULES.examPassRatio * 100)}% to receive a certificate anyone can verify.</p></li>
          </ol>
        </div>
      </section>

      <section className="section rule">
        <div className="wrap two-wide">
          <div>
            <h2>Who it is for</h2>
            <p className="lede">Advocates in their first five years, and final-year law students who want to walk into a chamber ready to draft.</p>
          </div>
          <div>
            <ul className="checks">
              <li>You know the bare acts but not yet the order of a working day in court.</li>
              <li>You want to draft a plaint, a bail application or a writ petition that a senior corrects rather than rewrites.</li>
              <li>You practise, or plan to practise, in the district courts of U.P. and at the Lucknow Bench of the Allahabad High Court.</li>
              <li>You are learning the BNSS and the Bharatiya Sakshya Adhiniyam alongside the old codes.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section rule">
        <div className="wrap">
          <h2>Faculty</h2>
          <p className="lede">Each module is led by an advocate of {ACADEMY.firm} who works in that area. Guest advocates join for selected lessons.</p>
          <div className="faculty-grid">
            {FACULTY.slice(0, 4).map((f) => (
              <a key={f.id} className="faculty-card" href="/faculty" style={{ textDecoration: "none" }}>
                <figure>
                  <div className="arch"><img src={f.photo} alt={`Portrait of ${f.name}`} width={480} height={600} loading="lazy" /></div>
                  <h3>{f.name}</h3>
                  <p>{f.role}</p>
                </figure>
              </a>
            ))}
          </div>
          <div className="actions"><a className="btn" href="/faculty">All faculty</a></div>
        </div>
      </section>

      <section className="section rule">
        <div className="wrap two">
          <div>
            <h2>One fee, the whole course</h2>
            <p className="fee">{formatInr(price)}</p>
            <p className="muted">One payment, GST included. Module 1 is free and needs no payment. Pay by UPI, card or net banking through Razorpay.</p>
            <div className="actions"><a className="btn warm" href="/fees">Enrol in the full course</a></div>
          </div>
          <div>
            <h2>A certificate that can be checked</h2>
            <p>Every certificate carries a unique number and a QR code. A senior, a chamber or an employer can confirm it on the <a className="link" href="/verify">verification page</a> in a few seconds.</p>
            <p className="muted">The certificate records that you completed this course and passed its examination. It is not a degree or a Bar Council qualification.</p>
            <a className="btn" href="/certificate/sample">See a sample certificate</a>
          </div>
        </div>
      </section>

      <section className="section rule tight">
        <div className="wrap">
          <p className="lede" style={{ maxWidth: "62ch" }}>
            Begin with item 1, <a className="link" href="/course/entering-the-profession">{MODULES[0].title.toLowerCase()}</a>. It is free, and it is where every practice starts.
          </p>
        </div>
      </section>
    </>
  );
}
