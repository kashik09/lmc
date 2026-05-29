import Link from "next/link";

/**
 * PageBanner — Interior page banner with ragged bottom edge
 *
 * Lamogi-pattern redesign (A2):
 * - Solid LMC brand color background (green default, navy for news/contacts)
 * - Uppercase breadcrumb above title
 * - Large bold title (~60px)
 * - Optional subtitle in lighter weight
 * - Ragged irregular bottom edge cutting into next section
 */

interface Crumb {
  label: string;
  href?: string; // omit for current page (no link)
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  variant?: "default" | "blue"; // default = green, blue = navy (news/contacts)
  /** Color of the ragged bottom edge. Should match the section below the banner. Defaults to #f5f5f5 (lmc-pageBg). */
  edgeColor?: string;
}

/** Ragged bottom edge SVG — irregular zig-zag torn-paper effect */
function RaggedBottomEdge({ color }: { color: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 32"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 block h-6 w-full md:h-8"
    >
      <path
        fill={color}
        d="M0,32 L0,20 L40,28 L100,16 L170,26 L240,12 L320,24 L400,14 L470,28 L540,16 L600,26 L680,12 L750,24 L820,14 L880,28 L950,16 L1020,26 L1080,12 L1160,24 L1220,16 L1280,28 L1340,14 L1390,22 L1440,18 L1440,32 Z"
      />
    </svg>
  );
}

export default function PageBanner({
  title,
  subtitle,
  crumbs = [],
  variant = "default",
  edgeColor = "#f5f5f5",
}: PageBannerProps) {
  const bgClass = variant === "blue" ? "bg-lmc-blue" : "bg-lmc-green";

  return (
    <section className={`${bgClass} relative w-full overflow-hidden`}>
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 md:pb-20 md:pt-16">
        {/* Breadcrumbs — uppercase small text above title */}
        {crumbs.length > 0 && (
          <nav
            className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/90"
            aria-label="Breadcrumb"
          >
            {crumbs.map((crumb, i) => (
              <span key={i}>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
                {i < crumbs.length - 1 && (
                  <span className="mx-2 text-white/50">/</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Title — large bold uppercase */}
        <h1 className="text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Subtitle — lighter weight below title */}
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base font-normal text-white/85 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>

      {/* Ragged bottom edge — uses page bg color to create torn-paper effect */}
      <RaggedBottomEdge color={edgeColor} />
    </section>
  );
}

export { PageBanner };
