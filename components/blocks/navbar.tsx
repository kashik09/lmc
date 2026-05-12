"use client";
// CLIENT: Mobile menu toggle, sticky scroll detection

/**
 * Main Header / Mainbar
 * - bg-lmc-green (#1b7a12), 80px height, sticky
 * - Logo left, horizontal uppercase nav right
 * - Shadow appears after scrolling 100px
 * - Active link: underline style (chosen over pill bg for simplicity)
 *
 * NOTE: Reference site has dropdown menus for "Our Services" and "Patients"
 * Dropdowns will be added in a later ticket if needed.
 */

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pharmacy", label: "Pharmacy" },
  { href: "/news", label: "News" },
  { href: "/contacts", label: "Contacts" },
  { href: "/about", label: "About Us" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change (not on initial mount)
  useEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
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
      className={`bg-lmc-green sticky top-0 z-50 transition-shadow ${
        hasScrolled ? "shadow-header" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-container items-center justify-between px-4 h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Lifeline Medical Centre - Quality Healthcare in Gayaza"
            width={180}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-bold uppercase text-white transition-colors hover:text-white/80 ${
                  isActive(link.href) ? "underline underline-offset-4" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger - white on green */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
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

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-white/20 bg-lmc-green px-4 pb-4 lg:hidden">
          {/* Emergency line in mobile drawer */}
          <div className="flex items-center gap-2 border-b border-white/20 py-3 text-sm text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M8.5 3a4.5 4.5 0 00-4.5 4.5v1a.5.5 0 01-.5.5H2a1 1 0 00-1 1v6a1 1 0 001 1h1.5a.5.5 0 01.5.5v1A4.5 4.5 0 008.5 22h7a4.5 4.5 0 004.5-4.5v-1a.5.5 0 01.5-.5H22a1 1 0 001-1v-6a1 1 0 00-1-1h-1.5a.5.5 0 01-.5-.5v-1A4.5 4.5 0 0015.5 3h-7zm3.5 5a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H9a1 1 0 110-2h2V9a1 1 0 011-1z" />
            </svg>
            <span className="font-medium">Emergency:</span>
            <a href="tel:+256774202747" className="hover:underline">
              (+256) 774-202-747
            </a>
          </div>

          <Link
            href="/appointments"
            className="block border-b border-white/20 py-3 font-medium text-white"
          >
            Request an Appointment
          </Link>

          <ul className="space-y-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 font-medium text-white ${
                    isActive(link.href) ? "underline underline-offset-4" : "hover:text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
