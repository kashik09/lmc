"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { heroImages } from "@/content/lmc-images";

/**
 * HeroCarousel — T2.1 per mockup design (T2.1-fix polish applied)
 *
 * Refs: docs/visual-rebuild/mockup-reference/{index.html,styles.css,site.js}
 *
 * Features:
 * - 3 slides with real LMC photos + overlay layers for caption contrast
 * - Caption box on RIGHT side per mockup, near-opaque bg + left green border
 * - 6s auto-advance, pauses on hover
 * - Respects prefers-reduced-motion
 * - Prev/Next arrows + dots navigation
 */

interface HeroSlide {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: { src: string; width: number; height: number };
}

const SLIDES: HeroSlide[] = [
  {
    eyebrow: "Welcome to Lifeline",
    title: "QUALITY CARE",
    subtitle: "Compassionate medical excellence",
    description:
      "Comprehensive primary care, diagnostics, and specialist services delivered with warmth and clinical rigour — for every family in Gayaza and beyond.",
    ctaLabel: "Learn More",
    ctaHref: "/about",
    image: heroImages[0] ?? { src: "/images/lmc/1.png", width: 2490, height: 1763 },
  },
  {
    eyebrow: "Surgical Excellence",
    title: "THEATRE",
    subtitle: "Modern surgical suites, expert teams",
    description:
      "Our theatre complex offers elective and emergency surgical care across general, orthopaedic, and gynaecological specialties — supported by a 24-hour anaesthetic team.",
    ctaLabel: "Explore Theatre",
    ctaHref: "/services/theatre",
    image: heroImages[1] ?? { src: "/images/lmc/11.jpg", width: 3037, height: 1646 },
  },
  {
    eyebrow: "Diagnostic Precision",
    title: "LABORATORY",
    subtitle: "On-site testing, same-day results",
    description:
      "Our accredited clinical laboratory delivers haematology, biochemistry, microbiology and parasitology testing with rapid turnaround — most routine results within four hours.",
    ctaLabel: "View Lab Services",
    ctaHref: "/services/laboratory",
    image: heroImages[2] ?? { src: "/images/lmc/12.jpg", width: 2701, height: 1566 },
  },
];

const AUTO_ADVANCE_MS = 6000;

export default function HeroCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback((n: number) => {
    setActiveIdx(((n % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(activeIdx + 1), [activeIdx, goTo]);
  const prev = useCallback(() => goTo(activeIdx - 1), [activeIdx, goTo]);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [next, isPaused, reducedMotion]);

  return (
    <section
      className="relative h-[560px] overflow-hidden bg-lmc-blue"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured services"
    >
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === activeIdx
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          aria-hidden={idx !== activeIdx}
        >
          {/* Layer 1: Real LMC photo */}
          <Image
            src={slide.image.src}
            alt="Lifeline Medical Centre"
            fill
            className="object-cover"
            priority={idx === 0}
            sizes="100vw"
          />

          {/* Layer 2: Dark vignette overlay for caption contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/50" />

          {/* Layer 3: Subtle noise/grain via SVG for texture */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Caption box — right-aligned per mockup .hero-overlay */}
          <div className="relative z-[2] mx-auto flex h-full w-full max-w-container items-center px-7">
            <div className="ml-auto max-w-[540px]">
              {/* Solid bg, no backdrop-blur — gives type a real foundation */}
              <div className="border-l-4 border-lmc-green bg-[rgba(15,25,40,0.92)] p-10 shadow-2xl">
                <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-lmc-green">
                  {slide.eyebrow}
                </div>
                <h1 className="relative z-[3] mb-3 font-heading text-[44px] font-bold leading-[1.1] tracking-tight text-white">
                  {slide.title}
                </h1>
                <div className="mb-5 h-[3px] w-12 bg-lmc-green" />
                <div className="mb-4 text-[16px] font-semibold text-white">
                  {slide.subtitle}
                </div>
                <p className="mb-7 text-[14px] leading-[1.75] text-white/85">
                  {slide.description}
                </p>
                <Link
                  href={slide.ctaHref}
                  className="inline-flex items-center gap-2 bg-lmc-green px-6 py-3 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-all hover:gap-3 hover:bg-lmc-greenDark"
                >
                  {slide.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next arrows — matches mockup .hero-nav */}
      <button
        onClick={() => {
          prev();
          setIsPaused(false);
        }}
        aria-label="Previous slide"
        className="absolute left-0 top-1/2 z-10 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center bg-white/10 text-white transition-colors hover:bg-lmc-green"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => {
          next();
          setIsPaused(false);
        }}
        aria-label="Next slide"
        className="absolute right-0 top-1/2 z-10 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center bg-white/10 text-white transition-colors hover:bg-lmc-green"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots — matches mockup .hero-dots */}
      <div className="absolute bottom-[22px] left-1/2 z-10 flex -translate-x-1/2 gap-[10px]">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === activeIdx}
            className={`h-[10px] rounded-full transition-all duration-200 ${
              idx === activeIdx
                ? "w-8 scale-[1.2] bg-lmc-green"
                : "w-[10px] bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
