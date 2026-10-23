"use server";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/config";

export type AuthState = { stage: "email" | "code"; email?: string; next?: string; error?: string; info?: string };

function safeNext(v: FormDataEntryValue | null) {
  const s = String(v || "/dashboard");
  return s.startsWith("/") && !s.startsWith("//") ? s : "/dashboard";
}

export async function sendCode(_: AuthState, form: FormData): Promise<AuthState> {
  const email = String(form.get("email") || "").trim().toLowerCase();
  const name = String(form.get("full_name") || "").trim();
  const next = safeNext(form.get("next"));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { stage: "email", next, error: "Enter a valid email address." };
  const sb = await supabaseServer();
  if (!sb) return { stage: "email", next, error: "Sign-in is not connected yet." };
  const { error } = await sb.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${SITE_URL}/auth/callback?next=${encodeURIComponent(next)}`,
      data: name ? { full_name: name } : undefined,
    },
  });
  if (error) return { stage: "email", next, error: error.status === 429 ? "Too many requests. Wait a minute and try again." : "The email could not be sent. Check the address and try again." };
  return { stage: "code", email, next, info: `We sent a sign-in email to ${email}. Open the link in it, or type the six-digit code here.` };
}

export async function verifyCode(prev: AuthState, form: FormData): Promise<AuthState> {
  const token = String(form.get("code") || "").replace(/\s/g, "");
  const email = prev.email || String(form.get("email") || "");
  const next = safeNext(prev.next ?? form.get("next"));
  if (!/^\d{6}$/.test(token)) return { ...prev, error: "The code is six digits." };
  const sb = await supabaseServer();
  if (!sb) return { ...prev, error: "Sign-in is not connected yet." };
  const { error } = await sb.auth.verifyOtp({ email, token, type: "email" });
  if (error) return { ...prev, error: "That code is wrong or has expired. Request a new email." };
  redirect(next);
}

export async function signOut() {
  const sb = await supabaseServer();
  await sb?.auth.signOut();
  redirect("/");
}

/** One action for the whole sign-in form: send the email, check the code, or start over. */
export async function authStep(prev: AuthState, form: FormData): Promise<AuthState> {
  const intent = String(form.get("intent") || "send");
  if (intent === "reset") return { stage: "email", next: prev.next };
  if (intent === "verify") return verifyCode(prev, form);
  return sendCode(prev, form);
}
