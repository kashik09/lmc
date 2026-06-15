"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Inbox, Home, Key, LogOut, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/reception", label: "Reception Inbox", icon: Inbox },
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/account/set-password", label: "Set Password", icon: Key },
];

interface DashboardNavProps {
  isAdmin?: boolean;
}

export function DashboardNav({ isAdmin }: DashboardNavProps) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
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
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}

          {/* Admin-only: Invite staff */}
          {isAdmin && (
            <Link
              href="/admin/invite"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-lmc-textSecondary transition-colors hover:bg-lmc-pageBg hover:text-lmc-textPrimary"
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Invite</span>
            </Link>
          )}

          <div className="mx-2 h-6 w-px bg-lmc-borderLight" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
