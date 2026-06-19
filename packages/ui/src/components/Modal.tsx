"use client";

import {
  forwardRef,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, children, className, ...props }, ref) => {
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      },
      [onClose]
    );

    useEffect(() => {
      if (!open) return;
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }, [open, handleKeyDown]);

    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-foreground/60 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative z-10 w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props} />
  )
);

ModalHeader.displayName = "ModalHeader";

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-6 flex items-center justify-end gap-3", className)}
      {...props}
    />
  )
);

ModalFooter.displayName = "ModalFooter";
