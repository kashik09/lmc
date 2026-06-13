import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Cookie-free Supabase client for public, read-only queries.
 *
 * Use this for:
 * - generateStaticParams (build-time, no request context)
 * - Public data fetching that doesn't require auth
 * - SSG pages that need Supabase data at build time
 *
 * DO NOT use for:
 * - Auth-dependent queries
 * - User-specific data
 * - Mutations that need RLS based on user
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
