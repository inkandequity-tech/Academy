# Ink & Equity Academy

A self-paced online course in courtroom practice for junior advocates, taught by the advocates of
Ink & Equity, Lucknow. Learners study 13 modules (52 lessons), pass a quiz per module, sit a timed
final examination and receive a certificate that anyone can verify online.

The site shares the design system of [ieqlaw.com](https://ieqlaw.com) (ink, vellum, lapis and zafran;
Fraunces and Instrument Sans; the chikan lattice). The Academy's own element is the **cause list**:
the syllabus is laid out as a court board, one item per module.

---

## 1. What is in the repository

```
app/                      pages and server actions (Next.js App Router)
  page.tsx                home
  course/                 syllabus, module pages, lesson pages, module quizzes
  exam/                   examination lobby and the timed attempt
  certificate/[code]      printable certificate (A4 landscape, QR code); /certificate/sample
  verify/                 public certificate check
  dashboard/              learner's progress, profile, sign out
  admin/                  enrol by hand, withdraw certificates, totals (ADMIN_EMAILS only)
  fees, faculty, faq, contact, terms, privacy, refunds
  api/razorpay/           order, verify (checkout callback) and webhook
  actions/                server actions: auth, progress, quiz, exam, profile, admin
content/
  outline.ts              modules and lesson titles (public)
  notes.ts                lesson notes, video links, review dates (server-only)
  questions.ts            quiz and exam questions with answer keys (server-only)
  faculty.ts              faculty, from ieqlaw.com/about.html
lib/                      config, Supabase clients, learner state, Razorpay, certificates
supabase/migrations/      database schema and row-level security
scripts/check-content.mjs build guard (see section 6)
public/                   fonts and faculty portraits copied from the firm site
```

**Course content lives in the repository, not the database**, so every change to a lesson or
question is reviewed in a pull request like any other text. The database holds only learner
records: profiles, enrolments, orders, progress, attempts and certificates.

## 2. How a learner moves through it

1. Reads Module 1 free, without an account.
2. Signs in with email (a link and a six-digit code; no password).
3. Pays once through Razorpay (UPI, card, net banking). The webhook enrols them even if the browser closes.
4. Marks lessons complete, passes each module quiz (3 of 4; unlimited retakes, answers explained).
5. Sits the final examination: 30 questions drawn at random from a bank of 39, 45 minutes, pass mark 21, three attempts. Answers save as they go; the server enforces the deadline.
6. On a pass, a certificate is issued at once with a number like `IEQA-2026-7KQ4-M2XD` and a QR code linking to `/verify/<number>`.

Rules (pass marks, minutes, attempts) are in `lib/config.ts` under `RULES`.

## 3. Setting it up

### Supabase

1. Create a project at supabase.com (region: Mumbai).
2. SQL editor: run `supabase/migrations/0001_academy.sql`.
3. Authentication > Providers > Email: leave it enabled (the default).
4. Authentication > Email templates > Magic Link: include the code so learners on phones can type it:
   ```
   <p>Your sign-in code is <b>{{ .Token }}</b>.</p>
   <p>Or <a href="{{ .ConfirmationURL }}">sign in with this link</a>.</p>
   ```
5. Authentication > URL configuration: Site URL `https://academy.ieqlaw.com`; add `https://academy.ieqlaw.com/auth/callback` to redirect URLs.
6. Set a custom SMTP sender (Project settings > Auth) before launch; Supabase's built-in sender is rate-limited.

### Razorpay

1. Complete KYC. Razorpay checks that the site has Terms, Privacy, Refunds and Contact pages; they are at `/terms`, `/privacy`, `/refunds` and `/contact`.
2. Create API keys (test keys first).
3. Webhooks: URL `https://academy.ieqlaw.com/api/razorpay/webhook`, events `payment.captured` and `order.paid`, with a secret.

### Environment variables

Copy `.env.example` to `.env.local` for development, and add the same values in Vercel:

