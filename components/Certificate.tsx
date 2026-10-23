import { ACADEMY } from "@/lib/config";
import { MODULES, TOTAL_LESSONS } from "@/content/outline";
import { LogoMark } from "./Logo";

export function Certificate({ code, name, date, verify, qr, stamp }: { code: string; name: string; date: string; verify: string; qr: string; stamp?: string }) {
  return (
    <div className="certificate" role="img" aria-label={`Certificate ${code} issued to ${name} on ${date}`}>
      <div className="cert-lattice" aria-hidden="true" />
      {stamp && <div className="cert-revoked" aria-hidden="true">{stamp}</div>}
      <div className="cert-inner">
        <div className="cert-top">
          <LogoMark />
          <div className="cert-academy">{ACADEMY.name}</div>
          <p className="cert-sub">{ACADEMY.firm}, {ACADEMY.street}, Lucknow</p>
        </div>
        <div>
          <div className="cert-title">Certificate of completion</div>
          <p className="cert-certifies">This certifies that</p>
          <div className="cert-name">{name}</div>
          <p className="cert-body">
            completed all {MODULES.length} modules and {TOTAL_LESSONS} lessons of {ACADEMY.course}, in civil, criminal and writ
            practice before the courts of Uttar Pradesh, and passed its final examination.
          </p>
        </div>
        <div className="cert-foot">
          <div className="sig"><b>Rishabh Raj</b>Founding partner, {ACADEMY.firm}</div>
          <div className="cert-seal" aria-hidden="true">Issued<br />{date}</div>
          <div className="sig" style={{ textAlign: "right" }}><b>Vedant Bhargav</b>Managing partner, {ACADEMY.firm}</div>
        </div>
        <div className="cert-base">
          <p className="cert-code">Certificate {code}. Check it at {verify.replace(/^https?:\/\//, "")}.<br />A course certificate; not a degree or a Bar Council qualification.</p>
          <div className="cert-qr" dangerouslySetInnerHTML={{ __html: qr }} />
        </div>
      </div>
    </div>
  );
}
