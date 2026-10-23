import { NextResponse } from "next/server";
import { currentUser, learnerState } from "@/lib/learner";
import { createOrder, razorpayConfigured } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ACADEMY, coursePriceInr } from "@/lib/config";

export async function POST() {
  if (!razorpayConfigured()) return NextResponse.json({ error: "Payments are not connected yet." }, { status: 503 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in to enrol." }, { status: 401 });
  const state = await learnerState(user);
  if (state.enrolled) return NextResponse.json({ error: "You are already enrolled." }, { status: 409 });

  const amount = coursePriceInr() * 100;
  try {
    const order = await createOrder(amount, `ieqa-${user.id.slice(0, 8)}-${Date.now()}`, { user_id: user.id, course: ACADEMY.course });
    const { error } = await supabaseAdmin().from("orders").insert({ id: order.id, user_id: user.id, amount_paise: amount });
    if (error) throw error;
    return NextResponse.json({
      orderId: order.id,
      amount,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      name: ACADEMY.name,
      description: ACADEMY.course,
      email: user.email,
      fullName: state.profile?.full_name || "",
      phone: state.profile?.phone || "",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "The payment could not be started. Try again in a minute." }, { status: 502 });
  }
}
