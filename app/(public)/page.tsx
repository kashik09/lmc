import HeroCarousel from "@/components/home/HeroCarousel";
import TrapezoidCTAStrip from "@/components/home/TrapezoidCTAStrip";
import WelcomeSection from "@/components/home/WelcomeSection";
import MedicalDepartments from "@/components/home/MedicalDepartments";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { HomeCTABanner } from "@/components/home/HomeCTABanner";
import { LatestNews } from "@/components/home/LatestNews";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      {/* Replaces old Round 4.1 HomeHero — T2.1 carousel per mockup */}
      <HeroCarousel />
      <TrapezoidCTAStrip />
      <Reveal>
        <WelcomeSection />
      </Reveal>
      <Reveal>
        <MedicalDepartments />
      </Reveal>
      <Reveal>
        <FeaturedServices />
      </Reveal>
      <Reveal>
        <HomeCTABanner />
      </Reveal>
      <Reveal>
        <LatestNews />
      </Reveal>
    </>
  );
}
