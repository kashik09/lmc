import Image from "next/image";
import { Target, Eye, Heart, Check } from "lucide-react";
import { aboutImages } from "@/content/lmc-images";
import PageBanner from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
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

const whyChooseUs = [
  {
    title: "Qualified, caring clinicians",
    description: "across general practice, maternity and diagnostics.",
  },
  {
    title: "Modern on-site lab & pharmacy",
    description: "— results and prescriptions without the extra trip.",
  },
  {
    title: "Same-day appointments",
    description: "so you're seen when it matters.",
  },
];

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
      <PageBanner
        title="About Us"
        subtitle="Lifeline Medical Centre — Quality healthcare since 2009"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Section 1: Who We Are — image left, text right */}
      <Reveal as="section" className="bg-white py-16 md:py-20">
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
      </Reveal>

      {/* Section 2: Mission / Vision / Values */}
      <Reveal as="section" className="bg-lmc-offWhite py-16 md:py-20">
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
                className="rounded-md border border-lmc-borderLight border-t-4 border-t-lmc-green bg-white p-8 shadow-md"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-lmc-green/10">
                  <item.icon className="h-7 w-7 text-lmc-green" />
                </div>
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
      </Reveal>

      {/* Section 3: Why Gayaza Trusts Us */}
      <Reveal as="section" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-container px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-lmc-green">
                Why Gayaza Trusts Us
              </p>
              <h2 className="mb-5 font-heading text-3xl font-bold leading-tight text-lmc-grayDark md:text-[38px]">
                Care that feels like family
              </h2>
              <p className="mb-7 max-w-[520px] font-body text-base leading-relaxed text-lmc-grayMedium">
                For over a decade, families across Gayaza have turned to Lifeline for everyday
                checkups, urgent care and everything in between — delivered by a team that knows
                them by name.
              </p>
              <ul className="mb-8 flex flex-col gap-4">
                {whyChooseUs.map((item) => (
                  <li key={item.title} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lmc-green/10">
                      <Check className="h-3.5 w-3.5 text-lmc-green" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] text-lmc-grayDark">
                      <strong className="font-bold">{item.title}</strong> {item.description}
                    </span>
                  </li>
                ))}
              </ul>
              <Button asChild href="/appointments" size="lg">
                Book an Appointment
              </Button>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                <Image
                  src={aboutImages.staffGroup.src}
                  alt={aboutImages.staffGroup.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-lmc-green px-6 py-5 text-white shadow-lg">
                <div className="font-heading text-[34px] font-black leading-none">10+</div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-widest opacity-90">
                  Years serving Gayaza
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Section 4: Facilities */}
      <Reveal as="section" className="bg-white py-16 md:py-20">
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
      </Reveal>

      {/* Section 5: CTA Banner */}
      <Reveal as="section" className="bg-lmc-green py-12 text-white md:py-16">
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
      </Reveal>
    </>
  );
}
