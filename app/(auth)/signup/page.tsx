import { Suspense } from "react";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <Suspense fallback={<SignupFormSkeleton />}>
        <SignupForm />
      </Suspense>
    </main>
  );
}

function SignupFormSkeleton() {
  return (
    <div className="w-full max-w-sm space-y-6 animate-pulse">
      <div className="text-center">
        <div className="mx-auto h-8 w-32 rounded bg-muted" />
        <div className="mx-auto mt-2 h-4 w-40 rounded bg-muted" />
      </div>
      <div className="space-y-4">
        <div className="h-10 rounded bg-muted" />
        <div className="h-10 rounded bg-muted" />
        <div className="h-10 rounded bg-muted" />
        <div className="h-10 rounded bg-muted" />
      </div>
    </div>
  );
}
