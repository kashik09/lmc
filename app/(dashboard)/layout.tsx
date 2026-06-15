import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

/**
 * Dashboard layout — admin pages layout
 *
 * Protected route: requires authentication
 * SEO: noindex to keep admin pages out of search results
 */

export const metadata: Metadata = {
  title: "Admin Dashboard | Lifeline Medical Centre",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is admin for conditional nav items
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    isAdmin = profile?.role === "admin";
  }

  return (
    <div className="min-h-screen bg-lmc-pageBg">
      <DashboardNav isAdmin={isAdmin} />
      {children}
    </div>
  );
}
