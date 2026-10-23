"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getLesson, lessonKey } from "@/content/outline";
import { currentUser, learnerState, canOpen } from "@/lib/learner";
import { supabaseServer } from "@/lib/supabase/server";

export async function setLessonComplete(formData: FormData) {
  const moduleSlug = String(formData.get("module") || "");
  const lessonSlug = String(formData.get("lesson") || "");
  const done = formData.get("done") === "1";
  const found = getLesson(moduleSlug, lessonSlug);
  if (!found) return;
  const path = `/course/${moduleSlug}/${lessonSlug}`;

  const user = await currentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(path)}`);
  const state = await learnerState(user);
  if (!canOpen(found.module, state.enrolled)) redirect("/fees");

  const sb = (await supabaseServer())!;
  const key = lessonKey(moduleSlug, lessonSlug);
  if (done) {
    await sb.from("lesson_progress").upsert({ user_id: user.id, lesson_key: key }, { onConflict: "user_id,lesson_key", ignoreDuplicates: true });
  } else {
    await sb.from("lesson_progress").delete().eq("user_id", user.id).eq("lesson_key", key);
  }
  revalidatePath(path);
  revalidatePath(`/course/${moduleSlug}`);
  revalidatePath("/dashboard");
  if (done && formData.get("advance") === "1" && found.next) {
    redirect(`/course/${found.next.module.slug}/${found.next.slug}`);
  }
}
