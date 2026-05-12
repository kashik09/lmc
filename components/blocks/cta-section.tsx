import Image from "next/image";
import { ctaSection } from "@/content/home";
import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <section className="relative py-20 md:py-28">
      {/* Background Image */}
      <div className="absolute inset-0 bg-foreground">
        <Image
          src={ctaSection.backgroundImage}
          alt="Healthcare professionals at Lifeline Medical Centre"
          fill
          className="object-cover opacity-40"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        <h2 className="mb-4 font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
          {ctaSection.heading}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
          {ctaSection.description}
        </p>
        <Button asChild href={ctaSection.buttonLink} size="lg">
          {ctaSection.buttonText}
        </Button>
      </div>
    </section>
  );
}
