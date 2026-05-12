import Link from "next/link";
import { forwardRef } from "react";

/**
 * Canonical Button component
 *
 * Primary: bg-lmc-green, white text, hover bg-lmc-greenDark
 * Secondary: outline style with green border
 * All: 3px radius (rounded-btn), uppercase, font-bold, tracking-wide
 */

type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const variantClasses = {
  primary:
    "bg-lmc-green text-white hover:bg-lmc-greenDark",
  secondary:
    "border-2 border-lmc-green text-lmc-green bg-transparent hover:bg-lmc-green hover:text-white",
};

const baseClasses =
  "rounded-btn font-bold uppercase tracking-wide transition-colors duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      asChild = false,
      href,
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    if (asChild && href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
