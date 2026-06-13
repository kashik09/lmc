import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Auth callback handler for magic link authentication
 * Supabase redirects here after user clicks the magic link in their email
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/reception";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Successful authentication - redirect to intended destination
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth failed - redirect to login with error
  return NextResponse.redirect(`${origin}/admin?error=auth_failed`);
}
