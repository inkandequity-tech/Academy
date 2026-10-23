"use server";
import { revalidatePath } from "next/cache";
import { currentUser, isAdmin } from "@/lib/learner";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminState = { ok?: string; error?: string };

async function guard() {
  const user = await currentUser();
  if (!isAdmin(user)) throw new Error("Not allowed");
  return user!;
}

/** Enrol a learner by hand, for example after a bank transfer. The learner must have signed in once. */
export async function grantEnrolment(_: AdminState, form: FormData): Promise<AdminState> {
  const admin = await guard();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const note = String(form.get("note") || "").trim();
  if (!email) return { error: "Enter the learner's email." };
  const db = supabaseAdmin();
  const { data: p } = await db.from("profiles").select("id").eq("email", email).maybeSingle();
  if (!p) return { error: `No learner has signed in with ${email} yet. Ask them to sign in once, then try again.` };
  const { error } = await db.from("enrollments").upsert({ user_id: p.id, source: "manual", note: note ? `${note} (by ${admin.email})` : `by ${admin.email}` }, { onConflict: "user_id", ignoreDuplicates: true });
  if (error) return { error: "The enrolment could not be saved." };
  revalidatePath("/admin");
  return { ok: `${email} is enrolled.` };
}

export async function revokeCertificate(_: AdminState, form: FormData): Promise<AdminState> {
  await guard();
  const code = String(form.get("code") || "").trim().toUpperCase();
  const reason = String(form.get("reason") || "").trim();
  if (!code || !reason) return { error: "Enter the certificate number and a reason." };
  const { data, error } = await supabaseAdmin().from("certificates").update({ revoked_at: new Date().toISOString(), revoke_reason: reason }).eq("code", code).select("code");
  if (error || !data?.length) return { error: `No certificate ${code} was found.` };
  revalidatePath("/admin");
  return { ok: `Certificate ${code} is withdrawn. The verification page now says so.` };
}
