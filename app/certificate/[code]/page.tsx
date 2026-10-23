import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lookupCertificate } from "@/lib/supabase/public";
import { normaliseCode, qrSvg, verifyUrl } from "@/lib/certificate";
import { Certificate } from "@/components/Certificate";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = { title: "Certificate", robots: { index: false } };

export default async function CertificatePage({ params }: { params: Promise<{ code: string }> }) {
  const code = normaliseCode(decodeURIComponent((await params).code));
  const c = await lookupCertificate(code);
  if (!c) notFound();
  const url = verifyUrl(c.code);
  const date = new Date(c.issued_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <section className="cert-page">
      <div className="wrap">
        <Certificate code={c.code} name={c.full_name} date={date} verify={url} qr={await qrSvg(url)} stamp={c.revoked ? "Withdrawn" : undefined} />
        <div className="cert-actions no-print">
          <PrintButton />
          <a className="btn" href={`/verify/${c.code}`}>Open the verification page</a>
        </div>
        <p className="muted no-print" style={{ textAlign: "center", fontSize: ".93rem", marginTop: "1rem" }}>Choose "Save as PDF" in the print window to keep a copy. Set the paper to A4, landscape.</p>
      </div>
    </section>
  );
}
