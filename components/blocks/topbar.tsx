import Link from "next/link";

export function Topbar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
        <Link
          href="/appointments"
          className="hover:underline"
        >
          Request an Appointment
        </Link>

        {/* Hidden on mobile */}
        <div className="hidden items-center gap-2 sm:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M8.5 3a4.5 4.5 0 00-4.5 4.5v1a.5.5 0 01-.5.5H2a1 1 0 00-1 1v6a1 1 0 001 1h1.5a.5.5 0 01.5.5v1A4.5 4.5 0 008.5 22h7a4.5 4.5 0 004.5-4.5v-1a.5.5 0 01.5-.5H22a1 1 0 001-1v-6a1 1 0 00-1-1h-1.5a.5.5 0 01-.5-.5v-1A4.5 4.5 0 0015.5 3h-7zm3.5 5a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H9a1 1 0 110-2h2V9a1 1 0 011-1z" />
          </svg>
          <span className="font-medium">Emergency Line:</span>
          <a
            href="tel:+256774202747"
            className="hover:underline"
          >
            (+256) 774-202-747
          </a>
        </div>
      </div>
    </div>
  );
}
