import HeroCarousel from "@/components/home/HeroCarousel";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { HomeCTABanner } from "@/components/home/HomeCTABanner";
import { LatestNews } from "@/components/home/LatestNews";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      {/* Replaces old Round 4.1 HomeHero — T2.1 carousel per mockup */}
      <HeroCarousel />
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
