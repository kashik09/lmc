import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * WidgetCard — Promotional sidebar card (mockup .promo-card)
 *
 * Two variants:
 * - blue (navy bg) — Patient & Visitor Guide
 * - green (brand green bg) — Book Appointment
 */

interface WidgetCardProps {
  variant: "blue" | "green";
  eyebrow: string;
  heading: string;
  href: string;
  buttonText: string;
}

export default function WidgetCard({
  variant,
  eyebrow,
  heading,
  href,
  buttonText,
}: WidgetCardProps) {
  const bgClass = variant === "blue" ? "bg-lmc-blue" : "bg-lmc-green";
  const buttonBg =
    variant === "blue"
      ? "bg-lmc-green hover:bg-lmc-greenDark"
      : "bg-white text-lmc-green hover:bg-white/90";

  return (
    <div className={`${bgClass} p-7 text-white`}>
      {/* Eyebrow */}
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
        {eyebrow}
      </p>

      {/* Heading */}
      <h3 className="mb-6 font-heading text-[24px] font-bold leading-tight">
        {heading}
      </h3>

      {/* Button */}
      <Link
        href={href}
        className={`inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors ${buttonBg}`}
      >
        {buttonText}
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
