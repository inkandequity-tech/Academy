import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";

// Handles the link in the sign-in email (PKCE code, or token_hash if the email template uses it).
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const raw = url.searchParams.get("next") || "/dashboard";
  const next = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/dashboard";
  const sb = await supabaseServer();
  if (sb) {
    const code = url.searchParams.get("code");
    const tokenHash = url.searchParams.get("token_hash");
    const type = url.searchParams.get("type") as EmailOtpType | null;
    const { error } = code
      ? await sb.auth.exchangeCodeForSession(code)
      : tokenHash && type
        ? await sb.auth.verifyOtp({ token_hash: tokenHash, type })
        : { error: new Error("missing code") };
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
  }
  return NextResponse.redirect(new URL(`/login?error=link&next=${encodeURIComponent(next)}`, url.origin));
}
