import Link from "next/link";
import { Ambulance } from "lucide-react";

/**
 * Topbar — light background bar above main header
 *
 * Mockup styling (.topbar):
 * - bg: #efefef, border-bottom: 1px solid #e3e3e3
 * - height: 46px
 * - font-size: 12.5px, letter-spacing: 0.06em
 * - left: REQUEST AN APPOINTMENT link (uppercase, font-weight 600)
 * - right: Emergency line with ambulance icon
 *
 * Hidden on mobile (< md breakpoint)
 */
export function Topbar() {
  return (
    <div className="hidden border-b border-lmc-borderMedium bg-lmc-topbarBg md:block">
      <div className="mx-auto flex h-[46px] max-w-container items-center justify-between px-7 text-[12.5px] tracking-[0.06em]">
        {/* Left: Appointment link */}
        <Link
          href="/contacts"
          className="font-semibold uppercase text-[#4a4a4a] transition-colors hover:text-lmc-green"
        >
          Request an Appointment
        </Link>

        {/* Right: Emergency contact */}
        <div className="flex items-center gap-2 text-[#4a4a4a]">
          <Ambulance className="h-[18px] w-[18px] text-lmc-green" />
          <span>Emergency Line</span>
          <strong className="font-bold tracking-[0.04em] text-lmc-green">
            (+256) 774-202-747
          </strong>
        </div>
      </div>
    </div>
  );
}
