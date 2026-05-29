"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * BackToTop — fixed button appears after 400px scroll
 *
 * Styling from mockup .back-to-top:
 * - Navy blue bg (#2D4A6F), hover to green
 * - 46px round button, shadow-md
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-7 right-7 z-40 flex h-[46px] w-[46px] items-center justify-center rounded-full bg-lmc-blue text-white shadow-lg transition-all hover:bg-lmc-green hover:shadow-xl ${
        visible
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-5 scale-[0.85] opacity-0"
      }`}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
