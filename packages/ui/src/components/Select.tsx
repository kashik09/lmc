import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full rounded-input border border-input bg-background px-4 py-2.5 text-base text-foreground",
          "transition-colors duration-200",
          "focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";
