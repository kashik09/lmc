import { Metadata } from "next";
import Link from "next/link";
import LogoMark from "@/components/layout/LogoMark";

/**
 * Auth layout — full-page branded login layout
 *
 * Split design:
 * - Left: Brand panel with logo and messaging (hidden on mobile)
 * - Right: Login form area
 *
 * SEO: noindex to keep auth pages out of search results
 */

export const metadata: Metadata = {
  title: "Staff Portal | Lifeline Medical Centre",
  description: "Staff login portal for Lifeline Medical Centre.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left brand panel - hidden on mobile */}
      <div className="hidden w-1/2 bg-lmc-green lg:flex lg:flex-col lg:justify-between lg:p-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/10">
            <LogoMark className="h-7 w-7 text-white" />
          </div>
          <span className="font-sans text-sm font-bold uppercase leading-tight tracking-wide text-white">
            Lifeline Medical
            <br />
            Centre
          </span>
        </Link>

        {/* Main messaging */}
        <div className="space-y-6">
          <h1 className="font-heading text-4xl font-bold leading-tight text-white">
            Staff Portal
          </h1>
          <p className="max-w-md text-lg text-white/80">
            Access reception inbox, manage appointments, and view the staff
            roster. Sign in to continue.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white/40" />
              <span>24/7 Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white/40" />
              <span>Secure Login</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white/40" />
              <span>Role-Based Access</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} Lifeline Medical Centre. All rights
          reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full flex-col bg-white lg:w-1/2">
        {/* Mobile header */}
        <div className="flex items-center justify-between border-b border-lmc-borderLight p-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-lmc-green bg-white">
              <LogoMark className="h-5 w-5" />
            </div>
            <span className="font-sans text-[10px] font-bold uppercase leading-tight tracking-wide text-lmc-green">
              Lifeline Medical
              <br />
              Centre
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-lmc-textSecondary hover:text-lmc-green"
          >
            ← Back to site
          </Link>
        </div>

        {/* Form area */}
        <main className="flex flex-1 items-center justify-center px-6 py-12">
          {children}
        </main>

        {/* Desktop back link */}
        <div className="hidden border-t border-lmc-borderLight p-6 text-center lg:block">
          <Link
            href="/"
            className="text-sm text-lmc-textSecondary hover:text-lmc-green"
          >
            ← Back to Lifeline Medical Centre website
          </Link>
        </div>
      </div>
    </div>
  );
}
