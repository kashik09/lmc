import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface ContentCardProps extends HTMLAttributes<HTMLDivElement> {
  image?: ReactNode;
  children: ReactNode;
  hover?: boolean;
}

export const ContentCard = forwardRef<HTMLDivElement, ContentCardProps>(
  ({ image, hover = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group overflow-hidden rounded-card border border-border bg-card shadow-card",
          hover && "transition-shadow duration-200 hover:shadow-card-hover",
          className
        )}
        {...props}
      >
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            {image}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    );
  }
);

ContentCard.displayName = "ContentCard";
