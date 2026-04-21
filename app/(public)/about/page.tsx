import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/blocks/page-header";
import {
  aboutPage,
  aboutIntro,
  aboutVision,
  aboutFacilities,
  aboutCta,
} from "@/content/about";

export default function AboutPage() {
  return (
    <>
      <PageHeader title={aboutPage.title} subtitle={aboutPage.subtitle} />

      {/* Section 1 - Intro */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {aboutIntro.heading}
          </h2>
          {aboutIntro.paragraphs.map((para, index) => (
            <p
              key={index}
              className="mb-4 text-muted-foreground leading-relaxed"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Section 2 - Vision Card */}
      <section className="bg-muted py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fillRule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="mb-3 font-heading text-xl font-semibold text-card-foreground">
              {aboutVision.heading}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {aboutVision.content}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 - Facilities */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
                {aboutFacilities.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {aboutFacilities.description}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <Image
                src={aboutFacilities.image}
                alt="Our facilities"
                fill
                className="object-cover"
              />
              {/* TODO: Replace with real facility image */}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - CTA */}
      <section className="bg-muted py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {aboutCta.heading}
          </h2>
          <p className="mb-6 text-muted-foreground">{aboutCta.description}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={aboutCta.primaryButton.href}
              className="inline-block rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              {aboutCta.primaryButton.text}
            </Link>
            <Link
              href={aboutCta.secondaryButton.href}
              className="inline-block rounded-md border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {aboutCta.secondaryButton.text}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
