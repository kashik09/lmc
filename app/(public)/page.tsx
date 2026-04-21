import { HeroSlider } from "@/components/blocks/hero-slider";
import { TeaserBoxes } from "@/components/blocks/teaser-boxes";
import { WelcomeSection } from "@/components/blocks/welcome-section";
import { ServiceCards } from "@/components/blocks/service-cards";
import { CtaSection } from "@/components/blocks/cta-section";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <TeaserBoxes />
      <WelcomeSection />
      <ServiceCards />
      <CtaSection />
    </>
  );
}
