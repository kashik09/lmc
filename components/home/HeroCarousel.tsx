"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

/**
 * HeroCarousel — T2.1 per mockup design
 *
 * Refs: docs/visual-rebuild/mockup-reference/{index.html,styles.css,site.js}
 *
 * Features:
 * - 3 slides with placeholder gradients (pending real LMC photos)
 * - Caption box on RIGHT side per mockup
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
  gradientFrom: string;
  gradientTo: string;
}

const SLIDES: HeroSlide[] = [
  {
    eyebrow: "Welcome to Lifeline",
    title: "QUALITY CARE",
    subtitle: "Your Health is our priority",
    description:
      "From preventive care and check-ups, to immunizations and exams, our primary care physicians and providers work to keep you and your whole family healthy and strong each and every day.",
    ctaLabel: "Learn More",
    ctaHref: "/about",
    gradientFrom: "#1b7a12",
    gradientTo: "#2D4A6F",
  },
  {
    eyebrow: "Surgical Excellence",
    title: "MODERN THEATRE",
    subtitle: "Equipped for major procedures",
    description:
      "Our fully-equipped operating theatre supports a wide range of surgical procedures, staffed by an experienced multidisciplinary team committed to safe, world-class outcomes.",
    ctaLabel: "Explore Theatre",
    ctaHref: "/services/theatre",
    gradientFrom: "#2D4A6F",
    gradientTo: "#4A90D9",
  },
  {
    eyebrow: "Diagnostic Precision",
    title: "ADVANCED LAB",
    subtitle: "Accurate, fast diagnostics",
    description:
      "Our modern laboratory delivers comprehensive diagnostic testing — from routine blood work to specialised microbiology — with rapid turnaround that helps clinicians act fast.",
    ctaLabel: "View Lab Services",
    ctaHref: "/services/laboratory",
    gradientFrom: "#1b7a12",
    gradientTo: "#1a2530",
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
          className={`absolute inset-0 flex items-center transition-opacity duration-700 ${
            idx === activeIdx ? "z-[1] opacity-100" : "opacity-0"
          }`}
          style={{
            background: `linear-gradient(135deg, ${slide.gradientFrom}, ${slide.gradientTo})`,
          }}
          aria-hidden={idx !== activeIdx}
        >
          {/* Dark overlay gradient — matches mockup .hero-slide .bg::after */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)",
            }}
          />

          {/* Caption box — right-aligned per mockup .hero-overlay */}
          <div className="relative z-[2] mx-auto flex h-full w-full max-w-container items-center px-7">
            <div className="ml-auto max-w-[540px] bg-lmc-overlayDarker p-10 text-white backdrop-blur-[2px]">
              <h2 className="mb-[6px] font-heading text-[52px] font-bold uppercase leading-[1.1] tracking-[0.01em]">
                {slide.title}
              </h2>
              <div className="mb-[18px] text-[19px] font-light opacity-90">
                {slide.subtitle}
              </div>
              <div className="mb-[18px] h-[2px] w-[220px] bg-lmc-green" />
              <p className="mb-6 text-[14.5px] leading-[1.65] opacity-90">
                {slide.description}
              </p>
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-[10px] bg-lmc-green px-[22px] py-[14px] text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:bg-lmc-greenDark"
              >
                {slide.ctaLabel}
                <ArrowRight className="h-[14px] w-[14px]" />
              </Link>
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
