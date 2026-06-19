import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface PageShellProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const PageShell = forwardRef<HTMLElement, PageShellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn("min-h-screen bg-background", className)}
        {...props}
      >
        {children}
      </main>
    );
  }
);

PageShell.displayName = "PageShell";
