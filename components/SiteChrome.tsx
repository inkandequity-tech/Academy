import { ACADEMY } from "@/lib/config";
import { LogoMark } from "./Logo";
import { Nav, ThemeButton } from "./HeaderControls";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap bar">
        <a className="logo" href="/" aria-label={`${ACADEMY.name}, home`}>
          <LogoMark />
          <span><b>{ACADEMY.name}</b><small>Courtroom practice for junior advocates</small></span>
        </a>
        <Nav />
        <ThemeButton />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot">
          <div>
            <h2>{ACADEMY.name}</h2>
            <p className="muted" style={{ fontSize: ".97rem" }}>
              Taught by the advocates of <a className="link" href={ACADEMY.firmUrl}>{ACADEMY.firm}</a>, Lucknow.
            </p>
            <address className="muted" style={{ fontStyle: "normal", fontSize: ".97rem" }}>
              {ACADEMY.street}<br />{ACADEMY.city}<br />
              <a href={`tel:${ACADEMY.phoneTel}`}>{ACADEMY.phone}</a><br />
              <a href={`mailto:${ACADEMY.email}`}>{ACADEMY.email}</a>
            </address>
          </div>
          <div>
            <h2>The course</h2>
            <ul>
              <li><a href="/course">Syllabus</a></li>
              <li><a href="/course/entering-the-profession">Free first module</a></li>
              <li><a href="/faculty">Faculty</a></li>
              <li><a href="/fees">Fees</a></li>
              <li><a href="/faq">Questions</a></li>
              <li><a href="/verify">Verify a certificate</a></li>
            </ul>
          </div>
          <div>
            <h2>The Academy</h2>
            <ul>
              <li><a href="/dashboard">My course</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/terms">Terms</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/refunds">Refunds and cancellation</a></li>
            </ul>
          </div>
        </div>
        <p className="legal">
          The course teaches procedure and practice for general learning. It is not legal advice and it does not
          offer or invite legal services. The certificate records completion of this course; it is not a degree,
          a Bar Council qualification or a licence to practise. &copy; 2026 {ACADEMY.firm}.
        </p>
      </div>
    </footer>
  );
}
