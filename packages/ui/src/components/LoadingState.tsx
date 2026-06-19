import { type HTMLAttributes } from "react";
import { cn } from "../utils";
import { Spinner } from "./Spinner";

export interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export function LoadingState({
  message = "Loading...",
  className,
  ...props
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
      {...props}
    >
      <Spinner size="lg" className="mb-4" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
