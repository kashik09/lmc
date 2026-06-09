import HeroCarousel from "@/components/home/HeroCarousel";
import TrapezoidCTAStrip from "@/components/home/TrapezoidCTAStrip";
import WelcomeSection from "@/components/home/WelcomeSection";
import MedicalDepartments from "@/components/home/MedicalDepartments";
import { LatestNews } from "@/components/home/LatestNews";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      {/* Replaces old Round 4.1 HomeHero — T2.1 carousel per mockup */}
      <HeroCarousel />

      {/* Trapezoid strip overlaps hero bottom by ~64-80px on desktop */}
      <div className="relative z-10 -mt-16 md:-mt-20">
        <TrapezoidCTAStrip />
      </div>

      <Reveal>
        <WelcomeSection />
      </Reveal>
      <Reveal>
        <MedicalDepartments />
      </Reveal>
      <Reveal>
        <LatestNews />
      </Reveal>
      <Reveal>
        <NewsletterSignup />
      </Reveal>

      {/* Bridge between newsletter and footer's angled edge */}
      <div className="h-[42px] bg-lmc-footerBg" />
    </>
  );
}
