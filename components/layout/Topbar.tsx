import Link from "next/link";
import { Clock } from "lucide-react";

/**
 * Topbar — light background bar above main header
 *
 * Lamogi pattern (A1 redesign):
 * - bg: #efefef, border-bottom: 1px solid #e3e3e3
 * - height: 46px
 * - left: BOOK AN APPOINTMENT link (green, uppercase, bold)
 * - right: hours + urgent phone line
 *
 * Hidden on mobile (< md breakpoint) — only left link would show if we wanted
 */
export function Topbar() {
  return (
    <div className="hidden border-b border-lmc-borderMedium bg-lmc-topbarBg md:block">
      <div className="mx-auto flex h-[46px] max-w-7xl items-center justify-between px-6 text-[12px] tracking-wide text-[#4a4a4a]">
        {/* Left: Appointment link */}
        <Link
          href="/appointments"
          className="font-bold uppercase tracking-[0.08em] text-lmc-green transition-colors hover:text-lmc-greenDark"
        >
          Book an Appointment
        </Link>

        {/* Right: Hours + Urgent line */}
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-lmc-green" />
          <span>
            Mon–Sat 7am–8pm · Urgent line:{" "}
            <a
              href="tel:+256774202747"
              className="font-bold tracking-wide text-lmc-green transition-colors hover:text-lmc-greenDark"
            >
              (+256) 774 202 747
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
