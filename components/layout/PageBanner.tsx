import Link from "next/link";

/**
 * PageBanner — Mockup-style interior page banner
 *
 * Green background with breadcrumbs, uppercase title, optional subtitle.
 * Diagonal gradient edge at bottom per mockup.
 *
 * Refs: docs/visual-rebuild/mockup-reference/{styles.css,service-detail.html}
 */

interface Crumb {
  label: string;
  href?: string; // omit for current page (no link)
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  variant?: "default" | "blue"; // default = green, blue = news/blog
}

export default function PageBanner({
  title,
  subtitle,
  crumbs = [],
  variant = "default",
}: PageBannerProps) {
  const bgClass = variant === "blue" ? "bg-lmc-blueAccent" : "bg-lmc-green";

  return (
    <section
      className={`${bgClass} relative overflow-hidden`}
      style={{ padding: "64px 0 56px" }}
    >
      <div className="mx-auto max-w-container px-7 text-white">
        {/* Breadcrumbs */}
        {crumbs.length > 0 && (
          <nav
            className="mb-3.5 text-[12px] uppercase tracking-[0.14em] text-white/85"
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
                  <span className="mx-2 text-white/40">/</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Title — mockup: 54px, serif, 700, uppercase, 0.01em tracking */}
        <h1 className="font-heading text-[42px] font-bold uppercase leading-tight tracking-[0.01em] md:text-[54px]">
          {title}
        </h1>

        {/* Subtitle — mockup: 16px, 0.92 opacity, 0.06em tracking, 300 weight */}
        {subtitle && (
          <p
            className="mt-1.5 max-w-2xl text-[16px] font-light tracking-[0.06em] text-white/90"
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Diagonal edge at bottom — gradient to page bg color */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-7"
        style={{
          background:
            "linear-gradient(to right top, #f5f5f5 49.6%, transparent 50%)",
        }}
      />
    </section>
  );
}

export { PageBanner };
