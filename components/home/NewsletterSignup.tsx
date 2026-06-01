"use client";

import { useState } from "react";

/**
 * NewsletterSignup — Email subscription CTA with background image
 *
 * Placeholder section for newsletter signup functionality.
 * Background: LMC nurses/staff image with navy overlay.
 */

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with newsletter service (Mailchimp, etc.)
    alert(`Thank you for subscribing! We'll send updates to: ${email}`);
    setEmail("");
  };

  return (
    <section className="relative py-20">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/lmc/services/outpatient/receptionist.jpg')" }}
      >
        <div className="absolute inset-0 bg-lmc-blue/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-container px-7 text-center">
        <h2 className="mb-3 font-heading text-3xl font-bold uppercase tracking-wide md:text-4xl">
          <span style={{ color: "#ffffff" }}>Join Our</span>{" "}
          <span style={{ color: "#45aaff" }}>Health</span>{" "}
          <span style={{ color: "#ffffff" }}>Newsletter</span>
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-white/90">
          Subscribe to our newsletters for the latest updates and news on health issues
        </p>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="flex-1 border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:border-white focus:outline-none"
          />
          <button
            type="submit"
            className="bg-lmc-green px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-lmc-greenDark"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
