import "server-only";

// Answer keys. Server-only: the browser receives prompts and options, never `answer` or `explain`
// until after an attempt is graded on the server.

export type Question = { id: string; prompt: string; options: string[]; answer: number; explain: string };

const q = (id: string, prompt: string, options: string[], answer: number, explain: string): Question => ({ id, prompt, options, answer, explain });

/** Module quizzes: four questions each, pass at three. */
export const QUIZZES: Record<string, Question[]> = {
  "entering-the-profession": [
    q("m1q1", "Which body enrols an advocate to practise in Uttar Pradesh?", ["The Bar Council of India", "The Bar Council of Uttar Pradesh", "The Allahabad High Court", "The Oudh Bar Association"], 1, "Enrolment is by the State Bar Council under the Advocates Act, 1961."),
    q("m1q2", "Under the BCI Rules, which of these may an advocate not do?", ["Charge a fixed fee agreed in advance", "Decline a brief before accepting it", "Stipulate a fee that depends on the result of the case", "Issue a receipt for fees"], 2, "Rule 20 bars fees contingent on the result of litigation."),
    q("m1q3", "Which BCI Rule bars advocates from soliciting work or advertising?", ["Rule 20", "Rule 36", "Rule 49", "Rule 24"], 1, "Rule 36. A 2008 amendment allows a website with limited information only."),
    q("m1q4", "Who conducts the All India Bar Examination?", ["The Bar Council of India", "The Supreme Court of India", "Each State Bar Council separately", "The Ministry of Law and Justice"], 0, "The Bar Council of India conducts the AIBE."),
  ],
  "courts-and-jurisdiction": [
    q("m2q1", "Under Section 16 CPC, a suit for recovery of immovable property is filed where:", ["the plaintiff resides", "the defendant resides", "the property is situated", "the sale deed was registered"], 2, "Section 16 ties suits about immovable property to where the property is situated."),
    q("m2q2", "The Lucknow Bench of the Allahabad High Court traces its origin to:", ["the Chief Court of Oudh, amalgamated in 1948", "a 1966 Act of Parliament creating a new bench", "the Agra High Court, moved in 1869", "a 1950 notification of the President"], 0, "The 1948 Amalgamation Order merged the Chief Court of Oudh with the Allahabad High Court."),
    q("m2q3", "Section 15 CPC requires a suit to be instituted in:", ["the District Judge's court in every case", "the court of the lowest grade competent to try it", "any court the plaintiff chooses", "the court nearest the defendant"], 1, "Section 15: the court of the lowest grade competent to try it."),
    q("m2q4", "The Commercial Courts Act, 2015 applies to commercial disputes of a specified value of not less than:", ["₹1 lakh", "₹3 lakh", "₹10 lakh", "₹1 crore"], 1, "The 2018 amendment set the threshold at ₹3 lakh."),
  ],
  "the-first-brief": [
    q("m3q1", "Under Section 3 of the Limitation Act, a suit filed after the period of limitation:", ["is dismissed only if the defendant raises limitation", "must be dismissed even if limitation is not set up as a defence", "can be saved by an application under Section 5", "is transferred to a higher court"], 1, "Section 3 obliges the court to dismiss it on its own."),
    q("m3q2", "Section 5 of the Limitation Act, which allows condonation of delay, does not apply to:", ["appeals", "applications", "suits", "revisions"], 2, "Section 5 applies to appeals and applications, not suits."),
    q("m3q3", "The notice required by Section 80 CPC before suing the Government must be given:", ["15 days before the suit", "30 days before the suit", "two months before the suit", "six months before the suit"], 2, "Section 80 requires two months' notice, subject to Section 80(2)."),
    q("m3q4", "Under Article 54, a suit for specific performance must be filed within:", ["one year", "three years", "twelve years", "thirty years"], 1, "Three years from the date fixed for performance or from notice of refusal."),
  ],
  "drafting-civil-pleadings": [
    q("m4q1", "In an ordinary civil suit, the written statement is due:", ["within 15 days of service, no extension", "within 30 days of service, extendable up to 90 days", "within 120 days, no extension", "at any time before arguments"], 1, "Order VIII Rule 1. Kailash v. Nanhku read the 90-day limit as directory in ordinary suits."),
    q("m4q2", "In a commercial suit, if the written statement is not filed within 120 days of service:", ["the court may still accept it on costs", "the defendant forfeits the right to file it", "the suit is decreed automatically", "the suit is transferred to mediation"], 1, "SCG Contracts v. K.S. Chamankar (2019)."),
    q("m4q3", "The proviso to Order VI Rule 17 restricts amendment after:", ["the plaint is admitted", "summons is issued", "the trial has commenced", "the written statement is filed"], 2, "After trial begins, amendment needs a finding that the matter could not be raised earlier despite due diligence."),
    q("m4q4", "Under Order VIII Rule 5, a fact alleged in the plaint and not specifically denied is:", ["deemed denied", "taken as admitted, except against a person under disability", "left for the court to decide at trial", "struck out"], 1, "Rule 5 treats undenied facts as admitted."),
  ],
  "interim-relief": [
    q("m5q1", "The three tests for a temporary injunction are:", ["urgency, cost and convenience", "prima facie case, balance of convenience and irreparable injury", "limitation, jurisdiction and valuation", "notice, affidavit and undertaking"], 1, "Restated in Dalpat Kumar v. Prahlad Singh (1992)."),
    q("m5q2", "A caveat under Section 148A CPC remains in force for:", ["30 days", "60 days", "90 days", "until the suit ends"], 2, "90 days from the date it is lodged."),
    q("m5q3", "Order XXXIX Rule 2A deals with:", ["ex parte injunctions", "disobedience or breach of an injunction", "appeals against injunctions", "injunctions against the Government"], 1, "Rule 2A allows attachment and detention for breach."),
    q("m5q4", "Where an ex parte injunction is granted, Rule 3A asks the court to dispose of the application within:", ["7 days", "15 days", "30 days", "90 days"], 2, "Thirty days, or reasons must be recorded."),
  ],
  "civil-trial-and-evidence": [
    q("m6q1", "The Bharatiya Sakshya Adhiniyam, 2023 came into force on:", ["1 January 2024", "1 April 2024", "1 July 2024", "26 January 2025"], 2, "All three new criminal statutes took effect on 1 July 2024."),
    q("m6q2", "Examination-in-chief by affidavit is provided by:", ["Order XVI Rule 1", "Order XVIII Rule 4", "Order XIV Rule 2", "Order XXVI Rule 9"], 1, "Order XVIII Rule 4 CPC."),
    q("m6q3", "Leading questions may be asked as of right in:", ["examination-in-chief", "re-examination", "cross-examination", "none of these"], 2, "They are permitted in cross-examination."),
    q("m6q4", "The proviso to Order XVII Rule 1 limits adjournments to a party during the hearing to no more than:", ["two", "three", "five", "there is no limit"], 1, "Three adjournments."),
  ],
  "decree-and-execution": [
    q("m7q1", "Limitation for executing a decree, other than one for a perpetual injunction, is:", ["three years", "six years", "twelve years", "thirty years"], 2, "Article 136 of the Limitation Act."),
    q("m7q2", "Questions between the parties about execution, discharge or satisfaction of a decree are decided:", ["by a separate suit", "by the executing court under Section 47", "by the High Court only", "by arbitration"], 1, "Section 47 CPC."),
    q("m7q3", "'Decree' is defined in:", ["Section 2(2) CPC", "Section 2(9) CPC", "Section 2(14) CPC", "Section 47 CPC"], 0, "2(9) is judgment, 2(14) is order."),
    q("m7q4", "Resistance to delivery of possession by a person in occupation is dealt with under:", ["Order XXI Rules 97 to 101", "Order XXXIX Rule 1", "Order XLI Rule 5", "Section 115"], 0, "The executing court decides all questions arising."),
  ],
  "appeals-revision-review": [
    q("m8q1", "A second appeal under Section 100 CPC lies only where the case involves:", ["any error of fact", "a substantial question of law", "a decree above ₹10 lakh", "fresh evidence"], 1, "The High Court frames and hears the substantial question of law."),
    q("m8q2", "Limitation for an appeal to a High Court from a decree under the CPC is:", ["30 days", "60 days", "90 days", "one year"], 2, "Article 116(a)."),
    q("m8q3", "Under Section 96(3) CPC, no appeal lies from a decree:", ["passed ex parte", "passed with the consent of the parties", "passed by a Civil Judge", "for money"], 1, "Consent decrees are not appealable."),
    q("m8q4", "Which is a recognised ground for review under Order XLVII Rule 1?", ["The judge was strict", "An error apparent on the face of the record", "A better argument has occurred to counsel", "The client has changed advocates"], 1, "Review lies for error apparent, new and important matter, or analogous sufficient reason."),
  ],
  "criminal-practice-fir-to-bail": [
    q("m9q1", "Anticipatory bail is provided in the BNSS by:", ["Section 480", "Section 482", "Section 483", "Section 528"], 1, "Section 482 BNSS corresponds to Section 438 CrPC."),
    q("m9q2", "Default bail for an offence punishable with ten years or more arises if investigation is not completed within:", ["60 days", "90 days", "120 days", "180 days"], 1, "Section 187 BNSS: 90 days for such offences, 60 days otherwise."),
    q("m9q3", "Before applying to the Magistrate under Section 175(3) BNSS, the informant should ordinarily:", ["file a civil suit", "approach the Superintendent of Police and support the application with an affidavit", "seek anticipatory bail", "send a legal notice to the accused"], 1, "Section 173(4) BNSS and Priyanka Srivastava v. State of U.P."),
    q("m9q4", "The BNSS came into force on:", ["1 July 2024", "25 December 2023", "1 April 2025", "15 August 2024"], 0, "1 July 2024."),
  ],
  "criminal-trial-and-quashing": [
    q("m10q1", "The High Court's inherent power is saved in the BNSS by:", ["Section 173", "Section 223", "Section 482", "Section 528"], 3, "Section 528 BNSS corresponds to Section 482 CrPC."),
    q("m10q2", "State of Haryana v. Bhajan Lal (1992) is known for:", ["bail principles", "illustrative categories where criminal proceedings may be quashed", "default bail", "the electronic evidence certificate"], 1, "It lists seven illustrative categories."),
    q("m10q3", "Under the proviso to Section 223 BNSS, before taking cognizance on a complaint the Magistrate must:", ["send the complaint to the police", "give the accused an opportunity of being heard", "frame charges", "record the accused's statement"], 1, "A new safeguard in the BNSS."),
    q("m10q4", "The court personally examines the accused after prosecution evidence in order to:", ["obtain a confession", "let the accused explain the incriminating circumstances in the evidence", "decide bail", "fix the sentence"], 1, "The Section 313 CrPC examination, carried into the BNSS."),
  ],
  "writs-and-high-court-practice": [
    q("m11q1", "Which writ questions a person's authority to hold a public office?", ["Mandamus", "Certiorari", "Quo warranto", "Prohibition"], 2, "Quo warranto: by what authority."),
    q("m11q2", "Under Whirlpool Corporation (1998), which is not a ground for entertaining a writ despite an alternative remedy?", ["Enforcement of a fundamental right", "Violation of natural justice", "The order is wholly without jurisdiction", "The petitioner prefers the High Court"], 3, "The other three are the recognised exceptions, with a challenge to the vires of a law."),
    q("m11q3", "Article 227 gives the High Court:", ["original jurisdiction over civil suits", "superintendence over courts and tribunals in its territory", "power to hear appeals from the Supreme Court", "power to make laws"], 1, "Superintendence."),
    q("m11q4", "Habeas corpus is used to:", ["compel performance of a public duty", "test the legality of a person's detention", "quash a tribunal's order", "stop a court proceeding"], 1, "The detained person is produced and the detention examined."),
  ],
  "tribunals-consumer-arbitration-cheques": [
    q("m12q1", "A District Consumer Commission hears complaints where the consideration paid is up to:", ["₹20 lakh", "₹50 lakh", "₹1 crore", "₹2 crore"], 1, "Pecuniary jurisdiction notified in 2021."),
    q("m12q2", "An application to set aside an arbitral award under Section 34 must be made within:", ["30 days, no extension", "three months, extendable by up to 30 days", "one year", "any time before enforcement"], 1, "Section 5 of the Limitation Act does not apply (Popular Construction, 2001)."),
    q("m12q3", "Under Section 138 NI Act, the payee must give notice of demand within:", ["15 days of dishonour information", "30 days of dishonour information", "three months of the cheque date", "one year"], 1, "30 days of receiving information of dishonour."),
    q("m12q4", "An award of a Lok Adalat:", ["can be appealed to the District Judge", "is deemed a decree and no appeal lies from it", "needs the High Court's confirmation", "binds only one party"], 1, "Section 21, Legal Services Authorities Act, 1987."),
  ],
  "the-craft": [
    q("m13q1", "The law declared by the Supreme Court binds all courts in India under:", ["Article 32", "Article 136", "Article 141", "Article 226"], 2, "Article 141."),
    q("m13q2", "An AI tool gives you a case citation that supports your point. You should:", ["cite it, since the tool is usually right", "verify it against an authoritative source and read the judgment before relying on it", "cite it with a footnote saying it came from AI", "ask the tool if it is sure"], 1, "Fabricated citations have been criticised by courts; verify every one."),
    q("m13q3", "The ratio decidendi of a judgment is:", ["any observation by the judge", "the principle necessary to the decision", "the headnote", "the operative order only"], 1, "The ratio binds; obiter does not."),
    q("m13q4", "GST on legal services by an advocate to a business entity is generally:", ["paid by the advocate under forward charge", "paid by the business recipient under reverse charge", "never payable", "payable only on fees above ₹1 crore"], 1, "Reverse charge applies; take a CA's advice on specific cases."),
  ],
};

