import { SectionHeading } from "@/components/sections/SectionHeading";

export const metadata = {
  title: "SectionHeading preview (dev)",
  robots: { index: false, follow: false },
};

export default function HeadingPreviewPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl space-y-20 px-6">
        <header>
          <h1 className="text-2xl font-bold">SectionHeading preview</h1>
          <p className="mt-2 text-sm text-gray-600">
            Internal dev page. Not linked from nav. Robots noindex.
          </p>
        </header>

        {/* --- Light theme, left-aligned (default) --- */}
        <section className="bg-white p-8">
          <p className="mb-6 text-xs uppercase text-gray-500">
            Light theme · Left-aligned (default)
          </p>
          <SectionHeading
            eyebrow="About Us"
            title="Welcome to Lifeline Medical Centre"
            subtitle="Comprehensive primary care, diagnostics, and specialist services for every family — delivered with warmth and clinical rigour."
          />
        </section>

        {/* --- Light theme, centered --- */}
        <section className="bg-white p-8">
          <p className="mb-6 text-xs uppercase text-gray-500">
            Light theme · Centered
          </p>
          <SectionHeading
            align="center"
            eyebrow="Our Services"
            title="Quality care for every patient"
            subtitle="From routine check-ups to specialist procedures, every service at LMC is delivered by trained professionals using modern equipment."
          />
        </section>

        {/* --- Dark theme, left-aligned --- */}
        <section className="bg-lmc-blue p-8">
          <p className="mb-6 text-xs uppercase text-white/60">
            Dark theme · Left-aligned (for navy section backgrounds)
          </p>
          <SectionHeading
            theme="dark"
            eyebrow="Why Lifeline"
            title="Trusted by families in Gayaza"
            subtitle="Over a decade serving the community with affordable, accessible, high-quality healthcare."
          />
        </section>

        {/* --- Dark theme, centered --- */}
        <section className="bg-lmc-blue p-8">
          <p className="mb-6 text-xs uppercase text-white/60">
            Dark theme · Centered
          </p>
          <SectionHeading
            theme="dark"
            align="center"
            eyebrow="Medical Departments"
            title="Specialised care under one roof"
          />
        </section>

        {/* --- No eyebrow --- */}
        <section className="bg-white p-8">
          <p className="mb-6 text-xs uppercase text-gray-500">No eyebrow</p>
          <SectionHeading
            title="Just a heading"
            subtitle="Sometimes you don't need the eyebrow."
          />
        </section>

        {/* --- No subtitle --- */}
        <section className="bg-white p-8">
          <p className="mb-6 text-xs uppercase text-gray-500">No subtitle</p>
          <SectionHeading eyebrow="Latest News" title="Stories from LMC" />
        </section>
      </div>
    </main>
  );
}
