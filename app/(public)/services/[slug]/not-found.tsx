import Link from "next/link";

export default function ServiceNotFound() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="mb-4 font-heading text-4xl font-bold text-foreground">
          Service Not Found
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          The service you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/services"
          className="inline-block rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
        >
          View All Services
        </Link>
      </div>
    </section>
  );
}
