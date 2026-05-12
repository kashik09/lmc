import type { ReactNode } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesAccordion } from "@/components/blocks/services-accordion";
import {
  servicesIntro,
  servicesApproach,
  servicesCta,
} from "@/content/services";

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-8 w-8"
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-8 w-8"
    >
      <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
      <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
      <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-8 w-8"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const iconMap: Record<string, () => ReactNode> = {
  heart: HeartIcon,
  "graduation-cap": GraduationCapIcon,
  clock: ClockIcon,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Our Services" subtitle="Comprehensive medical care" />

      {/* Section 1 - Intro */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-center text-lg text-muted-foreground leading-relaxed">
            {servicesIntro.paragraph}
          </p>
        </div>
      </section>

      {/* Section 2 - Services Accordion */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <ServicesAccordion />
        </div>
      </section>

      {/* Section 3 - Our Approach */}
      <section className="border-l-4 border-primary bg-primary/5 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
            {servicesApproach.heading}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {servicesApproach.items.map((item) => {
              const IconComponent = iconMap[item.icon];
              return (
                <div key={item.id} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {IconComponent && <IconComponent />}
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4 - CTA */}
      <section className="bg-muted py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {servicesCta.heading}
          </h2>
          <p className="mb-6 text-muted-foreground">{servicesCta.description}</p>
          <Link
            href={servicesCta.buttonLink}
            className="inline-block rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            {servicesCta.buttonText}
          </Link>
        </div>
      </section>
    </>
  );
}
