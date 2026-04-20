"use client";
// CLIENT: Mobile menu toggle, dropdown hover/click state, sticky scroll detection

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Our Services",
    dropdown: [
      { href: "/services/xray", label: "X-ray" },
      { href: "/services/dental", label: "Dental" },
      { href: "/services/laboratory", label: "Laboratory" },
    ],
  },
  { href: "/news", label: "News" },
  { href: "/contacts", label: "Contacts" },
  { href: "/services", label: "Services" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`bg-background transition-shadow ${
        isSticky ? "sticky top-0 z-50 shadow-md" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            LMC
          </div>
          <div className="hidden sm:block">
            <span className="font-heading text-lg font-bold text-primary">
              Lifeline
            </span>
            <span className="block text-xs text-muted-foreground">
              Medical Centre
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href + link.label} className="relative">
              {link.dropdown ? (
                <div
                  className="group"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 font-medium transition-colors hover:text-primary ${
                      pathname.startsWith("/services")
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <ul
                    className={`absolute left-0 top-full z-50 min-w-[160px] rounded-md border border-border bg-card py-2 shadow-lg transition-opacity ${
                      dropdownOpen
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    {link.dropdown.map((sublink) => (
                      <li key={sublink.href}>
                        <Link
                          href={sublink.href}
                          className="block px-4 py-2 text-sm hover:bg-muted"
                        >
                          {sublink.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={`font-medium transition-colors hover:text-primary ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          {/* Emergency line in mobile drawer */}
          <div className="flex items-center gap-2 border-b border-border py-3 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-primary"
              aria-hidden="true"
            >
              <path d="M8.5 3a4.5 4.5 0 00-4.5 4.5v1a.5.5 0 01-.5.5H2a1 1 0 00-1 1v6a1 1 0 001 1h1.5a.5.5 0 01.5.5v1A4.5 4.5 0 008.5 22h7a4.5 4.5 0 004.5-4.5v-1a.5.5 0 01.5-.5H22a1 1 0 001-1v-6a1 1 0 00-1-1h-1.5a.5.5 0 01-.5-.5v-1A4.5 4.5 0 0015.5 3h-7zm3.5 5a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H9a1 1 0 110-2h2V9a1 1 0 011-1z" />
            </svg>
            <span className="font-medium">Emergency:</span>
            <a href="tel:+256774202747" className="text-primary hover:underline">
              (+256) 774-202-747
            </a>
          </div>

          <Link
            href="/appointments"
            className="block border-b border-border py-3 font-medium text-primary"
          >
            Request an Appointment
          </Link>

          <ul className="space-y-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.href + link.label}>
                {link.dropdown ? (
                  <div>
                    <span className="block py-2 font-medium text-foreground">
                      {link.label}
                    </span>
                    <ul className="ml-4 space-y-1 border-l border-border pl-4">
                      {link.dropdown.map((sublink) => (
                        <li key={sublink.href}>
                          <Link
                            href={sublink.href}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            {sublink.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`block py-2 font-medium ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
