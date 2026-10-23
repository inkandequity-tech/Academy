"use server";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/learner";
import { supabaseServer } from "@/lib/supabase/server";

export type ProfileState = { ok?: boolean; error?: string };
const STAGES = ["student", "enrolled_0_2", "enrolled_3_5", "other"];

export async function updateProfile(_: ProfileState, form: FormData): Promise<ProfileState> {
  const user = await currentUser();
  if (!user) return { error: "Sign in again to save." };
  const full_name = String(form.get("full_name") || "").trim().replace(/\s+/g, " ");
  const phone = String(form.get("phone") || "").trim() || null;
  const city = String(form.get("city") || "").trim() || null;
  const stage = String(form.get("practice_stage") || "");
  if (full_name.length < 3 || full_name.length > 80) return { error: "Enter your full name, between 3 and 80 characters." };
  if (phone && !/^[+\d][\d\s-]{7,15}$/.test(phone)) return { error: "Enter a valid phone number, or leave it blank." };
  const sb = (await supabaseServer())!;
  const { error } = await sb.from("profiles").update({ full_name, phone, city, practice_stage: STAGES.includes(stage) ? stage : null }).eq("id", user.id);
  if (error) return { error: error.message.includes("fixed after a certificate") ? "Your name is fixed now that a certificate has been issued. Write to the Academy to correct it." : "Your profile could not be saved. Try again." };
  revalidatePath("/dashboard");
  return { ok: true };
}
