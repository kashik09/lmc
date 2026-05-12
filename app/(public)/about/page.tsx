import Image from "next/image";
import { Target, Eye, Heart } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import {
  aboutIntro,
  aboutVision,
  aboutFacilities,
  aboutCta,
} from "@/content/about";

/**
 * About Page — LMC story, mission/vision/values, facilities, CTA
 *
 * Preserves existing content from content/about.ts
 */

const missionVisionValues = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To deliver compassionate, evidence-based healthcare that puts patients first and meets the real needs of our community in Gayaza and surrounding areas.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: aboutVision.content,
  },
  {
    icon: Heart,
    title: "Our Values",
    body: "Respect, empathy, integrity, and community — the principles that guide every consultation, every diagnosis, every interaction at LMC.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Us" subtitle="Lifeline Medical Centre" />

      {/* Section 1: Who We Are — image left, text right */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-container px-4">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden bg-lmc-offWhite">
              <Image
                src={aboutFacilities.image}
                alt="Lifeline Medical Centre staff and facilities"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
                Who We Are
              </p>
              <h2 className="mb-6 font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
                {aboutIntro.heading}
              </h2>
              <div className="prose prose-lg max-w-none font-body text-lmc-grayDark prose-headings:font-heading prose-headings:text-lmc-grayDark prose-a:text-lmc-green prose-strong:text-lmc-grayDark">
                {aboutIntro.paragraphs.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Mission / Vision / Values */}
      <section className="bg-lmc-offWhite py-16 md:py-20">
        <div className="mx-auto max-w-container px-4">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
              What Drives Us
            </p>
            <h2 className="mb-4 font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
              Our Mission, Vision & Values
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {missionVisionValues.map((item) => (
              <div
                key={item.title}
                className="border-t-4 border-lmc-green bg-white p-8"
              >
                <item.icon className="mb-4 h-10 w-10 text-lmc-green" />
                <h3 className="mb-3 font-heading text-xl font-semibold text-lmc-grayDark">
                  {item.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-lmc-grayMedium">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Facilities */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-container px-4">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
                Our Facilities
              </p>
              <h2 className="mb-6 font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
                {aboutFacilities.heading}
              </h2>
              <p className="font-body text-lg leading-relaxed text-lmc-grayMedium">
                {aboutFacilities.description}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-lmc-offWhite">
              <Image
                src={aboutFacilities.image}
                alt="Lifeline Medical Centre modern facilities"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: CTA Banner */}
      <section className="bg-lmc-green py-12 text-white md:py-16">
        <div className="mx-auto flex max-w-container flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="mb-2 font-heading text-2xl font-bold md:text-3xl">
              {aboutCta.heading}
            </h2>
            <p className="font-body text-white/90">{aboutCta.description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              asChild
              href={aboutCta.primaryButton.href}
              size="lg"
              className="bg-white !text-lmc-green hover:bg-lmc-offWhite"
            >
              {aboutCta.primaryButton.text}
            </Button>
            <Button
              asChild
              href={aboutCta.secondaryButton.href}
              size="lg"
              variant="secondary"
              className="border-white text-white hover:bg-white hover:!text-lmc-green"
            >
              {aboutCta.secondaryButton.text}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
