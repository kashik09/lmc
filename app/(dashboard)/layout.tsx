import { Metadata } from "next";
import Link from "next/link";
import { Inbox, Home } from "lucide-react";

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

const NAV_ITEMS = [
  { href: "/reception", label: "Reception Inbox", icon: Inbox },
  { href: "/dashboard", label: "Dashboard", icon: Home },
  // Future items:
  // { href: "/appointments", label: "Appointments", icon: Calendar },
  // { href: "/staff", label: "Staff", icon: Users },
  // { href: "/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-lmc-pageBg">
      {/* Simple top navigation for dashboard */}
      <nav className="border-b border-lmc-borderLight bg-white">
        <div className="flex items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="font-heading text-lg font-bold text-lmc-green"
          >
            LMC Admin
          </Link>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-lmc-textSecondary transition-colors hover:bg-lmc-pageBg hover:text-lmc-textPrimary"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
