// The public outline of the course: modules and lesson titles.
// Lesson notes live in content/notes.ts and answer keys in content/questions.ts;
// both are server-only so paid material and answers never reach the browser bundle.

export type LessonOutline = { slug: string; title: string; minutes: number; summary: string };
export type ModuleOutline = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  leads: string[]; // faculty ids
  free: boolean;
  lessons: LessonOutline[];
};

export const MODULES: ModuleOutline[] = [
  {
    slug: "entering-the-profession", number: 1, free: true, leads: ["rishabh"],
    title: "Entering the profession",
    summary: "Enrolment, the Bar Council's rules of conduct, the vakalatnama and how to carry yourself in court.",
    lessons: [
      { slug: "from-enrolment-to-first-day", title: "From enrolment to the first day", minutes: 14, summary: "State Bar Council enrolment, the AIBE and choosing a senior." },
      { slug: "duties-under-the-bci-rules", title: "Your duties under the BCI Rules", minutes: 16, summary: "Duties to the court, the client, the opponent and colleagues." },
      { slug: "vakalatnama-and-appearance", title: "The vakalatnama and appearance", minutes: 12, summary: "Order III CPC, filing a vakalatnama and taking over a brief." },
      { slug: "court-craft", title: "Court craft", minutes: 13, summary: "The cause list, mentioning, addressing the bench and dress." },
    ],
  },
  {
    slug: "courts-and-jurisdiction", number: 2, free: false, leads: ["hanumant"],
    title: "Courts and jurisdiction in Uttar Pradesh",
    summary: "Where a matter is filed: the court hierarchy, the Lucknow Bench and the CPC rules on place of suing.",
    lessons: [
      { slug: "the-court-hierarchy", title: "The court hierarchy", minutes: 12, summary: "From the Civil Judge (Junior Division) to the Supreme Court." },
      { slug: "the-lucknow-bench", title: "The Lucknow Bench", minutes: 10, summary: "How the Chief Court of Oudh became a bench of the Allahabad High Court." },
      { slug: "place-of-suing", title: "Place of suing under the CPC", minutes: 18, summary: "Sections 9 and 15 to 21: competence, territory and objections." },
      { slug: "special-courts-and-forums", title: "Special courts and forums", minutes: 14, summary: "Commercial courts, family courts, revenue courts and rent authorities." },
    ],
  },
  {
    slug: "the-first-brief", number: 3, free: false, leads: ["gokel"],
    title: "The first brief",
    summary: "Turning a client's story into a file: conference, chronology, limitation, notices and court fees.",
    lessons: [
      { slug: "the-client-conference", title: "The client conference", minutes: 13, summary: "Taking instructions, collecting papers and building a list of dates." },
      { slug: "limitation-first", title: "Limitation first", minutes: 20, summary: "Sections 3, 5, 12 and 14, and the articles you will use most." },
      { slug: "notices-before-suit", title: "Notices before suit", minutes: 12, summary: "Section 80 CPC, legal notices and pre-institution mediation." },
      { slug: "valuation-and-court-fees", title: "Valuation and court fees", minutes: 12, summary: "Valuing the suit, paying the fee and what under-valuation costs." },
    ],
  },
  {
    slug: "drafting-civil-pleadings", number: 4, free: false, leads: ["vedant"],
    title: "Drafting civil pleadings",
    summary: "Plaints, written statements, amendments and applications that a judge can read in one sitting.",
    lessons: [
      { slug: "order-vi-the-rules-of-pleading", title: "Order VI: the rules of pleading", minutes: 15, summary: "Material facts, particulars, verification and amendment." },
      { slug: "the-plaint", title: "The plaint", minutes: 18, summary: "Order VII: what a plaint must contain and when it is rejected." },
      { slug: "the-written-statement", title: "The written statement", minutes: 16, summary: "Order VIII: time limits, specific denial, set-off and counter-claim." },
      { slug: "applications-and-affidavits", title: "Applications, affidavits and the paper book", minutes: 12, summary: "Section 151 applications, affidavits and filing order." },
    ],
  },
  {
    slug: "interim-relief", number: 5, free: false, leads: ["gokel"],
    title: "Interim relief",
    summary: "Injunctions, caveats, attachment before judgment and receivers: protecting the subject matter while the suit runs.",
    lessons: [
      { slug: "temporary-injunctions", title: "Temporary injunctions", minutes: 17, summary: "Order XXXIX Rules 1 and 2 and the three tests." },
      { slug: "ex-parte-orders", title: "Ex parte orders", minutes: 11, summary: "Order XXXIX Rules 3 and 3A: reasons, notice and the thirty days." },
      { slug: "attachment-receivers-commissions", title: "Attachment, receivers and commissions", minutes: 14, summary: "Orders XXXVIII, XL and XXVI, and breach under Rule 2A." },
      { slug: "caveats", title: "Caveats", minutes: 8, summary: "Section 148A: who files, how long it lasts and what it gives." },
    ],
  },
  {
    slug: "civil-trial-and-evidence", number: 6, free: false, leads: ["hanumant"],
    title: "Civil trial and evidence",
    summary: "Issues, witnesses and documents under the Bharatiya Sakshya Adhiniyam, 2023.",
    lessons: [
      { slug: "framing-issues", title: "Framing issues", minutes: 12, summary: "Orders X and XIV and preliminary issues." },
      { slug: "the-sakshya-adhiniyam", title: "The Sakshya Adhiniyam in practice", minutes: 18, summary: "Burden of proof, documents and electronic records." },
      { slug: "examining-witnesses", title: "Examining witnesses", minutes: 17, summary: "Chief by affidavit, cross-examination and re-examination." },
      { slug: "adjournments-and-arguments", title: "Adjournments and final arguments", minutes: 11, summary: "Order XVII, written arguments and the hearing." },
    ],
  },
  {
    slug: "decree-and-execution", number: 7, free: false, leads: ["kanchan"],
    title: "Decree and execution",
    summary: "Winning a decree is half the work. How to make it pay.",
    lessons: [
      { slug: "judgment-decree-order", title: "Judgment, decree and order", minutes: 10, summary: "Section 2 definitions and preliminary and final decrees." },
      { slug: "filing-for-execution", title: "Filing for execution", minutes: 15, summary: "Sections 38, 39 and 51, Order XXI and the twelve-year limit." },
      { slug: "section-47", title: "Section 47 and the executing court", minutes: 12, summary: "What the executing court decides and what it cannot reopen." },
      { slug: "resistance-and-delay", title: "Resistance and delay", minutes: 13, summary: "Order XXI Rules 97 to 101 and Rahul S. Shah." },
    ],
  },
  {
    slug: "appeals-revision-review", number: 8, free: false, leads: ["radhika"],
    title: "Appeals, revision and review",
    summary: "Choosing the right remedy against an order or decree, and filing it in time.",
    lessons: [
      { slug: "first-appeals", title: "First appeals", minutes: 15, summary: "Section 96 and Order XLI." },
      { slug: "second-appeals", title: "Second appeals", minutes: 12, summary: "Section 100 and the substantial question of law." },
      { slug: "revision", title: "Revision", minutes: 11, summary: "Section 115 and its proviso." },
      { slug: "review-and-time-limits", title: "Review, and the time limits", minutes: 12, summary: "Section 114, Order XLVII and Articles 116 and 124." },
    ],
  },
  {
    slug: "criminal-practice-fir-to-bail", number: 9, free: false, leads: ["kanchan"],
    title: "Criminal practice: FIR to bail",
    summary: "The Bharatiya Nagarik Suraksha Sanhita, 2023 from the first report to release on bail.",
    lessons: [
      { slug: "the-new-criminal-codes", title: "The new criminal codes", minutes: 12, summary: "BNS, BNSS and BSA, and which code governs an old case." },
      { slug: "the-fir", title: "The FIR", minutes: 16, summary: "Section 173 BNSS, zero FIR, e-FIR and remedies on refusal." },
      { slug: "arrest-and-notice", title: "Arrest and notice of appearance", minutes: 13, summary: "Section 35 BNSS, Arnesh Kumar and Satender Kumar Antil." },
      { slug: "bail", title: "Bail", minutes: 20, summary: "Sections 478, 480, 482, 483 and 187 BNSS." },
    ],
  },
  {
    slug: "criminal-trial-and-quashing", number: 10, free: false, leads: ["vedant"],
    title: "Criminal trial, quashing and appeals",
    summary: "Complaint cases, charge, trial, the High Court's inherent power and appeals.",
    lessons: [
      { slug: "complaint-cases", title: "Complaint cases and cognizance", minutes: 13, summary: "Section 223 BNSS and the new hearing before cognizance." },
      { slug: "charge-and-trial", title: "Charge and trial", minutes: 16, summary: "Discharge, framing charge, witnesses and the accused's statement." },
      { slug: "quashing", title: "Quashing", minutes: 15, summary: "Section 528 BNSS, Bhajan Lal and settlement cases." },
      { slug: "criminal-appeals", title: "Criminal appeals and revision", minutes: 12, summary: "Appeals against conviction and acquittal, and suspension of sentence." },
    ],
  },
  {
    slug: "writs-and-high-court-practice", number: 11, free: false, leads: ["rishabh"],
    title: "Writs and High Court practice",
    summary: "Articles 226 and 227, and the working practice of filing and arguing at the Lucknow Bench.",
    lessons: [
      { slug: "the-writ-jurisdiction", title: "The writ jurisdiction", minutes: 15, summary: "Articles 226, 227 and 32, and the five writs." },
      { slug: "maintainability", title: "Maintainability", minutes: 16, summary: "Alternative remedy, delay, locus and public interest." },
      { slug: "drafting-a-writ-petition", title: "Drafting a writ petition", minutes: 17, summary: "Dates, parties, grounds, prayers and affidavits." },
      { slug: "filing-and-listing", title: "Filing and listing", minutes: 13, summary: "E-filing, defects, fresh listing and the cause list." },
    ],
  },
  {
    slug: "tribunals-consumer-arbitration-cheques", number: 12, free: false, leads: ["richa"],
    title: "Tribunals, consumer cases, arbitration and cheques",
    summary: "The forums outside the regular civil court where a junior advocate gets much of the early work.",
    lessons: [
      { slug: "consumer-commissions", title: "Consumer commissions", minutes: 14, summary: "The 2019 Act, pecuniary limits and the two-year rule." },
      { slug: "arbitration-in-court", title: "Arbitration in court", minutes: 16, summary: "Sections 8, 9, 11, 29A and 34." },
      { slug: "cheque-dishonour", title: "Cheque dishonour", minutes: 15, summary: "Section 138 NI Act from presentation to appeal." },
      { slug: "tribunals-rera-lok-adalat", title: "Service tribunals, RERA and Lok Adalat", minutes: 12, summary: "CAT, the U.P. Public Services Tribunal, RERA and settlement." },
    ],
  },
  {
    slug: "the-craft", number: 13, free: false, leads: ["rishabh", "vedant"],
    title: "The craft: research, ethics and the chamber",
    summary: "Finding and checking the law, using AI responsibly, fees and conduct, and running a working chamber.",
    lessons: [
      { slug: "legal-research", title: "Legal research", minutes: 15, summary: "Bare acts, reports, eCourts and reading a judgment." },
      { slug: "citing-and-verifying", title: "Citing and verifying, with and without AI", minutes: 13, summary: "Precedent, per incuriam decisions and checking every citation." },
      { slug: "fees-clients-conduct", title: "Fees, clients and conduct", minutes: 12, summary: "Fee notes, confidentiality, conflicts and Rule 36." },
      { slug: "running-a-chamber", title: "Running a chamber", minutes: 12, summary: "The diary, the limitation register, juniors and GST." },
    ],
  },
];

export const ALL_LESSONS = MODULES.flatMap((m) => m.lessons.map((l) => ({ ...l, module: m })));
export const TOTAL_LESSONS = ALL_LESSONS.length;
export const TOTAL_MINUTES = ALL_LESSONS.reduce((a, l) => a + l.minutes, 0);

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}

export function getLesson(moduleSlug: string, lessonSlug: string) {
  const m = getModule(moduleSlug);
  if (!m) return undefined;
  const i = m.lessons.findIndex((l) => l.slug === lessonSlug);
  if (i < 0) return undefined;
  const flat = ALL_LESSONS.findIndex((l) => l.module.slug === moduleSlug && l.slug === lessonSlug);
  return {
    module: m,
    lesson: m.lessons[i],
    index: i,
    prev: flat > 0 ? ALL_LESSONS[flat - 1] : undefined,
    next: flat < ALL_LESSONS.length - 1 ? ALL_LESSONS[flat + 1] : undefined,
  };
}

export function lessonKey(moduleSlug: string, lessonSlug: string) {
  return `${moduleSlug}/${lessonSlug}`;
}
