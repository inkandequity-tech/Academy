import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, supabaseConfigured } from "./env";

export type VerifiedCertificate = { code: string; full_name: string; issued_at: string; revoked: boolean };

/** Looks up a certificate through the public verify_certificate function. No session needed. */
export async function lookupCertificate(code: string): Promise<VerifiedCertificate | null> {
  if (!supabaseConfigured()) return null;
  const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
  const { data, error } = await sb.rpc("verify_certificate", { p_code: code });
  if (error || !data || !data.length) return null;
  return data[0] as VerifiedCertificate;
}
