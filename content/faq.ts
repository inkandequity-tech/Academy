import { RULES, coursePriceInr, formatInr } from "@/lib/config";

export const FAQ: [string, string][] = [
  ["Who is the course for?", "Advocates in their first five years of practice and final-year law students. It assumes you have read the main statutes and teaches how they are used in court."],
  ["Is it only for Uttar Pradesh?", "The procedure under the CPC, BNSS and the Sakshya Adhiniyam applies across India. The examples, forums and state amendments are from Uttar Pradesh, and the High Court lessons follow practice at the Lucknow Bench."],
  ["Does it cover the new criminal laws?", "Yes. The criminal modules teach the Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita and Bharatiya Sakshya Adhiniyam, with the old CrPC and Evidence Act numbers alongside, because cases begun before 1 July 2024 still run under the old codes."],
  ["How long does it take?", "About twelve hours of lessons, plus the tasks. Most learners finish in four to eight weeks at a few hours a week. There is no deadline."],
  ["What does it cost?", `${formatInr(coursePriceInr())} once, GST included. Module 1 is free.`],
  ["How is the certificate earned?", `Complete every lesson, pass each module quiz (three of four), then pass the final examination: ${RULES.examQuestions} questions in ${RULES.examMinutes} minutes, with a pass mark of ${Math.round(RULES.examPassRatio * 100)}%. You have ${RULES.examMaxAttempts} attempts.`],
  ["What is the certificate worth?", "It shows that you completed this course and passed its examination, and anyone can check it online. It is not a degree, a university diploma or a Bar Council qualification, and it does not entitle anyone to practise."],
  ["Can I get help with my own case?", "No. The course teaches practice in general terms and the faculty cannot advise on individual matters through it."],
  ["Is the Academy hiring juniors?", "The Academy does not place learners. Ink & Equity lists any openings on its own careers page."],
];
