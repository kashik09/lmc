/**
 * PageHeader — Interior page banner matching PageBanner style
 *
 * Green background with large bold uppercase title and optional subtitle.
 */

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <section className="bg-lmc-green">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-10 md:pb-10 md:pt-12">
        <h1 className="text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base font-normal text-white md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export default PageHeader;
