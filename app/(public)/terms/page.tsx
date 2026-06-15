import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Lifeline Medical Centre",
  description:
    "Terms of service for Lifeline Medical Centre website. Read our policies on appointments, website use, and medical disclaimers.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our website"
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          {/* Draft Banner */}
          <div className="mb-8 rounded-lg border border-amber-500/50 bg-amber-50 p-4 text-amber-900">
            <p className="text-sm font-medium">
              <strong>DRAFT</strong> — pending legal review. These terms were
              prepared by Lifeline Medical Centre&apos;s web developer based on
              standard healthcare website practices and Ugandan law. They should
              be reviewed by a qualified legal advisor before being considered
              final.
            </p>
          </div>

          {/* 1. Introduction */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            1. Introduction
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) govern your use of the
            Lifeline Medical Centre website at lmc.co.ug (&quot;Website&quot;).
            By accessing or using the Website, you agree to be bound by these
            Terms. If you do not agree, please do not use the Website.
          </p>

          {/* 2. Medical Disclaimer */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            2. Medical Disclaimer
          </h2>
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="mb-3 font-semibold text-red-800">
              This Website Does NOT Provide Medical Advice
            </p>
            <ul className="list-disc space-y-2 pl-6 text-red-700">
              <li>
                The information on this Website is for{" "}
                <strong>general informational purposes only</strong> and is not
                a substitute for professional medical advice, diagnosis, or
                treatment.
              </li>
              <li>
                Never disregard professional medical advice or delay seeking it
                because of something you read on this Website.
              </li>
              <li>
                If you think you may have a medical emergency, call your doctor
                or emergency services immediately.
              </li>
              <li>
                The descriptions of services, conditions, and treatments on this
                Website are summaries only. Actual medical decisions must be
                made in consultation with qualified healthcare professionals.
              </li>
            </ul>
          </div>

          {/* 3. Emergency Situations */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            3. Emergency Situations
          </h2>
          <p className="mb-3 text-lmc-grayMedium">
            <strong>
              This Website is not for emergencies. For medical emergencies:
            </strong>
          </p>
          <ul className="mb-6 list-disc space-y-2 pl-6 text-lmc-grayMedium">
            <li>
              Call our emergency line:{" "}
              <a
                href="tel:+256774202747"
                className="font-semibold text-lmc-green underline"
              >
                (+256) 774-202-747
              </a>
            </li>
            <li>
              Or come directly to Lifeline Medical Centre (open 24 hours for
              emergencies)
            </li>
            <li>
              For life-threatening emergencies, call Uganda&apos;s national
              emergency number or proceed to the nearest hospital
            </li>
          </ul>

          {/* 4. Appointment Booking */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            4. Appointment Booking
          </h2>
          <p className="mb-3 text-lmc-grayMedium">
            When you submit an appointment request through this Website:
          </p>
          <ul className="mb-6 list-disc space-y-2 pl-6 text-lmc-grayMedium">
            <li>
              <strong>Request, not confirmation:</strong> Submitting the form is
              a request only. Your appointment is not confirmed until you
              receive confirmation from our staff via phone call, SMS, or email.
            </li>
            <li>
              <strong>Accurate information:</strong> You must provide accurate
              contact information and medical details. Inaccurate information
              may result in delays or inability to serve you.
            </li>
            <li>
              <strong>Response time:</strong> We aim to respond to appointment
              requests within 24 hours during business days. If you do not
              receive a response, please call us directly.
            </li>
          </ul>

          {/* 5. Cancellation and No-Show Policy */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            5. Cancellation and No-Show Policy
          </h2>
          <ul className="mb-6 list-disc space-y-2 pl-6 text-lmc-grayMedium">
            <li>
              <strong>Cancellation:</strong> If you cannot attend your
              appointment, please notify us at least 4 hours in advance by
              calling{" "}
              <a
                href="tel:+256751873951"
                className="text-lmc-green underline"
              >
                (+256) 751-873-951
              </a>
              . This allows us to offer your slot to another patient.
            </li>
            <li>
              <strong>Rescheduling:</strong> We will make reasonable efforts to
              accommodate rescheduling requests subject to availability.
            </li>
            <li>
              <strong>No-shows:</strong> Patients who repeatedly fail to attend
              confirmed appointments without notice may be asked to pay in
              advance for future bookings or may have their booking privileges
              limited.
            </li>
            <li>
              <strong>Late arrivals:</strong> If you arrive more than 15 minutes
              late, we may need to reschedule your appointment to accommodate
              other patients.
            </li>
          </ul>

          {/* 6. Contact Form and Inquiries */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            6. Contact Form and Inquiries
          </h2>
          <ul className="mb-6 list-disc space-y-2 pl-6 text-lmc-grayMedium">
            <li>
              General inquiries submitted through the contact form are not
              confidential medical communications.
            </li>
            <li>
              Do not include sensitive medical information, test results, or
              personal health details in contact form submissions.
            </li>
            <li>
              For medical questions or concerns about your health, please call
              us or visit the clinic in person.
            </li>
          </ul>

          {/* 7. Website Use */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            7. Website Use
          </h2>
          <p className="mb-3 text-lmc-grayMedium">
            You agree not to:
          </p>
          <ul className="mb-6 list-disc space-y-2 pl-6 text-lmc-grayMedium">
            <li>
              Use the Website for any unlawful purpose or in violation of these
              Terms
            </li>
            <li>
              Submit false information through any form on the Website
            </li>
            <li>
              Attempt to gain unauthorized access to any part of the Website or
              its systems
            </li>
            <li>
              Use automated systems (bots, scrapers) to access the Website
              without permission
            </li>
            <li>
              Interfere with the proper functioning of the Website
            </li>
          </ul>

          {/* 8. Intellectual Property */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            8. Intellectual Property
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            All content on this Website, including text, images, logos, and
            design, is the property of Lifeline Medical Centre or its licensors
            and is protected by copyright and trademark laws. You may not
            reproduce, distribute, or create derivative works without our
            written permission, except for personal, non-commercial use such as
            printing directions to our clinic.
          </p>

          {/* 9. Limitation of Liability */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            9. Limitation of Liability
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            To the fullest extent permitted by law, Lifeline Medical Centre
            shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of or
            inability to use this Website. We do not guarantee that the Website
            will be available at all times or free from errors. Our liability
            for any direct damages shall not exceed UGX 100,000.
          </p>

          {/* 10. Third-Party Links */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            10. Third-Party Links
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            This Website may contain links to third-party websites for your
            convenience (e.g., insurance providers, health resources). We do not
            control these websites and are not responsible for their content or
            privacy practices. Visiting third-party sites is at your own risk.
          </p>

          {/* 11. Changes to Terms */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            11. Changes to Terms
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            We may update these Terms from time to time. The &quot;Last
            Updated&quot; date at the bottom reflects when changes were made.
            Continued use of the Website after changes constitutes acceptance of
            the new Terms.
          </p>

          {/* 12. Governing Law */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            12. Governing Law
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            These Terms are governed by and construed in accordance with the
            laws of the Republic of Uganda. Any disputes arising from these
            Terms or your use of the Website shall be subject to the exclusive
            jurisdiction of the courts of Uganda.
          </p>

          {/* 13. Contact */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            13. Contact Us
          </h2>
          <address className="mb-6 not-italic text-lmc-grayMedium leading-relaxed">
            <strong>Lifeline Medical Centre</strong>
            <br />
            Address: 30 metres from Mirembe stage along Namavundu road, plot
            1052 – block 187 Gayaza, Kyadondo
            <br />
            Phone:{" "}
            <a
              href="tel:+256751873951"
              className="text-lmc-green underline decoration-lmc-green/50 hover:decoration-lmc-green"
            >
              (+256) 751 873 951
            </a>{" "}
            /{" "}
            <a
              href="tel:+256774202747"
              className="text-lmc-green underline decoration-lmc-green/50 hover:decoration-lmc-green"
            >
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

          {/* 14. Effective Date */}
          <h2 className="mb-4 font-heading text-xl font-bold text-lmc-grayDark">
            14. Effective Date
          </h2>
          <p className="mb-6 text-lmc-grayMedium leading-relaxed">
            Last updated: June 15, 2026
          </p>

          {/* Back Link */}
          <div className="mt-8 border-t border-lmc-grayLight pt-6">
            <Link
              href="/"
              className="text-lmc-green underline decoration-lmc-green/50 hover:decoration-lmc-green"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
