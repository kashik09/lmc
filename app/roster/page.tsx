/**
 * Roster Admin — iframe wrapper for static roster app
 */

export const metadata = {
  title: "Roster Admin | Lifeline Medical Centre",
  description: "Staff scheduling and roster management",
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
