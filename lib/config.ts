// One place for the facts the whole site repeats.
// The firm's address and contact details are copied from ieqlaw.com (tools/build.py).
// The Bar enrolment number is never published anywhere on this site; scripts/check-content.mjs
// fails the build if an enrolment-ID-like pattern appears.

export const ACADEMY = {
  name: "Ink & Equity Academy",
  shortName: "IEQ Academy",
  course: "The Courtroom Practice Course",
  tagline: "Courtroom practice for junior advocates, from the first vakalatnama to the final appeal.",
  firm: "Ink & Equity",
  firmUrl: "https://ieqlaw.com",
  street: "1, Moti Mahal Marg, Hazratganj",
  city: "Lucknow, Uttar Pradesh 226001",
  phone: "+91 9450 72 7289",
  phoneTel: "+919450727289",
  email: "ChamberLko@gmail.com",
  certificatePrefix: "IEQA",
} as const;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Course fee in rupees, GST included. Set COURSE_PRICE_INR in the environment. */
export function coursePriceInr(): number {
  const n = Number(process.env.COURSE_PRICE_INR || 4999);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 4999;
}

export function formatInr(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export const RULES = {
  quizPassRatio: 0.75, // 3 of 4
  examQuestions: 30,
  examPassRatio: 0.7, // 21 of 30
  examMinutes: 45,
  examGraceSeconds: 120,
  examMaxAttempts: 3,
} as const;
