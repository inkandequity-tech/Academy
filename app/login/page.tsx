import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { SetupNotice } from "@/components/SetupNotice";
import { currentUser } from "@/lib/learner";
import { supabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default async function Login({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const sp = await searchParams;
  const next = sp.next && sp.next.startsWith("/") && !sp.next.startsWith("//") ? sp.next : "/dashboard";
  if (!supabaseConfigured()) return <SetupNotice what="Sign-in and learner accounts" />;
  if (await currentUser()) redirect(next);
  return (
    <section className="page-head">
      <div className="narrow" style={{ maxWidth: 520 }}>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>Sign in</h1>
        <p className="lede">No password. We email you a link and a six-digit code. The same form creates your account the first time.</p>
        {sp.error && <p className="form-msg bad" role="alert">That sign-in link has expired or was already used. Request a new one below.</p>}
        <LoginForm next={next} />
      </div>
    </section>
  );
}
