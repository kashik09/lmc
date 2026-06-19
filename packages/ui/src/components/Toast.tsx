"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export type ToastVariant = "default" | "success" | "destructive" | "warning";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  onClose?: () => void;
}

const variantClasses: Record<ToastVariant, string> = {
  default: "border-border bg-card text-card-foreground",
  success: "border-l-4 border-success bg-card text-card-foreground",
  destructive: "border-l-4 border-destructive bg-card text-card-foreground",
  warning: "border-l-4 border-warning bg-card text-card-foreground",
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ variant = "default", title, description, onClose, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <div className="flex-1">
          {title && <p className="text-sm font-semibold">{title}</p>}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
          {children}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = "Toast";
