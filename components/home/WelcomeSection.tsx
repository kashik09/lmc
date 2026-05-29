import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { home } from "@/content/info/home";
import type { ContentBlock } from "@/content/types";
import { squareImages } from "@/content/lmc-images";

/**
 * WelcomeSection — "Welcome to Lifeline" intro block
 *
 * 2-column layout: text + CTA on left, photo with caption overlay on right.
 * Copy pulled from content/info/home.ts (extracted from WP backup).
 *
 * Refs: docs/visual-rebuild/mockup-reference/{index.html,styles.css}
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

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-container px-7">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* LEFT: Text content */}
          <div>
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-lmc-green">
              About us
            </div>
            <h2 className="mb-4 font-heading text-[32px] font-bold leading-tight tracking-tight text-lmc-grayDark md:text-[44px]">
              Welcome to <span className="text-lmc-green">Lifeline</span> Medical
              Centre
            </h2>
            <div className="mb-6 h-[3px] w-20 bg-lmc-green" />

            {displayParagraphs.map((text, i) => (
              <p
                key={i}
                className="mb-4 text-[15px] leading-[1.75] text-lmc-grayMedium"
              >
                {text}
              </p>
            ))}

            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-2 bg-lmc-green px-6 py-3 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-all hover:gap-3 hover:bg-lmc-greenDark"
            >
              Read More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* RIGHT: Photo with Patient & Visitor Guide caption bar */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-lmc-offWhite">
              {squareImages[0] && (
                <Image
                  src={squareImages[0].src}
                  alt="Medical staff at Lifeline Medical Centre"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              )}

              {/* Caption bar — full width at bottom per mockup */}
              <Link
                href="/visitors"
                className="group absolute inset-x-0 bottom-0 flex items-center justify-between bg-lmc-green px-6 py-[18px] text-white transition-colors hover:bg-lmc-greenDark"
              >
                <span className="text-[13.5px] font-semibold uppercase tracking-[0.14em]">
                  Patient &amp; Visitor Guide
                </span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
