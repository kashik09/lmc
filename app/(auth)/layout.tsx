import { Metadata } from "next";

/**
 * Auth layout — minimal centered layout for login/auth pages
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
  return <>{children}</>;
}
