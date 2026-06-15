import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { logAdminLoginFromRequest } from "@/lib/actions/auth-log";

/**
 * POST /api/auth/log-login
 *
 * Called after successful password login to log the authentication
 * with IP security analysis (VPN detection, suspicious patterns)
 */
export async function POST(request: Request) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Log the login
  const result = await logAdminLoginFromRequest(
    request,
    user.id,
    user.email || "unknown"
  );

  return NextResponse.json({
    logged: result.logged,
    suspicious: result.suspicious,
    reason: result.reason,
  });
}
