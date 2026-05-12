import { Button } from "@/components/ui/Button";

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
        <Button asChild href="/services" size="lg">
          View All Services
        </Button>
      </div>
    </section>
  );
}
