import Image from "next/image";
import { Button } from "@/components/ui/Button";

/**
 * HomeHero — Full-width hero with dark overlay and left-aligned caption box
 *
 * Single static hero (carousel deferred to follow-up if needed).
 * 60vh height with min/max constraints for responsive behavior.
 */

type HomeHeroProps = {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export function HomeHero({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: HomeHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[480px] max-h-[700px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-container px-4">
          {/* Caption Box */}
          <div className="max-w-xl bg-black/60 p-8 backdrop-blur-sm md:p-10">
            <p className="mb-3 font-heading text-sm uppercase tracking-widest text-lmc-green">
              {eyebrow}
            </p>
            <h1 className="mb-4 font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
              {title}
            </h1>
            <p className="mb-6 font-body text-base leading-relaxed text-white/90 md:text-lg">
              {description}
            </p>
            <Button asChild href={ctaHref} size="lg">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
