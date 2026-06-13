import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Lifeline Medical Centre",
  description:
    "Privacy policy for Lifeline Medical Centre website. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          {/* Draft Banner */}
          <div className="mb-8 rounded-lg border border-amber-500/50 bg-amber-50 p-4 text-amber-900">
            <p className="text-sm font-medium">
              <strong>DRAFT</strong> — pending legal review. This privacy policy
              was prepared by Lifeline Medical Centre&apos;s web developer based
              on Uganda&apos;s Data Protection and Privacy Act 2019 and standard
              clinic practice. It should be reviewed by a qualified legal
              advisor before being considered final.
            </p>
          </div>

          {/* 1. Introduction */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            1. Introduction
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            Lifeline Medical Centre (&quot;LMC,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) operates the website at
            lmc.co.ug. We respect your privacy and are committed to protecting
            the personal data you share with us. This Privacy Policy explains
            what we collect, how we use it, and your rights under Uganda&apos;s
            Data Protection and Privacy Act, 2019 (DPPA).
          </p>

          {/* 2. Information We Collect */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            2. Information We Collect
          </h2>
          <p className="mb-3 text-lmc-grayMedium">
            We collect the following types of information:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6 text-lmc-grayMedium">
            <li>
              <strong>Inquiry forms:</strong> name, phone number, email,
              subject, message
            </li>
            <li>
              <strong>Appointment booking forms:</strong> name, phone, email,
              date of birth, sex, reason for visit, preferred date/time
            </li>
            <li>
              <strong>Cookies and similar technologies:</strong> see Section 7
              below
            </li>
            <li>
              <strong>Automatic technical data:</strong> IP address, browser
              type, device type, pages visited, time of visit (for analytics and
              security)
            </li>
            <li>
              <strong>Error reports:</strong> anonymized technical information
              when errors occur (no personal data is sent to error monitoring)
            </li>
          </ul>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            <strong>We do NOT collect:</strong> payment information, medical
            history (this site is informational only), national ID numbers, or
            any sensitive health data via the public forms.
          </p>

          {/* 3. How We Use Your Information */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            3. How We Use Your Information
          </h2>
          <ul className="mb-4 list-disc space-y-2 pl-6 text-lmc-grayMedium">
            <li>To respond to your inquiries</li>
            <li>To confirm and manage appointment bookings</li>
            <li>To detect and prevent fraud, spam, or abuse of the website</li>
            <li>To monitor website performance and fix errors</li>
            <li>To comply with legal obligations under Ugandan law</li>
          </ul>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            <strong>
              We do NOT use your information for marketing, advertising, or
              selling to third parties.
            </strong>
          </p>

          {/* 4. How We Share Your Information */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            4. How We Share Your Information
          </h2>
          <p className="mb-3 text-lmc-grayMedium">
            We share data with the following third-party service providers:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6 text-lmc-grayMedium">
            <li>
              <strong>Supabase (database hosting):</strong> stores form
              submissions. Servers may be located in the EU or US. Cross-border
              transfer is necessary for service operation.
            </li>
            <li>
              <strong>Cloudflare (security and analytics):</strong> filters bot
              traffic, provides Turnstile captcha, and processes anonymized
              website analytics. Operates globally.
            </li>
            <li>
              <strong>Sentry (error monitoring):</strong> captures technical
              error information when something goes wrong on the site. Personal
              data is filtered out before being sent.
            </li>
            <li>
              <strong>Upstash (rate limiting):</strong> stores temporary
              counters of submission attempts (does not retain personal data).
            </li>
          </ul>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            <strong>
              We do NOT sell, rent, or share your personal data with
              advertisers, marketers, or unrelated third parties.
            </strong>
          </p>

          {/* 5. Data Retention */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            5. Data Retention
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            We retain inquiry and appointment form data for twelve (12) months
            from the date of submission, after which it is deleted. This period
            allows us to respond to follow-up questions, manage rescheduled
            appointments, and provide continuity for returning patients. If you
            become a patient at our clinic, your medical records are retained
            separately according to clinical record-keeping standards under
            Uganda&apos;s healthcare regulations and the Personal Data
            Protection Office guidelines.
          </p>

          {/* 6. Your Rights Under DPPA 2019 */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            6. Your Rights Under DPPA 2019
          </h2>
          <p className="mb-3 text-lmc-grayMedium">
            Under Uganda&apos;s Data Protection and Privacy Act, you have the
            following rights:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6 text-lmc-grayMedium">
            <li>
              <strong>Right of access:</strong> you can request a copy of the
              personal data we hold about you
            </li>
            <li>
              <strong>Right of correction:</strong> you can request that
              inaccurate data be corrected
            </li>
            <li>
              <strong>Right of deletion:</strong> you can request your data be
              deleted (subject to legal retention obligations)
            </li>
            <li>
              <strong>Right to object:</strong> you can object to specific uses
              of your data
            </li>
            <li>
              <strong>Right to data portability:</strong> you can request your
              data in a structured format
            </li>
            <li>
              <strong>Right to lodge a complaint:</strong> with Uganda&apos;s
              Personal Data Protection Office (
              <a
                href="https://pdpo.go.ug"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lmc-green underline decoration-lmc-green/50 hover:decoration-lmc-green"
              >
                pdpo.go.ug
              </a>
              )
            </li>
          </ul>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:info@lmc.co.ug"
              className="text-lmc-green underline decoration-lmc-green/50 hover:decoration-lmc-green"
            >
              info@lmc.co.ug
            </a>
            .
          </p>

          {/* 7. Cookies and Tracking Technologies */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            7. Cookies and Tracking Technologies
          </h2>
          <ul className="mb-4 list-disc space-y-2 pl-6 text-lmc-grayMedium">
            <li>
              <strong>Essential cookies:</strong> required for the site to
              function (e.g., session and security cookies). Cannot be disabled.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Cloudflare Web Analytics
              (privacy-friendly, no personal data). You can opt in or out via
              the cookie banner.
            </li>
            <li>
              <strong>Captcha:</strong> Cloudflare Turnstile may set short-lived
              tokens for bot protection. These are essential for form security.
            </li>
          </ul>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            You can manage your preferences through the cookie banner shown on
            first visit, or by clicking &quot;Cookie Preferences&quot; in the
            footer.
          </p>

          {/* 8. Security */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            8. Security
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            We use industry-standard security measures including HTTPS
            encryption, server-side input validation, rate limiting, captcha
            protection, secure database access controls, and regular security
            audits. While no system is completely secure, we take reasonable
            steps to protect your data.
          </p>

          {/* 9. Children's Privacy */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            9. Children&apos;s Privacy
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            This website is not directed at children under 13. For appointments
            involving minors, parental or guardian consent is required and must
            be provided by the booking adult.
          </p>

          {/* 10. Changes to This Policy */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            10. Changes to This Policy
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            We may update this Privacy Policy. The &quot;Last Updated&quot; date
            at the bottom reflects when changes were made. Significant changes
            will be highlighted on the homepage.
          </p>

          {/* 11. Contact Us */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            11. Contact Us
          </h2>
          <address className="mb-6 not-italic text-lmc-grayMedium leading-relaxed">
            <strong>Lifeline Medical Centre</strong>
            <br />
            Address: 30 metres from Mirembe stage along Namavundu road, plot
            1052 – block 187 Gayaza, Kyadondo
            <br />
            Phone:{" "}
            <a href="tel:+256751873951" className="text-lmc-green underline decoration-lmc-green/50 hover:decoration-lmc-green">
              (+256) 751 873 951
            </a>{" "}
            /{" "}
            <a href="tel:+256774202747" className="text-lmc-green underline decoration-lmc-green/50 hover:decoration-lmc-green">
              (+256) 774 202 747
            </a>
            <br />
            Email:{" "}
            <a
              href="mailto:info@lmc.co.ug"
              className="text-lmc-green underline decoration-lmc-green/50 hover:decoration-lmc-green"
            >
              info@lmc.co.ug
            </a>
          </address>

          {/* 12. Effective Date */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            12. Effective Date
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            Last updated: May 7, 2026
          </p>

          {/* Back Link */}
          <div className="mt-8 border-t border-lmc-grayLight pt-6">
            <Link href="/" className="text-lmc-green underline decoration-lmc-green/50 hover:decoration-lmc-green">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
