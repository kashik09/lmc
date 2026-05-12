import Link from "next/link";
import { Ambulance } from "lucide-react";

/**
 * Topbar - sits above the main header
 * Transparent bg in final design, using bg-lmc-greenDark temporarily for visibility
 * Hidden on mobile (< md breakpoint)
 */
export function Topbar() {
  return (
    <div className="hidden md:flex bg-lmc-greenDark h-10">
      <div className="max-w-container mx-auto w-full px-4 flex justify-between items-center text-white text-[13px]">
        {/* Left: Appointment link */}
        <Link
          href="/appointments"
          className="hover:underline"
        >
          Request an Appointment
        </Link>

        {/* Right: Emergency contact */}
        <div className="flex items-center gap-2">
          <Ambulance className="h-4 w-4" />
          {/* TODO: Verify this is the correct emergency number */}
          <span>
            Emergency Line <strong>(+256) 774-202-747</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
