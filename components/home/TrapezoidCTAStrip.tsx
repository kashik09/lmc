"use client";

import Link from "next/link";
import { Stethoscope, Users, Calendar } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * TrapezoidCTAStrip — Signature quick-action ribbon below the hero (B2 Lamogi upgrade)
 *
 * Three interlocking cards with chevron arrows, overlapping the hero bottom.
 * Pattern: navy / green (highlight) / navy — middle card is the accent.
 *
 * Refs: Lamogi image 3, adapted to LMC brand colors
 */

interface CTABlock {
  label: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
}

const BLOCKS: CTABlock[] = [
  {
    label: "Medical Services",
    subtitle: "Care for every patient.",
    href: "/services",
    icon: Stethoscope,
    color: "#1b7a12", // lmc-green (outer)
    hoverColor: "#156610",
  },
  {
    label: "About Us",
    subtitle: "Meet our team.",
    href: "/about",
    icon: Users,
    color: "#304770", // lmc-blue (center highlight)
    hoverColor: "#3d5a8a",
  },
  {
    label: "Request Appointment",
    subtitle: "Call or book online.",
    href: "/appointments",
    icon: Calendar,
    color: "#1b7a12", // lmc-green (outer)
    hoverColor: "#156610",
  },
];

export default function TrapezoidCTAStrip() {
  return (
    <section className="px-6" aria-label="Quick actions">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {BLOCKS.map((block, idx) => {
            const Icon = block.icon;
            const isLast = idx === BLOCKS.length - 1;

            return (
              <Link
                key={block.label}
                href={block.href}
                className="group relative flex items-center gap-4 text-white transition-all duration-200 hover:-translate-y-1"
                style={{
                  padding: idx === 0 ? "28px 32px 28px 40px" : "28px 32px 28px 56px",
                  backgroundColor: block.color,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = block.hoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = block.color)
                }
              >
                {/* Icon in circular border */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/30">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>

                {/* Text content */}
                <div>
                  <h3 className="mb-0.5 text-base font-bold uppercase tracking-wide">
                    {block.label}
                  </h3>
                  <p className="text-sm text-white/85">{block.subtitle}</p>
                </div>

                {/* Chevron arrow — overlaps onto next card */}
                {!isLast && (
                  <div
                    className="pointer-events-none absolute bottom-0 right-[-20px] top-0 z-[2] hidden w-10 md:block"
                    style={{
                      backgroundColor: block.color,
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
