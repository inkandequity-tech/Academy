import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ACADEMY } from "@/lib/config";
import { normaliseCode } from "@/lib/certificate";

export const metadata: Metadata = {
  title: "Verify a certificate",
  description: `Check that a certificate issued by ${ACADEMY.name} is genuine and current.`,
};

async function go(form: FormData) {
  "use server";
  const code = normaliseCode(String(form.get("code") || ""));
  if (code) redirect(`/verify/${code}`);
}

export default function Verify() {
  return (
    <section className="page-head">
      <div className="narrow" style={{ maxWidth: 620 }}>
        <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Verify</span></nav>
        <h1>Verify a certificate</h1>
        <p className="lede">Enter the number printed at the foot of the certificate, or scan its QR code. You will see the name it was issued to and the date.</p>
        <form action={go}>
          <label className="field"><span>Certificate number</span>
            <input className="input" name="code" placeholder={`${ACADEMY.certificatePrefix}-2026-XXXX-XXXX`} autoCapitalize="characters" spellCheck={false} required style={{ letterSpacing: ".05em" }} />
          </label>
          <button className="btn solid">Check this number</button>
        </form>
      </div>
    </section>
  );
}
