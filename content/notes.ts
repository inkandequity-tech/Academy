import "server-only";

// Lesson notes. Server-only: paid notes are rendered only for enrolled learners.
// Format: paragraphs separated by a blank line; lines starting with "- " form a list.
// Every lesson starts as a draft. A module lead sets `reviewed` (ISO date) after checking it
// against the bare act and the cases named. Until then the lesson page says it is a draft.
// `video` is an embed URL (YouTube unlisted, Vimeo, Bunny Stream or similar). Leave null until recorded.

export type LessonNote = { video: string | null; reviewed: string | null; body: string; task: string };

const n = (body: string, task: string, video: string | null = null, reviewed: string | null = null): LessonNote => ({
  video, reviewed, body: body.trim(), task,
});

export const NOTES: Record<string, LessonNote> = {
  // ---------------------------------------------------------------- 1. Entering the profession
  "entering-the-profession/from-enrolment-to-first-day": n(`
An advocate in Uttar Pradesh is enrolled by the Bar Council of Uttar Pradesh under the Advocates Act, 1961. Section 24 sets the qualifications: citizenship, age of at least 21, a law degree from a recognised university, and the fee and conditions the State Bar Council prescribes.

Enrolment is not the end of the gate. The Bar Council of India conducts the All India Bar Examination, and passing it is the route to the Certificate of Practice. Keep both certificates, and your identity card, in the file you carry to court in your first months.

The most important decision of the first year is not a case. It is the senior you sit with. Look for a chamber where:
- files are read before hearings, not on the way to court;
- juniors draft and are corrected, not only carry files;
- the senior appears in the forums you want to learn.

Expect to spend the first year mostly listening. Sit through full days in court, including matters that are not yours.
`, "Write down three forums you want to appear in within two years, and the name of one advocate who appears there regularly whom you could ask to sit with."),

  "entering-the-profession/duties-under-the-bci-rules": n(`
Part VI, Chapter II of the Bar Council of India Rules sets out the standards of professional conduct. They are grouped by whom the duty is owed to.

- To the court: act with dignity, do not influence the court by illegal means, do not appear in matters where you are a witness or have an interest, and appear in prescribed dress.
- To the client: do not withdraw from a brief without sufficient cause and reasonable notice, keep the client's confidences, account for the client's money, and do not stipulate a fee contingent on the result (Rule 20).
- To the opponent: do not negotiate directly with a party who is represented by an advocate.
- To colleagues: do not solicit work or advertise, directly or indirectly (Rule 36).

Rule 49 adds that an advocate shall not be a full-time salaried employee of any person, firm or company while practising. If you take a job, your practice pauses.

Rule 36 matters more now that advocates are online. A 2008 amendment allows a website with limited information: name, address, contact details, enrolment details, qualifications and areas of practice. Testimonials, claims about results and superlatives about the advocate are outside it.
`, "Read Rule 36 in the BCI Rules and list three things a junior advocate's Instagram profile should not contain."),

  "entering-the-profession/vakalatnama-and-appearance": n(`
Order III of the Code of Civil Procedure deals with recognised agents and pleaders. Rule 4 requires the appointment of a pleader to be in writing, signed by the party, and filed in court. That writing is the vakalatnama.

A vakalatnama in U.P. courts carries the welfare stamp required for the Advocates' Welfare Fund. Check the current value with the bar association before you file. Write your name, address and contact number clearly; registries reject unclear ones.

When you take over a matter from another advocate, ask for the earlier advocate's no-objection before you file your vakalatnama. If it is refused, the client can apply to the court, but the courtesy should be attempted and recorded.

The appointment lasts until the proceedings end or the vakalatnama is withdrawn with the court's leave. It usually covers applications and appeals arising in the same proceeding, but read the terms printed on the form you use.
`, "Fill in a blank vakalatnama for a fictional client in a civil suit at the Civil Judge (Senior Division), Lucknow."),

  "entering-the-profession/court-craft": n(`
The cause list is published the evening before. Read it at night, not at the gate. Note the court number, the item number and whether the matter is listed for admission, orders or hearing.

When your matter is called, stand, give your name and say whom you appear for. Address the bench politely. Many courts accept "Sir" or "Your Honour"; follow what your senior uses in that court.

Mentioning an urgent matter out of turn is a request, not a right. Each court has its own practice for mentioning; learn it before you need it.

Dress is prescribed in Part VI, Chapter IV of the BCI Rules: a black coat or black buttoned-up jacket with white bands. The gown is optional except in the Supreme Court and High Courts.

The eCourts services app and the High Court's website show case status, orders and next dates. Check them every evening for every file in your diary.
`, "Download tomorrow's cause list for one court at the Lucknow Bench and identify one matter in each stage: fresh, admission and hearing."),

  // ---------------------------------------------------------------- 2. Courts and jurisdiction
  "courts-and-jurisdiction/the-court-hierarchy": n(`
Civil courts in Uttar Pradesh are organised under the Bengal, Agra and Assam Civil Courts Act, 1887. In each district there is a District Judge, Civil Judges (Senior Division) and Civil Judges (Junior Division). Their pecuniary limits have been revised by state amendments; check the current figures before you file.

On the criminal side, each sessions division has a Court of Session, and below it Chief Judicial Magistrates and Judicial Magistrates.

Above the district courts sits the High Court of Judicature at Allahabad, with its principal seat at Prayagraj and a bench at Lucknow. Above that, the Supreme Court of India.

Alongside this hierarchy run special courts and tribunals created by statute: family courts, commercial courts, motor accident claims tribunals, consumer commissions, rent authorities and revenue courts. Lesson 2.4 covers them.
`, "Draw the hierarchy for your home district and mark which court would hear a suit for recovery of ₹8 lakh. Note where you found the current limit."),

  "courts-and-jurisdiction/the-lucknow-bench": n(`
Before 1948, Oudh had its own Chief Court at Lucknow. The United Provinces High Courts (Amalgamation) Order, 1948 merged it with the High Court at Allahabad. Since then the High Court has sat at Allahabad (now Prayagraj) and at Lucknow.

The Lucknow Bench hears matters arising from the districts of the old Oudh area. Which bench a writ belongs to depends on where the cause of action arose and where the respondent authority sits. Filing at the wrong bench wastes weeks; check the jurisdiction before drafting.

Both benches follow the Allahabad High Court Rules, 1952, with practice directions issued from time to time.
`, "Make a list of the districts within the Lucknow Bench's jurisdiction from the High Court's website and keep it in your diary."),

  "courts-and-jurisdiction/place-of-suing": n(`
Section 9 CPC gives civil courts jurisdiction over all suits of a civil nature, except those expressly or impliedly barred. Always ask first whether a statute bars the civil court.

Sections 15 to 20 then decide which civil court:
- Section 15: file in the court of the lowest grade competent to try the suit.
- Section 16: suits about immovable property go where the property is situated.
- Section 17: if the property lies in more than one court's jurisdiction, any of those courts.
- Section 19: suits for wrongs to the person or to movable property may be filed where the wrong was done or where the defendant resides, at the plaintiff's option.
- Section 20: other suits go where the defendant resides or carries on business, or where the cause of action arose wholly or in part.

Section 21 limits objections to the place of suing. They must be taken in the court of first instance at the earliest opportunity, and in any case before issues are settled. An appellate court will not allow them unless there has been a failure of justice.
`, "For a contract signed in Lucknow, performed in Kanpur, with the defendant living in Noida, list every court with territorial jurisdiction under Section 20."),

  "courts-and-jurisdiction/special-courts-and-forums": n(`
- Commercial courts: the Commercial Courts Act, 2015 applies to commercial disputes of a specified value of not less than ₹3 lakh. Its procedure is stricter: pre-institution mediation, a statement of truth and firm time limits for the written statement.
- Family courts: under the Family Courts Act, 1984, matrimonial, maintenance and custody matters go to the family court where one has been set up.
- Revenue courts: many disputes about agricultural land and revenue records go to revenue courts under the Uttar Pradesh Revenue Code, 2006, and the civil court's jurisdiction over them is barred.
- Rent: tenancy matters in urban areas are governed by the Uttar Pradesh Regulation of Urban Premises Tenancy Act, 2021, which created rent authorities and rent tribunals. Older disputes may still be governed by the 1972 Act.
- Tribunals and commissions are covered in Module 12.

The test is the same every time: which statute governs the dispute, and does it name a forum?
`, "Pick three files from your senior's diary and write down which statute decides the forum for each."),

  // ---------------------------------------------------------------- 3. The first brief
  "the-first-brief/the-client-conference": n(`
A client usually tells the story in the order it hurts, not the order it happened. Your job in the first conference is to turn that into a list of dates.

- Take every document the client has, even ones they think are irrelevant. Make copies, return originals.
- Ask who else knows what happened, and what they might say.
- Note every date: of the agreement, of each payment, of each notice, of the last refusal. Limitation runs from one of them.
- Ask what the client has already filed or received: a complaint, a notice, an earlier suit.
- Check for a conflict: have you or your senior acted for the other side?

What the client tells you for the purpose of obtaining legal advice is a privileged professional communication under the Bharatiya Sakshya Adhiniyam, 2023. Keep notes in the file, not on loose paper.

End the conference by saying what happens next and when, in plain words.
`, "Interview a friend about any dispute they have had (a deposit, a phone repair) and produce a one-page list of dates."),

  "the-first-brief/limitation-first": n(`
Check limitation before you draft anything. Section 3 of the Limitation Act, 1963 requires the court to dismiss a suit, appeal or application filed after the prescribed period, even if limitation has not been set up as a defence.

- Section 5 allows delay to be condoned for appeals and applications on sufficient cause. It does not apply to suits.
- Section 12 excludes the day from which time runs and the time needed to obtain a certified copy of the decree or order appealed against.
- Section 14 excludes time spent prosecuting, with due diligence and in good faith, a proceeding in a court without jurisdiction.

The articles you will use most:
- Article 54: specific performance, three years from the date fixed for performance or, if none, from when the plaintiff has notice that performance is refused.
- Article 58: declaration, three years from when the right to sue first accrues.
- Article 65: possession of immovable property based on title, twelve years from when the defendant's possession becomes adverse.
- Article 113: any suit not otherwise provided for, three years.
- Article 137: any application not otherwise provided for, three years.
`, "Take the list of dates from lesson 3.1 and calculate the last date for filing, naming the article you relied on."),

  "the-first-brief/notices-before-suit": n(`
Section 80 CPC requires two months' written notice before suing the Government or a public officer for an act done in official capacity. Section 80(2) allows a suit without notice, with the court's leave, when urgent relief is needed; the court must still hear the government before granting the relief.

Under Section 12A of the Commercial Courts Act, 2015, a commercial suit that does not seek urgent interim relief cannot be filed until pre-institution mediation has been exhausted. The Supreme Court held this mandatory in Patil Automation v. Rakheja Engineers (2022).

Outside these, a legal notice is not usually compulsory, but it is often wise. It fixes a date of demand, it sometimes settles the matter, and the reply often tells you the defence.

Draft notices in calm language. Every sentence in it may be read out in court later.
`, "Draft a two-page legal notice demanding refund of a security deposit, with a 15-day deadline."),

  "the-first-brief/valuation-and-court-fees": n(`
Every plaint states the value of the suit for jurisdiction and for court fees. The Suits Valuation Act, 1887 and the Court Fees Act, 1870, as amended for Uttar Pradesh, govern how.

Some suits pay an ad valorem fee, a percentage of the value claimed. Others pay a fixed fee. Valuation decides both the fee and which court is competent, so a wrong figure can send the suit to the wrong court.

If a suit is under-valued, or the plaint is on insufficiently stamped paper, Order VII Rule 11 lets the court reject the plaint, but only after the plaintiff fails to correct the valuation or pay the deficit within the time the court fixes.

Keep the fee calculation in the file. Opponents raise valuation objections precisely because juniors forget how they arrived at the figure.
`, "Value a suit for possession and mesne profits of a shop in Lucknow and record each step of the calculation."),

  // ---------------------------------------------------------------- 4. Drafting civil pleadings
  "drafting-civil-pleadings/order-vi-the-rules-of-pleading": n(`
Order VI Rule 2 CPC: a pleading states the material facts relied on, in concise form, but not the evidence by which they are to be proved. Dates, sums and numbers go in figures as well as words.

Rule 4 requires particulars, with dates and items, where a party relies on misrepresentation, fraud, breach of trust, wilful default or undue influence. A bare allegation of fraud is not enough.

Rule 15 requires verification: which paragraphs are true to the deponent's knowledge and which on information believed to be true. Rule 15A requires a statement of truth in commercial suits.

Rule 17 allows amendment at any stage for the purpose of determining the real question in controversy. Its proviso bars amendment after trial has commenced unless the court finds that the party could not have raised the matter earlier despite due diligence. Bring amendments early.
`, "Rewrite a paragraph that says 'the defendant fraudulently cheated the plaintiff' so that it complies with Order VI Rule 4."),

  "drafting-civil-pleadings/the-plaint": n(`
Order VII Rule 1 lists what a plaint must contain, including: the name of the court; the parties' names, descriptions and residences; the facts constituting the cause of action and when it arose; the facts showing the court has jurisdiction; the relief claimed; and the valuation.

Order VII Rule 11 requires the court to reject a plaint where:
- it does not disclose a cause of action;
- the relief is under-valued and the plaintiff does not correct it in the time fixed;
- the plaint is insufficiently stamped and the deficit is not paid in time;
- the suit appears from the plaint itself to be barred by any law;
- it is not filed in duplicate; or
- the plaintiff fails to comply with Rule 9.

Rule 11 is decided on the plaint and its documents, not on the defence. Draft so that the cause of action, jurisdiction and limitation are visible on the face of the plaint.

Rule 14 requires the documents relied on to be listed and produced with the plaint.
`, "Draft the cause of action and jurisdiction paragraphs of a plaint for recovery of money under an unpaid invoice."),

  "drafting-civil-pleadings/the-written-statement": n(`
Order VIII Rule 1: the defendant files a written statement within 30 days of service of summons. The court may extend this, for reasons recorded, up to 90 days. In Kailash v. Nanhku (2005), the Supreme Court read that limit as directory for ordinary civil suits, so courts can accept it later in exceptional cases.

Commercial suits are different. The outer limit is 120 days from service, and in SCG Contracts (India) v. K.S. Chamankar Infrastructure (2019) the Supreme Court held that the defendant forfeits the right to file after that.

Rules 3 to 5 require specific denial. A general denial is not enough, and an allegation of fact not denied specifically or by necessary implication is taken as admitted, except against a person under disability.

Rule 6 deals with set-off and Rule 6A with counter-claims, which are tried with the suit.
`, "Draft the preliminary objections and the reply to two paragraphs of the plaint from lesson 4.2."),

  "drafting-civil-pleadings/applications-and-affidavits": n(`
Most interim and procedural requests are made by application under the specific provision (Order XXXIX, Order VI Rule 17, Order IX Rule 13) and, where none fits, under Section 151, the court's inherent power. Name the specific provision first; Section 151 is not a substitute for a provision that exists.

Order XIX governs affidavits. An affidavit states facts the deponent can prove from their own knowledge, except in interlocutory applications where statements of belief are allowed if the grounds are stated.

A clean paper book saves hearing time:
- index with page numbers;
- list of dates and a short synopsis;
- the pleading or application;
- annexures numbered and marked as true copies;
- the affidavit and vakalatnama.

Check every page number in the index against the paper book before you file.
`, "Prepare an index and list of dates for the plaint you drafted in lesson 4.2."),

  // ---------------------------------------------------------------- 5. Interim relief
  "interim-relief/temporary-injunctions": n(`
Order XXXIX Rule 1 CPC allows a temporary injunction where property in dispute is in danger of being wasted, damaged or alienated, or where the defendant threatens to dispose of property to defeat creditors or to dispossess the plaintiff. Rule 2 covers injunctions to restrain breach of contract or other injury.

Courts apply three tests, restated in Dalpat Kumar v. Prahlad Singh (1992):
- a prima facie case;
- the balance of convenience in the applicant's favour;
- irreparable injury if the injunction is refused.

All three must be addressed in the application and in the argument. A strong prima facie case does not cure the absence of irreparable injury.

In Wander Ltd. v. Antox India (1990), the Supreme Court held that an appellate court will not substitute its own discretion for the trial court's on an interim injunction unless the discretion was exercised arbitrarily, capriciously or perversely, or settled principles were ignored. Win the injunction in the trial court.
`, "Draft the three-test section of an injunction application to stop a neighbour building over a shared passage."),

  "interim-relief/ex-parte-orders": n(`
Order XXXIX Rule 3 requires the court, before granting an injunction, to give notice to the opposite party, unless the object of the injunction would be defeated by the delay. If the court grants an ex parte injunction, it must record its reasons.

The applicant then has duties. Immediately after the order, the applicant must deliver or send by registered post to the opposite party a copy of the application, the supporting affidavit, the plaint and the documents relied on, and must file an affidavit of compliance.

Rule 3A asks the court to finally dispose of the application within 30 days of the ex parte injunction, and to record reasons if it cannot.

Ex parte orders are often vacated for suppression of facts. Disclose the unfavourable facts yourself.
`, "Write the compliance affidavit for an ex parte injunction granted in your favour this morning."),

  "interim-relief/attachment-receivers-commissions": n(`
- Order XXXVIII: arrest before judgment (Rule 1) and attachment before judgment (Rule 5), where the defendant is about to remove or dispose of property to obstruct execution of a decree. Courts treat it as a drastic remedy and expect specific facts.
- Order XL: appointment of a receiver where it is just and convenient, to protect property during the suit.
- Order XXVI: commissions, including Rule 9 local investigation, for example to report on the existing state of a building or boundary.
- Order XXXIX Rule 2A: disobedience or breach of an injunction. The court may attach the property of the person in breach and order detention in civil prison for up to three months.

Ask for the least drastic remedy that protects the client. A local commission today is often worth more than an argued injunction next month.
`, "Identify which remedy you would seek where a tenant is removing fixtures from the premises in dispute, and draft the prayer."),

  "interim-relief/caveats": n(`
Section 148A CPC lets a person who expects an application in a suit or proceeding to lodge a caveat in that court. The applicant must then serve notice of the application on the caveator, and the caveator is entitled to copies.

A caveat remains in force for 90 days from the date it is lodged, unless the application is made earlier. Renew it if the threat continues.

The caveator must serve notice of the caveat on the person expected to make the application.

Caveats are routine in property and family matters where an ex parte injunction is feared, and in the High Court before an appeal against a favourable decree is expected.
`, "Draft a caveat for a client who expects the other side to seek an ex parte injunction in a partition suit."),

  // ---------------------------------------------------------------- 6. Civil trial and evidence
  "civil-trial-and-evidence/framing-issues": n(`
Order X lets the court examine the parties to find what is admitted and what is denied. Rule 1A then requires the court to consider referring the dispute to a method of settlement under Section 89.

Order XIV governs framing issues. An issue arises when a material proposition of fact or law is affirmed by one party and denied by the other. Each issue should be answerable yes or no and should say who must prove it.

Rule 2 allows the court to try an issue of law first if it relates to jurisdiction or a bar to the suit under a law, and it can dispose of the suit.

Bring a draft list of issues to court. The party whose issues are framed often controls the trial.
`, "Frame the issues for the money suit you drafted in Module 4, marking the burden for each."),

  "civil-trial-and-evidence/the-sakshya-adhiniyam": n(`
The Bharatiya Sakshya Adhiniyam, 2023 came into force on 1 July 2024 and replaced the Indian Evidence Act, 1872. Most principles carry over, but section numbers changed. Cite the new section and, while courts adjust, mention the old one.

The basic rule of burden is unchanged: whoever wants the court to give judgment on a fact must prove it.

Documents are proved by primary evidence, the document itself, or in permitted cases by secondary evidence.

Electronic records need care. Under Section 63 of the Adhiniyam (formerly Section 65B of the Evidence Act), an electronic record is admitted as secondary evidence with a certificate in the prescribed form. In Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020), the Supreme Court held that the certificate is a condition precedent to admitting such a record. Get the certificate when you collect the evidence, not after objection.
`, "For a WhatsApp chat your client wants to rely on, list who must sign the certificate and what it must state."),

  "civil-trial-and-evidence/examining-witnesses": n(`
Order XVIII Rule 4 CPC: the examination-in-chief of a witness is on affidavit. Cross-examination and re-examination are taken in court or before a commissioner.

Leading questions, which suggest the answer, are generally not permitted in examination-in-chief or re-examination without the court's permission. They are permitted in cross-examination.

Cross-examination rules of thumb:
- Ask only questions whose answers you know or cannot hurt you.
- One fact per question.
- Put your case to the witness. If you do not challenge a statement in cross, the court may take it as accepted.
- Stop when you have the answer.

Re-examination is limited to explaining matters raised in cross. New matter needs the court's permission.
`, "Write ten cross-examination questions for a landlord who claims the tenant never paid rent for March."),

  "civil-trial-and-evidence/adjournments-and-arguments": n(`
Order XVII Rule 1 allows adjournments for sufficient cause and with costs, but its proviso says no more than three adjournments shall be granted to a party during the hearing of the suit. Courts now apply that strictly.

Order XVIII Rule 2(3A) allows written arguments to be filed before oral arguments close, with the court's permission.

Prepare final arguments as a short note:
- the issues, in order;
- for each, the evidence on record with page or exhibit numbers;
- the law, with no more than one or two authorities per point;
- the relief.

Judges remember the advocate who gave them the exhibit number.
`, "Prepare a two-page argument note on one issue from your mock suit."),

  // ---------------------------------------------------------------- 7. Decree and execution
  "decree-and-execution/judgment-decree-order": n(`
Section 2 CPC:
- 2(9) judgment: the statement of the grounds of a decree or order.
- 2(2) decree: the formal expression of an adjudication that conclusively determines the rights of the parties on any matter in controversy. It may be preliminary or final.
- 2(14) order: the formal expression of any decision of a civil court that is not a decree.

The distinction decides the remedy: a decree is appealed under Section 96; only the orders listed in Section 104 and Order XLIII are appealable as orders.

Some suits need two decrees. In a partition suit under Order XX Rule 18, the court first passes a preliminary decree declaring the shares, then a final decree dividing the property by metes and bounds.

After judgment, apply for a certified copy of the decree immediately. Time for appeal and execution is calculated from it.
`, "Read a partition judgment and identify the preliminary decree and what remains for the final decree."),

  "decree-and-execution/filing-for-execution": n(`
Section 38: a decree may be executed by the court that passed it or by the court to which it is sent for execution. Section 39 allows transfer, for example where the judgment debtor's property is in another district.

Section 51 sets out the modes: delivery of property, attachment and sale, arrest and detention, appointment of a receiver, or any other manner the relief requires.

Order XXI sets the procedure. The execution application states the decree, the amount due, and the mode of execution sought, with details of the property.

Article 136 of the Limitation Act allows twelve years from when the decree becomes enforceable, except a decree for a perpetual injunction, which has no limit.
`, "Draft an execution application for a money decree of ₹6 lakh seeking attachment of the judgment debtor's bank account."),

  "decree-and-execution/section-47": n(`
Section 47 CPC: all questions arising between the parties to the suit, or their representatives, relating to the execution, discharge or satisfaction of the decree are decided by the executing court, not by a separate suit.

The executing court cannot go behind the decree. It must take the decree as it stands. The only exception is a decree that is a nullity, for example one passed by a court with an inherent lack of jurisdiction.

Objections under Section 47 are a common delaying tactic. Answer them quickly and ask the court to decide them with costs where they are frivolous.
`, "Write a reply to an objection that the decree is wrong on merits, explaining why the executing court cannot consider it."),

  "decree-and-execution/resistance-and-delay": n(`
Order XXI Rules 97 to 101 deal with resistance or obstruction to delivery of possession. The decree holder applies, and the executing court decides all questions, including title, raised by the person resisting. No separate suit is needed or allowed for those questions.

In Rahul S. Shah v. Jinendra Kumar Gandhi (2021), the Supreme Court noted the long delays in execution and issued directions, including that executing courts should dispose of execution proceedings within six months of filing, extendable only for recorded reasons.

Practical points:
- File for execution as soon as the decree is enforceable.
- Identify assets early, ideally during the suit.
- Cite Rahul S. Shah when the matter drifts.
`, "List the steps you would take to deliver possession of a house where a relative of the judgment debtor is now living in it."),

  // ---------------------------------------------------------------- 8. Appeals, revision and review
  "appeals-revision-review/first-appeals": n(`
Section 96 CPC: an appeal lies from every original decree to the court authorised to hear appeals. A first appeal is a rehearing on facts and law.

Section 96(3): no appeal lies from a decree passed with the consent of the parties.

Order XLI governs the appeal: the memorandum of appeal sets out concise grounds, with a certified copy of the decree. Rule 5 lets the appellate court stay execution, usually on security. Rule 27 allows additional evidence only in limited cases.

Frame grounds as errors the court made: a finding against the evidence, a document misread, a legal point missed. Avoid repeating the whole plaint.
`, "Draft five grounds of appeal against a decree dismissing a suit for specific performance as time-barred."),

  "appeals-revision-review/second-appeals": n(`
Section 100 CPC: a second appeal lies to the High Court from an appellate decree only if the case involves a substantial question of law.

The memorandum must state the substantial question precisely. The High Court frames the question at admission and hears the appeal on it. Findings of fact are generally final at the first appeal, unless perverse or based on no evidence.

A substantial question is one that is debatable, not settled, and that affects the outcome. A plea that the courts below appreciated evidence wrongly is not one.
`, "Write two candidate substantial questions of law for a second appeal in a boundary dispute, and say why each qualifies."),

  "appeals-revision-review/revision": n(`
Section 115 CPC lets the High Court call for the record of a case decided by a subordinate court where no appeal lies, if that court exercised a jurisdiction it did not have, failed to exercise one it had, or acted illegally or with material irregularity in exercising it.

Its proviso restricts the power: the High Court will not vary or reverse an order unless the order, had it been made in favour of the party applying, would have finally disposed of the suit or proceeding.

Uttar Pradesh amendments distribute revisional power between the High Court and the District Judge according to the value of the suit. Check the current amendment before filing.

Revision is not a second appeal on facts.
`, "For an order rejecting an amendment application, decide whether revision lies and write a short note explaining why."),

  "appeals-revision-review/review-and-time-limits": n(`
Section 114 and Order XLVII Rule 1 CPC allow review by the same court on:
- discovery of new and important matter or evidence that could not be produced earlier despite due diligence;
- a mistake or error apparent on the face of the record; or
- any other sufficient reason, read as analogous to the first two.

Review is not an appeal in disguise.

Time limits under the Limitation Act:
- Article 116(a): appeal to a High Court from a decree or order, 90 days.
- Article 116(b): appeal to any other court, 30 days.
- Article 124: review of judgment, 30 days.

Section 12 excludes the time needed to obtain the certified copy. Apply for it on the day of judgment and keep the receipt.
`, "Calculate the last date for appealing a district court decree of 2 January to the High Court where the certified copy was ready on 20 January."),

  // ---------------------------------------------------------------- 9. Criminal practice: FIR to bail
  "criminal-practice-fir-to-bail/the-new-criminal-codes": n(`
From 1 July 2024, three statutes replaced the old criminal codes:
- the Bharatiya Nyaya Sanhita, 2023 replaced the Indian Penal Code;
- the Bharatiya Nagarik Suraksha Sanhita, 2023 replaced the Code of Criminal Procedure;
- the Bharatiya Sakshya Adhiniyam, 2023 replaced the Indian Evidence Act.

The BNSS contains a savings clause: appeals, applications, trials, inquiries and investigations pending when it came into force continue under the old Code. Offences committed before 1 July 2024 are punished under the IPC. Check both the date of the offence and the stage of the proceeding.

Keep a concordance table in your diary. Courts and clients still use the old numbers, and your drafts should give both until the old ones fade.
`, "Make a concordance card of ten sections you expect to use: FIR, arrest, bail, anticipatory bail, inherent power, and the matching BNS offences."),

  "criminal-practice-fir-to-bail/the-fir": n(`
Section 173 BNSS (formerly Section 154 CrPC) governs information about cognizable offences. Changes worth knowing:
- Information may be given at any police station regardless of where the offence happened, the zero FIR.
- Information may be given electronically. It must then be signed by the informant within three days.
- For offences punishable with three to seven years, the officer may, with permission, hold a preliminary enquiry within fourteen days to see if a prima facie case exists.

If the officer refuses to register, the informant may send the substance to the Superintendent of Police under Section 173(4). After that, the informant may apply to the Magistrate under Section 175(3) BNSS (formerly Section 156(3) CrPC).

In Priyanka Srivastava v. State of U.P. (2015), the Supreme Court required such applications to be supported by an affidavit and to show that the police were approached first.
`, "Draft an application under Section 175(3) BNSS for a client whose complaint of cheating was not registered."),

  "criminal-practice-fir-to-bail/arrest-and-notice": n(`
Section 35 BNSS (formerly Sections 41 and 41A CrPC) governs arrest without warrant. Where arrest is not required, the police must issue a notice of appearance under Section 35(3). A person who complies is not to be arrested unless the officer records reasons.

In Arnesh Kumar v. State of Bihar (2014), the Supreme Court directed that for offences punishable with imprisonment up to seven years, the police must not arrest automatically and must record reasons, and magistrates must check those reasons before authorising detention.

In Satender Kumar Antil v. CBI (2022), the Court reinforced these directions and laid down categories and principles for bail, observing that bail is the rule.

When a client receives a notice of appearance, the advice is usually to comply, with you present, and to keep proof of compliance.
`, "Draft a short reply to a notice of appearance, confirming the client will appear on the date given."),

  "criminal-practice-fir-to-bail/bail": n(`
The BNSS provisions and their CrPC equivalents:
- Section 478 (436): bail in bailable offences, a right.
- Section 480 (437): bail in non-bailable offences by a court other than the High Court or Sessions Court.
- Section 482 (438): anticipatory bail, a direction that the applicant be released on bail if arrested.
- Section 483 (439): special powers of the High Court and Court of Session regarding bail.
- Section 187 (167): default bail if the investigation is not completed within 60 days, or 90 days for offences punishable with death, life imprisonment or imprisonment of ten years or more.

Default bail is an indefeasible right if claimed before the charge-sheet is filed. Apply on the day the period expires.

In Uttar Pradesh, anticipatory bail was unavailable for decades after a 1976 state amendment, and was restored in 2019. Under the BNSS it is available throughout India.

A bail application should address the nature of the offence, the evidence, the applicant's roots in the community, the risk of absconding or tampering, and the period already in custody.
`, "Draft a regular bail application under Section 483 BNSS for an accused in custody for 70 days in a cheating case."),

  // ---------------------------------------------------------------- 10. Criminal trial, quashing and appeals
  "criminal-trial-and-quashing/complaint-cases": n(`
A complaint case starts when a person complains directly to a Magistrate. Under Section 223 BNSS (formerly Section 200 CrPC), the Magistrate examines the complainant and witnesses on oath before taking cognizance.

A new proviso in Section 223 says no cognizance shall be taken without giving the accused an opportunity of being heard. Prepare for that hearing as you would for a short argument.

The Magistrate may then dismiss the complaint, or issue process if there is sufficient ground to proceed. Section 138 NI Act cases are the most common complaint cases you will see; Module 12 covers them.
`, "Prepare a one-page note for an accused at the pre-cognizance hearing in a complaint about a failed business deal."),

  "criminal-trial-and-quashing/charge-and-trial": n(`
After the charge-sheet, the accused may seek discharge. The court asks whether there is sufficient ground for proceeding, not whether the accused will be convicted.

If not discharged, the court frames charge. The charge must state the offence, the law and section, and the particulars of time, place and person. A defective charge is a ground of appeal only where it has caused a failure of justice.

At trial, the prosecution examines its witnesses and the defence cross-examines. The court then examines the accused personally to let them explain the incriminating circumstances in the evidence, the procedure known as the Section 313 statement under the CrPC and carried into the BNSS. Circumstances not put to the accused cannot ordinarily be used against them.

Defence evidence follows, then arguments and judgment.
`, "List the incriminating circumstances you expect the court to put to an accused in a theft case where the property was recovered from his house."),

  "criminal-trial-and-quashing/quashing": n(`
Section 528 BNSS (formerly Section 482 CrPC) preserves the High Court's inherent power to prevent abuse of process and secure the ends of justice. Article 226 is also used to challenge FIRs.

In State of Haryana v. Bhajan Lal (1992), the Supreme Court gave illustrative categories where an FIR or proceeding may be quashed, including where the allegations, taken at face value, disclose no offence, where they are absurd and inherently improbable, or where the proceeding is manifestly malicious.

In Gian Singh v. State of Punjab (2012), the Court held that the High Court may quash proceedings for non-compoundable offences on a settlement where the dispute is essentially private, such as commercial or matrimonial disputes, but not for heinous offences or those against society.

A quashing petition succeeds on the FIR itself. Do not argue disputed facts.
`, "Read an FIR for criminal breach of trust arising from an unpaid supply contract and identify which Bhajan Lal category, if any, applies."),

  "criminal-trial-and-quashing/criminal-appeals": n(`
A convicted accused may appeal. The forum depends on the court that convicted and the sentence. While the appeal is pending, the appellate court may suspend the sentence and release the appellant on bail, a provision carried from Section 389 CrPC into the BNSS.

The State may appeal against acquittal with leave. A victim also has a right of appeal against an acquittal, a conviction for a lesser offence or inadequate compensation, under the proviso carried from Section 372 CrPC into the BNSS.

Revision lies against orders that are not interlocutory, to the Sessions Court or High Court.

In a criminal appeal, the record is everything. Read every deposition, not only the judgment.
`, "Draft an application for suspension of sentence for an appellant sentenced to three years who was on bail during trial."),

  // ---------------------------------------------------------------- 11. Writs and High Court practice
  "writs-and-high-court-practice/the-writ-jurisdiction": n(`
Article 226 empowers every High Court to issue writs for the enforcement of fundamental rights and "for any other purpose". Article 32 lets a person move the Supreme Court directly, but only for fundamental rights. Article 227 gives the High Court superintendence over all courts and tribunals in its territory.

The five writs:
- Habeas corpus: to produce a person held in custody and test the legality of the detention.
- Mandamus: to compel a public authority to perform a public duty.
- Certiorari: to quash a decision of a court, tribunal or authority that acted without or in excess of jurisdiction, in breach of natural justice, or with an error apparent on the record.
- Prohibition: to stop an inferior body from continuing to act beyond its jurisdiction.
- Quo warranto: to question a person's authority to hold a public office.

Most petitions you draft will seek certiorari and mandamus together: quash the order, and direct the authority to decide again lawfully.
`, "Identify the writ for each: an order of transfer passed without hearing; a pension file unpaid for two years; a person detained without production before a magistrate."),

  "writs-and-high-court-practice/maintainability": n(`
The High Court decides maintainability before merits.

Alternative remedy: an available statutory remedy is a rule of discretion, not a bar. In Whirlpool Corporation v. Registrar of Trade Marks (1998), the Supreme Court held that a writ may be entertained despite an alternative remedy where the petition seeks enforcement of a fundamental right, where there has been a violation of natural justice, where the order is wholly without jurisdiction, or where the vires of a law is challenged.

Delay and laches: there is no fixed limitation for writs, but unexplained delay can defeat a petition. Explain delay in the petition itself.

Locus: the petitioner must be aggrieved, except in public interest litigation. In State of Uttaranchal v. Balwant Singh Chaufal (2010), the Supreme Court laid down guidelines to check the bona fides of PIL petitioners.

Disputed questions of fact are usually left to a civil suit.
`, "For a writ against a demolition notice where an appeal lies to the Commissioner, write the paragraph explaining why the writ should still be entertained."),

  "writs-and-high-court-practice/drafting-a-writ-petition": n(`
A writ petition at the High Court generally contains:
- the cause title, with the State impleaded through its Principal Secretary or Secretary of the department, and the authority that passed the order;
- a synopsis and list of dates;
- the facts, in numbered paragraphs, each tied to an annexure;
- the grounds, each a separate legal point;
- the prayers: the main relief, then interim relief, then "any other order";
- the supporting affidavit.

The respondent files a counter affidavit. The petitioner replies with a rejoinder affidavit. Further facts go by supplementary affidavit, with leave.

Annex the impugned order first. A judge should be able to see what you are challenging within a minute.
`, "Draft the list of dates and three grounds for a writ against a suspension order passed without a charge-sheet for over a year."),

  "writs-and-high-court-practice/filing-and-listing": n(`
Procedure at both benches follows the Allahabad High Court Rules, 1952 and the practice directions issued under them. Read the current directions on the High Court's website; they change.

The general path:
- File the petition, now usually through the e-filing portal, with court fee and a copy for the State counsel where required.
- The registry checks it and reports defects. Cure defects quickly; a petition with pending defects does not get listed.
- The matter is listed as a fresh case. Check the cause list for the court and item number.
- On the first date, the court may issue notice, grant interim relief, call for instructions from State counsel, or dismiss.

Serve advance copies on the Chief Standing Counsel or Government Advocate's office as the rules require, and keep the receipt.
`, "Walk through the High Court's e-filing portal and list each document you would upload for a fresh writ petition."),

  // ---------------------------------------------------------------- 12. Tribunals, consumer, arbitration, cheques
  "tribunals-consumer-arbitration-cheques/consumer-commissions": n(`
The Consumer Protection Act, 2019 set up District, State and National Commissions. Under the pecuniary jurisdiction notified in 2021, based on the value of consideration paid:
- District Commission: up to ₹50 lakh;
- State Commission: above ₹50 lakh and up to ₹2 crore;
- National Commission: above ₹2 crore.

A complaint may be filed where the opposite party resides or carries on business, where the cause of action arises, or where the complainant resides or personally works for gain.

Section 69 sets limitation at two years from the date the cause of action arises, with condonation for sufficient cause.

Consumer complaints are common early work: builders, insurers, hospitals and online sellers. They reward a clear chronology and complete documents.
`, "Decide the forum and draft the chronology for a complaint about a ₹14 lakh car that was delivered with a defective engine."),

  "tribunals-consumer-arbitration-cheques/arbitration-in-court": n(`
Under the Arbitration and Conciliation Act, 1996, courts help and supervise but do not decide the merits:
- Section 8: a judicial authority must refer the parties to arbitration if a party applies, not later than its first statement on the substance, and an arbitration agreement exists.
- Section 9: a party may seek interim measures from the court before, during or after arbitral proceedings, until the award is enforced.
- Section 11: the court appoints the arbitrator if the parties' procedure fails.
- Section 29A: the award should be made within twelve months of completion of pleadings, extendable by six months by consent, and beyond that only by the court.
- Section 34: an application to set aside an award must be made within three months of receiving it, extendable by up to 30 days on sufficient cause, and no further.

The Section 34 deadline is strict. In Union of India v. Popular Construction (2001), the Supreme Court held Section 5 of the Limitation Act does not extend it.
`, "Calculate the outer deadline for a Section 34 application where the award was received on 10 August."),

  "tribunals-consumer-arbitration-cheques/cheque-dishonour": n(`
Section 138 of the Negotiable Instruments Act, 1881 makes dishonour of a cheque for insufficiency of funds an offence, if:
- the cheque was presented within its validity, three months from its date;
- the payee gave written notice of demand within 30 days of receiving information of dishonour; and
- the drawer failed to pay within 15 days of receiving the notice.

The complaint must be filed within one month of the cause of action, which arises on the expiry of those 15 days. Delay can be condoned for sufficient cause.

Section 142 places jurisdiction where the payee's bank branch is, for a cheque delivered for collection through an account.

Section 143A allows the court to order interim compensation of up to 20% of the cheque amount. Section 148 allows the appellate court to order the appellant to deposit at least 20% of the fine or compensation.
`, "Make a timeline from a cheque dated 1 March, dishonoured on 15 April with the memo received on 18 April, to the last date for filing the complaint."),

  "tribunals-consumer-arbitration-cheques/tribunals-rera-lok-adalat": n(`
- Central Administrative Tribunal: under the Administrative Tribunals Act, 1985, service disputes of most central government employees go first to the CAT. Section 21 sets one year from the final order, with condonation.
- State service matters: U.P. government employees may approach the U.P. State Public Services Tribunal under the U.P. Public Services (Tribunal) Act, 1976, for matters within its jurisdiction. Others approach the High Court under Article 226.
- RERA: the Real Estate (Regulation and Development) Act, 2016 created the U.P. Real Estate Regulatory Authority for complaints by allottees against promoters, with appeals to the Appellate Tribunal.
- Lok Adalat: under the Legal Services Authorities Act, 1987, an award of a Lok Adalat is deemed a decree of a civil court, is final, and no appeal lies from it.

Know where these forums sit in Lucknow and how their registries work. They are where you will first appear alone.
`, "Find the address and filing hours of the U.P. RERA office and the Lucknow bench of the CAT, and note what each requires at filing."),

  // ---------------------------------------------------------------- 13. The craft
  "the-craft/legal-research": n(`
Start every question with the bare act, in its current form. India Code (indiacode.nic.in) publishes central acts; the U.P. government publishes state acts and rules. Check amendments.

Then the cases. Use reported judgments from a recognised reporter or the court's own website. Free databases are useful for finding cases; confirm the text from an authoritative source before filing.

eCourts services and the High Court's website give case status and orders, useful for checking whether a judgment you rely on has been stayed or reversed.

Reading a judgment:
- Facts and the question decided.
- The ratio decidendi: the principle necessary to the decision. This is what binds.
- Obiter dicta: observations not necessary to the decision. Persuasive, not binding.
- The bench strength. A larger bench binds a smaller one.
`, "Take one Supreme Court judgment from this course and write its ratio in no more than three sentences."),

  "the-craft/citing-and-verifying": n(`
Article 141 of the Constitution: the law declared by the Supreme Court is binding on all courts in India. High Court judgments bind courts subordinate to that High Court.

A decision given per incuriam, in ignorance of a binding statute or precedent, is not binding.

Before citing any case:
- confirm the citation, parties and year from an authoritative source;
- read the paragraph you rely on, not a headnote;
- check that it has not been overruled, reversed or distinguished on your point.

AI tools can help find leads, summarise a long record or produce a first draft. They also produce citations that look real and are not. Courts in India and abroad have criticised filings with fabricated authorities. Treat every AI-provided citation as unverified until you have read the judgment yourself, and never put client confidences into a tool without knowing how it handles them.
`, "Ask an AI tool for three cases on a point from Module 5, then verify each one and record what you found."),

  "the-craft/fees-clients-conduct": n(`
Agree fees in advance and in writing, and issue a receipt or fee note for every payment. Rule 20 of the BCI Rules bars fees contingent on the result.

Keep client money separate and account for it. Return documents when the matter ends.

Confidentiality continues after the brief ends. Before accepting a matter, check you have not acted for the other side in the same or a connected matter.

Rule 36 bars soliciting work and advertising. It applies to social media too. You may share legal information and commentary, but not claims about results, testimonials or invitations to instruct you.
`, "Draft a one-page fee note template for a junior advocate, with the terms you would always include."),

  "the-craft/running-a-chamber": n(`
A chamber runs on its diary. For every matter, record the next date, the stage and what must be done before it. Update it from the cause list and the court website each evening.

Keep a separate limitation register: every deadline for filing, replies, appeals and execution, with a reminder well before the last date. Most professional negligence starts with a missed date.

File hygiene:
- one file per matter, with an index;
- originals returned to the client, copies kept;
- orders filed in date order with the next date written on top.

Tax: under the GST notifications, legal services by an advocate to a business entity are taxed under reverse charge, so the business recipient pays the GST. Services to individuals not in business are generally exempt. Take a chartered accountant's advice on your own position.

Train your juniors the way you wanted to be trained: give them a draft to write, then sit with them while you correct it.
`, "Set up a diary and limitation register for five mock matters from this course, with every deadline calculated."),
};
