import "server-only";
import crypto from "node:crypto";

const API = "https://api.razorpay.com/v1";

export function razorpayConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

function auth() {
  const id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, secret = process.env.RAZORPAY_KEY_SECRET!;
  return "Basic " + Buffer.from(`${id}:${secret}`).toString("base64");
}

export type RzpOrder = { id: string; amount: number; currency: string; status: string };

export async function createOrder(amountPaise: number, receipt: string, notes: Record<string, string>): Promise<RzpOrder> {
  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: { Authorization: auth(), "Content-Type": "application/json" },
    body: JSON.stringify({ amount: amountPaise, currency: "INR", receipt, notes }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Razorpay order failed: ${res.status} ${await res.text()}`);
  return res.json();
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

/** Checkout callback: HMAC-SHA256 of "order_id|payment_id" with the key secret. */
export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string) {
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(`${orderId}|${paymentId}`).digest("hex");
  return safeEqual(expected, signature);
}

/** Webhook: HMAC-SHA256 of the raw body with the webhook secret. */
export function verifyWebhookSignature(rawBody: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return safeEqual(expected, signature);
}