| Variable | Where it comes from |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://academy.ieqlaw.com` |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase > Project settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | same page. Server only, never commit it |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Razorpay > API keys |
| `RAZORPAY_WEBHOOK_SECRET` | the secret you set on the webhook |
| `COURSE_PRICE_INR` | the fee in rupees, GST included |
| `ADMIN_EMAILS` | comma-separated emails that may open `/admin` |

`NEXT_PUBLIC_*` values are built into the pages, so **redeploy after changing them**.

Until Supabase is connected, the public pages and the free module work, and the learner pages
say that sign-in is being connected. Until Razorpay is connected, the fees page asks people to
write in instead of paying.

### Deploying

Import the repository into Vercel (framework: Next.js), add the variables, deploy. For the domain,
add `academy.ieqlaw.com` in Vercel and a `CNAME academy -> cname.vercel-dns.com` record wherever
ieqlaw.com's DNS is managed. This does not affect the firm site on GitHub Pages.

### Working locally

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # runs the content check, then the production build
npm run check:content  # the content check alone
```

Needs Node 22 or later.

## 4. Editing the course

- **Lesson text:** `content/notes.ts`. Paragraphs are separated by a blank line; lines starting with `- ` become a list.
- **Videos:** set `video` on a lesson to an embed URL (YouTube unlisted, Vimeo, or Bunny Stream for paid lessons that should not be shareable). Until then the lesson shows a short notice and the notes.
- **Review:** every lesson starts as a draft and says so on the page. When the module lead has checked it against the bare act, set `reviewed` to the date (`"2026-11-02"`); the page then shows "Reviewed by the module lead on …".
- **Questions:** `content/questions.ts`. Each module quiz has exactly 4; the exam bank needs at least 30. Options are shuffled for each learner, so the right answer can be written in any position.
- **Faculty and guests:** `content/faculty.ts`. Module leads are set on each module in `content/outline.ts`.
- **Name, address, fee, rules:** `lib/config.ts` and the environment.

## 5. Security model

- Learners can **read** their own rows. Enrolments, orders, graded attempts and certificates are **written only by the server** with the service-role key, so they cannot be forged from the browser.
- Quiz and exam answers are graded on the server. Answer keys and paid lesson notes are `server-only` modules and never reach the browser bundle (checked: neither appears in `.next/static`).
- Payments are confirmed by HMAC signature, both on the checkout callback and on the webhook; enrolment is idempotent.
- The exam deadline is enforced by the server. A late submission is marked on the answers saved before time ran out.
- The name on a certificate is fixed by a database trigger once issued. `/verify` exposes only name, course, date and status.

## 6. Professional conduct

The Academy is run by advocates, so the same limits as ieqlaw.com apply:

- **The Bar enrolment number is never published.** `scripts/check-content.mjs` fails the build if anything that looks like one appears.
- The build also fails on promotional wording barred by BCI Rule 36: superlatives, promises of results and invitations to instruct. The patterns are listed in the script.
- Nothing on the site invites legal work. Course pages, the footer and the terms say the course is not legal advice.
- The certificate says on its face, and on the verification page, that it is a course certificate and not a degree or a Bar Council qualification.
- No testimonials, pass-rate claims or placement promises.

## 7. Decisions for the partners before launch

These were set as reasonable defaults and need a partner's confirmation:

1. **Name.** "Ink & Equity Academy" is a working name. Change `ACADEMY.name` in `lib/config.ts`.
2. **Fee.** ₹4,999 including GST is a placeholder. Set `COURSE_PRICE_INR`. Check GST registration and invoicing with the firm's CA before taking payments.
3. **Refund policy.** Full refund within 7 days if the final examination has not been started (`/refunds`).
4. **Module leads.** Assigned from each advocate's areas on ieqlaw.com; see `content/outline.ts`.
5. **Signatories.** The certificate names Rishabh Raj and Vedant Bhargav.
6. **Lesson review.** All 52 lessons are drafts written from the statutes and leading cases they name. Each needs its module lead's review before `reviewed` is set. Pecuniary limits, welfare stamp values and High Court practice directions change; the lessons point learners to check them rather than stating figures.
7. **Guest advocates.** None listed yet (`GUESTS` in `content/faculty.ts`).
8. **Videos.** None recorded yet.
