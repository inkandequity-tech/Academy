import type { Metadata } from "next";
import { Policy } from "@/components/Policy";
import { ACADEMY } from "@/lib/config";

export const metadata: Metadata = { title: "Privacy" };

export default function Privacy() {
  return (
    <Policy title="Privacy" updated="23 October 2026">
      <p>This page explains what {ACADEMY.name} stores about learners and why. It is written with the Digital Personal Data Protection Act, 2023 in mind.</p>
      <h2>What is stored</h2>
      <ul>
        <li>Your email address, used to sign you in and to write to you about your enrolment.</li>
        <li>Your name, and optionally your phone number, city and stage of practice, which you enter on your dashboard.</li>
        <li>Your progress: lessons marked complete, quiz and examination answers and scores, and your certificate.</li>
        <li>Payment records: the Razorpay order and payment ids and the amount. Card, UPI and bank details are handled by Razorpay and never reach the Academy.</li>
      </ul>
      <h2>What is public</h2>
      <p>If you receive a certificate, anyone with its number can see your name, the course and the issue date on the verification page. Nothing else about you is shown.</p>
      <h2>Where it is kept</h2>
      <p>Learner records are stored with Supabase, and the site is hosted with Vercel. Payments are processed by Razorpay. Each acts as a processor for the Academy.</p>
      <h2>What is not done</h2>
      <p>No advertising trackers. No sale or sharing of your details with anyone for marketing. Your learner record is not used to approach you for legal work.</p>
      <h2>Your choices</h2>
      <p>You can correct your details on your dashboard (your name is fixed once a certificate is issued; write to us to correct it). You can ask for your account to be deleted by writing to <a className="link" href={`mailto:${ACADEMY.email}`}>{ACADEMY.email}</a>. Deleting your account also withdraws your certificate from the verification page.</p>
      <h2>Browser storage</h2>
      <p>The site stores a sign-in cookie while you are signed in, and remembers whether you chose the light or dark theme.</p>
    </Policy>
  );
}
