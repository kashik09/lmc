import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { CookiePreferencesButton } from "@/components/blocks/cookie-consent";
import LogoMark from "./LogoMark";
import BackToTop from "./BackToTop";

/**
 * Footer — navy blue 3-column layout matching mockup
 *
 * Mockup styling (.site-footer):
 * - bg: #2D4A6F (--blue), color: rgba(255,255,255,0.85)
 * - padding: 88px 0 0, margin-top: 80px
 * - 3-col grid: 1.3fr 1fr 1.4fr, gap 56px
 * - h4: 13px, uppercase, 0.16em tracking, green underline
 * - Bottom bar: bg #233a58, border-top rgba(255,255,255,0.1)
 */

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/news", label: "News & Articles" },
  { href: "/contacts", label: "Contact Us" },
  { href: "/visitors", label: "Patient Guide" },
  // TODO: Careers route doesn't exist yet
];

// TODO: wire up to Supabase latest news in a follow-up ticket
const latestNewsDummy = [
  {
    title: "New paediatric ward opens with expanded capacity",
    date: "May 12, 2026",
  },
  {
    title: "Free community health screening this Saturday",
    date: "April 28, 2026",
  },
  {
    title: "Three new specialists join our cardiology team",
    date: "April 14, 2026",
  },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="relative mb-[22px] pb-[14px] font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-white">
      {children}
      <span className="absolute bottom-0 left-0 h-[2px] w-[44px] bg-lmc-green" />
    </h3>
  );
}

export function Footer() {
  return (
    <>
      <footer className="relative bg-lmc-footerBg pt-[88px] text-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        {/* Angled top edge */}
        <div
          className="absolute -top-[38px] left-0 right-0 h-10"
          style={{
            background:
              "linear-gradient(to right bottom, transparent 49.6%, var(--color-lmc-footerBg) 50%)",
          }}
        />

        <div className="mx-auto max-w-container px-7 pb-14 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
            {/* Column 1: About + contact */}
            <div>
              <Link href="/" className="mb-[18px] flex items-center gap-3">
                <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-white bg-transparent">
                  <LogoMark className="h-7 w-7" />
                </div>
                <span className="font-sans text-[11.5px] font-extrabold uppercase leading-tight tracking-[0.04em] text-white">
                  Lifeline Medical
                  <br />
                  Centre · <span className="text-lmc-greenOnDark">Gayaza</span>
                </span>
              </Link>

              <p className="mb-[14px] text-sm leading-[1.7]">
                A trusted community medical centre providing 24-hour primary
                care, diagnostics, and specialist services to Gayaza and the
                surrounding region.
              </p>

              {/* Contact rows */}
              <div className="mt-[18px] flex flex-col gap-[14px] text-[13.5px]">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-lmc-greenOnDark">
                    <Phone className="h-[14px] w-[14px]" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/90">
                      Emergency Line
                    </div>
                    <strong className="text-white">(+256) 774-202-747</strong>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-lmc-greenOnDark">
                    <Mail className="h-[14px] w-[14px]" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/90">
                      Email Us
                    </div>
                    <a href="mailto:info@lmc.co.ug" className="text-white">
                      info@lmc.co.ug
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-lmc-greenOnDark">
                    <MapPin className="h-[14px] w-[14px]" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/90">
                      Location
                    </div>
                    <span>
                      Gayaza-Zirobwe Road,
                      <br />
                      Gayaza, Uganda
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <ColumnHeading>Quick Links</ColumnHeading>
              <ul className="m-0 list-none p-0">
                {quickLinks.map((link) => (
                  <li
                    key={link.href}
                    className="border-b border-white/10 py-[10px] text-[13.5px]"
                  >
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-[10px] transition-colors hover:text-white"
                    >
                      <span className="font-bold text-lmc-greenOnDark">›</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Latest News */}
            <div>
              <ColumnHeading>Latest News</ColumnHeading>
              {/* TODO: wire to Supabase getLatestPosts(3) */}
              <div className="space-y-[18px]">
                {latestNewsDummy.map((item, index) => (
                  <Link
                    key={index}
                    href="/news"
                    className="flex gap-[14px] group"
                  >
                    <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center bg-gradient-to-br from-lmc-green to-lmc-blueAccent font-heading text-[22px] font-bold text-white">
                      N{index + 1}
                    </div>
                    <div>
                      <div className="mb-1 text-[11.5px] uppercase tracking-[0.1em] text-lmc-greenOnDark">
                        {item.date}
                      </div>
                      <h4 className="m-0 text-[13.5px] font-semibold leading-[1.4] text-white group-hover:text-lmc-green transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-white/10 bg-lmc-footerDark py-[22px]">
          <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-3 px-7 text-[12.5px] md:flex-row">
            <span>
              © {new Date().getFullYear()}{" "}
              <Link
                href="/admin"
                className="text-inherit no-underline hover:text-lmc-green"
                aria-label="Staff portal"
              >
                Lifeline Medical Centre
              </Link>{" "}
              — Gayaza. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-lmc-green"
              >
                Privacy Policy
              </Link>
              <span className="text-white/40">·</span>
              <CookiePreferencesButton />
            </div>
          </div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}

export default Footer;
