"use client";
import { useActionState } from "react";
import { updateProfile, type ProfileState } from "@/app/actions/profile";
import type { Profile } from "@/lib/learner";

export function ProfileForm({ profile, locked }: { profile: Profile | null; locked: boolean }) {
  const [state, action, pending] = useActionState<ProfileState, FormData>(updateProfile, {});
  return (
    <form action={action}>
      <label className="field"><span>Full name</span>
        <input className="input" name="full_name" defaultValue={profile?.full_name ?? ""} required readOnly={locked} autoComplete="name" />
        <small>{locked ? "Fixed, because your certificate carries this name." : "Printed on your certificate exactly as typed here."}</small>
      </label>
      <label className="field"><span>Phone <span className="muted" style={{ fontWeight: 400 }}>(optional)</span></span>
        <input className="input" name="phone" defaultValue={profile?.phone ?? ""} inputMode="tel" autoComplete="tel" />
      </label>
      <label className="field"><span>City <span className="muted" style={{ fontWeight: 400 }}>(optional)</span></span>
        <input className="input" name="city" defaultValue={profile?.city ?? ""} autoComplete="address-level2" />
      </label>
      <label className="field"><span>Where you are in practice <span className="muted" style={{ fontWeight: 400 }}>(optional)</span></span>
        <select className="input" name="practice_stage" defaultValue={profile?.practice_stage ?? ""}>
          <option value="">Prefer not to say</option>
          <option value="student">Law student</option>
          <option value="enrolled_0_2">Enrolled, up to two years</option>
          <option value="enrolled_3_5">Enrolled, three to five years</option>
          <option value="other">Other</option>
        </select>
      </label>
      {state.error && <p className="form-msg bad" role="alert">{state.error}</p>}
      {state.ok && <p className="form-msg good" role="status">Profile saved.</p>}
      <button className="btn solid small" disabled={pending}>{pending ? "Saving" : "Save profile"}</button>
    </form>
  );
}
