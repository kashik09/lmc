import { NextResponse } from "next/server";

/**
 * GET /api/roster/config
 * Returns public Supabase credentials for the roster app
 */
export async function GET() {
  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
}
