"use client";
import { useActionState } from "react";
import { grantEnrolment, revokeCertificate, type AdminState } from "@/app/actions/admin";

function Msg({ s }: { s: AdminState }) {
  if (s.error) return <p className="form-msg bad" role="alert">{s.error}</p>;
  if (s.ok) return <p className="form-msg good" role="status">{s.ok}</p>;
  return null;
}

export function GrantForm() {
  const [s, action, pending] = useActionState<AdminState, FormData>(grantEnrolment, {});
  return (
    <form action={action}>
      <label className="field"><span>Learner's email</span><input className="input" name="email" type="email" required /></label>
      <label className="field"><span>Note</span><input className="input" name="note" placeholder="UPI reference, scholarship, staff" /></label>
      <Msg s={s} />
      <button className="btn solid small" disabled={pending}>Enrol this learner</button>
    </form>
  );
}

export function RevokeForm() {
  const [s, action, pending] = useActionState<AdminState, FormData>(revokeCertificate, {});
  return (
    <form action={action}>
      <label className="field"><span>Certificate number</span><input className="input" name="code" required /></label>
      <label className="field"><span>Reason</span><input className="input" name="reason" required /></label>
      <Msg s={s} />
      <button className="btn small" disabled={pending}>Withdraw certificate</button>
    </form>
  );
}
