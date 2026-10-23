import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { markOrderPaid } from "@/lib/enrol";

// Razorpay webhook (events: payment.captured, order.paid). Enrols the learner even if the
// browser closed before the checkout callback reached /api/razorpay/verify.
export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get("x-razorpay-signature") || "";
  if (!verifyWebhookSignature(raw, sig)) return NextResponse.json({ error: "bad signature" }, { status: 400 });
  const event = JSON.parse(raw);
  const payment = event?.payload?.payment?.entity;
  if ((event.event === "payment.captured" || event.event === "order.paid") && payment?.order_id) {
    await markOrderPaid(payment.order_id, payment.id);
  }
  return NextResponse.json({ ok: true });
}
