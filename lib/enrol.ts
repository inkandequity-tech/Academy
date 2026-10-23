import "server-only";
import { supabaseAdmin } from "./supabase/admin";

/**
 * Marks an order paid and enrols its learner. Safe to call twice (checkout callback and
 * webhook may both arrive). Returns the learner's id, or null if the order is unknown.
 */
export async function markOrderPaid(orderId: string, paymentId: string): Promise<string | null> {
  const db = supabaseAdmin();
  const { data: order } = await db.from("orders").select("id, user_id, status").eq("id", orderId).maybeSingle();
  if (!order) return null;
  if (order.status !== "paid") {
    await db.from("orders").update({ status: "paid", payment_id: paymentId, paid_at: new Date().toISOString() }).eq("id", orderId);
  }
  await db.from("enrollments").upsert({ user_id: order.user_id, source: "razorpay", order_id: orderId }, { onConflict: "user_id", ignoreDuplicates: true });
  return order.user_id as string;
}
