import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group flex items-start gap-5 rounded-card border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 text-primary">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-base font-bold uppercase tracking-wide text-card-foreground">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
