import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export default async function JobsDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin?redirect=/jobs/dashboard");
  }

  // Fetch user's job applications
  const { data: applications } = await supabase
    .from("job_applications")
    .select("*, jobs(*)")
    .order("created_at", { ascending: false });

  return (
    <main className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">
              My Applications
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Signed in as {user.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-8">
          {applications && applications.length > 0 ? (
            <ul className="space-y-4">
              {applications.map((app) => (
                <li
                  key={app.id}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-medium text-card-foreground">
                        {app.jobs?.title ?? "Unknown Position"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {app.jobs?.department}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        app.status === "accepted"
                          ? "bg-success/10 text-success"
                          : app.status === "rejected"
                            ? "bg-destructive/10 text-destructive"
                            : app.status === "reviewed"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Applied{" "}
                    {new Date(app.created_at).toLocaleDateString("en-UG", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <p className="text-muted-foreground">
                You haven&apos;t applied to any jobs yet.
              </p>
              <a
                href="/jobs"
                className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-dark"
              >
                Browse open positions
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
