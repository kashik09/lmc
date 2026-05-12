import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CookiePreferencesButton } from "@/components/blocks/cookie-consent";

/**
 * Footer — 4-column dark layout
 *
 * Columns: About LMC / Quick Links / Latest News / Contact
 * Background: bg-lmc-grayDark with green accent underlines
 * Copyright bar: bg-lmc-footerDark
 *
 * NOTE: Reference site has social media icons in footer.
 * Social icons may be added in a later round.
 */

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/news", label: "News" },
  { href: "/contacts", label: "Contact Us" },
  { href: "/appointments", label: "Book Appointment" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

{/* TODO: wire up to Supabase latest news in a follow-up ticket */}
const latestNewsDummy = [
  { title: "New Laboratory Equipment Installed", date: "May 5, 2026" },
  { title: "Extended Weekend Hours Now Available", date: "April 28, 2026" },
  { title: "Community Health Outreach Program", date: "April 15, 2026" },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="font-heading text-lg font-semibold text-white">
        {children}
      </h3>
      <div className="mt-2 h-0.5 w-10 bg-lmc-green" />
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      {/* Main Footer */}
      <div className="bg-lmc-grayDark text-white">
        <div className="mx-auto max-w-container px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1 — About LMC */}
            <div>
              <ColumnHeading>About LMC</ColumnHeading>
              <p className="text-sm leading-relaxed text-gray-300">
                {/* TODO: confirm About copy with client */}
                Lifeline Medical Centre provides comprehensive healthcare
                services in Gayaza, Kampala, dedicated to patient-centered care
                and medical excellence. We are committed to accessible,
                compassionate medical care for our community.
              </p>
            </div>

            {/* Column 2 — Quick Links */}
            <div>
              <ColumnHeading>Quick Links</ColumnHeading>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors hover:text-lmc-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Latest News */}
            <div>
              <ColumnHeading>Latest News</ColumnHeading>
              {/* TODO: wire up to Supabase latest news in a follow-up ticket */}
              <ul className="space-y-4">
                {latestNewsDummy.map((item, index) => (
                  <li key={index}>
                    <Link
                      href="/news"
                      className="text-sm font-medium text-gray-300 transition-colors hover:text-lmc-green"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-xs text-gray-400">{item.date}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Contact */}
            <div>
              <ColumnHeading>Contact</ColumnHeading>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-lmc-green" />
                  {/* TODO: confirm exact address with client */}
                  <span>Namavundu Rd, Gayaza, Kampala, Uganda</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0 text-lmc-green" />
                  {/* TODO: confirm primary phone with client */}
                  <a
                    href="tel:+256774202747"
                    className="transition-colors hover:text-lmc-green"
                  >
                    (+256) 774-202-747
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0 text-lmc-green" />
                  {/* TODO: confirm email with client */}
                  <a
                    href="mailto:info@lmc.co.ug"
                    className="transition-colors hover:text-lmc-green"
                  >
                    info@lmc.co.ug
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 flex-shrink-0 text-lmc-green" />
                  {/* TODO: confirm hours with client */}
                  <span>Mon–Sat 8am–6pm</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-lmc-footerDark py-4">
        <div className="mx-auto max-w-container px-4">
          <p className="text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Lifeline Medical Centre. All rights
            reserved.
          </p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link
              href="/privacy-policy"
              className="text-xs text-gray-400 transition-colors hover:text-lmc-green"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-500">·</span>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
