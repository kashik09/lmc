import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { home } from "@/content/info/home";
import type { ContentBlock } from "@/content/types";

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
            {/* Photo placeholder — gradient until real LMC photos sorted */}
            <div
              className="relative aspect-[4/5] w-full overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #2D4A6F 0%, #1b7a12 100%)",
              }}
            >
              {/* Subtle noise texture */}
              <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Placeholder text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-medium text-white/60">
                  Staff group photo
                </span>
              </div>

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
