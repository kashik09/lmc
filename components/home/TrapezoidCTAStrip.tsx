import Link from "next/link";
import { Heart, UserRound, CalendarDays } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * TrapezoidCTAStrip — Signature quick-action ribbon below the hero
 *
 * Three interlocking cards with chevron arrows, pulled up to overlap
 * the bottom of the hero. Per mockup: green / blue / green.
 *
 * Refs: docs/visual-rebuild/mockup-reference/{index.html,styles.css}
 */

interface CTABlock {
  label: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  bgColor: string;
  hoverColor: string;
}

const BLOCKS: CTABlock[] = [
  {
    label: "Medical Services",
    subtitle: "A list of all available care.",
    href: "/services",
    icon: Heart,
    bgColor: "bg-[#1b7a12]",
    hoverColor: "hover:bg-[#156610]",
  },
  {
    label: "Find a Doctor",
    subtitle: "All our staff by department.",
    href: "/about",
    icon: UserRound,
    bgColor: "bg-[#4A90D9]",
    hoverColor: "hover:bg-[#3a7fc8]",
  },
  {
    label: "Request an Appointment",
    subtitle: "Call us or fill in a form.",
    href: "/contacts",
    icon: CalendarDays,
    bgColor: "bg-[#1b7a12]",
    hoverColor: "hover:bg-[#156610]",
  },
];

export default function TrapezoidCTAStrip() {
  return (
    <section className="relative z-10 -mt-14 px-7" aria-label="Quick actions">
      <div className="mx-auto max-w-container">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {BLOCKS.map((block, idx) => {
            const Icon = block.icon;
            const isLast = idx === BLOCKS.length - 1;

            return (
              <Link
                key={block.label}
                href={block.href}
                className={`group relative flex items-center gap-5 text-white transition-transform duration-200 hover:-translate-y-[3px] ${block.bgColor} ${block.hoverColor}`}
                style={{
                  padding: idx === 0 ? "32px 36px 32px 56px" : "32px 36px 32px 70px",
                }}
              >
                {/* Icon in circular border */}
                <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/45">
                  <Icon className="h-[26px] w-[26px]" strokeWidth={2} />
                </div>

                {/* Text content */}
                <div>
                  <h3 className="mb-1 font-heading text-xl font-extrabold uppercase tracking-tight">
                    {block.label}
                  </h3>
                  <p className="text-[13px] opacity-90">{block.subtitle}</p>
                </div>

                {/* Chevron arrow — overlaps onto next card */}
                {!isLast && (
                  <div
                    className="pointer-events-none absolute bottom-0 right-[-22px] top-0 z-[2] hidden w-[44px] md:block"
                    style={{
                      background: "inherit",
                      clipPath: "polygon(0 0, 50% 50%, 0 100%)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
