import Link from "next/link";
import { welcomeSection } from "@/content/home";

export function WelcomeSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            {welcomeSection.heading}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            {welcomeSection.tagline}
          </p>
          <div className="mx-auto mt-4 h-1 w-16 bg-primary" />
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content - 2/3 */}
          <div className="lg:col-span-2">
            {welcomeSection.paragraph.split("\n\n").map((para, index) => (
              <p
                key={index}
                className="mb-4 text-muted-foreground leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Sidebar - 1/3 */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-heading text-xl font-semibold text-card-foreground">
                {welcomeSection.sidebarTitle}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                {welcomeSection.sidebarText}
              </p>
              <Link
                href={welcomeSection.sidebarLink}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {welcomeSection.sidebarLinkText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
