import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

function generateCspHeader(): string {
  // 'unsafe-inline' required for Next.js RSC bootstrap scripts. XSS protection
  // relies on React's automatic output encoding, isomorphic-dompurify for
  // user-provided HTML, and Zod validation on all server actions.
  const isDev = process.env.NODE_ENV === "development";

  const policy = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      // 'unsafe-eval' only in dev mode for React devtools/HMR
      ...(isDev ? ["'unsafe-eval'"] : []),
      "https://challenges.cloudflare.com",
      "https://static.cloudflareinsights.com",
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "blob:", "data:", "https://*.supabase.co"],
    "font-src": ["'self'"],
    "connect-src": [
      "'self'",
      "https://*.supabase.co",
      "wss://*.supabase.co",
      "https://cloudflareinsights.com",
    ],
    "frame-src": ["https://challenges.cloudflare.com"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "upgrade-insecure-requests": [],
  };

  return Object.entries(policy)
    .map(([key, values]) =>
      values.length > 0 ? `${key} ${values.join(" ")}` : key
    )
    .join("; ");
}

export async function middleware(request: NextRequest) {
  const cspHeader = generateCspHeader();

  // Run Supabase session handling first
  const response = await updateSession(request);

  // Add CSP header to the response
  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
