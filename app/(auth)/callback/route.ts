import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAllowedRedirect } from "@/lib/utils/redirect";

export async function GET(request: Request) {
  const { searchParams, origin, host } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  // Validate redirect target (open redirect protection)
  const safeNext =
    next && isAllowedRedirect(next, host) ? next : "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  // Return to admin login with error
  return NextResponse.redirect(`${origin}/admin?error=auth_callback_error`);
}
