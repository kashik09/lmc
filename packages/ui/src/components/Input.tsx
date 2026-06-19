import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full rounded-input border border-input bg-background px-4 py-2.5 text-base text-foreground",
          "transition-colors duration-200",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
