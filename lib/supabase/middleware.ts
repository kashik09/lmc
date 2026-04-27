import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAllowedRedirect } from "@/lib/utils/redirect";

// Route protection configuration
// Routes not listed here are public
const PROTECTED_ROUTES: Record<string, string[]> = {
  // Pattern: role(s) that can access
  "/dashboard": ["patient", "staff", "admin"],
  "/jobs/dashboard": ["staff", "admin"],
  "/admin": ["admin"],
};

function getRequiredRoles(pathname: string): string[] | null {
  // Check each protected route pattern
  for (const [pattern, roles] of Object.entries(PROTECTED_ROUTES)) {
    if (pathname === pattern || pathname.startsWith(`${pattern}/`)) {
      return roles;
    }
  }
  return null; // Not a protected route
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const requestHost = request.nextUrl.host;

  // Check if this is a protected route
  const requiredRoles = getRequiredRoles(pathname);
  const isLoginRoute = pathname.startsWith("/login");

  // Protected route handling
  if (requiredRoles !== null) {
    // Not authenticated -> redirect to login
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // Authenticated -> check role
    // FAIL CLOSED: if we can't fetch the role, deny access
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error || !profile) {
      // Role lookup failed - fail closed, redirect to home with error
      console.error("Role lookup failed for user:", user.id, error);
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("error", "access_denied");
      return NextResponse.redirect(url);
    }

    const userRole = profile.role as string;

    // Check if user's role is in the allowed roles for this route
    if (!requiredRoles.includes(userRole)) {
      // Insufficient permissions - redirect based on role
      const url = request.nextUrl.clone();
      if (userRole === "patient") {
        url.pathname = "/dashboard";
      } else if (userRole === "staff") {
        url.pathname = "/jobs/dashboard";
      } else {
        url.pathname = "/";
      }
      url.searchParams.set("error", "insufficient_permissions");
      return NextResponse.redirect(url);
    }
  }

  // Redirect authenticated users away from login page
  if (isLoginRoute && user) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");

    // Validate redirect URL (open redirect protection)
    let redirectPath = "/dashboard";
    if (redirectParam && isAllowedRedirect(redirectParam, requestHost)) {
      redirectPath = redirectParam;
    }

    const url = request.nextUrl.clone();
    url.pathname = redirectPath;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
