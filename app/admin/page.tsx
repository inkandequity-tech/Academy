import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isAdmin, requireUser } from "@/lib/learner";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/env";
import { GrantForm, RevokeForm } from "@/components/AdminForms";
import { formatInr } from "@/lib/config";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

const d = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default async function Admin() {
  if (!supabaseConfigured()) notFound();
  const user = await requireUser("/admin");
  if (!isAdmin(user)) notFound();
  const db = supabaseAdmin();
  const [learners, enrolled, certs, paid, recentEnrol, recentCerts] = await Promise.all([
    db.from("profiles").select("id", { count: "exact", head: true }),
    db.from("enrollments").select("user_id", { count: "exact", head: true }),
    db.from("certificates").select("code", { count: "exact", head: true }).is("revoked_at", null),
    db.from("orders").select("amount_paise").eq("status", "paid"),
    db.from("enrollments").select("user_id, source, note, created_at, profiles!inner(email, full_name)").order("created_at", { ascending: false }).limit(25),
    db.from("certificates").select("code, full_name, score, total, issued_at, revoked_at").order("issued_at", { ascending: false }).limit(25),
  ]);
  const revenue = (paid.data ?? []).reduce((a, r) => a + (r.amount_paise as number), 0) / 100;
  type Row = { user_id: string; source: string; note: string | null; created_at: string; profiles: { email: string; full_name: string } | { email: string; full_name: string }[] };

  return (
    <section className="page-head">
      <div className="wrap">
        <h1>Admin</h1>
        <div className="stat-row">
          <div><b>{learners.count ?? 0}</b><span>learners signed up</span></div>
          <div><b>{enrolled.count ?? 0}</b><span>enrolled</span></div>
          <div><b>{certs.count ?? 0}</b><span>certificates in force</span></div>
          <div><b>{formatInr(revenue)}</b><span>paid online</span></div>
        </div>
        <div className="two" style={{ marginTop: "2rem" }}>
          <div className="panel"><h2 style={{ fontSize: "1.3rem" }}>Enrol a learner by hand</h2><GrantForm /></div>
          <div className="panel"><h2 style={{ fontSize: "1.3rem" }}>Withdraw a certificate</h2><RevokeForm /></div>
        </div>
        <h2 style={{ fontSize: "1.5rem", marginTop: "3rem" }}>Recent enrolments</h2>
        <div className="table-scroll"><table className="data">
          <thead><tr><th>Date</th><th>Name</th><th>Email</th><th>How</th><th>Note</th></tr></thead>
          <tbody>{((recentEnrol.data ?? []) as Row[]).map((r) => {
            const p = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
            return <tr key={r.user_id}><td>{d(r.created_at)}</td><td>{p?.full_name}</td><td>{p?.email}</td><td>{r.source === "razorpay" ? "Online" : "By hand"}</td><td>{r.note}</td></tr>;
          })}</tbody>
        </table></div>
        <h2 style={{ fontSize: "1.5rem", marginTop: "3rem" }}>Recent certificates</h2>
        <div className="table-scroll"><table className="data">
          <thead><tr><th>Issued</th><th>Number</th><th>Name</th><th>Score</th><th>Status</th></tr></thead>
          <tbody>{(recentCerts.data ?? []).map((c) => <tr key={c.code}><td>{d(c.issued_at)}</td><td><a className="link" href={`/verify/${c.code}`}>{c.code}</a></td><td>{c.full_name}</td><td>{c.score} of {c.total}</td><td>{c.revoked_at ? "Withdrawn" : "In force"}</td></tr>)}</tbody>
        </table></div>
      </div>
    </section>
  );
}
