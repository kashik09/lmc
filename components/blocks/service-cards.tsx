import Image from "next/image";
import Link from "next/link";
import { serviceCards } from "@/content/home";

export function ServiceCards() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Medical Departments
          </h2>
          <p className="mt-2 text-muted-foreground">
            Specialized care across multiple disciplines
          </p>
          <div className="mx-auto mt-4 h-1 w-16 bg-primary" />
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {serviceCards.map((service) => (
            <div
              key={service.id}
              className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={service.image}
                  alt={`${service.title} services at Lifeline Medical Centre`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2 font-heading text-xl font-semibold text-card-foreground">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  More
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
          ))}
        </div>
      </div>
    </section>
  );
}
