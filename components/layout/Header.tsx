"use client";
// CLIENT: Mobile menu toggle, sticky scroll detection, dropdown hover

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LogoMark from "./LogoMark";
import { services, serviceSlugs } from "@/content/services";

/**
 * Header / Mainbar — white background nav with dropdowns
 *
 * Mockup styling (.site-header):
 * - bg: white, border-bottom: 1px solid #e5e7eb
 * - height: 88px, sticky top-0, z-50
 * - shadow on scroll (shadow-header)
 *
 * Logo: 46px round mark with wordmark
 * Nav: 13px, 700 weight, uppercase, 0.08em letter-spacing
 * Dropdowns: 220px min-width, 3px green top border
 */

// Build services dropdown from real content
const servicesDropdown = [
  { label: "All Services", href: "/services" },
  ...serviceSlugs.map((slug) => ({
    label: services[slug].title,
    href: `/services/${slug}`,
  })),
];

const NAV_ITEMS = [
  { label: "Home", href: "/", key: "home" },
  {
    label: "Our Services",
    href: "/services",
    key: "services",
    dropdown: servicesDropdown,
  },
  {
    label: "Patients",
    href: "/visitors",
    key: "patients",
    dropdown: [
      { label: "Visitor Info", href: "/visitors" },
      { label: "Pharmacy", href: "/pharmacy" },
      { label: "Insurance", href: "/insurance" },
    ],
  },
  { label: "News", href: "/news", key: "news" },
  { label: "Contacts", href: "/contacts", key: "contacts" },
  { label: "About Us", href: "/about", key: "about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (
      prevPathnameRef.current !== null &&
      prevPathnameRef.current !== pathname
    ) {
      setMobileMenuOpen(false);
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-lmc-borderLight bg-white transition-shadow ${
        hasScrolled ? "shadow-header" : ""
      }`}
    >
      <nav className="mx-auto flex h-[88px] max-w-container items-center justify-between px-7">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-lmc-green bg-white">
            <LogoMark className="h-7 w-7" />
          </div>
          <span className="font-sans text-[11.5px] font-extrabold uppercase leading-tight tracking-[0.04em] text-lmc-green">
            Lifeline Medical
            <br />
            Centre ·{" "}
            <span className="text-red-600">Gayaza</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-0 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.key} className="group relative">
              <Link
                href={item.href}
                className={`relative inline-flex items-center gap-1.5 px-[18px] py-[14px] text-[13px] font-bold uppercase tracking-[0.08em] transition-colors ${
                  isActive(item.href)
                    ? "text-lmc-green"
                    : "text-[#3a3a3a] hover:text-lmc-green"
                }`}
              >
                {item.label}
                {item.dropdown && (
                  <span className="inline-block h-0 w-0 border-x-[4px] border-t-[4px] border-x-transparent border-t-current opacity-60" />
                )}
                {/* Active underline — hide on dropdown hover to avoid double line */}
                {isActive(item.href) && (
                  <span className={`absolute bottom-[-1px] left-[18px] right-[18px] h-[3px] bg-lmc-green transition-opacity ${item.dropdown ? "group-hover:opacity-0" : ""}`} />
                )}
              </Link>

              {/* Dropdown — max-h for overflow with many services */}
              {item.dropdown && (
                <ul className="invisible absolute left-2 top-full z-50 max-h-[400px] min-w-[220px] translate-y-[-6px] overflow-y-auto border-t-[3px] border-lmc-green bg-white py-2 opacity-0 shadow-cardHover transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.dropdown.map((d) => (
                    <li key={d.href}>
                      <Link
                        href={d.href}
                        className="block border-b border-[#f0f0f0] px-[18px] py-[10px] text-[12.5px] font-semibold uppercase tracking-[0.05em] text-[#3a3a3a] transition-colors last:border-b-0 hover:bg-[#fafafa] hover:text-lmc-green"
                      >
                        {d.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-lmc-textPrimary hover:bg-lmc-pageBg lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Backdrop + Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer content */}
          <div className="relative z-50 max-h-[calc(100dvh-88px)] overflow-y-auto border-t border-lmc-borderLight bg-white px-4 pb-4 lg:hidden">
          {/* Emergency line in mobile drawer */}
          <div className="flex items-center gap-2 border-b border-lmc-borderLight py-3 text-sm text-lmc-textPrimary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-lmc-green"
              aria-hidden="true"
            >
              <path d="M8.5 3a4.5 4.5 0 00-4.5 4.5v1a.5.5 0 01-.5.5H2a1 1 0 00-1 1v6a1 1 0 001 1h1.5a.5.5 0 01.5.5v1A4.5 4.5 0 008.5 22h7a4.5 4.5 0 004.5-4.5v-1a.5.5 0 01.5-.5H22a1 1 0 001-1v-6a1 1 0 00-1-1h-1.5a.5.5 0 01-.5-.5v-1A4.5 4.5 0 0015.5 3h-7zm3.5 5a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H9a1 1 0 110-2h2V9a1 1 0 011-1z" />
            </svg>
            <span className="font-medium">Emergency:</span>
            <a href="tel:+256774202747" className="text-lmc-green hover:underline">
              (+256) 774-202-747
            </a>
          </div>

          <Link
            href="/appointments"
            className="block border-b border-lmc-borderLight py-3 font-semibold text-lmc-green"
          >
            Request an Appointment
          </Link>

          <ul className="space-y-1 pt-2">
            {NAV_ITEMS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 font-medium ${
                    isActive(link.href)
                      ? "text-lmc-green"
                      : "text-lmc-textPrimary hover:text-lmc-green"
                  }`}
                >
                  {link.label}
                </Link>
                {/* Mobile dropdown items */}
                {link.dropdown && (
                  <ul className="ml-4 border-l-2 border-lmc-borderLight pl-4">
                    {link.dropdown.map((d) => (
                      <li key={d.href}>
                        <Link
                          href={d.href}
                          className="block py-1.5 text-sm text-lmc-textSecondary hover:text-lmc-green"
                        >
                          {d.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
