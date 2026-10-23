import type { Metadata } from "next";
import { Policy } from "@/components/Policy";
import { ACADEMY, RULES } from "@/lib/config";

export const metadata: Metadata = { title: "Terms" };

export default function Terms() {
  return (
    <Policy title="Terms of use" updated="23 October 2026">
      <p>These terms apply to {ACADEMY.name} (the Academy), run by {ACADEMY.firm}, {ACADEMY.street}, {ACADEMY.city}. By creating an account or enrolling you accept them.</p>
      <h2>The course</h2>
      <p>The Academy provides an online course in legal procedure and practice for general learning. Lessons describe the law in general terms as at their review date. They are not legal advice, and they do not create an advocate and client relationship. Check every provision against the current statute and recent decisions before relying on it in a matter.</p>
      <h2>Your account</h2>
      <ul>
        <li>One account per person. Do not share sign-in links or codes.</li>
        <li>Give your real name; it is printed on your certificate.</li>
        <li>You may download notes for your own study. Do not republish, sell or share lesson videos, notes or questions.</li>
      </ul>
      <h2>Fees</h2>
      <p>The fee shown on the fees page is payable once, GST included, through Razorpay. Paying opens all modules, quizzes and the final examination for as long as the course is offered. Refunds follow the <a className="link" href="/refunds">refund policy</a>.</p>
      <h2>Examination and certificate</h2>
      <ul>
        <li>The final examination must be your own work, taken without help from another person. You have {RULES.examMaxAttempts} attempts.</li>
        <li>The certificate records completion of this course. It is not a degree, a university diploma or a Bar Council qualification.</li>
        <li>The Academy may withdraw a certificate obtained by impersonation or other dishonesty. The verification page will then show it as withdrawn.</li>
      </ul>
      <h2>Changes and availability</h2>
      <p>The Academy may revise lessons, questions and these terms. Material changes to the terms will be shown on this page with a new date. The site may be unavailable at times for maintenance.</p>
      <h2>Law and courts</h2>
      <p>These terms are governed by the laws of India. The courts at Lucknow have jurisdiction over any dispute about them.</p>
    </Policy>
  );
}
