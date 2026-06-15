import { Metadata } from "next";

/**
 * Roster Admin — iframe wrapper for static roster app
 *
 * Protected route: requires staff/admin role
 * SEO: noindex to keep admin pages out of search results
 */

export const metadata: Metadata = {
  title: "Roster Admin | Lifeline Medical Centre",
  description: "Staff scheduling and roster management",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RosterPage() {
  return (
    <iframe
      src="/roster-app/index.html"
      className="h-screen w-full border-0"
      title="Roster Admin"
    />
  );
}
