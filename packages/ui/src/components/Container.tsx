import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "full";
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-container",
  full: "max-w-7xl",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "lg", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full px-4 sm:px-6", sizeClasses[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
