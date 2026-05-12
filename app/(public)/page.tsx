import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { TeaserBoxes } from "@/components/blocks/teaser-boxes";
import { WelcomeSection } from "@/components/blocks/welcome-section";
import { FeaturedServices as FeaturedServicesList } from "@/components/blocks/featured-services";
import { ServiceCards } from "@/components/blocks/service-cards";
import { CtaSection } from "@/components/blocks/cta-section";

export default function Home() {
  return (
    <>
      <HomeHero
        imageSrc="/images/hero/quality-care.jpg"
        imageAlt="Medical professional caring for a patient at Lifeline Medical Centre"
        eyebrow="Lifeline Medical Centre"
        title="Compassionate Care, Modern Medicine"
        description="Lifeline Medical Centre offers comprehensive healthcare services in the heart of Kampala. From routine check-ups to specialist consultations, we're here for every step of your journey to wellness."
        ctaLabel="Book an Appointment"
        ctaHref="/appointments"
      />
      <FeaturedServices />
      <TeaserBoxes />
      <WelcomeSection />
      <FeaturedServicesList />
      <ServiceCards />
      <CtaSection />
    </>
  );
}
