import type { Metadata } from "next";
import { Policy } from "@/components/Policy";
import { ACADEMY } from "@/lib/config";

export const metadata: Metadata = { title: "Refunds and cancellation" };

export default function Refunds() {
  return (
    <Policy title="Refunds and cancellation" updated="23 October 2026">
      <p>The course is delivered online, as soon as payment is confirmed. Nothing is shipped.</p>
      <h2>Full refund within 7 days</h2>
      <p>If the course is not right for you, write to <a className="link" href={`mailto:${ACADEMY.email}?subject=Academy%20refund`}>{ACADEMY.email}</a> within 7 days of paying, with the Razorpay payment id. If you have not started the final examination, the full fee is refunded to the original payment method, usually within 5 to 7 working days of approval. Your access to the paid modules ends when the refund is made.</p>
      <h2>After 7 days</h2>
      <p>The fee is not refundable once 7 days have passed, or once you have started the final examination, whichever is earlier.</p>
      <h2>Payment taken twice, or payment taken without enrolment</h2>
      <p>Write to us with both payment ids. A duplicate payment is refunded in full. If a payment went through but your account was not enrolled, it is enrolled or refunded, as you prefer.</p>
      <h2>If the Academy cancels</h2>
      <p>If the course is withdrawn before you have finished it, you can ask for a refund in proportion to the modules you had not started.</p>
    </Policy>
  );
}
