interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-primary py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-lg text-primary-foreground/90">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
