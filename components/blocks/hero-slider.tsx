"use client";
// CLIENT: Auto-rotation timer, pause on hover, slide navigation

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "@/content/home";

const SLIDE_INTERVAL = 8000; // 8 seconds

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative h-[500px] overflow-hidden bg-foreground md:h-[600px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero slideshow"
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-foreground">
            <Image
              src={slide.image}
              alt={`${slide.title} - Lifeline Medical Centre`}
              fill
              className="object-cover opacity-60"
              priority={index === 0}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-4">
              <div className="max-w-2xl">
                {slide.subtitle && (
                  <p className="mb-2 text-lg text-primary-foreground/80">
                    {slide.subtitle}
                  </p>
                )}
                <h1 className="mb-4 font-heading text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mb-6 text-lg text-primary-foreground/90 md:text-xl">
                  {slide.description}
                </p>
                <Link
                  href={slide.link}
                  className="inline-block rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
                >
                  {slide.linkText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/20 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-background/40"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/20 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-background/40"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-primary"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
