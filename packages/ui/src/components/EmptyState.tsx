import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-6 text-muted-foreground">{icon}</div>
      )}
      <h2 className="mb-3 text-[22px] font-bold uppercase tracking-[0.02em] text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mb-6 max-w-md text-[15px] leading-[1.7] text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
