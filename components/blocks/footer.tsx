import Image from "next/image";
import Link from "next/link";

const contactInfo = {
  phones: ["(+256) 751 873 951", "(+256) 774 202 747"],
  email: "info@lmc.co.ug",
  address: "Namavundu Rd, Gayaza",
};

const quickLinks = [
  { href: "/appointments", label: "Book Appointment" },
  { href: "/contacts", label: "Contact Us" },
  { href: "/services", label: "Our Services" },
  { href: "/news", label: "Latest News" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About Widget */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo-white.png"
                alt="Lifeline Medical Centre - Serving Gayaza since 2015"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Quality healthcare services in Gayaza, Kampala. We are committed
              to providing accessible, compassionate medical care.
            </p>
            <ul className="space-y-2 text-sm">
              {contactInfo.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 text-primary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <a href={`tel:${phone.replace(/\D/g, "")}`} className="hover:text-primary">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-primary"
                >
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest News */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">
              Latest News
            </h3>
            <p className="text-sm text-muted-foreground">
              {/* TODO: Wire to Supabase posts table in Phase 5 */}
              No news articles yet. Check back soon for health tips and updates
              from Lifeline Medical Centre.
            </p>
            <Link
              href="/news"
              className="mt-4 inline-block text-sm text-primary hover:underline"
            >
              View all news →
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-muted-foreground/20 bg-foreground">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Copyright ©{new Date().getFullYear()} Lifeline Medical Centre ·
            Designed by{" "}
            {/* TODO: Update URL when portfolio is ready */}
            <a
              href="https://kashikweyu.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Kashi Kweyu
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
