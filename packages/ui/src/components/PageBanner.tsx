import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface PageBannerProps extends HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  breadcrumbs?: ReactNode;
  variant?: "primary" | "secondary";
}

export const PageBanner = forwardRef<HTMLElement, PageBannerProps>(
  ({ title, subtitle, breadcrumbs, variant = "primary", className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "w-full",
          variant === "primary" ? "bg-primary" : "bg-secondary",
          className
        )}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-10 md:pb-10 md:pt-12">
          {breadcrumbs && (
            <nav
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/90"
              aria-label="Breadcrumb"
            >
              {breadcrumbs}
            </nav>
          )}
          <h1 className="text-4xl font-bold uppercase tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-base font-normal text-primary-foreground/90 md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    );
  }
);

PageBanner.displayName = "PageBanner";
