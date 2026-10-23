export default function NotFound() {
  return (
    <section className="page-head">
      <div className="narrow">
        <h1>Not on today's board</h1>
        <p className="lede">There is no page at this address. It may have moved, or the link may be mistyped.</p>
        <div className="actions"><a className="btn solid" href="/course">See the syllabus</a><a className="btn" href="/">Home</a></div>
      </div>
    </section>
  );
}
