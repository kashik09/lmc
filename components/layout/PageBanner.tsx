import Link from "next/link";

/**
 * PageBanner — Interior page banner with straight bottom edge
 *
 * Lamogi-pattern redesign (A2):
 * - Solid LMC brand color background (green default, navy for news/contacts)
 * - Uppercase breadcrumb above title
 * - Large bold title (~60px)
 * - Optional subtitle in lighter weight
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
}

export default function PageBanner({
  title,
  subtitle,
  crumbs = [],
  variant = "default",
}: PageBannerProps) {
  const bgClass = variant === "blue" ? "bg-lmc-blue" : "bg-lmc-green";

  return (
    <section className={`${bgClass} w-full`}>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-10 md:pb-10 md:pt-12">
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
          <p className="mt-3 max-w-2xl text-base font-normal text-white md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export { PageBanner };
