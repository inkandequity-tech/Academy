import type { Metadata } from "next";
import { Certificate } from "@/components/Certificate";
import { qrSvg } from "@/lib/certificate";
import { ACADEMY, SITE_URL } from "@/lib/config";

export const metadata: Metadata = { title: "Sample certificate", description: `What the ${ACADEMY.name} certificate looks like.` };

export default async function SampleCertificate() {
  const url = `${SITE_URL}/verify`;
  return (
    <section className="cert-page">
      <div className="wrap">
        <p className="kicker no-print" style={{ textAlign: "center" }}>A sample. Real certificates carry the learner's name, a unique number and a QR code that opens its verification page.</p>
        <Certificate code={`${ACADEMY.certificatePrefix}-2026-SAMP-LE00`} name="Your name here" date="23 October 2026" verify={url} qr={await qrSvg(url)} stamp="Sample" />
        <div className="cert-actions no-print"><a className="btn solid" href="/fees">Fees and enrolment</a><a className="btn" href="/verify">Verify a certificate</a></div>
      </div>
    </section>
  );
}
