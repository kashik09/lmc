import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { home } from "@/content/info/home";
import type { ContentBlock } from "@/content/types";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { aboutImages } from "@/content/lmc-images";

/**
 * WelcomeSection — "Welcome to Lifeline" intro block (B1 Lamogi redesign)
 *
 * 2-column layout: text + CTA on left (~55%), tall image card on right (~45%).
 * Uses SectionHeading for consistent eyebrow/heading/accent-bar rhythm.
 * Copy pulled from content/info/home.ts (extracted from WP backup).
 */

type ParagraphBlock = Extract<ContentBlock, { type: "paragraph" }>;

export default function WelcomeSection() {
  // home.ts has 2 sections — use both for richer content
  const welcomeSection = home.sections[0];
  const qualitySection = home.sections[1];

  const welcomeParagraphs =
    welcomeSection?.blocks
      .filter((b): b is ParagraphBlock => b.type === "paragraph")
      .map((b) => b.text) ?? [];

  const qualityParagraphs =
    qualitySection?.blocks
      .filter((b): b is ParagraphBlock => b.type === "paragraph")
      .map((b) => b.text) ?? [];

  // Combine first paragraph from each section for variety
  const displayParagraphs = [
    welcomeParagraphs[0],
    welcomeParagraphs[1],
    qualityParagraphs[0],
  ].filter(Boolean);

  // Portrait-oriented staff photo for the right card
  const cardImage = aboutImages.staffLabcoat;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* LEFT: Text content */}
          <div>
            <SectionHeading
              eyebrow="About Us"
              title={
                <>
                  Welcome to <span className="text-lmc-green">Lifeline</span>{" "}
                  Medical Centre
                </>
              }
            />

            {/* Body paragraphs */}
            <div className="mt-6 space-y-4 text-base leading-relaxed text-lmc-grayMedium">
              {displayParagraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-lmc-green px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:gap-3 hover:bg-lmc-greenDark"
              >
                Read More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Tall image card with bottom strip */}
          <div className="relative overflow-hidden">
            <div className="relative aspect-[4/5] w-full bg-lmc-offWhite">
              <Image
                src={cardImage.src}
                alt={cardImage.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            {/* Bottom strip — Patient & Visitor Guide */}
            <Link
              href="/visitors"
              className="group flex items-center justify-between bg-lmc-green px-6 py-4 text-white transition-colors hover:bg-lmc-greenDark"
            >
              <span className="text-sm font-bold uppercase tracking-[0.12em]">
                Patient &amp; Visitor Guide
              </span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
