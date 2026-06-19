import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full min-h-[120px] resize-y rounded-input border border-input bg-background px-4 py-2.5 text-base text-foreground",
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

Textarea.displayName = "Textarea";
