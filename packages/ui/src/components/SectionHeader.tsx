import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  theme = "light",
  className,
  ...props
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={cn(isCenter ? "text-center" : "text-left", className)}
      {...props}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-2 text-[11px] font-bold uppercase tracking-[0.18em]",
            isDark ? "text-accent" : "text-primary"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight md:text-4xl",
          isDark ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "mb-4 mt-4 h-[3px] w-[70px]",
          isDark ? "bg-accent" : "bg-primary",
          isCenter && "mx-auto"
        )}
        aria-hidden="true"
      />
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed",
            isDark ? "text-primary-foreground/85" : "text-muted-foreground",
            isCenter && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
