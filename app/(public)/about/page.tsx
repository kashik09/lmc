import Image from "next/image";
import { Target, Eye, Heart, Check } from "lucide-react";
import { aboutImages } from "@/content/lmc-images";
import PageBanner from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import {
  aboutIntro,
  aboutVision,
  aboutCta,
} from "@/content/about";

/**
 * About Page — LMC story, mission/vision/values, why choose us, CTA
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

      {/* Section 1: Who We Are — centered intro */}
      <Reveal as="section" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
            Who We Are
          </p>
          <h2 className="mb-6 font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
            {aboutIntro.heading}
          </h2>
          <div className="space-y-4 font-body text-base leading-relaxed text-lmc-grayMedium md:text-lg">
            {aboutIntro.paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Section 2: Mission / Vision / Values */}
      <Reveal as="section" className="bg-lmc-offWhite py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
              What Drives Us
            </p>
            <h2 className="font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
              Our Mission, Vision & Values
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {missionVisionValues.map((item) => (
              <div
                key={item.title}
                className="rounded-md border border-lmc-borderLight border-t-4 border-t-lmc-green bg-white p-6 shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-lmc-green/10">
                  <item.icon className="h-6 w-6 text-lmc-green" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-lmc-grayDark">
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
      <Reveal as="section" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
                Why Gayaza Trusts Us
              </p>
              <h2 className="mb-4 font-heading text-2xl font-bold leading-tight text-lmc-grayDark md:text-3xl">
                Care that feels like family
              </h2>
              <p className="mb-6 font-body text-base leading-relaxed text-lmc-grayMedium">
                For over a decade, families across Gayaza have turned to Lifeline for everyday
                checkups, urgent care and everything in between — delivered by a team that knows
                them by name.
              </p>
              <ul className="mb-6 flex flex-col gap-3">
                {whyChooseUs.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lmc-green/10">
                      <Check className="h-3 w-3 text-lmc-green" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-lmc-grayDark">
                      <strong className="font-semibold">{item.title}</strong> {item.description}
                    </span>
                  </li>
                ))}
              </ul>
              <Button asChild href="/appointments">
                Book an Appointment
              </Button>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={aboutImages.staffGroup.src}
                  alt={aboutImages.staffGroup.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg bg-lmc-green px-5 py-4 text-white shadow-md">
                <div className="font-heading text-2xl font-black leading-none">10+</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-wider opacity-90">
                  Years serving Gayaza
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Section 4: CTA Banner */}
      <Reveal as="section" className="bg-lmc-green py-10 text-white md:py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="mb-1 font-heading text-xl font-bold md:text-2xl">
              {aboutCta.heading}
            </h2>
            <p className="font-body text-sm text-white/90">{aboutCta.description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              asChild
              href={aboutCta.primaryButton.href}
              className="bg-white !text-lmc-green hover:bg-lmc-offWhite"
            >
              {aboutCta.primaryButton.text}
            </Button>
            <Button
              asChild
              href={aboutCta.secondaryButton.href}
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
