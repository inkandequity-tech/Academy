import { NextResponse } from "next/server";
import { currentUser } from "@/lib/learner";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { markOrderPaid } from "@/lib/enrol";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in again." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const orderId = String(body.razorpay_order_id || "");
  const paymentId = String(body.razorpay_payment_id || "");
  const signature = String(body.razorpay_signature || "");
  if (!orderId || !paymentId || !signature || !verifyPaymentSignature(orderId, paymentId, signature)) {
    return NextResponse.json({ error: "The payment could not be confirmed. If money left your account, write to us with the payment id." }, { status: 400 });
  }
  const { data: order } = await supabaseAdmin().from("orders").select("user_id").eq("id", orderId).maybeSingle();
  if (!order || order.user_id !== user.id) return NextResponse.json({ error: "This order belongs to another account." }, { status: 403 });
  await markOrderPaid(orderId, paymentId);
  return NextResponse.json({ ok: true });
}