/** Final exam bank: three per module (39). Each attempt draws RULES.examQuestions of these at random. */
export const EXAM_BANK: Question[] = [
  q("x1a", "An advocate in full-time salaried employment with a company:", ["may practise in the evenings", "may not practise as an advocate while so employed", "may practise only in tribunals", "may practise with the employer's permission"], 1, "Rule 49 of the BCI Rules."),
  q("x1b", "Order III CPC deals with:", ["summons", "recognised agents and pleaders", "parties to suits", "frame of suit"], 1, "Rule 4 requires the appointment of a pleader in writing."),
  q("x1c", "When taking over a brief from another advocate, the proper first step is to:", ["file a fresh vakalatnama without telling anyone", "ask for the earlier advocate's no-objection", "apply to the Bar Council", "wait for the next date"], 1, "The courtesy should be attempted and recorded."),
  q("x2a", "Under Section 20 CPC, a suit for money under a contract may be filed where:", ["the plaintiff resides only", "the defendant resides or carries on business, or the cause of action arose", "the plaintiff's bank is", "the advocate practises"], 1, "Section 20."),
  q("x2b", "Under Section 9 CPC, civil courts try:", ["only suits above a set value", "all suits of a civil nature except those expressly or impliedly barred", "only suits against private persons", "only suits with a written contract"], 1, "Always ask whether a statute bars the civil court."),
  q("x2c", "An objection to the place of suing under Section 21 CPC must be taken:", ["at any time, even in appeal", "in the court of first instance at the earliest opportunity", "only in the written statement of a commercial suit", "only after judgment"], 1, "And before settlement of issues; appellate courts allow it only on failure of justice."),
  q("x3a", "A suit for possession of immovable property based on title must be filed within twelve years from:", ["the date of the sale deed", "when the defendant's possession becomes adverse to the plaintiff", "the plaintiff's birth", "the last mutation entry"], 1, "Article 65."),
  q("x3b", "Under Section 12A of the Commercial Courts Act, pre-institution mediation is required:", ["in every commercial suit", "unless the suit contemplates urgent interim relief", "only for suits above ₹1 crore", "only if both parties agree"], 1, "Held mandatory in Patil Automation (2022)."),
  q("x3c", "Under Order VII Rule 11, an under-valued plaint is rejected:", ["at once, without notice", "if the plaintiff fails to correct the valuation within the time the court fixes", "only after trial", "never"], 1, "The court must first give time to correct it."),
  q("x4a", "A plaint that does not disclose a cause of action is:", ["returned for presentation to the proper court", "rejected under Order VII Rule 11", "kept pending", "transferred"], 1, "Order VII Rule 11(a)."),
  q("x4b", "Under Order VI Rule 2, pleadings contain:", ["evidence and arguments", "material facts, not evidence", "case law only", "the client's full narrative"], 1, "Concise material facts."),
  q("x4c", "A counter-claim by the defendant is provided by:", ["Order VIII Rule 6A", "Order VII Rule 11", "Order XXXIX Rule 1", "Section 151"], 0, "Order VIII Rule 6A."),
  q("x5a", "Attachment before judgment is provided by:", ["Order XXXVIII Rule 5", "Order XL Rule 1", "Order XXI Rule 54", "Order XXXIX Rule 3"], 0, "Order XXXVIII Rule 5."),
  q("x5b", "Under Wander Ltd. v. Antox (1990), an appellate court interferes with an interim injunction order only if:", ["it would have decided differently", "the discretion was exercised arbitrarily, capriciously or perversely, or settled principles were ignored", "the appellant is the defendant", "fresh documents are filed"], 1, "Appellate restraint on discretionary interim orders."),
  q("x5c", "A receiver is appointed under:", ["Order XXVI", "Order XXXVIII", "Order XL", "Order XLI"], 2, "Order XL."),
  q("x6a", "The certificate for admitting an electronic record as secondary evidence is now under:", ["Section 65B of the Bharatiya Sakshya Adhiniyam", "Section 63 of the Bharatiya Sakshya Adhiniyam", "Section 3 of the IT Act", "Order XIII CPC"], 1, "Section 63 BSA, formerly Section 65B of the Evidence Act."),
  q("x6b", "Settlement of issues is governed by:", ["Order X", "Order XIV", "Order XVII", "Order XX"], 1, "Order XIV."),
  q("x6c", "In Arjun Panditrao Khotkar (2020), the Supreme Court held that the certificate for an electronic record:", ["is optional if the record is clear", "is a condition precedent to admitting it as secondary evidence", "can be given only by a police officer", "is not needed in civil cases"], 1, "The certificate is mandatory."),
  q("x7a", "The executing court:", ["can correct errors on merits in the decree", "cannot go behind the decree, unless it is a nullity", "can modify the decree on equitable grounds", "must refer doubts to the trial court"], 1, "A nullity, such as one from inherent lack of jurisdiction, is the exception."),
  q("x7b", "In Rahul S. Shah v. Jinendra Kumar Gandhi (2021), the Supreme Court directed that execution proceedings be disposed of within:", ["one month", "six months", "one year", "two years"], 1, "Six months from filing, extendable only with recorded reasons."),
  q("x7c", "In a partition suit, the court ordinarily passes:", ["one final decree only", "a preliminary decree and then a final decree", "an order and no decree", "a decree of the High Court"], 1, "Order XX Rule 18."),
  q("x8a", "First appeals from original decrees are governed by:", ["Order XLI", "Order XLII", "Order XLIII", "Order XLVII"], 0, "Order XLI, with Section 96."),
  q("x8b", "Limitation for a review application under Article 124 is:", ["15 days", "30 days", "60 days", "90 days"], 1, "30 days."),
  q("x8c", "Under the proviso to Section 115 CPC, the High Court will not interfere in revision unless the order, if made for the applicant:", ["would have saved costs", "would have finally disposed of the suit or proceeding", "was passed ex parte", "was oral"], 1, "The proviso narrows revision."),
  q("x9a", "Information about a cognizable offence is recorded under:", ["Section 154 BNSS", "Section 173 BNSS", "Section 200 BNSS", "Section 35 BNSS"], 1, "Section 173 BNSS, formerly 154 CrPC."),
  q("x9b", "Arnesh Kumar v. State of Bihar (2014) concerns:", ["anticipatory bail in murder cases", "avoiding automatic arrest for offences punishable up to seven years", "quashing FIRs", "default bail"], 1, "Police must record reasons; magistrates must check them."),
  q("x9c", "Information given electronically under Section 173 BNSS must be signed by the informant within:", ["24 hours", "three days", "seven days", "fourteen days"], 1, "Three days."),
  q("x10a", "Examination of the complainant in a complaint case is under:", ["Section 173 BNSS", "Section 223 BNSS", "Section 482 BNSS", "Section 528 BNSS"], 1, "Section 223 BNSS, formerly 200 CrPC."),
  q("x10b", "A victim's right to appeal against an acquittal:", ["does not exist", "exists under the proviso carried from Section 372 CrPC into the BNSS", "exists only with the State's consent", "exists only in murder cases"], 1, "The victim may appeal against acquittal, conviction for a lesser offence or inadequate compensation."),
  q("x10c", "In Gian Singh v. State of Punjab (2012), the Supreme Court held that the High Court may quash non-compoundable offences on settlement where:", ["the offence is heinous", "the dispute is essentially private, such as commercial or matrimonial", "the accused is a public servant", "the trial is over"], 1, "Not for heinous offences or those against society."),
  q("x11a", "Certiorari is issued to:", ["compel a public duty", "quash a decision made without or in excess of jurisdiction, or with an error apparent", "release a detained person", "question a public office holder"], 1, "Certiorari quashes."),
  q("x11b", "Procedure at the Allahabad High Court and its Lucknow Bench follows:", ["the Allahabad High Court Rules, 1952", "the Supreme Court Rules, 2013", "the Code of Civil Procedure only", "the Lucknow Bench Rules, 1975"], 0, "With practice directions issued under them."),
  q("x11c", "In a writ petition, the petitioner's reply to the counter affidavit is the:", ["written statement", "rejoinder affidavit", "review petition", "caveat"], 1, "Counter, then rejoinder."),
  q("x12a", "Section 143A of the NI Act allows the trial court to order interim compensation of up to:", ["10% of the cheque amount", "20% of the cheque amount", "50% of the cheque amount", "the full cheque amount"], 1, "20%."),
  q("x12b", "Limitation for a consumer complaint under Section 69 of the 2019 Act is:", ["one year", "two years", "three years", "no limit"], 1, "Two years from the cause of action, with condonation."),
  q("x12c", "Under Section 9 of the Arbitration Act, a party may seek interim measures from the court:", ["only before arbitration begins", "before, during or after arbitral proceedings, until the award is enforced", "only after the award", "only with the tribunal's leave"], 1, "Section 9."),
  q("x13a", "Under the BCI Rules as amended in 2008, an advocate's website may carry:", ["client testimonials", "limited information such as name, contact details, qualifications and areas of practice", "a list of cases won", "fee offers"], 1, "Anything more risks breaching Rule 36."),
  q("x13b", "Obiter dicta are:", ["binding on all courts", "observations not necessary to the decision", "the operative order", "dissenting opinions only"], 1, "Persuasive, not binding."),
  q("x13c", "A decision given per incuriam is one rendered:", ["by a larger bench", "in ignorance of a binding statute or precedent", "with consent of parties", "ex parte"], 1, "It is not binding."),
];

export function quizFor(moduleSlug: string): Question[] {
  return QUIZZES[moduleSlug] ?? [];
}

export function examById(id: string): Question | undefined {
  return EXAM_BANK.find((x) => x.id === id);
}

export type PublicQuestion = { id: string; prompt: string; options: { value: number; text: string }[] };

/**
 * Strip the answer key before sending questions to the browser, and shuffle each question's
 * options. Each option keeps its original index as `value`, so grading compares against `answer`
 * directly while the position of the right answer on screen varies.
 */
export function publicQuestions(qs: Question[]): PublicQuestion[] {
  return qs.map(({ id, prompt, options }) => {
    const order = options.map((text, value) => ({ value, text }));
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return { id, prompt, options: order };
  });
}
