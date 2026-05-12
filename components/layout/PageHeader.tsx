/**
 * PageHeader — Two-row banner for interior pages
 *
 * Structure:
 * - Row 1: Title on dark background (bg-lmc-grayDark chosen to match
 *   reference "secondary_section" pattern — darker, more neutral than green)
 * - Row 2: Optional subtitle on accent background
 *
 * NOTE: Reference site has breadcrumbs in some page headers.
 * Breadcrumbs will be added in a later ticket if needed.
 */

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  /** Subtitle row variant: 'default' = offWhite bg, 'green' = green bg */
  variant?: "default" | "green";
};

export function PageHeader({
  title,
  subtitle,
  variant = "default",
}: PageHeaderProps) {
  return (
    <section>
      {/* Title row */}
      <div className="bg-lmc-grayDark min-h-[80px] flex items-center">
        <div className="max-w-container mx-auto px-4 w-full">
          <h1 className="font-heading text-white text-3xl md:text-4xl font-bold">
            {title}
          </h1>
        </div>
      </div>

      {/* Subtitle row — only renders if subtitle provided */}
      {subtitle && (
        <div
          className={`min-h-[40px] flex items-center ${
            variant === "green"
              ? "bg-lmc-green text-white"
              : "bg-lmc-offWhite text-lmc-grayDark"
          }`}
        >
          <div className="max-w-container mx-auto px-4 w-full">
            <p className="font-body text-sm">{subtitle}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default PageHeader;
