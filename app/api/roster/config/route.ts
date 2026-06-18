import { NextResponse } from "next/server";

/**
 * GET /api/roster/config
 *
 * Returns public Supabase credentials for the standalone roster app.
 *
 * NOTE: This endpoint exists because the roster app (public/roster-app/)
 * is a static HTML/JS application that cannot access Next.js environment
 * variables. The credentials returned are NEXT_PUBLIC_* values that are
 * already exposed in the main app's client bundle.
 *
 * Security: These are anonymous keys with RLS protection — not secrets.
 */
export async function GET() {
  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
}
