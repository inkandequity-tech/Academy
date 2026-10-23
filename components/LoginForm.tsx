"use client";
import { useActionState } from "react";
import { authStep, type AuthState } from "@/app/actions/auth";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(authStep, { stage: "email", next });

  if (state.stage === "code") {
    return (
      <form action={action} key="code">
        <p className="form-msg good" role="status">{state.info}</p>
        <label className="field"><span>Six-digit code</span>
          <input className="input" name="code" inputMode="numeric" autoComplete="one-time-code" pattern="\d{6}" maxLength={6} required autoFocus style={{ letterSpacing: ".3em", fontSize: "1.3rem", maxWidth: 220 }} />
        </label>
        {state.error && <p className="form-msg bad" role="alert">{state.error}</p>}
        <div className="actions">
          <button className="btn solid" name="intent" value="verify" disabled={pending}>{pending ? "Checking" : "Sign in"}</button>
          <button className="btn" name="intent" value="reset" formNoValidate>Use a different email</button>
        </div>
      </form>
    );
  }

  return (
    <form action={action} key="email">
      <input type="hidden" name="next" value={next} />
      <label className="field"><span>Email</span>
        <input className="input" type="email" name="email" autoComplete="email" required />
      </label>
      <label className="field"><span>Full name</span>
        <input className="input" name="full_name" autoComplete="name" />
        <small>As it should appear on your certificate. Needed only the first time; you can change it on your dashboard until a certificate is issued.</small>
      </label>
      {state.error && <p className="form-msg bad" role="alert">{state.error}</p>}
      <div className="actions"><button className="btn solid" name="intent" value="send" disabled={pending}>{pending ? "Sending the email" : "Email me a sign-in link"}</button></div>
    </form>
  );
}
