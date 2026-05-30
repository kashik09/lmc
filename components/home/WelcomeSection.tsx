import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutImages } from "@/content/lmc-images";

/**
 * WelcomeSection — "Welcome to Lifeline" intro block
 *
 * 2-column layout: text + CTA on left (~55%), image card on right (~45%).
 */

export default function WelcomeSection() {
  // Staff image for the right card
  const cardImage = aboutImages.staffGroup;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* LEFT: Text content */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
              Welcome to Lifeline
            </h2>
            <p className="mt-2 text-base text-lmc-grayMedium">
              LMC is renowned for its range of clinical services.
            </p>

            {/* Body paragraphs */}
            <div className="mt-6 space-y-4 text-base leading-relaxed text-lmc-grayMedium">
              <p>
                Thank you for allocating time to know more about us. We are certain you will find us of relevance to your healthcare needs. Lifeline Medical Centre is here to serve you and your family and it is our appeal that when you have any healthcare need, you will look upto us as your first option.
              </p>
              <p>
                Our website is exceptionally interactive and collaborative. Our mission is to provide quality health care services more accessible to the general public and we are physically located in Gayaza town 13.7 km from Kampala. We welcome you to know more about Lifeline Medical Centre through this forum and encourage you to freely contact us for any inquiries.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-lmc-green px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:gap-3 hover:bg-lmc-greenDark"
              >
                <ArrowRight className="h-4 w-4" />
                Read More
              </Link>
            </div>
          </div>

          {/* RIGHT: Image card with bottom strip */}
          <div className="relative overflow-hidden">
            <div className="relative aspect-[4/3] w-full bg-lmc-offWhite">
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
              className="group flex flex-col items-center justify-center bg-lmc-green px-6 py-5 text-white transition-colors hover:bg-lmc-greenDark"
            >
              <span className="text-sm font-bold uppercase tracking-[0.12em]">
                Patient &amp; Visitor Guide
              </span>
              <span className="mt-1 text-xs text-white/80">
                Plan your visit to our Clinic
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
