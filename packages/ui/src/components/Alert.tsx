import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export type AlertVariant = "default" | "success" | "destructive" | "warning";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  icon?: ReactNode;
}

const variantClasses: Record<AlertVariant, string> = {
  default: "border-border bg-muted text-foreground",
  success: "border-l-4 border-success bg-green-50 text-foreground",
  destructive: "border-l-4 border-destructive bg-red-50 text-destructive",
  warning: "border-l-4 border-warning bg-yellow-50 text-foreground",
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "default", icon, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "p-4 text-sm flex items-start gap-2 rounded-md",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0 mt-0.5">{icon}</span>}
        <div>{children}</div>
      </div>
    );
  }
);

Alert.displayName = "Alert";
