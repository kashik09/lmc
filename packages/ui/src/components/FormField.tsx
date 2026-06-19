import { type ReactNode, type HTMLAttributes, forwardRef } from "react";
import { cn } from "../utils";

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("block text-sm font-semibold text-foreground mb-1.5", className)}
      {...props}
    />
  )
);

Label.displayName = "Label";

export interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {}

export const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("mt-1.5 text-sm text-destructive", className)}
      {...props}
    />
  )
);

FieldError.displayName = "FieldError";

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  children,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn("mb-5", className)} {...props}>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      {children}
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}
