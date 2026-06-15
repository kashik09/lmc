import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { logAdminLoginFromRequest } from "@/lib/actions/auth-log";

/**
 * Auth callback handler for magic link authentication
 * Supabase redirects here after user clicks the magic link in their email
 *
 * Security: Logs IP, checks for VPN/proxy, flags suspicious patterns
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/reception";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Log the login with IP security analysis
      const logResult = await logAdminLoginFromRequest(
        request,
        data.user.id,
        data.user.email || "unknown"
      );

      // Suspicious login: redirect to home with no clearance (as per flow diagram)
      if (logResult.suspicious) {
        const warningUrl = new URL("/", origin);
        warningUrl.searchParams.set("auth_warning", "suspicious_login");
        return NextResponse.redirect(warningUrl.toString());
      }

      // Clear login: proceed to intended destination
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth failed - redirect to login with error
  return NextResponse.redirect(`${origin}/admin?error=auth_failed`);
}
