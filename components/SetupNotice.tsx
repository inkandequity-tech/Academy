/** Shown on learner pages until the Supabase project is connected (see README, section 3). */
export function SetupNotice({ what }: { what: string }) {
  return (
    <section className="page-head">
      <div className="narrow">
        <h1 style={{ fontSize: "clamp(2rem,4.6vw,3rem)" }}>{what} open soon</h1>
        <p className="lede">Sign-in, progress tracking, quizzes and certificates are being connected. Until then, you can read the free first module and the full syllabus.</p>
        <div className="actions"><a className="btn solid" href="/course/entering-the-profession">Read the free module</a><a className="btn" href="/course">See the syllabus</a></div>
      </div>
    </section>
  );
}
